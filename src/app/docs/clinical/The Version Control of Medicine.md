

# **The Version Control of Medicine**

## **The Complexity Crisis in Haematological Classification and the Case for Executable Diagnostic Logic**

### **1\. The Headline Section: Medical Guidelines are Code. It’s Time We Executed Them.**

#### **The Architecture of Diagnosis**

The practice of modern haematology stands at a precipice. For decades, the discipline operated on a traditional framework of morphological observation—defining disease by what cells looked like under a microscope. This system was stable, visually intuitive, and compatible with the limits of human cognition. However, the genomic revolution has forced a fundamental restructuring of this entire architecture. We have transitioned from a phenotype-based system to a genotype-based system, where the definition of a leukemia is no longer determined solely by the percentage of blast cells in the marrow, but by the presence of specific driver mutations, translocations, and molecular signatures.1

This transition has introduced a level of complexity that the current infrastructure of medicine—static PDF guidelines, textbooks, and human memory—cannot support. The simultaneous release of the 2022 World Health Organization (WHO) Classification and the rival International Consensus Classification (ICC) created a significant divergence in the diagnostic repository.1 For the first time, the same biological inputs (patient data) can yield fundamentally different outputs (diagnoses) depending on which set of rules is applied.3

This report argues that medical guidelines are no longer literature to be read; they are logic to be executed. The diagnostic criteria for Acute Myeloid Leukemia (AML) and Myelodysplastic Syndromes (MDS) have evolved into complex algorithmic decision trees. Yet, the healthcare system attempts to run these algorithms through the limited working memory of overwhelmed clinicians, leading to cognitive overload, diagnostic drift, and discordance.5

This document details the necessity of a "Systems Architecture" approach to haematology. It explores the "Complexity Crisis" driven by the 2022 guideline divergence, the statistical illusions of the "Will Rogers Phenomenon," and the technical requirements for a "Logic Engine"—a digital infrastructure capable of version-controlling medical truth. This positions platforms like Haem.io not merely as reference tools, but as the essential operating system for precision medicine.7

---

## **Part 1: The Morphological Framework vs. The Genomic Shift**

### **1.1 The Morphology Legacy: Visual Constants and Integer Logic**

Historically, the classification of myeloid neoplasms relied on a simple, integer-based constant: the blast count. The foundational logic, cemented in the French-American-British (FAB) classifications and early WHO editions, established a rigid threshold. If the bone marrow contained ≥20% myeloblasts, the system returned a diagnosis of Acute Myeloid Leukemia (AML). If the count was \<20%, the system returned Myelodysplastic Syndrome (MDS).1 This "20% Rule" acted as the primary conditional statement in the diagnostic algorithm. It was an arbitrary biological cutoff, but it served an essential function: it reduced dimensionality. A pathologist did not need to know the full genomic landscape to render a decision; they only needed to count cells. This system was robust because it was low-complexity. It relied on "Morphology"—the visual phenotype of the disease.1

However, this traditional framework had a critical flaw: Biology does not respect integer thresholds. A patient with 19% blasts often shared the exact same clinical trajectory, response to chemotherapy, and overall survival as a patient with 21% blasts, provided they shared the same underlying genetic driver.8 The artificial boundary created distinct clinical silos for biologically identical diseases. For years, clinicians grappled with the cognitive dissonance of treating "high-risk MDS" differently from "low-blast count AML" despite their biological equivalence. The rigidity of the integer-based system meant that access to potentially curative therapies, such as intensive induction chemotherapy (e.g., the "7+3" regimen), often hinged on a counting error margin of 1-2%.8

The visual constants of morphology, while historically significant, became limiting factors as our understanding of leukemogenesis deepened. We learned that the visual appearance of a cell—its "phenotype"—is merely the downstream consequence of upstream genetic events. Treating the phenotype rather than the genotype is akin to fixing the symptoms rather than the underlying cause. The traditional framework of haematology was effectively a surface-level diagnostic system in an era that increasingly demanded molecular-level precision. As next-generation sequencing (NGS) became democratized and affordable, the discrepancy between what we could see (blasts) and what we knew (mutations) became untenable. The field required a complete reassessment, moving from a superficial classification system to one grounded in the fundamental molecular drivers of disease.

### **1.2 The Genomic Shift: From Phenotype to Genotype**

The shift from the WHO 2016 classification to the 2022 standards represents a fundamental redefinition of the diagnostic criteria. The system has moved from defining disease by *consequence* (the accumulation of blasts) to defining disease by *cause* (the genetic driver).1 The hierarchy of data has been inverted. In 2016, the blast count was the central node; genetics were attributes. In 2022, genetics are the central node; the blast count is merely an attribute, and in some cases, an obsolete one.

The WHO 2022 classification explicitly eliminates the 20% blast requirement for AML diagnosis if specific "defining genetic abnormalities" are present.1 These include *PML::RARA* fusions (Acute Promyelocytic Leukemia), *RUNX1::RUNX1T1*, *CBFB::MYH11*, and crucially, *NPM1* mutations. If a patient harbors an *NPM1* mutation, the WHO 2022 logic dictates a diagnosis of AML regardless of whether the blast count is 5%, 12%, or 90%.3 The logic engine asserts that the presence of the driver mutation defines the entity, not the downstream cellular proliferation. This effectively renders the blast count variable obsolete for this specific subclass of patients.

This restructuring acknowledges that the biological behavior of *NPM1*\-mutated disease is inherently leukemic. Studies have shown that patients with *NPM1* mutations and \<20% blasts (previously termed MDS or MDS/MPN) share the same transcriptomic profile and clinical aggressiveness as those with \>20% blasts.3 By removing the blast threshold, the WHO 2022 classification aligns the diagnostic label with the biological reality. It is a shift towards "Molecular Truth." However, this shift is not without its complications. It requires that every diagnostic center have access to rapid molecular testing. It also requires that clinicians update their internal mental models, which have been reinforced by decades of the "20% rule."

