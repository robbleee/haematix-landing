import { COATS_LOOKUP_ROWS } from '../data/coatsLookupData.js';

export const SAML_GENES = ['ASXL1', 'BCOR', 'EZH2', 'SF3B1', 'SRSF2', 'STAG2', 'U2AF1', 'ZRSR2', 'RUNX1'];

const PRIMARY_CYTOGENETIC_KEYS = [
  'normal',
  'core_binding_factor',
  't_9_11',
  'other_non_adverse',
  'mds_associated',
  'other_kmt2a',
  'gata2_mecom',
  'other_adverse',
];

const MODIFIER_KEYS = ['complex_karyotype', 'monosomal_karyotype'];
const COMPLEX_ALLOWED_PRIMARY_KEYS = new Set(['core_binding_factor', 't_9_11', 'mds_associated', 'other_kmt2a', 'gata2_mecom', 'other_adverse']);

export const CYTOGENETIC_GROUPS = [
  {
    label: 'Favourable risk',
    tone: 'favourable',
    findings: [
      {
        key: 'core_binding_factor',
        label: 'Core binding factor',
        description: 't(8;21), inv(16), or t(16;16)',
        flags: { core_binding_factor: true },
      },
      {
        key: 'acute_promyelocytic_leukaemia',
        label: 'Acute promyelocytic leukaemia',
        description: 'Visible for completeness; no consensus scenario yet',
        disabled: true,
      },
    ],
  },
  {
    label: 'Intermediate risk',
    tone: 'intermediate',
    findings: [
      {
        key: 'normal',
        label: 'Normal',
        description: 'Normal cytogenetic group',
      },
      {
        key: 't_9_11',
        label: 'KMT2A::MLLT3 (t(9;11))',
        description: 'Specific intermediate KMT2A branch',
        flags: { t_9_11: true },
      },
      {
        key: 'other_non_adverse',
        label: 'Other non-adverse',
        description: 'e.g. trisomy 8 or multiple trisomies',
      },
      {
        key: 'other_non_adverse_mds',
        label: 'Other non-adverse MDS associated',
        description: 'e.g. del(20q); no consensus scenario yet',
        disabled: true,
      },
    ],
  },
  {
    label: 'Adverse risk',
    tone: 'adverse',
    findings: [
      {
        key: 'mds_associated',
        label: 'MDS associated',
        description: 'e.g. monosomy 5, 7, 17, del(5q), abnormal 17(p)',
        flags: { mds_associated_cytogenetics: true },
      },
      {
        key: 'other_kmt2a',
        label: 'Other KMT2Ar AML',
        description: 'KMT2A rearranged, excluding t(9;11)',
        flags: { kmt2a_rearranged: true },
      },
      {
        key: 'gata2_mecom',
        label: 'GATA2::MECOM',
        description: 'inv(3), t(3;3), or 3q26',
        flags: { inv3_or_t3: true },
      },
      {
        key: 'bcr_abl',
        label: 'BCR::ABL',
        description: 'Visible for completeness; no consensus scenario yet',
        disabled: true,
      },
      {
        key: 'other_adverse',
        label: 'Other adverse',
        description: 't(6;9), t(8;16)',
        flags: { other_adverse_cytogenetics: true },
      },
    ],
  },
];

export const CYTOGENETIC_MODIFIERS = [
  {
    key: 'complex_karyotype',
    label: 'Complex karyotype / 3+ abnormalities',
    description: 'Select only when the report states complex karyotype or three or more cytogenetic abnormalities',
  },
  {
    key: 'monosomal_karyotype',
    label: 'Monosomal karyotype',
    description: 'Two autosomal monosomies or one monosomy with structural abnormality',
  },
];

