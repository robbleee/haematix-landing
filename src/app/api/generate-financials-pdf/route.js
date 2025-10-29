import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function GET(request) {
  try {
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // Set viewport for better rendering
    await page.setViewport({
      width: 1200,
      height: 1600,
      deviceScaleFactor: 2,
    });

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
      font-size: 16px;
      color: #000000;
      margin-bottom: 12px;
      margin-top: 20px;
      font-weight: 700;
    }
    
    .summary-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
      margin-bottom: 24px;
    }
    
    .summary-card {
      background: #f0f9f8;
      padding: 16px;
      border-radius: 0;
      border: 1px solid #009688;
      text-align: center;
    }
    
    .summary-label {
      font-size: 11px;
      color: #009688;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 8px;
      font-weight: 700;
    }
    
    .summary-value {
      font-size: 24px;
      font-weight: 700;
      color: #000000;
      margin-bottom: 4px;
    }
    
    .summary-detail {
      font-size: 12px;
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
    
    .negative {
      color: #d32f2f;
      font-weight: 700;
    }
    
    .positive {
      color: #388e3c;
      font-weight: 700;
    }
    
    .year-section {
      margin-bottom: 30px;
      page-break-inside: avoid;
    }
    
    .year-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      padding-bottom: 12px;
      border-bottom: 2px solid #e2e8f0;
    }
    
    .year-badge {
      padding: 6px 12px;
      background: #10b981;
      color: white;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
    }
    
    .quarter-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
      margin-bottom: 16px;
    }
    
    .quarter-card {
      background: #f8fafc;
      border: 2px solid #e2e8f0;
      border-radius: 8px;
      padding: 16px;
      page-break-inside: avoid;
    }
    
    .quarter-card h4 {
      font-size: 16px;
      color: #1e293b;
      margin-bottom: 12px;
      font-weight: 700;
    }
    
    .milestone {
      font-size: 12px;
      color: #475569;
      margin-bottom: 6px;
      line-height: 1.5;
    }
    
    .fin-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 6px;
      font-size: 13px;
    }
    
    .fin-row span:first-child {
      color: #64748b;
      font-weight: 600;
    }
    
    .burn {
      color: #dc2626;
      font-weight: 700;
    }
    
    .revenue {
      color: #10b981;
      font-weight: 700;
    }
    
    .cash-balance {
      color: #10b981;
      font-weight: 700;
    }
    
    p {
      text-align: justify;
      margin-bottom: 12px;
    }
    
    ul {
      list-style: none;
      padding-left: 0;
    }
    
    ul li {
      margin-bottom: 8px;
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
  </div>

  <div class="section">
    <h2>Financial Projections & Cash Flow Analysis</h2>
    <p style="font-style: italic; color: #666666; margin-bottom: 20px;">Detailed 5-year financial roadmap with quarterly cash flow breakdowns</p>
  </div>

  <div class="section">
    <h2>Executive Summary</h2>
    <div class="summary-grid">
      <div class="summary-card">
        <div class="summary-label">Seed Investment</div>
        <div class="summary-value">£750,000</div>
        <div class="summary-detail">18-month runway</div>
      </div>
      <div class="summary-card">
        <div class="summary-label">Avg. Monthly Burn</div>
        <div class="summary-value">£42k</div>
        <div class="summary-detail">Variable by phase</div>
      </div>
      <div class="summary-card">
        <div class="summary-label">First Revenue</div>
        <div class="summary-value">Q1 2028</div>
        <div class="summary-detail">After Q4 2027 contracts</div>
      </div>
      <div class="summary-card">
        <div class="summary-label">Break-even</div>
        <div class="summary-value">Q4 2028</div>
        <div class="summary-detail">Year 3</div>
      </div>
    </div>
    
    <div class="callout">
      <h3>Understanding Our Revenue Timeline</h3>
      <p>We anticipate closing first sales contracts in <strong>Q4 2027</strong> (Year 2). However, following standard SaaS accounting practices, revenue is recognized upon service delivery. With typical NHS procurement and onboarding cycles (3-6 months), revenue recognition begins in <strong>Q1 2028</strong> (Year 3). This is why Year 2 shows contracts signed but £0 revenue — it's an accounting timing difference, not a lack of sales activity.</p>
    </div>
  </div>

  <div class="section year-section">
    <h2>Year 1 (2026): Foundation & Validation</h2>
    
    <h3>Q1 2026</h3>
    <ul>
      <li>Founder salaries begin</li>
      <li>Compliance Officer hiring</li>
      <li>Regulatory strategy finalization</li>
      <li>Monthly Burn: <span class="burn">£50k</span> | Quarterly Spend: <span class="burn">£150k</span> | Cash Balance: <span class="cash-balance">£600k</span></li>
    </ul>
    
    <h3>Q2 2026</h3>
    <ul>
      <li>Clinical Validation Lead onboarded</li>
      <li>Team complete (4 founders + 2 hires)</li>
      <li>UKCA prep & documentation begins</li>
      <li>Monthly Burn: <span class="burn">£50k</span> | Quarterly Spend: <span class="burn">£150k</span> | Cash Balance: <span class="cash-balance">£450k</span></li>
    </ul>
    
    <h3>Q3 2026</h3>
    <ul>
      <li>NHS pilot studies launch</li>
      <li>UKCA certification process starts</li>
      <li>Technical documentation complete</li>
      <li>Monthly Burn: <span class="burn">£40k</span> | Quarterly Spend: <span class="burn">£120k</span> | Cash Balance: <span class="cash-balance">£330k</span></li>
    </ul>
    
    <h3>Q4 2026</h3>
    <ul>
      <li>UKCA submission to notified body</li>
      <li>Pilot studies data collection</li>
      <li>Initial clinical validation results</li>
      <li>Monthly Burn: <span class="burn">£40k</span> | Quarterly Spend: <span class="burn">£120k</span> | Cash Balance: <span class="cash-balance">£210k</span></li>
    </ul>
    
    <p style="margin-top: 16px;"><strong>Year 1 Total:</strong> Revenue: £0 | Spend: <span class="negative">£540k</span> | Net: <span class="negative">-£540k</span> | Remaining Runway: 6 months</p>
  </div>

  <div class="page-break"></div>

  <div class="section year-section">
    <h2>Year 2 (2027): Certification & First Sales</h2>
    
    <h3>Q1 2027</h3>
    <ul>
      <li>UKCA certification in progress</li>
      <li>Pilot studies wrap-up</li>
      <li>Clinical validation reports</li>
      <li>Monthly Burn: <span class="burn">£35k</span> | Quarterly Spend: <span class="burn">£105k</span> | Cash Balance: <span class="cash-balance">£105k</span></li>
    </ul>
    
    <h3>Q2 2027</h3>
    <ul>
      <li><strong>UKCA certification received</strong></li>
      <li><strong>Series A fundraising begins (£2M-£3M)</strong></li>
      <li>Commercial launch preparation</li>
      <li>Monthly Burn: <span class="burn">£35k</span> | Cash Balance reaches £0 → Series A closes</li>
    </ul>
    
    <h3>Q3 2027</h3>
    <ul>
      <li>Sales activities begin</li>
      <li>NHS trust demos & presentations</li>
      <li>Contract negotiations start</li>
      <li>Contracts Signed: 0 | Revenue: £0</li>
    </ul>
    
    <h3>Q4 2027</h3>
    <ul>
      <li><strong>First contracts signed: 2-3 NHS trusts</strong></li>
      <li>Implementation planning begins</li>
      <li>Contract Value: £150k-£200k</li>
      <li>Revenue Recognized: £0 (Revenue starts Q1 2028)</li>
    </ul>
    
    <p style="margin-top: 16px;"><strong>Year 2 Total:</strong> Contracts Signed: £150k-£200k | Revenue Recognized: £0 | Spend: <span class="negative">£300k</span> | Net: <span class="negative">-£300k</span></p>
  </div>

  <div class="section year-section">
    <h2>Year 3 (2028): Revenue & Growth</h2>
    
    <table>
      <thead>
        <tr>
          <th>Quarter</th>
          <th>Key Milestones</th>
          <th>Revenue</th>
          <th>Costs</th>
          <th>Net</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Q1 2028</strong></td>
          <td>First revenue recognized, initial 2-3 trusts go live, 3 new contracts signed</td>
          <td>£0</td>
          <td class="negative">£150k</td>
          <td class="negative">-£150k</td>
        </tr>
        <tr>
          <td><strong>Q2 2028</strong></td>
          <td>10 NHS trusts onboarded, 2 private hospitals signed, revenue ramp accelerates</td>
          <td class="positive">£175k</td>
          <td class="negative">£160k</td>
          <td class="positive">+£15k</td>
        </tr>
        <tr>
          <td><strong>Q3 2028</strong></td>
          <td>Additional trusts onboarding, positive cash flow achieved</td>
          <td class="positive">£250k</td>
          <td class="negative">£170k</td>
          <td class="positive">+£80k</td>
        </tr>
        <tr>
          <td><strong>Q4 2028</strong></td>
          <td>Break-even achieved, 12 NHS + 2 private active, international expansion prep</td>
          <td class="positive">£275k</td>
          <td class="negative">£180k</td>
          <td class="positive">+£95k</td>
        </tr>
      </tbody>
    </table>
    
    <p style="margin-top: 16px;"><strong>Year 3 Total:</strong> Revenue: <span class="positive">£700k</span> | Costs: <span class="negative">£660k</span> | Net Profit: <span class="positive">+£40k</span> | Customers: 10 NHS + 2 private</p>
  </div>

  <div class="page-break"></div>

  <div class="section">
    <h2>Year 4 (2029): Scale & International Expansion</h2>
    
    <h3>Key Milestones</h3>
    <ul>
      <li><strong>Q1:</strong> 15 NHS trusts operational</li>
      <li><strong>Q2:</strong> Middle East expansion begins (UAE, Saudi Arabia)</li>
      <li><strong>Q3:</strong> 3 diagnostic labs signed (high-volume contracts)</li>
      <li><strong>Q4:</strong> Team expansion to 12 employees</li>
    </ul>
    
    <table>
      <tr>
        <td><strong>Annual Revenue:</strong></td>
        <td class="positive">£2.4M</td>
      </tr>
      <tr>
        <td><strong>Operating Costs:</strong></td>
        <td class="negative">£1.2M</td>
      </tr>
      <tr>
        <td><strong>Net Profit:</strong></td>
        <td class="positive">+£1.2M</td>
      </tr>
      <tr>
        <td><strong>Customers:</strong></td>
        <td>15 NHS + 3 Middle East + 3 labs</td>
      </tr>
    </table>
  </div>

  <div class="section">
    <h2>Year 5 (2030): Market Leadership</h2>
    
    <h3>Key Milestones</h3>
    <ul>
      <li><strong>Q1-Q2:</strong> Malaysia & GCC expansion</li>
      <li><strong>Q2:</strong> 20 NHS trusts + national framework agreement</li>
      <li><strong>Q3:</strong> Additional blood cancer types (MDS, lymphoma)</li>
      <li><strong>Q4:</strong> Series B fundraising for pan-cancer expansion</li>
    </ul>
    
    <table>
      <tr>
        <td><strong>Annual Revenue:</strong></td>
        <td class="positive">£5.6M</td>
      </tr>
      <tr>
        <td><strong>Operating Costs:</strong></td>
        <td class="negative">£2.4M</td>
      </tr>
      <tr>
        <td><strong>Net Profit:</strong></td>
        <td class="positive">+£3.2M</td>
      </tr>
      <tr>
        <td><strong>Customers:</strong></td>
        <td>20+ NHS + international</td>
      </tr>
    </table>
  </div>

  <div class="page-break"></div>

  <div class="section">
    <h2>5-Year Financial Summary</h2>
    
    <table>
      <thead>
        <tr>
          <th>Year</th>
          <th>Period</th>
          <th>Customers</th>
          <th>Contracts Signed</th>
          <th>Revenue</th>
          <th>Costs</th>
          <th>Net P/L</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Year 1</strong></td>
          <td>2026</td>
          <td>Pilots & validation</td>
          <td>—</td>
          <td>£0</td>
          <td class="negative">£540k</td>
          <td class="negative">-£540k</td>
        </tr>
        <tr>
          <td><strong>Year 2</strong></td>
          <td>2027</td>
          <td>UKCA approval, first sales</td>
          <td><strong>Q4: 2-3 trusts</strong></td>
          <td>£0</td>
          <td class="negative">£300k</td>
          <td class="negative">-£300k</td>
        </tr>
        <tr>
          <td><strong>Year 3</strong></td>
          <td>2028</td>
          <td>10 NHS + 2 UK private</td>
          <td>10 additional</td>
          <td class="positive">£700k</td>
          <td class="negative">£660k</td>
          <td class="positive">+£40k</td>
        </tr>
        <tr>
          <td><strong>Year 4</strong></td>
          <td>2029</td>
          <td>15 NHS + Middle East + 3 labs</td>
          <td>18 total active</td>
          <td class="positive">£2.4M</td>
          <td class="negative">£1.2M</td>
          <td class="positive">+£1.2M</td>
        </tr>
        <tr>
          <td><strong>Year 5</strong></td>
          <td>2030</td>
          <td>20 NHS + Malaysia + GCC</td>
          <td>25+ total active</td>
          <td class="positive">£5.6M</td>
          <td class="negative">£2.4M</td>
          <td class="positive">+£3.2M</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="section">
    <h2>Key Assumptions & Notes</h2>
    
    <h3>Seed Runway (18 months)</h3>
    <ul>
      <li>£750k total investment</li>
      <li>Variable burn: £50k → £40k → £35k monthly</li>
      <li>Covers team, regulatory, pilots, operations</li>
      <li>Series A required by Q2 2027</li>
    </ul>
    
    <h3>Revenue Recognition</h3>
    <ul>
      <li>Contracts signed Q4 2027</li>
      <li>Revenue recognized upon service delivery (Q1 2028+)</li>
      <li>NHS payment terms: 30-60 days</li>
      <li>Annual subscription model</li>
    </ul>
    
    <h3>Series A Fundraising</h3>
    <ul>
      <li>Target: £2M-£3M in Q2-Q3 2027</li>
      <li>Funds growth, sales team, international expansion</li>
      <li>Post-UKCA, with pilot validations complete</li>
      <li>Valuation: £8M-£12M pre-money</li>
    </ul>
    
    <h3>Pricing Strategy</h3>
    <ul>
      <li>NHS Trusts: £50k-£100k/year</li>
      <li>Private Hospitals: £75k-£150k/year</li>
      <li>Diagnostic Labs: £100k-£200k/year</li>
      <li>Based on case volume & complexity</li>
    </ul>
  </div>

  <div class="footer">
    <p><strong style="color: #009688;">Haem.io Ltd</strong></p>
    <p>Company Number 16528517</p>
    <p>73 Meliden Road, Prestatyn, LL19 8RH, United Kingdom</p>
    <p style="margin-top: 12px; font-style: italic;">These projections are based on current market conditions, regulatory timelines, and conservative customer acquisition estimates. Actual results may vary. Built on WHO & ICC global standards — ready to scale worldwide.</p>
  </div>
</body>
</html>
    `;

    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

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

    await browser.close();

    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Haemio-Financial-Projections.pdf"',
      },
    });

  } catch (error) {
    console.error('Error generating financial projections PDF:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF', details: error.message },
      { status: 500 }
    );
  }
}

