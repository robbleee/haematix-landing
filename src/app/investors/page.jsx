'use client';

import { useState, useEffect } from 'react';
import styles from './investors.module.css';

const pitchSlides = [
  {
    id: 1,
    content: (
      <div className={styles.slideContent}>
        <div className={styles.titleSlide}>
          <div className={styles.titleMain}>
            <h1 className={styles.companyName}>
              <span className="text-gradient">Haem.io</span>
            </h1>
            <p className={styles.tagline}>Intelligent Diagnostics for Precision Haematology</p>
          </div>
          
          <div className={styles.clinicalBackground}>
            <div className={styles.backgroundPattern}></div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 2,
    title: "The Diagnostic Pathway Crisis",
    subtitle: "Complex Guidelines Meet Unstructured Data",
    content: (
      <div className={styles.slideContent}>
        <h3>Diagnosticians Face an Impossible Challenge</h3>
        
        <div className={styles.diagnosticFlow}>
          <div className={styles.flowPanel}>
            <h4>Unstructured Data Chaos</h4>
            <p>Critical genetic markers buried in dense, inconsistent laboratory reports. Cytogenetics, flow cytometry, and molecular data exist in different formats with no standardization.</p>
          </div>
          
          <div className={styles.flowArrow}>→</div>
          
          <div className={styles.diagnostician}>
            <h4>Overwhelmed Diagnostician</h4>
            <p>Clinicians spend hours manually extracting parameters before any diagnostic logic can begin</p>
          </div>
          
          <div className={styles.flowArrow}>→</div>
          
          <div className={styles.flowPanel}>
            <h4>Pathway Complexity Explosion</h4>
            <p>WHO 2022 and ICC 2022 guidelines contain hundreds of interconnected diagnostic pathways with precise criteria. Too complex for consistent human application.</p>
          </div>
        </div>
        
        <div className={styles.flowInsight}>
          The diagnostic intelligence exists — but it's trapped in unstructured formats while pathways become impossibly complex
        </div>
      </div>
    )
  },
  {
    id: 3,
    title: "Formal Logic Meets Intelligent Extraction",
    subtitle: "Structured Diagnostic Pathways + AI-Powered Data Liberation",
    content: (
      <div className={styles.slideContent}>
        <div className={styles.pathway}>
          <div className={styles.pathwayStep}>
            <div className={styles.stepNumber}>01</div>
            <div className={styles.stepContent}>
              <h4>AI Extraction</h4>
              <p>LLM identifies and extracts genetic parameters from unstructured reports</p>
            </div>
          </div>
          <div className={styles.pathwayFlow}></div>
          <div className={styles.pathwayStep}>
            <div className={styles.stepNumber}>02</div>
            <div className={styles.stepContent}>
              <h4>Formal Logic Engine</h4>
              <p>Structured diagnostic pathways apply WHO/ICC criteria with mathematical precision</p>
            </div>
          </div>
          <div className={styles.pathwayFlow}></div>
          <div className={styles.pathwayStep}>
            <div className={styles.stepNumber}>03</div>
            <div className={styles.stepContent}>
              <h4>AI Review</h4>
              <p>Post-diagnostic validation and pathway adherence verification</p>
            </div>
          </div>
        </div>

        <div className={styles.breakthrough}>
          <div className={styles.breakthroughItem}>
            <h4>Pathway Formalization</h4>
            <p>Complex diagnostic guidelines converted into testable, maintainable logic trees</p>
          </div>
          <div className={styles.breakthroughItem}>
            <h4>Data Liberation</h4>
            <p>AI extracts structured genetic parameters from any report format</p>
          </div>
          <div className={styles.breakthroughItem}>
            <h4>Logic Validation</h4>
            <p>Every diagnostic pathway is formally tested and validated against real-world cases</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 4,
    title: "Effortless Clinical Integration",
    subtitle: "Designed for Junior Clinicians, Trusted by Experts",
    content: (
      <div className={styles.slideContent}>
        <h3>Zero Learning Curve, Maximum Confidence</h3>
        
        <div className={styles.largeAdvantages}>
          <div className={styles.advantage}>
            <h4>No Training Required</h4>
            <p>Junior clinicians achieve expert-level diagnostic accuracy from day one</p>
          </div>
          <div className={styles.advantage}>
            <h4>Intuitive Interface</h4>
            <p>Upload report, get structured diagnosis. Complex logic runs invisibly</p>
          </div>
          <div className={styles.advantage}>
            <h4>Confidence Building</h4>
            <p>Shows reasoning behind each decision, helping doctors learn while ensuring they never miss critical criteria</p>
          </div>
          <div className={styles.advantage}>
            <h4>Expert Validation</h4>
            <p>Built on WHO 2022 and ICC 2022 guidelines, validated by leading hematologists worldwide</p>
          </div>
        </div>
        
        <div className={styles.insight}>
          Sophisticated formal logic, simple clinical experience.
        </div>
      </div>
    )
  },
  {
    id: 5,
    title: "Why We Win",
    subtitle: "Deep Integration, Unmatched Expertise",
    content: (
      <div className={styles.slideContent}>
        <div className={styles.competitiveAdvantage}>
          <div className={styles.advantagePoints}>
            <div className={styles.advantagePoint}>
              <div className={styles.pointNumber}>1</div>
              <h4>Format-Agnostic Integration</h4>
              <p>We consume data in any format (PDF, text, etc.), integrating effortlessly into any existing clinical workflow without requiring changes to lab or hospital systems.</p>
            </div>
            
            <div className={styles.advantagePoint}>
              <div className={styles.pointNumber}>2</div>
              <h4>Expert-Driven AI</h4>
              <p>We leverage our in-house clinical team's expertise to formalise the complex classification logic for numerous cancer subtypes. This drastically reduces development costs and ensures world-class accuracy.</p>
            </div>
            
            <div className={styles.advantagePoint}>
              <div className={styles.pointNumber}>3</div>
              <h4>From Weeks to Seconds</h4>
              <p>We deliver an accurate, reproducible, and transparent diagnosis in seconds, a process that traditionally takes days or weeks.</p>
            </div>
            
            <div className={styles.advantagePoint}>
              <div className={styles.pointNumber}>4</div>
              <h4>Comprehensive Downstream Insights</h4>
              <p>The rich, structured data we create powers a suite of downstream analyses: personalised treatment suggestions, genetic trial matching, risk stratification, gene reviews, and MRD reviews.</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 6,
    title: "How It Works",
    subtitle: "From Raw Data to Actionable Report in Minutes",
    content: (
      <div className={styles.slideContent}>
        <div className={styles.howItWorksFlow}>
          <div className={styles.workflowStep}>
            <div className={styles.stepIcon} data-icon="upload"></div>
            <div className={styles.stepNumber}>01</div>
            <div className={styles.stepContent}>
              <h4>UPLOAD</h4>
              <p>User uploads unstructured lab reports</p>
            </div>
          </div>
          
          <div className={styles.workflowArrow}>→</div>
          
          <div className={styles.workflowStep}>
            <div className={styles.stepIcon} data-icon="analyze"></div>
            <div className={styles.stepNumber}>02</div>
            <div className={styles.stepContent}>
              <h4>ANALYSE</h4>
              <p>AI engine parses data, classifies disease, assesses risk</p>
            </div>
          </div>
          
          <div className={styles.workflowArrow}>→</div>
          
          <div className={styles.workflowStep}>
            <div className={styles.stepIcon} data-icon="report"></div>
            <div className={styles.stepNumber}>03</div>
            <div className={styles.stepContent}>
              <h4>REPORT</h4>
              <p>Comprehensive PDF report generated for clinical team</p>
            </div>
          </div>
        </div>
        
        <div className={styles.workflowInsight}>
          <div className={styles.timeComparison}>
            <div className={styles.beforeAfter}>
              <div className={styles.beforeTime}>
                <div className={styles.beforeLabel}>BEFORE</div>
                <div className={styles.beforeValue}>Hours to Weeks</div>
                <div className={styles.beforeDescription}>Manual diagnosis process</div>
              </div>
              
              <div className={styles.comparisonArrow}>→</div>
              
              <div className={styles.afterTime}>
                <div className={styles.afterLabel}>WITH HAEM.IO</div>
                <div className={styles.afterValue}>3-5 Minutes</div>
                <div className={styles.afterDescription}>Automated diagnostic report</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 7,
    title: "Perfect Market Convergence",
    subtitle: "Riding the Wave: Multi-Billion Dollar Market Transformation",
    content: (
      <div className={styles.slideContent}>
        <div className={styles.marketLayout}>
          <div className={styles.marketLeft}>
            <div className={styles.marketForces}>
              <div className={styles.force}>
                <h4>Global AI in Diagnostics</h4>
                <p>$1.92B → $46.59B by 2034 (37.6% CAGR) - explosive growth in AI-powered diagnostic interpretation</p>
              </div>
              <div className={styles.force}>
                <h4>Clinical Decision Support Systems</h4>
                <p>$5.79B → $10.71B by 2030 (11.0% CAGR) - mature, stable foundation for diagnostic assistance</p>
              </div>
              <div className={styles.force}>
                <h4>NHS AI Transformation</h4>
                <p>£500M+ in AI contracts, £123M across 86 technologies, targeting 29M GP appointments annually</p>
              </div>
            </div>
          </div>
          
          <div className={styles.marketRight}>
            <div className={styles.marketOpportunity}>
              <div className={styles.marketValue}>$164B</div>
              <h4>AI in Healthcare Market by 2030</h4>
              <p>49.1% CAGR growth driven by chronic disease management, diagnostic accuracy demands, and productivity gains worth $14-55B annually.</p>
              <div className={styles.marketSupport}>
                <div className={styles.supportItem}>
                  <span>Global AI Healthcare: $14.92B → $164.16B (2030)</span>
                  <small><a href="https://www.globenewswire.com/news-release/2025/01/14/3009462/28124/en/164-Bn-Artificial-Intelligence-AI-in-Healthcare-Markets-Global-Forecast-to-2030-Market-to-Grow-at-a-CAGR-of-49-1-with-Koninklijke-Philips-Microsoft-Siemens-NVIDIA-and-Epic-Systems-.html" target="_blank" rel="noopener noreferrer">GlobeNewswire, 2025</a></small>
                </div>
                <div className={styles.supportItem}>
                  <span>AI Diagnostics: $1.92B → $46.59B (2034)</span>
                  <small><a href="https://www.globenewswire.com/news-release/2025/05/29/3090079/0/en/46-5-Bn-AI-in-Medical-Diagnostics-Market-Opportunities-and-Strategies-to-2034-Machine-Learning-and-Computer-Vision-Set-to-Transform-AI-Diagnostics-Landscape.html" target="_blank" rel="noopener noreferrer">GlobeNewswire, 2025</a></small>
                </div>
                <div className={styles.supportItem}>
                  <span>UK CDSS: £361.9M → £634.9M (2030)</span>
                  <small><a href="https://www.grandviewresearch.com/horizon/outlook/clinical-decision-support-systems-market/uk" target="_blank" rel="noopener noreferrer">Grand View Research, 2025</a></small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 8,
    title: "The £72M Problem & Our Solution",
    subtitle: "Conservative NHS Costs vs. Our Pricing Model",
    content: (
      <div className={styles.slideContent}>
        <div className={styles.diagnosticFlow}>
          <div className={styles.flowPanel}>
            <h3>The Problem</h3>
            <div className={styles.simpleStats}>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>£72M</div>
                <div className={styles.statLabel}>NHS annual cost</div>
              </div>
            </div>
            <p><strong>£293.9K per trust</strong> • Conservative estimate</p>
          </div>
          
          <div className={styles.flowArrow}>→</div>
          
          <div className={styles.flowPanel}>
            <h3>Our Solution</h3>
            <div className={styles.pricingList}>
              <div className={styles.pricingItem}>
                <span className={styles.pricingValue}>£15K</span>
                <span className={styles.pricingTitle}>Hospital Dept</span>
              </div>
              <div className={styles.pricingItem}>
                <span className={styles.pricingValue}>£30K</span>
                <span className={styles.pricingTitle}>Hospital Trust</span>
              </div>
              <div className={styles.pricingItem}>
                <span className={styles.pricingValue}>£25K</span>
                <span className={styles.pricingTitle}>Pharma/CRO</span>
              </div>
            </div>
            <p>Annual SaaS licenses</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 9,
    title: "The Team",
    subtitle: "World-Class Expertise in AI, Physics & Medicine",
    content: (
      <div className={styles.slideContent}>
        <div className={styles.teamLayout}>
          <div className={styles.teamGrid}>
            <div className={styles.teamMember}>
              <div className={styles.memberPhoto}>
                <div className={styles.photoPlaceholder}>RL</div>
              </div>
              <div className={styles.memberInfo}>
                <h3>Robert Edward Lee</h3>
                <h4>CEO</h4>
                <p>Background in Computer Science & FinTech AI. Driving the business vision.</p>
              </div>
            </div>
            
            <div className={styles.teamMember}>
              <div className={styles.memberPhoto}>
                <div className={styles.photoPlaceholder}>DC</div>
              </div>
              <div className={styles.memberInfo}>
                <h3>Dr. Danny Clark</h3>
                <h4>CTO</h4>
                <p>PhD in Nuclear Physics from CERN. Leading technology and platform architecture.</p>
              </div>
            </div>
            
            <div className={styles.teamMember}>
              <div className={styles.memberPhoto}>
                <div className={styles.photoPlaceholder}>JB</div>
              </div>
              <div className={styles.memberInfo}>
                <h3>Dr. John Burthem</h3>
                <h4>Co-CMO</h4>
                <p>Practising haematologist providing essential domain expertise and overseeing clinical strategy and validation.</p>
              </div>
            </div>
            
            <div className={styles.teamMember}>
              <div className={styles.memberPhoto}>
                <div className={styles.photoPlaceholder}>LC</div>
              </div>
              <div className={styles.memberInfo}>
                <h3>Dr. Luke Carter-Brzezinski</h3>
                <h4>Co-CMO</h4>
                <p>Practising haematologist providing essential domain expertise and overseeing clinical strategy and validation.</p>
              </div>
            </div>
          </div>
          
          <div className={styles.teamStrength}>
            <div className={styles.strengthCard}>
              <h4>Unique Multidisciplinary Foundation</h4>
              <p>Combining deep clinical expertise in haematology with cutting-edge AI and formal logic capabilities - the perfect blend for revolutionizing medical diagnostics.</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 10,
    title: "The Product Roadmap",
    subtitle: "Building the Comprehensive Haematology Solution",
    content: (
      <div className={styles.slideContent}>
        <div className={styles.roadmapFlow}>
          <div className={styles.flowTrack}>
            <h3>Disease Expansion Journey</h3>
            <div className={styles.expansionFlow}>
              <div className={styles.milestone}>
                <div className={styles.milestoneNode}>
                  <div className={styles.nodeIcon}>✓</div>
                  <div className={styles.nodeContent}>
                    <h4>Phase 1</h4>
                    <p>AML & MDS</p>
                    <span className={styles.status}>Complete</span>
                  </div>
                </div>
              </div>
              
              <div className={styles.flowConnector}>→</div>
              
              <div className={styles.milestone}>
                <div className={styles.milestoneNode}>
                  <div className={styles.nodeIcon}>🔬</div>
                  <div className={styles.nodeContent}>
                    <h4>Y1-2</h4>
                    <p>Lymphoid Malignancies</p>
                    <span className={styles.timeline}>Next</span>
                  </div>
                </div>
              </div>
              
              <div className={styles.flowConnector}>→</div>
              
              <div className={styles.milestone}>
                <div className={styles.milestoneNode}>
                  <div className={styles.nodeIcon}>🧬</div>
                  <div className={styles.nodeContent}>
                    <h4>Y2-3</h4>
                    <p>MPNs & Multiple Myeloma</p>
                    <span className={styles.timeline}>Scaling</span>
                  </div>
                </div>
              </div>
              
              <div className={styles.flowConnector}>→</div>
              
              <div className={styles.milestone}>
                <div className={styles.milestoneNode}>
                  <div className={styles.nodeIcon}>🎯</div>
                  <div className={styles.nodeContent}>
                    <h4>Y3+</h4>
                    <p>All Rare Blood Cancers</p>
                    <span className={styles.timeline}>Complete</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className={styles.platformTrack}>
            <h3>Platform Evolution</h3>
            <div className={styles.platformFlow}>
              <div className={styles.platformStep}>
                <div className={styles.stepIcon}>🔗</div>
                <div className={styles.stepContent}>
                  <h4>API Integration</h4>
                  <p>Direct data ingestion from genetic testing systems</p>
                </div>
              </div>
              
              <div className={styles.plusConnector}>+</div>
              
              <div className={styles.platformStep}>
                <div className={styles.stepIcon}>🗄️</div>
                <div className={styles.stepContent}>
                  <h4>Trial Database</h4>
                  <p>UK & US expansion - 25x more matching options</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 11,
    title: "Our Capital-Efficient Regulatory Strategy",
    subtitle: "A Lean and De-Risked Path to Market",
    content: (
      <div className={styles.slideContent}>
        <div className={styles.regulatoryStrategy}>
          <div className={styles.regulatoryComparison}>
            <div className={styles.comparisonSection}>
              <h3>The "DIY" Advantage vs. The Standard Approach</h3>
              <p>Instead of allocating £50,000+ to external consultants, our team has the technical and clinical expertise to manage the entire process internally.</p>
              <p><strong>Our funding is therefore targeted only at the unavoidable external fees required for certification.</strong></p>
            </div>
          </div>
          
          <div className={styles.costBreakdown}>
            <h3>Minimum Mandatory Costs for UKCA Marking</h3>
            <div className={styles.costTable}>
              <div className={styles.tableHeader}>
                <div className={styles.tableCell}>Cost Item</div>
                <div className={styles.tableCell}>Type</div>
                <div className={styles.tableCell}>Estimated Cost</div>
              </div>
              <div className={styles.tableRow}>
                <div className={styles.tableCell}>ISO 13485 Certification Audit</div>
                <div className={styles.tableCell}>Mandatory External Fee</div>
                <div className={styles.tableCell}>£3,000 - £5,000</div>
              </div>
              <div className={styles.tableRow}>
                <div className={styles.tableCell}>UK Approved Body Audit</div>
                <div className={styles.tableCell}>Mandatory External Fee</div>
                <div className={styles.tableCell}>£15,000 - £20,000</div>
              </div>
              <div className={styles.tableRow}>
                <div className={styles.tableCell}>MHRA Registration Fee</div>
                <div className={styles.tableCell}>Mandatory External Fee</div>
                <div className={styles.tableCell}>£261</div>
              </div>
              <div className={styles.tableTotal}>
                <div className={styles.tableCell}><strong>Total Minimum Cash Outlay</strong></div>
                <div className={styles.tableCell}></div>
                <div className={styles.tableCell}><strong>~£18,000 - £25,000</strong></div>
              </div>
            </div>
          </div>
          
          <div className={styles.fundingAllocation}>
            <h4>Our Funding Allocation for this Goal</h4>
            <p>Our ask includes a specific budget for these hard costs, plus a small buffer for expert review before submission.</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 12,
    title: "Use of Funds",
    subtitle: "How We Will Deploy Capital for Growth",
    content: (
      <div className={styles.slideContent}>
        <div className={styles.useOfFunds}>
          <div className={styles.fundingColumns}>
            <div className={styles.fundingColumn}>
              <div className={styles.columnHeader}>
                <div className={styles.columnIcon} data-icon="team"></div>
                <div className={styles.columnPercentage}>50%</div>
                <h3>Team Expansion</h3>
              </div>

              <div className={styles.columnContent}>
                <h4>Key Hires</h4>
                <ul>
                  <li>Fund full-time salaries for the CEO and CTO</li>
                  <li>Hire an experienced Institutional Sales professional in Year 2 to build relationships with NHS trusts and drive revenue post-certification</li>
                  <li>Expand the engineering team to accelerate roadmap delivery</li>
                </ul>
              </div>
            </div>
            
            <div className={styles.fundingColumn}>
              <div className={styles.columnHeader}>
                <div className={styles.columnIcon} data-icon="product"></div>
                <div className={styles.columnPercentage}>30%</div>
                <h3>Product & Regulatory</h3>
              </div>

              <div className={styles.columnContent}>
                <h4>Key Actions</h4>
                <ul>
                  <li>Fund the entire UKCA medical device registration process, including essential consultancy, auditing, and QMS implementation fees</li>
                  <li>Continuously expand our clinical trial database and product features</li>
                </ul>
              </div>
            </div>
            
            <div className={styles.fundingColumn}>
              <div className={styles.columnHeader}>
                <div className={styles.columnIcon} data-icon="marketing"></div>
                <div className={styles.columnPercentage}>20%</div>
                <h3>Sales & Marketing</h3>
              </div>

              <div className={styles.columnContent}>
                <h4>Key Actions</h4>
                <ul>
                  <li>Fund our presence at key industry conferences (e.g., BSH)</li>
                  <li>Execute targeted digital marketing campaigns to reach clinical leads</li>
                  <li>Support the publication of validation studies to build clinical credibility</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 13,
    title: "Seed Round",
    subtitle: "£750k to Accelerate Market Entry",
    content: (
      <div className={styles.slideContent}>
        <div className={styles.simpleRequest}>
          <div className={styles.fundingAmount}>
            <div className={styles.amount}>£750,000</div>
            <div className={styles.stage}>Seed Funding</div>
          </div>
          
          <div className={styles.keyObjectives}>
            <div className={styles.objective}>
              <h4>18 Months to NHS Validation</h4>
              <p>Complete UKCA certification and secure first NHS contracts</p>
            </div>
            <div className={styles.objective}>
              <h4>Team & Product Scale</h4>
              <p>Hire sales professional, expand engineering, enhance platform</p>
            </div>
            <div className={styles.objective}>
              <h4>Market Position</h4>
              <p>Establish leadership in AI diagnostic logic for haematology</p>
            </div>
          </div>
          
          <div className={styles.marketContext}>
            <p><strong>Market Opportunity:</strong> £164B AI Healthcare market by 2030, with NHS actively investing £500M+ in AI solutions</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 14,
    content: (
      <div className={styles.slideContent}>
        <div className={styles.impactLayout}>
          <div className={styles.visionStatement}>
            <h3>Transforming Medical Guidelines into Engineering-Grade Logic Systems</h3>
            <p>We're not building another AI diagnostic tool. We're creating the framework that makes complex medical decision-making as reliable as software engineering.</p>
          </div>
          
          
        </div>
        
       
      </div>
    )
  }
];

export default function Pitch() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % pitchSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + pitchSlides.length) % pitchSlides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const slide = pitchSlides[currentSlide];

  return (
    <div className={styles.pitchDeck}>
      {/* Back to Main Button */}
      <a href="/" className={styles.backButton}>
        ← Back
      </a>

      {/* Main Slide */}
      <div 
        key={currentSlide} 
        className={styles.slide}
      >
        <div className="container">
          <div className={styles.slideHeader}>
            <h1><span className="text-gradient">{slide.title}</span></h1>
            <p className={styles.slideSubtitle}>{slide.subtitle}</p>
          </div>
          
          {slide.content}
        </div>
      </div>

      {/* Navigation */}
      <div className={styles.navigation}>
        <button 
          onClick={prevSlide} 
          className={styles.navButton}
          disabled={currentSlide === 0}
        >
          ← Previous
        </button>
        
        <div className={styles.slideIndicators}>
          {pitchSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`${styles.indicator} ${index === currentSlide ? styles.active : ''}`}
            />
          ))}
        </div>
        
        <button 
          onClick={nextSlide} 
          className={styles.navButton}
          disabled={currentSlide === pitchSlides.length - 1}
        >
          Next →
        </button>
      </div>
    </div>
  );
} 