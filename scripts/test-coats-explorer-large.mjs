import assert from 'node:assert/strict';
import http from 'node:http';
import https from 'node:https';
import {
  CYTOGENETIC_MODIFIERS,
  INITIAL_PROFILE,
  classifyCoats,
  deriveCoatsCytogenetics,
  hasPrimaryCytogeneticFinding,
  isCytogeneticModifierDisabled,
  parseTreatmentWithStrength,
  selectTransplantText,
  selectVenAzaText,
  toElnInput,
  toggleCytogeneticFinding,
} from '../src/lib/coatsExplorer.js';
import { COATS_LOOKUP_ROWS } from '../src/data/coatsLookupData.js';
import { classifyEln2022 } from '../src/lib/classifierEngine.js';

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

const MARKER_COMBINATIONS = Array.from({ length: 16 }, (_, mask) => ({
  NPM1: Boolean(mask & 1),
  TP53: Boolean(mask & 2),
  DDX41: Boolean(mask & 4),
  CEBPA_bZIP: Boolean(mask & 8),
}));

const FLT3_VALUES = ['none', 'itd', 'tkd', 'both'];
const CONTEXT_VALUES = ['denovo', 'prior_mds', 'taml'];
const SAML_SETS = [[], ['ASXL1'], ['ASXL1', 'SRSF2']];
const DNMT3A_VALUES = [null, false, true];

function hasRecommendation(row) {
  return Boolean(row.preferredTreatment || row.reasonableTreatments || row.transplantCr1_1 || row.transplantCr1_2 || row.transplantCr1_3);
}

function numericSimilarCase(row) {
  const match = String(row.similarCase || '').match(/\d+/);
  return match ? Number(match[0]) : null;
}

function profileFromFlags(flags) {
  const profile = {
    ...INITIAL_PROFILE,
    flt3: flags.flt3Itd && flags.flt3Tkd ? 'both' : flags.flt3Itd ? 'itd' : flags.flt3Tkd ? 'tkd' : 'none',
    context: flags.clinicalMds ? 'prior_mds' : flags.therapyRelated ? 'taml' : 'denovo',
    cytogeneticsStatus: 'reported',
    samlGenes: flags.samlMutation ? ['ASXL1'] : [],
    NPM1: Boolean(flags.npm1),
    TP53: Boolean(flags.tp53),
    DDX41: Boolean(flags.ddx41),
    CEBPA_bZIP: Boolean(flags.cebpa),
    DNMT3A: flags.dnmt3a ? true : null,
  };

  let cytogeneticFindings = [];
  if (flags.cbfAml) cytogeneticFindings = ['core_binding_factor'];
  else if (flags.kmt2aIntermediate) cytogeneticFindings = ['t_9_11'];
  else if (flags.kmt2aAdverse) cytogeneticFindings = ['other_kmt2a'];
  else if (flags.otherAdverseKaryotype) cytogeneticFindings = ['other_adverse'];
  else if (flags.adverseMdsKaryotype) cytogeneticFindings = ['mds_associated'];
  else if (flags.intermediateKaryotype) cytogeneticFindings = ['other_non_adverse'];

  if (flags.complexOrMonosomal) cytogeneticFindings.push('complex_karyotype');
  profile.cytogeneticFindings = cytogeneticFindings;
  return profile;
}

function classifyProfile(profile) {
  const cytogenetics = deriveCoatsCytogenetics(profile);
  return cytogenetics ? classifyCoats({ ...profile, cytogenetics }) : null;
}

function buildFindings(primary, modifiers) {
  let findings = [];
  findings = toggleCytogeneticFinding(findings, primary);
  modifiers.forEach((modifier) => {
    findings = toggleCytogeneticFinding(findings, modifier);
  });
  return findings;
}

function assertValidMatch(match) {
  if (!match) return;
  assert.ok(match.name, 'matched result should have a name');
  assert.ok(match.preferred, 'matched result should have a preferred treatment label');
  assert.ok(Array.isArray(match.reasons), 'matched result should include reasons');
  assert.ok(match.transplant && typeof match.transplant === 'object', 'matched result should include transplant object');
  assert.doesNotThrow(() => selectTransplantText(match, { age: '', mrd: null, aml60Risk: null }));
  assert.doesNotThrow(() => selectTransplantText(match, { age: 64, mrd: 'positive', aml60Risk: null }));
  assert.doesNotThrow(() => selectVenAzaText(match, { age: 64 }));
}

