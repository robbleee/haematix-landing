import Link from 'next/link';
import { COATS_LOOKUP_ROWS } from '../../../data/coatsLookupData.js';
import {
  CYTOGENETIC_GROUPS,
  CYTOGENETIC_MODIFIERS,
  SAML_GENES,
  SCENARIO_META,
  parseTreatmentWithStrength,
  splitTreatmentList,
} from '../../../lib/coatsExplorer.js';
import styles from './algorithm.module.css';

export const metadata = {
  title: 'AML Treatment Explorer Algorithm',
  description: 'Algorithm sheet for the Haem.io AML Treatment Explorer Coats-Delphi lookup, decision flow, cytogenetics handling, and workbook cases.',
  alternates: { canonical: '/aml-treatment-explorer/algorithm' },
};

const FLAG_LABELS = {
  intermediateKaryotype: 'Intermediate cytogenetics',
  adverseMdsKaryotype: 'MDS-associated adverse cytogenetics',
  kmt2aIntermediate: 'KMT2A::MLLT3 t(9;11)',
  kmt2aAdverse: 'Other KMT2A rearranged',
  otherAdverseKaryotype: 'Other adverse / MECOM',
  cbfAml: 'Core binding factor AML',
  samlMutation: 'sAML mutation present',
  npm1: 'NPM1',
  flt3Itd: 'FLT3-ITD',
  flt3Tkd: 'FLT3-TKD',
  cebpa: 'CEBPA bZIP',
  tp53: 'TP53',
  ddx41: 'DDX41',
  dnmt3a: 'DNMT3A',
  clinicalMds: 'Prior MDS',
  therapyRelated: 'Therapy-related AML',
  complexOrMonosomal: 'Complex / monosomal modifier',
};

const OVERVIEW_FLOW = [
  ['Inputs', 'Defining mutations, FLT3, cytogenetics, sAML genes, disease context, age and MRD.'],
  ['Normalisation', 'Selections are converted into workbook flags and a separate ELN 2022 context input.'],
  ['Cytogenetic branch', 'One primary cytogenetic category is selected; complex and monosomal are stored as modifiers.'],
  ['Workbook lookup', 'The resolver searches Tom Coats’ static workbook rows for an exact flag combination.'],
  ['Recommendation source', 'Direct treatment fields are used when present; otherwise a populated Similar Case row borrows that case’s recommendation.'],
  ['Result', 'Preferred treatment, reasonable treatments, transplant text, Ven-Aza/non-intensive text, trial/funding notes, and explanatory trace are displayed.'],
];

const PRIORITY_FLOW = [
  ['No cytogenetics', 'If cytogenetics are unavailable, the calculator shows provisional ELN context but does not force a Coats case.'],
  ['Defining biology', 'CBF, NPM1, CEBPA bZIP, DDX41, TP53, KMT2A and MECOM-related flags remain explicit in lookup matching.'],
  ['Intermediate branch', 'Normal and other non-adverse cytogenetics route through the intermediate-karyotype flag; DNMT3A refines NPM1 + FLT3-ITD rows.'],
  ['Adverse branch', 'MDS-associated, KMT2A adverse, MECOM/other adverse and complex/monosomal modifiers are represented as separate flags.'],
  ['No exact match', 'If the selected combination is not represented in the lookup table and no fallback applies, no treatment recommendation is extrapolated.'],
];

const CYTO_FLOW = [
  ['Report status', 'Choose available or unavailable. Unavailable prevents Coats case forcing.'],
  ['Primary category', 'Choose one primary category only: normal, CBF, t(9;11), other KMT2A, MDS-associated, MECOM/other adverse, or other non-adverse.'],
  ['Incompatibility guard', 'Once a primary branch is chosen, incompatible primary branches are greyed out until the branch is cleared.'],
  ['Modifier prompt', 'For eligible primary branches, the separate prompt asks whether complex/three-or-more or monosomal karyotype is also reported.'],
  ['Clinical exception', 'Complex/three-or-more does not make CBF or KMT2A become generic adverse for Coats lookup; the primary biology remains controlling.'],
];

