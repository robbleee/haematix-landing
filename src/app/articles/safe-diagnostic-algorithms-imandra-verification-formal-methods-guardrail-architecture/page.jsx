import styles from './article.module.css';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Neurosymbolic Diagnostic Algorithms with Imandra formal verification | Haem.io',
  description:
    'How we replaced our core diagnostic classifier with formally verified IML code, validated by parity testing and supported by runtime guardrails.',
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
            <h1 className={styles.title}>Neurosymbolic Diagnostic Algorithms with Imandra formal verification at Haem.io</h1>
            <p className={styles.subtitle}>
              Diagnostics is becoming more complex. We need safe, intellligent systems that can handle the complexity.
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
                <li><a href="#architecture"><span className={styles.tocNumber}>2.</span>How the system works</a></li>
                <li><a href="#data-flow"><span className={styles.tocNumber}>3.</span>From reports to structured features</a></li>
                <li><a href="#tp53-example"><span className={styles.tocNumber}>4.</span>Worked example: biallelic TP53 case</a></li>
                <li><a href="#deep-dive"><span className={styles.tocNumber}>5.</span>Imandra: from digital twin to production</a></li>
                <li><a href="#iml-implementation"><span className={styles.tocNumber}>6.</span>Our Imandra IML implementation</a></li>
                <li><a href="#parity-strategy"><span className={styles.tocNumber}>7.</span>Parity strategy: Python-to-IML migration</a></li>
                <li><a href="#telemetry"><span className={styles.tocNumber}>8.</span>Telemetry, artifacts, and safety rollout</a></li>
                <li><a href="#evidence"><span className={styles.tocNumber}>9.</span>Validation evidence</a></li>
                <li><a href="#visualisation"><span className={styles.tocNumber}>10.</span>Diagnosis and decision path visualisation</a></li>
                <li><a href="#how-this-helps"><span className={styles.tocNumber}>11.</span>How this helps Haem.io</a></li>
                <li><a href="#limits"><span className={styles.tocNumber}>12.</span>What this does not claim</a></li>
                <li><a href="#broader-relevance"><span className={styles.tocNumber}>13.</span>Where else this approach works</a></li>
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
              practice, this can produce hundreds thousands of possible pathway combinations before arriving at a final
              subtype label.
            </p>

            <p>
              Expecting clinicians to execute that full combinatorial logic by hand, repeatedly and consistently,
              is not realistic. We need algorithmic execution for reliability, and we need formal verification
              layers so those algorithms can be checked for drift, contradiction, and internal coherence as they
              run in the real world. Diagnosticians in the west (and increasingly in LMEs) are expected to do this,
               though, hundreds of times per year, and these diagnoses are clinically critical. It can be the 
               difference between being put on a chemotherapy regimen or not.
            </p>


            <p>
              

            </p>
          

            {/* ── 2. Architecture (with bridging text about the twin) ── */}

            <h2 id="architecture">How Haemio works</h2>
            <p>
              We use a three-layer <strong>neurosymbolic</strong> architecture. Neural models handle
              extraction, deterministic logic handles classification, and formal symbolic reasoning handles
              verification. This lets us validate each stage
              independently:<sup><a href="#ref4" className={styles.citation}>4</a></sup>
            </p>
            <ul>
              <li>A parsing layer (neural) that converts clinical narrative (clinical notes, cytogenetics, molecular findings) into structured findings.</li>
              <li>A deterministic decision layer, now written entirely in IML, that applies guideline logic.</li>
              <li>A formal reasoning layer (symbolic), built into the same IML codebase, that checks consistency, proves safety properties, and flags contradictions.</li>
            </ul>

            <p>
              This was not our starting point. We originally built our classifiers in Python. Later, in parallel,
              we created an <strong>IML digital twin</strong>, a second independent
              implementation of the clinical decision policy written in Imandra&apos;s formal language. The
              twin served two roles: re-executing the same classification logic for parity checking, and
              running contradiction analysis to detect internally impossible clinical states.
            </p>

            <p>
              Rather than maintaining both implementations indefinitely, we ran an extensive parity testing
              program across curated scenarios, bounded-combination sweeps, randomized stress tests, and
              regression fixtures. Once the IML twin matched the Python classifier across every test vector
              (100% parity across 1888 classifier comparisons), we retired the Python classifier and
              replaced it with the IML digital twin. 
            </p>

            <p>
              This changes how we build and maintain the classifier. It is written in a language that supports
              mathematical proof, impossibility detection, and counterexample generation. These are now features
              of the production code and not an external wrapper.
            </p>

            {/* ── 3. Data flow (moved up, expanded) ────────────── */}

            <h2 id="data-flow">From reports to structured features</h2>
            <p>
              The core workflow starts by converting unstructured narrative reports into structured clinical
              context. The critical principle is preserving uncertainty instead of forcing binary certainty.
            </p>

            <p>
              We break extraction into focused subtasks (morphology, cytogenetics, molecular findings, and
              clinical context) and then merge outputs into one coherent clinical representation. Each
              subtask targets a specific report type, which reduces ambiguity in dense reports and improves
              consistency across case types. Where a finding is absent or ambiguous, the representation
              preserves that uncertainty rather than defaulting to a binary value.
            </p>

     
            <p>
              The structured context then flows to the IML classifier, which handles both guideline-driven
              classification and formal safety checking in a single pass. Impossibility signals and safety
              property violations are evaluated alongside the classification itself, so contradictions are
              surfaced in near real time. The next section walks through a single case to make this pipeline
              concrete.
            </p>

            {/* ── 4. Worked example: TP53 (moved up) ───────────── */}

            <h2 id="tp53-example">Worked example: biallelic TP53 case from report to diagnosis (and safety checks)</h2>
            <p>
              Below is a single end-to-end example showing a highly simplified example of how one case moves through the system: short report
              excerpts, a compact structured representation, and then the IML classifier producing a diagnosis
              while built-in guardrails check for contradictions. This particular case also illustrates how
              WHO 2022 and ICC 2022 can reach different primary labels from identical inputs. That is a
              real-world complexity that the system is designed to surface, not hide.
            </p>

            <h3>1) Short versions of the input reports</h3>
            <p>
              The input is rarely ever one tidy document. It is a mixture of report styles that must be
              integrated: morphology, cytogenetics, molecular findings, and clinical context.
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
              We extract a compact, a JSON object that preserves uncertainty (unknown stays unknown) and
              keeps evidence grouped by clinical meaning rather than by report formatting. In production we are looking for over 200 separate fields to parse, this poses its own challenges due in part to the ambiguities of English prose . 
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

            <h3>3) IML classifier output and guideline divergence</h3>
            <p>
              The IML classifier computes a diagnosis from the structured case summary under both WHO 2022 and
              ICC 2022 guidelines. In this case, the two guidelines reach different primary labels from identical
              inputs. WHO 2022 prioritises the MDS-related cytogenetic pathway, while ICC 2022 prioritises the
              TP53 multi-hit pathway. Both acknowledge the DDX41 germline context as a qualifier. We show that
              divergence on purpose. Clinicians need to see where guidelines disagree.
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
              Alongside classification, the IML codebase evaluates guardrail rules that look for impossibility
              signals (cases where the clinical context contains contradictory internal states). The WHO-vs-ICC
              label difference is expected behaviour. It reflects a genuine guideline divergence, not a
              software error.
            </p>

            <pre className={styles.codeBlock}>
{`Guardrail signals:
- Impossibility signals: none (no internal contradiction detected)
- Safety property violations: none
- ELN risk stratification: Adverse (both ELN 2022 and ELN 2024)`}
            </pre>

            <p>
              When a contradiction is present, the impossibility layer turns it into a concrete, reviewable
              error message tied to specific conflicting evidence. Because the classifier and the guardrails share
              the same IML codebase, these checks are evaluated as part of the same execution. They are not a
              separate system that might fall out of sync.
            </p>

            {/* ── 5. Deep dive (consolidated "running live") ──── */}





            {/* ── 6. IML implementation and safety properties ──── */}

            <h2 id="iml-implementation">Our Imandra IML implementation</h2>
            <p>
              Because the classifier is now written in IML, we can do more than run it. We can prove formal
              safety properties about its logic. These properties are not test cases. They are mathematical
              guarantees that hold for every possible combination of inputs, not just the cases we happened
              to test.
            </p>
            <p>
              That difference matters in clinical software. A test suite with 1888 passing cases shows that
              those specific inputs produce correct outputs. A proved property shows that no input out of the
              entire combinatorial space can violate the invariant. For clinical software, this is the
              difference between
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
                IML logic engine executes WHO/ICC classification directly. Before a diagnosis
                is returned, a guardrail gate checks for input contradictions, impossibility signals, and
                safety property violations. If all guardrails pass, the diagnosis proceeds with full
                derivation steps. If any guardrail fails, the system refuses to issue a diagnosis and
                instead returns a verbose error explaining exactly which constraints were violated.
              </figcaption>
            </figure>

            <h3>Actual IML guardrail code</h3>
            <p>
              Below are excerpts from our production IML codebase. These are not pseudocode or
              simplified illustrations. They are the actual functions that run in our classifier and
              guardrail pipeline. We include them here because the specificity matters: these are the
              rules that determine whether a diagnosis proceeds or gets blocked.
            </p>

            <h4>Three-state boolean: modelling clinical uncertainty</h4>
            <p>
              Clinical data is not binary. A test result can be positive, negative, or simply not
              performed. Our type system enforces this distinction at every decision point. No field
              silently defaults to true or false when the information is absent.
            </p>

            <pre className={styles.codeBlock}>
{`(* Three-state boolean — maps Python's True / False / None *)
(* BTrue   = explicitly positive  (test confirmed)
   BFalse  = explicitly negative  (test ruled out)
   BUnknown = unknown / not tested / not mentioned *)

type tribool =
  | BTrue
  | BFalse
  | BUnknown

let is_true (v : tribool) : bool =
  match v with
  | BTrue -> true
  | _ -> false`}
            </pre>

            <h4>TP53 VUS contradiction guardrail</h4>
            <p>
              This guardrail detects when a TP53 variant is classified as a variant of uncertain
              significance (VUS) while simultaneous pathogenic TP53 evidence is also present. That
              combination is a clinical impossibility: if the variant is truly uncertain, there should
              be no confirmatory signals. If detected, the system flags it as a high-severity
              contradiction before classification proceeds.
            </p>

            <pre className={styles.codeBlock}>
{`(* TP53 VUS with pathogenic evidence — clinical impossibility *)

let tp53_pathogenic_signal =
  is_true d.tp53.two_tp53_mutations ||
  is_true d.tp53.tp53_del17p ||
  is_true d.tp53.tp53_loh ||
  is_true d.tp53.tp53_50_vaf ||
  is_true d.tp53.tp53_10_vaf
in
if is_true d.tp53.tp53_vus && tp53_pathogenic_signal then
  mk_diag
    "impossible.tp53.tp53_vus_with_pathogenic_tp53_evidence"
    High
    "TP53 VUS conflicts with pathogenic TP53 evidence signals."
    [ "tp53.tp53_vus"; "tp53.two_tp53_mutations";
      "tp53.tp53_del17p"; "tp53.tp53_loh";
      "tp53.tp53_50_vaf"; "tp53.tp53_10_vaf" ]`}
            </pre>

            <h4>Cross-field age consistency check</h4>
            <p>
              When both age-in-days and age-in-years are provided, they must agree. A large discrepancy
              between the two fields indicates a data entry error or an upstream parsing failure. This
              check catches the inconsistency before it silently corrupts a blast threshold or
              age-gated classification pathway.
            </p>

            <pre className={styles.codeBlock}>
{`(* Age-in-days vs age-in-years cross-field consistency *)

match d.age_days, d.age_years with
| Some ad, Some ay ->
  let ad_years = (float_of_int ad) /. 365.25 in
  let diff = abs_float (ad_years -. ay) in
  if diff > 2.0 then
    mk_diag
      "impossible.cross_field.age_days_age_years_inconsistent"
      High
      "Age in days and age in years are materially inconsistent."
      ["age_days"; "age_years"]
  else diags
| _ -> diags`}
            </pre>

            <h4>Down syndrome TAM in adult context</h4>
            <p>
              Transient Abnormal Myelopoiesis (TAM) is a neonatal entity specific to Down syndrome.
              If the system encounters Down syndrome plus GATA1 mutation flags on an adult patient,
              that combination is temporally impossible. This guardrail prevents a neonatal diagnosis
              pathway from being applied to a patient whose age contradicts the entity&apos;s clinical
              definition.
            </p>

            <pre className={styles.codeBlock}>
{`(* Down syndrome TAM context with adult age — temporal impossibility *)

match d.age_years with
| Some ay when ay >= 18.0 && d.down_syndrome && d.gata1_mutation ->
  mk_diag
    "impossible.temporal.down_syndrome_gata1_with_adult_age"
    Medium
    "Down syndrome + GATA1 neonatal context conflicts with adult age."
    ["age_years"; "down_syndrome"; "gata1_mutation"]
| _ -> diags`}
            </pre>

            <h4>TP53 pathway classification with VUS exclusion</h4>
            <p>
              This is the actual production TP53 pathway function used by the AML ICC classifier. The
              first line blocks the entire pathway if the variant is VUS. Then it evaluates five
              independent biallelic criteria, including the ICC-specific surrogate of VAF &ge; 10%
              plus complex karyotype. The blast thresholds determine whether the output is AML,
              MDS/AML, or deferred to MDS classification.
            </p>

            <pre className={styles.codeBlock}>
{`(* TP53 pathway — shared between classifiers, parameterised *)

let classify_tp53_pathway
    (blasts : real) (tp53 : tp53_data)
    (cyto : mds_cytogenetics)
    (include_complex_karyotype_surrogate : bool) : string =
  (* VUS excludes all TP53 data — this is the P3 safety property *)
  if is_true tp53.tp53_vus then ""
  else
    let has_complex = is_true cyto.complex_karyotype in
    let has_low_vaf_plus_complex =
      is_true tp53.tp53_10_vaf && has_complex
        && include_complex_karyotype_surrogate
    in
    let biallelic_met =
      is_true tp53.two_tp53_mutations ||
      is_true tp53.tp53_del17p ||
      is_true tp53.tp53_loh ||
      is_true tp53.tp53_50_vaf ||
      is_true tp53.tp53_10_vaf ||
      has_low_vaf_plus_complex
    in
    if biallelic_met then
      if blasts < 10.0 then
        "Not AML, consider MDS classification"
      else if blasts < 20.0 then
        "MDS/AML with mutated TP53"
      else "AML with mutated TP53"
    else ""`}
            </pre>

            <h4>Formal safety theorem: totality</h4>
            <p>
              This is a theorem, not a test. Imandra proves that the following holds for <em>every
              possible input</em> to the classifier. No matter what combination of genetic findings,
              blast counts, age, therapy history, or clinical context is provided, the classifier
              always returns a non-empty label. There is no silent failure mode.
            </p>

            <pre className={styles.codeBlock}>
{`(* P1: Totality — every input produces a non-empty label *)

theorem totality_aml_who2022 (d : parsed_data) =
  (classify_aml_who2022 d).label <> ""

theorem totality_aml_icc2022 (d : parsed_data) =
  (classify_aml_icc2022 d).label <> ""

theorem totality_mds_who2022 (d : parsed_data) =
  (classify_mds_who2022 d).label <> ""

theorem totality_mds_icc2022 (d : parsed_data) =
  (classify_mds_icc2022 d).label <> ""`}
            </pre>

            <h4>Formal safety theorem: WHO low-blast boundary</h4>
            <p>
              This theorem proves that when blasts are below 20%, no AML-defining abnormality matches,
              and the case is not erythroid or TAM, the WHO AML classifier always returns the
              non-AML sentinel. This is not tested on a sample; it is proved across the full
              combinatorial input space.
            </p>

            <pre className={styles.codeBlock}>
{`(* P2: WHO low-blast boundary safety *)

theorem who_low_blast_boundary (d : parsed_data) =
  match d.blasts_percentage with
  | Some b when b >= 0.0 && b < 20.0 ->
    let no_cebpa_gate =
      not (d.cebpa_bzip_ambiguous && d.cebpa_present) in
    let no_defining =
      classify_who_defining_abnormalities d.aml_defining b = "" in
    let no_erythroid =
      classify_erythroid d.aml_differentiation d.erythroid = "" in
    let no_tam =
      not (d.down_syndrome && d.gata1_mutation &&
        (match d.age_days with
         | Some ad -> ad <= 90 | None -> false)) in
    (no_cebpa_gate && no_defining && no_erythroid && no_tam)
    ==>
    (classify_aml_who2022 d).label =
      "Not AML, consider MDS classification"
  | _ -> true`}
            </pre>

            <p>
              Each guardrail diagnostic includes a stable rule ID (e.g.
              {' '}<code>impossible.tp53.tp53_vus_with_pathogenic_tp53_evidence</code>), a severity
              level, a human-readable message, and the list of evidence fields involved. This
              structure is consumed by the API and the WebGUI for runtime display and telemetry
              aggregation. The full guardrail module contains 16 impossibility checks across range
              validation, cross-field consistency, temporal logic, and schema coherence categories.
            </p>

            <h3>Properties we prove (not exhaustive)</h3>
            <p>
              <strong>Totality.</strong> For every possible input, all four classifiers (AML WHO 2022,
              AML ICC 2022, MDS WHO 2022, MDS ICC 2022) produce a non-empty classification label. No
              patient case results in a silent failure. Even error states and confirmation gates produce
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
              Not every candidate property passes. The failures are as valuable as the proofs. We
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
              the expected APL label. This matters because APL is an oncologic emergency requiring immediate ATRA
              treatment. This is a systemic issue: the CEBPA gate masks <em>every</em> defining abnormality
              checked at step 3, including all core binding factor fusions (RUNX1::RUNX1T1, CBFB::MYH11)
              and BCR::ABL1.
            </p>

            <p>
              <strong>BCR::ABL1 missed at intermediate blast counts.</strong> We attempted to prove
              that BCR::ABL1 positivity always produces a BCR::ABL1-specific label. Imandra found that in
              the WHO classifier, BCR::ABL1 requires blasts &ge; 20%. A patient with BCR::ABL1 and 15% blasts
              receives &ldquo;Not AML, consider MDS classification&rdquo;, which would miss a disease that requires
              TKI therapy (imatinib/dasatinib). The ICC classifier catches this case (threshold is 10%), but
              at blasts below 10% both classifiers miss it. The counterexample asks: should BCR::ABL1
              positivity always trigger at minimum a CML workup flag, regardless of blast percentage?
            </p>

            <p>
              <strong>Down syndrome TAM masked by co-occurring mutations.</strong> This is the highest-risk
              finding. We attempted to prove that a Down syndrome neonate (age &le; 90 days, GATA1 mutation
              positive) always receives the TAM (Transient Abnormal Myelopoiesis) diagnosis. Imandra found
              that when blasts &ge; 20% and any MDS-related gene mutation (e.g. ASXL1) is also present,
              the classifier assigns &ldquo;AML, myelodysplasia related&rdquo; because the MDS mutation
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

            <h2 id="parity-strategy">Parity strategy: how we validated the Python-to-IML migration</h2>
            <p>
              Before retiring the Python classifier, we needed high-confidence evidence that the IML
              implementation produced identical results. We used a staged validation strategy with four
              layers, each designed to catch different classes of divergence.
            </p>

            <h3>1) Curated scenario checks</h3>
            <p>
              High-impact, clinically meaningful scenarios were replayed against both implementations to
              confirm identical behavior on known edge cases.
            </p>

            <h3>2) Broad combinatorial coverage</h3>
            <p>
              We evaluated large sets of feature combinations so edge-case interactions were tested, not
              assumed. This covered the combinatorial space that curated scenarios alone cannot reach.
            </p>

            <h3>3) Randomized stress testing</h3>
            <p>
              Randomized case generation found unusual combinations that hand-written suites may miss,
              providing additional confidence across the input space.
            </p>

            <h3>4) Regression locking</h3>
            <p>
              Once a failure pattern was found and fixed, it was promoted into permanent checks. These
              regression fixtures remain part of the IML test suite today, ensuring that resolved issues
              are never reintroduced.
            </p>

            <p>
              The result of this process: 1888 classifier comparisons with zero failures. That evidence
              justified the decision to retire the Python implementation and run IML as the sole production
              classifier.
            </p>

            {/* ── 7. Telemetry (added id) ──────────────────────── */}

            <h2 id="telemetry">Telemetry, artifacts, and non-blocking safety rollout</h2>
            <p>
              Every live evaluation contributes to an operational safety signal stream: impossibility
              detections, safety property evaluations, and availability events. This turns safety from a
              one-time checklist into an operating discipline with measurable trend lines.
            </p>
            <p>
              Operationally, this makes quality improvement faster: recurring warning patterns can be triaged,
              reviewed, and folded back into logic hardening cycles, then re-locked into the regression suite.
            </p>

            {/* ── 8. Validation evidence (removed duplicate "running live") ── */}

            <h2 id="evidence">Validation evidence (aggregated internal metrics)</h2>
            <p>
              We do not treat these metrics as marketing numbers. We treat them as the engineering evidence
              that justified replacing the Python classifier with IML. The parity results below represent
              the final validation run before the migration. It shows that the IML implementation matched
              the Python original across the full test space.
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
                <strong>Parity pass rate:</strong> how often the IML and Python implementations agreed during
                migration validation. This is the evidence that justified retiring Python.
              </li>
              <li>
                <strong>Impossibility detection performance:</strong> whether contradiction scenarios are surfaced
                consistently by the IML guardrails.
              </li>
              <li>
                <strong>Regression stability:</strong> whether previously fixed failures remain fixed in the IML
                codebase.
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
                  Combined reliability across scenario checks, broad coverage, and randomized testing during
                  migration validation.
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
                  Python-vs-expected and IML-vs-Python comparisons matched in the migration validation matrix
                  run. This is the evidence that justified the replacement.
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
              detected, and how the karyotype was decomposed. Reviewers can verify extraction fidelity before
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
              trace. In this case, the two guidelines reach different primary labels from identical inputs. WHO
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
              followed; red nodes show branches that were evaluated and rejected. This is what makes decision
              review and edge-case triage practical.
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
                <strong>Formally verified classifier:</strong> the production classifier is written in IML,
                enabling mathematical proofs about its behavior, not just test coverage.
              </li>
              <li>
                <strong>Single codebase for classification and safety:</strong> impossibility checks and safety
                properties are part of the same IML code, eliminating the risk of a separate safety layer
                falling out of sync.
              </li>
              <li>
                <strong>Better QA triage:</strong> impossibility events and counterexample generation surface
                edge cases early.
              </li>
              <li>
                <strong>Auditability:</strong> rule IDs, severity, and evidence fields are captured in structured
                form, and the IML source is inspectable by formal tools.
              </li>
              <li>
                <strong>Safe deployment posture:</strong> guardrails allow monitoring in production without
                interrupting clinical workflow.
              </li>
              <li>
                <strong>Faster hardening cycle:</strong> promoted artifacts become permanent regression checks
                in the IML test suite.
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

            <h2 id="broader-relevance">Where else this approach works</h2>
            <p>
              The same structure works outside haematology. Probabilistic extraction plus deterministic
              execution plus formal guardrails can strengthen any diagnostic software stack that combines
              unstructured clinical text with guideline-driven classification logic.
            </p>
            <p>
              The neurosymbolic paradigm (using neural models where flexibility matters and formal reasoning
              where precision matters) is gaining traction across safety-critical domains. The CodeLogician
              work demonstrates this in financial and software systems; our implementation demonstrates it in
              clinical diagnostics.<sup><a href="#ref4" className={styles.citation}>4</a></sup> In both
              cases, the insight is the same: LLMs are powerful extractors and translators, but they cannot
              be trusted as sole arbiters of combinatorial logic. Formal methods close that gap.
            </p>
            <p>
              In other domains, the exact rule content will differ, but the architecture remains valuable:
              explicit unknown-state modeling, parity-validated migration to formally verifiable code,
              contradiction diagnostics, and regression promotion from real-world failures into permanent tests.
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
