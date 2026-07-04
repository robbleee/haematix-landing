import { NextResponse } from 'next/server';
import { runInteractiveClassifiers } from '../../../lib/classifierEngine';

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_DAY_MS = 24 * 60 * 60 * 1000;
const RATE_LIMIT_MAX_PER_MINUTE = Number(process.env.CLASSIFIER_RATE_LIMIT_PER_MINUTE || 60);
const RATE_LIMIT_MAX_PER_DAY = Number(process.env.CLASSIFIER_RATE_LIMIT_PER_DAY || 1000);
const RATE_LIMIT_CLEANUP_INTERVAL_MS = 10 * 60 * 1000;

function getRateLimitStore() {
  if (!globalThis.__haemClassifierRateLimitStore) {
    globalThis.__haemClassifierRateLimitStore = {
      clients: new Map(),
      lastCleanup: 0,
    };
  }
  return globalThis.__haemClassifierRateLimitStore;
}

function clientIp(request) {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) return forwardedFor.split(',')[0].trim();
  return (
    request.headers.get('x-real-ip') ||
    request.headers.get('true-client-ip') ||
    request.headers.get('cf-connecting-ip') ||
    'unknown'
  );
}

function checkRateLimit(request) {
  const store = getRateLimitStore();
  const now = Date.now();
  const ip = clientIp(request);

  if (now - store.lastCleanup > RATE_LIMIT_CLEANUP_INTERVAL_MS) {
    for (const [key, value] of store.clients.entries()) {
      if (now - value.lastSeen > RATE_LIMIT_DAY_MS) {
        store.clients.delete(key);
      }
    }
    store.lastCleanup = now;
  }

  const existing = store.clients.get(ip) || {
    minuteStart: now,
    minuteCount: 0,
    dayStart: now,
    dayCount: 0,
    lastSeen: now,
  };

  if (now - existing.minuteStart >= RATE_LIMIT_WINDOW_MS) {
    existing.minuteStart = now;
    existing.minuteCount = 0;
  }

  if (now - existing.dayStart >= RATE_LIMIT_DAY_MS) {
    existing.dayStart = now;
    existing.dayCount = 0;
  }

  existing.minuteCount += 1;
  existing.dayCount += 1;
  existing.lastSeen = now;
  store.clients.set(ip, existing);

  if (existing.minuteCount > RATE_LIMIT_MAX_PER_MINUTE) {
    return {
      limited: true,
      retryAfterSeconds: Math.max(1, Math.ceil((existing.minuteStart + RATE_LIMIT_WINDOW_MS - now) / 1000)),
      reason: 'minute',
    };
  }

  if (existing.dayCount > RATE_LIMIT_MAX_PER_DAY) {
    return {
      limited: true,
      retryAfterSeconds: Math.max(60, Math.ceil((existing.dayStart + RATE_LIMIT_DAY_MS - now) / 1000)),
      reason: 'day',
    };
  }

  return {
    limited: false,
    remainingMinute: Math.max(0, RATE_LIMIT_MAX_PER_MINUTE - existing.minuteCount),
    remainingDay: Math.max(0, RATE_LIMIT_MAX_PER_DAY - existing.dayCount),
  };
}

function normalizeClassificationResult(result) {
  if (!result || typeof result !== 'object') {
    return { classification: 'Unavailable', derivation: ['No classification returned.'] };
  }
  return {
    classification: result.classification || 'Unavailable',
    derivation: Array.isArray(result.derivation) ? result.derivation : ['No derivation returned.'],
  };
}

function normalizeRiskResult(riskMap) {
  if (!riskMap || typeof riskMap !== 'object') {
    return {
      risk: 'Intermediate',
      medianOS: 'Unavailable',
      derivation: ['No risk stratification returned by backend.'],
    };
  }

  const preferred =
    riskMap.ELN2022 ||
    riskMap.ELN_2022 ||
    riskMap.ELN2024 ||
    riskMap.ELN_2024 ||
    riskMap.ELN2022_Intensive ||
    riskMap.ELN_2022_intensive ||
    riskMap.ELN2024_Intensive ||
    riskMap.ELN_2024_non_intensive;

  const firstEntry = preferred || Object.values(riskMap)[0];
  if (!firstEntry || typeof firstEntry !== 'object') {
    return {
      risk: 'Intermediate',
      medianOS: 'Unavailable',
      derivation: ['No ELN risk payload found in backend response.'],
    };
  }

  return {
    risk: firstEntry.category || 'Intermediate',
    medianOS: firstEntry.median_os || firstEntry.medianOS || 'Unavailable',
    derivation: Array.isArray(firstEntry.derivation) ? firstEntry.derivation : ['No derivation returned.'],
  };
}

