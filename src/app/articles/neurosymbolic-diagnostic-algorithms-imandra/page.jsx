import styles from '../version-control-of-medicine/article.module.css';
import Image from 'next/image';
import SidebarNav from './SidebarNav';
import CodeBlock from './CodeBlock';

export const metadata = {
  title: 'Neurosymbolic Diagnostic Algorithms with Imandra | Haem.io',
  description: 'How Haem.io uses Imandra formal verification to build a provably safe, neurosymbolic diagnostic classifier for haematological malignancies.',
};

const MetricTable = () => (
  <table>
    <thead>
      <tr>
        <th>Metric</th>
        <th>Result</th>
        <th>Notes</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Parity pass rate (all suites)</strong></td>
        <td>100%</td>
        <td>Scenario, broad, randomised</td>
      </tr>
      <tr>
        <td><strong>Matrix comparison coverage</strong></td>
        <td>1888 / 1888</td>
        <td>Python-vs-IML matched</td>
      </tr>
      <tr>
        <td><strong>Suite status</strong></td>
        <td>6 / 6</td>
        <td>All passed</td>
      </tr>
      <tr>
        <td><strong>Impossibility challenge set</strong></td>
        <td>Published</td>
        <td>Contradiction cases documented</td>
      </tr>
    </tbody>
  </table>
);

