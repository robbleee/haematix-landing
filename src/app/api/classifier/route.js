import { NextResponse } from 'next/server';
import { runInteractiveClassifiers } from '../../../lib/classifierEngine';

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
    const body = await request.json();
    const parsedData = body?.parsed_data || body?.data || body;

    if (!parsedData || typeof parsedData !== 'object') {
      return NextResponse.json({ error: 'parsed_data object is required' }, { status: 400 });
    }

    const apiBaseUrl =
      process.env.HAEM_API_BASE_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      'http://localhost:8000';
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