const EXAMPLES = [
  {
    title: 'CBF AML with complex/three-or-more abnormalities',
    inputs: ['Core binding factor selected', 'Complex karyotype / 3+ abnormalities modifier selected', 'No TP53 or DDX41'],
    output: 'Routes through the CBF pathway and borrows the direct recommendation from Scenario 1 when the exact modifier combination has no treatment fields.',
  },
  {
    title: 'Other KMT2A rearranged with complex karyotype',
    inputs: ['Other KMT2Ar AML selected', 'Complex/monosomal modifier selected', 'No DDX41 or TP53'],
    output: 'Keeps the adverse KMT2A biology and uses the workbook similar-case guidance rather than a generic adverse fallback.',
  },
  {
    title: 'NPM1 + FLT3-ITD with DNMT3A',
    inputs: ['NPM1 detected', 'FLT3-ITD detected', 'Intermediate cytogenetics', 'DNMT3A detected'],
    output: 'Resolves to the DNMT3A-refined NPM1 + FLT3-ITD consensus scenario when the workbook flags match.',
  },
  {
    title: 'CEBPA bZIP with normal cytogenetics',
    inputs: ['CEBPA bZIP detected', 'FLT3 not detected', 'Normal cytogenetics', 'De novo AML'],
    output: 'Matches the CEBPA bZIP consensus case and shows direct preferred treatment, reasonable treatment, transplant and non-intensive guidance.',
  },
  {
    title: 'Incomplete cytogenetics',
    inputs: ['Molecular findings entered', 'Cytogenetics unavailable'],
    output: 'Shows provisional ELN 2022 risk context but does not invent a Coats-Delphi treatment case.',
  },
];

const LEGACY_SCENARIOS = {
  5: {
    currentHandling: 'Current workbook handling: NPM1 + any sAML mutation is represented by Scenario 4.',
    reason: 'Tom’s updated lookup rows do not carry a distinct scenario for 2+ sAML mutations; the static flags contain sAML mutation present/absent rather than a mutation-count category.',
  },
  21: {
    currentHandling: 'Current workbook handling: intermediate cytogenetics + any sAML mutation is represented by Scenario 20.',
    reason: 'Tom’s updated lookup rows do not carry a distinct scenario for 2+ sAML mutations; the static flags contain sAML mutation present/absent rather than a mutation-count category.',
  },
};

function hasRecommendation(row) {
  return Boolean(row.preferredTreatment || row.reasonableTreatments || row.transplantCr1_1 || row.transplantCr1_2 || row.transplantCr1_3);
}

function similarCaseNumber(row) {
  const match = String(row.similarCase || '').match(/\d+/);
  return match ? Number(match[0]) : null;
}

function compactFlags(flags) {
  const active = Object.entries(flags || {}).filter(([, value]) => value).map(([key]) => FLAG_LABELS[key] || key);
  return active.length ? active.join(', ') : 'No positive flags';
}

function treatmentLabel(value) {
  const parsed = parseTreatmentWithStrength(value || '');
  if (!parsed.treatment) return 'Not recorded';
  return parsed.strength ? `${parsed.treatment} - ${parsed.strength}` : parsed.treatment;
}

function scenarioRows() {
  return Object.entries(SCENARIO_META).filter(([scenario]) => !LEGACY_SCENARIOS[Number(scenario)]).map(([scenario, meta]) => {
    const directRow = COATS_LOOKUP_ROWS.find((row) => Number(row.scenario) === Number(scenario));
    return {
      scenario: Number(scenario),
      ...meta,
      row: directRow,
    };
  });
}

function directRows() {
  return COATS_LOOKUP_ROWS.filter(hasRecommendation);
}

function stats() {
  const direct = directRows();
  const similar = COATS_LOOKUP_ROWS.filter((row) => !hasRecommendation(row) && row.similarCase);
  const directScenarioCount = new Set(direct.map((row) => row.scenario).filter(Boolean)).size;
  return [
    ['Workbook rows', COATS_LOOKUP_ROWS.length],
    ['Direct recommendation rows', direct.length],
    ['Similar-case rows', similar.length],
    ['Current scenario cards', Object.keys(SCENARIO_META).length - Object.keys(LEGACY_SCENARIOS).length],
    ['Direct scenario rows', directScenarioCount],
  ];
}