Furthermore, this genomic shift extends beyond *NPM1*. The classification of "AML with myelodysplasia-related changes" has been overhauled and renamed "AML, myelodysplasia-related" (AML-MR). This entity is now defined strictly by specific cytogenetic and molecular abnormalities (e.g., mutations in *ASXL1*, *BCOR*, *EZH2*, *SF3B1*, *SRSF2*, *STAG2*, *U2AF1*, *ZRSR2*) rather than by morphological dysplasia alone.1 This is a critical distinction. Previously, a pathologist's subjective assessment of "dysplasia" (abnormal looking cells) could drive the diagnosis. Now, the diagnosis is driven by a rigid list of mutations. This reduces inter-observer variability but increases the reliance on complex genomic data integration. The guideline has become more deterministic, but the diagnostic process has become significantly more resource-intensive.

### **1.3 The Divergence: WHO 2022 vs. ICC 2022**

The simultaneous publication of the WHO 5th Edition and the ICC 2022 represents a "Critical Divergence" in the version control of haematology. Just as two standards might split, the definition of "Leukemia" has split. This divergence introduces significant "clinical liability" into the healthcare system. A patient presenting with 15% blasts and an *NPM1* mutation now exists in a state of diagnostic uncertainty.

Under WHO 2022, the guideline mandates IF NPM1\_Mutated THEN Diagnosis \= AML. The blast count is irrelevant to the class definition. Under ICC 2022, however, the guideline mandates IF NPM1\_Mutated AND Blasts \>= 10% THEN Diagnosis \= AML. If blasts were \<10%, it would remain MDS or MDS/AML.2 This is not a trivial semantic difference; it is a fundamental logic divergence. The ICC maintained a dependency on blast enumeration, lowering the threshold to 10% for these genetic entities but refusing to eliminate it entirely. This decision was driven by a desire to preserve some continuity with morphological assessment and perhaps a skepticism about fully abandoning the blast count as a prognostic marker.

The implications of this divergence are not academic; they are operational. Clinical trials, cancer registries, and treatment protocols rely on standardized definitions. Without a "Logic Engine" to translate between these versions, data interoperability collapses. A clinical trial enrolling "AML patients" must now specify "AML as defined by WHO 2022" or "AML as defined by ICC 2022." If a patient with 12% blasts and an *NPM1* mutation enters a trial using ICC criteria, they are eligible. If the trial uses legacy criteria, they are excluded. If the trial uses WHO 2022, they are eligible. But what if the patient has 8% blasts? Under WHO 2022, they are still AML. Under ICC 2022, they are MDS (or MDS/MPN).1

This divergence creates "Diagnostic Drift," where the diagnosis of a patient changes based on the geographic location or the specific guideline adoption of the treating institution. It introduces noise into epidemiological data and complicates the work of cancer registries. Furthermore, it places an immense cognitive burden on the pathologist, who must now act as a living "bridge" between these two competing standards. They must effectively run two parallel diagnostic algorithms in their head for every case, ensuring that the final report satisfies the requirements of whichever classification system is favored by the treating oncologist or the clinical trial sponsor. This is a recipe for error and inefficiency, highlighting the urgent need for a unified, computational approach to diagnostic logic.

---

## **Part 2: The Logic of the NPM1 Case Study**

### **2.1 The Clinical Parameters: Defining the Inputs**

To understand the necessity of a computational approach, we must examine the specific decision points involved in diagnosing a patient with an *NPM1* mutation. This use case demonstrates how "Diagnostic Drift" occurs and why human memory is insufficient for modern compliance. We begin by defining the clinical parameters—the inputs into our diagnostic function.

Consider a standard patient profile in haematology:

* **Morphology:** 12% Blasts in Bone Marrow.  
* **Genetics:** *NPM1* Mutation Detected (Positive).  
* **Co-mutations:** *FLT3-ITD* Negative, *DNMT3A* Positive.  
* **History:** No prior chemotherapy or antecedent hematologic disorder.

This profile is common. *NPM1* is the most frequent mutation in adult AML, occurring in approximately 30% of cases.12 The presence of *DNMT3A* is also typical, as these mutations often co-occur in a specific pattern of clonal evolution.12 The blast count of 12% is the critical variable that triggers the divergence in logic between the classification systems. In a purely morphological era, this number would be the sole determinant. In the genomic era, it interacts with the molecular findings in complex, non-linear ways.

### **2.2 Execution Trace: WHO 2016 (The Deprecated Standard)**

Under the 2016 logic, the clinician assesses the blast count first. The algorithm prioritizes morphology over genetics for the initial categorization of the neoplasm.

* **Input:** 12% Blasts.  
* **Rule:** AML requires ≥20% Blasts.  
* **Logic:** $12 \< 20$.  
* **Output:** Myelodysplastic Syndrome (MDS) with Excess Blasts (MDS-EB-2).8

The *NPM1* mutation is noted, but it acts merely as a prognostic marker, not a defining feature. The patient is classified within the MDS framework. This classification has profound treatment implications. MDS protocols typically involve hypomethylating agents (HMAs) like azacitidine or decitabine, which are lower-intensity therapies compared to AML induction.13 While these therapies can be effective, they may not be aggressive enough to eradicate the leukemic clone in a patient with *NPM1*\-driven disease, which is known to respond well to intensive chemotherapy. The flaw in this logic is that the patient is treated based on their blast count, not their biology. They are under-treated because the rules of WHO 2016 did not allow the genetic variable to override the morphological threshold.

### **2.3 Execution Trace: WHO 2022 (The "Genetic" Standard)**

