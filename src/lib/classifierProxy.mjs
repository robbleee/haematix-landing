const DEFAULT_TIMEOUT_MS = 5_000;

function isPlainObject(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function errorResult(status, code, error, detail) {
  return {
    ok: false,
    status,
    body: {
      error,
      code,
      ...(detail ? { detail } : {}),
      metadata: {
        source: 'backend',
        backend_available: false,
      },
    },
  };
}

export class CanonicalClassifierRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = 'CanonicalClassifierRequestError';
    this.status = 400;
    this.code = 'INVALID_CLASSIFICATION_REQUEST';
  }
}

export function canonicalClassifierRequest(body) {
  if (!isPlainObject(body)) {
    throw new CanonicalClassifierRequestError('Request body must be a JSON object.');
  }

  const allowedKeys = new Set(['case', 'options']);
  const extraKeys = Object.keys(body).filter((key) => !allowedKeys.has(key));
  if (extraKeys.length > 0) {
    throw new CanonicalClassifierRequestError(
      `Only the canonical {case, options} request is accepted; unsupported field(s): ${extraKeys.join(', ')}.`,
    );
  }

  if (!isPlainObject(body.case)) {
    throw new CanonicalClassifierRequestError('A canonical case object is required.');
  }
  if (body.options !== undefined && !isPlainObject(body.options)) {
    throw new CanonicalClassifierRequestError('options must be a JSON object when provided.');
  }

  return {
    case: body.case,
    options: body.options || {},
  };
}

function backendErrorDetail(payload, fallback) {
  if (!isPlainObject(payload)) return fallback;
  if (typeof payload.detail === 'string') return payload.detail;
  if (Array.isArray(payload.detail)) {
    return payload.detail
      .map((item) => item?.msg || item?.message)
      .filter(Boolean)
      .join('; ') || fallback;
  }
  if (typeof payload.error === 'string') return payload.error;
  if (typeof payload.error?.message === 'string') return payload.error.message;
  return fallback;
}

export async function proxyCanonicalClassification({
  body,
  apiBaseUrl,
  headers = {},
  fetchImpl = fetch,
  timeoutMs = DEFAULT_TIMEOUT_MS,
}) {
  let payload;
  try {
    payload = canonicalClassifierRequest(body);
  } catch (error) {
    if (error instanceof CanonicalClassifierRequestError) {
      return errorResult(error.status, error.code, error.message);
    }
    throw error;
  }

  const controller = new AbortController();
  const boundedTimeoutMs = Number.isFinite(Number(timeoutMs)) && Number(timeoutMs) > 0
    ? Number(timeoutMs)
    : DEFAULT_TIMEOUT_MS;
  const timeoutId = setTimeout(() => controller.abort(), boundedTimeoutMs);

  let response;
  try {
    response = await fetchImpl(`${String(apiBaseUrl).replace(/\/$/, '')}/api/v1/classify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify(payload),
      cache: 'no-store',
      signal: controller.signal,
    });
  } catch (error) {
    const timedOut = error instanceof Error && error.name === 'AbortError';
    return errorResult(
      timedOut ? 504 : 502,
      timedOut ? 'CLASSIFIER_BACKEND_TIMEOUT' : 'CLASSIFIER_BACKEND_UNAVAILABLE',
      timedOut ? 'Classifier backend timed out.' : 'Classifier backend unavailable.',
      timedOut
        ? `The backend did not respond within ${boundedTimeoutMs}ms.`
        : error instanceof Error
          ? error.message
          : 'Network request failed.',
    );
  } finally {
    clearTimeout(timeoutId);
  }

  let responseBody;
  try {
    responseBody = await response.json();
  } catch {
    return errorResult(
      502,
      'INVALID_CLASSIFIER_BACKEND_RESPONSE',
      'Classifier backend returned an invalid response.',
      `Backend response was not JSON (HTTP ${response.status}).`,
    );
  }

  if (!response.ok) {
    return errorResult(
      response.status,
      'CLASSIFIER_BACKEND_REJECTED_REQUEST',
      'Classifier backend rejected the request.',
      backendErrorDetail(responseBody, response.statusText || `HTTP ${response.status}`),
    );
  }

  if (!isPlainObject(responseBody) || !isPlainObject(responseBody.classification)) {
    return errorResult(
      502,
      'INVALID_CLASSIFIER_BACKEND_RESPONSE',
      'Classifier backend returned an invalid response.',
      'The canonical classification map was missing.',
    );
  }

  // Return the canonical backend response unchanged. In particular, retain
  // disease_type, diagnostic_advisory, and conditional-review fields.
  return {
    ok: true,
    status: response.status,
    body: responseBody,
  };
}