export default function NeurosymbolicImandraPage() {
  return (
    <div className={styles.articleContainer}>
      <div className={styles.articleContent}>
        <SidebarNav />
        <div className={styles.contentWrapper}>
          <article className={styles.articleCard}>

            {/* Header */}
            <header className={styles.header}>
              <h1 className={styles.title}>
                Neurosymbolic Diagnostic Algorithms with Imandra Formal Verification
              </h1>
              <p className={styles.subtitle}>
                How a formally verified IML classifier replaced our Python implementation — and what we proved, failed to prove, and learned in the process.
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

            {/* Body */}
            <div className={styles.body}>

              <h2 id="problem">1. The Genomic State-Space Problem</h2>

              <p>
                With genomic-era diagnosis, myeloid disease classification is no longer a small checklist. It is a high-dimensional state space of genetic findings, cytogenetics, blast patterns, prior-treatment context, and clinical qualifiers, all evaluated through increasingly complex guideline logic. In practice, this can produce hundreds of thousands of possible pathway combinations before arriving at a final subtype label.
              </p>

              <p>
                Expecting clinicians to execute that full combinatorial logic by hand, repeatedly and consistently, is not realistic. We need algorithmic execution for reliability, and we need formal verification layers so those algorithms can be checked for drift, contradiction, and internal coherence as they run in the real world. Diagnosticians in the west — and increasingly in LMICs — are expected to do this hundreds of times per year, and these diagnoses are clinically critical. It can be the difference between being put on a chemotherapy regimen or not.
              </p>

              <hr />

              <h2 id="architecture">2. How Haem.io Works</h2>

              <p>
                We use a three-layer <strong>neurosymbolic</strong> architecture. Neural models handle extraction, deterministic logic handles classification, and formal symbolic reasoning handles verification. This lets us validate each stage independently:
              </p>

              <ul>
                <li>A <strong>parsing layer</strong> (neural) that converts clinical narrative — clinical notes, cytogenetics, molecular findings — into structured findings.</li>
                <li>A <strong>deterministic decision layer</strong>, now written entirely in IML, that applies guideline logic.</li>
                <li>A <strong>formal reasoning layer</strong> (symbolic), built into the same IML codebase, that checks consistency, proves safety properties, and flags contradictions.</li>
              </ul>

              <p>
                This was not our starting point. We originally built our classifiers in Python. Later, in parallel, we created an <strong>IML digital twin</strong> — a second independent implementation of the clinical decision policy written in Imandra's formal language. The twin served two roles: re-executing the same classification logic for parity checking, and running contradiction analysis to detect internally impossible clinical states.
              </p>

              <p>
                Rather than maintaining both implementations indefinitely, we ran an extensive parity testing programme across curated scenarios, bounded-combination sweeps, randomised stress tests, and regression fixtures. Once the IML twin matched the Python classifier across every test vector — 100% parity across 1,888 classifier comparisons — we retired the Python classifier and replaced it with the IML digital twin.
              </p>

              <p>
                This changes how we build and maintain the classifier. It is written in a language that supports mathematical proof, impossibility detection, and counterexample generation. These are now features of the production code, not an external wrapper.
              </p>

              <hr />

              <h2 id="data-flow">3. From Reports to Structured Features</h2>

              <p>
                The core workflow starts by converting unstructured narrative reports into structured clinical context. The critical principle is preserving uncertainty instead of forcing binary certainty.
              </p>

              <p>
                We break extraction into focused subtasks — morphology, cytogenetics, molecular findings, and clinical context — and then merge outputs into one coherent clinical representation. Each subtask targets a specific report type, which reduces ambiguity in dense reports and improves consistency across case types. Where a finding is absent or ambiguous, the representation preserves that uncertainty rather than defaulting to a binary value.
              </p>

              <p>
                The structured context then flows to the IML classifier, which handles both guideline-driven classification and formal safety checking in a single pass. Impossibility signals and safety property violations are evaluated alongside the classification itself, so contradictions are surfaced in near real time.
              </p>

              <hr />

              <h2 id="tp53-example">4. Worked Example: Biallelic TP53 Case</h2>

              <p>
                Below is a single end-to-end example showing how one case moves through the system: short report excerpts, a compact structured representation, and the IML classifier producing a diagnosis while built-in guardrails check for contradictions. This particular case also illustrates how WHO 2022 and ICC 2022 can reach different primary labels from identical inputs — a real-world complexity the system is designed to surface, not hide.
              </p>

              <h3 id="input-reports">4.1 Input Reports</h3>

              <p>
                The input is rarely ever one tidy document. It is a mixture of report styles that must be integrated: morphology, cytogenetics, molecular findings, and clinical context.
              </p>

              <CodeBlock language="text">{`Morphology (excerpt):
"Bone marrow aspirate: 22% blasts. Dyserythropoiesis and
dysgranulopoiesis are present. Megakaryocytes show hypolobated forms."

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
documented. Known DDX41 germline predisposition."`}</CodeBlock>

              <h3 id="structured-extraction">4.2 Compact Structured Extraction</h3>

              <p>
                We extract a compact JSON object that preserves uncertainty (<code>unknown</code> stays unknown) and keeps evidence grouped by clinical meaning rather than by report formatting. In production we parse over 200 separate fields.
              </p>

              <CodeBlock language="json">{`{
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
}`}</CodeBlock>

              <h3 id="classifier-output">4.3 IML Classifier Output and Guideline Divergence</h3>

              <p>
                The IML classifier computes a diagnosis from the structured case summary under both WHO 2022 and ICC 2022 guidelines. In this case, the two guidelines reach different primary labels from identical inputs. WHO 2022 prioritises the MDS-related cytogenetic pathway; ICC 2022 prioritises the TP53 multi-hit pathway.
              </p>

              <CodeBlock language="text">{`WHO 2022 output:
- AML, myelodysplasia related, associated with DDX41 (WHO 2022)
- Derivation: MDS-related cytogenetic abnormalities detected
  (complex karyotype, del(5q), del(7q), del(17p))
  -> AML, myelodysplasia related -> DDX41 germline qualifier applied

ICC 2022 output:
- AML with mutated TP53, in the setting of DDX41 (ICC 2022)
- Derivation: TP53 multi-hit confirmed (biallelic inactivation)
  -> AML with mutated TP53 -> DDX41 germline qualifier applied`}</CodeBlock>

              <h3 id="guardrail-outputs">4.4 Guardrail Outputs</h3>

              <p>
                Alongside classification, the IML codebase evaluates guardrail rules that look for impossibility signals. The WHO-vs-ICC label difference is expected behaviour — it reflects a genuine guideline divergence, not a software error.
              </p>

              <CodeBlock language="text">{`Guardrail signals:
- Impossibility signals: none (no internal contradiction detected)
- Safety property violations: none
- ELN risk stratification: Adverse (both ELN 2022 and ELN 2024)`}</CodeBlock>

              <p>
                When a contradiction is present, the impossibility layer turns it into a concrete, reviewable error message tied to specific conflicting evidence. Because the classifier and the guardrails share the same IML codebase, these checks are evaluated as part of the same execution — not a separate system that might fall out of sync.
              </p>

              <hr />

              <h2 id="iml">5. Our Imandra IML Implementation</h2>

              <p>
                Because the classifier is now written in IML, we can do more than run it. We can prove formal safety properties about its logic. These properties are not test cases. They are mathematical guarantees that hold for every possible combination of inputs, not just the cases we happened to test.
              </p>

              <p style={{ fontSize: '0.95rem', color: '#64748b' }}>
                Imandra is an external formal reasoning platform. For product information, see{' '}
                <a href="https://www.imandra.ai/" target="_blank" rel="noopener noreferrer">imandra.ai</a>.
              </p>

              <p>
                That difference matters in clinical software. A test suite with 1,888 passing cases shows that those specific inputs produce correct outputs. A proved property shows that <em>no input</em> out of the entire combinatorial space can violate the invariant. For clinical software, this is the difference between "we tested it thoroughly" and "we proved it cannot fail in this way."
              </p>

              <h3 id="tribool">5.1 Three-State Boolean: Modelling Clinical Uncertainty</h3>

              <p>
                Clinical data is not binary. A test result can be positive, negative, or simply not performed. Our type system enforces this distinction at every decision point. No field silently defaults to <code>true</code> or <code>false</code> when the information is absent.
              </p>

              <CodeBlock>{`(* Three-state boolean -- maps Python's True / False / None *)
(* BTrue    = explicitly positive  (test confirmed)
   BFalse   = explicitly negative  (test ruled out)
   BUnknown = unknown / not tested / not mentioned *)

type tribool =
  | BTrue
  | BFalse
  | BUnknown

let is_true (v : tribool) : bool =
  match v with
  | BTrue -> true
  | _ -> false`}</CodeBlock>

              <h3 id="tp53-guardrail">5.2 TP53 VUS Contradiction Guardrail</h3>

              <p>
                This guardrail detects when a TP53 variant is classified as a variant of uncertain significance (VUS) while simultaneous pathogenic TP53 evidence is also present. That combination is a clinical impossibility: if the variant is truly uncertain, there should be no confirmatory signals.
              </p>

              <CodeBlock>{`(* TP53 VUS with pathogenic evidence -- clinical impossibility *)

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
      "tp53.tp53_50_vaf"; "tp53.tp53_10_vaf" ]`}</CodeBlock>

              <h3 id="age-consistency">5.3 Cross-Field Age Consistency Check</h3>

              <p>
                When both age-in-days and age-in-years are provided, they must agree. A large discrepancy indicates a data entry error or an upstream parsing failure.
              </p>

              <CodeBlock>{`(* Age-in-days vs age-in-years cross-field consistency *)

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
| _ -> diags`}</CodeBlock>

              <h3 id="down-syndrome">5.4 Down Syndrome TAM in Adult Context</h3>

              <p>
                Transient Abnormal Myelopoiesis (TAM) is a neonatal entity specific to Down syndrome. If the system encounters Down syndrome plus GATA1 mutation flags on an adult patient, that combination is temporally impossible.
              </p>

              <CodeBlock>{`(* Down syndrome TAM context with adult age -- temporal impossibility *)

match d.age_years with
| Some ay when ay >= 18.0 && d.down_syndrome && d.gata1_mutation ->
  mk_diag
    "impossible.temporal.down_syndrome_gata1_with_adult_age"
    Medium
    "Down syndrome + GATA1 neonatal context conflicts with adult age."
    ["age_years"; "down_syndrome"; "gata1_mutation"]
| _ -> diags`}</CodeBlock>

              <h3 id="tp53-pathway">5.5 TP53 Pathway Classification with VUS Exclusion</h3>

              <p>
                This is the actual production TP53 pathway function used by the AML ICC classifier. The first line blocks the entire pathway if the variant is VUS. Then it evaluates five independent biallelic criteria, including the ICC-specific surrogate of VAF ≥ 10% plus complex karyotype.
              </p>

              <CodeBlock>{`(* TP53 pathway -- shared between classifiers, parameterised *)

let classify_tp53_pathway
    (blasts : real) (tp53 : tp53_data)
    (cyto : mds_cytogenetics)
    (include_complex_karyotype_surrogate : bool) : string =
  (* VUS excludes all TP53 data -- this is the P3 safety property *)
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
    else ""`}</CodeBlock>

              <h3 id="totality">5.6 Formal Safety Theorem: Totality</h3>

              <p>
                This is a theorem, not a test. Imandra proves that the following holds for <em>every possible input</em> to the classifier. No matter what combination of genetic findings, blast counts, age, therapy history, or clinical context is provided, the classifier always returns a non-empty label.
              </p>

              <CodeBlock>{`(* P1: Totality -- every input produces a non-empty label *)

theorem totality_aml_who2022 (d : parsed_data) =
  (classify_aml_who2022 d).label <> ""

theorem totality_aml_icc2022 (d : parsed_data) =
  (classify_aml_icc2022 d).label <> ""

theorem totality_mds_who2022 (d : parsed_data) =
  (classify_mds_who2022 d).label <> ""

theorem totality_mds_icc2022 (d : parsed_data) =
  (classify_mds_icc2022 d).label <> ""`}</CodeBlock>

              <h3 id="low-blast">5.7 Formal Safety Theorem: WHO Low-Blast Boundary</h3>

              <p>
                This theorem proves that when blasts are below 20%, no AML-defining abnormality matches, and the case is not erythroid or TAM, the WHO AML classifier always returns the non-AML sentinel. This is proved across the full combinatorial input space.
              </p>

              <CodeBlock>{`(* P2: WHO low-blast boundary safety *)

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
  | _ -> true`}</CodeBlock>

              <h3 id="properties">5.8 Properties We Prove</h3>

              <p><strong>Totality.</strong> For every possible input, all four classifiers (AML WHO 2022, AML ICC 2022, MDS WHO 2022, MDS ICC 2022) produce a non-empty classification label. No patient case results in a silent failure. Even error states and confirmation gates produce explicit, non-empty labels.</p>

              <p><strong>Low-blast boundary safety (WHO).</strong> When blasts are below 20%, no AML-defining abnormality is present, and the case is not an erythroid or TAM entity, the WHO AML classifier always returns "Not AML, consider MDS classification." This guarantees that low-blast patients without defining features are never over-classified as AML. The erythroid pathway is the intentional exception per WHO 2022 guidelines.</p>

              <p><strong>TP53 VUS exclusion.</strong> When a TP53 variant is classified as a variant of uncertain significance (VUS), the TP53 multi-hit pathway is always inactive regardless of other TP53 signals. This prevents VUS overinterpretation from incorrectly assigning a patient to the high-risk TP53-mutated entity.</p>

              <p><strong>Qualifier separation.</strong> WHO labels never carry ICC-specific phrasing and ICC labels never carry WHO-specific phrasing. For example, WHO's therapy qualifier correctly ignores immune interventions (which ICC recognises), WHO uses "associated with" for germline context (while ICC uses "in the setting of"), and each label carries the correct scheme suffix.</p>

              <h3 id="counterexamples">5.9 What Counterexample Generation Reveals</h3>

              <p>
                Not every candidate property passes. The failures are as valuable as the proofs. We systematically attempted to prove that each clinically urgent entity is always correctly recognised. When Imandra cannot prove a property, it produces a concrete counterexample: a specific combination of inputs that violates the invariant.
              </p>

              <p><strong>APL masked by CEBPA confirmation gate.</strong> We attempted to prove that a positive <em>PML::RARA</em> always produces an APL diagnosis. Imandra found that when CEBPA bZIP ambiguity is also flagged, the classifier enters the CEBPA confirmation gate (step 2) before it reaches the <em>PML::RARA</em> check (step 3). The system returns "Needs CEBPA confirmation" instead of the expected APL label. This matters because APL is an oncologic emergency requiring immediate ATRA treatment. This is a systemic issue: the CEBPA gate masks <em>every</em> defining abnormality checked at step 3, including all core binding factor fusions and BCR::ABL1.</p>

              <p><strong>BCR::ABL1 missed at intermediate blast counts.</strong> We attempted to prove that BCR::ABL1 positivity always produces a BCR::ABL1-specific label. Imandra found that in the WHO classifier, BCR::ABL1 requires blasts ≥ 20%. A patient with BCR::ABL1 and 15% blasts receives "Not AML, consider MDS classification," which would miss a disease that requires TKI therapy (imatinib/dasatinib). The ICC classifier catches this case (threshold is 10%), but at blasts below 10% both classifiers miss it.</p>

              <p><strong>Down syndrome TAM masked by co-occurring mutations.</strong> This is the highest-risk finding. We attempted to prove that a Down syndrome neonate (age ≤ 90 days, GATA1 mutation positive) always receives the TAM diagnosis. Imandra found that when blasts ≥ 20% and any MDS-related gene mutation (e.g. ASXL1) is also present, the classifier assigns "AML, myelodysplasia related" because the MDS mutation check fires before the TAM check is reached. TAM typically self-resolves; misclassifying it as AML could lead to aggressive chemotherapy in a neonate whose condition would resolve spontaneously.</p>

              <p><strong>TP53 VUS gap across classifiers.</strong> The TP53 VUS exclusion property holds for the shared <code>classify_tp53_pathway</code> function used by the AML ICC classifier. However, the MDS classifiers use separate biallelic-check functions that do not inspect VUS status. If a TP53 VUS co-occurs with biallelic evidence, the MDS classifiers assign the high-risk TP53-mutated entity without checking VUS. The impossibility guardrail catches this at a separate layer, but the classifier itself has no internal safeguard.</p>

              <p>
                Each of these counterexamples becomes a concrete input for clinical review and a candidate for logic hardening. This is the practical value of property proving: it surfaces not just bugs, but design questions that would otherwise remain hidden in the combinatorial space.
              </p>

              <hr />

              <h2 id="parity">6. Parity Strategy: Python-to-IML Migration</h2>

              <p>
                Before retiring the Python classifier, we needed high-confidence evidence that the IML implementation produced identical results. We used a staged validation strategy with four layers, each designed to catch different classes of divergence.
              </p>

              <ol>
                <li><strong>Curated scenario checks.</strong> High-impact, clinically meaningful scenarios were replayed against both implementations to confirm identical behaviour on known edge cases.</li>
                <li><strong>Broad combinatorial coverage.</strong> We evaluated large sets of feature combinations so edge-case interactions were tested, not assumed.</li>
                <li><strong>Randomised stress testing.</strong> Randomised case generation found unusual combinations that hand-written suites may miss.</li>
                <li><strong>Regression locking.</strong> Once a failure pattern was found and fixed, it was promoted into permanent checks that remain part of the IML test suite today.</li>
              </ol>

              <p>
                The result: 1,888 classifier comparisons with zero failures. That evidence justified the decision to retire the Python implementation and run IML as the sole production classifier.
              </p>

              <hr />

              <h2 id="telemetry">7. Telemetry, Artifacts, and Safety Rollout</h2>

              <p>
                Every live evaluation contributes to an operational safety signal stream: impossibility detections, safety property evaluations, and availability events. This turns safety from a one-time checklist into an operating discipline with measurable trend lines.
              </p>

              <p>
                Operationally, this makes quality improvement faster: recurring warning patterns can be triaged, reviewed, and folded back into logic hardening cycles, then re-locked into the regression suite.
              </p>

              <hr />

              <h2 id="evidence">8. Validation Evidence</h2>

              <p>
                We do not treat these metrics as marketing numbers. We treat them as the engineering evidence that justified replacing the Python classifier with IML. The parity results below represent the final validation run before the migration.
              </p>

              <MetricTable />

              <p style={{ fontSize: '0.875rem', color: '#94a3b8', fontStyle: 'italic', marginTop: '-1rem' }}>
                Metrics are engineering validation metrics, not clinical outcome claims.
              </p>

              <hr />

              <h2 id="benefits">9. How This Helps Haem.io</h2>

              <ul>
                <li><strong>Formally verified classifier.</strong> The production classifier is written in IML, enabling mathematical proofs about its behaviour, not just test coverage.</li>
                <li><strong>Single codebase for classification and safety.</strong> Impossibility checks and safety properties are part of the same IML code, eliminating the risk of a separate safety layer falling out of sync.</li>
                <li><strong>Better QA triage.</strong> Impossibility events and counterexample generation surface edge cases early.</li>
                <li><strong>Auditability.</strong> Rule IDs, severity, and evidence fields are captured in structured form, and the IML source is inspectable by formal tools.</li>
                <li><strong>Safe deployment posture.</strong> Guardrails allow monitoring in production without interrupting clinical workflow.</li>
                <li><strong>Faster hardening cycle.</strong> Promoted artifacts become permanent regression checks in the IML test suite.</li>
              </ul>

              <hr />

              <h2 id="limits">10. What This Does Not Claim</h2>

              <ul>
                <li>A safety warning indicates system-level inconsistency, not automatic proof of clinical error.</li>
                <li>Contradiction checks operate within the information available to the software and do not replace full specialist review workflows.</li>
                <li>This safety layer still requires ongoing maintenance as diagnostic logic and guidelines evolve.</li>
              </ul>

              <hr />

              <h2 id="broader">11. Where Else This Approach Works</h2>

              <p>
                The same structure works outside haematology. Probabilistic extraction plus deterministic execution plus formal guardrails can strengthen any diagnostic software stack that combines unstructured clinical text with guideline-driven classification logic.
              </p>

              <p>
                The neurosymbolic paradigm — using neural models where flexibility matters and formal reasoning where precision matters — is gaining traction across safety-critical domains. The CodeLogician work demonstrates this in financial and software systems; our implementation demonstrates it in clinical diagnostics.<sup><a href="#ref-codelogician" className={styles.citation}>1</a></sup> In both cases, the insight is the same: LLMs are powerful extractors and translators, but they cannot be trusted as sole arbiters of combinatorial logic. Formal methods close that gap.
              </p>

              <p>
                In other domains, the exact rule content will differ, but the architecture remains valuable: explicit unknown-state modelling, parity-validated migration to formally verifiable code, contradiction diagnostics, and regression promotion from real-world failures into permanent tests.
              </p>

              <hr />

              <h2 id="closing">12. Closing Perspective</h2>

              <p>
                Formal methods are not a replacement for clinicians, and they are not a replacement for careful software engineering. They are a practical safety layer that makes diagnostic systems easier to trust, inspect, and improve. In our implementation, Imandra helps turn safety from an abstract objective into concrete runtime signals and testable invariants.
              </p>

              <blockquote>
                We are actively building this architecture at Haem.io. If you are evaluating formal methods for diagnostic software assurance, we can share a live walkthrough of this safety architecture — from report interpretation to decision verification. Contact us at <a href="mailto:robert.lee@haem.io">robert.lee@haem.io</a> for a technical demo.
              </blockquote>

              <hr />

              <h2 id="references">References</h2>

              <ol style={{ fontSize: '0.9rem', lineHeight: '1.6' }} className={styles.bibliography}>
                <li id="ref-codelogician">
                  Lin H, Abdallah S, Valentinov M, Brennan P, Kagan E, Wintersteiger CM, Ignatovich D, Passmore G. <em>Imandra CodeLogician: Neuro-Symbolic Reasoning for Precise Analysis of Software Logic.</em> arXiv preprint. 2026. <a href="https://arxiv.org/abs/2601.11840" target="_blank" rel="noopener noreferrer">https://arxiv.org/abs/2601.11840</a>
                </li>
                <li id="ref-who2022">
                  Khoury JD, Solary E, Abla O, et al. The 5th edition of the World Health Organization Classification of Haematolymphoid Tumours: Myeloid and Histiocytic/Dendritic Neoplasms. <em>Leukemia.</em> 2022.
                </li>
                <li id="ref-icc2022">
                  Arber DA, Orazi A, Hasserjian RP, et al. International Consensus Classification of Myeloid Neoplasms and Acute Leukemias. <em>Blood.</em> 2022.
                </li>
                <li id="ref-imandra">
                  Imandra Inc. Imandra platform documentation and API references. <a href="https://docs.imandra.ai/" target="_blank" rel="noopener noreferrer">https://docs.imandra.ai/</a>
                </li>
              </ol>

            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
