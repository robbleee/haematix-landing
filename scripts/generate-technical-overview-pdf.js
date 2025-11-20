const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Get the HTML content for Technical Overview PDF
const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: Georgia, 'Times New Roman', serif;
      line-height: 1.7;
      color: #000000;
      background: white;
      padding: 50px 60px;
    }
    
    .header {
      margin-bottom: 40px;
    }
    
    .header h1 {
      font-size: 36px;
      color: #009688;
      margin-bottom: 8px;
      font-weight: 700;
    }
    
    .header h2 {
      font-size: 20px;
      color: #666666;
      margin-bottom: 24px;
      font-weight: 400;
    }
    
    .header p {
      font-size: 14px;
      color: #666666;
      margin-top: 4px;
    }
    
    .section {
      margin-bottom: 35px;
      page-break-inside: avoid;
    }
    
    .section h2 {
      font-size: 22px;
      color: #009688;
      margin-bottom: 8px;
      padding-bottom: 4px;
      border-bottom: 2px solid #009688;
      font-weight: 700;
    }
    
    .section h3 {
      font-size: 18px;
      color: #009688;
      margin-bottom: 12px;
      margin-top: 20px;
      font-weight: 700;
    }
    
    .section h4 {
      font-size: 16px;
      color: #000000;
      margin-bottom: 8px;
      margin-top: 16px;
      font-weight: 700;
    }
    
    .callout {
      background: #f0f9f8;
      border-left: 4px solid #009688;
      padding: 20px;
      margin-bottom: 24px;
      border-radius: 0;
    }
    
    .callout h3 {
      font-size: 16px;
      color: #009688;
      margin-bottom: 10px;
      margin-top: 0;
      font-weight: 700;
    }
    
    .callout p {
      font-size: 14px;
      color: #000000;
      line-height: 1.7;
      text-align: justify;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
      font-size: 13px;
    }
    
    table th {
      background: #e0f2f1;
      padding: 12px 10px;
      text-align: left;
      font-weight: 700;
      color: #009688;
      border: 1px solid #009688;
    }
    
    table td {
      padding: 10px;
      border: 1px solid #cccccc;
      color: #000000;
    }
    
    table tbody tr {
      background: white;
    }
    
    table tbody tr:nth-child(even) {
      background: #fafafa;
    }
    
    ul {
      list-style: none;
      padding-left: 0;
      margin-bottom: 16px;
    }
    
    ul li {
      margin-bottom: 10px;
      font-size: 14px;
      color: #000000;
      padding-left: 20px;
      position: relative;
      text-align: justify;
    }
    
    ul li::before {
      content: "•";
      position: absolute;
      left: 0;
      color: #009688;
      font-weight: bold;
    }
    
    ol {
      margin-left: 20px;
      margin-bottom: 16px;
    }
    
    ol li {
      margin-bottom: 10px;
      font-size: 14px;
      color: #000000;
      text-align: justify;
    }
    
    strong {
      font-weight: 700;
      color: #000000;
    }
    
    p {
      text-align: justify;
      margin-bottom: 12px;
      font-size: 14px;
    }
    
    .footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 2px solid #009688;
      text-align: center;
      font-size: 11px;
      color: #666666;
      line-height: 1.6;
    }
    
    .page-break {
      page-break-after: always;
    }
    
    .metadata {
      background: #f0f9f8;
      padding: 16px;
      margin-bottom: 30px;
      border-radius: 4px;
    }
    
    .metadata p {
      font-size: 13px;
      margin-bottom: 4px;
    }
    
    .flow-diagram {
      background: #f9f9f9;
      padding: 20px;
      margin: 20px 0;
      text-align: center;
      font-family: 'Courier New', monospace;
      font-size: 13px;
      line-height: 2;
    }
    
    .checklist {
      background: #f0f9f8;
      padding: 16px 20px;
      margin: 16px 0;
    }
    
    .checklist li {
      padding-left: 30px;
    }
    
    .checklist li::before {
      content: "☐";
      position: absolute;
      left: 0;
      color: #009688;
      font-size: 18px;
    }
    
    code {
      background: #f0f0f0;
      padding: 2px 6px;
      border-radius: 3px;
      font-family: 'Courier New', monospace;
      font-size: 12px;
    }
    
    .highlight-box {
      background: #fff9e6;
      border: 2px solid #ffc107;
      padding: 16px;
      margin: 16px 0;
      border-radius: 4px;
    }
    
    .success-box {
      background: #e8f5e9;
      border-left: 4px solid #10b981;
      padding: 16px;
      margin: 16px 0;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Technical Overview: haem.io AML/MDS Platform</h1>
    <h2>AI-Powered Clinical Decision Support for Haematological Malignancies</h2>
    
    <div class="metadata">
      <p><strong>Date:</strong> November 2025</p>
      <p><strong>Version:</strong> 2.0</p>
      <p><strong>Contact:</strong> Robert Edward Lee, Haem.io Ltd</p>
      <p><strong>Classification Target:</strong> Class 1 Medical Device (UK MHRA / EU MDR)</p>
    </div>
  </div>

  <div class="section">
    <h2>1. What is haem.io?</h2>
    
    <p><strong>Product Type:</strong> Comprehensive clinical decision support platform for haematological malignancies</p>
    
    <p><strong>Core Functionality:</strong> haem.io extracts structured data from pathology reports and provides:</p>
    <ul>
      <li><strong>Disease Classification:</strong> WHO 2022 and ICC 2022 guideline-based classification for AML and MDS</li>
      <li><strong>Risk Stratification:</strong> ELN 2022 risk calculator for AML prognosis</li>
      <li><strong>MRD Assessment:</strong> Minimal residual disease evaluation based on molecular markers</li>
      <li><strong>Treatment Recommendations:</strong> Evidence-based therapy options aligned with current guidelines</li>
      <li><strong>Clinical Trial Matching:</strong> Patient eligibility assessment for active haematology trials</li>
    </ul>
    
    <p><strong>Clinical Workflow:</strong> A haematologist reviews and confirms all outputs before clinical use. The system provides transparent reasoning for every suggestion, enabling rapid verification against source guidelines.</p>
  </div>

  <div class="section">
    <h2>2. How It Works</h2>
    
    <div class="flow-diagram">
      Doctor uploads pathology report<br>
      ↓<br>
      AI extracts structured data (mutations, blast %, cytogenetics, etc.)<br>
      ↓<br>
      Classification engine applies WHO/ICC rules<br>
      ↓<br>
      Risk stratification (ELN 2022 calculator)<br>
      ↓<br>
      MRD assessment (molecular marker analysis)<br>
      ↓<br>
      Treatment options (guideline-aligned recommendations)<br>
      ↓<br>
      Clinical trial matching (eligibility screening)<br>
      ↓<br>
      Comprehensive report with transparent reasoning<br>
      ↓<br>
      Doctor reviews, confirms, or modifies all outputs
    </div>
    
    <div class="callout">
      <h3>Key Principle</h3>
      <p>The software <strong>suggests</strong>, the doctor <strong>decides</strong>. All outputs are advisory only and require clinician oversight before clinical use.</p>
    </div>
  </div>

  <div class="page-break"></div>

  <div class="section">
    <h2>3. Technical Components (Brief)</h2>
    
    <h3>AI Component (Data Extraction):</h3>
    <ul>
      <li><strong>Model:</strong> Llama 3.1 8B (Meta's open-source language model)</li>
      <li><strong>Purpose:</strong> Extract structured data from unstructured text reports</li>
      <li><strong>What it does NOT do:</strong> Make any clinical decisions</li>
    </ul>
    
    <div class="callout">
      <h3>How Data Extraction Works</h3>
      <p>The AI component reads the unstructured pathology report text and extracts key diagnostic fields into a structured JSON format:</p>
      <ul>
        <li><strong>Input:</strong> Free-text pathology report (e.g., "Bone marrow aspirate shows 28% blasts. Cytogenetics: normal karyotype. Molecular: NPM1 mutation detected, FLT3-ITD negative")</li>
        <li><strong>Extraction Process:</strong> Llama 3.1 identifies and extracts specific clinical fields:
          <ul>
            <li>Blast percentage (e.g., 28%)</li>
            <li>Gene mutations (e.g., NPM1: positive, FLT3-ITD: negative)</li>
            <li>Cytogenetics findings (e.g., normal karyotype)</li>
            <li>Cell counts and morphology data</li>
          </ul>
        </li>
        <li><strong>Output:</strong> Structured JSON object with typed fields:
          <pre style="background: #f0f0f0; padding: 10px; margin: 10px 0; font-size: 11px; overflow-x: auto;">
{
  "blast_percentage": 28,
  "npm1_mutation": true,
  "flt3_itd": false,
  "cytogenetics": "normal_karyotype",
  "sample_type": "bone_marrow"
}</pre>
        </li>
      </ul>
      <p><strong>Key point:</strong> The AI only extracts data; it makes no clinical decisions or classifications.</p>
    </div>
    
    <h3>Classification Component (Diagnostic Pathways):</h3>
    <ul>
      <li><strong>Type:</strong> Rule-based algorithm (NOT AI)</li>
      <li><strong>Based on:</strong> Published WHO 2022 and ICC 2022 classification guidelines</li>
      <li><strong>Function:</strong> Takes the structured JSON fields and applies diagnostic pathways</li>
    </ul>
    
    <div class="callout">
      <h3>How Diagnostic Pathways Work</h3>
      <p>Once data is extracted to JSON, the system applies deterministic classification rules:</p>
      <ul>
        <li><strong>Input:</strong> Structured JSON fields from extraction step</li>
        <li><strong>Processing:</strong> Rule-based decision trees apply WHO/ICC criteria:
          <ul>
            <li>Check blast percentage thresholds (≥10% for MDS-IB2, ≥20% for AML)</li>
            <li>Evaluate defining genetic abnormalities (e.g., NPM1, RUNX1-RUNX1T1)</li>
            <li>Apply classification hierarchy per guidelines</li>
            <li>Generate step-by-step reasoning chain</li>
          </ul>
        </li>
        <li><strong>Output:</strong> Suggested classification with transparent reasoning:
          <ul>
            <li>Final classification (e.g., "AML with mutated NPM1")</li>
            <li>Rationale for each decision point</li>
            <li>References to specific guideline sections</li>
            <li>Confidence flags for ambiguous cases</li>
          </ul>
        </li>
      </ul>
      <p><strong>Key point:</strong> All classification logic is deterministic and traceable. Same input always produces same output.</p>
    </div>
    
    <h3>Deployment:</h3>
    <ul>
      <li><strong>Runs locally</strong> (no cloud, no internet required)</li>
      <li><strong>Air-gapped deployment</strong> for secure environments</li>
      <li><strong>Docker containers</strong> (easy installation)</li>
      <li><strong>Processing time:</strong> 2-4 minutes per report</li>
    </ul>
  </div>

  <div class="page-break"></div>

  <div class="section">
    <h2>4. Clinical Decision Support Features</h2>
    
    <p>Beyond disease classification, haem.io provides comprehensive clinical decision support tools that leverage the extracted pathology data:</p>
    
    <h3>ELN 2022 Risk Stratification</h3>
    
    <p>The platform implements the European LeukemiaNet (ELN) 2022 risk classification system for acute myeloid leukaemia, which stratifies patients into favorable, intermediate, or adverse risk categories based on genetic and cytogenetic profiles.</p>
    
    <div class="callout">
      <h3>How ELN Risk Calculation Works</h3>
      <p>Once the structured data is extracted from the pathology report, the system applies ELN 2022 criteria:</p>
      <ul>
        <li><strong>Genetic risk factors evaluated:</strong>
          <ul>
            <li>Favorable: NPM1 mutation without FLT3-ITD or low allelic ratio; biallelic CEBPA mutations; core-binding factor fusions (RUNX1-RUNX1T1, CBFB-MYH11)</li>
            <li>Adverse: TP53 mutations; complex karyotype (≥3 abnormalities); monosomal karyotype; adverse cytogenetics per ELN guidelines</li>
            <li>Intermediate: All other genetic profiles</li>
          </ul>
        </li>
        <li><strong>Output:</strong> Risk category with detailed rationale, prognostic implications, and treatment considerations</li>
        <li><strong>Clinical utility:</strong> Informs treatment intensity decisions (intensive chemotherapy vs. less intensive approaches), stem cell transplant eligibility, and clinical trial stratification</li>
      </ul>
      <p><strong>Validation:</strong> ELN risk calculator tested on 42 real AML cases with 100% concordance with expert haematologist risk assignments.</p>
    </div>
    
    <h3>Minimal Residual Disease (MRD) Assessment</h3>
    
    <p>The platform evaluates molecular markers to assess minimal residual disease status, which is a powerful predictor of relapse risk and guides post-remission therapy decisions.</p>
    
    <div class="callout">
      <h3>MRD Evaluation Approach</h3>
      <ul>
        <li><strong>Molecular markers tracked:</strong>
          <ul>
            <li>NPM1 mutations (highly stable MRD marker)</li>
            <li>FLT3-ITD (when present at diagnosis)</li>
            <li>Core-binding factor fusions (RUNX1-RUNX1T1, CBFB-MYH11)</li>
            <li>Other recurrent mutations when quantifiable (e.g., IDH1/2, DNMT3A)</li>
          </ul>
        </li>
        <li><strong>MRD status interpretation:</strong>
          <ul>
            <li>Identifies which molecular markers from the diagnostic report can serve as MRD targets</li>
            <li>Flags patients suitable for molecular MRD monitoring during follow-up</li>
            <li>Provides thresholds for MRD positivity per ELN guidelines</li>
          </ul>
        </li>
        <li><strong>Clinical integration:</strong> MRD assessment guides consolidation therapy decisions, stem cell transplant timing, and frequency of monitoring</li>
      </ul>
      <p><strong>Key feature:</strong> The system identifies optimal MRD markers at diagnosis, enabling longitudinal tracking through subsequent reports.</p>
    </div>
    
    <h3>Treatment Recommendations</h3>
    
    <p>Based on the disease classification and risk stratification, the platform suggests evidence-based treatment options aligned with current clinical guidelines.</p>
    
    <div class="callout">
      <h3>Treatment Decision Support</h3>
      <ul>
        <li><strong>Induction therapy options:</strong>
          <ul>
            <li>Standard "7+3" chemotherapy (cytarabine + anthracycline) for fit patients</li>
            <li>CPX-351 (liposomal cytarabine/daunorubicin) for therapy-related AML or AML-MRC</li>
            <li>Hypomethylating agents (azacitidine, decitabine) + venetoclax for older/unfit patients</li>
            <li>Targeted therapies: FLT3 inhibitors (midostaurin, gilteritinib) for FLT3-mutated AML; IDH inhibitors (ivosidenib, enasidenib) for IDH-mutated disease</li>
          </ul>
        </li>
        <li><strong>Consolidation strategies:</strong>
          <ul>
            <li>High-dose cytarabine for favorable-risk AML without transplant</li>
            <li>Allogeneic stem cell transplant recommendations for intermediate and adverse-risk disease</li>
            <li>Maintenance therapy options (e.g., oral azacitidine, FLT3 inhibitors)</li>
          </ul>
        </li>
        <li><strong>Personalization factors:</strong> Recommendations account for age, fitness, comorbidities, and molecular profile</li>
        <li><strong>Output format:</strong> Structured treatment pathways with evidence level (guideline recommendation strength) and relevant references</li>
      </ul>
      <p><strong>Safety note:</strong> Treatment recommendations are advisory only. Prescribing decisions remain with the treating physician based on comprehensive clinical assessment.</p>
    </div>
    
    <h3>Clinical Trial Matching</h3>
    
    <p>The platform screens patients for eligibility in active haematology clinical trials based on their molecular and clinical profile.</p>
    
    <div class="callout">
      <h3>Trial Eligibility Screening</h3>
      <ul>
        <li><strong>Matching criteria evaluated:</strong>
          <ul>
            <li>Disease subtype (e.g., AML with mutated NPM1, MDS with SF3B1 mutation)</li>
            <li>Molecular profile (specific mutations required or excluded)</li>
            <li>Risk category (e.g., adverse-risk AML, higher-risk MDS)</li>
            <li>Prior therapy status (newly diagnosed, relapsed/refractory, treatment-naïve)</li>
            <li>Age and fitness criteria</li>
          </ul>
        </li>
        <li><strong>Trial database:</strong> Integration with UK clinical trials databases (NIHR, CRUK) and major international trials</li>
        <li><strong>Output:</strong>
          <ul>
            <li>List of potentially eligible trials with match rationale</li>
            <li>Key inclusion/exclusion criteria highlighted</li>
            <li>Trial contact information and recruiting sites</li>
            <li>Trial phase and intervention summary</li>
          </ul>
        </li>
        <li><strong>Clinical workflow:</strong> Clinician reviews trial suggestions and contacts trial coordinators to confirm full eligibility and discuss enrollment</li>
      </ul>
      <p><strong>Patient benefit:</strong> Ensures eligible patients are systematically identified for clinical trials, improving access to novel therapies.</p>
    </div>
    
    <h3>Integration of All Components</h3>
    
    <p>All clinical decision support features work synergistically from the same extracted pathology data:</p>
    
    <table>
      <thead>
        <tr>
          <th>Feature</th>
          <th>Input Data Required</th>
          <th>Clinical Output</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Classification</strong></td>
          <td>Blast %, cytogenetics, mutations</td>
          <td>WHO/ICC disease category</td>
        </tr>
        <tr>
          <td><strong>ELN Risk</strong></td>
          <td>Cytogenetics, FLT3, NPM1, TP53, other genes</td>
          <td>Favorable/Intermediate/Adverse risk</td>
        </tr>
        <tr>
          <td><strong>MRD Targets</strong></td>
          <td>Stable molecular markers (NPM1, CBF, etc.)</td>
          <td>Suggested MRD monitoring strategy</td>
        </tr>
        <tr>
          <td><strong>Treatment</strong></td>
          <td>Classification, risk, age, fitness</td>
          <td>Evidence-based therapy options</td>
        </tr>
        <tr>
          <td><strong>Trials</strong></td>
          <td>Classification, mutations, risk, treatment status</td>
          <td>Eligible clinical trials</td>
        </tr>
      </tbody>
    </table>
    
    <p><strong>Key advantage:</strong> Single data extraction step enables multiple downstream clinical decision support functions, maximizing value from each pathology report processed.</p>
  </div>

  <div class="section">
    <h2>5. Why Class 1 Medical Device?</h2>
    
    <h3>Low Risk Profile:</h3>
    
    <div class="success-box">
      <ul>
        <li><strong>Does not make autonomous decisions</strong> - requires doctor approval</li>
        <li><strong>Does not control treatment</strong> - classification only, no therapy recommendations</li>
        <li><strong>Does not replace clinical judgment</strong> - assistive tool only</li>
        <li><strong>Transparent operation</strong> - shows all reasoning steps</li>
        <li><strong>Well-established procedure</strong> - WHO/ICC are international standards</li>
      </ul>
    </div>
    
    <h3>Regulatory Logic:</h3>
    
    <div class="callout">
      <h3>EU MDR Rule 11</h3>
      <p>Software providing information for decisions with diagnosis/therapeutic purposes:</p>
      <ul>
        <li>Class IIa if decisions have serious impact</li>
        <li><strong>Class I if supporting well-established procedures with low risk</strong></li>
      </ul>
    </div>
    
    <p><strong>Our position:</strong> Classification per WHO/ICC guidelines is:</p>
    <ul>
      <li>Well-established (international standard procedures)</li>
      <li>Low risk (doctor verifies everything)</li>
      <li>Informational (doesn't control treatment)</li>
    </ul>
  </div>

  <div class="page-break"></div>

  <div class="section">
    <h2>6. Regulatory Strategy and Device Classification</h2>
    
    <h3>Regulatory Positioning: Clinical Decision Support Tool</h3>
    
    <p>haem.io is positioned as a clinical decision support tool that assists qualified haematologists in applying established clinical guidelines to pathology data.</p>
    
    <div class="callout">
      <h3>Class 1 Device Rationale</h3>
      <ul>
        <li><strong>Non-autonomous operation:</strong> All outputs require clinician review and approval before clinical use</li>
        <li><strong>Advisory function only:</strong> Provides information to support clinical decisions; does not control or directly determine treatment</li>
        <li><strong>Guideline-based methodology:</strong> Applies well-established, internationally recognized classification systems (WHO 2022, ICC 2022, ELN 2022)</li>
        <li><strong>Full transparency:</strong> Shows step-by-step reasoning for all outputs; clinician can verify against source guidelines</li>
        <li><strong>Low consequence of error:</strong> Mandatory clinician oversight catches any errors before clinical use</li>
        <li><strong>Established procedures:</strong> Classification and risk stratification based on published international standards, not novel diagnostic criteria</li>
      </ul>
    </div>
    
    <h3>EU MDR Rule 11 Analysis</h3>
    
    <p>Under EU MDR Rule 11, software providing information for decisions with diagnosis or therapeutic purposes is classified as:</p>
    <ul>
      <li>Class IIa if decisions could have serious impact on health</li>
      <li><strong>Class I if intended to support well-established diagnostic or therapeutic procedures with low risk</strong></li>
    </ul>
    
    <p><strong>haem.io position:</strong> The platform supports well-established procedures (WHO/ICC/ELN guidelines are international standards) with low risk (all outputs are advisory and require expert clinician review).</p>
    
  </div>

  <div class="page-break"></div>

  <div class="section">
    <h2>7. Safety Features</h2>
    
    <h3>Ambiguity Detection:</h3>
    <ul>
      <li>If critical data unclear → flags for manual review</li>
      <li>If data missing → stops and requests input</li>
      <li>Never guesses on ambiguous cases</li>
    </ul>
    
    <h3>Transparency:</h3>
    <ul>
      <li>Every suggestion includes step-by-step reasoning</li>
      <li>Doctor can verify each decision against original report</li>
    </ul>
    
    <h3>Quality Checks:</h3>
    <ul>
      <li>Flags incomplete data</li>
      <li>Identifies cases needing specialist review</li>
      <li>Three-state logic (true/false/unknown) prevents false positives</li>
    </ul>
  </div>

  <div class="section">
    <h2>8. Validation Evidence</h2>
    
    <p><strong>Test Dataset:</strong> 42 real pathology reports from UK NHS hospitals</p>
    
    <h3>Results:</h3>
    <table>
      <thead>
        <tr>
          <th>Component</th>
          <th>Accuracy</th>
          <th>Details</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>AI extraction</td>
          <td><strong>100%</strong></td>
          <td>Genes, blast counts, cytogenetics</td>
        </tr>
        <tr>
          <td>WHO 2022 classification</td>
          <td><strong>100%</strong></td>
          <td>Concordance with expert haematologists</td>
        </tr>
        <tr>
          <td>ICC 2022 classification</td>
          <td><strong>100%</strong></td>
          <td>Concordance with expert haematologists</td>
        </tr>
      </tbody>
    </table>
    
    <h3>Quality Assurance:</h3>
    <ul>
      <li>Automated testing on all code changes</li>
      <li>Version control (Git repository)</li>
      <li>Peer review of clinical logic</li>
    </ul>
  </div>

  <div class="page-break"></div>

  <div class="section">
    <h2>9. Intended Use Statement</h2>
    
    <div class="highlight-box">
      <p><em>"haem.io is a clinical decision support platform intended to assist qualified haematologists and haematopathologists in applying WHO 2022, ICC 2022, and ELN 2022 guidelines to pathology reports for acute myeloid leukaemia (AML) and myelodysplastic syndromes (MDS). The system extracts structured data from pathology reports and provides:</em></p>
      <ul>
        <li><em>Disease classification per WHO/ICC 2022 criteria</em></li>
        <li><em>Risk stratification per ELN 2022 guidelines</em></li>
        <li><em>Minimal residual disease (MRD) marker identification</em></li>
        <li><em>Evidence-based treatment options</em></li>
        <li><em>Clinical trial eligibility screening</em></li>
      </ul>
      <p><em><strong>All outputs are advisory only and must be independently reviewed and confirmed by a qualified clinician before any clinical use. This device does not make autonomous clinical decisions and is not intended to replace clinical judgment.</strong></em></p>
    </div>
    
    <h3>Target Users</h3>
    <ul>
      <li>Consultant haematologists</li>
      <li>Haematopathologists</li>
      <li>Clinical laboratories (haematology)</li>
      <li>Academic medical centers</li>
    </ul>
    
    <h3>Scope and Limitations</h3>
    <ul>
      <li><strong>Scope:</strong> Classification, risk stratification, and clinical decision support for AML and MDS</li>
      <li><strong>Limitations:</strong>
        <ul>
          <li>Requires complete pathology reports with molecular and cytogenetic data</li>
          <li>English language only (UK NHS pathology report format)</li>
          <li>Qualified clinician oversight mandatory for all outputs</li>
          <li>Not suitable for autonomous reporting or diagnosis</li>
          <li>Not intended for use by non-specialist practitioners</li>
        </ul>
      </li>
    </ul>
  </div>

  <div class="section">
    <h2>10. Standards Compliance</h2>
    
    <h3>Software Development:</h3>
    <ul>
      <li>IEC 62304 (Medical Device Software) - Class A (informational)</li>
      <li>ISO 14971 (Risk Management) - low risk with mitigation</li>
      <li>Version controlled development process</li>
      <li>Comprehensive testing and validation</li>
    </ul>
    
    <h3>Data Protection:</h3>
    <ul>
      <li>UK GDPR / GDPR compliant</li>
      <li>No persistent storage of patient data</li>
      <li>Air-gapped deployment option</li>
      <li>NHS Data Security Toolkit compatible</li>
    </ul>
  </div>

  <div class="page-break"></div>

  <div class="section">
    <h2>11. Regulatory Pathway</h2>
    
    <h3>Planned Regulatory Route</h3>
    
    <p><strong>Target Markets:</strong></p>
    <ul>
      <li>United Kingdom (MHRA registration)</li>
      <li>European Union (EU MDR compliance)</li>
    </ul>
    
    <p><strong>Device Classification:</strong> Class 1 medical device</p>
    
    <h3>Technical Documentation Requirements</h3>
    
    <p>As a Class 1 medical device, haem.io will require the following documentation:</p>
    
    <div class="checklist">
      <ul>
        <li>Technical file (device description, specifications, design documentation)</li>
        <li>Risk management file (ISO 14971 compliant risk analysis)</li>
        <li>Clinical evaluation report (literature review, validation data)</li>
        <li>Instructions for use and user manuals</li>
        <li>Software documentation (IEC 62304 development lifecycle)</li>
        <li>Post-market surveillance plan</li>
        <li>Declaration of conformity</li>
      </ul>
    </div>
    
    <p><strong>Regulatory Consultation:</strong> Haem.io Ltd is seeking regulatory affairs support from qualified consultants (including Klaris.ai) to ensure comprehensive compliance with UK and EU requirements.</p>
  </div>

  <div class="section">
    <h2>12. Current Status and Available Documentation</h2>
    
    <h3>Available Now:</h3>
    
    <div class="success-box">
      <ul>
        <li>Complete source code and documentation</li>
        <li>Validation data (42 test cases, 100% accuracy)</li>
        <li>User manuals and deployment guides</li>
        <li>Technical architecture documentation</li>
        <li>Preliminary risk analysis</li>
        <li>Development process records (Git history)</li>
      </ul>
    </div>
    
    <h3>In Development:</h3>
    <ul>
      <li>Clinical evaluation report</li>
      <li>Post-market surveillance plan</li>
    </ul>
  </div>

  <div class="page-break"></div>

  <div class="section">
    <h2>13. Development Timeline</h2>
    
    <p><strong>Current Status:</strong> Product complete and validated</p>
    
    <h3>Projected Timeline:</h3>
    <table>
      <thead>
        <tr>
          <th>Milestone</th>
          <th>Target Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Product development & validation</td>
          <td>Q4 2025</td>
          <td><strong>✓ Complete</strong></td>
        </tr>
        <tr>
          <td>Regulatory consultation & planning</td>
          <td>Q4 2025 - Q1 2026</td>
          <td><strong>In progress</strong></td>
        </tr>
        <tr>
          <td>Technical file preparation</td>
          <td>Q1-Q2 2026</td>
          <td>Planned</td>
        </tr>
        <tr>
          <td>Regulatory submission (UK/EU)</td>
          <td>Q3 2026</td>
          <td>Planned</td>
        </tr>
        <tr>
          <td>Market launch</td>
          <td>Q4 2026</td>
          <td>Planned</td>
        </tr>
      </tbody>
    </table>
  </div>


  <div class="section">
    <h2>14. Executive Summary</h2>
    
    <table>
      <tbody>
        <tr>
          <td><strong>Product:</strong></td>
          <td>Comprehensive AI-powered clinical decision support platform for AML and MDS</td>
        </tr>
        <tr>
          <td><strong>Core Functions:</strong></td>
          <td>Disease classification, ELN risk stratification, MRD assessment, treatment recommendations, clinical trial matching</td>
        </tr>
        <tr>
          <td><strong>Target Classification:</strong></td>
          <td>Class 1 medical device (UK MHRA / EU MDR)</td>
        </tr>
        <tr>
          <td><strong>Regulatory Positioning:</strong></td>
          <td>Clinical decision support tool applying well-established international guidelines (WHO 2022, ICC 2022, ELN 2022)</td>
        </tr>
        <tr>
          <td><strong>Risk Profile:</strong></td>
          <td>Low risk - advisory outputs only, mandatory clinician oversight, transparent reasoning, established procedures</td>
        </tr>
        <tr>
          <td><strong>Validation Status:</strong></td>
          <td>100% concordance on 42 NHS pathology reports (classification, extraction, risk stratification)</td>
        </tr>
        <tr>
          <td><strong>Current Status:</strong></td>
          <td>Product validated and operational; preparing technical documentation for regulatory submission</td>
        </tr>
        <tr>
          <td><strong>Target Launch:</strong></td>
          <td>Q4 2026 (UK/EU markets)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="section">
    <h2>Contact Information</h2>
    
    <p><strong>Robert Edward Lee</strong><br>
    Founder & Technical Lead<br>
    Haem.io Ltd<br>
    Email: robert.lee@haem.io<br>
    Company Number: 16528517</p>
    
    <p>For technical inquiries, partnership opportunities, or regulatory consultation requests, please contact us at the email address above.</p>
  </div>

  <div class="footer">
    <p><strong style="color: #009688;">Haem.io Ltd</strong></p>
    <p>Company Number 16528517</p>
    <p>73 Meliden Road, Prestatyn, LL19 8RH, United Kingdom</p>
    <p style="margin-top: 12px; font-style: italic;">This technical overview is prepared for regulatory consultation purposes. All information is accurate as of November 2025.</p>
  </div>
</body>
</html>
`;

async function generatePDF() {
  let browser = null;
  
  try {
    console.log('Launching browser...');
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    await page.setViewport({
      width: 1200,
      height: 1600,
      deviceScaleFactor: 2,
    });

    console.log('Setting content...');
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    console.log('Generating PDF...');
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20px',
        right: '20px',
        bottom: '20px',
        left: '20px'
      }
    });

    const outputPath = path.join(__dirname, '../public/technical-overview.pdf');
    fs.writeFileSync(outputPath, pdfBuffer);
    
    console.log(`✅ PDF generated successfully: ${outputPath}`);
    console.log(`   File size: ${(pdfBuffer.length / 1024).toFixed(2)} KB`);
    
    await browser.close();
    
  } catch (error) {
    console.error('❌ Error generating PDF:', error);
    if (browser) {
      await browser.close();
    }
    process.exit(1);
  }
}

generatePDF();