const SCENARIO_META = {
  1: { name: 'CBF AML (Core Binding Factor)', incidence: '~10%' },
  2: { name: 'NPM1 favourable risk', incidence: '~13%' },
  3: { name: 'NPM1 favourable with FLT3-TKD', incidence: '~2.25%' },
  4: { name: 'NPM1 with secondary AML mutation', incidence: '~1.5%' },
  5: { name: 'NPM1 with 2+ secondary AML mutations', incidence: '~0.15%' },
  6: { name: 'NPM1 AML arising from prior MDS', incidence: '<1%' },
  7: { name: 'Therapy-related AML with NPM1', incidence: '~0.75%' },
  8: { name: 'CEBPA bZIP mutation', incidence: '~7%' },
  9: { name: 'Intermediate cytogenetics AML', incidence: '~1%' },
  10: { name: 'Intermediate cytogenetics: NPM1 + FLT3-ITD, wild-type DNMT3A', incidence: '~7%' },
  11: { name: 'Intermediate cytogenetics: NPM1 + FLT3-ITD + DNMT3A', incidence: '~8%' },
  12: { name: 'Intermediate cytogenetics with FLT3-ITD only', incidence: '~12%' },
  13: { name: 'Intermediate cytogenetics with FLT3-TKD', incidence: '~5%' },
  14: { name: 'Intermediate cytogenetics with FLT3-ITD and TKD', incidence: '~1%' },
  15: { name: 'Intermediate cytogenetics with therapy-related AML', incidence: '~5%' },
  16: { name: 't(9;11) KMT2A rearrangement', incidence: '~1%' },
  17: { name: 'Adverse KMT2A rearrangement', incidence: '~1%' },
  18: { name: 'Complex or MDS-associated karyotype, wild-type TP53', incidence: '~4%' },
  19: { name: 'Complex or MDS-associated karyotype with TP53 mutation', incidence: '~10%' },
  20: { name: 'Intermediate cytogenetics with secondary AML mutation', incidence: '~4%' },
  21: { name: 'Intermediate cytogenetics with 2+ secondary AML mutations', incidence: '~8%' },
  22: { name: 'Adverse karyotype with NPM1', incidence: '<1%' },
  23: { name: 'Adverse karyotype with FLT3-ITD', incidence: '<1%' },
  24: { name: 'Adverse karyotype with FLT3-TKD', incidence: '<1%' },
  25: { name: 'Secondary AML with FLT3-ITD', incidence: '<1%' },
  26: { name: 'Secondary AML with FLT3-TKD', incidence: '<1%' },
  27: { name: 'GATA2::MECOM or other adverse karyotype', incidence: '~2%' },
  28: { name: 'DDX41 mutation', incidence: '~5%' },
};

export function getPrimaryCytogeneticKey(profile) {
  const selected = new Set(profile.cytogeneticFindings || []);
  const primary = PRIMARY_CYTOGENETIC_KEYS.filter((key) => selected.has(key));
  return primary.length === 1 ? primary[0] : null;
}

export function hasPrimaryCytogeneticFinding(profile) {
  return Boolean(getPrimaryCytogeneticKey(profile));
}

export function isCytogeneticOptionDisabled(profile, finding) {
  if (finding.disabled) return true;
  const selected = new Set(profile.cytogeneticFindings || []);
  const primary = getPrimaryCytogeneticKey(profile);
  return Boolean(primary && PRIMARY_CYTOGENETIC_KEYS.includes(finding.key) && finding.key !== primary && !selected.has(finding.key));
}

export function isCytogeneticModifierDisabled(profile) {
  const primary = getPrimaryCytogeneticKey(profile);
  if (!primary) return true;
  if (!COMPLEX_ALLOWED_PRIMARY_KEYS.has(primary)) return true;
  return false;
}

export function toggleCytogeneticFinding(currentFindings, key) {
  const current = new Set(currentFindings || []);
  if (current.has(key)) {
    current.delete(key);
    return [...current];
  }

  if (PRIMARY_CYTOGENETIC_KEYS.includes(key)) {
    PRIMARY_CYTOGENETIC_KEYS.forEach((primaryKey) => current.delete(primaryKey));
    current.add(key);
    if (!COMPLEX_ALLOWED_PRIMARY_KEYS.has(key)) {
      MODIFIER_KEYS.forEach((modifierKey) => current.delete(modifierKey));
    }
    return [...current];
  }

  if (MODIFIER_KEYS.includes(key)) {
    const primary = PRIMARY_CYTOGENETIC_KEYS.find((primaryKey) => current.has(primaryKey));
    if (primary && !COMPLEX_ALLOWED_PRIMARY_KEYS.has(primary)) return [...current];
    current.add(key);
    return [...current];
  }

  current.add(key);
  return [...current];
}