Under the WHO 2022 logic, the *NPM1* variable acts as a "Determinative Factor." The presence of this specific mutation triggers a different diagnostic pathway that bypasses the blast count requirement entirely.

* **Input:** *NPM1* Mutation Positive.  
* **Rule:** AML with *NPM1* mutation is defined by the mutation, irrespective of blast count.  
* **Logic:** Override\_Blast\_Threshold \= True.  
* **Output:** **Acute Myeloid Leukemia (AML) with NPM1 mutation**.1

This is a radical shift. The patient who was "MDS" yesterday is "AML" today, solely because the rulebook changed. The *NPM1* mutation is now the "Defining Feature" for the diagnosis. This change reflects the understanding that *NPM1* mutations are AML-defining events that commit the cell to a leukemic fate, regardless of how many blasts have accumulated at the time of biopsy.1 The implication is that the patient is immediately eligible for intensive induction chemotherapy (e.g., "7+3" regimen) and targeted therapies (e.g., Venetoclax combinations), which are shown to improve outcomes in *NPM1*\-mutated disease regardless of blast percentage.14 The system now aligns the diagnosis with the optimal treatment pathway, correcting the "under-treatment" flaw of the previous edition.

### **2.4 Execution Trace: ICC 2022 (The "Consensus" Standard)**

The ICC introduces a nuanced update to the standard, creating a hybrid logic that attempts to balance genomic truth with morphological tradition.

* **Input:** 12% Blasts \+ *NPM1* Mutation.  
* **Rule:** AML with recurrent genetic abnormalities requires ≥10% blasts.  
* **Logic:** $12 \\ge 10$.  
* **Output:** **AML with NPM1 mutation**.2

In this specific scenario (12% blasts), the ICC and WHO 2022 outputs converge on the same diagnosis: AML. However, the *logic path* used to get there is different. The ICC still requires a blast count check (Is it ≥10%?), whereas WHO 2022 does not. This difference becomes critical in "edge cases."

Consider the **Crucial Edge Case:** If this same patient had **9% blasts**:

* **WHO 2022:** Still **AML with NPM1 mutation**. The blast count is irrelevant.1  
* **ICC 2022:** **MDS/AML** (Specifically *NPM1*\-mutated MDS or MDS/MPN). The blast count is \<10%, so the AML criteria are not met.1

Here, the divergence is stark. The same biological entity is labeled "Leukemia" by one system and "Syndrome" by another. This is "Diagnostic Drift" in action. The ICC's refusal to fully abandon the blast count creates a "border zone" where classification is ambiguous. This ambiguity can delay treatment, confuse patients, and complicate clinical trial enrollment. A patient with 9% blasts might be excluded from an "AML" trial if the trial uses ICC criteria, even though they have the exact same *NPM1* mutation as a patient with 80% blasts.

### **2.5 The Logic Visualization: A Comparative Table**

The following table visualizes the "Diagnostic Drift" caused by these competing algorithms, highlighting how the same inputs yield different outputs across the three systems.

| Feature | WHO 2016 (Legacy) | WHO 2022 (Genomic) | ICC 2022 (Consensus) |
| :---- | :---- | :---- | :---- |
| **Defining Feature** | Morphology (Blast %) | Genotype (Mutation) | Hybrid (Genotype \+ Blast %) |
| **Blast Cutoff** | $\\ge 20\\%$ | **None** (for *NPM1*) | $\\ge 10\\%$ |
| **Patient: 12% Blasts, NPM1+** | **MDS-EB-2** | **AML with NPM1** | **AML with NPM1** |
| **Patient: 8% Blasts, NPM1+** | **MDS-EB-1** | **AML with NPM1** | **MDS with NPM1** |
| **Treatment Pathway** | Low-Intensity (HMA) | Intensive Chemo / Venetoclax | Variable (MDS vs AML trial) |

Table 1: Comparative Logic Execution for NPM1-mutated Neoplasms.1

This discrepancy creates a massive data integrity problem. A patient diagnosed in a hospital using WHO 2022 guidelines is coded as a "Leukemia" patient. The same patient in a hospital using ICC guidelines might be coded as "MDS." This affects cancer registry data, clinical trial eligibility, and insurance reimbursement codes.16 It fundamentally breaks the "version control" of medical data, making it impossible to compare cohorts across institutions without complex data normalization. This is where a Logic Engine becomes indispensable: it can act as a "translator," mapping patients to the correct diagnostic bucket based on the specific ruleset required for a given purpose.

---

## **Part 3: The Complexity Crisis and Cognitive Load**

### **3.1 The "Blue Book" as an Algorithm**

Medical guidelines, often referred to as "Blue Books" (WHO Classification of Tumours), are essentially algorithm specifications written in natural language.17 When these specifications were simple (e.g., "If cells \> 20%, then AML"), natural language was an adequate medium. The human brain could parse and execute this logic reliably. The process was short, linear, and had few dependencies. A clinician could memorize the handful of rules and apply them at the bedside or the microscope with high fidelity.

However, the 5th Edition (WHO-HAEM5) and ICC 2022 have introduced high-dimensional complexity. The diagnosis of AML now requires the integration of five distinct data streams:

1. **Morphology:** Blast counts (blood and marrow), dysplasia assessment, cellularity.  
2. **Immunophenotyping:** Flow cytometry (CD34, CD117, HLA-DR, lineage markers) to determine lineage and maturation stage.18  
3. **Cytogenetics:** Karyotyping for balanced translocations (e.g., t(8;21), inv(16), t(15;17)) and complex karyotypes.19  
4. **Molecular Genetics:** Sequencing for driver mutations (*NPM1*, *CEBPA*), co-mutations (*FLT3*, *DNMT3A*), and secondary-type mutations (*ASXL1*, *BCOR*, *SRSF2*, etc.).1  
5. **Clinical History:** Prior therapy (cytotoxic drugs, radiation) or antecedent MDS/MPN.20

