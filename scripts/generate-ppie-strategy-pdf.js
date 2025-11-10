const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Get the HTML content for PPIE Strategy PDF
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
      margin-bottom: 0;
      font-weight: 700;
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
  </style>
</head>
<body>
  <div class="header">
    <h1>Haem.io</h1>
    <p>Patient and Public Involvement (PPIE) Strategy</p>
  </div>

  <div class="section">
    <h2>Introduction</h2>
    <p>Our technology was initially invented for the use of diagnostic haematologists. However, we have realised that public involvement from an early stage is essential to ensure the technology achieves the primary objective of improving patient experience and outcomes. We are also keen to understand the ethical implications and sensitivities of the project, especially given we are using artificial intelligence (AI) to interrogate patient data (albeit anonymised).</p>
    
    <p>Our initial PPIE work has focused on the two tenants of the project: the use of AI and large language models (LLMs) to extract information from patient diagnostic tests to provide disease classification in myeloid malignancies (and associated information), and the sharing of patient data in Trusted Research Environments (TREs) between centres.</p>
    
    <p>The first step in the PPIE process was to approach disease specific societies: The MDS Foundation and Anthony Nolan for an informal discussion with the PPIE co-ordinators. We then constructed a short digital survey (using Google Documents) to be shared amongst the patient group networks, and facilitated by the PPIE co-ordinators of both charities. Questions were asked regarding attitudes to using data in diagnostics and also the sharing of data via TREs. Information gathered from the initial survey will then form the basis of structured focus groups with patient representatives from The MDS Foundation and Anthony Nolan. We recognise that the survey may highlight areas of concern that the research group may not have expected.</p>
    
    <p>We also recognise that PPIE is needed on an ongoing basis and not simply an isolated request for help. To this end, we propose that we will liaise with patient groups when there are significant updates or progress with either project. We hope this can be again facilitated through Anthony Nolan and The MDS Foundation. This help will be of particular use when we design the "Patient Portal", providing information as to exactly what information patients would like to access.</p>
  </div>

  <div class="page-break"></div>

  <div class="section">
    <h2>Design of Research</h2>
    <p>Data sharing between institutions is of increasing importance. To ensure the robustness of any technology, it must be verified using different data sets from the original "training data set". As an example, the Haem.io platform has been trialled using anonymised data from patients at the Haematology Cancer Diagnostic Partnership. In the interests of robust testing, it should be validated using a data set from another institution, for example from the Royal Marsden. It is therefore of significant importance that we fully understand the feeling and opinions of patients and the public with regards to this sharing of data. There is an understandable concern amongst the general public as to how health data is shared, and these views must be represented as we design our research. We aim to appoint a "patient oversight committee" to help us with the ethical and governance issues as the project progresses. This would be alongside ongoing focus groups from established PPIE charity groups.</p>
    
    <p>We also envisage a significant role for PPIE with regards to review of patient facing material. Once the TRE platform has been selected, we aim to be open and transparent regarding the process and will seek to produce patient information regarding the process. Equally, PPIE involvement in the "patient portal" aspect of the project is paramount. Patient feedback will also be used as evidence that we are prioritising patients in future grant applications. We will invite our patient oversight committee to contribute with lay summaries of the project and progress made.</p>
  </div>

  <div class="section">
    <h2>Delivering Research</h2>
    <p>As part of delivering both projects, we will ask PPIE representative to conduct interviews with patients on our behalf. There are significant advantages from non-specialist investigators liaising with patients and the public, with the aim or reducing research bias. We are also aware that established PPIE groups are usually contain highly motivated patients and public members. There is a need to ask the opinions of patients of all demographics. The PPIE involvement will hopefully help us the share the progress of the project, and give us insight as to how to reach under represented groups.</p>
  </div>

  <div class="page-break"></div>

  <div class="section">
    <h2>Summary Outline of PPIE Plans</h2>
    
    <h3>Stage 1: Pre-application PPIE Survey</h3>
    <ul>
      <li><strong>Haem.io and TRE:</strong> Structured digital survey and follow-up focus groups using MDS Foundation and Anthony Nolan.</li>
      <li>We aim to collate at least 50 responses to the digital survey.</li>
      <li><strong>Royal Marsden and TRE:</strong> [Details to be added]</li>
    </ul>
    
    <h3>Stage 2: PPIE Focus Groups (Initial)</h3>
    <p>Focus Groups with Anthony Nolan and MDS foundation, using the responses from the surveys to pursue common concerns or questions.</p>
    
    <h3>Stage 3: PPIE Interviews</h3>
    <p>Patient interviews will be performed to ensure we gain the opinions of all demographics. We will use local patients treated in Manchester for this.</p>
    
    <h3>Stage 4: Patient Advisory Committee</h3>
    <p>We will invite a small number of patients to represent PPIE opinion on an ongoing basis. This panel will be made of a minimum of 6 people, to cover all disease groups and be a mixture of relatives and patients.</p>
  </div>

  <div class="section">
    <h2>Costs for PPIE</h2>
    <p>The initial survey, facilitated by Anthony Nolan and The MDS Foundation have not incurred a cost. The initial focus groups were also performed without payment. Once funding is available, we will however incur costs for the planned PPIE. These are set out as follows.</p>
    
    <h3>Expenses</h3>
    <ul>
      <li><strong>Rail travel:</strong> This will cover the cost of a standard class return ticket to the location of the meeting. Participants will be asked to book as far in advance as possible.</li>
      <li><strong>Taxis and cars:</strong> Taxis will be reimbursed for people with accessibility needs and for whom public transport is not possible. Petrol will be reimbursed at 45p per mile.</li>
      <li><strong>Overnight Accommodation:</strong> If an event starts before 11AM, or if people have to travel over 2 hours, the cost of accommodation will be provided, to a maximum of £125 per night.</li>
      <li><strong>Carers:</strong> If PPIE representative require assistance of a carer, the carer will be reimbursed at the same value as the PPIE representative.</li>
      <li><strong>Food:</strong> The costs of catering for PPIE members will be covered for the meeting itself. If a PPIE member has to travel over 2 hours to the location of the meeting, £4 will be provided for a snack. If PPIE members require overnight accommodation, they will be reimbursed £25 for a dinner.</li>
    </ul>
    
    <h3>Payment for Involvement in Activities</h3>
    <p>The initial PPIE focus group is being performed without honorarium. However, all PPIE members involved in future meetings will be offered payment for their time.</p>
    
    <p>The rates are as follows:</p>
    <table>
      <thead>
        <tr>
          <th>Activity Duration</th>
          <th>Payment</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Meetings with duration > 4 hours</td>
          <td>£80</td>
        </tr>
        <tr>
          <td>Meetings duration of 2-4 hours</td>
          <td>£50</td>
        </tr>
        <tr>
          <td>Meetings duration 20 mins - 2 hours</td>
          <td>£30</td>
        </tr>
        <tr>
          <td>Virtual activity premium</td>
          <td>£5</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="footer">
    <p><strong style="color: #009688;">Haem.io Ltd</strong></p>
    <p>Company Number 16528517</p>
    <p>73 Meliden Road, Prestatyn, LL19 8RH, United Kingdom</p>
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

    const outputPath = path.join(__dirname, '../public/ppie-strategy.pdf');
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