export function toElnInput(profile) {
  const selected = new Set(profile.cytogeneticFindings || []);
  const input = {};
  CYTOGENETIC_GROUPS.flatMap((group) => group.findings).forEach((finding) => {
    input[finding.key] = selected.has(finding.key);
    Object.entries(finding.flags || {}).forEach(([key, value]) => {
      input[key] = Boolean(input[key] || (selected.has(finding.key) && value));
    });
  });

  const primary = getPrimaryCytogeneticKey(profile);
  const complexOrMonosomal = selected.has('complex_karyotype') || selected.has('monosomal_karyotype');
  const complexCountsForEln = complexOrMonosomal && ['mds_associated', 'gata2_mecom', 'other_adverse'].includes(primary);
  if (complexCountsForEln) input.complex_karyotype = selected.has('complex_karyotype') || selected.has('monosomal_karyotype');
  if (complexCountsForEln && selected.has('monosomal_karyotype')) input.monosomal_karyotype = true;

  input.npm1_mutation = Boolean(profile.NPM1);
  input.flt3_itd = profile.flt3 === 'itd' || profile.flt3 === 'both';
  input.cebpa_bzip = Boolean(profile.CEBPA_bZIP);
  input.tp53_mutation = Boolean(profile.TP53);
  SAML_GENES.forEach((gene) => {
    input[`${gene.toLowerCase()}_mutation`] = profile.samlGenes.includes(gene);
  });
  return input;
}

export function deriveCoatsCytogenetics(profile) {
  if (profile.cytogeneticsStatus === 'unavailable') return null;
  if (profile.cytogeneticsStatus === 'normal') return 'intermediate';

  const selected = new Set(profile.cytogeneticFindings || []);
  const primary = PRIMARY_CYTOGENETIC_KEYS.filter((key) => selected.has(key));
  if (!selected.size) return 'intermediate';
  if (primary.length > 1) return null;
  if (!primary.length) return 'intermediate';

  const primaryKey = primary[0];
  if (primaryKey === 'normal' || primaryKey === 'other_non_adverse') return 'intermediate';
  if (primaryKey === 'core_binding_factor') return 'cbf';
  if (primaryKey === 't_9_11') return 't911';
  if (primaryKey === 'other_kmt2a') return 'kmt2a';
  if (primaryKey === 'gata2_mecom') return 'mecom';
  if (primaryKey === 'mds_associated') return selected.has('complex_karyotype') || selected.has('monosomal_karyotype') ? 'complex' : 'm5';
  if (primaryKey === 'other_adverse') return 'adverse';
  return 'intermediate';
}

export function profileToLookupFlags(profile) {
  const selected = new Set(profile.cytogeneticFindings || []);
  const primary = getPrimaryCytogeneticKey(profile);
  return {
    intermediateKaryotype: profile.cytogeneticsStatus === 'normal' || primary === 'normal' || primary === 'other_non_adverse',
    adverseMdsKaryotype: primary === 'mds_associated',
    kmt2aIntermediate: primary === 't_9_11',
    kmt2aAdverse: primary === 'other_kmt2a',
    otherAdverseKaryotype: primary === 'gata2_mecom' || primary === 'other_adverse',
    cbfAml: primary === 'core_binding_factor',
    samlMutation: (profile.samlGenes || []).length > 0,
    npm1: Boolean(profile.NPM1),
    flt3Itd: profile.flt3 === 'itd' || profile.flt3 === 'both',
    flt3Tkd: profile.flt3 === 'tkd' || profile.flt3 === 'both',
    cebpa: Boolean(profile.CEBPA_bZIP),
    tp53: Boolean(profile.TP53),
    ddx41: Boolean(profile.DDX41),
    dnmt3a: Boolean(profile.DNMT3A),
    clinicalMds: profile.context === 'prior_mds',
    therapyRelated: profile.context === 'taml',
    complexOrMonosomal: selected.has('complex_karyotype') || selected.has('monosomal_karyotype'),
  };
}

function flagsMatch(rowFlags, profileFlags) {
  return Object.keys(rowFlags).every((key) => Boolean(rowFlags[key]) === Boolean(profileFlags[key]));
}

function hasRecommendation(row) {
  return Boolean(row?.preferredTreatment || row?.reasonableTreatments || row?.transplantCr1_1 || row?.transplantCr1_2 || row?.transplantCr1_3);
}

