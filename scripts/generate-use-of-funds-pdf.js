const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Get the HTML content for Use of Funds PDF
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
    
    .summary-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      margin-bottom: 30px;
    }
    
    .summary-card {
      background: #f0f9f8;
      padding: 20px;
      border-radius: 0;
      border: 2px solid #009688;
      text-align: center;
    }
    
    .summary-label {
      font-size: 12px;
      color: #009688;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 10px;
      font-weight: 700;
    }
    
    .summary-value {
      font-size: 32px;
      font-weight: 700;
      color: #000000;
      margin-bottom: 4px;
    }
    
    .summary-detail {
      font-size: 13px;
      color: #666666;
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
    
    .amount {
      color: #009688;
      font-weight: 700;
      text-align: right;
    }
    
    .category-section {
      margin-bottom: 30px;
      page-break-inside: avoid;
    }
    
    .category-header {
      background: linear-gradient(135deg, #009688 0%, #00796b 100%);
      color: white;
      padding: 16px 20px;
      margin-bottom: 16px;
      border-radius: 4px;
    }
    
    .category-header h3 {
      color: white;
      margin: 0;
      font-size: 18px;
    }
    
    .category-total {
      text-align: right;
      font-size: 20px;
      font-weight: 700;
      color: #009688;
      margin-top: 12px;
      padding-top: 12px;
      border-top: 2px solid #009688;
    }
    
    .item-row {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      border-bottom: 1px solid #e0e0e0;
    }
    
    .item-label {
      color: #000000;
      font-weight: 600;
    }
    
    .item-amount {
      color: #009688;
      font-weight: 700;
    }
    
    .item-details {
      font-size: 12px;
      color: #666666;
      margin-top: 4px;
      font-style: italic;
    }
    
    ul {
      list-style: none;
      padding-left: 0;
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
    
    strong {
      font-weight: 700;
      color: #000000;
    }
    
    p {
      text-align: justify;
      margin-bottom: 12px;
      font-size: 14px;
    }
    
    .milestone-box {
      background: #f0f9f8;
      border: 2px solid #009688;
      padding: 20px;
      margin-top: 24px;
      border-radius: 4px;
    }
    
    .milestone-box h4 {
      color: #009688;
      margin-bottom: 12px;
      margin-top: 0;
    }
    
    .milestone-list {
      list-style: none;
      padding-left: 0;
    }
    
    .milestone-list li {
      padding-left: 24px;
      position: relative;
      margin-bottom: 8px;
    }
    
    .milestone-list li::before {
      content: "✓";
      position: absolute;
      left: 0;
      color: #10b981;
      font-weight: bold;
      font-size: 16px;
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
    
    .timeline-section {
      margin-top: 24px;
    }
    
    .timeline-item {
      display: flex;
      margin-bottom: 16px;
      padding-bottom: 16px;
      border-bottom: 1px solid #e0e0e0;
    }
    
    .timeline-quarter {
      min-width: 80px;
      font-weight: 700;
      color: #009688;
      font-size: 14px;
    }
    
    .timeline-content {
      flex: 1;
      font-size: 13px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Haem.io</h1>
    <p>Use of Funds - Seed Investment</p>
  </div>

  <div class="section">
    <h2>Executive Summary</h2>
    <div class="summary-grid">
      <div class="summary-card">
        <div class="summary-label">Total Investment</div>
        <div class="summary-value">£750,000</div>
        <div class="summary-detail">Seed Round</div>
      </div>
      <div class="summary-card">
        <div class="summary-label">Runway</div>
        <div class="summary-value">18 Months</div>
        <div class="summary-detail">To Series A readiness</div>
      </div>
      <div class="summary-card">
        <div class="summary-label">Key Milestone</div>
        <div class="summary-value">UKCA + Pilots</div>
        <div class="summary-detail">4 NHS validations complete</div>
      </div>
    </div>
    
    <div class="callout">
      <h3>Investment Purpose</h3>
      <p>This £750k seed investment provides an 18-month runway to achieve UKCA certification as a Class IIb medical device, complete 4 NHS pilot study validations, and secure first commercial contracts. These milestones position Haem.io for a successful Series A fundraising round (£2M-£3M) in Q2-Q3 2027, with a target valuation of £8M-£12M pre-money.</p>
    </div>
  </div>

  <div class="page-break"></div>

  <div class="section">
    <h2>Detailed Use of Funds Breakdown</h2>
    
    <div class="category-section">
      <div class="category-header">
        <h3>1. Team & Personnel (48% - £360,000)</h3>
      </div>
      
      <div class="item-row">
        <div>
          <div class="item-label">Founder & Engineer</div>
          <div class="item-details">Full-time founder salary and engineering work (18 months)</div>
        </div>
        <div class="item-amount">£165,000</div>
      </div>
      
      <div class="item-row">
        <div>
          <div class="item-label">Compliance Officer</div>
          <div class="item-details">Regulatory affairs specialist for UKCA certification process (18 months)</div>
        </div>
        <div class="item-amount">£105,000</div>
      </div>
      
      <div class="item-row">
        <div>
          <div class="item-label">Clinical Validation Lead</div>
          <div class="item-details">Manages NHS pilot studies, clinical validation, and data collection (18 months)</div>
        </div>
        <div class="item-amount">£90,000</div>
      </div>
      
      <div class="category-total">Subtotal: £360,000</div>
      
      <p style="margin-top: 16px; font-size: 13px; color: #666666;">
        <strong>Rationale:</strong> Our team structure balances technical development (founder engineer), regulatory expertise (compliance officer), and clinical validation (clinical lead). This ensures we can simultaneously progress UKCA certification while running NHS pilot studies and maintaining platform development.
      </p>
    </div>

    <div class="category-section">
      <div class="category-header">
        <h3>2. Regulatory & Clinical Validation (24% - £180,000)</h3>
      </div>
      
      <div class="item-row">
        <div>
          <div class="item-label">UKCA Certification</div>
          <div class="item-details">Notified body fees, technical file preparation, clinical evaluation, performance studies, audit costs</div>
        </div>
        <div class="item-amount">£100,000</div>
      </div>
      
      <div class="item-row">
        <div>
          <div class="item-label">4 NHS Pilot Studies</div>
          <div class="item-details">Manchester Foundation Trust, The Christie NHS, Royal Devon & Exeter, UK AML Research Network (coordination, data collection, validation reports)</div>
        </div>
        <div class="item-amount">£80,000</div>
      </div>
      
      <div class="category-total">Subtotal: £180,000</div>
      
      <p style="margin-top: 16px; font-size: 13px; color: #666666;">
        <strong>Rationale:</strong> UKCA certification is the critical regulatory milestone that enables commercial sales. The 4 NHS pilot studies provide clinical validation data and establish relationships with key NHS trusts, creating a pipeline for post-certification sales. Both are essential for Series A readiness.
      </p>
    </div>

    <div class="category-section">
      <div class="category-header">
        <h3>3. Infrastructure & Operations (28% - £210,000)</h3>
      </div>
      
      <div class="item-row">
        <div>
          <div class="item-label">Cloud & AI Compute</div>
          <div class="item-details">AWS/Azure infrastructure, LLM API costs, data storage, development environments (18 months)</div>
        </div>
        <div class="item-amount">£15,000</div>
      </div>
      
      <div class="item-row">
        <div>
          <div class="item-label">Legal & Accounting</div>
          <div class="item-details">Corporate legal, contract review, accounting services, tax compliance, SEIS/EIS advance assurance</div>
        </div>
        <div class="item-amount">£25,000</div>
      </div>
      
      <div class="item-row">
        <div>
          <div class="item-label">Insurance & Professional Fees</div>
          <div class="item-details">Professional indemnity insurance, medical device liability insurance, professional advisors</div>
        </div>
        <div class="item-amount">£15,000</div>
      </div>
      
      <div class="item-row">
        <div>
          <div class="item-label">Office & Equipment</div>
          <div class="item-details">Co-working space, laptops, development hardware, office supplies</div>
        </div>
        <div class="item-amount">£20,000</div>
      </div>
      
      <div class="item-row">
        <div>
          <div class="item-label">Marketing & Business Development</div>
          <div class="item-details">Conference attendance, NHS trust presentations, investor materials, website, branding</div>
        </div>
        <div class="item-amount">£15,000</div>
      </div>
      
      <div class="item-row">
        <div>
          <div class="item-label">Contingency Buffer</div>
          <div class="item-details">24% buffer for unexpected costs, regulatory delays, or scope changes</div>
        </div>
        <div class="item-amount">£120,000</div>
      </div>
      
      <div class="category-total">Subtotal: £210,000</div>
      
      <p style="margin-top: 16px; font-size: 13px; color: #666666;">
        <strong>Rationale:</strong> Infrastructure costs are kept lean with cloud-based development. The 24% contingency buffer provides essential flexibility for regulatory timelines (which can vary), unexpected pilot study requirements, or NHS administrative delays. This buffer ensures we can complete all milestones even if timelines extend slightly.
      </p>
    </div>
  </div>

  <div class="page-break"></div>

  <div class="section">
    <h2>18-Month Timeline & Milestones</h2>
    
    <div class="timeline-section">
      <div class="timeline-item">
        <div class="timeline-quarter">Q1 2026</div>
        <div class="timeline-content">
          <strong>Foundation Phase:</strong> Team hiring begins (Compliance Officer, Clinical Validation Lead), regulatory strategy finalization, initial UKCA documentation preparation. Monthly burn: £50k.
        </div>
      </div>
      
      <div class="timeline-item">
        <div class="timeline-quarter">Q2 2026</div>
        <div class="timeline-content">
          <strong>Team Complete:</strong> All team members onboarded (4 founders + 2 hires). UKCA prep & documentation in full swing. NHS pilot study agreements finalized. Monthly burn: £50k.
        </div>
      </div>
      
      <div class="timeline-item">
        <div class="timeline-quarter">Q3 2026</div>
        <div class="timeline-content">
          <strong>Pilot Launch:</strong> NHS pilot studies launch across 4 sites. UKCA certification process formally begins with notified body engagement. Technical documentation complete. Monthly burn: £40k.
        </div>
      </div>
      
      <div class="timeline-item">
        <div class="timeline-quarter">Q4 2026</div>
        <div class="timeline-content">
          <strong>UKCA Submission:</strong> UKCA technical file submitted to notified body. Pilot studies data collection ongoing. Initial clinical validation results emerging. Monthly burn: £40k. Cash remaining: £210k.
        </div>
      </div>
      
      <div class="timeline-item">
        <div class="timeline-quarter">Q1 2027</div>
        <div class="timeline-content">
          <strong>Certification Progress:</strong> UKCA certification in progress (audit phase). Pilot studies wrap-up and data analysis. Clinical validation reports prepared. Monthly burn: £35k. Cash remaining: £105k.
        </div>
      </div>
      
      <div class="timeline-item">
        <div class="timeline-quarter">Q2 2027</div>
        <div class="timeline-content">
          <strong>Milestone Achievement:</strong> <strong>UKCA certification received.</strong> Pilot validation reports published. <strong>Series A fundraising begins (£2M-£3M target).</strong> Cash reaches £0 → Series A closes to fund next phase.
        </div>
      </div>
    </div>
  </div>

  <div class="section">
    <h2>Key Milestones at 18 Months</h2>
    
    <div class="milestone-box">
      <h4>Series A Readiness Criteria</h4>
      <ul class="milestone-list">
        <li><strong>UKCA certification complete</strong> - Enables commercial sales</li>
        <li><strong>4 NHS pilot validations published</strong> - Clinical proof of concept</li>
        <li><strong>First 2-3 contracts signed</strong> - Commercial validation (Q4 2027)</li>
        <li><strong>Team proven</strong> - Regulatory, clinical, and technical capabilities demonstrated</li>
        <li><strong>Clear path to revenue</strong> - Contracts signed, revenue recognition begins Q1 2028</li>
      </ul>
    </div>
    
    <p style="margin-top: 20px;">
      These milestones position Haem.io for a successful Series A fundraising round with significantly de-risked commercial and regulatory pathways. The combination of regulatory approval, clinical validation, and signed contracts demonstrates both product-market fit and execution capability.
    </p>
  </div>

  <div class="section">
    <h2>Burn Rate Analysis</h2>
    
    <table>
      <thead>
        <tr>
          <th>Phase</th>
          <th>Months</th>
          <th>Monthly Burn</th>
          <th>Quarterly Spend</th>
          <th>Cumulative Spend</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Foundation</strong></td>
          <td>Q1-Q2 2026</td>
          <td>£50k</td>
          <td>£150k</td>
          <td>£300k</td>
        </tr>
        <tr>
          <td><strong>Pilot & Certification</strong></td>
          <td>Q3-Q4 2026</td>
          <td>£40k</td>
          <td>£120k</td>
          <td>£540k</td>
        </tr>
        <tr>
          <td><strong>Final Push</strong></td>
          <td>Q1-Q2 2027</td>
          <td>£35k</td>
          <td>£105k</td>
          <td>£645k</td>
        </tr>
        <tr>
          <td><strong>Contingency</strong></td>
          <td>Buffer</td>
          <td>—</td>
          <td>—</td>
          <td>£105k remaining</td>
        </tr>
      </tbody>
    </table>
    
    <p style="margin-top: 16px; font-size: 13px; color: #666666;">
      <strong>Note:</strong> Burn rate decreases over time as one-time costs (UKCA certification, pilot setup) are front-loaded. The variable burn rate reflects this phased approach, with higher costs in early quarters for team onboarding and regulatory setup, then decreasing as processes mature.
    </p>
  </div>

  <div class="section">
    <h2>Risk Mitigation & Contingency</h2>
    
    <h4>Contingency Buffer Usage (24% - £120k)</h4>
    <p>The £120k contingency buffer provides flexibility for:</p>
    <ul>
      <li><strong>Regulatory timeline delays:</strong> UKCA certification can take longer than expected if notified body requires additional evidence or clarification</li>
      <li><strong>Pilot study scope changes:</strong> NHS trusts may request additional validation endpoints or extended study periods</li>
      <li><strong>NHS administrative delays:</strong> Contract negotiations or pilot study approvals may take longer than anticipated</li>
      <li><strong>Unexpected technical requirements:</strong> Additional security audits, data residency requirements, or integration needs</li>
      <li><strong>Team scaling needs:</strong> If we need to accelerate hiring or bring in specialist consultants</li>
    </ul>
    
    <p style="margin-top: 16px;">
      <strong>Contingency Management:</strong> We will track contingency usage monthly and report to investors. Any unused contingency at 18 months will extend runway or accelerate Series A milestones.
    </p>
  </div>

  <div class="section">
    <h2>Post-Seed: Series A Readiness</h2>
    
    <p>Upon completion of the 18-month seed runway, Haem.io will be positioned for Series A fundraising with:</p>
    
    <ul>
      <li><strong>Regulatory approval:</strong> UKCA certification enables immediate commercial sales</li>
      <li><strong>Clinical validation:</strong> 4 NHS pilot studies provide proof of clinical utility and safety</li>
      <li><strong>Commercial traction:</strong> First contracts signed (Q4 2027), revenue recognition beginning Q1 2028</li>
      <li><strong>Proven team:</strong> Demonstrated ability to execute on regulatory, clinical, and commercial milestones</li>
      <li><strong>Clear growth path:</strong> Pipeline of NHS trusts, ancillary revenue streams (diagnostic desk, treatment tools), and international expansion opportunities</li>
    </ul>
    
    <p style="margin-top: 16px;">
      <strong>Series A Target:</strong> £2M-£3M in Q2-Q3 2027, at a valuation of £8M-£12M pre-money. Funds will be used for sales team expansion, international expansion (EU, Middle East), and product development (additional blood cancer types, treatment response tools).
    </p>
  </div>

  <div class="footer">
    <p><strong style="color: #009688;">Haem.io Ltd</strong></p>
    <p>Company Number 16528517</p>
    <p>73 Meliden Road, Prestatyn, LL19 8RH, United Kingdom</p>
    <p style="margin-top: 12px; font-style: italic;">This use of funds breakdown is based on current regulatory timelines, NHS pilot study requirements, and conservative cost estimates. Actual spending may vary based on execution speed and market conditions.</p>
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

    const outputPath = path.join(__dirname, '../public/use-of-funds.pdf');
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