Each of these streams contains dozens of variables. The interaction effects between them are non-linear. For example, a *TP53* mutation matters, but its Variant Allele Frequency (VAF) also matters (ICC requires \>10% VAF).22 A *CEBPA* mutation matters, but only if it is "biallelic" (WHO 2016\) or in the "bZIP" region (WHO 2022).3 A *RUNX1* mutation is AML-defining in ICC but relegated to "AML-MR" in WHO 2022\.3 The algorithm has exploded in complexity. It is no longer a linear decision tree; it is a matrix of conditional dependencies.

### **3.2 The Limits of Cognitive Capacity: Cognitive Load Theory in Pathology**

The cognitive load required to cross-reference these five dimensions against two competing classification systems (WHO vs. ICC) and an evolving risk stratification system (ELN 2022\) exceeds the working memory of a typical clinician.5 Cognitive Load Theory posits that human working memory has a limited capacity for processing novel information. When the "intrinsic load" (the inherent complexity of the task) is high, and the "extraneous load" (the effort required to find and interpret the rules) is also high, the system fails. Errors occur.

This application of Cognitive Load Theory explains the rising rates of **diagnostic discordance**. Studies have shown that reclassification rates between local pathologists and central adjudicated review in MDS/AML can be as high as **29%**.25

* **Local Misdiagnosis:** Up to 21% of MDS cases are misclassified locally.26  
* **Impact:** 7% of misdiagnosed cases receive inappropriate therapy based on the wrong label.25

This is not a failure of competence; it is a failure of infrastructure. We are asking humans to perform the job of a database query engine. The pathologist must remember:

* "Does *RUNX1* mutation count as an AML-defining lesion in WHO 2022?" (No, it was removed/reclassified to AML-MR).  
* "Does *RUNX1* count in ICC 2022?" (Yes, it is retained).3  
* "What is the allele frequency cutoff for *TP53* in ICC?" (10% VAF).22  
* "Is *BCOR* considered a myelodysplasia-related gene in both systems?" (Yes, but its prognostic weight differs).3

These are binary logic checks that computers perform instantly and flawlessly, but which induce fatigue and error in humans. The sheer volume of updates between WHO 2016 and WHO 2022—such as the renaming of "AML with myelodysplasia-related changes" to "AML, myelodysplasia-related" (AML-MR) and the changing list of defining mutations—creates a high risk of classification error.1 A pathologist relying on memory might inadvertently apply a "v2016" rule to a "v2022" case, leading to a diagnostic error that could alter the patient's treatment path.

### **3.3 The "Will Rogers Phenomenon" in Survival Statistics**

The reclassification of patients from MDS to AML creates a statistical artifact known as the **Will Rogers Phenomenon** (Stage Migration). Named after the humorist who quipped that "When the Okies left Oklahoma and moved to California, they raised the average intelligence level in both states," this phenomenon distorts survival data.28 It creates a statistical illusion of progress that can confound clinical trials and epidemiological studies.

In the context of the WHO 2022 update:

1. **Migration:** Patients with *NPM1* mutations and low blast counts (10-19%) were previously classified as MDS. These patients generally had a *worse* prognosis than other MDS patients (because *NPM1* drives aggressive disease) but a *better* prognosis than fulminant AML patients (who have high blast burdens and often more complex genetics).28  
2. **Reclassification:** WHO 2022 moves these patients into the AML cohort.  
3. **Result:**  
   * **MDS Survival Improves:** The "bad" MDS patients (NPM1+) are removed from the MDS pool. The remaining MDS patients have, on average, more indolent disease. Thus, MDS survival statistics artificially rise.  
   * **AML Survival Improves:** The "good" AML patients (low blast count, favorable genetics) are added to the AML pool. They dilute the poor outcomes of the high-risk AML patients. Thus, AML survival statistics artificially rise.

This creates the illusion of therapeutic progress where none exists. Survival curves shift purely due to "Diagnostic Drift".30 Without a computational system to normalize this data—to "version control" the patient cohorts—longitudinal research becomes unreliable. Researchers comparing AML survival in 2023 vs. 2015 might attribute the improvement to better drugs, when in reality, it is partly due to the inclusion of "healthier" patients in the AML bucket. A logic engine like Haem.io allows researchers to retroactively apply WHO 2016 or WHO 2022 rules to the *same* dataset to control for this migration, a capability impossible with static guidelines. It enables "apples-to-apples" comparisons across time, preserving the integrity of scientific inquiry.

---

## **Part 4: The Solution: Guidelines as Executable Logic**

The solution to the Complexity Crisis is not "more training" for pathologists. It is the adoption of **Computable Biomedical Knowledge (CBK)**. We must transition from human-readable guidelines (PDFs) to machine-executable guidelines (Logic).31

### **4.1 The Concept of Executable Logic**

In systems engineering, business logic is encapsulated in standard protocols. When the logic changes, the protocol is updated, and the entire system adheres to the new standard instantly. In medicine, this "update" is manual, slow, and error-prone. Guidelines are published as text, disseminated via conferences, and slowly integrated into practice over years. This "latency" creates a gap between the current standard of care and actual clinical practice.

Haem.io proposes a system where the "Blue Books" are digitized into a deterministic logic layer.

* **Input:** Structured data (Blast %, Gene Variants VAF, Karyotype string, Immunophenotype).  
* **Processing:** The "Logic Engine" runs the input against the codified rulesets of WHO 2022, ICC 2022, and ELN 2022 simultaneously.  
* **Output:** A structured diagnostic object containing:  
  * Diagnosis\_WHO22: "AML with NPM1"  
  * Diagnosis\_ICC22: "AML with NPM1"  
  * Risk\_ELN22: "Favorable"  
  * Discordance\_Flag: False (or True, if definitions clash)