function similarCaseNumber(row) {
  const raw = row?.similarCase;
  if (raw === null || raw === undefined) return null;
  const match = String(raw).match(/\d+/);
  return match ? Number(match[0]) : null;
}

function findRecommendationRowByScenario(scenario) {
  if (!scenario) return null;
  return COATS_LOOKUP_ROWS.find((row) => Number(row.scenario) === Number(scenario) && hasRecommendation(row)) || null;
}

function findBestLookupRow(profileFlags) {
  const exact = COATS_LOOKUP_ROWS.filter((row) => flagsMatch(row.flags, profileFlags));
  if (!exact.length) return null;
  return exact.sort((a, b) => {
    if (hasRecommendation(a) !== hasRecommendation(b)) return hasRecommendation(a) ? -1 : 1;
    if (a.scenario !== b.scenario) return a.scenario ? -1 : 1;
    if (a.extra !== b.extra) return a.extra ? 1 : -1;
    return a.sourceRow - b.sourceRow;
  })[0];
}

function legacyScenarioNumber(p) {
  const count = SAML_GENES.filter((gene) => p.samlGenes.includes(gene)).length;
  const intermediate = p.cytogenetics === 'intermediate';
  const adverse = ['adverse', 'complex', 'complex_m7', 'm7', 'm5', 'mecom'].includes(p.cytogenetics);
  const complex = p.cytogenetics === 'complex' || p.cytogenetics === 'complex_m7';
  const m7 = p.cytogenetics === 'complex_m7' || p.cytogenetics === 'm7';

  if (p.DDX41 && !p.TP53) return 28;
  if (p.cytogenetics === 'cbf' && !p.DDX41 && !p.TP53) return 1;

  if (p.NPM1 && !p.DDX41 && !p.TP53 && !adverse) {
    if (p.flt3 === 'tkd' && count === 0) return 3;
    if (p.flt3 !== 'itd' && p.flt3 !== 'both' && count === 0 && !['taml', 'prior_mds'].includes(p.context)) return 2;
    if (count >= 1) return 4;
    if (p.context === 'prior_mds') return 6;
    if (p.context === 'taml') return 7;
  }

  if (p.CEBPA_bZIP && !p.DDX41 && !p.TP53) return 8;
  if (p.cytogenetics === 't911') return 16;
  if (p.cytogenetics === 'kmt2a' && !p.DDX41 && !p.TP53) return 17;

  if (intermediate) {
    if (p.NPM1 && ['itd', 'both'].includes(p.flt3) && p.DNMT3A && !p.DDX41 && !p.TP53) return 11;
    if (p.NPM1 && ['itd', 'both'].includes(p.flt3) && !p.DNMT3A && !p.DDX41 && !p.TP53) return 10;
    if (p.flt3 === 'both' && !p.NPM1 && !p.DDX41 && !p.TP53) return 14;
    if (p.flt3 === 'tkd' && !p.NPM1 && !p.DDX41 && !p.TP53) return 13;
    if (p.flt3 === 'itd' && !p.NPM1 && !p.DDX41 && !p.TP53) return 12;
    if (p.context === 'taml' && !p.DDX41 && !p.TP53) return 15;
    if (count >= 1 && !p.TP53 && !p.CEBPA_bZIP && !p.DDX41) return 20;
    if (!p.DDX41 && !p.TP53) return 9;
  }

  if (adverse) {
    if (p.NPM1 && !p.TP53 && !p.CEBPA_bZIP && !p.DDX41) return 22;
    if (p.cytogenetics === 'kmt2a' && !p.DDX41 && !p.TP53) return 17;
    if (['itd', 'both'].includes(p.flt3) && !p.TP53 && !p.CEBPA_bZIP && !p.DDX41) return 23;
    if (p.flt3 === 'tkd' && !p.TP53 && !p.CEBPA_bZIP && !p.DDX41) return 24;
  }
  if (complex && m7 && !p.TP53 && !p.DDX41 && !p.CEBPA_bZIP) return 18;
  if (complex && m7 && p.TP53 && !p.DDX41) return 19;
  if (p.cytogenetics === 'mecom' && !p.TP53 && !p.CEBPA_bZIP && !p.DDX41) return 27;
  return null;
}

function scenarioName(scenario, fallback = null) {
  return SCENARIO_META[scenario]?.name || fallback || `Lookup case ${scenario}`;
}

