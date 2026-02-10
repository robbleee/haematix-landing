import styles from './article.module.css';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Safe Diagnostic Algorithms with Imandra | Haem.io',
  description:
    'How Haem.io implements Imandra guardrails for LLM-assisted AML/MDS classification, including parity testing, runtime diagnostics, and safety telemetry.',
};

export default function ImandraSafeDiagnosticAlgorithmsPage() {
  return (
    <div className={styles.articleContainer}>
      <Link href="/articles" className={styles.backButton}>
        ← Back to Articles
      </Link>

      <div className={styles.articleContent}>
        <article className={styles.articleCard}>
          <header className={styles.header}>
            <h1 className={styles.title}>Safe Diagnostic Algorithms with Imandra at Haem.io</h1>
            <p className={styles.subtitle}>
              How we combine LLM extraction, deterministic WHO/ICC classifier execution, and formal
              Imandra guardrails to reduce silent failure modes in AML/MDS diagnostic software.
            </p>
            <div className={styles.authorSection}>
              <div className={styles.authorInfo}>
                <Image
                  src="/profile-pics/robbie.png"
                  alt="Robert Lee"
                  width={48}
                  height={48}
                  className={styles.authorPhoto}
                />
                <div>
                  <div className={styles.authorName}>Robert Lee</div>
                  <div className={styles.publishDate}>February 10, 2026</div>
                </div>
              </div>
            </div>
          </header>

          <div className={styles.body}>
            {/* ── Table of contents ─────────────────────────────── */}
            <nav className={styles.tocBox}>
              <div className={styles.tocTitle}>Contents</div>
              <ol className={styles.tocList}>
                <li><a href="#genomic-state-space-problem"><span className={styles.tocNumber}>1.</span>The genomic state-space problem</a></li>
                <li><a href="#architecture"><span className={styles.tocNumber}>2.</span>How we operationalise this in software</a></li>
                <li><a href="#data-flow"><span className={styles.tocNumber}>3.</span>From unstructured report to typed diagnostic features</a></li>
                <li><a href="#tp53-example"><span className={styles.tocNumber}>4.</span>Worked example: biallelic TP53 case</a></li>
                <li><a href="#deep-dive"><span className={styles.tocNumber}>5.</span>Imandra deep dive: model and guardrail semantics</a></li>
                <li><a href="#iml-implementation"><span className={styles.tocNumber}>6.</span>Our Imandra IML implementation</a></li>
                <li><a href="#parity-strategy"><span className={styles.tocNumber}>7.</span>Parity strategy</a></li>
                <li><a href="#telemetry"><span className={styles.tocNumber}>8.</span>Telemetry, artifacts, and safety rollout</a></li>
                <li><a href="#evidence"><span className={styles.tocNumber}>9.</span>Validation evidence</a></li>
                <li><a href="#visualisation"><span className={styles.tocNumber}>10.</span>Diagnosis and decision path visualisation</a></li>
                <li><a href="#how-this-helps"><span className={styles.tocNumber}>11.</span>How this helps Haem.io</a></li>
                <li><a href="#limits"><span className={styles.tocNumber}>12.</span>What this does not claim</a></li>
                <li><a href="#broader-relevance"><span className={styles.tocNumber}>13.</span>Broader relevance</a></li>
                <li><a href="#closing"><span className={styles.tocNumber}>14.</span>Closing perspective</a></li>
                <li><a href="#references"><span className={styles.tocNumber}>15.</span>References</a></li>
              </ol>
            </nav>

            {/* ── 1. Problem statement ─────────────────────────── */}

            <h2 id="genomic-state-space-problem">The genomic state-space problem</h2>
            <p>
              With genomic-era diagnosis, myeloid disease classification is no longer a small checklist. It is a
              high-dimensional state space of genetic findings, cytogenetics, blast patterns, prior-treatment
              context, and clinical qualifiers, all evaluated through increasingly complex guideline logic. In
              practice, this can produce thousands of possible pathway combinations before arriving at a final
              subtype label.
            </p>

            <p>
              Expecting clinicians to execute that full combinatorial logic by hand, repeatedly and consistently,
              is not realistic. We need algorithmic execution for reliability, and we need formal verification
              layers so those algorithms can be checked for drift, contradiction, and internal coherence as they
              run in the real world.
            </p>

            <p>
              AML/MDS diagnosis is a chain of decisions under uncertainty. Modern standards have improved
              scientific precision, but they also increased complexity for teams building clinical software.
              The same patient profile can be interpreted through different guideline lenses, and that creates
              real implementation risk if software logic is not deeply validated.<sup><a href="#ref1" className={styles.citation}>1</a></sup>
              <sup><a href="#ref2" className={styles.citation}>2</a></sup>
            </p>

            <p>
              Recent research reinforces why pure LLM-based reasoning is insufficient for this kind of logic.
              The Imandra CodeLogician study demonstrated that large language models, when asked to reason
              precisely about program state spaces and control flow, exhibit a 41–47 percentage point accuracy
              gap compared to the same models augmented with formal automated
              reasoning.<sup><a href="#ref4" className={styles.citation}>4</a></sup> In clinical
              software, where silent misclassification can alter treatment decisions, that gap is not acceptable.
            </p>

            <p>
              At Haem.io, we use Imandra as an independent safety layer around our diagnostic decision system.
              The objective is not to replace clinicians. The objective is to make software behavior more
              trustworthy, more explainable, and easier to monitor when uncertainty is unavoidable.
            </p>

            <h3>Three operational risks we designed for</h3>
            <ul>
              <li>
                <strong>Extraction uncertainty:</strong> transforming narrative reports into structured inputs can
                still miss nuance or overstate findings.
              </li>
              <li>
                <strong>Implementation drift:</strong> systems can slowly diverge over time as models and rules evolve.
              </li>
              <li>
                <strong>Internal contradictions:</strong> some combinations of findings are logically incompatible
                and should be surfaced immediately.
              </li>
            </ul>

            {/* ── 2. Architecture (with bridging text about the twin) ── */}

            <h2 id="architecture">How we operationalise this in software</h2>
            <p>
              We use a three-layer <strong>neurosymbolic</strong> architecture — neural models handle
              extraction, deterministic logic handles classification, and formal symbolic reasoning handles
              verification — so each stage can be validated
              independently:<sup><a href="#ref4" className={styles.citation}>4</a></sup>
            </p>
            <ul>
              <li>A parsing layer (neural) that converts clinical narrative into structured findings.</li>
              <li>A deterministic decision layer that applies guideline logic.</li>
              <li>An independent formal reasoning layer (symbolic) that checks consistency and flags contradictions.</li>
            </ul>

            <p>
              The formal reasoning layer takes the form of what we call an <strong>IML digital twin</strong>: a
              second, independent implementation of the clinical decision policy written in
              Imandra&apos;s formal language. It serves a dual role — re-executing the same classification
              logic for parity checking, and running contradiction analysis to detect internally impossible
              clinical states. This means one system produces a decision, and an independent system both
              replicates that decision and checks whether it remains coherent with the same clinical context.
            </p>

            <p>
              In practice, this means teams can ship with more confidence, because the architecture is designed
              to detect silent inconsistencies before they become recurring operational debt.
            </p>

            {/* ── 3. Data flow (moved up, expanded) ────────────── */}

            <h2 id="data-flow">From unstructured report to typed diagnostic features</h2>
            <p>
              The core workflow starts by converting unstructured narrative reports into structured clinical
              context. The critical principle is preserving uncertainty instead of forcing binary certainty.
            </p>

            <p>
              We break extraction into focused subtasks — morphology, cytogenetics, molecular findings,
              and clinical context — and then merge outputs into one coherent clinical representation. Each
              subtask targets a specific report type, which reduces ambiguity in dense reports and improves
              consistency across case types. Where a finding is absent or ambiguous, the representation
              preserves that uncertainty rather than defaulting to a binary value.
            </p>

            <h3>From structured context to decisions and checks</h3>
            <p>
              The structured context then flows to both decision execution and formal checking, so the system can
              compare outcomes and surface potential contradictions in near real time. The next section walks
              through a single case to make this pipeline concrete.
            </p>

            {/* ── 4. Worked example: TP53 (moved up) ───────────── */}

            <h2 id="tp53-example">Worked example: biallelic TP53 case from report to diagnosis (and safety checks)</h2>
            <p>
              Below is a single end-to-end example showing how one case moves through the system: short report
              excerpts, a compact structured representation, and then two independent decision engines (production
              classifier and IML twin) producing a diagnosis while guardrails check for contradictions. This
              particular case also illustrates how WHO 2022 and ICC 2022 can reach different primary labels from
              identical inputs — a real-world complexity that the system is designed to surface, not hide.
            </p>

            <h3>1) Short versions of the input reports</h3>
            <p>
              In practice, the input is not one tidy document. It is a mixture of report styles that must be
              reconciled: morphology, cytogenetics, molecular findings, and clinical context.
            </p>

            <pre className={styles.codeBlock}>
{`Morphology (excerpt):
"Bone marrow aspirate: 22% blasts. Dyserythropoiesis and dysgranulopoiesis
are present. Megakaryocytes show hypolobated forms."

Cytogenetics (excerpt):
"46,XY,del(5)(q13q33),del(7q),del(17)(p13),-18,+mar[15]/46,XY[5].
Complex karyotype (3 or more abnormalities). del(17p) confirmed by FISH."

Molecular (excerpt):
"TP53 p.R175H pathogenic variant detected at 45% VAF. No second TP53
coding mutation identified; however, del(17p) confirmed by cytogenetics
indicates biallelic TP53 inactivation (multi-hit). No NPM1, CEBPA,
FLT3-ITD, RUNX1, or AML-defining fusion detected."

Clinical context (excerpt):
"72-year-old male. No prior cytotoxic therapy or radiation exposure
documented. Known DDX41 germline predisposition."`}
            </pre>

            <h3>2) Compact structured extraction (small JSON)</h3>
            <p>
              We extract a compact, structured summary that preserves uncertainty (unknown stays unknown) and
              keeps evidence grouped by clinical meaning rather than by report formatting.
            </p>

            <pre className={styles.codeBlock}>
{`{
  "blast_percentage": 22,
  "dysplastic_lineages": 2,
  "tp53": {
    "pathogenic_variant": "p.R175H",
    "vaf": 0.45,
    "del_17p": true,
    "biallelic": true
  },
  "cytogenetics": {
    "complex_karyotype": true,
    "abnormalities": ["del(5q)", "del(7q)", "del(17p)"]
  },
  "germline_predisposition": "DDX41",
  "therapy_related_context": "no_prior_therapy_reported"
}`}
            </pre>

            <h3>3) Two independent diagnosis engines — and guideline divergence</h3>
            <p>
              The production classifier computes a diagnosis from the structured case summary. In parallel, the
              IML digital twin computes the same diagnosis policy independently. In this case, both engines agree
              within each guideline, but the two guidelines themselves reach different primary labels from
              identical inputs. WHO 2022 prioritises the MDS-related cytogenetic pathway, while ICC 2022
              prioritises the TP53 multi-hit pathway. Both acknowledge the DDX41 germline context as a qualifier.
            </p>

            <pre className={styles.codeBlock}>
{`WHO 2022 output:
- AML, myelodysplasia related, associated with DDX41 (WHO 2022)
- Derivation: MDS-related cytogenetic abnormalities detected
  (complex karyotype, del(5q), del(7q), del(17p)) → AML, myelodysplasia
  related → DDX41 germline qualifier applied

ICC 2022 output:
- AML with mutated TP53, in the setting of DDX41 (ICC 2022)
- Derivation: TP53 multi-hit confirmed (biallelic inactivation)
  → AML with mutated TP53 → DDX41 germline qualifier applied`}
            </pre>

            <h3>4) Guardrail outputs for the same case</h3>
            <p>
              While both engines run, guardrails look for two classes of safety signals:
              parity mismatches (the two engines disagree within a single guideline) and impossibility signals
              (the case contains contradictory internal states). The WHO-vs-ICC label difference is expected
              behaviour — it reflects a genuine guideline divergence, not a software error.
            </p>

            <pre className={styles.codeBlock}>
{`Guardrail signals:
- Parity mismatch (WHO 2022): none (production and twin agree)
- Parity mismatch (ICC 2022): none (production and twin agree)
- Impossibility signals: none (no internal contradiction detected)
- ELN risk stratification: Adverse (both ELN 2022 and ELN 2024)`}
            </pre>

            <p>
              When a contradiction is present, the impossibility layer turns it into a concrete, reviewable
              warning tied to specific conflicting evidence. When drift is present, the mismatch signal becomes a
              regression candidate so the divergence is not reintroduced later.
            </p>

            {/* ── 5. Deep dive (consolidated "running live") ──── */}

            <h2 id="deep-dive">Imandra deep dive: model and guardrail semantics</h2>
            <p>
              With the end-to-end pipeline now concrete, this section explains how the IML digital twin is
              built, validated, and operated as a continuously running safety
              layer.<sup><a href="#ref3" className={styles.citation}>3</a></sup>
            </p>

            <h3>How we created the IML digital twin</h3>
            <p>
              We translated the decision structure of our production classifiers into formal model rules that
              mirror the clinical guideline intent. This is not a loose approximation. It is a rule-for-rule
              alignment process where each meaningful branch in production logic is represented in the twin and
              then reviewed against expected guideline behavior.
            </p>

            <h3>How we validated twin fidelity before live use</h3>
            <p>
              We validated fidelity in four layers: curated scenario parity, broad bounded-combination parity,
              randomized parity stress tests, and regression locking of historical failures. That gives us both
              depth on known edge cases and breadth across combinatorial space.
            </p>

            <h3>How it runs live in parallel</h3>
            <p>
              For each live case, the production classifier makes a decision while the IML twin runs in parallel
              on the same clinical context. If they agree, the case proceeds with a stronger confidence signal.
              If they disagree, the event is flagged as a parity mismatch for immediate review. Independently,
              the twin evaluates contradiction rules and records impossibility findings when present. These
              outputs are non-blocking safety signals: they do not replace clinician judgment, but they do give
              engineering and QA teams immediate visibility into drift and incoherence.
            </p>

            <h3>Why this matters for clinicians, founders, and Imandra teams</h3>
            <p>
              Clinicians gain clearer traceability when a decision is challenged. Founders gain measurable safety
              governance rather than anecdotal quality claims. Imandra teams can see formal methods used as a
              continuously operating assurance layer, not a one-off proof artifact.
            </p>

            {/* ── 6. IML implementation and safety properties ──── */}

            <h2 id="iml-implementation">Our Imandra IML implementation</h2>
            <p>
              Beyond parity testing and impossibility checks, we use Imandra to prove formal safety properties
              about the classifier logic itself. These properties are not test cases — they are mathematical
              guarantees that hold for every possible combination of inputs, not just the cases we happened
              to test.
            </p>
            <p>
              The distinction matters. A test suite with 1888 passing cases shows that those specific inputs
              produce correct outputs. A proved property shows that no input — out of the entire combinatorial
              space — can violate the invariant. For clinical software, this is the difference between
              &ldquo;we tested it thoroughly&rdquo; and &ldquo;we proved it cannot fail in this way.&rdquo;
            </p>

            <figure className={styles.figureBlock}>
              <div className={styles.archDiagram}>
                <div className={styles.archRow}>
                  {/* ── Stage 1: Lab Reports ── */}
                  <div className={styles.archBox}>
                    <div style={{ fontWeight: 600 }}>Lab Reports</div>
                    <div style={{ fontSize: '0.7rem', color: '#64748b' }}>
                      Cytogenetics, molecular,<br />morphology, clinical
                    </div>
                  </div>

                  <div className={styles.archArrow}>→</div>

                  {/* ── Stage 2: AI Extraction ── */}
                  <div className={styles.archBox}>
                    <div style={{ fontWeight: 600 }}>AI Extraction</div>
                    <div style={{ fontSize: '0.7rem', color: '#64748b', fontFamily: 'monospace' }}>
                      {`{ blasts, tp53, cyto, quals }`}
                    </div>
                  </div>

                  <div className={styles.archArrow}>→</div>

                  {/* ── Stage 3: IML Logic Engine ── */}
                  <div className={styles.archBoxIndigo}>
                    <div style={{ fontWeight: 600 }}>IML Logic Engine</div>
                    <div style={{ fontSize: '0.7rem', color: '#4338ca' }}>
                      WHO/ICC Classification<br />in Imandra
                    </div>
                  </div>

                  <div className={styles.archArrow}>→</div>

                  {/* ── Stage 4: Guardrail Gate ── */}
                  <div className={styles.archBoxCyan}>
                    <div style={{ fontWeight: 600, color: '#0e7490' }}>Guardrail Gate</div>
                    <div style={{ fontSize: '0.7rem', color: '#0e7490' }}>
                      Impossibility · Safety<br />Properties · Validation
                    </div>
                  </div>

                  <div className={styles.archArrow}>→</div>

                  {/* ── Stage 5: Two outcomes stacked ── */}
                  <div className={styles.archOutcomes}>
                    {/* PASS row */}
                    <div className={styles.archOutcomeRow}>
                      <div className={styles.archArrowPass}>✓</div>
                      <div className={styles.archBoxGreen}>
                        <div style={{ fontWeight: 700 }}>Diagnosis</div>
                        <div style={{ fontSize: '0.7rem', color: '#166534' }}>
                          WHO &amp; ICC labels + derivation steps
                        </div>
                      </div>
                      <div className={styles.archArrowPass}>→</div>
                      <div className={styles.archOutputs}>
                        <div className={styles.archOutputItem}>Treatment Options</div>
                        <div className={styles.archOutputItem}>Clinical Trials</div>
                        <div className={styles.archOutputItem}>Risk Stratification</div>
                      </div>
                    </div>

                    {/* FAIL row */}
                    <div className={styles.archOutcomeRow}>
                      <div className={styles.archArrowFail}>✗</div>
                      <div className={styles.archBoxRed}>
                        <div style={{ fontWeight: 700, color: '#991b1b' }}>Diagnosis Refused</div>
                        <div style={{ fontSize: '0.7rem', color: '#991b1b' }}>
                          Verbose error: contradictions,<br />
                          impossible inputs, or safety<br />
                          violations explained in detail
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <figcaption className={styles.figureCaption}>
                <strong>Figure: System architecture with IML logic engine and guardrails.</strong> The
                IML logic engine executes WHO/ICC classification directly in Imandra. Before a diagnosis
                is returned, a guardrail gate checks for input contradictions, impossibility signals, and
                safety property violations. If all guardrails pass, the diagnosis proceeds with full
                derivation steps. If any guardrail fails, the system refuses to issue a diagnosis and
                instead returns a verbose error explaining exactly which constraints were violated.
              </figcaption>
            </figure>

            <h3>Properties we prove</h3>
            <p>
              <strong>Totality.</strong> For every possible input, all four classifiers (AML WHO 2022,
              AML ICC 2022, MDS WHO 2022, MDS ICC 2022) produce a non-empty classification label. No
              patient case results in a silent failure — even error states and confirmation gates produce
              explicit, non-empty labels.
            </p>
            <p>
              <strong>Low-blast boundary safety (WHO).</strong> When blasts are below 20%, no AML-defining
              abnormality is present, and the case is not an erythroid or TAM entity, the WHO AML classifier
              always returns &ldquo;Not AML, consider MDS classification.&rdquo; This guarantees that
              low-blast patients without defining features are never over-classified as AML, preventing
              inappropriate treatment intensity. The erythroid pathway is the intentional exception per
              WHO 2022 guidelines, which permits certain erythroid entities below the standard 20% blast
              threshold.
            </p>
            <p>
              <strong>TP53 VUS exclusion.</strong> When a TP53 variant is classified as a variant of
              uncertain significance (VUS), the TP53 multi-hit pathway is always inactive regardless of
              other TP53 signals. This prevents VUS overinterpretation from incorrectly assigning a patient
              to the high-risk TP53-mutated entity.
            </p>
            <p>
              <strong>Qualifier separation.</strong> WHO labels never carry ICC-specific phrasing and ICC
              labels never carry WHO-specific phrasing. For example, WHO&apos;s therapy qualifier correctly
              ignores immune interventions (which ICC recognises), WHO uses &ldquo;associated
              with&rdquo; for germline context (while ICC uses &ldquo;in the setting of&rdquo;), and each
              label carries the correct scheme suffix. This proves that guideline-specific language is never
              cross-contaminated in the output.
            </p>

            <h3>What counterexample generation reveals</h3>
            <p>
              Not every candidate property passes — and the failures are as valuable as the proofs. We
              systematically attempted to prove that each clinically urgent entity is always correctly
              recognised. When Imandra cannot prove a property, it produces a concrete counterexample:
              a specific combination of inputs that violates the invariant. These counterexamples surface
              interaction effects that test suites are unlikely to cover because they require multiple
              unrelated clinical findings to be simultaneously present.
            </p>

            <p>
              <strong>APL masked by CEBPA confirmation gate.</strong> We attempted to prove that a positive
              PML::RARA always produces an APL diagnosis. Imandra found that when CEBPA bZIP ambiguity is
              also flagged, the classifier enters the CEBPA confirmation gate (step 2) before it reaches the
              PML::RARA check (step 3). The system returns &ldquo;Needs CEBPA confirmation&rdquo; instead of
              the expected APL label — even though APL is an oncologic emergency requiring immediate ATRA
              treatment. This is a systemic issue: the CEBPA gate masks <em>every</em> defining abnormality
              checked at step 3, including all core binding factor fusions (RUNX1::RUNX1T1, CBFB::MYH11)
              and BCR::ABL1.
            </p>

            <p>
              <strong>BCR::ABL1 missed at intermediate blast counts.</strong> We attempted to prove
              that BCR::ABL1 positivity always produces a BCR::ABL1-specific label. Imandra found that in
              the WHO classifier, BCR::ABL1 requires blasts &ge; 20%. A patient with BCR::ABL1 and 15% blasts
              receives &ldquo;Not AML, consider MDS classification&rdquo; — missing a disease that requires
              TKI therapy (imatinib/dasatinib). The ICC classifier catches this case (threshold is 10%), but
              at blasts below 10% both classifiers miss it. The counterexample asks: should BCR::ABL1
              positivity always trigger at minimum a CML workup flag, regardless of blast percentage?
            </p>

            <p>
              <strong>Down syndrome TAM masked by co-occurring mutations.</strong> This is the highest-risk
              finding. We attempted to prove that a Down syndrome neonate (age &le; 90 days, GATA1 mutation
              positive) always receives the TAM (Transient Abnormal Myelopoiesis) diagnosis. Imandra found
              that when blasts &ge; 20% and any MDS-related gene mutation (e.g. ASXL1) is also present,
              the classifier assigns &ldquo;AML, myelodysplasia related&rdquo; — because the MDS mutation
              check at step 5 fires before the TAM check at step 7c is reached. TAM typically self-resolves;
              misclassifying it as AML could lead to aggressive chemotherapy in a neonate whose condition
              would resolve spontaneously.
            </p>

            <p>
              <strong>TP53 VUS gap across classifiers.</strong> The TP53 VUS exclusion property (P3 above)
              holds for the shared <code>classify_tp53_pathway</code> function used by the AML ICC classifier.
              However, the MDS classifiers use separate biallelic-check functions that do not inspect VUS
              status. If a TP53 variant of uncertain significance co-occurs with biallelic evidence, the MDS
              classifiers assign the high-risk TP53-mutated entity without checking VUS. The impossibility
              guardrail catches this contradiction at a separate layer, but the classifier itself has no
              internal safeguard.
            </p>

            <p>
              Each of these counterexamples becomes a concrete input for clinical review and a candidate
              for logic hardening. This is the practical value of property proving: it surfaces not just bugs,
              but design questions that would otherwise remain hidden in the combinatorial space.
            </p>

            {/* ── 7. Parity strategy (added id) ────────────────── */}

            <h2 id="parity-strategy">Parity strategy: how we keep implementations synchronized</h2>
            <p>
              Independent safety layers are only useful when they stay aligned with production logic over time.
              We use a staged validation strategy so drift is detected early and then locked down.
            </p>

            <h3>1) Curated scenario checks</h3>
            <p>
              High-impact, clinically meaningful scenarios are continuously replayed to confirm stable behavior.
            </p>

            <h3>2) Broad combinatorial coverage</h3>
            <p>
              We evaluate large sets of feature combinations so edge-case interactions are tested, not assumed.
            </p>

            <h3>3) Randomized stress testing</h3>
            <p>
              Randomized case generation finds unusual combinations that hand-written suites may miss.
            </p>

            <h3>4) Regression locking</h3>
            <p>
              Once a failure pattern is found and fixed, it is promoted into permanent checks to prevent
              reintroduction.
            </p>

            {/* ── 7. Telemetry (added id) ──────────────────────── */}

            <h2 id="telemetry">Telemetry, artifacts, and non-blocking safety rollout</h2>
            <p>
              Every live evaluation contributes to an operational safety signal stream: parity mismatches,
              impossibility detections, and availability events. This turns safety from a one-time checklist into
              an operating discipline with measurable trend lines.
            </p>
            <p>
              Operationally, this makes quality improvement faster: recurring warning patterns can be triaged,
              reviewed, and folded back into parser and logic hardening cycles, then re-locked into regression.
            </p>

            {/* ── 8. Validation evidence (removed duplicate "running live") ── */}

            <h2 id="evidence">Validation evidence (aggregated internal metrics)</h2>
            <p>
              We do not treat these metrics as marketing numbers. We treat them as operating evidence that the
              digital twin stays aligned with production logic while running in parallel at live speed. Values
              below reflect the latest local validation run.
            </p>
            <p>
              This is the canonical public snapshot for every test-result category mentioned in this section:{' '}
              <Link href="/articles/imandra-validation-results">Imandra Validation Results</Link>.
            </p>
            <p>
              You can inspect exact case-level inputs and outputs at{' '}
              <Link href="/articles/imandra-validation-results#exact-test-data">the exact test data section</Link>.
            </p>

            <h3>What these metrics represent</h3>
            <ul>
              <li>
                <strong>Parity pass rate:</strong> how often primary and twin systems agree across the full test
                strategy.
              </li>
              <li>
                <strong>Impossibility detection performance:</strong> whether contradiction scenarios are surfaced
                consistently.
              </li>
              <li>
                <strong>Runtime overhead:</strong> the additional time cost of parallel formal checking.
              </li>
              <li>
                <strong>Regression stability:</strong> whether previously fixed failures remain fixed.
              </li>
            </ul>

            <div className={styles.metricGrid}>
              <div className={styles.metricCard}>
                <div className={styles.metricLabel}>
                  <Link href="/articles/imandra-validation-results#parity-suite">
                    Parity pass rate (all suites)
                  </Link>
                </div>
                <div className={styles.metricValue}>
                  <Link href="/articles/imandra-validation-results#parity-suite">100%</Link>
                </div>
                <p className={styles.metricNote}>
                  Combined reliability across scenario checks, broad coverage, and randomized testing.
                </p>
              </div>
              <div className={styles.metricCard}>
                <div className={styles.metricLabel}>
                  <Link href="/articles/imandra-validation-results#impossibility-publication">
                    Impossibility challenge-set publication
                  </Link>
                </div>
                <div className={styles.metricValue}>
                  <Link href="/articles/imandra-validation-results#impossibility-publication">Published</Link>
                </div>
                <p className={styles.metricNote}>
                  Contradiction case families and expected impossibility behavior are published on the validation page.
                </p>
              </div>
              <div className={styles.metricCard}>
                <div className={styles.metricLabel}>
                  <Link href="/articles/imandra-validation-results#matrix-summary">Matrix comparison coverage</Link>
                </div>
                <div className={styles.metricValue}>
                  <Link href="/articles/imandra-validation-results#matrix-summary">1888/1888</Link>
                </div>
                <p className={styles.metricNote}>
                  Python-vs-expected and Imandra-vs-Python comparisons matched in the latest matrix run.
                </p>
              </div>
              <div className={styles.metricCard}>
                <div className={styles.metricLabel}>
                  <Link href="/articles/imandra-validation-results#result-interpretation">Suite status</Link>
                </div>
                <div className={styles.metricValue}>
                  <Link href="/articles/imandra-validation-results#result-interpretation">6/6 Passed</Link>
                </div>
                <p className={styles.metricNote}>
                  Regressions, parity, exhaustive, property, TP53 parity, and matrix comparison all passed.
                </p>
              </div>
            </div>

            <p className={styles.metricDisclaimer}>
              Metrics are engineering validation metrics, not clinical outcome claims.
            </p>

            {/* ── 9. Visualisation ─────────────────────────────── */}

            <h2 id="visualisation">How we present diagnosis and visualise decision paths</h2>
            <p>
              The screenshots below follow the same TP53/DDX41 case through the system. They are grouped into
              three areas: how the parser surfaces structured findings, how the classifier presents its outputs,
              and how we make the underlying execution path inspectable at multiple zoom levels.
            </p>

            <h3>Parsing and structured input</h3>
            <p>
              Before any classification runs, the system parses the raw report into a structured summary. This
              view makes it immediately clear which clinical features were extracted, which TP53 signals were
              detected, and how the karyotype was decomposed — so reviewers can verify extraction fidelity before
              inspecting the decision itself.
            </p>

            <figure className={styles.figureBlock}>
              <div className={styles.figureImage}>
                <Image
                  src="/screenshots/tp53-input-data-summary.png"
                  alt="Input data summary showing parsed TP53 status, cytogenetic abnormalities, and karyotype"
                  width={1600}
                  height={1100}
                />
              </div>
              <figcaption className={styles.figureCaption}>
                <strong>Figure 1: Input data summary.</strong> Structured extraction output for the TP53/DDX41
                case, showing TP53 status badges, cytogenetic abnormalities, dysplastic lineage count, and the
                original karyotype string. Manual inputs (blast percentage, germline predisposition) are shown
                alongside AI-parsed values.
              </figcaption>
            </figure>

            <h3>Classification and derivation</h3>
            <p>
              The system presents WHO 2022 and ICC 2022 classifications side by side, each with a full derivation
              trace. In this case, the two guidelines reach different primary labels from identical inputs — WHO
              prioritises the MDS-related cytogenetic pathway while ICC prioritises the TP53 multi-hit pathway.
              Making both derivation chains visible is what allows clinicians and QA teams to understand exactly
              where and why the guidelines diverge.
            </p>

            <figure className={styles.figureBlock}>
              <div className={styles.figureImage}>
                <Image
                  src="/screenshots/tp53-classification-results-with-derivations.png"
                  alt="Classification results showing WHO 2022 and ICC 2022 side by side with full derivation steps"
                  width={1600}
                  height={1100}
                />
              </div>
              <figcaption className={styles.figureCaption}>
                <strong>Figure 2: Classification results with derivation steps.</strong> WHO 2022 reaches
                &ldquo;AML, myelodysplasia related, associated with DDX41&rdquo; via the MDS-related cytogenetics
                pathway. ICC 2022 reaches &ldquo;AML with mutated TP53, in the setting of DDX41&rdquo; via the
                TP53 multi-hit pathway. Each step in the derivation is numbered and auditable.
              </figcaption>
            </figure>

            <figure className={styles.figureBlock}>
              <div className={styles.figureImage}>
                <Image
                  src="/screenshots/tp53-risk-stratification.png"
                  alt="Risk stratification showing ELN 2022 and ELN 2024 adverse risk categories"
                  width={1600}
                  height={1100}
                />
              </div>
              <figcaption className={styles.figureCaption}>
                <strong>Figure 3: Risk stratification.</strong> Both ELN 2022 intensive and ELN 2024
                non-intensive frameworks classify this case as Adverse risk. The calculation steps are
                expandable for audit.
              </figcaption>
            </figure>

            <h3>Execution path visualisation</h3>
            <p>
              We provide multiple levels of trace visualisation so teams can follow the decision path from
              end-to-end overview down to individual branch logic. Teal nodes indicate the path the classifier
              followed; red nodes show branches that were evaluated and rejected. This is what makes parity
              review and mismatch triage practical.
            </p>

            <figure className={styles.figureBlock}>
              <div className={styles.figureImage}>
                <Image
                  src="/screenshots/tp53-full-execution-path.png"
                  alt="Full WHO 2022 AML execution path showing accepted and rejected branches"
                  width={1600}
                  height={1100}
                />
              </div>
              <figcaption className={styles.figureCaption}>
                <strong>Figure 4: Full execution path.</strong> End-to-end WHO 2022 AML decision trace for
                this case. Red (rejected) and teal (accepted) branches show every evaluation point the
                classifier traversed to reach the final label.
              </figcaption>
            </figure>

            <figure className={styles.figureBlock}>
              <div className={styles.figureImage}>
                <Image
                  src="/screenshots/tp53-execution-path-branches.png"
                  alt="Execution path showing branch-level detail with rejected and accepted decision nodes"
                  width={1600}
                  height={1100}
                />
              </div>
              <figcaption className={styles.figureCaption}>
                <strong>Figure 5: Branch-level trace detail.</strong> Closer view of the branching structure,
                showing where the classifier evaluated and rejected alternative pathways before settling on
                the MDS-related cytogenetics route.
              </figcaption>
            </figure>


            {/* ── 10. Benefits ─────────────────────────────────── */}

            <h2 id="how-this-helps">How this helps Haem.io</h2>
            <ul>
              <li>
                <strong>Independent verification:</strong> two implementations assess the same case, reducing
                silent single-path failure.
              </li>
              <li>
                <strong>Better QA triage:</strong> mismatch and impossibility events surface edge cases early.
              </li>
              <li>
                <strong>Auditability:</strong> rule IDs, severity, and evidence fields are captured in structured
                form.
              </li>
              <li>
                <strong>Safe deployment posture:</strong> soft guardrails allow monitoring in production without
                interrupting clinical workflow.
              </li>
              <li>
                <strong>Faster hardening cycle:</strong> promoted artifacts become permanent regression checks.
              </li>
            </ul>

            {/* ── 11. Limits ───────────────────────────────────── */}

            <h2 id="limits">What this does not claim</h2>
            <p>It is important to be explicit about scope and limitations:</p>
            <ul>
              <li>A safety warning indicates system-level inconsistency, not automatic proof of clinical error.</li>
              <li>
                Contradiction checks operate within the information available to the software and do not replace
                full specialist review workflows.
              </li>
              <li>
                This safety layer still requires ongoing maintenance as diagnostic logic and guidelines evolve.
              </li>
            </ul>

            {/* ── 12. Broader relevance ────────────────────────── */}

            <h2 id="broader-relevance">Broader relevance to other diagnostic software</h2>
            <p>
              This pattern is transferable beyond haematology: probabilistic extraction plus deterministic
              execution plus formal guardrails can strengthen any diagnostic software stack that combines
              unstructured clinical text with guideline-driven classification logic.
            </p>
            <p>
              The neurosymbolic paradigm — using neural models where flexibility matters and formal reasoning
              where precision matters — is gaining traction across safety-critical domains. The CodeLogician
              work demonstrates this in financial and software systems; our implementation demonstrates it in
              clinical diagnostics.<sup><a href="#ref4" className={styles.citation}>4</a></sup> In both
              cases, the insight is the same: LLMs are powerful extractors and translators, but they cannot
              be trusted as sole arbiters of combinatorial logic. Formal methods close that gap.
            </p>
            <p>
              In other domains, the exact rule content will differ, but the architecture remains valuable:
              explicit unknown-state modeling, independent implementation checks, contradiction diagnostics, and
              regression promotion from real-world failures into permanent tests.
            </p>

            {/* ── 13. Closing (renamed, no phantom "next step") ── */}

            <h2 id="closing">Closing perspective</h2>
            <p>
              Formal methods are not a replacement for clinicians, and they are not a replacement for careful
              software engineering. They are a practical safety layer that makes diagnostic systems easier to
              trust, inspect, and improve. In our implementation, Imandra helps turn safety from an abstract
              objective into concrete runtime signals and testable invariants.
            </p>

            <div className={styles.ctaBox}>
              <p>
                We are actively building this architecture at Haem.io. If you are evaluating formal methods for
                diagnostic software assurance, we can share a live walkthrough of this safety architecture
                from report interpretation to decision verification.
              </p>
              <p>
                Contact us at{' '}
                <a href="mailto:robert.lee@haem.io">robert.lee@haem.io</a> for a technical demo.
              </p>
            </div>

            {/* ── 14. References ───────────────────────────────── */}

            <h2 id="references">References</h2>
            <ol className={styles.referencesList}>
              <li id="ref1">
                Khoury JD, Solary E, Abla O, et al. The 5th edition of the World Health Organization
                Classification of Haematolymphoid Tumours: Myeloid and Histiocytic/Dendritic Neoplasms.
                <em> Leukemia</em>. 2022.
              </li>
              <li id="ref2">
                Arber DA, Orazi A, Hasserjian RP, et al. International Consensus Classification of Myeloid
                Neoplasms and Acute Leukemias. <em>Blood</em>. 2022.
              </li>
              <li id="ref3">
                Imandra Inc. Imandra platform documentation and API references. Available at:
                {' '}
                <a href="https://docs.imandra.ai/" target="_blank" rel="noopener noreferrer">
                  docs.imandra.ai
                </a>
                .
              </li>
              <li id="ref4">
                Lin H, Abdallah S, Valentinov M, Brennan P, Kagan E, Wintersteiger CM, Ignatovich D,
                Passmore G. Imandra CodeLogician: Neuro-Symbolic Reasoning for Precise Analysis of Software
                Logic. <em>arXiv preprint</em>. 2026. Available at:
                {' '}
                <a href="https://arxiv.org/abs/2601.11840" target="_blank" rel="noopener noreferrer">
                  arXiv:2601.11840
                </a>
                .
              </li>
            </ol>
          </div>
        </article>
      </div>
    </div>
  );
}
