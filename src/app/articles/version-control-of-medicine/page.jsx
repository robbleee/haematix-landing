import styles from './article.module.css';
import Link from 'next/link';
import Image from 'next/image';
import SidebarNav from './SidebarNav';
import CitationHandler from './CitationHandler';

export const metadata = {
  title: 'The Version Control of Medicine | Haem.io',
  description: 'The Complexity Crisis in Haematological Classification and the Case for Executable Diagnostic Logic',
};

export default function VersionControlOfMedicinePage() {
  return (
    <div className={styles.articleContainer}>
      <CitationHandler />

      <div className={styles.articleContent}>
        <SidebarNav />
        <div className={styles.contentWrapper}>
          <article className={styles.articleCard}>

          {/* Header */}
          <header className={styles.header}>
            <h1 className={styles.title}>
              The Version Control of Medicine
            </h1>
            <p className={styles.subtitle}>
              The Complexity Crisis in Haematological Classification and the Case for Executable Diagnostic Logic
            </p>
            
            {/* Author & Date */}
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
                  <div className={styles.publishDate}>
                    November 25, 2025
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Article Body */}
          <div className={styles.body}>
            <h2 id="headline-section">1. The Headline Section: Medical Guidelines are Code. It&apos;s Time We Executed Them.</h2>

            <h3 id="architecture-of-diagnosis">The Architecture of Diagnosis</h3>

            <p>
              The practice of modern haematology stands at a precipice. For decades, the discipline operated on a traditional framework of morphological observation—defining disease by what cells looked like under a microscope. This system was stable, visually intuitive, and compatible with the limits of human cognition. However, the genomic revolution has forced a fundamental restructuring of this entire architecture. We have transitioned from a phenotype-based system to a genotype-based system, where the definition of a leukemia is no longer determined solely by the percentage of blast cells in the marrow, but by the presence of specific driver mutations, translocations, and molecular signatures.<sup><a href="#ref1" className={styles.citation}>1</a></sup>
            </p>

            <p>
              This transition has introduced a level of complexity that the current infrastructure of medicine—static PDF guidelines, textbooks, and human memory—cannot support. The simultaneous release of the 2022 World Health Organization (WHO) Classification and the rival International Consensus Classification (ICC) created a significant divergence in the diagnostic repository.<sup><a href="#ref1" className={styles.citation}>1</a></sup> For the first time, the same biological inputs (patient data) can yield fundamentally different outputs (diagnoses) depending on which set of rules is applied.<sup><a href="#ref3" className={styles.citation}>3</a></sup>
            </p>

            <p>
              This report argues that medical guidelines are no longer literature to be read; they are logic to be executed. The diagnostic criteria for Acute Myeloid Leukemia (AML) and Myelodysplastic Syndromes (MDS) have evolved into complex algorithmic decision trees. Yet, the healthcare system attempts to run these algorithms through the limited working memory of overwhelmed clinicians, leading to cognitive overload, diagnostic drift, and discordance.<sup><a href="#ref5" className={styles.citation}>5</a></sup>
            </p>

            <p>
              This document details the necessity of a &quot;Systems Architecture&quot; approach to haematology. It explores the &quot;Complexity Crisis&quot; driven by the 2022 guideline divergence, the statistical illusions of the &quot;Will Rogers Phenomenon,&quot; and the technical requirements for a &quot;Logic Engine&quot;—a digital infrastructure capable of version-controlling medical truth. This positions platforms like Haem.io not merely as reference tools, but as the essential operating system for precision medicine.<sup><a href="#ref7" className={styles.citation}>7</a></sup>
            </p>

            <hr />

            <h2 id="part-1">Part 1: The Morphological Framework vs. The Genomic Shift</h2>

            <h3 id="morphology-legacy">1.1 The Morphology Legacy: Visual Constants and Integer Logic</h3>

            <p>
              Historically, the classification of myeloid neoplasms relied on a simple, integer-based constant: the blast count. The foundational logic, cemented in the French-American-British (FAB) classifications and early WHO editions, established a rigid threshold. If the bone marrow contained ≥20% myeloblasts, the system returned a diagnosis of Acute Myeloid Leukemia (AML). If the count was &lt;20%, the system returned Myelodysplastic Syndrome (MDS).<sup><a href="#ref1" className={styles.citation}>1</a></sup> This &quot;20% Rule&quot; acted as the primary conditional statement in the diagnostic algorithm. It was an arbitrary biological cutoff, but it served an essential function: it reduced dimensionality. A pathologist did not need to know the full genomic landscape to render a decision; they only needed to count cells. This system was robust because it was low-complexity. It relied on &quot;Morphology&quot;—the visual phenotype of the disease.<sup><a href="#ref1" className={styles.citation}>1</a></sup>
            </p>

            <p>
              However, this traditional framework had a critical flaw: Biology does not respect integer thresholds. A patient with 19% blasts often shared the exact same clinical trajectory, response to chemotherapy, and overall survival as a patient with 21% blasts, provided they shared the same underlying genetic driver.<sup><a href="#ref8" className={styles.citation}>8</a></sup> The artificial boundary created distinct clinical silos for biologically identical diseases. For years, clinicians grappled with the cognitive dissonance of treating &quot;high-risk MDS&quot; differently from &quot;low-blast count AML&quot; despite their biological equivalence. The rigidity of the integer-based system meant that access to potentially curative therapies, such as intensive induction chemotherapy (e.g., the &quot;7+3&quot; regimen), often hinged on a counting error margin of 1-2%.<sup><a href="#ref8" className={styles.citation}>8</a></sup>
            </p>

            <p>
              The visual constants of morphology, while historically significant, became limiting factors as our understanding of leukemogenesis deepened. We learned that the visual appearance of a cell—its &quot;phenotype&quot;—is merely the downstream consequence of upstream genetic events. Treating the phenotype rather than the genotype is akin to fixing the symptoms rather than the underlying cause. The traditional framework of haematology was effectively a surface-level diagnostic system in an era that increasingly demanded molecular-level precision. As next-generation sequencing (NGS) became democratized and affordable, the discrepancy between what we could see (blasts) and what we knew (mutations) became untenable. The field required a complete reassessment, moving from a superficial classification system to one grounded in the fundamental molecular drivers of disease.
            </p>

            <h3 id="genomic-shift">1.2 The Genomic Shift: From Phenotype to Genotype</h3>

            <p>
              The shift from the WHO 2016 classification to the 2022 standards represents a fundamental redefinition of the diagnostic criteria. The system has moved from defining disease by <em>consequence</em> (the accumulation of blasts) to defining disease by <em>cause</em> (the genetic driver).<sup><a href="#ref1" className={styles.citation}>1</a></sup> The hierarchy of data has been inverted. In 2016, the blast count was the central node; genetics were attributes. In 2022, genetics are the central node; the blast count is merely an attribute, and in some cases, an obsolete one.
            </p>

            <p>
              The WHO 2022 classification explicitly eliminates the 20% blast requirement for AML diagnosis if specific &quot;defining genetic abnormalities&quot; are present.<sup><a href="#ref1" className={styles.citation}>1</a></sup> These include <em>PML::RARA</em> fusions (Acute Promyelocytic Leukemia), <em>RUNX1::RUNX1T1</em>, <em>CBFB::MYH11</em>, and crucially, <em>NPM1</em> mutations. If a patient harbors an <em>NPM1</em> mutation, the WHO 2022 logic dictates a diagnosis of AML regardless of whether the blast count is 5%, 12%, or 90%.<sup><a href="#ref3" className={styles.citation}>3</a></sup> The logic engine asserts that the presence of the driver mutation defines the entity, not the downstream cellular proliferation. This effectively renders the blast count variable obsolete for this specific subclass of patients.
            </p>

            <p>
              This restructuring acknowledges that the biological behavior of <em>NPM1</em>-mutated disease is inherently leukemic. Studies have shown that patients with <em>NPM1</em> mutations and &lt;20% blasts (previously termed MDS or MDS/MPN) share the same transcriptomic profile and clinical aggressiveness as those with &gt;20% blasts.<sup><a href="#ref3" className={styles.citation}>3</a></sup> By removing the blast threshold, the WHO 2022 classification aligns the diagnostic label with the biological reality. It is a shift towards &quot;Molecular Truth.&quot; However, this shift is not without its complications. It requires that every diagnostic center have access to rapid molecular testing. It also requires that clinicians update their internal mental models, which have been reinforced by decades of the &quot;20% rule.&quot;
            </p>

            <p>
              Furthermore, this genomic shift extends beyond <em>NPM1</em>. The classification of &quot;AML with myelodysplasia-related changes&quot; has been overhauled and renamed &quot;AML, myelodysplasia-related&quot; (AML-MR). This entity is now defined strictly by specific cytogenetic and molecular abnormalities (e.g., mutations in <em>ASXL1</em>, <em>BCOR</em>, <em>EZH2</em>, <em>SF3B1</em>, <em>SRSF2</em>, <em>STAG2</em>, <em>U2AF1</em>, <em>ZRSR2</em>) rather than by morphological dysplasia alone.<sup><a href="#ref1" className={styles.citation}>1</a></sup> This is a critical distinction. Previously, a pathologist&apos;s subjective assessment of &quot;dysplasia&quot; (abnormal looking cells) could drive the diagnosis. Now, the diagnosis is driven by a rigid list of mutations. This reduces inter-observer variability but increases the reliance on complex genomic data integration. The guideline has become more deterministic, but the diagnostic process has become significantly more resource-intensive.
            </p>

            <h3 id="divergence">1.3 The Divergence: WHO 2022 vs. ICC 2022</h3>

            <p>
              The simultaneous publication of the WHO 5th Edition and the ICC 2022 represents a &quot;Critical Divergence&quot; in the version control of haematology. Just as two standards might split, the definition of &quot;Leukemia&quot; has split. This divergence introduces significant &quot;clinical liability&quot; into the healthcare system. A patient presenting with 15% blasts and an <em>NPM1</em> mutation now exists in a state of diagnostic uncertainty.
            </p>

            <p>
              Under WHO 2022, the guideline mandates IF NPM1_Mutated THEN Diagnosis = AML. The blast count is irrelevant to the class definition. Under ICC 2022, however, the guideline mandates IF NPM1_Mutated AND Blasts ≥ 10% THEN Diagnosis = AML. If blasts were &lt;10%, it would remain MDS or MDS/AML.<sup><a href="#ref2" className={styles.citation}>2</a></sup> This is not a trivial semantic difference; it is a fundamental logic divergence. The ICC maintained a dependency on blast enumeration, lowering the threshold to 10% for these genetic entities but refusing to eliminate it entirely. This decision was driven by a desire to preserve some continuity with morphological assessment and perhaps a skepticism about fully abandoning the blast count as a prognostic marker.
            </p>

            <p>
              The implications of this divergence are not academic; they are operational. Clinical trials, cancer registries, and treatment protocols rely on standardized definitions. Without a &quot;Logic Engine&quot; to translate between these versions, data interoperability collapses. A clinical trial enrolling &quot;AML patients&quot; must now specify &quot;AML as defined by WHO 2022&quot; or &quot;AML as defined by ICC 2022.&quot; If a patient with 12% blasts and an <em>NPM1</em> mutation enters a trial using ICC criteria, they are eligible. If the trial uses legacy criteria, they are excluded. If the trial uses WHO 2022, they are eligible. But what if the patient has 8% blasts? Under WHO 2022, they are still AML. Under ICC 2022, they are MDS (or MDS/MPN).<sup><a href="#ref1" className={styles.citation}>1</a></sup>
            </p>

            <p>
              This divergence creates &quot;Diagnostic Drift,&quot; where the diagnosis of a patient changes based on the geographic location or the specific guideline adoption of the treating institution. It introduces noise into epidemiological data and complicates the work of cancer registries. Furthermore, it places an immense cognitive burden on the pathologist, who must now act as a living &quot;bridge&quot; between these two competing standards. They must effectively run two parallel diagnostic algorithms in their head for every case, ensuring that the final report satisfies the requirements of whichever classification system is favored by the treating oncologist or the clinical trial sponsor. This is a recipe for error and inefficiency, highlighting the urgent need for a unified, computational approach to diagnostic logic.
            </p>

            <hr />

            <h2 id="part-2">Part 2: The Logic of the NPM1 Case Study</h2>

            <h3 id="clinical-parameters">2.1 The Clinical Parameters: Defining the Inputs</h3>

            <p>
              To understand the necessity of a computational approach, we must examine the specific decision points involved in diagnosing a patient with an <em>NPM1</em> mutation. This use case demonstrates how &quot;Diagnostic Drift&quot; occurs and why human memory is insufficient for modern compliance. We begin by defining the clinical parameters—the inputs into our diagnostic function.
            </p>

            <p>
              Consider a standard patient profile in haematology:
            </p>

            <ul>
              <li><strong>Morphology:</strong> 12% Blasts in Bone Marrow.</li>
              <li><strong>Genetics:</strong> <em>NPM1</em> Mutation Detected (Positive).</li>
              <li><strong>Co-mutations:</strong> <em>FLT3-ITD</em> Negative, <em>DNMT3A</em> Positive.</li>
              <li><strong>History:</strong> No prior chemotherapy or antecedent hematologic disorder.</li>
            </ul>

            <p>
              This profile is common. <em>NPM1</em> is the most frequent mutation in adult AML, occurring in approximately 30% of cases.<sup><a href="#ref12" className={styles.citation}>12</a></sup> The presence of <em>DNMT3A</em> is also typical, as these mutations often co-occur in a specific pattern of clonal evolution.<sup><a href="#ref12" className={styles.citation}>12</a></sup> The blast count of 12% is the critical variable that triggers the divergence in logic between the classification systems. In a purely morphological era, this number would be the sole determinant. In the genomic era, it interacts with the molecular findings in complex, non-linear ways.
            </p>

            <h3 id="who-2016">2.2 Execution Trace: WHO 2016 (The Deprecated Standard)</h3>

            <p>
              Under the 2016 logic, the clinician assesses the blast count first. The algorithm prioritizes morphology over genetics for the initial categorization of the neoplasm.
            </p>

            <ul>
              <li><strong>Input:</strong> 12% Blasts.</li>
              <li><strong>Rule:</strong> AML requires ≥20% Blasts.</li>
              <li><strong>Logic:</strong> 12 &lt; 20.</li>
              <li><strong>Output:</strong> Myelodysplastic Syndrome (MDS) with Excess Blasts (MDS-EB-2).<sup><a href="#ref8" className={styles.citation}>8</a></sup></li>
            </ul>

            <p>
              The <em>NPM1</em> mutation is noted, but it acts merely as a prognostic marker, not a defining feature. The patient is classified within the MDS framework. This classification has profound treatment implications. MDS protocols typically involve hypomethylating agents (HMAs) like azacitidine or decitabine, which are lower-intensity therapies compared to AML induction.<sup><a href="#ref13" className={styles.citation}>13</a></sup> While these therapies can be effective, they may not be aggressive enough to eradicate the leukemic clone in a patient with <em>NPM1</em>-driven disease, which is known to respond well to intensive chemotherapy. The flaw in this logic is that the patient is treated based on their blast count, not their biology. They are under-treated because the rules of WHO 2016 did not allow the genetic variable to override the morphological threshold.
            </p>

            <h3 id="who-2022">2.3 Execution Trace: WHO 2022 (The &quot;Genetic&quot; Standard)</h3>

            <p>
              Under the WHO 2022 logic, the <em>NPM1</em> variable acts as a &quot;Determinative Factor.&quot; The presence of this specific mutation triggers a different diagnostic pathway that bypasses the blast count requirement entirely.
            </p>

            <ul>
              <li><strong>Input:</strong> <em>NPM1</em> Mutation Positive.</li>
              <li><strong>Rule:</strong> AML with <em>NPM1</em> mutation is defined by the mutation, irrespective of blast count.</li>
              <li><strong>Logic:</strong> Override_Blast_Threshold = True.</li>
              <li><strong>Output:</strong> <strong>Acute Myeloid Leukemia (AML) with NPM1 mutation</strong>.<sup><a href="#ref1" className={styles.citation}>1</a></sup></li>
            </ul>

            <p>
              This is a radical shift. The patient who was &quot;MDS&quot; yesterday is &quot;AML&quot; today, solely because the rulebook changed. The <em>NPM1</em> mutation is now the &quot;Defining Feature&quot; for the diagnosis. This change reflects the understanding that <em>NPM1</em> mutations are AML-defining events that commit the cell to a leukemic fate, regardless of how many blasts have accumulated at the time of biopsy.<sup><a href="#ref1" className={styles.citation}>1</a></sup> The implication is that the patient is immediately eligible for intensive induction chemotherapy (e.g., &quot;7+3&quot; regimen) and targeted therapies (e.g., Venetoclax combinations), which are shown to improve outcomes in <em>NPM1</em>-mutated disease regardless of blast percentage.<sup><a href="#ref14" className={styles.citation}>14</a></sup> The system now aligns the diagnosis with the optimal treatment pathway, correcting the &quot;under-treatment&quot; flaw of the previous edition.
            </p>

            <h3 id="icc-2022">2.4 Execution Trace: ICC 2022 (The &quot;Consensus&quot; Standard)</h3>

            <p>
              The ICC introduces a nuanced update to the standard, creating a hybrid logic that attempts to balance genomic truth with morphological tradition.
            </p>

            <ul>
              <li><strong>Input:</strong> 12% Blasts + <em>NPM1</em> Mutation.</li>
              <li><strong>Rule:</strong> AML with recurrent genetic abnormalities requires ≥10% blasts.</li>
              <li><strong>Logic:</strong> 12 ≥ 10.</li>
              <li><strong>Output:</strong> <strong>AML with NPM1 mutation</strong>.<sup><a href="#ref2" className={styles.citation}>2</a></sup></li>
            </ul>

            <p>
              In this specific scenario (12% blasts), the ICC and WHO 2022 outputs converge on the same diagnosis: AML. However, the <em>logic path</em> used to get there is different. The ICC still requires a blast count check (Is it ≥10%?), whereas WHO 2022 does not. This difference becomes critical in &quot;edge cases.&quot;
            </p>

            <p>
              Consider the <strong>Crucial Edge Case:</strong> If this same patient had <strong>9% blasts</strong>:
            </p>

            <ul>
              <li><strong>WHO 2022:</strong> Still <strong>AML with NPM1 mutation</strong>. The blast count is irrelevant.<sup><a href="#ref1" className={styles.citation}>1</a></sup></li>
              <li><strong>ICC 2022:</strong> <strong>MDS/AML</strong> (Specifically <em>NPM1</em>-mutated MDS or MDS/MPN). The blast count is &lt;10%, so the AML criteria are not met.<sup><a href="#ref1" className={styles.citation}>1</a></sup></li>
            </ul>

            <p>
              Here, the divergence is stark. The same biological entity is labeled &quot;Leukemia&quot; by one system and &quot;Syndrome&quot; by another. This is &quot;Diagnostic Drift&quot; in action. The ICC&apos;s refusal to fully abandon the blast count creates a &quot;border zone&quot; where classification is ambiguous. This ambiguity can delay treatment, confuse patients, and complicate clinical trial enrollment. A patient with 9% blasts might be excluded from an &quot;AML&quot; trial if the trial uses ICC criteria, even though they have the exact same <em>NPM1</em> mutation as a patient with 80% blasts.
            </p>

            <h3 id="logic-visualization">2.5 The Logic Visualization: A Comparative Table</h3>

            <p>
              The following table visualizes the &quot;Diagnostic Drift&quot; caused by these competing algorithms, highlighting how the same inputs yield different outputs across the three systems.
            </p>

            <table>
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>WHO 2016 (Legacy)</th>
                  <th>WHO 2022 (Genomic)</th>
                  <th>ICC 2022 (Consensus)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Defining Feature</strong></td>
                  <td>Morphology (Blast %)</td>
                  <td>Genotype (Mutation)</td>
                  <td>Hybrid (Genotype + Blast %)</td>
                </tr>
                <tr>
                  <td><strong>Blast Cutoff</strong></td>
                  <td>≥ 20%</td>
                  <td><strong>None</strong> (for <em>NPM1</em>)</td>
                  <td>≥ 10%</td>
                </tr>
                <tr>
                  <td><strong>Patient: 12% Blasts, NPM1+</strong></td>
                  <td><strong>MDS-EB-2</strong></td>
                  <td><strong>AML with NPM1</strong></td>
                  <td><strong>AML with NPM1</strong></td>
                </tr>
                <tr>
                  <td><strong>Patient: 8% Blasts, NPM1+</strong></td>
                  <td><strong>MDS-EB-1</strong></td>
                  <td><strong>AML with NPM1</strong></td>
                  <td><strong>MDS with NPM1</strong></td>
                </tr>
                <tr>
                  <td><strong>Treatment Pathway</strong></td>
                  <td>Low-Intensity (HMA)</td>
                  <td>Intensive Chemo / Venetoclax</td>
                  <td>Variable (MDS vs AML trial)</td>
                </tr>
              </tbody>
            </table>

            <p style={{ fontSize: '0.9rem', color: '#718096', fontStyle: 'italic', marginTop: '0.5rem' }}>
              Table 1: Comparative Logic Execution for NPM1-mutated Neoplasms.<sup><a href="#ref1" className={styles.citation}>1</a></sup>
            </p>

            <p>
              This discrepancy creates a massive data integrity problem. A patient diagnosed in a hospital using WHO 2022 guidelines is coded as a &quot;Leukemia&quot; patient. The same patient in a hospital using ICC guidelines might be coded as &quot;MDS.&quot; This affects cancer registry data, clinical trial eligibility, and insurance reimbursement codes.<sup><a href="#ref16" className={styles.citation}>16</a></sup> It fundamentally breaks the &quot;version control&quot; of medical data, making it impossible to compare cohorts across institutions without complex data normalization. This is where a Logic Engine becomes indispensable: it can act as a &quot;translator,&quot; mapping patients to the correct diagnostic bucket based on the specific ruleset required for a given purpose.
            </p>

            <hr />

            <h2 id="part-3">Part 3: The Complexity Crisis and Cognitive Load</h2>

            <h3 id="blue-book-algorithm">3.1 The &quot;Blue Book&quot; as an Algorithm</h3>

            <p>
              Medical guidelines, often referred to as &quot;Blue Books&quot; (WHO Classification of Tumours), are essentially algorithm specifications written in natural language.<sup><a href="#ref17" className={styles.citation}>17</a></sup> When these specifications were simple (e.g., &quot;If cells &gt; 20%, then AML&quot;), natural language was an adequate medium. The human brain could parse and execute this logic reliably. The process was short, linear, and had few dependencies. A clinician could memorize the handful of rules and apply them at the bedside or the microscope with high fidelity.
            </p>

            <p>
              However, the 5th Edition (WHO-HAEM5) and ICC 2022 have introduced high-dimensional complexity. The diagnosis of AML now requires the integration of five distinct data streams:
            </p>

            <ol>
              <li><strong>Morphology:</strong> Blast counts (blood and marrow), dysplasia assessment, cellularity.</li>
              <li><strong>Immunophenotyping:</strong> Flow cytometry (CD34, CD117, HLA-DR, lineage markers) to determine lineage and maturation stage.<sup><a href="#ref18" className={styles.citation}>18</a></sup></li>
              <li><strong>Cytogenetics:</strong> Karyotyping for balanced translocations (e.g., t(8;21), inv(16), t(15;17)) and complex karyotypes.<sup><a href="#ref19" className={styles.citation}>19</a></sup></li>
              <li><strong>Molecular Genetics:</strong> Sequencing for driver mutations (<em>NPM1</em>, <em>CEBPA</em>), co-mutations (<em>FLT3</em>, <em>DNMT3A</em>), and secondary-type mutations (<em>ASXL1</em>, <em>BCOR</em>, <em>SRSF2</em>, etc.).<sup><a href="#ref1" className={styles.citation}>1</a></sup></li>
              <li><strong>Clinical History:</strong> Prior therapy (cytotoxic drugs, radiation) or antecedent MDS/MPN.<sup><a href="#ref20" className={styles.citation}>20</a></sup></li>
            </ol>

            <p>
              Each of these streams contains dozens of variables. The interaction effects between them are non-linear. For example, a <em>TP53</em> mutation matters, but its Variant Allele Frequency (VAF) also matters (ICC requires &gt;10% VAF).<sup><a href="#ref22" className={styles.citation}>22</a></sup> A <em>CEBPA</em> mutation matters, but only if it is &quot;biallelic&quot; (WHO 2016) or in the &quot;bZIP&quot; region (WHO 2022).<sup><a href="#ref3" className={styles.citation}>3</a></sup> A <em>RUNX1</em> mutation is AML-defining in ICC but relegated to &quot;AML-MR&quot; in WHO 2022.<sup><a href="#ref3" className={styles.citation}>3</a></sup> The algorithm has exploded in complexity. It is no longer a linear decision tree; it is a matrix of conditional dependencies.
            </p>

            <h3 id="cognitive-capacity">3.2 The Limits of Cognitive Capacity: Cognitive Load Theory in Pathology</h3>

            <p>
              The cognitive load required to cross-reference these five dimensions against two competing classification systems (WHO vs. ICC) and an evolving risk stratification system (ELN 2022) exceeds the working memory of a typical clinician.<sup><a href="#ref5" className={styles.citation}>5</a></sup> Cognitive Load Theory posits that human working memory has a limited capacity for processing novel information. When the &quot;intrinsic load&quot; (the inherent complexity of the task) is high, and the &quot;extraneous load&quot; (the effort required to find and interpret the rules) is also high, the system fails. Errors occur.
            </p>

            <p>
              This application of Cognitive Load Theory explains the rising rates of <strong>diagnostic discordance</strong>. Studies have shown that reclassification rates between local pathologists and central adjudicated review in MDS/AML can be as high as <strong>29%</strong>.<sup><a href="#ref25" className={styles.citation}>25</a></sup>
            </p>

            <ul>
              <li><strong>Local Misdiagnosis:</strong> Up to 21% of MDS cases are misclassified locally.<sup><a href="#ref26" className={styles.citation}>26</a></sup></li>
              <li><strong>Impact:</strong> 7% of misdiagnosed cases receive inappropriate therapy based on the wrong label.<sup><a href="#ref25" className={styles.citation}>25</a></sup></li>
            </ul>

            <p>
              This is not a failure of competence; it is a failure of infrastructure. We are asking humans to perform the job of a database query engine. The pathologist must remember:
            </p>

            <ul>
              <li>&quot;Does <em>RUNX1</em> mutation count as an AML-defining lesion in WHO 2022?&quot; (No, it was removed/reclassified to AML-MR).</li>
              <li>&quot;Does <em>RUNX1</em> count in ICC 2022?&quot; (Yes, it is retained).<sup><a href="#ref3" className={styles.citation}>3</a></sup></li>
              <li>&quot;What is the allele frequency cutoff for <em>TP53</em> in ICC?&quot; (10% VAF).<sup><a href="#ref22" className={styles.citation}>22</a></sup></li>
              <li>&quot;Is <em>BCOR</em> considered a myelodysplasia-related gene in both systems?&quot; (Yes, but its prognostic weight differs).<sup><a href="#ref3" className={styles.citation}>3</a></sup></li>
            </ul>

            <p>
              These are binary logic checks that computers perform instantly and flawlessly, but which induce fatigue and error in humans. The sheer volume of updates between WHO 2016 and WHO 2022—such as the renaming of &quot;AML with myelodysplasia-related changes&quot; to &quot;AML, myelodysplasia-related&quot; (AML-MR) and the changing list of defining mutations—creates a high risk of classification error.<sup><a href="#ref1" className={styles.citation}>1</a></sup> A pathologist relying on memory might inadvertently apply a &quot;v2016&quot; rule to a &quot;v2022&quot; case, leading to a diagnostic error that could alter the patient&apos;s treatment path.
            </p>

            <h3 id="will-rogers">3.3 The &quot;Will Rogers Phenomenon&quot; in Survival Statistics</h3>

            <p>
              The reclassification of patients from MDS to AML creates a statistical artifact known as the <strong>Will Rogers Phenomenon</strong> (Stage Migration). Named after the humorist who quipped that &quot;When the Okies left Oklahoma and moved to California, they raised the average intelligence level in both states,&quot; this phenomenon distorts survival data.<sup><a href="#ref28" className={styles.citation}>28</a></sup> It creates a statistical illusion of progress that can confound clinical trials and epidemiological studies.
            </p>

            <p>
              In the context of the WHO 2022 update:
            </p>

            <ol>
              <li><strong>Migration:</strong> Patients with <em>NPM1</em> mutations and low blast counts (10-19%) were previously classified as MDS. These patients generally had a <em>worse</em> prognosis than other MDS patients (because <em>NPM1</em> drives aggressive disease) but a <em>better</em> prognosis than fulminant AML patients (who have high blast burdens and often more complex genetics).<sup><a href="#ref28" className={styles.citation}>28</a></sup></li>
              <li><strong>Reclassification:</strong> WHO 2022 moves these patients into the AML cohort.</li>
              <li><strong>Result:</strong>
                <ul>
                  <li><strong>MDS Survival Improves:</strong> The &quot;bad&quot; MDS patients (NPM1+) are removed from the MDS pool. The remaining MDS patients have, on average, more indolent disease. Thus, MDS survival statistics artificially rise.</li>
                  <li><strong>AML Survival Improves:</strong> The &quot;good&quot; AML patients (low blast count, favorable genetics) are added to the AML pool. They dilute the poor outcomes of the high-risk AML patients. Thus, AML survival statistics artificially rise.</li>
                </ul>
              </li>
            </ol>

            <p>
              This creates the illusion of therapeutic progress where none exists. Survival curves shift purely due to &quot;Diagnostic Drift&quot;.<sup><a href="#ref30" className={styles.citation}>30</a></sup> Without a computational system to normalize this data—to &quot;version control&quot; the patient cohorts—longitudinal research becomes unreliable. Researchers comparing AML survival in 2023 vs. 2015 might attribute the improvement to better drugs, when in reality, it is partly due to the inclusion of &quot;healthier&quot; patients in the AML bucket. A logic engine like Haem.io allows researchers to retroactively apply WHO 2016 or WHO 2022 rules to the <em>same</em> dataset to control for this migration, a capability impossible with static guidelines. It enables &quot;apples-to-apples&quot; comparisons across time, preserving the integrity of scientific inquiry.
            </p>

            <hr />

            <h2 id="part-4">Part 4: The Solution: Guidelines as Executable Logic</h2>

            <p>
              The solution to the Complexity Crisis is not &quot;more training&quot; for pathologists. It is the adoption of <strong>Computable Biomedical Knowledge (CBK)</strong>. We must transition from human-readable guidelines (PDFs) to machine-executable guidelines (Logic).<sup><a href="#ref31" className={styles.citation}>31</a></sup>
            </p>

            <h3 id="executable-logic">4.1 The Concept of Executable Logic</h3>

            <p>
              In systems engineering, business logic is encapsulated in standard protocols. When the logic changes, the protocol is updated, and the entire system adheres to the new standard instantly. In medicine, this &quot;update&quot; is manual, slow, and error-prone. Guidelines are published as text, disseminated via conferences, and slowly integrated into practice over years. This &quot;latency&quot; creates a gap between the current standard of care and actual clinical practice.
            </p>

            <p>
              Haem.io proposes a system where the &quot;Blue Books&quot; are digitized into a deterministic logic layer.
            </p>

            <ul>
              <li><strong>Input:</strong> Structured data (Blast %, Gene Variants VAF, Karyotype string, Immunophenotype).</li>
              <li><strong>Processing:</strong> The &quot;Logic Engine&quot; runs the input against the codified rulesets of WHO 2022, ICC 2022, and ELN 2022 simultaneously.</li>
              <li><strong>Output:</strong> A structured diagnostic object containing:
                <ul>
                  <li>Diagnosis_WHO22: &quot;AML with NPM1&quot;</li>
                  <li>Diagnosis_ICC22: &quot;AML with NPM1&quot;</li>
                  <li>Risk_ELN22: &quot;Favorable&quot;</li>
                  <li>Discordance_Flag: False (or True, if definitions clash)</li>
                </ul>
              </li>
            </ul>

            <p>
              This transforms the guideline from a passive reference document into an active, executable tool. It ensures that the diagnosis is not just a label, but a computed result derived from a verifiable logic path.
            </p>

            <h3 id="digital-twin">4.2 The &quot;Digital Twin&quot; of the Guideline</h3>

            <p>
              This approach creates a &quot;Digital Twin,&quot; not just of the patient, but of the <em>guideline itself</em>.<sup><a href="#ref7" className={styles.citation}>7</a></sup> The system maintains a digital representation of the diagnostic framework. This differs from the typical use of &quot;Digital Twins&quot; in medicine, which usually refers to simulating patient physiology. Here, we are simulating the <em>diagnostic process</em>.
            </p>

            <p>
              <strong>Technical Implementation:</strong><br />
              Instead of a &quot;Black Box&quot; AI (Deep Learning) which might hallucinate a diagnosis based on obscure correlations in training data, this requires Symbolic AI or Deterministic Rule Engines. The logic must be &quot;provable&quot; and &quot;transparent&quot;.<sup><a href="#ref7" className={styles.citation}>7</a></sup> In a field like oncology, explainability is paramount. A clinician cannot accept a diagnosis from a system that says &quot;Trust me.&quot; They need to see the proof.<br />
              The Haem.io system provides this transparency. The physician can click on the computed diagnosis and see the specific rule that triggered it:
            </p>

            <p style={{ padding: '1rem', background: '#f7fafc', borderRadius: '8px', borderLeft: '4px solid var(--primary-color)', fontStyle: 'italic' }}>
              &quot;Diagnosis is AML because: <em>NPM1</em> mutation is Present AND <em>Defining_Genetic_Abnormality</em> overrides <em>Blast_Count</em> (Source: WHO 2022, Table 1).&quot;
            </p>

            <p>
              This transparent logic builds trust. It allows the clinician to verify the system&apos;s reasoning against their own knowledge. It also serves an educational function, reinforcing the complex rules of the new classifications with every use. By making the logic explicit, the system turns every case into a learning opportunity, reducing the cognitive load while simultaneously upskilling the user.
            </p>

            <h3 id="version-control">4.3 Handling Breaking Changes (Version Control)</h3>

            <p>
              When the WHO releases the 6th Edition (inevitably), a software-based system handles this via version control. The &quot;v5.0&quot; standard is archived, and &quot;v6.0&quot; is integrated into the Logic Engine.
            </p>

            <ul>
              <li><strong>Legacy Data:</strong> Historical patient data can be re-run against &quot;v6.0&quot; to see if their diagnosis changes (Managing Diagnostic Drift).</li>
              <li><strong>Current Patients:</strong> New patients are assessed against the latest version of the standard.</li>
            </ul>

            <p>
              This capability solves the update management problem in medicine. Currently, it takes years for a new guideline to fully permeate clinical practice globally. Clinicians in smaller community centers may continue using outdated criteria simply because they haven&apos;t had time to digest the latest 500-page PDF. With a centralized Logic Engine, compliance is instantaneous upon the software update.<sup><a href="#ref7" className={styles.citation}>7</a></sup> The new standard is deployed to the cloud, and every user of the platform immediately has access to the updated logic. This dramatically shortens the &quot;knowledge translation&quot; gap, ensuring that patients receive care based on the most current science, regardless of where they are treated.
            </p>

            <hr />

            <h2 id="part-5">Part 5: Implications for Clinical Practice (ELN 2022)</h2>

            <p>
              The diagnosis is only the first step. The treatment decision—the &quot;execution&quot; of care—relies on Risk Stratification. The <strong>European LeukemiaNet (ELN) 2022</strong> recommendations introduced significant complexity that further mandates a computational approach.<sup><a href="#ref34" className={styles.citation}>34</a></sup> The ELN guidelines dictate <em>how</em> to treat the patient (e.g., transplant vs. chemotherapy alone) based on the risk of relapse.
            </p>

            <h3 id="flt3-change">5.1 The FLT3-ITD Variable Change</h3>

            <p>
              In ELN 2017, the allelic ratio of the FLT3-ITD mutation was a critical variable. A &quot;Low&quot; ratio (&lt;0.5) was considered favorable (if NPM1 was also mutated), while a &quot;High&quot; ratio (≥0.5) was adverse. This required precise quantification of the mutant-to-wild-type ratio.<br />
              In ELN 2022, this variable was removed. The logic simplified: &quot;Any FLT3-ITD is Intermediate Risk&quot; (unless adverse genetics are present).<sup><a href="#ref11" className={styles.citation}>11</a></sup>
            </p>

            <ul>
              <li><strong>Reasoning:</strong> Standardization of the ratio assay was difficult across different labs (an assay variability leading to interpretative failure).<sup><a href="#ref11" className={styles.citation}>11</a></sup> The variability in measurement meant that the same patient could be &quot;Low Ratio&quot; in one lab and &quot;High Ratio&quot; in another.</li>
              <li><strong>Implication:</strong> The Logic Engine must update its risk calculator. It no longer needs to query the FLT3_Ratio variable for risk assignment, but it still needs to check for the presence of the mutation. This change simplifies the input but changes the risk output for thousands of patients. A patient who was &quot;Favorable&quot; under 2017 rules might now be &quot;Intermediate,&quot; potentially changing their eligibility for transplant.</li>
            </ul>

            <h3 id="mr-gene-expansion">5.2 The MR-Gene List Expansion and Logic Conflicts</h3>

            <p>
              ELN 2022 expanded the list of &quot;Adverse Risk&quot; mutations to include <em>SRS2, SF3B1, U2AF1, ZRSR2, BCOR, EZH2, STAG2</em>.<sup><a href="#ref2" className={styles.citation}>2</a></sup> These are the so-called &quot;secondary-type&quot; or &quot;myelodysplasia-related&quot; mutations.
            </p>

            <ul>
              <li><strong>Complexity:</strong> A patient with <em>NPM1</em> (typically Favorable) who also has a <em>BCOR</em> mutation (Adverse) represents a logic conflict.</li>
              <li><strong>Resolution:</strong> ELN 2022 logic dictates that Adverse Risk features <em>override</em> Favorable features in specific contexts. Specifically, the presence of any of these adverse mutations places the patient in the <strong>Adverse Risk</strong> category, even if they have an <em>NPM1</em> mutation (which would otherwise be Favorable).<sup><a href="#ref35" className={styles.citation}>35</a></sup></li>
            </ul>

            <p>
              This is a critical &quot;conditional override.&quot; A human pathologist might miss a rare <em>ZRSR2</em> mutation buried in the fine print of a 50-gene NGS panel report. They might see the <em>NPM1</em> mutation and instinctively categorize the patient as &quot;Favorable.&quot; A Logic Engine will not make this mistake. It will scan the entire mutation list, identify the <em>ZRSR2</em> variant, apply the override rule, and flag the patient as Adverse Risk. This immediate reclassification alters the treatment plan from standard chemotherapy to potentially including a transplant evaluation, significantly impacting the patient&apos;s long-term survival chances.
            </p>

            <h3 id="nccn-connection">5.3 Treatment Guidelines: The NCCN Connection</h3>

            <p>
              The outputs of the Logic Engine (Diagnosis + Risk) feed directly into treatment guidelines, such as those from the <strong>National Comprehensive Cancer Network (NCCN)</strong>. The NCCN guidelines for AML (v3.2024) and MDS (v1.2024) have been updated to reflect the new classifications, particularly regarding <em>NPM1</em> mutations.
            </p>

            <ul>
              <li><strong>NCCN on NPM1:</strong> The guidelines now recommend that patients with <em>NPM1</em>-mutated myeloid neoplasms and &lt;20% blasts be managed as AML.<sup><a href="#ref36" className={styles.citation}>36</a></sup> This aligns with the WHO 2022 reclassification.</li>
              <li><strong>Therapeutic Impact:</strong> This recommendation unlocks access to AML-specific therapies like <strong>Gemtuzumab Ozogamicin</strong> (CD33-targeted therapy) and <strong>Venetoclax + Azacitidine</strong> combinations for these patients.<sup><a href="#ref36" className={styles.citation}>36</a></sup> Previously, under an MDS label, these options might have been restricted or off-label.</li>
              <li><strong>Logic Integration:</strong> A comprehensive system like Haem.io can link the diagnostic output (&quot;AML with NPM1&quot;) directly to the NCCN treatment algorithm, suggesting the appropriate therapeutic regimen. It can also flag eligibility for specific targeted inhibitors (e.g., <em>FLT3</em> inhibitors like Midostaurin or Quizartinib, <em>IDH1/2</em> inhibitors like Ivosidenib/Enasidenib) based on the computed mutational profile.<sup><a href="#ref36" className={styles.citation}>36</a></sup> This creates an end-to-end &quot;decision support&quot; loop, from raw genomic data to guideline-compliant treatment recommendations.</li>
            </ul>

            <hr />

            <h2 id="part-6">Part 6: Conclusion - The Operating System for Haematology</h2>

            <p>
              The transition from WHO 2016 to WHO 2022/ICC 2022 was not just an update; it was a paradigm shift that challenged the manual processes of haematology. The &quot;Blue Books&quot; have become too complex to be read; they must be computed. We are currently in a crisis of <strong>Diagnostic Drift</strong>, where the definition of cancer is fluid, varying by institution, guideline preference, and pathologist memory. This variability compromises patient care, corrupts clinical trial data, and hinders the progress of precision medicine.
            </p>

            <p>
              <strong>Haem.io</strong> addresses this by treating medical guidelines as <strong>Executable Logic</strong>. By building a deterministic Logic Engine that ingests genomic data and executes the precise rules of WHO and ICC, we provide:
            </p>

            <ol>
              <li><strong>Version Control:</strong> Managing the drift between 2016, 2022, and future standards.</li>
              <li><strong>Runtime Compliance:</strong> Ensuring every diagnosis matches the latest global standard instantly.</li>
              <li><strong>Cognitive Offloading:</strong> Freeing clinicians from the burden of memorizing algorithmic trees, allowing them to focus on patient management.</li>
              <li><strong>Data Integrity:</strong> Solving the &quot;Will Rogers Phenomenon&quot; by enabling retrospective reclassification of cohorts for accurate research.</li>
            </ol>

            <p>
              The future of haematology is not just about discovering new mutations; it is about effectively executing the knowledge we already have. Medical guidelines are logic. It is time we built the operating system to run them.
            </p>

            <hr />

            <h2 id="appendix">Appendix: Comparative Logic Tables</h2>

            <h3 id="table-a">Table A: WHO 2022 vs. ICC 2022 &quot;Discrepancies&quot;</h3>

            <p>
              The following table summarizes the key divergences between the two major 2022 classification systems, illustrating the split in the diagnostic logic.
            </p>

            <table>
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>WHO 2022</th>
                  <th>ICC 2022</th>
                  <th>Impact on Logic</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>AML Blast Cutoff</strong></td>
                  <td>Eliminated for defining genetics (except <em>BCR::ABL1</em>, <em>CEBPA</em>)</td>
                  <td>Reduced to 10% for defining genetics</td>
                  <td><strong>Split:</strong> &lt;10% is AML in WHO, MDS in ICC.</td>
                </tr>
                <tr>
                  <td><strong>TP53 Mutation</strong></td>
                  <td>Not a distinct AML entity (qualifier only)</td>
                  <td><strong>Distinct Entity:</strong> &quot;AML with mutated TP53&quot; (&gt;20% blasts)</td>
                  <td><strong>Split:</strong> ICC prioritizes TP53 as a distinct high-risk class.</td>
                </tr>
                <tr>
                  <td><strong>MDS/AML Boundary</strong></td>
                  <td>Boundary dissolved for genetic AML</td>
                  <td><strong>New Category:</strong> &quot;MDS/AML&quot; (10-19% blasts without genetics)</td>
                  <td><strong>Split:</strong> ICC creates a specific &quot;border zone&quot; category.</td>
                </tr>
                <tr>
                  <td><strong>CEBPA Mutation</strong></td>
                  <td>Requires Single (bZIP) or Biallelic</td>
                  <td>Requires Biallelic or Single (bZIP)</td>
                  <td><strong>Convergent:</strong> Both recognize bZIP importance.</td>
                </tr>
                <tr>
                  <td><strong>RUNX1 Mutation</strong></td>
                  <td>Removed as defining entity (moved to AML-MR)</td>
                  <td>Retained as &quot;AML with mutated RUNX1&quot;</td>
                  <td><strong>Split:</strong> RUNX1 is a primary driver in ICC, secondary in WHO.</td>
                </tr>
              </tbody>
            </table>

            <h3 id="table-b">Table B: ELN 2022 Risk Stratification Logic Updates</h3>

            <p>
              This table details the changes in risk assessment logic from ELN 2017 to ELN 2022, highlighting the shift in variable weighting.
            </p>

            <table>
              <thead>
                <tr>
                  <th>Variable</th>
                  <th>ELN 2017 Logic</th>
                  <th>ELN 2022 Logic</th>
                  <th>Reason for Refactor</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>FLT3-ITD</strong></td>
                  <td>Risk depends on Allelic Ratio (Low vs High)</td>
                  <td><strong>Intermediate Risk</strong> (Ratio ignored)</td>
                  <td>Standardization of ratio assay was unreliable.</td>
                </tr>
                <tr>
                  <td><strong>MR-Gene Mutations</strong></td>
                  <td>Limited set (<em>ASXL1, RUNX1, TP53</em>)</td>
                  <td>Expanded set (<em>BCOR, EZH2, SF3B1, SRSF2, STAG2, U2AF1, ZRSR2</em>)</td>
                  <td>New data on adverse impact of secondary-type mutations.</td>
                </tr>
                <tr>
                  <td><strong>CEBPA</strong></td>
                  <td>Biallelic = Favorable</td>
                  <td><strong>bZIP (Mono or Bi) = Favorable</strong></td>
                  <td>bZIP domain mutations drive prognosis, not just allelic status.</td>
                </tr>
                <tr>
                  <td><strong>Cytogenetics</strong></td>
                  <td>Complex Karyotype ≥ 3 abnormalities</td>
                  <td><strong>Complex Karyotype ≥ 3 abnormalities</strong> (with exclusions)</td>
                  <td>Refined definition to exclude hyperdiploid/other specific types.</td>
                </tr>
              </tbody>
            </table>

            <h3 id="works-cited">Works cited</h3>

            <ol style={{ fontSize: '0.9rem', lineHeight: '1.6' }} className={styles.bibliography}>
              <li id="ref1">Comparative Analysis of AML Classification Systems: Evaluating the WHO, ICC, and ELN Frameworks and Their Distinctions - NIH, accessed on November 24, 2025, <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC11352995/" target="_blank" rel="noopener noreferrer">https://pmc.ncbi.nlm.nih.gov/articles/PMC11352995/</a></li>
              <li id="ref2">What&apos;s new in AML Classification (WHO 2022 vs International Consensus… - College of American Pathologists, accessed on November 24, 2025, <a href="https://www.cap.org/member-resources/articles/whats-new-in-aml-classification-who-2022-vs-international-consensus-classification" target="_blank" rel="noopener noreferrer">https://www.cap.org/member-resources/articles/whats-new-in-aml-classification-who-2022-vs-international-consensus-classification</a></li>
              <li id="ref3">What is new in acute myeloid leukemia classification? - PMC - NIH, accessed on November 24, 2025, <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC11016528/" target="_blank" rel="noopener noreferrer">https://pmc.ncbi.nlm.nih.gov/articles/PMC11016528/</a></li>
              <li id="ref4">What is new in acute myeloid leukemia classification? - BLOOD RESEARCH, accessed on November 24, 2025, <a href="https://www.bloodresearch.or.kr/journal/view.html?uid=2666" target="_blank" rel="noopener noreferrer">https://www.bloodresearch.or.kr/journal/view.html?uid=2666</a></li>
              <li id="ref5">Navigating complexity. The role of cognitive load in guideline adherence among nurses: a commentary - PMC - NIH, accessed on November 24, 2025, <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC12443719/" target="_blank" rel="noopener noreferrer">https://pmc.ncbi.nlm.nih.gov/articles/PMC12443719/</a></li>
              <li id="ref6">Full article: Pathologist workload, burnout, and wellness: connecting the dots - Taylor and Francis, accessed on November 24, 2025, <a href="https://www.tandfonline.com/doi/full/10.1080/10408363.2023.2285284" target="_blank" rel="noopener noreferrer">https://www.tandfonline.com/doi/full/10.1080/10408363.2023.2285284</a></li>
              <li id="ref7">Haem.io - Haematology Diagnosis Tool, accessed on November 24, 2025, <a href="https://haem.io/" target="_blank" rel="noopener noreferrer">https://haem.io/</a></li>
              <li id="ref8">Interactions and relevance of blast percentage and treatment strategy among younger and older patients with acute myeloid leukemia (AML) and myelodysplastic syndrome (MDS) - PMC - PubMed Central, accessed on November 24, 2025, <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC5486407/" target="_blank" rel="noopener noreferrer">https://pmc.ncbi.nlm.nih.gov/articles/PMC5486407/</a></li>
              <li id="ref9">Acute Myeloid Leukemia: 2025 Update on Diagnosis, Risk‐Stratification, and Management, accessed on November 24, 2025, <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC11966364/" target="_blank" rel="noopener noreferrer">https://pmc.ncbi.nlm.nih.gov/articles/PMC11966364/</a></li>
              <li id="ref10">The 5th Edition of the World Health Organization Classification of Hematolymphoid Tumors - Leukemia - NCBI Bookshelf, accessed on November 24, 2025, <a href="https://www.ncbi.nlm.nih.gov/books/NBK586208/" target="_blank" rel="noopener noreferrer">https://www.ncbi.nlm.nih.gov/books/NBK586208/</a></li>
              <li id="ref11">Diagnosis and management of AML in adults: 2022 recommendations from an international expert panel on behalf of the ELN | Blood - ASH Publications, accessed on November 24, 2025, <a href="https://ashpublications.org/blood/article/140/12/1345/485817/Diagnosis-and-management-of-AML-in-adults-2022" target="_blank" rel="noopener noreferrer">https://ashpublications.org/blood/article/140/12/1345/485817/Diagnosis-and-management-of-AML-in-adults-2022</a></li>
              <li id="ref12">Criteria for Diagnosis and Molecular Monitoring of NPM1-Mutated AML - PMC, accessed on November 24, 2025, <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC10772525/" target="_blank" rel="noopener noreferrer">https://pmc.ncbi.nlm.nih.gov/articles/PMC10772525/</a></li>
              <li id="ref13">NPM1 mutations define a specific subgroup of MDS and MDS/MPN patients with favorable outcomes with intensive chemotherapy - PMC - NIH, accessed on November 24, 2025, <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC6436014/" target="_blank" rel="noopener noreferrer">https://pmc.ncbi.nlm.nih.gov/articles/PMC6436014/</a></li>
              <li id="ref14">NPM1-Mutated Myeloid Neoplasms with &lt;20% Blasts: A Really Distinct Clinico-Pathologic Entity? - NIH, accessed on November 24, 2025, <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC7730332/" target="_blank" rel="noopener noreferrer">https://pmc.ncbi.nlm.nih.gov/articles/PMC7730332/</a></li>
              <li id="ref15">NPM1-Mutated Myeloid Neoplasms: Updated Outcomes with High-Intensive Chemotherapy Regardless of the Blast Percentage | Blood - ASH Publications, accessed on November 24, 2025, <a href="https://ashpublications.org/blood/article/142/Supplement%201/957/503087/NPM1-Mutated-Myeloid-Neoplasms-Updated-Outcomes" target="_blank" rel="noopener noreferrer">https://ashpublications.org/blood/article/142/Supplement%201/957/503087/NPM1-Mutated-Myeloid-Neoplasms-Updated-Outcomes</a></li>
              <li id="ref16">Navigating the 2022 International Consensus and World Health Organization Classifications of Hematopathology: A Call for Unified Diagnostic Language - Allen Press, accessed on November 24, 2025, <a href="https://meridian.allenpress.com/aplm/article/149/4/363/501592/Navigating-the-2022-International-Consensus-and" target="_blank" rel="noopener noreferrer">https://meridian.allenpress.com/aplm/article/149/4/363/501592/Navigating-the-2022-International-Consensus-and</a></li>
              <li id="ref17">Haematolymphoid Tumours - IARC Publications Website, accessed on November 24, 2025, <a href="https://publications.iarc.who.int/Book-And-Report-Series/Who-Classification-Of-Tumours/Haematolymphoid-Tumours-2024" target="_blank" rel="noopener noreferrer">https://publications.iarc.who.int/Book-And-Report-Series/Who-Classification-Of-Tumours/Haematolymphoid-Tumours-2024</a></li>
              <li id="ref18">Advancing Diagnostic Accuracy and Quality of Patient Care Through the Implementation of a Flow Cytometry Quality Assurance Program | Archives of Pathology & Laboratory Medicine - Allen Press, accessed on November 24, 2025, <a href="https://meridian.allenpress.com/aplm/article/149/2/e26/501362/Advancing-Diagnostic-Accuracy-and-Quality-of" target="_blank" rel="noopener noreferrer">https://meridian.allenpress.com/aplm/article/149/2/e26/501362/Advancing-Diagnostic-Accuracy-and-Quality-of</a></li>
              <li id="ref19">Full article: Revisiting the prognostic role of FLT3 mutations in acute myelogenous leukemia, accessed on November 24, 2025, <a href="https://www.tandfonline.com/doi/full/10.1080/17474086.2023.2202849" target="_blank" rel="noopener noreferrer">https://www.tandfonline.com/doi/full/10.1080/17474086.2023.2202849</a></li>
              <li id="ref20">P499: APPLICABILITY OF 2022 CLASSIFICATIONS OF ACUTE MYELOID LEUKEMIA IN THE REAL-WORLD SETTING - PMC - NIH, accessed on November 24, 2025, <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC10428800/" target="_blank" rel="noopener noreferrer">https://pmc.ncbi.nlm.nih.gov/articles/PMC10428800/</a></li>
              <li id="ref21">Applicability of 2022 classifications of acute myeloid leukemia in the real-world setting - PMC - NIH, accessed on November 24, 2025, <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC10477447/" target="_blank" rel="noopener noreferrer">https://pmc.ncbi.nlm.nih.gov/articles/PMC10477447/</a></li>
              <li id="ref22">Comparison of the 2022 ICC and Who Classification Systems of Myelodysplastic Neoplasms | Blood | American Society of Hematology - ASH Publications, accessed on November 24, 2025, <a href="https://ashpublications.org/blood/article/142/Supplement%201/1875/505943/Comparison-of-the-2022-ICC-and-Who-Classification" target="_blank" rel="noopener noreferrer">https://ashpublications.org/blood/article/142/Supplement%201/1875/505943/Comparison-of-the-2022-ICC-and-Who-Classification</a></li>
              <li id="ref23">AML and MDS Classification According to Who 2022 and International Consensus Classification: Do We Invent a Babylonian Confusion of Languages? | Blood - ASH Publications, accessed on November 24, 2025, <a href="https://ashpublications.org/blood/article/140/Supplement%201/555/490008/AML-and-MDS-Classification-According-to-Who-2022" target="_blank" rel="noopener noreferrer">https://ashpublications.org/blood/article/140/Supplement%201/555/490008/AML-and-MDS-Classification-According-to-Who-2022</a></li>
              <li id="ref24">Implications of the 5th Edition of the World Health Organization Classification and International Consensus Classification of Myeloid Neoplasm in Myelodysplastic Syndrome With Excess Blasts and Acute Myeloid Leukemia - PMC - NIH, accessed on November 24, 2025, <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC10151277/" target="_blank" rel="noopener noreferrer">https://pmc.ncbi.nlm.nih.gov/articles/PMC10151277/</a></li>
              <li id="ref25">Discordant pathologic diagnoses of myelodysplastic neoplasms and their implications for registries and therapies | Blood Advances - ASH Publications, accessed on November 24, 2025, <a href="https://ashpublications.org/bloodadvances/article/7/20/6120/497120/Discordant-pathologic-diagnoses-of-myelodysplastic" target="_blank" rel="noopener noreferrer">https://ashpublications.org/bloodadvances/article/7/20/6120/497120/Discordant-pathologic-diagnoses-of-myelodysplastic</a></li>
              <li id="ref26">Discordant pathologic diagnoses of myelodysplastic neoplasms and their implications for registries and therapies - PubMed, accessed on November 24, 2025, <a href="https://pubmed.ncbi.nlm.nih.gov/37552083/" target="_blank" rel="noopener noreferrer">https://pubmed.ncbi.nlm.nih.gov/37552083/</a></li>
              <li id="ref27">Acute myeloid leukemia and myelodysplastic neoplasms: clinical implications of myelodysplasia-related genes mutations and TP53 aberrations - PMC, accessed on November 24, 2025, <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC11655781/" target="_blank" rel="noopener noreferrer">https://pmc.ncbi.nlm.nih.gov/articles/PMC11655781/</a></li>
              <li id="ref28">The Will Rogers phenomenon. Stage migration and new diagnostic techniques as a source of misleading statistics for survival in cancer - PubMed, accessed on November 24, 2025, <a href="https://pubmed.ncbi.nlm.nih.gov/4000199/" target="_blank" rel="noopener noreferrer">https://pubmed.ncbi.nlm.nih.gov/4000199/</a></li>
              <li id="ref29">Will Rogers phenomenon | Radiology Reference Article | Radiopaedia.org, accessed on November 24, 2025, <a href="https://radiopaedia.org/articles/will-rogers-phenomenon" target="_blank" rel="noopener noreferrer">https://radiopaedia.org/articles/will-rogers-phenomenon</a></li>
              <li id="ref30">Incidence and Dynamics of CRC Stage Migration: A Regional vs. a National Analysis - MDPI, accessed on November 24, 2025, <a href="https://www.mdpi.com/2072-6694/16/19/3245" target="_blank" rel="noopener noreferrer">https://www.mdpi.com/2072-6694/16/19/3245</a></li>
              <li id="ref31">Mobilizing Computable Biomedical Knowledge - University of Michigan, accessed on November 24, 2025, <a href="https://mobilizecbk.med.umich.edu/" target="_blank" rel="noopener noreferrer">https://mobilizecbk.med.umich.edu/</a></li>
              <li id="ref32">Ten simple rules to make computable knowledge shareable and reusable - PMC, accessed on November 24, 2025, <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC11189186/" target="_blank" rel="noopener noreferrer">https://pmc.ncbi.nlm.nih.gov/articles/PMC11189186/</a></li>
              <li id="ref33">Digital twins in oncology - PMC - NIH, accessed on November 24, 2025, <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC10356671/" target="_blank" rel="noopener noreferrer">https://pmc.ncbi.nlm.nih.gov/articles/PMC10356671/</a></li>
              <li id="ref34">Molecular, clinical, and therapeutic determinants of outcome in NPM1-mutated AML | Blood, accessed on November 24, 2025, <a href="https://ashpublications.org/blood/article/144/7/714/515977/Molecular-clinical-and-therapeutic-determinants-of" target="_blank" rel="noopener noreferrer">https://ashpublications.org/blood/article/144/7/714/515977/Molecular-clinical-and-therapeutic-determinants-of</a></li>
              <li id="ref35">2022 ELN recommendations for the diagnosis of AML in adults - AML Hub, accessed on November 24, 2025, <a href="https://aml-hub.com/medical-information/2022-eln-recommendations-for-the-diagnosis-of-aml-in-adults" target="_blank" rel="noopener noreferrer">https://aml-hub.com/medical-information/2022-eln-recommendations-for-the-diagnosis-of-aml-in-adults</a></li>
              <li id="ref36">NCCN Guidelines for Patients: Acute Myeloid Leukemia, accessed on November 24, 2025, <a href="https://www.nccn.org/patients/guidelines/content/PDF/aml-patient.pdf" target="_blank" rel="noopener noreferrer">https://www.nccn.org/patients/guidelines/content/PDF/aml-patient.pdf</a></li>
              <li id="ref37">Acute Myeloid Leukemia, accessed on November 24, 2025, <a href="https://www2.tri-kobe.org/nccn/guideline/hematologic/english/aml.pdf" target="_blank" rel="noopener noreferrer">https://www2.tri-kobe.org/nccn/guideline/hematologic/english/aml.pdf</a></li>
            </ol>

          </div>

        </article>
        </div>
      </div>
    </div>
  );
}