This transforms the guideline from a passive reference document into an active, executable tool. It ensures that the diagnosis is not just a label, but a computed result derived from a verifiable logic path.

### **4.2 The "Digital Twin" of the Guideline**

This approach creates a "Digital Twin," not just of the patient, but of the *guideline itself*.7 The system maintains a digital representation of the diagnostic framework. This differs from the typical use of "Digital Twins" in medicine, which usually refers to simulating patient physiology. Here, we are simulating the *diagnostic process*.

Technical Implementation:  
Instead of a "Black Box" AI (Deep Learning) which might hallucinate a diagnosis based on obscure correlations in training data, this requires Symbolic AI or Deterministic Rule Engines. The logic must be "provable" and "transparent".7 In a field like oncology, explainability is paramount. A clinician cannot accept a diagnosis from a system that says "Trust me." They need to see the proof.  
The Haem.io system provides this transparency. The physician can click on the computed diagnosis and see the specific rule that triggered it:

"Diagnosis is AML because: *NPM1* mutation is Present AND *Defining\_Genetic\_Abnormality* overrides *Blast\_Count* (Source: WHO 2022, Table 1)."

This transparent logic builds trust. It allows the clinician to verify the system's reasoning against their own knowledge. It also serves an educational function, reinforcing the complex rules of the new classifications with every use. By making the logic explicit, the system turns every case into a learning opportunity, reducing the cognitive load while simultaneously upskilling the user.

### **4.3 Handling Breaking Changes (Version Control)**

When the WHO releases the 6th Edition (inevitably), a software-based system handles this via version control. The "v5.0" standard is archived, and "v6.0" is integrated into the Logic Engine.

* **Legacy Data:** Historical patient data can be re-run against "v6.0" to see if their diagnosis changes (Managing Diagnostic Drift).  
* **Current Patients:** New patients are assessed against the latest version of the standard.

This capability solves the update management problem in medicine. Currently, it takes years for a new guideline to fully permeate clinical practice globally. Clinicians in smaller community centers may continue using outdated criteria simply because they haven't had time to digest the latest 500-page PDF. With a centralized Logic Engine, compliance is instantaneous upon the software update.7 The new standard is deployed to the cloud, and every user of the platform immediately has access to the updated logic. This dramatically shortens the "knowledge translation" gap, ensuring that patients receive care based on the most current science, regardless of where they are treated.

---

## **Part 5: Implications for Clinical Practice (ELN 2022\)**

The diagnosis is only the first step. The treatment decision—the "execution" of care—relies on Risk Stratification. The **European LeukemiaNet (ELN) 2022** recommendations introduced significant complexity that further mandates a computational approach.34 The ELN guidelines dictate *how* to treat the patient (e.g., transplant vs. chemotherapy alone) based on the risk of relapse.

### **5.1 The FLT3-ITD Variable Change**

In ELN 2017, the allelic ratio of the FLT3-ITD mutation was a critical variable. A "Low" ratio (\<0.5) was considered favorable (if NPM1 was also mutated), while a "High" ratio (≥0.5) was adverse. This required precise quantification of the mutant-to-wild-type ratio.  
In ELN 2022, this variable was removed. The logic simplified: "Any FLT3-ITD is Intermediate Risk" (unless adverse genetics are present).11

* **Reasoning:** Standardization of the ratio assay was difficult across different labs (an assay variability leading to interpretative failure).11 The variability in measurement meant that the same patient could be "Low Ratio" in one lab and "High Ratio" in another.  
* **Implication:** The Logic Engine must update its risk calculator. It no longer needs to query the FLT3\_Ratio variable for risk assignment, but it still needs to check for the presence of the mutation. This change simplifies the input but changes the risk output for thousands of patients. A patient who was "Favorable" under 2017 rules might now be "Intermediate," potentially changing their eligibility for transplant.

### **5.2 The MR-Gene List Expansion and Logic Conflicts**

ELN 2022 expanded the list of "Adverse Risk" mutations to include *SRS2, SF3B1, U2AF1, ZRSR2, BCOR, EZH2, STAG2*.2 These are the so-called "secondary-type" or "myelodysplasia-related" mutations.

* **Complexity:** A patient with *NPM1* (typically Favorable) who also has a *BCOR* mutation (Adverse) represents a logic conflict.  
* **Resolution:** ELN 2022 logic dictates that Adverse Risk features *override* Favorable features in specific contexts. Specifically, the presence of any of these adverse mutations places the patient in the **Adverse Risk** category, even if they have an *NPM1* mutation (which would otherwise be Favorable).35

This is a critical "conditional override." A human pathologist might miss a rare *ZRSR2* mutation buried in the fine print of a 50-gene NGS panel report. They might see the *NPM1* mutation and instinctively categorize the patient as "Favorable." A Logic Engine will not make this mistake. It will scan the entire mutation list, identify the *ZRSR2* variant, apply the override rule, and flag the patient as Adverse Risk. This immediate reclassification alters the treatment plan from standard chemotherapy to potentially including a transplant evaluation, significantly impacting the patient's long-term survival chances.

### **5.3 Treatment Guidelines: The NCCN Connection**

The outputs of the Logic Engine (Diagnosis \+ Risk) feed directly into treatment guidelines, such as those from the **National Comprehensive Cancer Network (NCCN)**. The NCCN guidelines for AML (v3.2024) and MDS (v1.2024) have been updated to reflect the new classifications, particularly regarding *NPM1* mutations.