function buildFallbackResponse(parsedData, reason) {
  const local = runInteractiveClassifiers(parsedData);
  const fallbackNote = `Backend unavailable (${reason}). Using local classifier engine fallback.`;
  const withTrace = (entry = {}) => ({
    ...entry,
    derivation: [fallbackNote, ...(Array.isArray(entry.derivation) ? entry.derivation : [])],
  });

  return {
    who: withTrace(local.who),
    icc: withTrace(local.icc),
    eln: withTrace(local.eln),
    metadata: {
      source: 'local-fallback',
      backend_available: false,
      fallback_reason: reason,
    },
  };
}

export async function POST(request) {
  try {
    const rateLimit = checkRateLimit(request);
    if (rateLimit.limited) {
      return NextResponse.json(
        {
          error: 'Rate limit exceeded',
          detail:
            rateLimit.reason === 'day'
              ? 'Daily classifier request limit exceeded for this client.'
              : 'Classifier request limit exceeded. Please wait and try again.',
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(rateLimit.retryAfterSeconds),
            'X-RateLimit-Limit': String(
              rateLimit.reason === 'day' ? RATE_LIMIT_MAX_PER_DAY : RATE_LIMIT_MAX_PER_MINUTE
            ),
            'X-RateLimit-Reset': String(Math.ceil(Date.now() / 1000) + rateLimit.retryAfterSeconds),
          },
        }
      );
    }

    const body = await request.json();
    const parsedData = body?.parsed_data || body?.data || body;
    const isPublicStructuredCalculator = body?.tool_mode === 'public_structured_calculator';

    if (!parsedData || typeof parsedData !== 'object') {
      return NextResponse.json({ error: 'parsed_data object is required' }, { status: 400 });
    }

    const apiBaseUrl =
      process.env.HAEM_API_BASE_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      (process.env.NODE_ENV === 'development'
        ? 'http://localhost:8000'
        : 'https://haem-io-api-610aaa6158f4.herokuapp.com');
    const apiKey = process.env.HAEM_API_KEY || process.env.NEXT_PUBLIC_API_KEY || '';
    const serviceBearerToken = process.env.HAEM_API_BEARER_TOKEN || '';

    const incomingAuth = request.headers.get('authorization');
    const incomingCookie = request.headers.get('cookie');

    const headers = {
      'Content-Type': 'application/json',
    };
    if (apiKey) headers['X-API-Key'] = apiKey;
    if (incomingAuth) {
      headers.Authorization = incomingAuth;
    } else if (serviceBearerToken) {
      headers.Authorization = `Bearer ${serviceBearerToken}`;
    }
    if (incomingCookie) headers.Cookie = incomingCookie;

    const payload = {
      input_type: 'structured',
      data: parsedData,
      options: {
        classification_schemes: ['WHO2022', 'ICC2022'],
        include_risk: true,
        include_ai_review: false,
        ...(isPublicStructuredCalculator
          ? {
              flow_override: true,
              flow_population_confirmed: true,
              myeloid_lineage_confirmed: true,
              mpal_excluded: true,
              flow_override_reason:
                'Public structured calculator mode: user is entering guideline variables only; flow cytometry assessment is outside this calculator.',
            }
          : {}),
      },
    };

    const timeoutMs = Number(process.env.HAEM_API_TIMEOUT_MS || 5000);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    let response;
    try {
      response = await fetch(`${apiBaseUrl}/api/v1/classify`, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
        cache: 'no-store',
        signal: controller.signal,
      });
    } catch (backendError) {
      const fallbackReason =
        backendError instanceof Error && backendError.name === 'AbortError'
          ? `request timed out after ${timeoutMs}ms`
          : backendError instanceof Error
          ? backendError.message
          : 'network error';
      return NextResponse.json(buildFallbackResponse(parsedData, fallbackReason));
    } finally {
      clearTimeout(timeoutId);
    }

    const responseJson = await response.json().catch(() => ({}));
    if (!response.ok) {
      const detail =
        responseJson?.detail ||
        responseJson?.error?.message ||
        responseJson?.error ||
        response.statusText ||
        'Backend classification failed';
      return NextResponse.json(buildFallbackResponse(parsedData, detail));
    }

    const classification = responseJson?.classification || {};
    const whoRaw =
      classification.WHO2022 ||
      classification.WHO_2022 ||
      classification['WHO 2022'];
    const iccRaw =
      classification.ICC2022 ||
      classification.ICC_2022 ||
      classification['ICC 2022'];

    const normalized = {
      who: normalizeClassificationResult(whoRaw),
      icc: normalizeClassificationResult(iccRaw),
      eln: normalizeRiskResult(responseJson?.risk_stratification),
      metadata: {
        ...(responseJson?.metadata || {}),
        source: 'backend',
        backend_available: true,
      },
    };

    return NextResponse.json(normalized);
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Unexpected server error',
      },
      { status: 500 }
    );
  }
}
