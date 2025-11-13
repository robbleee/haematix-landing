const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Get the HTML content for Global Access Initiative Impact Strategy PDF
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
    
    .timeline-item {
      margin-bottom: 24px;
      padding-left: 20px;
      border-left: 3px solid #009688;
      padding-bottom: 16px;
    }
    
    .timeline-year {
      font-size: 18px;
      font-weight: 700;
      color: #009688;
      margin-bottom: 8px;
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
    
    .metric-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
      margin-bottom: 24px;
    }
    
    .metric-card {
      background: #f0f9f8;
      padding: 16px;
      border: 1px solid #009688;
      border-radius: 0;
    }
    
    .metric-label {
      font-size: 12px;
      color: #009688;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 8px;
      font-weight: 700;
    }
    
    .metric-value {
      font-size: 20px;
      font-weight: 700;
      color: #000000;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Haem.io Global Access Initiative</h1>
    <h2>Impact Strategy</h2>
    <p>Detailed plan for LME country validation studies, impact metrics, and scaling model</p>
  </div>

  <div class="section">
    <h2>Executive Summary</h2>
    <p>
      The Haem.io Global Access Initiative aims to provide world-class AI-powered blood cancer diagnostics 
      to lower and middle-income countries (LMEs), ensuring equitable access to life-saving diagnosis regardless 
      of geography or economic status. Through strategic partnerships with charitable organizations, we're building 
      a sustainable model that scales with our commercial success.
    </p>
    <p>
      This document outlines our comprehensive impact strategy, including validation studies in LME settings, 
      key impact metrics, geographic priorities, and a sustainable scaling model that ensures long-term 
      accessibility for underserved communities.
    </p>
  </div>

  <div class="page-break"></div>

  <div class="section">
    <h2>Mission & Vision</h2>
    <div class="callout">
      <h3>Our Mission</h3>
      <p>
        To democratize access to world-class blood cancer diagnostics in lower and middle-income countries, 
        ensuring that every patient, regardless of geography or economic status, has access to accurate, 
        timely diagnosis that can save lives.
      </p>
    </div>
    
    <div class="callout">
      <h3>Our Vision</h3>
      <p>
        A world where AI-powered diagnostic tools bridge the gap between resource-constrained healthcare 
        systems and cutting-edge medical technology, creating a sustainable model that scales automatically 
        with commercial success while maintaining focus on underserved communities.
      </p>
    </div>
  </div>

  <div class="section">
    <h2>The Problem</h2>
    <p>
      Blood cancer diagnosis in LME countries faces critical challenges that limit patient access to 
      life-saving treatment:
    </p>
    <ul>
      <li><strong>Limited Specialist Expertise:</strong> Many LME countries have few or no trained haematopathologists, 
      creating diagnostic bottlenecks that delay treatment initiation</li>
      <li><strong>Lack of Advanced Diagnostic Tools:</strong> Traditional diagnostic methods require expensive 
      equipment and specialized training that may not be available in resource-constrained settings</li>
      <li><strong>Prohibitive Costs:</strong> Even when diagnostic services exist, costs can be prohibitive 
      for patients and healthcare systems in LME countries</li>
      <li><strong>Geographic Barriers:</strong> Patients in rural or remote areas often cannot access 
      diagnostic centers, leading to delayed or missed diagnoses</li>
      <li><strong>Long Turnaround Times:</strong> Samples may need to be sent to distant laboratories, 
      creating delays that impact patient outcomes</li>
    </ul>
  </div>

  <div class="section">
    <h2>Our Solution</h2>
    <p>
      The Haem.io platform bridges this gap by providing AI-powered diagnostics that work with existing 
      hospital infrastructure, requiring no complex IT integration. Our platform:
    </p>
    <ul>
      <li><strong>Works with Existing Infrastructure:</strong> Uses standard pathology reports and images 
      that hospitals already produce, requiring no new equipment</li>
      <li><strong>Provides Rapid Results:</strong> Delivers diagnostic classifications in minutes rather 
      than days or weeks</li>
      <li><strong>Scales Automatically:</strong> AI-powered analysis means the platform can handle increasing 
      volumes without proportional cost increases</li>
      <li><strong>Maintains High Accuracy:</strong> Validated against WHO and ICC standards, ensuring 
      diagnostic quality matches or exceeds traditional methods</li>
      <li><strong>Supports Local Clinicians:</strong> Provides decision support tools that help local 
      healthcare providers make informed treatment decisions</li>
    </ul>
  </div>

  <div class="page-break"></div>

  <div class="section">
    <h2>Validation Strategy</h2>
    <h3>Phase 1: Initial Validation (Year 1-2)</h3>
    <p>
      We will begin validation studies in regions where our founding partner, Love Hope Strength Foundation, 
      has established relationships, including hospital connections in Dar es Salaam, Tanzania. This existing 
      partnership foundation provides an ideal starting point for demonstrating the platform's impact in a 
      real-world LME setting.
    </p>
    
    <h4>Validation Objectives</h4>
    <ul>
      <li>Demonstrate diagnostic accuracy comparable to specialist haematopathologists in LME settings</li>
      <li>Validate platform usability with local healthcare providers and infrastructure</li>
      <li>Measure impact on diagnostic turnaround times and patient outcomes</li>
      <li>Assess cost-effectiveness compared to traditional diagnostic pathways</li>
      <li>Gather feedback from local clinicians to refine platform features</li>
    </ul>
    
    <h4>Initial Validation Sites</h4>
    <ul>
      <li><strong>Dar es Salaam, Tanzania:</strong> Leveraging Love Hope Strength's established hospital 
      relationships to begin validation studies</li>
      <li><strong>Additional Sites:</strong> We will identify 2-3 additional validation sites in other LME 
      countries during Year 1, focusing on regions with high unmet diagnostic needs</li>
    </ul>
    
    <h3>Phase 2: Expanded Validation (Year 2-3)</h3>
    <p>
      Following successful initial validation, we will expand to additional LME countries, building 
      relationships with hospitals and governments to establish sustainable diagnostic pathways.
    </p>
  </div>

  <div class="section">
    <h2>Impact Metrics</h2>
    <p>
      We will track key impact metrics to measure the success of the Global Access Initiative:
    </p>
    
    <div class="metric-grid">
      <div class="metric-card">
        <div class="metric-label">Diagnostic Accuracy</div>
        <div class="metric-value">>95% Agreement</div>
        <p style="font-size: 12px; margin-top: 8px;">Target: Match or exceed specialist haematopathologist accuracy</p>
      </div>
      <div class="metric-card">
        <div class="metric-label">Turnaround Time</div>
        <div class="metric-value"><24 Hours</div>
        <p style="font-size: 12px; margin-top: 8px;">Target: Reduce from weeks to under 24 hours</p>
      </div>
      <div class="metric-card">
        <div class="metric-label">Patient Access</div>
        <div class="metric-value">10,000+ Patients</div>
        <p style="font-size: 12px; margin-top: 8px;">Target: Serve 10,000+ patients in LME countries by Year 3</p>
      </div>
      <div class="metric-card">
        <div class="metric-label">Geographic Reach</div>
        <div class="metric-value">5+ Countries</div>
        <p style="font-size: 12px; margin-top: 8px;">Target: Active in 5+ LME countries by Year 3</p>
      </div>
    </div>
    
    <h3>Key Performance Indicators</h3>
    <table>
      <thead>
        <tr>
          <th>Metric</th>
          <th>Year 1</th>
          <th>Year 2</th>
          <th>Year 3</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Validation Sites</td>
          <td>1-2 sites</td>
          <td>3-4 sites</td>
          <td>5+ sites</td>
        </tr>
        <tr>
          <td>Patients Served</td>
          <td>500-1,000</td>
          <td>3,000-5,000</td>
          <td>10,000+</td>
        </tr>
        <tr>
          <td>Diagnostic Cases Processed</td>
          <td>1,000-2,000</td>
          <td>6,000-10,000</td>
          <td>20,000+</td>
        </tr>
        <tr>
          <td>Average Turnaround Time</td>
          <td><48 hours</td>
          <td><24 hours</td>
          <td><24 hours</td>
        </tr>
        <tr>
          <td>Diagnostic Accuracy</td>
          <td>>90%</td>
          <td>>93%</td>
          <td>>95%</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="page-break"></div>

  <div class="section">
    <h2>Geographic Priorities</h2>
    <p>
      Our geographic priorities are based on several factors: unmet diagnostic needs, existing partnerships, 
      healthcare infrastructure, and potential for sustainable scaling.
    </p>
    
    <h3>Tier 1: Initial Focus (Year 1-2)</h3>
    <ul>
      <li><strong>Tanzania:</strong> Leveraging Love Hope Strength's established relationships in Dar es 
      Salaam to begin validation studies</li>
      <li><strong>Cambodia:</strong> Dr. Luke Carter-Brzezinski brings direct clinical experience from 
      Cambodia, providing valuable insights for platform adaptation</li>
    </ul>
    
    <h3>Tier 2: Expansion (Year 2-3)</h3>
    <ul>
      <li><strong>Sub-Saharan Africa:</strong> Focus on countries with high blood cancer burden and 
      limited diagnostic capacity</li>
      <li><strong>Southeast Asia:</strong> Building on Cambodia experience to expand regionally</li>
      <li><strong>Latin America:</strong> Selected countries with strong healthcare infrastructure but 
      limited specialist expertise</li>
    </ul>
    
    <h3>Tier 3: Long-term Scaling (Year 3+)</h3>
    <ul>
      <li>Additional LME countries based on demonstrated impact and partnership opportunities</li>
      <li>Focus on regions with highest unmet diagnostic needs</li>
    </ul>
  </div>

  <div class="section">
    <h2>Scaling Model</h2>
    <p>
      The Global Access Initiative is designed to scale sustainably through a combination of funding 
      sources and cross-subsidy from commercial operations:
    </p>
    
    <h3>Sustainable Funding Model</h3>
    <ul>
      <li><strong>Founding Partner Contributions:</strong> Initial funding from Love Hope Strength and 
      other founding partners establishes the initiative's foundation</li>
      <li><strong>Commercial Cross-Subsidy:</strong> 1% of Haem.io commercial revenue is committed to 
      supporting the Global Access Initiative, ensuring automatic scaling with commercial success</li>
      <li><strong>Grant Funding:</strong> Future grants from global health organizations (WHO, Gates 
      Foundation, etc.) will supplement core funding</li>
      <li><strong>Sliding Scale Pricing:</strong> LME hospitals pay based on their capacity, with 
      subsidies covering the difference</li>
    </ul>
    
    <h3>Scaling Timeline</h3>
    <div class="timeline-item">
      <div class="timeline-year">Year 1-2: Foundation</div>
      <ul>
        <li>Validate platform in initial LME settings</li>
        <li>Establish relationships with LME hospitals and governments</li>
        <li>Build evidence base for impact</li>
        <li>Establish governance structure (CIC formation)</li>
      </ul>
    </div>
    
    <div class="timeline-item">
      <div class="timeline-year">Year 3+: Scale</div>
      <ul>
        <li>Scale through cross-subsidy model</li>
        <li>Attract additional global health funders</li>
        <li>Implement sliding scale pricing for LME hospitals</li>
        <li>Expand to additional geographic regions</li>
      </ul>
    </div>
    
    <div class="timeline-item">
      <div class="timeline-year">Long-term: Self-Sustaining</div>
      <ul>
        <li>Self-sustaining model that scales automatically with Haem.io's commercial success</li>
        <li>Established as permanent charitable initiative</li>
        <li>Ongoing impact measurement and optimization</li>
      </ul>
    </div>
  </div>

  <div class="page-break"></div>

  <div class="section">
    <h2>Partnership Structure</h2>
    <p>
      The Global Access Initiative operates as a Community Interest Company (CIC) under the Haem.io 
      umbrella, with Love Hope Strength as the Founding Partner:
    </p>
    
    <h3>Founding Partner Recognition</h3>
    <p>
      Love Hope Strength will be permanently recognized as the Founding Partner of the Haem.io Global 
      Access Initiative, with prominent acknowledgment in all materials, reports, and communications.
    </p>
    
    <h3>Governance & Board Representation</h3>
    <p>
      As Founding Partner, Love Hope Strength will have a full board seat on the Global Access Initiative 
      CIC, ensuring direct governance and strategic input into the initiative's direction and impact.
    </p>
    
    <h3>Legacy Elements</h3>
    <p>
      The initiative will include named elements honoring Love Hope Strength's contribution:
    </p>
    <ul>
      <li><strong>Love Hope Strength Diagnostic Access Fund:</strong> Permanent fund supporting 
      subsidized diagnostics in LMEs</li>
      <li><strong>Love Hope Strength Fellows:</strong> Program for subsidized diagnostics and training 
      in LME settings</li>
    </ul>
  </div>

  <div class="section">
    <h2>Clinical Leadership</h2>
    <p>
      Dr. Luke Carter-Brzezinski, our Co-CMO, brings particular expertise in LME haematology with direct 
      clinical experience working in Cambodia. His hands-on experience in resource-constrained settings, 
      combined with Love Hope Strength's established hospital relationships in Dar es Salaam, creates a 
      powerful foundation for launching the Global Access Initiative in real-world LME contexts.
    </p>
    <p>
      This clinical leadership ensures that the platform is designed and implemented with deep understanding 
      of the challenges and opportunities in LME healthcare settings.
    </p>
  </div>

  <div class="section">
    <h2>Next Steps</h2>
    <p>
      We're excited to discuss how Love Hope Strength can create a lasting legacy through the Haem.io 
      Global Access Initiative. Your founding gift would establish a permanent fund that grows with our 
      commercial success, ensuring ongoing impact for years to come.
    </p>
    <p>
      Key next steps include:
    </p>
    <ol>
      <li>Finalize partnership agreement and CIC structure</li>
      <li>Begin validation studies in Dar es Salaam, Tanzania</li>
      <li>Establish governance board with Love Hope Strength representation</li>
      <li>Develop detailed implementation plan for Year 1 activities</li>
      <li>Identify additional validation sites for Year 1-2 expansion</li>
    </ol>
  </div>

  <div class="footer">
    <p><strong style="color: #009688;">Haem.io Ltd</strong></p>
    <p>Company Number 16528517</p>
    <p>73 Meliden Road, Prestatyn, LL19 8RH, United Kingdom</p>
    <p style="margin-top: 12px;"><strong>Founding Partner:</strong> Love Hope Strength Foundation</p>
    <p style="margin-top: 8px; font-style: italic;">This document outlines our impact strategy for the Global Access Initiative. For partnership inquiries, contact robert.lee@haem.io</p>
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

    const outputPath = path.join(__dirname, '../public/global-access-impact-strategy.pdf');
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