* **NCCN on NPM1:** The guidelines now recommend that patients with *NPM1*\-mutated myeloid neoplasms and \<20% blasts be managed as AML.36 This aligns with the WHO 2022 reclassification.  
* **Therapeutic Impact:** This recommendation unlocks access to AML-specific therapies like **Gemtuzumab Ozogamicin** (CD33-targeted therapy) and **Venetoclax \+ Azacitidine** combinations for these patients.36 Previously, under an MDS label, these options might have been restricted or off-label.  
* **Logic Integration:** A comprehensive system like Haem.io can link the diagnostic output ("AML with NPM1") directly to the NCCN treatment algorithm, suggesting the appropriate therapeutic regimen. It can also flag eligibility for specific targeted inhibitors (e.g., *FLT3* inhibitors like Midostaurin or Quizartinib, *IDH1/2* inhibitors like Ivosidenib/Enasidenib) based on the computed mutational profile.36 This creates an end-to-end "decision support" loop, from raw genomic data to guideline-compliant treatment recommendations.

---

## **Part 6: Conclusion \- The Operating System for Haematology**

The transition from WHO 2016 to WHO 2022/ICC 2022 was not just an update; it was a paradigm shift that challenged the manual processes of haematology. The "Blue Books" have become too complex to be read; they must be computed. We are currently in a crisis of **Diagnostic Drift**, where the definition of cancer is fluid, varying by institution, guideline preference, and pathologist memory. This variability compromises patient care, corrupts clinical trial data, and hinders the progress of precision medicine.

**Haem.io** addresses this by treating medical guidelines as **Executable Logic**. By building a deterministic Logic Engine that ingests genomic data and executes the precise rules of WHO and ICC, we provide:

1. **Version Control:** Managing the drift between 2016, 2022, and future standards.  
2. **Runtime Compliance:** Ensuring every diagnosis matches the latest global standard instantly.  
3. **Cognitive Offloading:** Freeing clinicians from the burden of memorizing algorithmic trees, allowing them to focus on patient management.  
4. **Data Integrity:** Solving the "Will Rogers Phenomenon" by enabling retrospective reclassification of cohorts for accurate research.

The future of haematology is not just about discovering new mutations; it is about effectively executing the knowledge we already have. Medical guidelines are logic. It is time we built the operating system to run them.

---

## **Appendix: Comparative Logic Tables**

### **Table A: WHO 2022 vs. ICC 2022 "Discrepancies"**

The following table summarizes the key divergences between the two major 2022 classification systems, illustrating the split in the diagnostic logic.

| Feature | WHO 2022 | ICC 2022 | Impact on Logic |
| :---- | :---- | :---- | :---- |
| **AML Blast Cutoff** | Eliminated for defining genetics (except *BCR::ABL1*, *CEBPA*) | Reduced to 10% for defining genetics | **Split:** \<10% is AML in WHO, MDS in ICC. |
| **TP53 Mutation** | Not a distinct AML entity (qualifier only) | **Distinct Entity:** "AML with mutated TP53" (\>20% blasts) | **Split:** ICC prioritizes TP53 as a distinct high-risk class. |
| **MDS/AML Boundary** | Boundary dissolved for genetic AML | **New Category:** "MDS/AML" (10-19% blasts without genetics) | **Split:** ICC creates a specific "border zone" category. |
| **CEBPA Mutation** | Requires Single (bZIP) or Biallelic | Requires Biallelic or Single (bZIP) | **Convergent:** Both recognize bZIP importance. |
| **RUNX1 Mutation** | Removed as defining entity (moved to AML-MR) | Retained as "AML with mutated RUNX1" | **Split:** RUNX1 is a primary driver in ICC, secondary in WHO. |

### **Table B: ELN 2022 Risk Stratification Logic Updates**

This table details the changes in risk assessment logic from ELN 2017 to ELN 2022, highlighting the shift in variable weighting.

| Variable | ELN 2017 Logic | ELN 2022 Logic | Reason for Refactor |
| :---- | :---- | :---- | :---- |
| **FLT3-ITD** | Risk depends on Allelic Ratio (Low vs High) | **Intermediate Risk** (Ratio ignored) | Standardization of ratio assay was unreliable. |
| **MR-Gene Mutations** | Limited set (*ASXL1, RUNX1, TP53*) | Expanded set (*BCOR, EZH2, SF3B1, SRSF2, STAG2, U2AF1, ZRSR2*) | New data on adverse impact of secondary-type mutations. |
| **CEBPA** | Biallelic \= Favorable | **bZIP (Mono or Bi) \= Favorable** | bZIP domain mutations drive prognosis, not just allelic status. |
| **Cytogenetics** | Complex Karyotype ≥ 3 abnormalities | **Complex Karyotype ≥ 3 abnormalities** (with exclusions) | Refined definition to exclude hyperdiploid/other specific types. |

#### **Works cited**

