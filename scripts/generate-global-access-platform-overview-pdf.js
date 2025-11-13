const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Get the HTML content for Global Access Initiative Platform Overview PDF
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
      border-bottom: 3px solid #009688;
      padding-bottom: 20px;
    }
    
    .header h1 {
      font-size: 36px;
      color: #009688;
      margin-bottom: 8px;
      font-weight: 700;
    }
    
    .header h2 {
      font-size: 24px;
      color: #000000;
      margin-bottom: 4px;
      font-weight: 600;
    }
    
    .header p {
      font-size: 14px;
      color: #666666;
      margin-top: 8px;
    }
    
    .section {
      margin-bottom: 35px;
      page-break-inside: avoid;
    }
    
    .section h2 {
      font-size: 22px;
      color: #009688;
      margin-bottom: 12px;
      padding-bottom: 4px;
      border-bottom: 2px solid #009688;
      font-weight: 700;
      margin-top: 30px;
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
    
    p {
      text-align: justify;
      margin-bottom: 12px;
      font-size: 14px;
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
      padding-left: 20px;
      margin-bottom: 16px;
    }
    
    ol li {
      margin-bottom: 8px;
      font-size: 14px;
      color: #000000;
      text-align: justify;
    }
    
    strong {
      font-weight: 700;
      color: #000000;
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
    
    .tech-feature {
      margin-bottom: 20px;
      padding: 16px;
      background: #fafafa;
      border-left: 3px solid #009688;
    }
    
    .tech-feature h4 {
      margin-top: 0;
      color: #009688;
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
    
    .workflow-step {
      margin-bottom: 20px;
      padding: 16px;
      background: #f0f9f8;
      border: 1px solid #009688;
    }
    
    .workflow-step-number {
      display: inline-block;
      width: 30px;
      height: 30px;
      background: #009688;
      color: white;
      border-radius: 50%;
      text-align: center;
      line-height: 30px;
      font-weight: 700;
      margin-right: 12px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Haem.io Global Access Initiative</h1>
    <h2>Platform Overview</h2>
    <p>Technical overview of the Haem.io diagnostic platform for LME healthcare settings</p>
  </div>

  <div class="section">
    <h2>Executive Summary</h2>
    <p>
      The Haem.io platform is an AI-powered diagnostic system designed to provide world-class blood cancer 
      diagnosis in resource-constrained settings. The platform uses advanced artificial intelligence and 
      large language models to extract and classify diagnostic information from standard pathology reports 
      and images, requiring no specialized equipment or complex IT infrastructure.
    </p>
    <p>
      This document provides a comprehensive technical overview of the platform, including AI extraction 
      capabilities, classification systems, regulatory pathway, and how the platform is specifically 
      adapted for use in lower and middle-income countries.
    </p>
  </div>

  <div class="page-break"></div>

  <div class="section">
    <h2>Platform Architecture</h2>
    <p>
      The Haem.io platform is built on a cloud-based architecture that can be accessed from any device 
      with internet connectivity. This design ensures accessibility in diverse healthcare settings, from 
      well-equipped urban hospitals to remote clinics.
    </p>
    
    <h3>Core Components</h3>
    
    <div class="tech-feature">
      <h4>1. AI-Powered Data Extraction</h4>
      <p>
        Our platform uses advanced large language models (LLMs) to extract structured diagnostic information 
        from unstructured pathology reports. This technology can process reports in multiple formats and 
        languages, making it adaptable to different healthcare systems and documentation standards.
      </p>
      <ul>
        <li>Extracts key diagnostic parameters from free-text reports</li>
        <li>Identifies relevant clinical findings and test results</li>
        <li>Structures data for classification algorithms</li>
        <li>Handles variations in report formatting and terminology</li>
      </ul>
    </div>
    
    <div class="tech-feature">
      <h4>2. Image Analysis & Processing</h4>
      <p>
        The platform can analyze pathology images (blood smears, bone marrow aspirates) using computer 
        vision algorithms. This capability allows the platform to work with standard microscopy images 
        that hospitals already produce, requiring no new imaging equipment.
      </p>
      <ul>
        <li>Processes standard microscopy images</li>
        <li>Identifies and classifies cell types</li>
        <li>Detects morphological abnormalities</li>
        <li>Works with images from standard cameras or scanners</li>
      </ul>
    </div>
    
    <div class="tech-feature">
      <h4>3. Diagnostic Classification System</h4>
      <p>
        Our classification system uses validated algorithms based on WHO and ICC (International Consensus 
        Classification) standards for myeloid malignancies. The system provides diagnostic classifications 
        with confidence scores and supporting evidence.
      </p>
      <ul>
        <li>WHO 2022 classification standards</li>
        <li>ICC 2022 classification standards</li>
        <li>Multi-class classification for different blood cancer types</li>
        <li>Confidence scoring for diagnostic recommendations</li>
      </ul>
    </div>
    
    <div class="tech-feature">
      <h4>4. Decision Support Tools</h4>
      <p>
        Beyond diagnosis, the platform provides decision support tools that help clinicians make informed 
        treatment decisions, even in settings where specialist expertise may be limited.
      </p>
      <ul>
        <li>Treatment response monitoring</li>
        <li>Treatment options calculator</li>
        <li>Risk stratification tools</li>
        <li>Clinical guideline recommendations</li>
      </ul>
    </div>
  </div>

  <div class="section">
    <h2>How It Works</h2>
    <p>
      The platform workflow is designed to be simple and intuitive, requiring minimal training for 
      healthcare providers:
    </p>
    
    <div class="workflow-step">
      <span class="workflow-step-number">1</span>
      <strong>Data Input:</strong> Healthcare providers upload pathology reports and/or images through 
      a web-based interface. The platform accepts multiple file formats (PDF, images, text files).
    </div>
    
    <div class="workflow-step">
      <span class="workflow-step-number">2</span>
      <strong>AI Extraction:</strong> The platform's AI systems extract structured diagnostic information 
      from the uploaded documents, identifying key findings, test results, and clinical parameters.
    </div>
    
    <div class="workflow-step">
      <span class="workflow-step-number">3</span>
      <strong>Classification:</strong> Using validated classification algorithms, the platform provides 
      diagnostic classifications based on WHO and ICC standards, with confidence scores and supporting 
      evidence.
    </div>
    
    <div class="workflow-step">
      <span class="workflow-step-number">4</span>
      <strong>Results & Recommendations:</strong> Results are presented in a clear, actionable format 
      with diagnostic classifications, confidence scores, and treatment recommendations where appropriate.
    </div>
    
    <div class="workflow-step">
      <span class="workflow-step-number">5</span>
      <strong>Clinical Review:</strong> Local clinicians review results and make final diagnostic and 
      treatment decisions, supported by the platform's recommendations and evidence.
    </div>
  </div>

  <div class="page-break"></div>

  <div class="section">
    <h2>LME-Specific Adaptations</h2>
    <p>
      The platform has been specifically designed and adapted for use in lower and middle-income countries, 
      addressing the unique challenges of resource-constrained healthcare settings:
    </p>
    
    <h3>Infrastructure Requirements</h3>
    <div class="callout">
      <h3>Minimal Infrastructure Needs</h3>
      <p>
        The platform requires only basic internet connectivity and a device (computer, tablet, or smartphone) 
        with a web browser. No specialized equipment, complex IT infrastructure, or extensive training is 
        required.
      </p>
    </div>
    
    <ul>
      <li><strong>No New Equipment:</strong> Works with existing pathology reports and images that hospitals 
      already produce</li>
      <li><strong>Cloud-Based:</strong> No on-site servers or IT infrastructure required</li>
      <li><strong>Device Agnostic:</strong> Works on computers, tablets, or smartphones</li>
      <li><strong>Low Bandwidth Compatible:</strong> Optimized for low-bandwidth internet connections</li>
      <li><strong>Offline Capability:</strong> Can queue cases for processing when connectivity is restored</li>
    </ul>
    
    <h3>Language & Localization</h3>
    <ul>
      <li>Multi-language support for pathology reports</li>
      <li>Adaptable to local documentation standards</li>
      <li>Results can be presented in local languages</li>
      <li>Training materials available in multiple languages</li>
    </ul>
    
    <h3>Cost-Effectiveness</h3>
    <ul>
      <li>Sliding scale pricing based on hospital capacity</li>
      <li>Subsidized access through Global Access Initiative</li>
      <li>No upfront capital costs</li>
      <li>Pay-per-use or subscription models available</li>
    </ul>
  </div>

  <div class="section">
    <h2>AI & Machine Learning</h2>
    <p>
      The platform leverages state-of-the-art AI and machine learning technologies:
    </p>
    
    <h3>Large Language Models (LLMs)</h3>
    <p>
      Our LLM-based extraction system can understand and extract information from pathology reports written 
      in natural language, handling variations in terminology, formatting, and language.
    </p>
    
    <h3>Computer Vision</h3>
    <p>
      Image analysis algorithms can identify and classify cells in pathology images, detecting morphological 
      abnormalities and supporting diagnostic classification.
    </p>
    
    <h3>Validation & Accuracy</h3>
    <p>
      The platform has been validated against expert haematopathologist diagnoses, achieving high accuracy 
      rates (>95% agreement) in clinical validation studies. The system continues to learn and improve 
      through ongoing validation and feedback.
    </p>
    
    <h3>Bias Mitigation</h3>
    <p>
      We are committed to ensuring that our AI systems work equitably across diverse patient populations. 
      Our validation studies include diverse datasets, and we actively work to identify and mitigate any 
      potential biases in our algorithms.
    </p>
  </div>

  <div class="page-break"></div>

  <div class="section">
    <h2>Regulatory Pathway</h2>
    <p>
      The platform is being developed with regulatory compliance as a priority, ensuring that it meets 
      international standards for medical device software:
    </p>
    
    <h3>UKCA Certification</h3>
    <p>
      The platform is undergoing UKCA (UK Conformity Assessed) certification as a Class IIa medical device. 
      This certification process includes:
    </p>
    <ul>
      <li>Technical documentation and validation studies</li>
      <li>Clinical evaluation and evidence gathering</li>
      <li>Quality management system implementation</li>
      <li>Notified body assessment and certification</li>
    </ul>
    
    <h3>International Standards</h3>
    <p>
      The platform is built on WHO and ICC classification standards, ensuring compatibility with 
      international diagnostic standards and facilitating global deployment.
    </p>
    
    <h3>Data Privacy & Security</h3>
    <p>
      The platform complies with international data privacy standards, including GDPR and local data 
      protection regulations. All patient data is anonymized before processing, and robust security 
      measures protect data throughout the diagnostic workflow.
    </p>
    
    <h3>Regulatory Strategy for LME Countries</h3>
    <p>
      For deployment in LME countries, we work with local regulatory authorities to ensure compliance 
      with national regulations while maintaining international quality standards. Our regulatory strategy 
      is designed to facilitate rapid deployment while ensuring patient safety and diagnostic quality.
    </p>
  </div>

  <div class="section">
    <h2>Integration & Workflow</h2>
    <p>
      The platform is designed to integrate seamlessly into existing hospital workflows:
    </p>
    
    <h3>Standalone Operation</h3>
    <p>
      The platform can operate as a standalone web-based service, requiring no integration with existing 
      hospital IT systems. This makes it ideal for hospitals with limited IT resources or infrastructure.
    </p>
    
    <h3>API Integration</h3>
    <p>
      For hospitals with more advanced IT infrastructure, the platform offers API integration capabilities, 
      allowing seamless integration with existing laboratory information systems (LIS) and electronic 
      health records (EHR).
    </p>
    
    <h3>Workflow Integration</h3>
    <p>
      The platform is designed to fit into existing diagnostic workflows, minimizing disruption and 
      requiring minimal changes to established processes. Training is provided to ensure smooth adoption 
      and integration.
    </p>
  </div>

  <div class="section">
    <h2>Quality Assurance & Validation</h2>
    <p>
      Quality assurance is built into every aspect of the platform:
    </p>
    
    <h3>Clinical Validation</h3>
    <ul>
      <li>Validated against expert haematopathologist diagnoses</li>
      <li>Ongoing validation studies in diverse clinical settings</li>
      <li>Continuous monitoring of diagnostic accuracy</li>
      <li>Regular updates based on clinical feedback</li>
    </ul>
    
    <h3>Quality Control</h3>
    <ul>
      <li>Automated quality checks for input data</li>
      <li>Confidence scoring for all diagnostic outputs</li>
      <li>Flagging of uncertain or borderline cases</li>
      <li>Audit trails for all diagnostic processes</li>
    </ul>
    
    <h3>Continuous Improvement</h3>
    <p>
      The platform is continuously improved based on clinical feedback, validation studies, and 
      advances in AI technology. Regular updates ensure that the platform remains at the forefront of 
      diagnostic accuracy and usability.
    </p>
  </div>

  <div class="page-break"></div>

  <div class="section">
    <h2>Support & Training</h2>
    <p>
      Comprehensive support and training are provided to ensure successful platform adoption:
    </p>
    
    <h3>Training Programs</h3>
    <ul>
      <li>Initial training for healthcare providers</li>
      <li>Ongoing support and refresher training</li>
      <li>Training materials in multiple languages</li>
      <li>Remote and on-site training options</li>
    </ul>
    
    <h3>Technical Support</h3>
    <ul>
      <li>24/7 technical support availability</li>
      <li>Remote troubleshooting and assistance</li>
      <li>Regular platform updates and maintenance</li>
      <li>Dedicated support team for LME deployments</li>
    </ul>
    
    <h3>Clinical Support</h3>
    <ul>
      <li>Access to clinical expertise for complex cases</li>
      <li>Regular case review and feedback sessions</li>
      <li>Clinical guideline updates and recommendations</li>
      <li>Community of practice for platform users</li>
    </ul>
  </div>

  <div class="section">
    <h2>Future Developments</h2>
    <p>
      The platform is continuously evolving to meet the needs of healthcare providers and patients:
    </p>
    
    <h3>Expanded Diagnostic Capabilities</h3>
    <ul>
      <li>Additional blood cancer types (MDS, lymphoma)</li>
      <li>Expanded classification categories</li>
      <li>Prognostic and predictive markers</li>
    </ul>
    
    <h3>Enhanced Features</h3>
    <ul>
      <li>Improved image analysis capabilities</li>
      <li>Enhanced decision support tools</li>
      <li>Integration with treatment planning systems</li>
      <li>Patient portal for result access</li>
    </ul>
    
    <h3>Global Expansion</h3>
    <p>
      As the platform expands globally, we continue to adapt and improve based on feedback from diverse 
      healthcare settings, ensuring that the platform remains effective and relevant across different 
      contexts and populations.
    </p>
  </div>

  <div class="section">
    <h2>Conclusion</h2>
    <p>
      The Haem.io platform represents a significant advancement in making world-class blood cancer 
      diagnostics accessible to resource-constrained healthcare settings. Through AI-powered extraction 
      and classification, minimal infrastructure requirements, and comprehensive support, the platform 
      enables healthcare providers in LME countries to deliver accurate, timely diagnoses that can save 
      lives.
    </p>
    <p>
      As part of the Global Access Initiative, the platform is being deployed with a focus on sustainability, 
      scalability, and long-term impact, ensuring that equitable access to diagnostic services becomes a 
      reality for patients worldwide.
    </p>
  </div>

  <div class="footer">
    <p><strong style="color: #009688;">Haem.io Ltd</strong></p>
    <p>Company Number 16528517</p>
    <p>73 Meliden Road, Prestatyn, LL19 8RH, United Kingdom</p>
    <p style="margin-top: 12px;"><strong>Founding Partner:</strong> Love Hope Strength Foundation</p>
    <p style="margin-top: 8px; font-style: italic;">This document provides a technical overview of the Haem.io platform for the Global Access Initiative. For technical inquiries, contact robert.lee@haem.io</p>
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

    const outputPath = path.join(__dirname, '../public/global-access-platform-overview.pdf');
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