function Pipeline({ title, items }) {
  return (
    <section className={styles.flowSection}>
      <h2>{title}</h2>
      <div className={styles.pipeline}>
        {items.map(([label, body], index) => (
          <article key={label} className={styles.pipelineStep}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <div>
              <strong>{label}</strong>
              <p>{body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function BranchMap({ title, items }) {
  return (
    <section className={styles.flowSection}>
      <h2>{title}</h2>
      <div className={styles.branchMap}>
        {items.map(([label, body], index) => (
          <article key={label} className={styles.branchNode}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <div>
              <strong>{label}</strong>
              <p>{body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function CytogeneticsBoard() {
  return (
    <section className={styles.cytoBoardSection}>
      <div className={styles.sectionHead}>
        <div>
          <p className={styles.kicker}>Cytogenetics engine</p>
          <h2>Cytogenetics model</h2>
        </div>
        <p>The calculator treats cytogenetics as a controlled decision model: status first, one primary branch, then separate complex/three-or-more and monosomal modifiers where clinically eligible.</p>
      </div>

      <div className={styles.cytoDecision}>
        <article>
          <span>01</span>
          <strong>Report status</strong>
          <p>Available cytogenetics opens the branch selector. Unavailable cytogenetics prevents Coats case forcing and shows provisional ELN context only.</p>
        </article>
        <article>
          <span>02</span>
          <strong>Primary branch</strong>
          <p>Exactly one primary cytogenetic branch can be active. Other primary options are greyed out until the selected branch is cleared.</p>
        </article>
        <article>
          <span>03</span>
          <strong>Modifier prompt</strong>
          <p>Complex/three-or-more and monosomal karyotype are captured separately. They are not part of the non-adverse trisomy branch.</p>
        </article>
        <article>
          <span>04</span>
          <strong>Lookup consequence</strong>
          <p>CBF and KMT2A remain biologically controlling when a complex modifier is present; the lookup uses workbook similar-case guidance where supplied.</p>
        </article>
      </div>

      <div className={styles.cytoMatrix}>
        {CYTOGENETIC_GROUPS.map((group) => (
          <article key={group.label} data-tone={group.tone}>
            <header>
              <span />
              <strong>{group.label}</strong>
            </header>
            <div>
              {group.findings.map((finding) => (
                <section key={finding.key} className={finding.disabled ? styles.cytoMuted : ''}>
                  <b>{finding.label}</b>
                  <small>{finding.description}</small>
                  {finding.disabled && <em>{finding.disabledReason || 'Not yet surveyed for consensus'}</em>}
                </section>
              ))}
            </div>
          </article>
        ))}
        <article data-tone="modifier">
          <header>
            <span />
            <strong>Separate modifier prompt</strong>
          </header>
          <div>
            {CYTOGENETIC_MODIFIERS.map((modifier) => (
              <section key={modifier.key}>
                <b>{modifier.label}</b>
                <small>{modifier.description}</small>
              </section>
            ))}
          </div>
        </article>
      </div>

      <div className={styles.cytoRules}>
        <article>
          <strong>Why separate modifiers?</strong>
          <p>Complex or monosomal karyotype can matter, but it should not accidentally convert CBF AML or KMT2A AML into a generic adverse branch when the workbook keeps the primary biology in control.</p>
        </article>
        <article>
          <strong>What is deliberately disabled?</strong>
          <p>APL, BCR::ABL, other non-adverse MDS-associated cytogenetics and other adverse are visible for transparency when not yet polled or not currently selectable for this consensus calculator.</p>
        </article>
      </div>
    </section>
  );
}

function RecommendationBadges({ row }) {
  if (!row) return <span className={styles.badgeMuted}>Not directly represented in workbook rows</span>;
  const preferred = parseTreatmentWithStrength(row.preferredTreatment || '');
  const alternatives = splitTreatmentList(row.reasonableTreatments || '');
  return (
    <div className={styles.badgeRow}>
      {preferred.strength && <span>{preferred.strength}</span>}
      {alternatives.map((item) => item.strength ? <span key={`${row.sourceRow}-${item.treatment}`}>{item.strength}</span> : null)}
      {!preferred.strength && alternatives.every((item) => !item.strength) && <span className={styles.badgeMuted}>Consensus strength not recorded</span>}
    </div>
  );
}

export default function TreatmentExplorerAlgorithmPage() {
  const scenarios = scenarioRows();
  const recommendationRows = directRows();
  const rowsWithSimilarCase = COATS_LOOKUP_ROWS.filter((row) => row.similarCase);

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div>
          <Link href="/aml-treatment-explorer" className={styles.backLink}>Back to explorer</Link>
          <p className={styles.kicker}>Coats-Delphi AML Treatment Explorer</p>
          <h1>Algorithm and lookup sheet</h1>
          <p className={styles.lead}>A complete explanation of how the explorer turns clinical selections into ELN context, workbook flags, consensus-case matching and displayed treatment guidance.</p>
        </div>
        <aside className={styles.disclaimer}>
          <strong>Clinical context required</strong>
          <p>This page documents an educational Delphi-poll lookup. It is not a medical device and does not replace current evidence, local policy, prescribing information, funding context, MDT review, or clinician judgement.</p>
        </aside>
      </section>

      <section className={styles.statBand}>
        {stats().map(([label, value]) => (
          <div key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </section>

      <Pipeline title="End-to-end decision flow" items={OVERVIEW_FLOW} />
      <BranchMap title="Branching principles" items={PRIORITY_FLOW} />

      <CytogeneticsBoard />

      <section className={styles.twoColumn}>
        <div>
          <h2>Mutation and context inputs</h2>
          <p>Inputs are converted into Boolean workbook flags. sAML mutations are counted as present when any of the listed genes are selected; DNMT3A is used only for the NPM1 + FLT3-ITD refinement branch.</p>
          <div className={styles.pillBox}>
            {['NPM1', 'TP53', 'DDX41', 'CEBPA bZIP', 'FLT3-ITD', 'FLT3-TKD', 'DNMT3A', ...SAML_GENES].map((item) => <span key={item}>{item}</span>)}
          </div>
        </div>
        <div>
          <h2>Lookup matching</h2>
          <p>The page converts selected findings into workbook flags, searches for an exact static lookup row, then uses direct recommendation text or a workbook Similar Case reference. No match means no treatment recommendation is extrapolated.</p>
          <div className={styles.lookupFormula}>
            <span>Profile flags</span>
            <i>+</i>
            <span>Workbook row</span>
            <i>=</i>
            <span>Direct or borrowed recommendation</span>
          </div>
        </div>
      </section>

      <BranchMap title="Cytogenetics decision guardrails" items={CYTO_FLOW} />

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <div>
            <p className={styles.kicker}>Scenario layer</p>
            <h2>Current consensus scenarios</h2>
          </div>
          <p>These are the scenario-labelled rows represented in the current workbook-driven lookup. Older 2+ sAML scenario labels are documented separately below because the updated workbook uses a present/absent sAML flag.</p>
        </div>
        <div className={styles.scenarioGrid}>
          {scenarios.map(({ scenario, name, incidence, row }) => (
            <article key={scenario} className={styles.scenarioCard}>
              <div>
                <span>Scenario {String(scenario).padStart(2, '0')}</span>
                <strong>{name}</strong>
                <small>{incidence}</small>
              </div>
              {row ? (
                <>
                  <p><b>Preferred:</b> {treatmentLabel(row.preferredTreatment)}</p>
                  <p><b>Flags:</b> {compactFlags(row.flags)}</p>
                  <RecommendationBadges row={row} />
                </>
              ) : (
                <p className={styles.missingScenario}>No direct workbook row currently carries this scenario number in the static lookup.</p>
              )}
            </article>
          ))}
        </div>
        <div className={styles.legacyScenarioGrid}>
          {Object.entries(LEGACY_SCENARIOS).map(([scenario, note]) => (
            <article key={scenario}>
              <span>Legacy scenario {String(scenario).padStart(2, '0')}</span>
              <strong>{SCENARIO_META[scenario].name}</strong>
              <p>{note.currentHandling}</p>
              <small>{note.reason}</small>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <div>
            <p className={styles.kicker}>Worked examples</p>
            <h2>Example case traces</h2>
          </div>
          <p>These examples show the intended behaviour for common and edge-case combinations, including complex/three-or-more modifiers.</p>
        </div>
        <div className={styles.exampleGrid}>
          {EXAMPLES.map((example) => (
            <article key={example.title}>
              <h3>{example.title}</h3>
              <ul>{example.inputs.map((item) => <li key={item}>{item}</li>)}</ul>
              <p>{example.output}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <div>
            <p className={styles.kicker}>Recommendation rows</p>
            <h2>Direct recommendation table</h2>
          </div>
          <p>Rows below contain direct treatment or transplant text in the workbook. Other rows may borrow from these via Similar Case.</p>
        </div>
        <div className={styles.tableWrap}>
          <table>
            <thead>
              <tr>
                <th>Row</th>
                <th>Case</th>
                <th>Scenario</th>
                <th>Flags</th>
                <th>Preferred</th>
                <th>Reasonable</th>
                <th>Trial / funding / age</th>
              </tr>
            </thead>
            <tbody>
              {recommendationRows.map((row) => (
                <tr key={`${row.sourceRow}-${row.caseNumber}`}>
                  <td>{row.sourceRow}</td>
                  <td>{row.caseNumber}</td>
                  <td>{row.scenario || 'Additional'}</td>
                  <td>{compactFlags(row.flags)}</td>
                  <td>{treatmentLabel(row.preferredTreatment)}</td>
                  <td>{row.reasonableTreatments || 'Not recorded'}</td>
                  <td>{[row.trialOptions && `Trial: ${row.trialOptions}`, row.nonNhsAlternatives && `Non-NHS: ${row.nonNhsAlternatives}`, row.ageImpact && `Age: ${row.ageImpact}`].filter(Boolean).join(' | ') || 'Not recorded'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <div>
            <p className={styles.kicker}>Exhaustive lookup</p>
            <h2>All workbook rows used by the calculator</h2>
          </div>
          <p>The static lookup contains every non-empty row converted from Tom’s workbook. This table is intentionally exhaustive so every similar-case and direct row can be inspected.</p>
        </div>
        <details className={styles.detailsTable} open>
          <summary>Show {COATS_LOOKUP_ROWS.length} static lookup rows, including {rowsWithSimilarCase.length} rows with Similar Case guidance</summary>
          <div className={styles.tableWrap}>
            <table>
              <thead>
                <tr>
                  <th>Source row</th>
                  <th>Case</th>
                  <th>Scenario</th>
                  <th>Extra</th>
                  <th>Active flags</th>
                  <th>Recommendation source</th>
                  <th>Preferred / similar case</th>
                  <th>Expert or workbook comment</th>
                </tr>
              </thead>
              <tbody>
                {COATS_LOOKUP_ROWS.map((row) => {
                  const direct = hasRecommendation(row);
                  const similar = similarCaseNumber(row);
                  return (
                    <tr key={`${row.sourceRow}-${row.caseNumber}-${row.extra || 'base'}`}>
                      <td>{row.sourceRow}</td>
                      <td>{row.caseNumber}</td>
                      <td>{row.scenario || '-'}</td>
                      <td>{row.extra || '-'}</td>
                      <td>{compactFlags(row.flags)}</td>
                      <td>{direct ? 'Direct workbook text' : similar ? `Borrow from scenario ${similar}` : 'No direct text recorded'}</td>
                      <td>{direct ? treatmentLabel(row.preferredTreatment) : row.similarCase || 'Not recorded'}</td>
                      <td>{row.expertComment || row.comment || 'Not recorded'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </details>
      </section>
    </main>
  );
}
