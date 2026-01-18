import styles from './plan.module.css';

export default function PlanPage() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* Header Warning */}
        <div className={styles.warningBanner}>
          🔒 INTERNAL ONLY - CONFIDENTIAL STRATEGIC PLAN
        </div>
        
        <div className={styles.mainLayout}>
          {/* Side Navigation */}
          <nav className={styles.sideNav}>
            <div className={styles.navTitle}>Strategic Plan</div>
            <ul className={styles.navList}>
              <li><a href="#executive-summary" className={styles.navLink}>Executive Summary</a></li>
              <li><a href="#funding-timeline" className={styles.navLink}>Funding Timeline</a></li>
              <li><a href="#phase-1" className={styles.navLink}>Phase 1: Foundation</a></li>
              <li className={styles.navSubList}>
                <ul>
                  <li><a href="#funding-strategy" className={styles.navSubLink}>1.0 Funding Strategy</a></li>
                  <li><a href="#regulatory-compliance" className={styles.navSubLink}>1.1 Regulatory</a></li>
                  <li><a href="#clinical-validation" className={styles.navSubLink}>1.2 Clinical Validation</a></li>
                  <li><a href="#technical-readiness" className={styles.navSubLink}>1.3 Technical</a></li>
                </ul>
              </li>
              <li><a href="#phase-2" className={styles.navLink}>Phase 2: LOI Generation</a></li>
              <li className={styles.navSubList}>
                <ul>
                  <li><a href="#loi-strategy" className={styles.navSubLink}>2.0 LOI Strategy</a></li>
                  <li><a href="#seed-round" className={styles.navSubLink}>2.1 Seed Round</a></li>
                  <li><a href="#nhs-engagement" className={styles.navSubLink}>2.2 NHS Engagement</a></li>
                  <li><a href="#endorsements" className={styles.navSubLink}>2.3 Endorsements</a></li>
                </ul>
              </li>
              <li><a href="#immediate-actions" className={styles.navLink}>Immediate Actions</a></li>
              <li><a href="#phase-3" className={styles.navLink}>Phase 3: Pilot</a></li>
              <li><a href="#phase-4" className={styles.navLink}>Phase 4: Scale</a></li>
              <li><a href="#success-factors" className={styles.navLink}>Success Factors</a></li>
              <li><a href="#funding-strategy-full" className={styles.navLink}>Funding Strategy</a></li>
              <li><a href="#success-metrics" className={styles.navLink}>Success Metrics</a></li>
              <li><a href="#risk-mitigation" className={styles.navLink}>Risk Mitigation</a></li>
              <li><a href="#total-funding" className={styles.navLink}>Total Funding</a></li>
              <li><a href="#investor-pitch" className={styles.navLink}>Investor Pitch</a></li>
              <li><a href="#execution-timeline" className={styles.navLink}>Execution Timeline</a></li>
            </ul>
          </nav>
          
          {/* Main Content */}
          <div className={styles.content}>
          <h1 className={styles.mainTitle}>Haem.io Pilot Deployment & Funding Strategy</h1>
          
          <section id="executive-summary" className={styles.section}>
            <h2 className={styles.sectionTitle}>Executive Summary</h2>
            <p className={styles.paragraph}>
              This comprehensive action plan outlines the pathway from current development status to successful pilot deployment of Haem.io within the UK healthcare system, integrated with strategic funding milestones. The plan leverages our haematologist co-founders' influence in the UK haematology community and addresses regulatory, technical, commercial, and funding requirements for NHS integration.
            </p>
            
            <div className={styles.keyPoints}>
              <div className={styles.keyPoint}>
                <strong>Target Timeline:</strong> 12-18 months to first pilot
              </div>
              <div className={styles.keyPoint}>
                <strong>Primary Objective:</strong> Demonstrate clinical utility and safety in real-world NHS haematology departments
              </div>
              <div className={styles.keyPoint}>
                <strong>Funding Strategy:</strong> Strategic funding rounds aligned with pilot milestones to optimize valuation and execution capability
              </div>
            </div>
          </section>

          <section id="funding-timeline" className={styles.section}>
            <h2 className={styles.sectionTitle}>Funding Timeline Overview</h2>
            
            <div className={styles.fundingPhases}>
              <div className={styles.fundingPhase}>
                <h3 className={styles.phaseTitle}>Pre-Seed/Friends & Family (Months 1-3)</h3>
                <ul className={styles.phaseDetails}>
                  <li><strong>Amount:</strong> £150k-300k</li>
                  <li><strong>Timing:</strong> Start immediately</li>
                  <li><strong>Purpose:</strong> Foundation phase execution and alpha testing preparation</li>
                </ul>
              </div>
              
              <div className={styles.fundingPhase}>
                <h3 className={styles.phaseTitle}>LOI Generation Phase (Months 3-6)</h3>
                <ul className={styles.phaseDetails}>
                  <li><strong>Key Milestone:</strong> MDS Working Group demonstration and alpha testing rollout</li>
                  <li><strong>Target:</strong> 3-5 signed LOIs from NHS trusts after alpha testing</li>
                  <li><strong>Leverage:</strong> Co-founders' established credibility and community support</li>
                </ul>
              </div>
              
              <div className={`${styles.fundingPhase} ${styles.primaryFocus}`}>
                <h3 className={styles.phaseTitle}>Seed Round (Months 6-8) - PRIMARY FOCUS</h3>
                <ul className={styles.phaseDetails}>
                  <li><strong>Amount:</strong> £750k-1.5M</li>
                  <li><strong>Timing:</strong> After securing multiple LOIs (much stronger position)</li>
                  <li><strong>Purpose:</strong> Pilot execution and team scaling</li>
                  <li><strong>Valuation Impact:</strong> Significantly higher due to de-risked commercial pathway</li>
                </ul>
              </div>
              
              <div className={styles.fundingPhase}>
                <h3 className={styles.phaseTitle}>Series A (Months 12-15)</h3>
                <ul className={styles.phaseDetails}>
                  <li><strong>Amount:</strong> £3M-7M</li>
                  <li><strong>Timing:</strong> After successful pilot results</li>
                  <li><strong>Purpose:</strong> Commercial scale and expansion</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="phase-1" className={styles.section}>
            <h2 className={styles.sectionTitle}>Phase 1: Foundation & Validation (Months 1-4)</h2>
            
            <div id="funding-strategy" className={styles.subsection}>
              <h3 className={styles.subsectionTitle}>1.0 Funding Strategy - Pre-Seed Round</h3>
              
              <div className={styles.fundingDetails}>
                <div className={styles.fundingAmount}>
                  <strong>Target Amount:</strong> £150k-300k<br/>
                  <strong>Optimal Timing:</strong> Start NOW (Month 1-3)
                </div>
                
                <p className={styles.strategicFocus}>
                  <strong>Strategic Focus:</strong> Enable alpha testing and LOI generation through MDS Working Group demonstration
                </p>
              </div>
              
              <h4 className={styles.subheading}>Use of Funds (£150k-300k with 9-12 month runway):</h4>
              <ul className={styles.fundingBreakdown}>
                <li>ICO registration and initial compliance costs (£10k)</li>
                <li>Professional indemnity insurance and legal setup (£15k)</li>
                <li>Alpha testing platform development and hosting (£40k)</li>
                <li className={styles.highlight}>"Pilot-in-a-Box" development and NHS legal pre-vetting (£20k)</li>
                <li>MDS Working Group demonstration preparation (£15k)</li>
                <li>Enhanced security infrastructure for NHS alpha testing (£30k)</li>
                <li className={styles.highlight}>Clinical Affairs support for on-site data assistance (£40k-60k)</li>
                <li>Legal support for LOI drafting and negotiations (£15k)</li>
                <li className={styles.highlight}>Contingency buffer for NHS administrative delays (£20k-40k)</li>
                <li>Working capital and operational expenses (£25k-85k)</li>
              </ul>

              <div className={styles.keyPoints}>
                <div className={styles.keyPoint}>
                  <strong>Extended Runway Strategy:</strong> Pre-seed funding provides 9-12 months runway (vs typical 6 months) specifically to navigate NHS administrative timelines and provide significant buffer for LOI generation process.
                </div>
              </div>

              <h4 className={styles.subheading}>Investor Profile:</h4>
              <ul className={styles.fundingBreakdown}>
                <li>Friends and family networks</li>
                <li>Angel investors from co-founders' professional circles</li>
                <li>Healthcare professionals who understand the market need</li>
                <li>Early-stage investors excited by upcoming LOI opportunity</li>
              </ul>

              <h4 className={styles.subheading}>Key Funding Milestones to Achieve:</h4>
              <ul className={styles.fundingBreakdown}>
                <li>ICO registration complete</li>
                <li>Alpha testing platform ready for MDS Working Group demonstration</li>
                <li>Legal framework prepared for LOI negotiations</li>
                <li>Clinical Affairs support secured for NHS engagement</li>
              </ul>
            </div>

            <div id="regulatory-compliance" className={styles.subsection}>
              <h3 className={styles.subsectionTitle}>1.1 Regulatory Compliance & Legal Framework</h3>
              
              <h4 className={styles.subheading}>ICO Registration & GDPR Compliance</h4>
              <ul className={styles.fundingBreakdown}>
                <li>Complete ICO data protection fee registration (£52 annual fee for Tier 1)</li>
                <li>Conduct formal GDPR compliance audit using our existing documentation</li>
                <li>Engage healthcare data protection specialist for final review</li>
                <li>Obtain professional indemnity insurance for healthcare software</li>
                <li>Review Medical Device Regulation (MDR) requirements with MHRA</li>
              </ul>

              <h4 className={styles.subheading}>Legal Structure</h4>
              <ul className={styles.fundingBreakdown}>
                <li>Establish appropriate corporate structure for NHS contracting</li>
                <li>Draft terms of service and privacy policies for healthcare use</li>
                <li>Create data processing agreements templates for NHS trusts</li>
                <li>Establish intellectual property protection strategy</li>
              </ul>
            </div>

            <div id="clinical-validation" className={styles.subsection}>
              <h3 className={styles.subsectionTitle}>1.2 Clinical Validation & Evidence Generation</h3>
              
              <h4 className={styles.subheading}>Retrospective Validation Study</h4>
              <ul className={styles.fundingBreakdown}>
                <li>Design retrospective validation study protocol</li>
                <li className={styles.highlight}>Submit HRA/REC ethics application (approval expected in Phase 2)</li>
                <li>Leverage co-founder connections to identify 2-3 collaborative NHS trusts</li>
                <li>Target trusts: Large teaching hospitals with active haematology research</li>
                <li className={styles.highlight}>Initial validation cohort: 50-100 cases (lighter lift for trusts)</li>
                <li className={styles.highlight}>Deploy Clinical Affairs team to assist with on-site data anonymization</li>
                <li className={styles.highlight}>Stretch goal: 500-1000 cases for comprehensive validation</li>
              </ul>

              <div className={styles.keyPoints}>
                <div className={styles.keyPoint}>
                  <strong>Resource Burden Mitigation Strategy:</strong>
                  <ul style={{marginTop: '0.5rem', paddingLeft: '1rem'}}>
                    <li>Clinical Affairs team works on-site with hospital data managers</li>
                    <li>We provide the manpower for anonymization under trust supervision</li>
                    <li>Standardized data extraction protocols minimize trust administrative burden</li>
                    <li>Flexible cohort sizes based on trust capacity and availability</li>
                  </ul>
                </div>
              </div>

              <h4 className={styles.subheading}>Key Performance Metrics</h4>
              <ul className={styles.fundingBreakdown}>
                <li>Accuracy vs. consultant haematologist diagnosis</li>
                <li>Time reduction in report processing</li>
                <li>Consistency across different reporting formats</li>
                <li>Error detection capabilities</li>
              </ul>
            </div>

            <div id="technical-readiness" className={styles.subsection}>
              <h3 className={styles.subsectionTitle}>1.3 Technical Readiness</h3>
              
              <h4 className={styles.subheading}>Production-Grade Infrastructure</h4>
              <ul className={styles.fundingBreakdown}>
                <li>Migrate to dedicated healthcare-compliant hosting (NHS-approved vendors)</li>
                <li>Implement comprehensive audit logging for all system actions</li>
                <li>Enhance security monitoring and intrusion detection</li>
                <li>Conduct third-party security penetration testing</li>
                <li>Obtain ISO 27001 or equivalent security certification</li>
              </ul>

              <h4 className={styles.subheading}>Integration Capabilities</h4>
              <ul className={styles.fundingBreakdown}>
                <li>Develop HL7 FHIR integration capabilities for NHS systems</li>
                <li>Create API documentation for EPR system integration</li>
                <li>Build data export capabilities for existing NHS workflows</li>
                <li>Implement single sign-on (SSO) for NHS authentication systems</li>
              </ul>
            </div>
          </section>

          <section id="phase-2" className={styles.section}>
            <h2 className={styles.sectionTitle}>Phase 2: LOI Generation & Strategic Partnerships (Months 3-8)</h2>
            
            <div id="loi-strategy" className={styles.subsection}>
              <h3 className={styles.subsectionTitle}>2.0 LOI Generation Strategy (Months 3-6)</h3>
              
              <div className={styles.keyPoints}>
                <div className={styles.keyPoint}>
                  <strong>Key Opportunity:</strong> MDS Working Group Demonstration<br/>
                  <strong>Target Outcome:</strong> 3-5 signed LOIs from NHS trusts
                </div>
              </div>

              <h4 className={styles.subheading}>Strategic Advantages:</h4>
              <ul className={styles.fundingBreakdown}>
                <li>Co-founders' established credibility in haematology community</li>
                <li>Demonstrated strong support from haematology professionals</li>
                <li>MDS Working Group provides high-visibility platform</li>
                <li>Alpha testing allows hands-on evaluation by potential pilot sites</li>
              </ul>

              <h4 className={styles.subheading}>Alpha Testing & LOI Generation Process:</h4>
              <ul className={styles.fundingBreakdown}>
                <li>Prepare production-ready alpha testing environment</li>
                <li className={styles.highlight}>Develop "Pilot-in-a-Box" standardized packet for NHS trusts</li>
                <li>MDS Working Group demonstration (scheduled in few months)</li>
                <li className={styles.highlight}>Parallel direct outreach to 10-15 NHS trusts (not just MDS group attendees)</li>
                <li>Roll out alpha testing to interested NHS trusts</li>
                <li className={styles.highlight}>Deploy Clinical Affairs support to assist trusts with data preparation</li>
                <li>Collect feedback and demonstrate clinical utility</li>
                <li>Convert alpha testing sites to signed LOIs</li>
                <li className={styles.highlight}>Target 3-5 LOIs from pipeline of 10-15 engaged trusts</li>
              </ul>

              <h4 className={styles.subheading}>"Pilot-in-a-Box" Components:</h4>
              <ul className={styles.fundingBreakdown}>
                <li>Draft LOI template (pre-vetted by NHS legal advisors)</li>
                <li>Draft Data Processing Agreement (GDPR compliant)</li>
                <li>GDPR compliance statement and audit results</li>
                <li>Ethics protocol summary (HRA/REC submission ready)</li>
                <li>Technical integration specification</li>
                <li>Resource requirement analysis (minimal trust burden)</li>
                <li>Risk assessment and mitigation plan</li>
              </ul>
            </div>

            <div id="seed-round" className={styles.subsection}>
              <h3 className={styles.subsectionTitle}>2.1 Funding Strategy - Seed Round (REVISED)</h3>
              
              <div className={styles.fundingDetails}>
                <div className={styles.fundingAmount}>
                  <strong>Target Amount:</strong> £750k-1.5M (INCREASED)<br/>
                  <strong>Optimal Timing:</strong> Months 6-8 (AFTER securing multiple LOIs)
                </div>
              </div>

              <div className={styles.keyPoints}>
                <div className={styles.keyPoint}>
                  <strong>Strategic Rationale - MUCH STRONGER POSITION:</strong>
                  <ul style={{marginTop: '0.5rem', paddingLeft: '1rem'}}>
                    <li>Multiple signed LOIs demonstrate validated commercial demand</li>
                    <li>De-risked pathway to revenue significantly increases valuation</li>
                    <li>Proven clinical adoption reduces investor concerns</li>
                    <li>Strong negotiating position with multiple pilot sites committed</li>
                  </ul>
                </div>
              </div>

              <h4 className={styles.subheading}>Use of Funds Breakdown (£750k-1.5M):</h4>
              
              <div className={styles.fundingPhase}>
                <h5><strong>Team Expansion (45% - £340k-675k)</strong></h5>
                <ul className={styles.phaseDetails}>
                  <li>Clinical Affairs Manager (£70k-90k annually)</li>
                  <li>NHS Integration Engineer (£60k-80k annually)</li>
                  <li>Clinical Success Manager (£50k-70k annually)</li>
                  <li>Regulatory Affairs Specialist (full-time, £50k-60k)</li>
                  <li>Additional development resources for pilot support</li>
                </ul>
              </div>

              <div className={styles.fundingPhase}>
                <h5><strong>Pilot Execution & Clinical Evidence (30% - £225k-450k)</strong></h5>
                <ul className={styles.phaseDetails}>
                  <li>Multi-site pilot deployment and technical support</li>
                  <li>Clinical data collection and analysis</li>
                  <li>Real-world evidence generation</li>
                  <li>Publication and conference presentation costs</li>
                  <li>Regulatory compliance for pilot sites</li>
                </ul>
              </div>

              <div className={styles.fundingPhase}>
                <h5><strong>Technical Infrastructure & Integration (15% - £110k-225k)</strong></h5>
                <ul className={styles.phaseDetails}>
                  <li>Production-grade multi-site hosting</li>
                  <li>NHS EPR system integrations (site-specific)</li>
                  <li>Enhanced security and monitoring</li>
                  <li>24/7 technical support infrastructure</li>
                </ul>
              </div>

              <div className={styles.fundingPhase}>
                <h5><strong>Business Development & Scale Preparation (7% - £50k-105k)</strong></h5>
                <ul className={styles.phaseDetails}>
                  <li>Additional NHS trust engagement beyond pilot sites</li>
                  <li>Professional conference presence and thought leadership</li>
                  <li>Partnership development with NHS suppliers</li>
                  <li>Commercial team preparation</li>
                </ul>
              </div>

              <div className={styles.fundingPhase}>
                <h5><strong>Working Capital & Operations (3% - £25k-45k)</strong></h5>
                <ul className={styles.phaseDetails}>
                  <li>General operational expenses and contingency</li>
                </ul>
              </div>

              <h4 className={styles.subheading}>Target Investors (STRONGER POSITION):</h4>
              <ul className={styles.fundingBreakdown}>
                <li>Tier 1 Healthcare VCs (now accessible with LOIs)</li>
                <li>Strategic investors (NHS suppliers, healthcare IT companies)</li>
                <li>Growth-focused VCs interested in proven NHS traction</li>
                <li>International healthcare investors</li>
                <li>Government grants and innovation funding</li>
              </ul>

              <div className={styles.keyPoints}>
                <div className={styles.keyPoint}>
                  <strong>Target Valuation:</strong> £4M-8M pre-money (SIGNIFICANTLY HIGHER)
                </div>
              </div>

              <h4 className={styles.subheading}>Valuation Justification - Market Access De-risking:</h4>
              <ul className={styles.fundingBreakdown}>
                <li>Typical HealthTech seed investment used to find path into NHS - we have already found it</li>
                <li>Investment is for execution on validated, pre-sold demand, not exploration</li>
                <li>LOIs represent gateway to data needed for regulatory approval and commercial case studies</li>
                <li>Solved the single biggest hurdle for HealthTech startups: market access and clinical buy-in</li>
                <li>Quantified value: Each LOI represents potential £200k-500k annual contract value</li>
              </ul>

              <h4 className={styles.subheading}>Required Milestones Before Seed Round (ACHIEVED THROUGH LOI PROCESS):</h4>
              <ul className={styles.fundingBreakdown}>
                <li>3-5 signed LOIs from NHS trusts (from pipeline of 10-15 engaged)</li>
                <li>MDS Working Group demonstration completed successfully</li>
                <li className={styles.highlight}>Parallel direct outreach program demonstrating broader market demand</li>
                <li>Alpha testing results demonstrate clinical utility</li>
                <li className={styles.highlight}>HRA/REC ethics approval obtained or imminent</li>
                <li>Professional team partially assembled</li>
                <li>Clear pilot execution plan with committed sites</li>
              </ul>
            </div>

            <div id="nhs-engagement" className={styles.subsection}>
              <h3 className={styles.subsectionTitle}>2.2 NHS Engagement Strategy</h3>
              
              <h4 className={styles.subheading}>Key Stakeholder Mapping</h4>
              <ul className={styles.fundingBreakdown}>
                <li>Identify NHS Digital transformation leads in target trusts</li>
                <li>Connect with NHS Innovation Accelerator (NIA) program</li>
                <li>Engage with Academic Health Science Networks (AHSNs)</li>
                <li>Establish relationships with NHS procurement teams</li>
              </ul>

              <h4 className={styles.subheading}>Pilot Site Selection</h4>
              <ul className={styles.fundingBreakdown}>
                <li>Leverage co-founder networks to identify 3-5 potential pilot sites</li>
              </ul>
              
              <div className={styles.keyPoints}>
                <div className={styles.keyPoint}>
                  <strong>Target criteria:</strong>
                  <ul style={{marginTop: '0.5rem', paddingLeft: '1rem'}}>
                    <li>High volume haematology departments (&gt;1000 cases/year)</li>
                    <li>Active in research and innovation</li>
                    <li>Existing IT infrastructure for integration</li>
                    <li>Senior haematologist champion on-site</li>
                    <li>Management support for innovation trials</li>
                  </ul>
                </div>
              </div>

              <h4 className={styles.subheading}>Value Proposition Development</h4>
              <ul className={styles.fundingBreakdown}>
                <li>Quantify potential time savings for consultant haematologists</li>
                <li>Calculate potential cost savings for NHS trusts</li>
                <li>Develop business case template for NHS procurement</li>
                <li>Create clinical outcome improvement projections</li>
              </ul>
            </div>

            <div id="endorsements" className={styles.subsection}>
              <h3 className={styles.subsectionTitle}>2.3 Professional Endorsements & Clinical Advisory Board</h3>
              
              <h4 className={styles.subheading}>Clinical Advisory Board Formation</h4>
              <ul className={styles.fundingBreakdown}>
                <li>Recruit 5-7 senior UK haematologists from different regions</li>
              </ul>
              
              <div className={styles.keyPoints}>
                <div className={styles.keyPoint}>
                  <strong>Include representation from:</strong>
                  <ul style={{marginTop: '0.5rem', paddingLeft: '1rem'}}>
                    <li>Royal College of Pathologists</li>
                    <li>British Society for Haematology</li>
                    <li>NHS consultant haematologists</li>
                    <li>Academic haematology leaders</li>
                    <li>Patient representative</li>
                  </ul>
                </div>
              </div>

              <h4 className={styles.subheading}>Professional Society Engagement</h4>
              <ul className={styles.fundingBreakdown}>
                <li>Present at British Society for Haematology annual conference</li>
                <li>Submit abstracts to relevant haematology conferences</li>
                <li>Engage with Royal College of Pathologists digital pathology initiatives</li>
                <li>Connect with NHS England AI and digital transformation teams</li>
              </ul>
            </div>

            <div className={styles.subsection}>
              <h3 className={styles.subsectionTitle}>2.4 Funding & Investment Strategy</h3>
              
              <h4 className={styles.subheading}>Grant Applications</h4>
              <ul className={styles.fundingBreakdown}>
                <li>Apply for Innovate UK healthcare innovation grants</li>
                <li>Explore NHS Innovation Accelerator funding</li>
                <li>Consider Wellcome Trust healthcare innovation funding</li>
                <li>Apply for regional development agency grants</li>
              </ul>

              <h4 className={styles.subheading}>Investment Readiness</h4>
              <ul className={styles.fundingBreakdown}>
                <li>Prepare investor deck highlighting NHS market opportunity</li>
                <li>Develop financial projections for NHS market penetration</li>
                <li>Identify healthcare-focused VC firms and angel investors</li>
                <li>Prepare due diligence materials including regulatory compliance</li>
              </ul>
            </div>
          </section>

          <section id="immediate-actions" className={styles.section}>
            <h2 className={styles.sectionTitle}>Key Immediate Actions (Month 1)</h2>
            <div className={styles.actionsList}>
              <div className={styles.action}>
                <span className={styles.actionNumber}>1</span>
                <div className={styles.actionContent}>
                  <strong>Start pre-seed fundraising conversations within 30 days</strong> - target £150k-300k with 9-12 month runway
                </div>
              </div>
              <div className={styles.action}>
                <span className={styles.actionNumber}>2</span>
                <div className={styles.actionContent}>
                  <strong>Develop "Pilot-in-a-Box" standardized packet</strong> with NHS legal pre-vetting
                </div>
              </div>
              <div className={styles.action}>
                <span className={styles.actionNumber}>3</span>
                <div className={styles.actionContent}>
                  <strong>Submit HRA/REC ethics application</strong> (approval timeline: 3-6 months)
                </div>
              </div>
              <div className={styles.action}>
                <span className={styles.actionNumber}>4</span>
                <div className={styles.actionContent}>
                  <strong>Prepare alpha testing environment</strong> for MDS Working Group demonstration
                </div>
              </div>
              <div className={styles.action}>
                <span className={styles.actionNumber}>5</span>
                <div className={styles.actionContent}>
                  Complete ICO registration within 30 days
                </div>
              </div>
              <div className={styles.action}>
                <span className={styles.actionNumber}>6</span>
                <div className={styles.actionContent}>
                  <strong>Begin parallel outreach to 10-15 NHS trusts</strong> (not just MDS attendees)
                </div>
              </div>
              <div className={styles.action}>
                <span className={styles.actionNumber}>7</span>
                <div className={styles.actionContent}>
                  <strong>Coordinate with co-founders</strong> on MDS Working Group demonstration strategy
                </div>
              </div>
              <div className={styles.action}>
                <span className={styles.actionNumber}>8</span>
                <div className={styles.actionContent}>
                  <strong>Recruit Clinical Affairs team</strong> for on-site data assistance capability
                </div>
              </div>
              <div className={styles.action}>
                <span className={styles.actionNumber}>9</span>
                <div className={styles.actionContent}>
                  <strong>Begin relationship building with Tier 1 VCs</strong> for post-LOI seed round
                </div>
              </div>
            </div>
          </section>

          <section id="phase-3" className={styles.section}>
            <h2 className={styles.sectionTitle}>Phase 3: Pilot Implementation (Months 8-12)</h2>
            
            <div className={styles.subsection}>
              <h3 className={styles.subsectionTitle}>3.1 Pilot Site Preparation</h3>
              
              <h4 className={styles.subheading}>Technical Integration</h4>
              <ul className={styles.fundingBreakdown}>
                <li>Complete technical integration with pilot site EPR systems</li>
                <li>Implement custom interfaces for site-specific workflows</li>
                <li>Conduct user acceptance testing with clinical staff</li>
                <li>Provide comprehensive training materials and sessions</li>
                <li>Establish 24/7 technical support during pilot period</li>
              </ul>

              <h4 className={styles.subheading}>Legal & Contractual Framework</h4>
              <ul className={styles.fundingBreakdown}>
                <li>Negotiate pilot agreements with NHS trusts</li>
                <li>Establish data sharing agreements compliant with NHS standards</li>
                <li>Create service level agreements for system availability</li>
                <li>Implement incident reporting and resolution procedures</li>
              </ul>
            </div>

            <div className={styles.subsection}>
              <h3 className={styles.subsectionTitle}>3.2 Pilot Execution</h3>
              
              <h4 className={styles.subheading}>Phase A: Shadow Mode (Months 8-10)</h4>
              <ul className={styles.fundingBreakdown}>
                <li>Deploy system in parallel with existing workflows</li>
                <li>Process real cases without impacting clinical decisions</li>
                <li>Collect performance data and user feedback</li>
                <li>Refine algorithms based on real-world data patterns</li>
                <li>Monitor system performance and reliability</li>
              </ul>

              <h4 className={styles.subheading}>Phase B: Active Pilot (Months 10-12)</h4>
              <ul className={styles.fundingBreakdown}>
                <li>Begin using system outputs to inform clinical decisions</li>
                <li>Maintain consultant oversight and validation requirements</li>
                <li>Collect clinical outcome data and efficiency metrics</li>
                <li>Conduct regular user experience surveys</li>
                <li>Document all incidents and system improvements</li>
              </ul>
            </div>

            <div className={styles.subsection}>
              <h3 className={styles.subsectionTitle}>3.3 Clinical Evidence Collection</h3>
              
              <h4 className={styles.subheading}>Primary Endpoints</h4>
              <ul className={styles.fundingBreakdown}>
                <li>Diagnostic accuracy compared to standard practice</li>
                <li>Time reduction in report processing and turnaround</li>
                <li>Consistency improvements across different pathologists</li>
                <li>Detection rate of critical diagnostic features</li>
              </ul>

              <h4 className={styles.subheading}>Secondary Endpoints</h4>
              <ul className={styles.fundingBreakdown}>
                <li>User satisfaction and adoption rates</li>
                <li>Impact on clinical decision confidence</li>
                <li>Reduction in diagnostic uncertainty</li>
                <li>Training and onboarding efficiency for new staff</li>
              </ul>
            </div>
          </section>

          <section id="phase-4" className={styles.section}>
            <h2 className={styles.sectionTitle}>Phase 4: Scale Preparation & Commercial Launch (Months 12-18)</h2>
            
            <div className={styles.subsection}>
              <h3 className={styles.subsectionTitle}>4.0 Funding Strategy - Series A Round</h3>
              
              <div className={styles.fundingDetails}>
                <div className={styles.fundingAmount}>
                  <strong>Target Amount:</strong> £3M-7M (INCREASED)<br/>
                  <strong>Optimal Timing:</strong> Months 12-15 (After successful pilot results with multiple sites)
                </div>
              </div>

              <h4 className={styles.subheading}>Required Milestones Before Series A:</h4>
              <ul className={styles.fundingBreakdown}>
                <li>Successful pilot results from 3-5 NHS sites demonstrating clinical efficacy (&gt;90% accuracy target)</li>
                <li>Clear revenue generation from pilot sites with validated pricing model</li>
                <li>Additional 5-10 NHS trusts expressing interest based on pilot results</li>
                <li>Regulatory pathway clarified (MHRA requirements understood)</li>
                <li>Team scaled to support commercial deployment</li>
                <li>Professional society endorsements and peer-reviewed publications</li>
              </ul>

              <h4 className={styles.subheading}>Use of Funds:</h4>
              <ul className={styles.fundingBreakdown}>
                <li>Commercial team expansion and national NHS sales capability</li>
                <li>Scale deployment to 10-15 additional NHS trusts</li>
                <li>International expansion (starting with English-speaking markets)</li>
                <li>Advanced product development and AI enhancement capabilities</li>
                <li>Strategic acquisitions or partnerships for market expansion</li>
              </ul>

              <h4 className={styles.subheading}>Investor Profile (PREMIUM POSITION):</h4>
              <ul className={styles.fundingBreakdown}>
                <li>Tier 1 growth-stage VCs with healthcare focus</li>
                <li>Strategic acquirers (major healthcare IT companies)</li>
                <li>International expansion partners</li>
                <li>NHS suppliers seeking innovative partnerships</li>
                <li>Private equity with healthcare sector focus</li>
              </ul>
            </div>

            <div className={styles.subsection}>
              <h3 className={styles.subsectionTitle}>4.1 Pilot Results Analysis & Optimization</h3>
              
              <h4 className={styles.subheading}>Data Analysis & Publication</h4>
              <ul className={styles.fundingBreakdown}>
                <li>Conduct statistical analysis of pilot results</li>
                <li>Prepare peer-reviewed publication of pilot findings</li>
                <li>Create case studies and success stories from pilot sites</li>
                <li>Develop ROI calculations for NHS procurement teams</li>
              </ul>

              <h4 className={styles.subheading}>System Optimization</h4>
              <ul className={styles.fundingBreakdown}>
                <li>Implement improvements based on pilot feedback</li>
                <li>Optimize algorithms for UK-specific reporting patterns</li>
                <li>Enhance user interface based on clinical workflow insights</li>
                <li>Improve integration capabilities for broader NHS deployment</li>
              </ul>
            </div>

            <div className={styles.subsection}>
              <h3 className={styles.subsectionTitle}>4.2 Commercial Strategy Development</h3>
              
              <h4 className={styles.subheading}>NHS Procurement Strategy</h4>
              <ul className={styles.fundingBreakdown}>
                <li>Understand NHS procurement frameworks and timelines</li>
                <li>Develop pricing strategy for NHS market</li>
                <li>Create scalable implementation methodology</li>
                <li>Establish customer success and support capabilities</li>
              </ul>

              <h4 className={styles.subheading}>Market Expansion Planning</h4>
              <ul className={styles.fundingBreakdown}>
                <li>Identify next wave of NHS trusts for expansion</li>
                <li>Develop partnerships with NHS suppliers and system integrators</li>
                <li>Create channel partner program for wider NHS reach</li>
                <li>Plan international expansion strategy (starting with English-speaking markets)</li>
              </ul>
            </div>

            <div className={styles.subsection}>
              <h3 className={styles.subsectionTitle}>4.3 Regulatory & Quality Assurance</h3>
              
              <h4 className={styles.subheading}>Medical Device Classification</h4>
              <ul className={styles.fundingBreakdown}>
                <li>Determine if system requires MHRA medical device approval</li>
                <li>Implement medical device quality management system if required</li>
                <li>Establish post-market surveillance procedures</li>
                <li>Create risk management documentation</li>
              </ul>

              <h4 className={styles.subheading}>Quality Management</h4>
              <ul className={styles.fundingBreakdown}>
                <li>Implement comprehensive quality management system</li>
                <li>Establish clinical governance procedures</li>
                <li>Create standard operating procedures for all processes</li>
                <li>Implement continuous monitoring and improvement processes</li>
              </ul>
            </div>
          </section>

          <section id="success-factors" className={styles.section}>
            <h2 className={styles.sectionTitle}>Key Success Factors</h2>
            
            <div className={styles.subsection}>
              <h3 className={styles.subsectionTitle}>Leverage Research Network</h3>
              <ul className={styles.fundingBreakdown}>
                <li><strong>Immediate Credibility:</strong> Use haematologist co-founders' reputations for initial NHS access</li>
                <li><strong>Clinical Validation:</strong> Ensure clinical oversight of all validation studies</li>
                <li><strong>Peer Endorsement:</strong> Facilitate peer-to-peer recommendations within haematology community</li>
                <li><strong>Conference Presence:</strong> Present at major haematology conferences with co-founder participation</li>
              </ul>
            </div>

            <div className={styles.subsection}>
              <h3 className={styles.subsectionTitle}>NHS-Specific Considerations</h3>
              <ul className={styles.fundingBreakdown}>
                <li><strong>Long Sales Cycles:</strong> Budget for 12-18 month procurement processes</li>
                <li><strong>Evidence Requirements:</strong> Prepare comprehensive clinical evidence packages</li>
                <li><strong>Integration Complexity:</strong> Account for diverse IT infrastructures across trusts</li>
                <li><strong>Change Management:</strong> Plan extensive training and adoption support programs</li>
              </ul>
            </div>

            <div className={styles.subsection}>
              <h3 className={styles.subsectionTitle}>Risk Mitigation</h3>
              <ul className={styles.fundingBreakdown}>
                <li><strong>Regulatory Compliance:</strong> Maintain ahead of curve compliance with evolving regulations</li>
                <li><strong>Clinical Safety:</strong> Implement comprehensive safety monitoring and incident response</li>
                <li><strong>Technical Reliability:</strong> Ensure 99.9%+ uptime for mission-critical healthcare applications</li>
                <li><strong>Data Security:</strong> Exceed NHS security requirements for patient data protection</li>
              </ul>
            </div>
          </section>

          <section id="funding-strategy-full" className={styles.section}>
            <h2 className={styles.sectionTitle}>Integrated Funding & Resource Strategy</h2>
            
            <div className={styles.subsection}>
              <h3 className={styles.subsectionTitle}>Financial Investment by Phase</h3>
              <ul className={styles.fundingBreakdown}>
                <li><strong>Months 1-3:</strong> £150k-300k (pre-seed funding - alpha testing preparation, MDS demo)</li>
                <li><strong>Months 3-6:</strong> LOI generation phase (funded by pre-seed runway)</li>
                <li><strong>Months 6-8:</strong> £750k-1.5M (seed funding - pilot execution with committed sites)</li>
                <li><strong>Months 8-12:</strong> Pilot execution phase (funded by seed runway)</li>
                <li><strong>Months 12-15:</strong> £3M-7M (Series A - commercial scale with proven results)</li>
              </ul>
            </div>

            <div className={styles.subsection}>
              <h3 className={styles.subsectionTitle}>Team Expansion</h3>
              <ul className={styles.fundingBreakdown}>
                <li><strong>Clinical Affairs Manager:</strong> PhD-level healthcare professional for NHS engagement</li>
                <li><strong>Regulatory Affairs Specialist:</strong> MHRA and NHS compliance expertise</li>
                <li><strong>NHS Integration Engineer:</strong> Healthcare IT integration specialist</li>
                <li><strong>Clinical Success Manager:</strong> Ongoing pilot site support and optimization</li>
                <li><strong>Business Development:</strong> NHS sales and partnership development</li>
              </ul>
            </div>

            <div className={styles.subsection}>
              <h3 className={styles.subsectionTitle}>Strategic Partnerships</h3>
              <ul className={styles.fundingBreakdown}>
                <li><strong>NHS Innovation Accelerator:</strong> Credibility and funding access</li>
                <li><strong>Academic Health Science Networks:</strong> Regional NHS access and support</li>
                <li><strong>Healthcare IT Integrators:</strong> Technical implementation partnerships</li>
                <li><strong>Clinical Advisory Board:</strong> Strategic guidance and professional endorsement</li>
              </ul>
            </div>
          </section>

          <section id="success-metrics" className={styles.section}>
            <h2 className={styles.sectionTitle}>Success Metrics & Milestones</h2>
            
            <div className={styles.milestonesGrid}>
              <div className={styles.milestoneCard}>
                <h3 className={styles.milestoneTitle}>Phase 1 Success Criteria (Months 1-4)</h3>
                <div className={styles.milestoneCategory}>
                  <h4>Clinical Milestones:</h4>
                  <ul>
                    <li>ICO registration completed</li>
                    <li>3+ NHS trusts committed to validation study</li>
                    <li>Ethics approval obtained</li>
                    <li>Production infrastructure deployed and certified</li>
                  </ul>
                </div>
                <div className={styles.milestoneCategory}>
                  <h4>Funding Milestones:</h4>
                  <ul>
                    <li>Pre-seed round closed (£150k-300k)</li>
                    <li>Key team members hired or committed</li>
                    <li>Investor relationships established for seed round</li>
                  </ul>
                </div>
              </div>
              
              <div className={styles.milestoneCard}>
                <h3 className={styles.milestoneTitle}>Phase 2 Success Criteria (Months 4-8)</h3>
                <div className={styles.milestoneCategory}>
                  <h4>Clinical Milestones:</h4>
                  <ul>
                    <li>Clinical advisory board established with 5+ senior haematologists</li>
                    <li>3+ pilot sites contracted and ready for implementation</li>
                    <li>Professional society endorsements obtained</li>
                    <li>Validation study initiated with preliminary results</li>
                  </ul>
                </div>
                <div className={styles.milestoneCategory}>
                  <h4>Funding Milestones:</h4>
                  <ul>
                    <li>Seed round closed (£750k-1.5M at £4M-8M pre-money)</li>
                    <li>Professional team assembled and operational</li>
                    <li>Clear pathway to LOIs established with target trusts</li>
                  </ul>
                </div>
              </div>
              
              <div className={styles.milestoneCard}>
                <h3 className={styles.milestoneTitle}>Phase 3 Success Criteria (Months 8-12)</h3>
                <div className={styles.milestoneCategory}>
                  <h4>Clinical Milestones:</h4>
                  <ul>
                    <li>Pilot demonstrates &gt;90% diagnostic accuracy</li>
                    <li>&gt;30% time reduction in report processing demonstrated</li>
                    <li>&gt;80% user satisfaction in pilot sites</li>
                    <li>Zero critical safety incidents during pilot</li>
                  </ul>
                </div>
                <div className={styles.milestoneCategory}>
                  <h4>Funding Milestones:</h4>
                  <ul>
                    <li>3+ signed LOIs from NHS trusts</li>
                    <li>Series A preparation materials completed</li>
                    <li>Clear revenue model validated with NHS procurement</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section id="risk-mitigation" className={styles.section}>
            <h2 className={styles.sectionTitle}>Risk Mitigation Strategy</h2>
            
            <div className={styles.riskCards}>
              <div className={styles.riskCard}>
                <h3 className={styles.riskTitle}>NHS Administrative Timeline Risk</h3>
                <p className={styles.riskDescription}>
                  "LOIs can take 6+ months in NHS - how do you guarantee hitting targets?"
                </p>
                <div className={styles.riskAnswer}>
                  <strong>Answer:</strong>
                  <ul>
                    <li>"Pilot-in-a-Box" pre-vetted packets make it easy for R&D departments to say yes</li>
                    <li>10-15 trust pipeline to achieve 3-5 LOIs (33% conversion realistic)</li>
                    <li>Extended 9-12 month pre-seed runway provides significant buffer for delays</li>
                  </ul>
                </div>
              </div>
              
              <div className={styles.riskCard}>
                <h3 className={styles.riskTitle}>Hospital Resource Burden Risk</h3>
                <p className={styles.riskDescription}>
                  "Who does the work of anonymizing 1000 patient records?"
                </p>
                <div className={styles.riskAnswer}>
                  <strong>Answer:</strong>
                  <ul>
                    <li>Clinical Affairs team works on-site under trust supervision</li>
                    <li>We provide the manpower, drastically reducing resource burden on trust</li>
                    <li>Flexible cohort sizes (50-100 initial, 500-1000 stretch goal)</li>
                  </ul>
                </div>
              </div>
              
              <div className={styles.riskCard}>
                <h3 className={styles.riskTitle}>LOI vs Revenue Valuation Gap</h3>
                <p className={styles.riskDescription}>
                  "LOIs aren't commercial contracts - how do you justify the valuation?"
                </p>
                <div className={styles.riskAnswer}>
                  <strong>Answer:</strong>
                  <ul>
                    <li>Market access de-risking premium - we've solved the biggest HealthTech hurdle</li>
                    <li>Each LOI represents £200k-500k annual contract potential</li>
                    <li>Investment is for execution on pre-sold demand, not market exploration</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section id="total-funding" className={styles.section}>
            <h2 className={styles.sectionTitle}>Total Funding Requirements</h2>
            
            <div className={styles.fundingSummary}>
              <div className={styles.fundingItem}>
                <span className={styles.fundingLabel}>Pre-Seed (Months 1-3):</span>
                <span className={styles.fundingAmount}>£150k-300k</span>
              </div>
              <div className={styles.fundingItem}>
                <span className={styles.fundingLabel}>Seed Round (Months 6-8):</span>
                <span className={styles.fundingAmount}>£750k-1.5M (AFTER LOIs)</span>
              </div>
              <div className={styles.fundingItem}>
                <span className={styles.fundingLabel}>Series A (Months 12-15):</span>
                <span className={styles.fundingAmount}>£3M-7M</span>
              </div>
              <div className={`${styles.fundingItem} ${styles.totalFunding}`}>
                <span className={styles.fundingLabel}>Total 18-Month Funding:</span>
                <span className={styles.fundingAmount}>£3.9M-8.8M</span>
              </div>
            </div>
            
            <div className={styles.keySuccessMetrics}>
              <h3>Key Success Metrics:</h3>
              <ul>
                <li>Convert 10-15 trust engagement pipeline into 3-5 signed LOIs within 6 months</li>
                <li>MDS Working Group demonstration as catalyst, not sole dependency</li>
                <li>Extended runway provides buffer for NHS administrative realities</li>
                <li>"Pilot-in-a-Box" approach minimizes trust resource burden and accelerates decision-making</li>
              </ul>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Conclusion</h2>
            <p className={styles.paragraph}>
              This action plan provides a structured pathway from current development status to successful NHS pilot deployment. The key differentiator is leveraging the clinical credibility and networks of our haematologist co-founders to accelerate NHS adoption while maintaining the highest standards of clinical safety and regulatory compliance.
            </p>
            <p className={styles.paragraph}>
              The plan balances aggressive timelines with realistic NHS procurement and validation requirements, positioning Haem.io for sustainable growth within the UK healthcare system and eventual international expansion.
            </p>
          </section>

          <section id="investor-pitch" className={styles.section}>
            <h2 className={styles.sectionTitle}>Investor Pitch Strategy</h2>
            
            <div className={styles.subsection}>
              <h3 className={styles.subsectionTitle}>Seed Round Pitch Framework (Months 6-8) - POST-LOI POSITION</h3>
              
              <div className={styles.keyPoints}>
                <div className={styles.keyPoint}>
                  <strong>Opening Hook:</strong><br/>
                  "We have 3-5 signed LOIs from NHS trusts, validated through alpha testing, with haematologist co-founders who have demonstrated strong community support. We need execution capital to deliver on these committed pilot sites."
                </div>
              </div>

              <h4 className={styles.subheading}>Key Pitch Elements:</h4>
              <ul className={styles.fundingBreakdown}>
                <li><strong>Validated Commercial Demand:</strong> 3-5 signed LOIs from NHS trusts post-alpha testing</li>
                <li><strong>Proven Clinical Adoption:</strong> MDS Working Group demonstration and strong community support</li>
                <li><strong>De-risked Technology:</strong> Alpha testing validates clinical utility and workflow integration</li>
                <li><strong>Established Market Access:</strong> Haematologist co-founders with demonstrated NHS credibility</li>
                <li><strong>Clear Revenue Pathway:</strong> Committed pilot sites with validated pricing discussions</li>
              </ul>

              <h4 className={styles.subheading}>Financial Projections (STRONGER):</h4>
              <ul className={styles.fundingBreakdown}>
                <li>Year 1: 3-5 pilot sites generating £200k-500k revenue</li>
                <li>Year 2: 10-15 NHS trusts, £750k-1.5M revenue</li>
                <li>Year 3: 25+ NHS trusts, £2M-4M revenue</li>
                <li>International expansion with proven NHS case studies</li>
              </ul>
            </div>

            <div className={styles.subsection}>
              <h3 className={styles.subsectionTitle}>Risk Mitigation Strategy - Addressing Investor Concerns</h3>
              
              <div className={styles.riskCard}>
                <h4 className={styles.riskTitle}>NHS Administrative Timeline Risk</h4>
                <p className={styles.riskDescription}>"LOIs can take 6+ months in NHS - how do you guarantee hitting targets?"</p>
                <div className={styles.riskAnswer}>
                  <strong>Answer:</strong>
                  <ul>
                    <li>"Pilot-in-a-Box" pre-vetted packets make it easy for R&D departments to say yes</li>
                    <li>10-15 trust pipeline to achieve 3-5 LOIs (33% conversion realistic)</li>
                    <li>Extended 9-12 month pre-seed runway provides significant buffer for delays</li>
                  </ul>
                </div>
              </div>

              <div className={styles.riskCard}>
                <h4 className={styles.riskTitle}>Single Event Dependency Risk</h4>
                <p className={styles.riskDescription}>"Too much weight on MDS Working Group demonstration"</p>
                <div className={styles.riskAnswer}>
                  <strong>Answer:</strong>
                  <ul>
                    <li>Parallel direct outreach to 10-15 trusts independent of MDS group</li>
                    <li>MDS demo is catalyst, not sole source of LOIs</li>
                  </ul>
                </div>
              </div>

              <div className={styles.riskCard}>
                <h4 className={styles.riskTitle}>Regulatory Approval Timeline Risk</h4>
                <div className={styles.riskAnswer}>
                  <strong>Answer:</strong>
                  <ul>
                    <li>Logic-based system reduces AI regulation complexity</li>
                    <li>HRA/REC submission in Phase 1, approval expected in Phase 2</li>
                    <li>Regulatory pathway clarified through advisory board</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section id="execution-timeline" className={styles.section}>
            <h2 className={styles.sectionTitle}>Funding Execution Timeline</h2>
            
            <div className={styles.subsection}>
              <h3 className={styles.subsectionTitle}>Months 1-2: Pre-Seed Preparation & Execution</h3>
              <ul className={styles.fundingBreakdown}>
                <li>Complete financial projections and use of funds analysis</li>
                <li>Prepare investor deck and supporting materials</li>
                <li className={styles.highlight}>Develop "Pilot-in-a-Box" standardized packet</li>
                <li className={styles.highlight}>Submit HRA/REC ethics application</li>
                <li>Identify and approach friends/family/angel investors</li>
                <li className={styles.highlight}>Begin parallel outreach to 10-15 NHS trusts (beyond MDS group)</li>
                <li className={styles.highlight}>Recruit Clinical Affairs support for on-site data assistance</li>
              </ul>
            </div>

            <div className={styles.subsection}>
              <h3 className={styles.subsectionTitle}>Months 3-4: Pre-Seed Close & Seed Preparation</h3>
              <ul className={styles.fundingBreakdown}>
                <li>Close pre-seed round</li>
                <li>Execute foundational milestones (ICO registration, team expansion)</li>
                <li>Prepare comprehensive seed round materials</li>
                <li>Begin seed investor outreach and relationship building</li>
              </ul>
            </div>

            <div className={styles.subsection}>
              <h3 className={styles.subsectionTitle}>Months 4-6: Seed Round Execution</h3>
              <ul className={styles.fundingBreakdown}>
                <li>Demonstrate progress on NHS engagement</li>
                <li>Show validation study initiation and early results</li>
                <li>Close seed round with target investors</li>
                <li>Begin aggressive pilot site development</li>
              </ul>
            </div>

            <div className={styles.subsection}>
              <h3 className={styles.subsectionTitle}>Months 8-12: Series A Preparation</h3>
              <ul className={styles.fundingBreakdown}>
                <li>Execute pilot programs and collect clinical evidence</li>
                <li>Secure multiple LOIs from NHS trusts</li>
                <li>Prepare Series A materials with proven commercial traction</li>
                <li>Engage growth-stage investors for scaling capital</li>
              </ul>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Next Immediate Actions (Month 1) - REVISED PRIORITIES</h2>
            
            <div className={styles.keyPoints}>
              <div className={styles.keyPoint}>
                <strong>Key Success Metrics:</strong>
                <ul style={{marginTop: '0.5rem', paddingLeft: '1rem'}}>
                  <li>Convert 10-15 trust engagement pipeline into 3-5 signed LOIs within 6 months</li>
                  <li>MDS Working Group demonstration as catalyst, not sole dependency</li>
                  <li>Extended runway provides buffer for NHS administrative realities</li>
                  <li>"Pilot-in-a-Box" approach minimizes trust resource burden and accelerates decision-making</li>
                </ul>
              </div>
            </div>
          </section>
          </div>
        </div>
        
        {/* Footer Note */}
        <div className={styles.footerNote}>
          This page is not linked in navigation - access directly via /plan
        </div>
      </div>
    </div>
  );
} 