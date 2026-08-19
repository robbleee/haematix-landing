import assert from 'node:assert/strict';
import test from 'node:test';

import {
  canonicalClassifierRequest,
  proxyCanonicalClassification,
} from '../src/lib/classifierProxy.mjs';
import {
  educationalMetadata,
  validateEducationalClassifierInput,
} from '../src/lib/educationalClassifierSafety.mjs';

const canonicalRequest = {
  case: {
    blasts: {
      bone_marrow: {
        measurement: { kind: 'exact', value: 5 },
        origin: 'clinician',
        evidence: [],
      },
    },
  },
  options: { classification_schemes: ['WHO2022'], include_risk: false },
};

test('canonical proxy forwards only the {case, options} contract unchanged', async () => {
  let forwarded;
  const backendBody = {
    classification: {
      WHO_2022: {
        classification: 'BPDCN specialist review required',
        derivation: ['BPDCN-compatible phenotype detected'],
        disease_type: 'BPDCN_REVIEW',
        diagnostic_advisory: { status: 'needs_bpdcn_review' },
        is_conditional: true,
        conditional_label: 'Conditional — BPDCN specialist review used',
        conditional_reasons: ['Specialist review recorded'],
        conditional_context: { override_type: 'bpdcn_specialist_review' },
      },
    },
    case: canonicalRequest.case,
  };

  const result = await proxyCanonicalClassification({
    body: canonicalRequest,
    apiBaseUrl: 'https://classifier.example/',
    timeoutMs: 100,
    fetchImpl: async (url, init) => {
      forwarded = { url, init };
      return new Response(JSON.stringify(backendBody), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    },
  });

  assert.equal(result.ok, true);
  assert.equal(forwarded.url, 'https://classifier.example/api/v1/classify');
  assert.deepEqual(JSON.parse(forwarded.init.body), canonicalRequest);
  assert.deepEqual(result.body, backendBody);
  assert.equal(result.body.classification.WHO_2022.disease_type, 'BPDCN_REVIEW');
  assert.equal(
    result.body.classification.WHO_2022.diagnostic_advisory.status,
    'needs_bpdcn_review',
  );
  assert.equal(result.body.classification.WHO_2022.is_conditional, true);
});

test('removed flat request envelopes are rejected without contacting the backend', async () => {
  let called = false;
  const result = await proxyCanonicalClassification({
    body: { input_type: 'structured', data: { blasts_percentage: 25 } },
    apiBaseUrl: 'https://classifier.example',
    fetchImpl: async () => {
      called = true;
      throw new Error('must not run');
    },
  });

  assert.equal(called, false);
  assert.equal(result.status, 400);
  assert.equal(result.body.code, 'INVALID_CLASSIFICATION_REQUEST');
  assert.equal('classification' in result.body, false);
});

test('backend non-OK responses fail closed without a local classification', async () => {
  const result = await proxyCanonicalClassification({
    body: canonicalRequest,
    apiBaseUrl: 'https://classifier.example',
    fetchImpl: async () => new Response(
      JSON.stringify({ detail: 'Canonical case rejected' }),
      { status: 422, statusText: 'Unprocessable Entity' },
    ),
  });

  assert.equal(result.status, 422);
  assert.equal(result.body.code, 'CLASSIFIER_BACKEND_REJECTED_REQUEST');
  assert.equal(result.body.metadata.backend_available, false);
  assert.equal('classification' in result.body, false);
});

test('backend network errors and timeouts fail closed', async (t) => {
  await t.test('network error', async () => {
    const result = await proxyCanonicalClassification({
      body: canonicalRequest,
      apiBaseUrl: 'https://classifier.example',
      fetchImpl: async () => {
        throw new Error('connection refused');
      },
    });

    assert.equal(result.status, 502);
    assert.equal(result.body.code, 'CLASSIFIER_BACKEND_UNAVAILABLE');
    assert.equal('classification' in result.body, false);
  });

  await t.test('timeout', async () => {
    const result = await proxyCanonicalClassification({
      body: canonicalRequest,
      apiBaseUrl: 'https://classifier.example',
      timeoutMs: 5,
      fetchImpl: (_url, init) => new Promise((_resolve, reject) => {
        init.signal.addEventListener('abort', () => {
          const error = new Error('aborted');
          error.name = 'AbortError';
          reject(error);
        });
      }),
    });

    assert.equal(result.status, 504);
    assert.equal(result.body.code, 'CLASSIFIER_BACKEND_TIMEOUT');
    assert.equal('classification' in result.body, false);
  });
});

test('canonical request validation defaults options without accepting extra fields', () => {
  assert.deepEqual(canonicalClassifierRequest({ case: canonicalRequest.case }), {
    case: canonicalRequest.case,
    options: {},
  });
  assert.throws(
    () => canonicalClassifierRequest({ ...canonicalRequest, parsed_data: {} }),
    /Only the canonical \{case, options\} request is accepted/,
  );
});

test('educational flat inputs are explicitly local and non-clinical', () => {
  assert.deepEqual(
    validateEducationalClassifierInput({
      blasts_percentage: 25,
      AML_defining_recurrent_genetic_abnormalities: { NPM1: true },
    }),
    { ok: true },
  );
  assert.deepEqual(educationalMetadata(), {
    source: 'educational-local',
    backend_available: null,
    clinical_use: false,
    unsupported_domains: ['flow_cytometry', 'morphology_reconciliation', 'BPDCN'],
  });
});

test('educational calculator refuses flow, morphology, and BPDCN-shaped inputs', () => {
  const unsafeInputs = [
    { flow: { markers: [{ marker: 'CD123', percentage: 90 }] } },
    { morphology: { assessment: { working_diagnosis: 'AML' } } },
    { flow_cytometry: [{ marker: 'CD4', percentage: 80 }] },
    { CD56: true },
    { note: 'Findings are suspicious for BPDCN' },
    { report_excerpt: 'Flow cytometry shows CD123 positive blasts' },
    { bone_marrow_morphology: 'limited' },
    { basophilic_differentiation: true },
    { bm_fibrosis: true },
    { erythroid_confirmation: true },
  ];

  for (const input of unsafeInputs) {
    const result = validateEducationalClassifierInput(input);
    assert.equal(result.ok, false);
    assert.equal(result.code, 'UNSUPPORTED_CLINICAL_DOMAIN');
    assert.match(result.message, /No classification was produced/);
  }
});