function testDataIntegrity() {
  assert.equal(COATS_LOOKUP_ROWS.length, 279, 'static lookup should include every non-empty workbook row');

  const directRows = COATS_LOOKUP_ROWS.filter(hasRecommendation);
  assert.equal(directRows.length, 30, 'expected direct recommendation rows from workbook');
  assert.ok(directRows.every((row) => parseTreatmentWithStrength(row.preferredTreatment || '').treatment), 'direct rows should parse preferred treatments');

  const scenariosWithRecommendations = new Set(directRows.filter((row) => row.scenario).map((row) => Number(row.scenario)));
  COATS_LOOKUP_ROWS.forEach((row) => {
    const similar = numericSimilarCase(row);
    if (similar) {
      assert.ok(scenariosWithRecommendations.has(similar), `row ${row.sourceRow} references missing similar scenario ${similar}`);
    }
  });

  const modifierKeys = CYTOGENETIC_MODIFIERS.map((modifier) => modifier.key);
  assert.deepEqual(new Set(modifierKeys), new Set(['complex_karyotype', 'monosomal_karyotype']));
  assert.match(CYTOGENETIC_MODIFIERS.find((modifier) => modifier.key === 'complex_karyotype')?.label || '', /3\+/);
}

function testLookupRowsReplay() {
  const stats = { rows: 0, matched: 0, borrowed: 0, noDirectRecommendation: 0 };
  COATS_LOOKUP_ROWS.forEach((row) => {
    stats.rows += 1;
    const profile = profileFromFlags(row.flags);
    assert.doesNotThrow(() => toElnInput(profile), `toElnInput failed for row ${row.sourceRow}`);
    assert.doesNotThrow(() => classifyEln2022(toElnInput(profile)), `ELN failed for row ${row.sourceRow}`);
    const match = classifyProfile(profile);
    assertValidMatch(match);
    if (match) stats.matched += 1;
    if (match?.borrowedFrom) stats.borrowed += 1;
    if (match && !match.directRecommendation && !match.borrowedFrom) stats.noDirectRecommendation += 1;

    const similar = numericSimilarCase(row);
    if (!hasRecommendation(row) && similar && match) {
      assert.equal(match.borrowedFrom?.scenario, similar, `row ${row.sourceRow} should borrow scenario ${similar}`);
    }
  });
  return stats;
}

function testExhaustiveProfileSweep() {
  const stats = { profiles: 0, matches: 0, borrowed: 0, noMatches: 0, adverseEln: 0 };
  const modifierSets = [[], ['complex_karyotype'], ['monosomal_karyotype'], ['complex_karyotype', 'monosomal_karyotype']];

  PRIMARY_CYTOGENETIC_KEYS.forEach((primary) => {
    modifierSets.forEach((modifierSet) => {
      const cytogeneticFindings = buildFindings(primary, modifierSet);
      MARKER_COMBINATIONS.forEach((markers) => {
        FLT3_VALUES.forEach((flt3) => {
          CONTEXT_VALUES.forEach((context) => {
            SAML_SETS.forEach((samlGenes) => {
              DNMT3A_VALUES.forEach((DNMT3A) => {
                const profile = {
                  ...INITIAL_PROFILE,
                  ...markers,
                  flt3,
                  context,
                  samlGenes,
                  DNMT3A,
                  cytogeneticsStatus: 'reported',
                  cytogeneticFindings,
                };
                stats.profiles += 1;
                const input = toElnInput(profile);
                const eln = classifyEln2022(input);
                if (eln.risk === 'Adverse') stats.adverseEln += 1;
                const match = classifyProfile(profile);
                if (match) {
                  stats.matches += 1;
                  if (match.borrowedFrom) stats.borrowed += 1;
                  assertValidMatch(match);
                } else {
                  stats.noMatches += 1;
                }
              });
            });
          });
        });
      });
    });
  });

  const cbfComplex = {
    ...INITIAL_PROFILE,
    flt3: 'none',
    context: 'denovo',
    cytogeneticsStatus: 'reported',
    cytogeneticFindings: ['core_binding_factor', 'complex_karyotype'],
    samlGenes: [],
  };
  assert.equal(classifyEln2022(toElnInput(cbfComplex)).risk, 'Favorable');
  assert.equal(classifyProfile(cbfComplex).borrowedFrom?.scenario, 1);

  const t911Complex = { ...cbfComplex, cytogeneticFindings: ['t_9_11', 'complex_karyotype'] };
  assert.equal(classifyProfile(t911Complex).borrowedFrom?.scenario, 16);

  const kmt2aComplex = { ...cbfComplex, cytogeneticFindings: ['other_kmt2a', 'complex_karyotype'] };
  assert.equal(classifyProfile(kmt2aComplex).borrowedFrom?.scenario, 17);

  const otherAdverseComplex = { ...cbfComplex, cytogeneticFindings: ['other_adverse', 'complex_karyotype'] };
  assert.equal(classifyProfile(otherAdverseComplex).borrowedFrom?.scenario, 27);

  const otherNonAdverse = {
    ...INITIAL_PROFILE,
    cytogeneticsStatus: 'reported',
    cytogeneticFindings: ['other_non_adverse'],
  };
  const modifierOnly = {
    ...INITIAL_PROFILE,
    cytogeneticsStatus: 'reported',
    cytogeneticFindings: ['complex_karyotype'],
  };
  assert.equal(isCytogeneticModifierDisabled(otherNonAdverse), true);
  assert.equal(isCytogeneticModifierDisabled({ ...INITIAL_PROFILE, cytogeneticsStatus: 'reported', cytogeneticFindings: [] }), true);
  assert.equal(hasPrimaryCytogeneticFinding(modifierOnly), false);
  assert.equal(deriveCoatsCytogenetics(modifierOnly), 'intermediate');
  assert.deepEqual(toggleCytogeneticFinding(['other_non_adverse'], 'complex_karyotype'), ['other_non_adverse']);

  return stats;
}

