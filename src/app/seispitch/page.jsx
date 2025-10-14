'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './seispitch.module.css';
import dynamic from 'next/dynamic';

const pitchSlides = [
  {
    id: 0,
    content: (
      <div className={styles.slideContent}>
        <div className={styles.titleSlide}>
          <div className={styles.titleMain}>
            <h1 className={styles.companyName}>
              Haem.io
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
    id: 1,
    title: "Our Story",
    subtitle: "A New Year's Conversation That Changed Everything",
    content: (
      <div className={styles.slideContent}>
        <div className={styles.compactStoryLayout}>
          <p className={styles.storyLead}>
            At a New Year's gathering, Robert—a Burkitt lymphoma survivor—was showing his uncle John, a leading consultant haematologist involved in cutting edge research, an AI app he'd built. John said:
          </p>
          
          <div className={styles.conversationBox}>
            <div className={styles.dialogueQuote}>
              "That's great. We have a big problem in haematology diagnosis that we might be able to solve. Could AI do something with genetics lab reports?"
            </div>
            <div className={styles.speaker}>— Dr. John Burthem, NHS Haematologist</div>
          </div>
          
          <p className={styles.storyClosing}>
            That conversation sparked Haem.io.
          </p>
        </div>
      </div>
    )
  },
  {
    id: 2,
    title: "The Diagnostic Pathway Crisis",
    subtitle: "A Problem in Haematology Today, All of Oncology Tomorrow",
    content: (
      <div className={styles.slideContent}>
        <h3>Haematology leads the way in genetics-driven diagnosis—but all oncology is heading in this direction</h3>
        
        <div className={styles.diagnosticFlow}>
          <div className={styles.flowPanel}>
            <h4>Unstructured Data</h4>
            <p>Haematologists manually pull together critical genetic markers from multiple sources—cytogenetics, flow cytometry, and molecular data—each in different formats with no standardization.</p>
          </div>
          
          <div className={styles.flowArrow}>→</div>
          
          <div className={styles.diagnostician}>
            <h4>Overwhelmed Diagnostician</h4>
            <p>Clinicians spend hours manually extracting information before any diagnostic logic can begin</p>
          </div>
          
          <div className={styles.flowArrow}>→</div>
          
          <div className={styles.flowPanel}>
            <h4>Increasing Pathway Complexity</h4>
            <p>Diagnosis must follow WHO 2022 and ICC 2022 global guidelines. But these contain hundreds of interconnected diagnostic pathways with precise criteria, too complex for consistent and timely human application.</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 17,
    title: "The Human Cost",
    subtitle: "When Delays Mean Death",
    content: (
      <div className={styles.slideContent}>
        <div className={styles.humanCostLayout}>
          <div className={styles.centerQuote}>
            <div className={styles.bigQuote}>
              "Blood cancer patients have no time to lose—they need a diagnosis fast"
            </div>
          </div>
          
          <div className={styles.costStats}>
            <div className={styles.statBlock}>
              <div className={styles.statNumber}>24 hours</div>
              <div className={styles.statLabel}>Cancer cells can double</div>
            </div>
            
            <div className={styles.statDivider}></div>
            
            <div className={styles.statBlock}>
              <div className={styles.statNumber}>Days → Weeks</div>
              <div className={styles.statLabel}>Current diagnostic delay</div>
            </div>
            
            <div className={styles.statDivider}></div>
            
            <div className={styles.statBlock}>
              <div className={styles.statNumber}>Every delay</div>
              <div className={styles.statLabel}>Potentially fatal</div>
            </div>
          </div>
          
          <div className={styles.bottomStatement}>
            This isn't just an efficiency problem—it's a patient survival problem
          </div>
        </div>
      </div>
    )
  },
  {
    id: 18,
    title: "SWOT Analysis",
    subtitle: "A Comprehensive Risk Assessment for SEIS Qualification",
    content: (
      <div className={styles.slideContent}>
        <div className={styles.swotLayout}>
          <div className={styles.swotQuadrant} data-type="strengths">
            <h4>Strengths</h4>
            <ul>
              <li>Clinical co-founders with NHS access</li>
              <li>Working prototype validated by KOLs</li>
              <li>£7M grant inclusion demonstrates credibility</li>
              <li>Hybrid AI approach differentiates from competitors</li>
            </ul>
          </div>
          
          <div className={styles.swotQuadrant} data-type="weaknesses">
            <h4>Weaknesses</h4>
            <ul>
              <li><strong>Pre-revenue</strong>: No commercial contracts yet</li>
              <li><strong>Regulatory uncertainty</strong>: UKCA pathway timing unpredictable (12-18 months)</li>
              <li><strong>Small team</strong>: Heavy reliance on 2 clinical co-founders for domain expertise</li>
              <li><strong>Limited runway</strong>: 18 months to achieve commercialization—tight timeline</li>
              <li><strong>Technical complexity</strong>: Hybrid AI+logic requires constant refinement</li>
              <li><strong>No sales track record</strong>: First-time founders in healthcare SaaS</li>
            </ul>
          </div>
          
          <div className={styles.swotQuadrant} data-type="opportunities">
            <h4>Opportunities</h4>
            <ul>
              <li>£21M NHS AI Diagnostic Fund targeting cancer diagnostics</li>
              <li>Global market expansion using WHO/ICC standards</li>
              <li>Expand beyond haematology to solid tumors</li>
              <li>Strategic acquisition target for larger health AI companies</li>
            </ul>
          </div>
          
          <div className={styles.swotQuadrant} data-type="threats">
            <h4>Threats</h4>
            <ul>
              <li><strong>NHS procurement delays</strong>: 18-24 month sales cycles could burn through runway</li>
              <li><strong>Regulatory rejection risk</strong>: UKCA denial would require expensive resubmission</li>
              <li><strong>AI performance failures</strong>: Clinical errors could halt adoption permanently</li>
              <li><strong>Well-funded competitors</strong>: SOPHiA GENETICS (€500M+ raised) entering UK market</li>
              <li><strong>Data access constraints</strong>: NHS data governance could block pilot studies</li>
              <li><strong>Clinical adoption resistance</strong>: Consultants may reject AI diagnostic support</li>
              <li><strong>Liability exposure</strong>: Medical AI misdiagnosis could result in catastrophic legal costs</li>
            </ul>
          </div>
        </div>
        
        <div className={styles.swotSummary}>
          <strong>Risk Assessment:</strong> Haem.io operates in a high-risk, high-reward space with significant technical, regulatory, and commercial uncertainties. Success depends on timely UKCA approval, clinical validation, and NHS adoption—all factors outside direct control. This makes the company a qualifying SEIS investment.
        </div>
      </div>
    )
  },
  {
    id: 15,
    title: "The Transformation",
    subtitle: "Haem.io Offers the Only End-to-End Solution",
    content: (
      <div className={styles.slideContent}>
        <div className={styles.transformationGrid}>
          <div className={styles.transformLeft}>
            <div className={styles.yearLabel} style={{background: '#dc2626'}}>2025</div>
            <h3>Manual Diagnosis</h3>
            <ul className={styles.transformList}>
              <li>Laminated flow charts on desks</li>
              <li>Hunt through reports for markers</li>
              <li>Cross-check multiple data sources</li>
              <li>Navigate complex guidelines manually</li>
              <li>Smaller trusts outsource to 5 specialist centres at great cost</li>
              <li>Hours → days to reach diagnosis</li>
            </ul>
            <div className={styles.transformResult} style={{borderColor: '#dc2626', color: '#dc2626'}}>
              Error-prone · Slow · Exhausting
            </div>
          </div>
          
          <div className={styles.transformArrow}>
            <div className={styles.arrowSymbol}>→</div>
          </div>
          
          <div className={styles.transformRight}>
            <div className={styles.yearLabel} style={{background: 'var(--primary-color)'}}>2026</div>
            <h3>With Haem.io</h3>
            <div className={styles.transformSteps}>
              <div className={styles.miniStep}>
                <span className={styles.miniNum}>1</span>
                <span>Upload report</span>
              </div>
              <div className={styles.miniStep}>
                <span className={styles.miniNum}>2</span>
                <span>AI + Logic engine runs</span>
              </div>
              <div className={styles.miniStep}>
                <span className={styles.miniNum}>3</span>
                <span>Receive diagnosis + plan</span>
              </div>
            </div>
            <div className={styles.transformResult} style={{borderColor: 'var(--primary-color)', color: 'var(--primary-color)'}}>
              ~2 minutes · Accurate · Effortless
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 4,
    title: "The Scale of the Problem",
    subtitle: "Blood Cancer Doesn't Discriminate",
    content: (
      <div className={styles.slideContent}>
        <div className={styles.compactScaleLayout}>
          <div className={styles.scaleTopRow}>
            <div className={styles.scaleMainStat}>
              <div className={styles.bigNumber}>1.2M</div>
              <p className={styles.mainLabel}>Annual global diagnoses</p>
              <p className={styles.compactNote}>*Low estimate—many go undiagnosed in LMEs</p>
            </div>
            
            <div className={styles.scaleKeyFacts}>
              <h3>Blood Cancer Reality</h3>
              <ul className={styles.factList}>
                <li>Not lifestyle-related</li>
                <li>Any age, any gender</li>
                <li>No known prevention</li>
                <li>3rd most fatal cancer (UK)</li>
              </ul>
            </div>
          </div>
          
          <div className={styles.scaleStatsRow}>
            <div className={styles.compactStat}>
              <span className={styles.statNum}>40,000+</span>
              <span className={styles.statText}>UK diagnoses/year</span>
            </div>
            <div className={styles.compactStat}>
              <span className={styles.statNum}>1 / 26 sec</span>
              <span className={styles.statText}>Global diagnosis frequency</span>
            </div>
            <div className={styles.compactStat}>
              <span className={styles.statNum}>15,000+</span>
              <span className={styles.statText}>UK deaths/year</span>
            </div>
          </div>
          
          <div className={styles.scaleCallout}>
            Every single diagnosis needs fast, accurate pathways—that's what Haem.io delivers
          </div>
        </div>
      </div>
    )
  },
  {
    id: 16,
    title: "From Idea to Breakthrough",
    subtitle: "Building What Works",
    content: (
      <div className={styles.slideContent}>
        <div className={styles.threeStepLayout}>
          <div className={styles.stepCard}>
            <div className={styles.stepNumber}>1</div>
            <div className={styles.stepContent}>
              <h4>Initial Approach: Pure AI</h4>
              <p>
                We built a system using LLMs for end-to-end diagnosis—feeding complete lab reports directly into the model. After rigorous testing against real clinical cases, we found critical failures: inconsistent classifications, missed diagnostic criteria, and no explainable reasoning trail.
              </p>
            </div>
          </div>
          <div className={styles.stepCard}>
            <div className={styles.stepNumber}>2</div>
            <div className={styles.stepContent}>
              <h4>Second Attempt: Hybrid AI + Logic</h4>
              <p>
                We used AI to extract structured parameters from reports, then applied formal logic engines with WHO/ICC diagnostic rules. This worked—but required too much upfront clinical input, making it impractical for real-world use.
              </p>
            </div>
          </div>
          <div className={styles.stepCard} data-success="true">
            <div className={styles.stepNumber}>3</div>
            <div className={styles.stepContent}>
              <h4>Our Breakthrough: Human-in-the-Loop</h4>
              <p>
                We developed a "just-in-time" approach: AI extracts what it can, logic engines run diagnostic pathways, and we ask clinicians for additional information only when necessary to reach a definitive diagnosis.
              </p>
              <p className={styles.stepResult}>
                Minimal clinician input. Maximum diagnostic accuracy. This is what works.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 3,
    title: "What's Under the Hood",
    subtitle: "Not a Black Box: Transparent, Explainable, Auditable",
    content: (
      <div className={styles.slideContent}>
        <div className={styles.technicalFlow}>
          <div className={styles.inputSection}>
            <div className={styles.techStep}>
              <div className={styles.techLabel}>Lab Report</div>
              <div className={styles.techBox}>
                <div className={styles.reportText}>
                  "...cytogenetics normal karyotype...<br/>
                  flow cytometry CD34+, CD117+, HLA-DR+...<br/>
                  molecular NPM1 mutation detected..."
                </div>
              </div>
            </div>
            
            <div className={styles.techStep}>
              <div className={styles.techLabel}>Clinical Data</div>
              <div className={styles.techBox}>
                <div className={styles.reportText}>
                  Age: 58<br/>
                  WBC: 45.3<br/>
                  Blasts: 72%
                </div>
              </div>
            </div>
          </div>
          
          <div className={styles.techArrow}>→</div>
          
          <div className={styles.techStep}>
            <div className={styles.techLabel}>AI Extraction</div>
            <div className={styles.techBox}>
              <div className={styles.jsonText}>
                {`{\n  "karyotype": "normal",\n  "markers": ["CD34+", "CD117+", "HLA-DR+"],\n  "mutation": "NPM1+",\n  "age": 58,\n  "wbc": 45.3,\n  "blasts": 72\n}`}
              </div>
            </div>
          </div>
          
          <div className={styles.techArrow}>→</div>
          
          <div className={styles.techStepWithDerivation}>
            <div className={styles.techStep}>
              <div className={styles.techLabel}>Logic Engine</div>
              <div className={styles.techBox}>
                <div className={styles.engineText}>
                  WHO/ICC<br/>
                  Diagnostic<br/>
                  Pathways
                </div>
              </div>
            </div>
            
            <div className={styles.derivationArrow}>↓</div>
            
            <div className={styles.derivationBox}>
              <div className={styles.derivationLabel}>Full Derivation</div>
              <div className={styles.derivationText}>
                Complete reasoning chain:<br/>
                criteria met, pathways followed
              </div>
            </div>
          </div>
          
          <div className={styles.techArrow}>→</div>
          
          <div className={styles.techStep}>
            <div className={styles.techLabel}>Diagnosis</div>
            <div className={styles.techBox} style={{borderColor: 'var(--primary-color)', background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)'}}>
              <div className={styles.diagnosisText}>
                <strong>AML with NPM1</strong><br/>
                Acute Myeloid Leukemia<br/>
                NPM1-mutated
              </div>
            </div>
          </div>
          
          <div className={styles.techArrow}>→</div>
          
          <div className={styles.outputsColumn}>
            <div className={styles.outputBox}>Treatment Options</div>
            <div className={styles.outputBox}>Clinical Trials</div>
            <div className={styles.outputBox}>Risk Stratification</div>
            <div className={styles.outputBox}>Follow-up</div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 5,
    title: "Why Is Haem.io Special?",
    subtitle: "What Makes Us Hard to Replicate",
    content: (
      <div className={styles.slideContent}>
        <div className={styles.competitiveAdvantage}>
          <div className={styles.advantageGrid}>
            <div className={styles.advantagePoint}>
              <div className={styles.pointNumber}>1</div>
              <h4>Zero Integration Friction</h4>
              <p>Works with any report format—PDF, scanned documents, text files. No IT integration required. Hospitals can start using it immediately without changing their existing systems.</p>
            </div>
            
            <div className={styles.advantagePoint}>
              <div className={styles.pointNumber}>2</div>
              <h4>Clinical Expertise as Code</h4>
              <p>Our in-house haematologists formalise WHO/ICC diagnostic logic into validated decision trees. Competitors can't replicate this without deep clinical domain knowledge embedded in the team.</p>
            </div>
            
            <div className={styles.advantagePoint}>
              <div className={styles.pointNumber}>3</div>
              <h4>Full Diagnostic Pipeline</h4>
              <p>Not just a diagnosis—we deliver treatment recommendations, clinical trial matching, risk stratification, and MRD monitoring. A complete decision support system, not a point solution.</p>
            </div>
            
            <div className={styles.advantagePoint}>
              <div className={styles.pointNumber}>4</div>
              <h4>Rapid Deployment Speed</h4>
              <p>From concept to working prototype in under 12 months. Our hybrid approach means faster iteration cycles and lower development costs than pure AI solutions.</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 6,
    title: "How Will Clinicians Use Haem.io?",
    subtitle: "From Raw Data to Actionable Report in Minutes",
    content: (
      <div className={styles.slideContent}>
        <div className={styles.howItWorksFlow}>
          <div className={styles.workflowStep}>
            <div className={styles.stepNumber}>01</div>
            <div className={styles.stepContent}>
              <h4>UPLOAD</h4>
              <p>User uploads unstructured lab reports and adds clinical details</p>
              <div className={styles.stepTime}>~30 seconds</div>
            </div>
          </div>
          
          <div className={styles.workflowArrow}>→</div>
          
          <div className={styles.workflowStep}>
            <div className={styles.stepNumber}>02</div>
            <div className={styles.stepContent}>
              <h4>ANALYSE</h4>
              <p>Haem.io is the only system that combines AI extraction with formal logic to classify disease and assess risk</p>
              <div className={styles.stepTime}>~1 minute</div>
            </div>
          </div>
          
          <div className={styles.workflowArrow}>→</div>
          
          <div className={styles.workflowStep}>
            <div className={styles.stepNumber}>03</div>
            <div className={styles.stepContent}>
              <h4>REPORT</h4>
              <p>Comprehensive PDF report generated for clinical team</p>
              <div className={styles.stepTime}>~30 seconds</div>
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
    id: 8,
    title: "Early Traction",
    subtitle: "Clinical Validation with Leading NHS Trusts",
    content: (
      <div className={styles.slideContent}>
        <div className={styles.compactTraction}>
          <div className={styles.tractionHighlight}>
            <div className={styles.bigStat}>£7M Grant Inclusion</div>
            <p>Invited by Prof. Charles Craddock to integrate Haem.io into UK National AML Relapse Study</p>
          </div>
          
          <div className={styles.tractionColumns}>
            <div className={styles.tractionCol}>
              <h4>Active Pilots</h4>
              <ul>
                <li><strong>Manchester Foundation Trust</strong> — In process of launching</li>
                <li><strong>The Christie NHS</strong> — Launching with Prof. John Chadwick</li>
              </ul>
            </div>
            
            <div className={styles.tractionCol}>
              <h4>Clinical Endorsements</h4>
              <p className={styles.compactQuote}>
                "I have been impressed with the platform... It represents a real step forward in what technology can offer."
              </p>
              <p className={styles.quoteSource}>— Dr. Tom Coats, Royal Devon & Exeter NHS Trust</p>
              <p className={styles.compactQuote}>
                "Your work has such important implications for both the AML community and the broader NHS."
              </p>
              <p className={styles.quoteSource}>— Prof. Charles Craddock, Chair, UK AML Research Network</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 10,
    title: "Competitive Landscape",
    subtitle: "Haem.io Is the Only End-to-End Solution for Modern Haematology",
    content: (
      <div className={styles.slideContent}>
        <div className={styles.competitionLayout}>
          <div className={styles.competitionIntro}>
            <p>Existing tools address single pieces of the diagnostic puzzle. We're the only team providing an integrated solution built for the complexity of 2022 guidelines.</p>
          </div>
          
          <div className={styles.competitionGrid}>
            <div className={styles.competitorCard}>
              <h4>Lab Automation</h4>
              <p className={styles.competitorExample}>e.g., Scopio Labs</p>
              <p className={styles.competitorFocus}>Focus: AI-powered morphology</p>
              <p className={styles.competitorGap}>Gap: No genomic integration or WHO/ICC classification</p>
            </div>
            
            <div className={styles.competitorCard}>
              <h4>Genomics Platforms</h4>
              <p className={styles.competitorExample}>e.g., SOPHiA GENETICS</p>
              <p className={styles.competitorFocus}>Focus: Genomic sequencing analysis</p>
              <p className={styles.competitorGap}>Gap: No automated diagnosis or risk stratification</p>
            </div>
            
            <div className={styles.competitorCard}>
              <h4>AI Pathology</h4>
              <p className={styles.competitorExample}>e.g., PathAI</p>
              <p className={styles.competitorFocus}>Focus: Solid tumor histology</p>
              <p className={styles.competitorGap}>Gap: Not built for haematology complexity</p>
            </div>
          </div>
          
          <div className={styles.ourEdge}>
            <h4>Our Unique Position</h4>
            <div className={styles.edgePoints}>
              <div className={styles.edgePoint}>
                <strong>Integrated, Not Siloed</strong>
                <p>We're the first to fuse morphology, flow cytometry, and genomics into a single diagnostic workflow</p>
              </div>
              <div className={styles.edgePoint}>
                <strong>Built for 2022 Guidelines</strong>
                <p>We purpose-built our platform for WHO & ICC 2022 mutation-based criteria—not retrofitting old systems</p>
              </div>
              <div className={styles.edgePoint}>
                <strong>Diagnosis to Decision</strong>
                <p>We go beyond classification: our platform integrates risk stratification (ELN 2022, IPSS-M) and treatment guidance</p>
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
        <div className={styles.cleanMarketLayout}>
          <div className={styles.marketHero}>
            <div className={styles.heroNumber}>$164B</div>
            <p className={styles.heroLabel}>AI in Healthcare Market by 2030</p>
            <p className={styles.heroGrowth}>49.1% CAGR</p>
            <p className={styles.heroReference}>
              <a href="https://www.globenewswire.com/news-release/2025/01/14/3009462/28124/en/164-Bn-Artificial-Intelligence-AI-in-Healthcare-Markets-Global-Forecast-to-2030-Market-to-Grow-at-a-CAGR-of-49-1-with-Koninklijke-Philips-Microsoft-Siemens-NVIDIA-and-Epic-Systems-.html" target="_blank" rel="noopener noreferrer">GlobeNewswire, 2025</a>
            </p>
          </div>
          
          <div className={styles.marketSegments}>
            <div className={styles.segment}>
              <h4>AI in Diagnostics</h4>
              <p className={styles.segmentGrowth}>$1.92B → $46.59B by 2034</p>
              <p className={styles.segmentCAGR}>37.6% CAGR</p>
              <p className={styles.segmentReference}>
                <a href="https://www.globenewswire.com/news-release/2025/05/29/3090079/0/en/46-5-Bn-AI-in-Medical-Diagnostics-Market-Opportunities-and-Strategies-to-2034-Machine-Learning-and-Computer-Vision-Set-to-Transform-AI-Diagnostics-Landscape.html" target="_blank" rel="noopener noreferrer">GlobeNewswire, 2025</a>
              </p>
            </div>
            <div className={styles.segment}>
              <h4>NHS AI Diagnostic Fund</h4>
              <p className={styles.segmentGrowth}>£21M targeting AI diagnostics</p>
              <p className={styles.segmentCAGR}>Cancer, stroke & heart disease focus</p>
              <p className={styles.segmentReference}>
                <a href="https://www.gov.uk/government/news/21-million-to-roll-out-artificial-intelligence-across-the-nhs" target="_blank" rel="noopener noreferrer">Gov.uk, June 2023</a>
              </p>
            </div>
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
                <h4>Founder</h4>
                <p>Background in Computer Science & FinTech AI. Driving the business vision.</p>
              </div>
            </div>
            
            <div className={styles.teamMember}>
              <div className={styles.memberPhoto}>
                <div className={styles.photoPlaceholder}>DC</div>
              </div>
              <div className={styles.memberInfo}>
                <h3>Dr. Daniel Clarke</h3>
                <h4>Data and analytics lead</h4>
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
                <p>Lead Haematology Diagnostician at Manchester Foundation Trust. Overseeing clinical validation and pilot deployment strategy.</p>
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
        </div>
      </div>
    )
  },
  {
    id: 12,
    title: "£750k to Transform Haematology",
    subtitle: "18 Months to Revenue & Series A",
    content: (
      <div className={styles.slideContent}>
        <div className={styles.runwayLayout}>
          <div className={styles.runwayTotal}>
            <div className={styles.totalAmount}>£750,000</div>
            <p className={styles.totalLabel}>Seed Investment | 18-Month Runway</p>
          </div>
          
          <div className={styles.runwayBreakdown}>
            <div className={styles.runwaySection}>
              <h4>Team (18 months)</h4>
              <div className={styles.runwayItems}>
                <div className={styles.runwayItem}>
                  <span>Founder & Engineer</span>
                  <span className={styles.runwayAmount}>£165k</span>
                </div>
                <div className={styles.runwayItem}>
                  <span>Compliance Officer</span>
                  <span className={styles.runwayAmount}>£105k</span>
                </div>
                <div className={styles.runwayItem}>
                  <span>Clinical Validation Lead</span>
                  <span className={styles.runwayAmount}>£90k</span>
                </div>
              </div>
              <div className={styles.sectionTotal}>£360k</div>
            </div>
            
            <div className={styles.runwaySection}>
              <h4>Regulatory & Pilots</h4>
              <div className={styles.runwayItems}>
                <div className={styles.runwayItem}>
                  <span>UKCA certification</span>
                  <span className={styles.runwayAmount}>£30k</span>
                </div>
                <div className={styles.runwayItem}>
                  <span>4 NHS pilot studies</span>
                  <span className={styles.runwayAmount}>£120k</span>
                </div>
              </div>
              <div className={styles.sectionTotal}>£150k</div>
            </div>
            
            <div className={styles.runwaySection}>
              <h4>Infrastructure & Buffer</h4>
              <div className={styles.runwayItems}>
                <div className={styles.runwayItem}>
                  <span>Cloud & AI compute</span>
                  <span className={styles.runwayAmount}>£15k</span>
                </div>
                <div className={styles.runwayItem}>
                  <span>Contingency & ops</span>
                  <span className={styles.runwayAmount}>£225k</span>
                </div>
              </div>
              <div className={styles.sectionTotal}>£240k</div>
            </div>
          </div>
          
          <div className={styles.runwayFooter}>
            <div className={styles.runwayMilestone}>
              <strong>Key Milestone:</strong> UKCA certification + 4 NHS pilot validations → Series A ready
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 14,
    title: "Revenue Model & Financial Projections",
    subtitle: "Path to Profitability",
    content: (
      <div className={styles.slideContent}>
        <div className={styles.revenueTableLayout}>
          <div className={styles.pricingSection}>
            <h3>Pricing Strategy</h3>
            <div className={styles.pricingCards}>
              <div className={styles.priceCard}>
                <h4>NHS Trusts</h4>
                <p>£50k-£100k/year</p>
              </div>
              <div className={styles.priceCard}>
                <h4>Private Hospitals</h4>
                <p>£75k-£150k/year</p>
              </div>
              <div className={styles.priceCard}>
                <h4>Diagnostic Labs</h4>
                <p>£100k-£200k/year</p>
              </div>
            </div>
          </div>
          
          <div className={styles.financialTable}>
            <table>
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Customers</th>
                  <th>Revenue</th>
                  <th>Net P/L</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Year 1</td>
                  <td>Pilots & validation</td>
                  <td>£0</td>
                  <td className={styles.lossCell}>-£450k</td>
                </tr>
                <tr>
                  <td>Year 2</td>
                  <td>UKCA approval, first sales</td>
                  <td>£0</td>
                  <td className={styles.lossCell}>-£300k</td>
                </tr>
                <tr>
                  <td>Year 3</td>
                  <td>10 NHS + 2 UK private</td>
                  <td>£700k</td>
                  <td className={styles.profitCell}>+£150k</td>
                </tr>
                <tr>
                  <td>Year 4</td>
                  <td>15 NHS + Middle East + 3 labs</td>
                  <td>£2.4M</td>
                  <td className={styles.profitCell}>+£1.2M</td>
                </tr>
                <tr>
                  <td>Year 5</td>
                  <td>20 NHS + Malaysia + GCC</td>
                  <td>£5.6M</td>
                  <td className={styles.profitCell}>+£3.2M</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className={styles.revenueFooter}>
            Built on WHO & ICC global standards—ready to scale worldwide
          </div>
        </div>
      </div>
    )
  },
  {
    id: 15,
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
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isCleanMode, setIsCleanMode] = useState(false);
  const containerRef = useRef(null);
  const printViewRef = useRef(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % pitchSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + pitchSlides.length) % pitchSlides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const enterFullscreen = () => {
    const el = containerRef.current || document.documentElement;
    if (!el) return;
    const request = el.requestFullscreen || el.webkitRequestFullscreen || el.msRequestFullscreen || el.mozRequestFullScreen;
    if (request) request.call(el);
  };

  const exitFullscreen = () => {
    const exit = document.exitFullscreen || document.webkitExitFullscreen || document.msExitFullscreen || document.mozCancelFullScreen;
    if (exit) exit.call(document);
  };

  const toggleFullscreen = () => {
    if (isFullscreen) {
      exitFullscreen();
    } else {
      enterFullscreen();
    }
  };

  const downloadSlideAsPNG = async () => {
    try {
      const html2canvas = (await import('html2canvas')).default;
      
      const slideElement = document.querySelector(`.${styles.slide}`);
      if (!slideElement) return;

      // Temporarily force full opacity and remove any transitions
      const originalStyle = slideElement.style.cssText;
      slideElement.style.opacity = '1';
      slideElement.style.transition = 'none';
      slideElement.style.animation = 'none';

      // Wait a tiny bit for the style to apply
      await new Promise(resolve => setTimeout(resolve, 100));

      const canvas = await html2canvas(slideElement, {
        scale: 3, // Higher scale for better quality
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        width: slideElement.offsetWidth,
        height: slideElement.offsetHeight,
        windowWidth: slideElement.offsetWidth,
        windowHeight: slideElement.offsetHeight,
        scrollX: 0,
        scrollY: 0
      });

      // Restore original style
      slideElement.style.cssText = originalStyle;

      // Convert canvas to blob and download
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        const slideTitle = pitchSlides[currentSlide].title || `Slide-${currentSlide + 1}`;
        const filename = `Haemio-SEIS-${slideTitle.replace(/[^a-z0-9]/gi, '-')}.png`;
        link.href = url;
        link.download = filename;
        link.click();
        URL.revokeObjectURL(url);
      }, 'image/png');
    } catch (error) {
      console.error('PNG download failed:', error);
      alert('Failed to download PNG. Please try screenshot instead.');
    }
  };

  const generatePDF = async () => {
    setIsGeneratingPDF(true);
    try {
      // Dynamically import html2pdf.js only when needed
      const html2pdf = (await import('html2pdf.js')).default;
      
      const element = printViewRef.current;
      const opt = {
        margin: [0.5, 0.5],
        filename: 'Haemio-SEIS-Pitch.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          letterRendering: true,
          logging: false
        },
        jsPDF: { 
          unit: 'in', 
          format: 'a4', 
          orientation: 'landscape',
          compress: true
        },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
      };

      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error('PDF generation failed:', error);
      alert('Failed to generate PDF. Please try using your browser\'s Print to PDF feature instead.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  useEffect(() => {
    const onFullscreenChange = () => {
      const isFs = Boolean(
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement ||
        document.mozFullScreenElement
      );
      setIsFullscreen(isFs);
    };

    const onKeyDown = (e) => {
      if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key === 'Escape') {
        if (isCleanMode) {
          setIsCleanMode(false);
        } else {
          exitFullscreen();
        }
      } else if (e.key === 'p' || e.key === 'P' || e.key === 'c' || e.key === 'C') {
        e.preventDefault();
        setIsCleanMode(!isCleanMode);
      } else if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'Home') {
        e.preventDefault();
        setCurrentSlide(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        setCurrentSlide(pitchSlides.length - 1);
      }
    };

    document.addEventListener('fullscreenchange', onFullscreenChange);
    document.addEventListener('webkitfullscreenchange', onFullscreenChange);
    document.addEventListener('MSFullscreenChange', onFullscreenChange);
    document.addEventListener('mozfullscreenchange', onFullscreenChange);
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('fullscreenchange', onFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', onFullscreenChange);
      document.removeEventListener('MSFullscreenChange', onFullscreenChange);
      document.removeEventListener('mozfullscreenchange', onFullscreenChange);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isCleanMode]);

  const slide = pitchSlides[currentSlide];

  return (
    <div className={styles.pitchDeck} ref={containerRef}>
      {/* Back to Main Button */}
      {!isCleanMode && (
        <a href="/" className={styles.backButton}>
          ← Back
        </a>
      )}

      {/* Control Buttons */}
      {!isCleanMode && (
        <div style={{ position: 'fixed', top: '12px', right: '12px', zIndex: 1000, display: 'flex', gap: '0.5rem' }}>
          <button 
            onClick={() => setIsCleanMode(true)}
            className={styles.navButton}
            title="Clean Mode for Screenshots (Press P)"
          >
            📸 Screenshot Mode
          </button>
          <button 
            onClick={downloadSlideAsPNG}
            className={styles.navButton}
          >
            📸 Download PNG
          </button>
          <button 
            onClick={generatePDF}
            className={styles.navButton}
            disabled={isGeneratingPDF}
          >
            {isGeneratingPDF ? 'Generating PDF...' : '📄 Download PDF'}
          </button>
          <button 
            onClick={toggleFullscreen}
            className={styles.navButton}
          >
            {isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          </button>
        </div>
      )}


      {/* Main Slide - Screen View */}
      <div className={styles.screenView}>
        <div 
          key={currentSlide} 
          className={styles.slide}
        >
          <div className="container">
            <div className={styles.slideHeader}>
              <h1>{slide.title}</h1>
              <p className={styles.slideSubtitle}>{slide.subtitle}</p>
            </div>
            
            {slide.content}
          </div>
        </div>
      </div>

      {/* All Slides - Print View */}
      <div className={styles.printView} ref={printViewRef}>
        {pitchSlides.map((slideData, index) => (
          <div key={index} className={styles.slide}>
            <div className="container">
              <div className={styles.slideHeader}>
                <h1>{slideData.title}</h1>
                <p className={styles.slideSubtitle}>{slideData.subtitle}</p>
              </div>
              
              {slideData.content}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      {!isCleanMode && (
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
      )}
    </div>
  );
}
