import { NextResponse } from 'next/server';

const API_BASE_URL =
  process.env.HAEM_API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  'http://localhost:8000';

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_DAY_MS = 24 * 60 * 60 * 1000;
const RATE_LIMIT_MAX_PER_MINUTE = Number(process.env.TREATMENT_EXPLORER_TELEMETRY_RATE_LIMIT_PER_MINUTE || 120);
const RATE_LIMIT_MAX_PER_DAY = Number(process.env.TREATMENT_EXPLORER_TELEMETRY_RATE_LIMIT_PER_DAY || 2000);
const RATE_LIMIT_CLEANUP_INTERVAL_MS = 10 * 60 * 1000;

const ALLOWED_EVENTS = new Set([
  'session_start',
  'step_continue',
  'result_viewed',
  'pdf_export',
  'reset',
]);

function cleanJson(value, depth = 0) {
  if (depth > 5) return null;
  if (Array.isArray(value)) return value.slice(0, 80).map((item) => cleanJson(item, depth + 1));
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value)
        .slice(0, 80)
        .map(([key, item]) => [String(key).slice(0, 80), cleanJson(item, depth + 1)])
    );
  }
  if (typeof value === 'string') return value.slice(0, 500);
  if (['number', 'boolean'].includes(typeof value) || value === null) return value;
  return String(value ?? '').slice(0, 500);
}

function getRateLimitStore() {
  if (!globalThis.__haemTreatmentExplorerTelemetryRateLimitStore) {
    globalThis.__haemTreatmentExplorerTelemetryRateLimitStore = {
      clients: new Map(),
      lastCleanup: 0,
    };
  }
  return globalThis.__haemTreatmentExplorerTelemetryRateLimitStore;
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
      if (now - value.lastSeen > RATE_LIMIT_DAY_MS) store.clients.delete(key);
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
  };
}

export async function POST(request) {
  try {
    const rateLimit = checkRateLimit(request);
    if (rateLimit.limited) {
      return NextResponse.json(
        { ok: false, error: 'Too many telemetry requests', reason: rateLimit.reason },
        {
          status: 429,
          headers: {
            'Retry-After': String(rateLimit.retryAfterSeconds),
            'X-RateLimit-Limit': String(RATE_LIMIT_MAX_PER_MINUTE),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': String(Math.ceil(Date.now() / 1000) + rateLimit.retryAfterSeconds),
          },
        }
      );
    }

    const body = await request.json();
    const sessionId = String(body.sessionId || body.session_id || '').slice(0, 80);
    const eventType = String(body.eventType || body.event_type || '').slice(0, 80);

    if (!sessionId || !ALLOWED_EVENTS.has(eventType)) {
      return NextResponse.json({ ok: false, error: 'Invalid telemetry event' }, { status: 400 });
    }

    const forwardedFor = request.headers.get('x-forwarded-for');
    const payload = {
      session_id: sessionId,
      event_type: eventType,
      payload: cleanJson(body.payload || {}),
      request_metadata: cleanJson({
        pathname: body.pathname,
        referrer: request.headers.get('referer') || null,
        language: request.headers.get('accept-language') || null,
      }),
    };

    const headers = { 'Content-Type': 'application/json' };
    if (forwardedFor) headers['x-forwarded-for'] = forwardedFor;

    const res = await fetch(`${API_BASE_URL}/api/v1/treatment-explorer/telemetry`, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
      cache: 'no-store',
    });
    const data = await res.json().catch(() => ({}));
    const response = NextResponse.json(data, { status: res.ok ? 201 : res.status });
    response.headers.set('X-RateLimit-Limit', String(RATE_LIMIT_MAX_PER_MINUTE));
    response.headers.set('X-RateLimit-Remaining', String(rateLimit.remainingMinute));
    return response;
  } catch (error) {
    console.error('Treatment explorer telemetry unavailable:', error);
    return NextResponse.json({ ok: true, stored: false, reason: 'telemetry_backend_unavailable' });
  }
}
