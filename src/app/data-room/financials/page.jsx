'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './financials.module.css';

export default function FinancialsPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    const passwordCorrect = sessionStorage.getItem('dataroom_password_correct');
    const ndaAccepted = sessionStorage.getItem('dataroom_nda_accepted');
    
    if (passwordCorrect === 'true' && ndaAccepted === 'true') {
      setIsAuthenticated(true);
    } else {
      // Redirect back to data room login
      router.push('/data-room');
    }
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loader}></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className={styles.financialsContainer}>
      <button 
        onClick={() => router.push('/data-room')}
        className={styles.backButton}
      >
        ← Back to Data Room
      </button>

      <div className={styles.financialsContent}>
        <div className={styles.header}>
          <h1>Financial Projections & Cash Flow Analysis</h1>
          <p className={styles.subtitle}>Detailed 5-year financial roadmap with quarterly cash flow breakdowns</p>
        </div>

        {/* Executive Summary */}
        <div className={styles.executiveSummary}>
          <h2>Executive Summary</h2>
          <div className={styles.summaryGrid}>
            <div className={styles.summaryCard}>
              <div className={styles.summaryLabel}>Seed Investment</div>
              <div className={styles.summaryValue}>£750,000</div>
              <div className={styles.summaryDetail}>18-month runway</div>
            </div>
            <div className={styles.summaryCard}>
              <div className={styles.summaryLabel}>Avg. Monthly Burn</div>
              <div className={styles.summaryValue}>£42k</div>
              <div className={styles.summaryDetail}>Variable by phase</div>
            </div>
            <div className={styles.summaryCard}>
              <div className={styles.summaryLabel}>First Revenue</div>
              <div className={styles.summaryValue}>Q1 2028</div>
              <div className={styles.summaryDetail}>After contracts in Q4 2027</div>
            </div>
            <div className={styles.summaryCard}>
              <div className={styles.summaryLabel}>Break-even</div>
              <div className={styles.summaryValue}>Q4 2028</div>
              <div className={styles.summaryDetail}>Year 3</div>
            </div>
          </div>
        </div>

        {/* Revenue Recognition Explanation */}
        <div className={styles.calloutBox}>
          <h3>Understanding Our Revenue Timeline</h3>
          <p>
            We anticipate closing first sales contracts in <strong>Q4 2027</strong> (Year 2). However, following standard SaaS accounting practices, revenue is recognized upon service delivery. With typical NHS procurement and onboarding cycles (3-6 months), revenue recognition begins in <strong>Q1 2028</strong> (Year 3). This is why Year 2 shows contracts signed but £0 revenue — it's an accounting timing difference, not a lack of sales activity.
          </p>
        </div>

        {/* Year 1 (2026) */}
        <div className={styles.yearSection}>
          <div className={styles.yearHeader}>
            <h2>Year 1 (2026): Foundation & Validation</h2>
            <div className={styles.yearBadge}>Current Phase</div>
          </div>
          
          <div className={styles.quarterGrid}>
            <div className={styles.quarterCard}>
              <h4>Q1 2026</h4>
              <div className={styles.quarterMilestones}>
                <div className={styles.milestone}>• Team salaries begin</div>
                <div className={styles.milestone}>• Compliance Officer hiring</div>
                <div className={styles.milestone}>• Regulatory strategy finalization</div>
              </div>
              <div className={styles.quarterFinancials}>
                <div className={styles.finRow}>
                  <span>Monthly Burn:</span>
                  <span className={styles.burnAmount}>£50k</span>
                </div>
                <div className={styles.finRow}>
                  <span>Quarterly Spend:</span>
                  <span className={styles.burnAmount}>£150k</span>
                </div>
                <div className={styles.finRow}>
                  <span>Cash Balance:</span>
                  <span className={styles.cashBalance}>£600k</span>
                </div>
              </div>
            </div>

            <div className={styles.quarterCard}>
              <h4>Q2 2026</h4>
              <div className={styles.quarterMilestones}>
                <div className={styles.milestone}>• Clinical Validation Lead onboarded</div>
                <div className={styles.milestone}>• Team complete (4 founders + 2 hires)</div>
                <div className={styles.milestone}>• UKCA prep & documentation begins</div>
              </div>
              <div className={styles.quarterFinancials}>
                <div className={styles.finRow}>
                  <span>Monthly Burn:</span>
                  <span className={styles.burnAmount}>£50k</span>
                </div>
                <div className={styles.finRow}>
                  <span>Quarterly Spend:</span>
                  <span className={styles.burnAmount}>£150k</span>
                </div>
                <div className={styles.finRow}>
                  <span>Cash Balance:</span>
                  <span className={styles.cashBalance}>£450k</span>
                </div>
              </div>
            </div>

            <div className={styles.quarterCard}>
              <h4>Q3 2026</h4>
              <div className={styles.quarterMilestones}>
                <div className={styles.milestone}>• NHS pilot studies launch</div>
                <div className={styles.milestone}>• UKCA certification process starts</div>
                <div className={styles.milestone}>• Technical documentation complete</div>
              </div>
              <div className={styles.quarterFinancials}>
                <div className={styles.finRow}>
                  <span>Monthly Burn:</span>
                  <span className={styles.burnAmount}>£40k</span>
                </div>
                <div className={styles.finRow}>
                  <span>Quarterly Spend:</span>
                  <span className={styles.burnAmount}>£120k</span>
                </div>
                <div className={styles.finRow}>
                  <span>Cash Balance:</span>
                  <span className={styles.cashBalance}>£330k</span>
                </div>
              </div>
            </div>

            <div className={styles.quarterCard}>
              <h4>Q4 2026</h4>
              <div className={styles.quarterMilestones}>
                <div className={styles.milestone}>• UKCA submission to notified body</div>
                <div className={styles.milestone}>• Pilot studies data collection</div>
                <div className={styles.milestone}>• Initial clinical validation results</div>
              </div>
              <div className={styles.quarterFinancials}>
                <div className={styles.finRow}>
                  <span>Monthly Burn:</span>
                  <span className={styles.burnAmount}>£40k</span>
                </div>
                <div className={styles.finRow}>
                  <span>Quarterly Spend:</span>
                  <span className={styles.burnAmount}>£120k</span>
                </div>
                <div className={styles.finRow}>
                  <span>Cash Balance:</span>
                  <span className={styles.cashBalance}>£210k</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.yearSummary}>
            <div className={styles.summaryRow}>
              <span>Total Year 1 Spend:</span>
              <span className={styles.totalSpend}>£540k</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Revenue:</span>
              <span>£0</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Net Position:</span>
              <span className={styles.lossAmount}>-£540k</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Remaining Runway:</span>
              <span className={styles.runwayAmount}>£210k (6 months)</span>
            </div>
          </div>
        </div>

        {/* Year 2 (2027) */}
        <div className={styles.yearSection}>
          <div className={styles.yearHeader}>
            <h2>Year 2 (2027): Certification & First Sales</h2>
            <div className={styles.yearBadge} style={{background: '#0891b2'}}>Next Phase</div>
          </div>
          
          <div className={styles.quarterGrid}>
            <div className={styles.quarterCard}>
              <h4>Q1 2027</h4>
              <div className={styles.quarterMilestones}>
                <div className={styles.milestone}>• UKCA certification in progress</div>
                <div className={styles.milestone}>• Pilot studies wrap-up</div>
                <div className={styles.milestone}>• Clinical validation reports</div>
              </div>
              <div className={styles.quarterFinancials}>
                <div className={styles.finRow}>
                  <span>Monthly Burn:</span>
                  <span className={styles.burnAmount}>£35k</span>
                </div>
                <div className={styles.finRow}>
                  <span>Quarterly Spend:</span>
                  <span className={styles.burnAmount}>£105k</span>
                </div>
                <div className={styles.finRow}>
                  <span>Cash Balance:</span>
                  <span className={styles.cashBalance}>£105k</span>
                </div>
              </div>
            </div>

            <div className={styles.quarterCard}>
              <h4>Q2 2027</h4>
              <div className={styles.quarterMilestones}>
                <div className={styles.milestone}>• <strong>UKCA certification received</strong></div>
                <div className={styles.milestone}>• Series A fundraising begins</div>
                <div className={styles.milestone}>• Commercial launch preparation</div>
              </div>
              <div className={styles.quarterFinancials}>
                <div className={styles.finRow}>
                  <span>Monthly Burn:</span>
                  <span className={styles.burnAmount}>£35k</span>
                </div>
                <div className={styles.finRow}>
                  <span>Quarterly Spend:</span>
                  <span className={styles.burnAmount}>£105k</span>
                </div>
                <div className={styles.finRow}>
                  <span>Cash Balance:</span>
                  <span className={styles.cashBalance}>£0</span>
                </div>
                <div className={styles.seriesANote}>
                  <strong>Series A closes:</strong> £2M-£3M
                </div>
              </div>
            </div>

            <div className={styles.quarterCard}>
              <h4>Q3 2027</h4>
              <div className={styles.quarterMilestones}>
                <div className={styles.milestone}>• Sales activities begin</div>
                <div className={styles.milestone}>• NHS trust demos & presentations</div>
                <div className={styles.milestone}>• Contract negotiations start</div>
              </div>
              <div className={styles.quarterFinancials}>
                <div className={styles.finRow}>
                  <span>Activity:</span>
                  <span>Sales pipeline building</span>
                </div>
                <div className={styles.finRow}>
                  <span>Contracts Signed:</span>
                  <span>0</span>
                </div>
                <div className={styles.finRow}>
                  <span>Revenue:</span>
                  <span>£0</span>
                </div>
              </div>
            </div>

            <div className={styles.quarterCard}>
              <h4>Q4 2027</h4>
              <div className={styles.quarterMilestones}>
                <div className={styles.milestone}>• <strong>First contracts signed</strong></div>
                <div className={styles.milestone}>• 2-3 NHS trusts committed</div>
                <div className={styles.milestone}>• Implementation planning begins</div>
              </div>
              <div className={styles.quarterFinancials}>
                <div className={styles.finRow}>
                  <span>Contracts Signed:</span>
                  <span className={styles.contractsAmount}>2-3 trusts</span>
                </div>
                <div className={styles.finRow}>
                  <span>Contract Value:</span>
                  <span className={styles.contractsAmount}>£150k-£200k</span>
                </div>
                <div className={styles.finRow}>
                  <span>Revenue Recognized:</span>
                  <span>£0</span>
                </div>
                <div className={styles.revenueNote}>
                  Revenue recognized in Q1 2028
                </div>
              </div>
            </div>
          </div>

          <div className={styles.yearSummary}>
            <div className={styles.summaryRow}>
              <span>Total Year 2 Spend:</span>
              <span className={styles.totalSpend}>£300k (from Series A)</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Contracts Signed:</span>
              <span className={styles.contractsAmount}>£150k-£200k</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Revenue Recognized:</span>
              <span>£0</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Net Position:</span>
              <span className={styles.lossAmount}>-£300k</span>
            </div>
          </div>
        </div>

        {/* Year 3 (2028) */}
        <div className={styles.yearSection}>
          <div className={styles.yearHeader}>
            <h2>Year 3 (2028): Revenue & Growth</h2>
            <div className={styles.yearBadge} style={{background: '#10b981'}}>Profitability</div>
          </div>
          
          <div className={styles.quarterGrid}>
            <div className={styles.quarterCard}>
              <h4>Q1 2028</h4>
              <div className={styles.quarterMilestones}>
                <div className={styles.milestone}>• <strong>First revenue recognized</strong></div>
                <div className={styles.milestone}>• Initial 2-3 trusts go live</div>
                <div className={styles.milestone}>• 3 new contracts signed</div>
              </div>
              <div className={styles.quarterFinancials}>
                <div className={styles.finRow}>
                  <span>Revenue:</span>
                  <span className={styles.revenueAmount}>£0</span>
                </div>
                <div className={styles.finRow}>
                  <span>Operating Costs:</span>
                  <span className={styles.burnAmount}>£150k</span>
                </div>
                <div className={styles.finRow}>
                  <span>Net:</span>
                  <span className={styles.lossAmount}>-£150k</span>
                </div>
              </div>
            </div>

            <div className={styles.quarterCard}>
              <h4>Q2 2028</h4>
              <div className={styles.quarterMilestones}>
                <div className={styles.milestone}>• 10 NHS trusts onboarded</div>
                <div className={styles.milestone}>• 2 private hospitals signed</div>
                <div className={styles.milestone}>• Revenue ramp accelerates</div>
              </div>
              <div className={styles.quarterFinancials}>
                <div className={styles.finRow}>
                  <span>Revenue:</span>
                  <span className={styles.revenueAmount}>£175k</span>
                </div>
                <div className={styles.finRow}>
                  <span>Operating Costs:</span>
                  <span className={styles.burnAmount}>£160k</span>
                </div>
                <div className={styles.finRow}>
                  <span>Net:</span>
                  <span className={styles.profitAmount}>+£15k</span>
                </div>
              </div>
            </div>

            <div className={styles.quarterCard}>
              <h4>Q3 2028</h4>
              <div className={styles.quarterMilestones}>
                <div className={styles.milestone}>• Additional trusts onboarding</div>
                <div className={styles.milestone}>• Positive cash flow achieved</div>
                <div className={styles.milestone}>• Expansion planning begins</div>
              </div>
              <div className={styles.quarterFinancials}>
                <div className={styles.finRow}>
                  <span>Revenue:</span>
                  <span className={styles.revenueAmount}>£250k</span>
                </div>
                <div className={styles.finRow}>
                  <span>Operating Costs:</span>
                  <span className={styles.burnAmount}>£170k</span>
                </div>
                <div className={styles.finRow}>
                  <span>Net:</span>
                  <span className={styles.profitAmount}>+£80k</span>
                </div>
              </div>
            </div>

            <div className={styles.quarterCard}>
              <h4>Q4 2028</h4>
              <div className={styles.quarterMilestones}>
                <div className={styles.milestone}>• <strong>Break-even achieved</strong></div>
                <div className={styles.milestone}>• 12 NHS + 2 private active</div>
                <div className={styles.milestone}>• International expansion prep</div>
              </div>
              <div className={styles.quarterFinancials}>
                <div className={styles.finRow}>
                  <span>Revenue:</span>
                  <span className={styles.revenueAmount}>£275k</span>
                </div>
                <div className={styles.finRow}>
                  <span>Operating Costs:</span>
                  <span className={styles.burnAmount}>£180k</span>
                </div>
                <div className={styles.finRow}>
                  <span>Net:</span>
                  <span className={styles.profitAmount}>+£95k</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.yearSummary}>
            <div className={styles.summaryRow}>
              <span>Total Year 3 Revenue:</span>
              <span className={styles.revenueAmount}>£700k</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Total Operating Costs:</span>
              <span className={styles.totalSpend}>£660k</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Net Profit:</span>
              <span className={styles.profitAmount}>+£40k</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Customers:</span>
              <span>10 NHS trusts + 2 private hospitals</span>
            </div>
          </div>
        </div>

        {/* Year 4 (2029) */}
        <div className={styles.yearSection}>
          <div className={styles.yearHeader}>
            <h2>Year 4 (2029): Scale & International Expansion</h2>
          </div>
          
          <div className={styles.annualSummary}>
            <div className={styles.annualMilestones}>
              <h4>Key Milestones</h4>
              <ul>
                <li><strong>Q1:</strong> 15 NHS trusts operational</li>
                <li><strong>Q2:</strong> Middle East expansion begins (UAE, Saudi Arabia)</li>
                <li><strong>Q3:</strong> 3 diagnostic labs signed (high-volume contracts)</li>
                <li><strong>Q4:</strong> Team expansion to 12 employees</li>
              </ul>
            </div>
            
            <div className={styles.annualFinancials}>
              <div className={styles.annualMetric}>
                <div className={styles.metricLabel}>Annual Revenue</div>
                <div className={styles.metricValue}>£2.4M</div>
              </div>
              <div className={styles.annualMetric}>
                <div className={styles.metricLabel}>Operating Costs</div>
                <div className={styles.metricValue}>£1.2M</div>
              </div>
              <div className={styles.annualMetric}>
                <div className={styles.metricLabel}>Net Profit</div>
                <div className={styles.metricValue} style={{color: '#10b981'}}>+£1.2M</div>
              </div>
              <div className={styles.annualMetric}>
                <div className={styles.metricLabel}>Customers</div>
                <div className={styles.metricValue}>15 NHS + 3 ME + 3 labs</div>
              </div>
            </div>
          </div>
        </div>

        {/* Year 5 (2030) */}
        <div className={styles.yearSection}>
          <div className={styles.yearHeader}>
            <h2>Year 5 (2030): Market Leadership</h2>
          </div>
          
          <div className={styles.annualSummary}>
            <div className={styles.annualMilestones}>
              <h4>Key Milestones</h4>
              <ul>
                <li><strong>Q1-Q2:</strong> Malaysia & GCC expansion</li>
                <li><strong>Q2:</strong> 20 NHS trusts + national framework agreement</li>
                <li><strong>Q3:</strong> Additional blood cancer types (MDS, lymphoma)</li>
                <li><strong>Q4:</strong> Series B fundraising for pan-cancer expansion</li>
              </ul>
            </div>
            
            <div className={styles.annualFinancials}>
              <div className={styles.annualMetric}>
                <div className={styles.metricLabel}>Annual Revenue</div>
                <div className={styles.metricValue}>£5.6M</div>
              </div>
              <div className={styles.annualMetric}>
                <div className={styles.metricLabel}>Operating Costs</div>
                <div className={styles.metricValue}>£2.4M</div>
              </div>
              <div className={styles.annualMetric}>
                <div className={styles.metricLabel}>Net Profit</div>
                <div className={styles.metricValue} style={{color: '#10b981'}}>+£3.2M</div>
              </div>
              <div className={styles.annualMetric}>
                <div className={styles.metricLabel}>Customers</div>
                <div className={styles.metricValue}>20+ NHS + international</div>
              </div>
            </div>
          </div>
        </div>

        {/* Cash Flow Assumptions */}
        <div className={styles.assumptionsSection}>
          <h2>Key Assumptions & Notes</h2>
          
          <div className={styles.assumptionsGrid}>
            <div className={styles.assumptionCard}>
              <h4>Seed Runway (18 months)</h4>
              <ul>
                <li>£750k total investment</li>
                <li>Variable burn: £50k → £40k → £35k monthly</li>
                <li>Covers team, regulatory, pilots, operations</li>
                <li>Series A required by Q2 2027</li>
              </ul>
            </div>

            <div className={styles.assumptionCard}>
              <h4>Revenue Recognition</h4>
              <ul>
                <li>Contracts signed Q4 2027</li>
                <li>Revenue recognized upon service delivery (Q1 2028+)</li>
                <li>NHS payment terms: 30-60 days</li>
                <li>Annual subscription model</li>
              </ul>
            </div>

            <div className={styles.assumptionCard}>
              <h4>Series A Fundraising</h4>
              <ul>
                <li>Target: £2M-£3M in Q2-Q3 2027</li>
                <li>Funds growth, sales team, international expansion</li>
                <li>Post-UKCA, with pilot validations complete</li>
                <li>Valuation: £8M-£12M pre-money</li>
              </ul>
            </div>

            <div className={styles.assumptionCard}>
              <h4>Pricing Strategy</h4>
              <ul>
                <li>NHS Trusts: £50k-£100k/year</li>
                <li>Private Hospitals: £75k-£150k/year</li>
                <li>Diagnostic Labs: £100k-£200k/year</li>
                <li>Based on case volume & complexity</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 5-Year Summary Table */}
        <div className={styles.summaryTable}>
          <h2>5-Year Financial Summary</h2>
          <table>
            <thead>
              <tr>
                <th>Year</th>
                <th>Period</th>
                <th>Customers</th>
                <th>Contracts Signed</th>
                <th>Revenue Recognized</th>
                <th>Operating Costs</th>
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
                <td>£540k</td>
                <td className={styles.negativeCell}>-£540k</td>
              </tr>
              <tr>
                <td><strong>Year 2</strong></td>
                <td>2027</td>
                <td>UKCA approval, first sales</td>
                <td><strong>2-3 trusts (£150k-£200k)</strong></td>
                <td>£0</td>
                <td>£300k</td>
                <td className={styles.negativeCell}>-£300k</td>
              </tr>
              <tr>
                <td><strong>Year 3</strong></td>
                <td>2028</td>
                <td>10 NHS + 2 UK private</td>
                <td>10 additional contracts</td>
                <td>£700k</td>
                <td>£660k</td>
                <td className={styles.positiveCell}>+£40k</td>
              </tr>
              <tr>
                <td><strong>Year 4</strong></td>
                <td>2029</td>
                <td>15 NHS + Middle East + 3 labs</td>
                <td>18 total active</td>
                <td>£2.4M</td>
                <td>£1.2M</td>
                <td className={styles.positiveCell}>+£1.2M</td>
              </tr>
              <tr>
                <td><strong>Year 5</strong></td>
                <td>2030</td>
                <td>20 NHS + Malaysia + GCC</td>
                <td>25+ total active</td>
                <td>£5.6M</td>
                <td>£2.4M</td>
                <td className={styles.positiveCell}>+£3.2M</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={styles.footerNote}>
          <p>
            <strong>Note:</strong> These projections are based on current market conditions, regulatory timelines, and conservative customer acquisition estimates. Actual results may vary. Built on WHO & ICC global standards — ready to scale worldwide.
          </p>
        </div>
      </div>
    </div>
  );
}