function requestHead(url) {
  const client = url.startsWith('https:') ? https : http;
  return new Promise((resolve) => {
    const req = client.request(url, { method: 'HEAD', timeout: 5000 }, (res) => {
      res.resume();
      resolve(res.statusCode || 0);
    });
    req.on('error', () => resolve(0));
    req.on('timeout', () => {
      req.destroy();
      resolve(0);
    });
    req.end();
  });
}

async function clickButtonByText(page, text) {
  const clicked = await page.evaluate((needle) => {
    const normalise = (value) => value.replace(/\s+/g, ' ').trim().toLowerCase();
    const target = normalise(needle);
    const buttons = [...document.querySelectorAll('button')];
    const button = buttons.find((item) => normalise(item.textContent || '').includes(target) && !item.disabled);
    if (!button) return false;
    button.click();
    return true;
  }, text);
  assert.equal(clicked, true, `could not click button containing "${text}"`);
}

async function testBrowserSmoke() {
  const baseUrl = process.env.COATS_TEST_BASE_URL || 'http://localhost:3000';
  const status = await requestHead(`${baseUrl}/aml-treatment-explorer`);
  assert.equal(status, 200, `expected explorer route to return 200, got ${status}`);

  const { default: puppeteer } = await import('puppeteer');
  const browser = await puppeteer.launch({ headless: 'new' });
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 900 });
    await page.goto(`${baseUrl}/aml-treatment-explorer`, { waitUntil: 'networkidle0' });
    await clickButtonByText(page, 'Continue');
    await clickButtonByText(page, 'Not detected');
    await clickButtonByText(page, 'Continue');
    await clickButtonByText(page, 'Cytogenetic result available');
    await clickButtonByText(page, 'Other non-adverse');
    const nonAdversePromptVisible = await page.evaluate(() => document.body.textContent.includes('Does the report also show complex or monosomal karyotype?'));
    assert.equal(nonAdversePromptVisible, false, 'other non-adverse should not trigger the complex/3+ prompt');
    await clickButtonByText(page, 'Other non-adverse');
    await clickButtonByText(page, 'Core binding factor');
    await page.waitForFunction(() => document.body.textContent.includes('Does the report also show complex or monosomal karyotype?'), { timeout: 10000 });
    await clickButtonByText(page, 'Complex karyotype');
    await clickButtonByText(page, 'Done');

    const cytoState = await page.evaluate(() => {
      const normalise = (value) => value.replace(/\s+/g, ' ').trim().toLowerCase();
      const buttons = [...document.querySelectorAll('button')];
      const otherNonAdverse = buttons.find((button) => normalise(button.textContent || '').includes('other non-adverse'));
      return {
        otherNonAdverseDisabled: Boolean(otherNonAdverse?.disabled),
        complexSummaryVisible: document.body.textContent.includes('Complex karyotype / 3+ abnormalities'),
      };
    });
    assert.equal(cytoState.otherNonAdverseDisabled, true, 'other non-adverse should be disabled after CBF selection');
    assert.equal(cytoState.complexSummaryVisible, true, 'complex modifier should be captured after the prompt');

    await clickButtonByText(page, 'Continue');
    await clickButtonByText(page, 'Continue');
    await clickButtonByText(page, 'De novo AML');
    await clickButtonByText(page, 'Continue');
    await clickButtonByText(page, 'Reveal consensus match');
    await page.waitForFunction(() => document.body.textContent.includes('DA+gemtuzumab'), { timeout: 10000 });
    const body = await page.evaluate(() => document.body.textContent);
    assert.match(body, /strong consensus/i);
    assert.match(body, /Similar-case recommendation/i);
    assert.match(body, /CBF AML/i);
  } finally {
    await browser.close();
  }
}

const dataStarted = performance.now();
testDataIntegrity();
const replayStats = testLookupRowsReplay();
const sweepStats = testExhaustiveProfileSweep();
const dataElapsed = Math.round(performance.now() - dataStarted);
console.log('data integrity passed');
console.log('lookup replay stats', replayStats);
console.log('exhaustive sweep stats', sweepStats);
console.log(`logic tests completed in ${dataElapsed}ms`);

if (process.env.COATS_SKIP_BROWSER === '1') {
  console.log('browser smoke skipped by COATS_SKIP_BROWSER=1');
} else {
  const browserStarted = performance.now();
  await testBrowserSmoke();
  console.log(`browser smoke passed in ${Math.round(performance.now() - browserStarted)}ms`);
}
