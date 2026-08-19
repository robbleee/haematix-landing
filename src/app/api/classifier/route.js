import { NextResponse } from 'next/server';
import { proxyCanonicalClassification } from '../../../lib/classifierProxy.mjs';

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

    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          error: 'Request body must be valid JSON.',
          code: 'INVALID_CLASSIFICATION_REQUEST',
        },
        { status: 400 },
      );
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

    const timeoutMs = Number(process.env.HAEM_API_TIMEOUT_MS || 5000);
    const proxied = await proxyCanonicalClassification({
      body,
      apiBaseUrl,
      headers,
      timeoutMs,
    });

    return NextResponse.json(proxied.body, { status: proxied.status });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Unexpected server error',
      },
      { status: 500 }
    );
  }
}
