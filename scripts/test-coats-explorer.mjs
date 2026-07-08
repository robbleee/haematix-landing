import assert from 'node:assert/strict';
import {
  INITIAL_PROFILE,
  classifyCoats,
  deriveCoatsCytogenetics,
  parseTreatmentWithStrength,
  selectTransplantGuidance,
  selectTransplantText,
  toggleCytogeneticFinding,
  toElnInput,
} from '../src/lib/coatsExplorer.js';
import { classifyEln2022 } from '../src/lib/classifierEngine.js';

const baseProfile = {
  ...INITIAL_PROFILE,
  flt3: 'none',
  context: 'denovo',
  cytogeneticsStatus: 'reported',
  samlGenes: [],
};

function match(profile) {
  return classifyCoats({ ...profile, cytogenetics: deriveCoatsCytogenetics(profile) });
}

const cbf = match({ ...baseProfile, cytogeneticFindings: ['core_binding_factor'] });
assert.equal(cbf.scenario, 1);
assert.equal(cbf.preferred, 'DA+gemtuzumab');
assert.equal(cbf.preferredStrength, 'strong consensus');
assert.equal(cbf.directRecommendation, true);

const cbfComplexProfile = { ...baseProfile, cytogeneticFindings: ['core_binding_factor', 'complex_karyotype'] };
const cbfComplex = match(cbfComplexProfile);
assert.equal(cbfComplex.number, 1);
assert.equal(cbfComplex.borrowedFrom.scenario, 1);
assert.equal(cbfComplex.preferred, cbf.preferred);
assert.equal(classifyEln2022(toElnInput(cbfComplexProfile)).risk, 'Favorable');
assert.ok(cbfComplex.reasons.some((reason) => /Workbook lookup row/i.test(reason)));
assert.ok(cbfComplex.reasons.every((reason) => !/Fallback scenario/i.test(reason)));

const kmt2aComplex = match({ ...baseProfile, cytogeneticFindings: ['other_kmt2a', 'complex_karyotype'] });
assert.equal(kmt2aComplex.borrowedFrom.scenario, 17);
assert.equal(kmt2aComplex.preferred, 'FLAG-Ida');
assert.ok(kmt2aComplex.reasons.every((reason) => !/Fallback scenario/i.test(reason)));

const unsupportedCombination = match({ ...baseProfile, cytogeneticFindings: ['core_binding_factor'], DNMT3A: true });
assert.equal(unsupportedCombination, null, 'unsupported combinations should not fall back to an internally mapped scenario');

const trisomyFindings = toggleCytogeneticFinding(['other_non_adverse'], 'complex_karyotype');
assert.deepEqual(trisomyFindings, ['other_non_adverse']);

const monosomalFindings = toggleCytogeneticFinding(['mds_associated'], 'monosomal_karyotype');
assert.deepEqual(new Set(monosomalFindings), new Set(['mds_associated', 'monosomal_karyotype']));

const parsed = parseTreatmentWithStrength('DA+gemtuzumab (strong consensus)');
assert.equal(parsed.treatment, 'DA+gemtuzumab');
assert.equal(parsed.strength, 'strong consensus');

const transplant = selectTransplantText(cbf, { age: '', mrd: null });
assert.match(transplant, /MRD/);
assert.match(transplant, /MRD positive|MRD\+|MRD\+ve/i);
assert.match(transplant, /MRD negative|MRD-|MRD-ve/i);

const unknownMrdGuidance = selectTransplantGuidance(cbf, { age: '', mrd: 'unknown' });
assert.ok(unknownMrdGuidance.some((item) => /MRD negative/i.test(item.label)), 'unknown MRD should show a negative branch');
assert.ok(unknownMrdGuidance.some((item) => /MRD positive/i.test(item.label)), 'unknown MRD should show a positive branch');

const positiveMrdGuidance = selectTransplantGuidance(cbf, { age: '', mrd: 'positive' });
assert.ok(positiveMrdGuidance.some((item) => /MRD positive/i.test(item.label)), 'positive MRD should show the positive branch');
assert.ok(!positiveMrdGuidance.some((item) => /MRD negative/i.test(item.label)), 'positive MRD should not show the negative branch as selected guidance');

const noConsensusTransplant = match({ ...baseProfile, NPM1: true, context: 'prior_mds', cytogeneticFindings: ['other_non_adverse'] });
const noConsensusGuidance = selectTransplantGuidance(noConsensusTransplant, { age: '', mrd: 'unknown' });
assert.ok(noConsensusGuidance.some((item) => item.tone === 'general' && /No consensus on whether/i.test(item.value)), 'MRD-contingent no-consensus wording should remain general guidance');

console.log('coats explorer checks passed');