function scenarioIncidence(scenario) {
  return SCENARIO_META[scenario]?.incidence || 'Not reported';
}

function combinationLabel(flags) {
  const labels = [];
  if (flags.cbfAml) labels.push('CBF AML');
  if (flags.intermediateKaryotype) labels.push('intermediate cytogenetics');
  if (flags.adverseMdsKaryotype) labels.push('MDS-associated karyotype');
  if (flags.kmt2aIntermediate) labels.push('t(9;11) KMT2A');
  if (flags.kmt2aAdverse) labels.push('adverse KMT2A');
  if (flags.otherAdverseKaryotype) labels.push('other adverse karyotype');
  if (flags.complexOrMonosomal) labels.push('complex or monosomal karyotype');
  if (flags.npm1) labels.push('NPM1');
  if (flags.flt3Itd) labels.push('FLT3-ITD');
  if (flags.flt3Tkd) labels.push('FLT3-TKD');
  if (flags.cebpa) labels.push('CEBPA bZIP');
  if (flags.tp53) labels.push('TP53');
  if (flags.ddx41) labels.push('DDX41');
  if (flags.samlMutation) labels.push('sAML mutation');
  if (flags.clinicalMds) labels.push('prior MDS');
  if (flags.therapyRelated) labels.push('therapy-related AML');
  return labels.length ? labels.join(' + ') : 'Selected profile';
}

export function parseTreatmentWithStrength(value) {
  if (!value) return { treatment: '', strength: null };
  const trimmed = String(value).trim();
  const match = trimmed.match(/^(.*?)(?:\s*\(([^()]*(?:consensus|recommended|surveyed)[^()]*)\))\s*$/i);
  if (!match) return { treatment: trimmed, strength: null };
  return { treatment: match[1].trim(), strength: match[2].trim() };
}

export function splitTreatmentList(value) {
  if (!value) return [];
  const parts = String(value)
    .split(/,(?![^()]*\))/)
    .map((part) => part.trim())
    .filter(Boolean);
  return parts.map(parseTreatmentWithStrength);
}

function hydrateLookupRow(row, profileFlags, reasons) {
  if (!row) return null;
  const direct = hasRecommendation(row);
  const borrowedScenario = direct ? null : similarCaseNumber(row);
  const borrowedRow = borrowedScenario ? findRecommendationRowByScenario(borrowedScenario) : null;
  const recommendationRow = direct ? row : borrowedRow;
  const scenario = row.scenario || borrowedRow?.scenario || null;
  const displayNumber = row.scenario || row.caseNumber;
  const preferred = parseTreatmentWithStrength(recommendationRow?.preferredTreatment || 'No direct recommendation');
  const alternatives = splitTreatmentList(recommendationRow?.reasonableTreatments);
  const name = row.scenario
    ? scenarioName(row.scenario)
    : `${combinationLabel(profileFlags)}${borrowedRow ? ` - similar to ${scenarioName(borrowedRow.scenario)}` : ''}`;

  return {
    number: displayNumber,
    caseId: row.caseNumber,
    extra: row.extra,
    scenario,
    name,
    incidence: scenarioIncidence(scenario),
    preferred: preferred.treatment,
    preferredStrength: preferred.strength,
    preferredRaw: recommendationRow?.preferredTreatment || null,
    alternatives: alternatives.map((item) => item.treatment),
    alternativeTreatments: alternatives,
    trial: recommendationRow?.trialOptions || null,
    ageImpact: recommendationRow?.ageImpact || null,
    nonNhsAlternatives: recommendationRow?.nonNhsAlternatives || null,
    transplant: {
      cr1_1: recommendationRow?.transplantCr1_1 || null,
      cr1_2: recommendationRow?.transplantCr1_2 || null,
      cr1_3: recommendationRow?.transplantCr1_3 || null,
    },
    venAza: {
      under40: recommendationRow?.venAzaUnder40 || null,
      age40To60: recommendationRow?.venAza40To60 || null,
      over60: recommendationRow?.venAzaOver60 || null,
    },
    comment: recommendationRow?.comment || row.comment || null,
    expertComment: row.expertComment || recommendationRow?.expertComment || null,
    similarCase: row.similarCase || null,
    borrowedFrom: borrowedRow
      ? {
          scenario: borrowedRow.scenario,
          caseId: borrowedRow.caseNumber,
          name: scenarioName(borrowedRow.scenario),
        }
      : null,
    directRecommendation: direct,
    lookupRow: row.sourceRow,
    recommendationRow: recommendationRow?.sourceRow || null,
    reasons,
  };
}

