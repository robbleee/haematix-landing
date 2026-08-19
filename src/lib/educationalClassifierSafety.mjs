const UNSUPPORTED_STRUCTURED_KEYS = new Set([
  'basophilic_differentiation',
  'bm_fibrosis',
  'bm_trilineage_proliferation',
  'diagnostic_interpretation',
  'erythroid_confirmation',
  'flow',
  'flow_cytometry',
  'flow_markers',
  'immunophenotype',
  'markers',
  'morphology',
  'morphology_assessment',
  'morphology_flow_reconciliation',
  'population_context',
  'route_alerts',
  'sample_quality',
  'working_diagnosis',
]);

const BPDCN_TEXT = /\b(?:bpdcn|bpcdn|blastic\s+plasmacytoid\s+dendritic\s+cell\s+neoplasm)\b/i;
const FLOW_MARKER_KEY = /^(?:(?:cy|s)?cd\d+[a-z]*|hla[_-]?dr|mpo|tcf4|tcl1|tdt)$/i;
const UNSUPPORTED_DOMAIN_TEXT = /\b(?:flow\s+cytometry|immunophenotyp\w*|morpholog\w*|(?:cy|s)?cd\d+[a-z]*|hla[- ]?dr|mpo|tcf4|tcl1|tdt)\b/i;

function inspect(value, path = []) {
  if (typeof value === 'string' && (BPDCN_TEXT.test(value) || UNSUPPORTED_DOMAIN_TEXT.test(value))) {
    return `${path.join('.') || 'input'} contains unsupported clinical-domain evidence`;
  }
  if (Array.isArray(value)) {
    for (let index = 0; index < value.length; index += 1) {
      const issue = inspect(value[index], [...path, String(index)]);
      if (issue) return issue;
    }
    return null;
  }
  if (!value || typeof value !== 'object') return null;

  for (const [key, nested] of Object.entries(value)) {
    const normalizedKey = key.trim().toLowerCase().replace(/[\s-]+/g, '_');
    if (
      UNSUPPORTED_STRUCTURED_KEYS.has(normalizedKey)
      || normalizedKey.includes('bpdcn')
      || normalizedKey.includes('bpcdn')
      || normalizedKey.includes('flow')
      || normalizedKey.includes('morpholog')
      || normalizedKey.includes('immunophenotyp')
      || FLOW_MARKER_KEY.test(normalizedKey)
    ) {
      return [...path, key].join('.');
    }
    const issue = inspect(nested, [...path, key]);
    if (issue) return issue;
  }
  return null;
}

export function validateEducationalClassifierInput(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return {
      ok: false,
      code: 'INVALID_EDUCATIONAL_INPUT',
      message: 'The educational calculator requires a flat variable object. No classification was produced.',
    };
  }

  const unsupportedPath = inspect(input);
  if (unsupportedPath) {
    return {
      ok: false,
      code: 'UNSUPPORTED_CLINICAL_DOMAIN',
      message: (
        'This educational calculator cannot assess flow cytometry, structured morphology, '
        + 'immunophenotype, or BPDCN evidence. No classification was produced.'
      ),
      unsupportedPath,
    };
  }

  return { ok: true };
}

export function educationalMetadata() {
  return {
    source: 'educational-local',
    backend_available: null,
    clinical_use: false,
    unsupported_domains: ['flow_cytometry', 'morphology_reconciliation', 'BPDCN'],
  };
}