1. Comparative Analysis of AML Classification Systems: Evaluating the WHO, ICC, and ELN Frameworks and Their Distinctions \- NIH, accessed on November 24, 2025, [https://pmc.ncbi.nlm.nih.gov/articles/PMC11352995/](https://pmc.ncbi.nlm.nih.gov/articles/PMC11352995/)  
2. What's new in AML Classification (WHO 2022 vs International Consensus… \- College of American Pathologists, accessed on November 24, 2025, [https://www.cap.org/member-resources/articles/whats-new-in-aml-classification-who-2022-vs-international-consensus-classification](https://www.cap.org/member-resources/articles/whats-new-in-aml-classification-who-2022-vs-international-consensus-classification)  
3. What is new in acute myeloid leukemia classification? \- PMC \- NIH, accessed on November 24, 2025, [https://pmc.ncbi.nlm.nih.gov/articles/PMC11016528/](https://pmc.ncbi.nlm.nih.gov/articles/PMC11016528/)  
4. What is new in acute myeloid leukemia classification? \- BLOOD RESEARCH, accessed on November 24, 2025, [https://www.bloodresearch.or.kr/journal/view.html?uid=2666](https://www.bloodresearch.or.kr/journal/view.html?uid=2666)  
5. Navigating complexity. The role of cognitive load in guideline adherence among nurses: a commentary \- PMC \- NIH, accessed on November 24, 2025, [https://pmc.ncbi.nlm.nih.gov/articles/PMC12443719/](https://pmc.ncbi.nlm.nih.gov/articles/PMC12443719/)  
6. Full article: Pathologist workload, burnout, and wellness: connecting the dots \- Taylor and Francis, accessed on November 24, 2025, [https://www.tandfonline.com/doi/full/10.1080/10408363.2023.2285284](https://www.tandfonline.com/doi/full/10.1080/10408363.2023.2285284)  
7. Haem.io \- Haematology Diagnosis Tool, accessed on November 24, 2025, [https://haem.io/](https://haem.io/)  
8. Interactions and relevance of blast percentage and treatment strategy among younger and older patients with acute myeloid leukemia (AML) and myelodysplastic syndrome (MDS) \- PMC \- PubMed Central, accessed on November 24, 2025, [https://pmc.ncbi.nlm.nih.gov/articles/PMC5486407/](https://pmc.ncbi.nlm.nih.gov/articles/PMC5486407/)  
9. Acute Myeloid Leukemia: 2025 Update on Diagnosis, Risk‐Stratification, and Management, accessed on November 24, 2025, [https://pmc.ncbi.nlm.nih.gov/articles/PMC11966364/](https://pmc.ncbi.nlm.nih.gov/articles/PMC11966364/)  
10. The 5th Edition of the World Health Organization Classification of Hematolymphoid Tumors \- Leukemia \- NCBI Bookshelf, accessed on November 24, 2025, [https://www.ncbi.nlm.nih.gov/books/NBK586208/](https://www.ncbi.nlm.nih.gov/books/NBK586208/)  
11. Diagnosis and management of AML in adults: 2022 recommendations from an international expert panel on behalf of the ELN | Blood \- ASH Publications, accessed on November 24, 2025, [https://ashpublications.org/blood/article/140/12/1345/485817/Diagnosis-and-management-of-AML-in-adults-2022](https://ashpublications.org/blood/article/140/12/1345/485817/Diagnosis-and-management-of-AML-in-adults-2022)  
12. Criteria for Diagnosis and Molecular Monitoring of NPM1-Mutated AML \- PMC, accessed on November 24, 2025, [https://pmc.ncbi.nlm.nih.gov/articles/PMC10772525/](https://pmc.ncbi.nlm.nih.gov/articles/PMC10772525/)  
13. NPM1 mutations define a specific subgroup of MDS and MDS/MPN patients with favorable outcomes with intensive chemotherapy \- PMC \- NIH, accessed on November 24, 2025, [https://pmc.ncbi.nlm.nih.gov/articles/PMC6436014/](https://pmc.ncbi.nlm.nih.gov/articles/PMC6436014/)  
14. NPM1-Mutated Myeloid Neoplasms with \<20% Blasts: A Really Distinct Clinico-Pathologic Entity? \- NIH, accessed on November 24, 2025, [https://pmc.ncbi.nlm.nih.gov/articles/PMC7730332/](https://pmc.ncbi.nlm.nih.gov/articles/PMC7730332/)  
15. NPM1-Mutated Myeloid Neoplasms: Updated Outcomes with High-Intensive Chemotherapy Regardless of the Blast Percentage | Blood \- ASH Publications, accessed on November 24, 2025, [https://ashpublications.org/blood/article/142/Supplement%201/957/503087/NPM1-Mutated-Myeloid-Neoplasms-Updated-Outcomes](https://ashpublications.org/blood/article/142/Supplement%201/957/503087/NPM1-Mutated-Myeloid-Neoplasms-Updated-Outcomes)  
16. Navigating the 2022 International Consensus and World Health Organization Classifications of Hematopathology: A Call for Unified Diagnostic Language \- Allen Press, accessed on November 24, 2025, [https://meridian.allenpress.com/aplm/article/149/4/363/501592/Navigating-the-2022-International-Consensus-and](https://meridian.allenpress.com/aplm/article/149/4/363/501592/Navigating-the-2022-International-Consensus-and)  
17. Haematolymphoid Tumours \- IARC Publications Website, accessed on November 24, 2025, [https://publications.iarc.who.int/Book-And-Report-Series/Who-Classification-Of-Tumours/Haematolymphoid-Tumours-2024](https://publications.iarc.who.int/Book-And-Report-Series/Who-Classification-Of-Tumours/Haematolymphoid-Tumours-2024)  
18. Advancing Diagnostic Accuracy and Quality of Patient Care Through the Implementation of a Flow Cytometry Quality Assurance Program | Archives of Pathology & Laboratory Medicine \- Allen Press, accessed on November 24, 2025, [https://meridian.allenpress.com/aplm/article/149/2/e26/501362/Advancing-Diagnostic-Accuracy-and-Quality-of](https://meridian.allenpress.com/aplm/article/149/2/e26/501362/Advancing-Diagnostic-Accuracy-and-Quality-of)  
19. Full article: Revisiting the prognostic role of FLT3 mutations in acute myelogenous leukemia, accessed on November 24, 2025, [https://www.tandfonline.com/doi/full/10.1080/17474086.2023.2202849](https://www.tandfonline.com/doi/full/10.1080/17474086.2023.2202849)  
20. P499: APPLICABILITY OF 2022 CLASSIFICATIONS OF ACUTE MYELOID LEUKEMIA IN THE REAL-WORLD SETTING \- PMC \- NIH, accessed on November 24, 2025, [https://pmc.ncbi.nlm.nih.gov/articles/PMC10428800/](https://pmc.ncbi.nlm.nih.gov/articles/PMC10428800/)  
21. Applicability of 2022 classifications of acute myeloid leukemia in the real-world setting \- PMC \- NIH, accessed on November 24, 2025, [https://pmc.ncbi.nlm.nih.gov/articles/PMC10477447/](https://pmc.ncbi.nlm.nih.gov/articles/PMC10477447/)  
22. Comparison of the 2022 ICC and Who Classification Systems of Myelodysplastic Neoplasms | Blood | American Society of Hematology \- ASH Publications, accessed on November 24, 2025, [https://ashpublications.org/blood/article/142/Supplement%201/1875/505943/Comparison-of-the-2022-ICC-and-Who-Classification](https://ashpublications.org/blood/article/142/Supplement%201/1875/505943/Comparison-of-the-2022-ICC-and-Who-Classification)  
23. AML and MDS Classification According to Who 2022 and International Consensus Classification: Do We Invent a Babylonian Confusion of Languages? | Blood \- ASH Publications, accessed on November 24, 2025, [https://ashpublications.org/blood/article/140/Supplement%201/555/490008/AML-and-MDS-Classification-According-to-Who-2022](https://ashpublications.org/blood/article/140/Supplement%201/555/490008/AML-and-MDS-Classification-According-to-Who-2022)  
24. Implications of the 5th Edition of the World Health Organization Classification and International Consensus Classification of Myeloid Neoplasm in Myelodysplastic Syndrome With Excess Blasts and Acute Myeloid Leukemia \- PMC \- NIH, accessed on November 24, 2025, [https://pmc.ncbi.nlm.nih.gov/articles/PMC10151277/](https://pmc.ncbi.nlm.nih.gov/articles/PMC10151277/)  
25. Discordant pathologic diagnoses of myelodysplastic neoplasms and their implications for registries and therapies | Blood Advances \- ASH Publications, accessed on November 24, 2025, [https://ashpublications.org/bloodadvances/article/7/20/6120/497120/Discordant-pathologic-diagnoses-of-myelodysplastic](https://ashpublications.org/bloodadvances/article/7/20/6120/497120/Discordant-pathologic-diagnoses-of-myelodysplastic)  
26. Discordant pathologic diagnoses of myelodysplastic neoplasms and their implications for registries and therapies \- PubMed, accessed on November 24, 2025, [https://pubmed.ncbi.nlm.nih.gov/37552083/](https://pubmed.ncbi.nlm.nih.gov/37552083/)  
27. Acute myeloid leukemia and myelodysplastic neoplasms: clinical implications of myelodysplasia-related genes mutations and TP53 aberrations \- PMC, accessed on November 24, 2025, [https://pmc.ncbi.nlm.nih.gov/articles/PMC11655781/](https://pmc.ncbi.nlm.nih.gov/articles/PMC11655781/)  
28. The Will Rogers phenomenon. Stage migration and new diagnostic techniques as a source of misleading statistics for survival in cancer \- PubMed, accessed on November 24, 2025, [https://pubmed.ncbi.nlm.nih.gov/4000199/](https://pubmed.ncbi.nlm.nih.gov/4000199/)  
29. Will Rogers phenomenon | Radiology Reference Article | Radiopaedia.org, accessed on November 24, 2025, [https://radiopaedia.org/articles/will-rogers-phenomenon](https://radiopaedia.org/articles/will-rogers-phenomenon)  
30. Incidence and Dynamics of CRC Stage Migration: A Regional vs. a National Analysis \- MDPI, accessed on November 24, 2025, [https://www.mdpi.com/2072-6694/16/19/3245](https://www.mdpi.com/2072-6694/16/19/3245)  
31. Mobilizing Computable Biomedical Knowledge \- University of Michigan, accessed on November 24, 2025, [https://mobilizecbk.med.umich.edu/](https://mobilizecbk.med.umich.edu/)  
32. Ten simple rules to make computable knowledge shareable and reusable \- PMC, accessed on November 24, 2025, [https://pmc.ncbi.nlm.nih.gov/articles/PMC11189186/](https://pmc.ncbi.nlm.nih.gov/articles/PMC11189186/)  
33. Digital twins in oncology \- PMC \- NIH, accessed on November 24, 2025, [https://pmc.ncbi.nlm.nih.gov/articles/PMC10356671/](https://pmc.ncbi.nlm.nih.gov/articles/PMC10356671/)  
34. Molecular, clinical, and therapeutic determinants of outcome in NPM1-mutated AML | Blood, accessed on November 24, 2025, [https://ashpublications.org/blood/article/144/7/714/515977/Molecular-clinical-and-therapeutic-determinants-of](https://ashpublications.org/blood/article/144/7/714/515977/Molecular-clinical-and-therapeutic-determinants-of)  
35. 2022 ELN recommendations for the diagnosis of AML in adults \- AML Hub, accessed on November 24, 2025, [https://aml-hub.com/medical-information/2022-eln-recommendations-for-the-diagnosis-of-aml-in-adults](https://aml-hub.com/medical-information/2022-eln-recommendations-for-the-diagnosis-of-aml-in-adults)  
36. NCCN Guidelines for Patients: Acute Myeloid Leukemia, accessed on November 24, 2025, [https://www.nccn.org/patients/guidelines/content/PDF/aml-patient.pdf](https://www.nccn.org/patients/guidelines/content/PDF/aml-patient.pdf)  
37. Acute Myeloid Leukemia, accessed on November 24, 2025, [https://www2.tri-kobe.org/nccn/guideline/hematologic/english/aml.pdf](https://www2.tri-kobe.org/nccn/guideline/hematologic/english/aml.pdf)