export function classifyCoats(p) {
  const profileFlags = profileToLookupFlags(p);
  const reasons = Object.entries(profileFlags)
    .filter(([, value]) => value)
    .map(([key]) => key.replace(/([A-Z])/g, ' $1').replace(/^./, (char) => char.toUpperCase()));

  const exactRow = findBestLookupRow(profileFlags);
  if (exactRow) return hydrateLookupRow(exactRow, profileFlags, [...reasons, `Workbook lookup row ${exactRow.sourceRow}`]);

  const scenario = legacyScenarioNumber(p);
  const scenarioRow = findRecommendationRowByScenario(scenario);
  if (scenarioRow) return hydrateLookupRow(scenarioRow, profileFlags, [...reasons, `Fallback scenario ${scenario}`]);
  return null;
}

function filterMrdText(text, mrd) {
  if (!text || !mrd || mrd === 'unknown') return text;
  const lines = String(text).split(/\n+/).map((line) => line.trim()).filter(Boolean);
  const positivePattern = /MRD\s*(\+|pos|positive)|MRD\+ve/i;
  const negativePattern = /MRD\s*(-|neg|negative)|MRD-ve|MRD -ve/i;
  const selected = lines.filter((line) => (mrd === 'positive' ? positivePattern.test(line) : negativePattern.test(line)));
  return selected.length ? selected.join('\n') : text;
}

export function selectTransplantText(matched, profile) {
  if (!matched) return 'Specialist MDT review recommended.';
  const age = Number(profile.age || 0);
  const options = [];
  const add = (label, value) => {
    const filtered = filterMrdText(value, profile.mrd);
    if (filtered) options.push(`${label}: ${filtered}`);
  };

  if (!age) {
    add('Pathway 1', matched.transplant?.cr1_1);
    add('Pathway 2', matched.transplant?.cr1_2);
    add('Pathway 3', matched.transplant?.cr1_3);
    return options.join('\n\n') || 'No transplant consensus recorded in the lookup table.';
  }

  if (age < 60) {
    add('Age <60', matched.transplant?.cr1_1);
  } else if (profile.aml60Risk === 'favourable') {
    add('Age >=60, AML60+ favourable risk', matched.transplant?.cr1_1);
  } else if (profile.aml60Risk === 'intermediate_poor') {
    add('Age >=60, AML60+ intermediate/poor risk', matched.transplant?.cr1_2 || matched.transplant?.cr1_1);
  } else {
    add('If AML60+ favourable risk', matched.transplant?.cr1_1);
    add('If AML60+ intermediate/poor risk', matched.transplant?.cr1_2);
  }
  add('Additional transplant note', matched.transplant?.cr1_3);
  return options.join('\n\n') || 'No transplant consensus recorded in the lookup table.';
}

export function selectVenAzaText(matched, profile) {
  if (!matched) return null;
  const age = Number(profile.age || 0);
  if (!age) {
    return [
      matched.venAza?.under40 ? `<40 years: ${matched.venAza.under40}` : null,
      matched.venAza?.age40To60 ? `40-60 years: ${matched.venAza.age40To60}` : null,
      matched.venAza?.over60 ? `>60 years: ${matched.venAza.over60}` : null,
    ].filter(Boolean).join('\n');
  }
  if (age < 40) return matched.venAza?.under40 || null;
  if (age <= 60) return matched.venAza?.age40To60 || null;
  return matched.venAza?.over60 || null;
}

export function transplantText(caseNumber, age, mrd) {
  const row = findRecommendationRowByScenario(caseNumber);
  if (!row) return 'Specialist MDT review recommended.';
  return selectTransplantText(hydrateLookupRow(row, {}, []), { age, mrd });
}

export const INITIAL_PROFILE = {
  NPM1: false, TP53: false, DDX41: false, CEBPA_bZIP: false,
  flt3: null, cytogeneticsStatus: null, cytogeneticFindings: [], samlGenes: [], context: null,
  DNMT3A: null, age: '', mrd: null, aml60Risk: null,
};
