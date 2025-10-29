'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './investors.module.css';
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
    subtitle: "A New Year's conversation that changed everything",
    content: (
      <div className={styles.slideContent}>
        <div className={styles.compactStoryLayout}>
          <p className={styles.storyLead}>
            At a New Year's gathering, Robert — an ex-lymphoma survivor — was talking to John, a consultant haematologist involved in cutting-edge research, about advances in AI. John said:
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
    subtitle: "A problem in haematology today, all of oncology tomorrow",
    content: (
      <div className={styles.slideContent}>
        <h3>Haematology leads the way in genetics-driven diagnosis — and all oncology is heading in this direction</h3>
        
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

        <div className={styles.clinicalQuoteBox}>
          <div className={styles.clinicalQuote}>
            "Accurate diagnosis forms the absolute bedrock of effective therapy"
          </div>
          <div className={styles.clinicalQuoteSource}>— Dr. John Chadwick, The Christie NHS Foundation Trust</div>
        </div>
      </div>
    )
  },
  {
    id: 17,
    title: "The Human Cost",
    subtitle: "When delays mean death",
    content: (
      <div className={styles.slideContent}>
        <div className={styles.humanCostLayout}>
          <div className={styles.centerQuote}>
            <div className={styles.bigQuote}>
              "Blood cancer patients have no time to lose — they need a diagnosis fast"
            </div>
          </div>
          
          <div className={styles.costStats}>
            <div className={styles.statBlock}>
              <div className={styles.statNumber}>24 hours</div>
              <div className={styles.statLabel}>Cancer cells can double</div>
            </div>
            
            <div className={styles.statDivider}></div>
            
            <div className={styles.statBlock}>
              <div className={styles.statNumber}>Days → Weeks delay</div>
              <div className={styles.statLabel}>Current diagnosis time</div>
            </div>
            
            <div className={styles.statDivider}></div>
            
            <div className={styles.statBlock}>
              <div className={styles.statNumber}>Every delay</div>
              <div className={styles.statLabel}>Potentially fatal</div>
            </div>
          </div>
          
          <div className={styles.bottomStatement}>
            This isn't just an efficiency problem —  it's a patient survival problem
          </div>
        </div>
      </div>
    )
  },
  {
    id: 15,
    title: "The Transformation",
    subtitle: "Haem.io offers the only end-to-end solution",
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
    subtitle: "Blood cancer doesn't discriminate",
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
              <h3 style={{ fontWeight: '700' }}>Blood Cancer Reality</h3>
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
            Every single diagnosis needs fast, accurate pathways — that's what Haem.io delivers
          </div>
        </div>
      </div>
    )
  },
  {
    id: 16,
    title: "From Idea to Breakthrough",
    subtitle: "Building what works",
    content: (
      <div className={styles.slideContent}>
        <div className={styles.threeStepLayout}>
          <div className={styles.stepCard}>
            <div className={styles.stepNumber}>1</div>
            <div className={styles.stepContent}>
              <h4>Initial Approach: Pure AI</h4>
              <p>
                We built a system using LLMs for end-to-end diagnosis — feeding complete lab reports directly into the model. After rigorous testing against real clinical cases, we found critical failures: inconsistent classifications, missed diagnostic criteria, and no explainable reasoning trail.
              </p>
            </div>
          </div>
          <div className={styles.stepCard}>
            <div className={styles.stepNumber}>2</div>
            <div className={styles.stepContent}>
              <h4>Second Attempt: Hybrid AI + Logic</h4>
              <p>
                We used AI to extract structured parameters from reports, then applied formal logic engines with WHO/ICC diagnostic rules. This worked — but required too much upfront clinical input, making it impractical for real-world application.
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
    subtitle: "Not a black box: transparent, explainable, auditable",
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
    subtitle: "What makes us hard to replicate",
    content: (
      <div className={styles.slideContent}>
        <div className={styles.competitiveAdvantage}>
          <div className={styles.advantageGrid}>
            <div className={styles.advantagePoint}>
              <div className={styles.pointNumber}>1</div>
              <h4>Zero Integration Friction</h4>
              <p>Works with any report format — PDF, scanned documents, text files. No IT integration required. Hospitals can start using it immediately without changing their existing systems.</p>
            </div>
            
            <div className={styles.advantagePoint}>
              <div className={styles.pointNumber}>2</div>
              <h4>Clinical Expertise as Code</h4>
              <p>Our in-house haematologists formalise WHO/ICC diagnostic logic into validated decision trees. Extremely difficult to replicate this without deep clinical domain knowledge embedded in the team.</p>
            </div>
            
            <div className={styles.advantagePoint}>
              <div className={styles.pointNumber}>3</div>
              <h4>Full Diagnostic Pipeline</h4>
              <p>Not just a diagnosis — we deliver treatment recommendations, clinical trial matching, risk stratification, and MRD monitoring. A complete decision support system, not a point solution.</p>
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
    subtitle: "From raw data to actionable report in minutes",
    content: (
      <div className={styles.slideContent}>
        <div className={styles.howItWorksFlow}>
          <div className={styles.workflowStep}>
            <div className={styles.stepNumber}>01</div>
            <div className={styles.stepContent}>
              <h4>Upload</h4>
              <p>User uploads unstructured lab reports and adds clinical details</p>
              <div className={styles.stepTime}>~30 seconds</div>
            </div>
          </div>
          
          <div className={styles.workflowArrow}>→</div>
          
          <div className={styles.workflowStep}>
            <div className={styles.stepNumber}>02</div>
            <div className={styles.stepContent}>
              <h4>Analyse</h4>
              <p>Haem.io is the only system that combines AI extraction with formal logic to classify disease and assess risk</p>
              <div className={styles.stepTime}>~1 minute</div>
            </div>
          </div>
          
          <div className={styles.workflowArrow}>→</div>
          
          <div className={styles.workflowStep}>
            <div className={styles.stepNumber}>03</div>
            <div className={styles.stepContent}>
              <h4>Report</h4>
              <p>Comprehensive PDF report generated for clinical team</p>
              <div className={styles.stepTime}>~30 seconds</div>
            </div>
          </div>
        </div>
        
        <div className={styles.workflowInsight}>
          <div className={styles.timeComparison}>
            <div className={styles.beforeAfter}>
              <div className={styles.beforeTime}>
                <div className={styles.beforeLabel}>Before</div>
                <div className={styles.beforeValue}>Hours to Weeks</div>
                <div className={styles.beforeDescription}>Manual diagnosis process</div>
              </div>
              
              <div className={styles.comparisonArrow}>→</div>
              
              <div className={styles.afterTime}>
                <div className={styles.afterLabel}>With Haem.io</div>
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
    subtitle: "Clinical validation with leading NHS trusts",
    content: (
      <div className={styles.slideContent}>
        <div className={styles.compactTraction}>
          <div className={styles.tractionHighlight}>
            <div className={styles.bigStat}>£7M Grant Inclusion</div>
            <p>Invited to integrate Haem.io into UK National AML Relapse Study</p>
          </div>
          
          <div className={styles.tractionColumns}>
            <div className={styles.tractionCol}>
              <h4>Pilot Studies</h4>
              <ul>
                <li><strong>UK AML Research Network</strong> — Signed letter of intent for pilot study validation</li>
                <li><strong>Manchester Foundation Trust</strong> — In process of ethical approval</li>
                <li><strong>The Christie NHS</strong> — Kickoff stage with Prof. John Chadwick</li>
              </ul>
            </div>
            
            <div className={styles.tractionCol}>
              <h4>Clinical Endorsements</h4>
              <p className={styles.compactQuote}>
                "Haem.io offers the potential to standardise complicated cases and provide patients with a good quality diagnosis before commencing treatment."
              </p>
              <p className={styles.quoteSource}>— Dr. Tom Coats, Royal Devon & Exeter NHS Trust</p>
              <p className={styles.compactQuote}>
                "I believe Haem.io has the potential to revolutionise the quality of care that patients receive."
              </p>
              <p className={styles.quoteSource}>— Dr. John Chadwick, The Christie NHS Foundation Trust</p>
              <p className={styles.compactQuote}>
                "The UK AML Research Network is committed to participate in a future pilot study to help validate the platform's clinical utility."
              </p>
              <p className={styles.quoteSource}>— Prof. Charles Craddock, Chair, UK AML Research Network</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 11,
    title: "Our Expansion Path",
    subtitle: "Starting with the hardest problem first",
    content: (
      <div className={styles.slideContent}>
        <div className={styles.expansionPathLayout}>
          <div className={styles.pathStagesRow}>
            <div className={styles.pathStage} data-stage="current">
              <div className={styles.stageHeader}>
                <div className={styles.stageBadge} style={{background: '#10b981'}}>NOW</div>
                <h3>Acute Myeloid Leukemia</h3>
              </div>
              <div className={styles.stageContent}>
                <p className={styles.stageDescription}>
                  Hundreds of AML subtypes — the most complex blood cancer requiring integration of cytogenetics, flow cytometry, and molecular data
                </p>
                <div className={styles.stageStatus}>
                  <span className={styles.statusIcon}>✓</span>
                  <span className={styles.statusText}>Built and Working</span>
                </div>
              </div>
            </div>

            <div className={styles.pathArrowLarge}>→</div>

            <div className={styles.pathStage} data-stage="next">
              <div className={styles.stageHeader}>
                <div className={styles.stageBadge} style={{background: '#0891b2'}}>NEXT</div>
                <h3>All Blood Cancers</h3>
              </div>
              <div className={styles.stageContent}>
                <p className={styles.stageDescription}>
                  Myelodysplastic syndromes, lymphomas, multiple myeloma, and other haematological malignancies
                </p>
                <div className={styles.stageTimeline}>12-18 months</div>
              </div>
            </div>

            <div className={styles.pathArrowLarge}>→</div>

            <div className={styles.pathStage} data-stage="future">
              <div className={styles.stageHeader}>
                <div className={styles.stageBadge} style={{background: '#6366f1'}}>FUTURE</div>
                <h3>All Cancers</h3>
              </div>
              <div className={styles.stageContent}>
                <p className={styles.stageDescription}>
                  Expanding our AI + logic framework to solid tumors and beyond
                </p>
                <div className={styles.stageTimeline}>24+ months</div>
              </div>
            </div>
          </div>

          <div className={styles.expansionFooter}>
            Strategy: Master the most complex diagnosis first, then scale the framework
          </div>
        </div>
      </div>
    )
  },
  {
    id: 10,
    title: "Competitive Landscape",
    subtitle: "Haem.io is the only end-to-end solution for modern haematology",
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
    subtitle: "Riding the wave: multi-billion pund market transformation",
    content: (
      <div className={styles.slideContent}>
        <div className={styles.cleanMarketLayout}>
          <div className={styles.marketHero}>
            <div className={styles.heroNumber}>£120B</div>
            <p className={styles.heroLabel}>AI in Healthcare Market by 2030</p>
            <p className={styles.heroGrowth}>49.1% CAGR</p>
            <p className={styles.heroReference}>
              <a href="https://www.globenewswire.com/news-release/2025/01/14/3009462/28124/en/164-Bn-Artificial-Intelligence-AI-in-Healthcare-Markets-Global-Forecast-to-2030-Market-to-Grow-at-a-CAGR-of-49-1-with-Koninklijke-Philips-Microsoft-Siemens-NVIDIA-and-Epic-Systems-.html" target="_blank" rel="noopener noreferrer">GlobeNewswire, 2025</a>
            </p>
          </div>

          <p className={styles.currencyNote}>*Figures converted from USD to GBP using 16/10/2025 exchange rates and rounded down</p>
          
          <div className={styles.marketSegments}>
            <div className={styles.segment}>
              <h4>AI in Diagnostics</h4>
              <p className={styles.segmentGrowth}>£1B → £30B by 2034</p>
              <p className={styles.segmentCAGR}>37.6% CAGR</p>
              <p className={styles.segmentReference}>
                <a href="https://www.globenewswire.com/news-release/2025/05/29/3090079/0/en/46-5-Bn-AI-in-Medical-Diagnostics-Market-Opportunities-and-Strategies-to-2034-Machine-Learning-and-Computer-Vision-Set-to-Transform-AI-Diagnostics-Landscape.html" target="_blank" rel="noopener noreferrer">GlobeNewswire, 2025</a>
              </p>
            </div>
            <div className={styles.segment}>
              <h4>NHS AI Diagnostic Fund</h4>
              <p className={styles.segmentGrowth}>£20M targeting AI diagnostics</p>
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
    subtitle: "Expertise in AI, advanced analytics & medicine",
    content: (
      <div className={styles.slideContent}>
        <div className={styles.teamLayout}>
          <div className={styles.teamGrid}>
            <div className={styles.teamMember}>
              <div className={styles.memberPhoto}>
                <img src="/profile-pics/robbie.png" alt="Robert Edward Lee" />
              </div>
              <div className={styles.memberInfo}>
                <h3>Robert Edward Lee</h3>
                <h4>Founder & CEO</h4>
                <p>Background in Computer Science & FinTech AI. Leading software development and driving the business vision.</p>
              </div>
            </div>
            
            <div className={styles.teamMember}>
              <div className={styles.memberPhoto}>
                <img src="/profile-pics/danny.png" alt="Dr. Daniel Clarke" />
              </div>
              <div className={styles.memberInfo}>
                <h3>Dr. Daniel Clarke</h3>
                <h4>Founder & Data and Analytics Lead</h4>
                <p>PhD in Nuclear Physics from University of Manchester and CERN. Leading technology and platform architecture.</p>
              </div>
            </div>
            
            <div className={styles.teamMember}>
              <div className={styles.memberPhoto}>
                <img src="/profile-pics/john.png" alt="Dr. John Burthem" />
              </div>
              <div className={styles.memberInfo}>
                <h3>Dr. John Burthem</h3>
                <h4>Founder & Co-CMO</h4>
                <p>Lead Haematology Diagnostician at Manchester Foundation Trust. Focused on clinical logic development, validation, and pilot deployment strategy.</p>
              </div>
            </div>
            
            <div className={styles.teamMember}>
              <div className={styles.memberPhoto}>
                <img src="/profile-pics/luke.png" alt="Dr. Luke Carter-Brzezinski" />
              </div>
              <div className={styles.memberInfo}>
                <h3>Dr. Luke Carter-Brzezinski</h3>
                <h4>Founder & Co-CMO</h4>
                <p>Practising haematologist focused on clinical outreach, demonstrations, and pilot studies. Overseeing clinical strategy and validation.</p>
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
    subtitle: "18 months to revenue & Series A",
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
                  <span className={styles.runwayAmount}>£100k</span>
                </div>
                <div className={styles.runwayItem}>
                  <span>4 NHS pilot studies</span>
                  <span className={styles.runwayAmount}>£80k</span>
                </div>
              </div>
              <div className={styles.sectionTotal}>£180k</div>
            </div>
            
            <div className={styles.runwaySection}>
              <h4>Infrastructure & Operations</h4>
              <div className={styles.runwayItems}>
                <div className={styles.runwayItem}>
                  <span>Cloud & AI compute</span>
                  <span className={styles.runwayAmount}>£15k</span>
                </div>
                <div className={styles.runwayItem}>
                  <span>Legal & accounting</span>
                  <span className={styles.runwayAmount}>£25k</span>
                </div>
                <div className={styles.runwayItem}>
                  <span>Insurance & professional fees</span>
                  <span className={styles.runwayAmount}>£15k</span>
                </div>
                <div className={styles.runwayItem}>
                  <span>Office & equipment</span>
                  <span className={styles.runwayAmount}>£20k</span>
                </div>
                <div className={styles.runwayItem}>
                  <span>Marketing & business development</span>
                  <span className={styles.runwayAmount}>£15k</span>
                </div>
                <div className={styles.runwayItem}>
                  <span>Contingency buffer (24%)</span>
                  <span className={styles.runwayAmount}>£120k</span>
                </div>
              </div>
              <div className={styles.sectionTotal}>£210k</div>
            </div>
          </div>
          
          <div className={styles.runwayFooter}>
            <div className={styles.runwayMilestone}>
              <strong>Key Milestone:</strong> UKCA certification + 4 NHS pilot validations → Series A ready
            </div>
          </div>

          <div className={styles.financialNote}>
            *A more detailed breakdown is available in the financial projections document
          </div>
        </div>
      </div>
    )
  },
  {
    id: 14,
    title: "Revenue Model & Financial Projections",
    subtitle: "Path to profitability",
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
                  <th>Period</th>
                  <th>Customers</th>
                  <th>Contracts Signed</th>
                  <th>Revenue</th>
                  <th>Net P/L</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Year 1</td>
                  <td>2026</td>
                  <td>Pilots & validation</td>
                  <td>—</td>
                  <td>£0</td>
                  <td className={styles.lossCell}>-£540k</td>
                </tr>
                <tr>
                  <td>Year 2</td>
                  <td>2027</td>
                  <td>UKCA approval, first sales</td>
                  <td><strong>Q4: 2-3 trusts</strong></td>
                  <td>£0</td>
                  <td className={styles.lossCell}>-£300k</td>
                </tr>
                <tr>
                  <td>Year 3</td>
                  <td>2028</td>
                  <td>10 NHS + 2 UK private</td>
                  <td>10 additional</td>
                  <td>£700k</td>
                  <td className={styles.profitCell}>+£40k</td>
                </tr>
                <tr>
                  <td>Year 4</td>
                  <td>2029</td>
                  <td>15 NHS + Middle East + 3 labs</td>
                  <td>18 total active</td>
                  <td>£2.4M</td>
                  <td className={styles.profitCell}>+£1.2M</td>
                </tr>
                <tr>
                  <td>Year 5</td>
                  <td>2030</td>
                  <td>20 NHS + Malaysia + GCC</td>
                  <td>25+ total active</td>
                  <td>£5.6M</td>
                  <td className={styles.profitCell}>+£3.2M</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className={styles.revenueFooter}>
            <strong>Note:</strong> First contracts signed Q4 2027. Revenue recognized Q1 2028+ per accounting standards and NHS payment cycles.
          </div>
          
          <div className={styles.revenueFooter} style={{marginTop: '0.5rem', fontStyle: 'normal'}}>
            Built on WHO & ICC global standards—ready to scale worldwide
          </div>
        </div>
      </div>
    )
  },
  {
    id: 18,
    title: "Alternative Revenue Stream",
    subtitle: "Fast-track diagnostic service for underserved hospitals",
    content: (
      <div className={styles.slideContent}>
        <div className={styles.alternativeRevenueLayout}>
          <div className={styles.revenueStreamIntro}>
            <p className={styles.leadText}>
              While hospitals adopt our platform, we can immediately serve smaller and private hospitals 
              with an <strong>outsourced diagnostic desk</strong>
            </p>
          </div>

          <div className={styles.serviceModelGrid}>
            <div className={styles.serviceColumn}>
              <h3>🏥 The Problem</h3>
              <ul className={styles.problemList}>
                <li>Smaller NHS trusts lack specialist haematologists</li>
                <li>Private hospitals want faster turnaround than NHS centers</li>
                <li>Current outsourcing to 5 big centers = weeks of delay</li>
                <li>High costs, long waits, patient anxiety</li>
              </ul>
            </div>

            <div className={`${styles.serviceColumn} ${styles.solutionColumn}`}>
              <h3>✓ Our Solution</h3>
              <ul className={styles.solutionList}>
                <li><strong>Expert team:</strong> Dr. Luke Carter-Brzezinski & Dr. John Burthem</li>
                <li><strong>Haem.io-powered:</strong> Our platform enables rapid analysis</li>
                <li><strong>48-hour turnaround:</strong> vs weeks at traditional centers</li>
                <li><strong>Premium service:</strong> White-glove support for urgent cases</li>
              </ul>
            </div>
          </div>

          <div className={styles.pricingHighlight}>
            <div className={styles.priceBox}>
              <div className={styles.priceAmount}>£1,000–£1,500</div>
              <div className={styles.priceLabel}>per diagnostic case</div>
            </div>
            <div className={styles.priceDetails}>
              <p>• Target: 10-20 cases/month initially</p>
              <p>• Revenue potential: £120k-£360k/year</p>
              <p>• Scalable with additional consultants</p>
            </div>
          </div>

          <div className={styles.revenueStreamFooter}>
            <strong>Strategic benefit:</strong> Generates immediate revenue while building platform adoption and demonstrating clinical value
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
            <p>We're not just building another AI diagnostic tool. We're creating the framework for complex medical decision-making.</p>
          </div>
          
          
        </div>
        
       
      </div>
    )
  }
];

export default function Pitch({ hideControls = false }) {
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
        const filename = `Haemio-${slideTitle.replace(/[^a-z0-9]/gi, '-')}.png`;
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
        filename: 'Haemio-Investor-Pitch.pdf',
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
      {!isCleanMode && !hideControls && (
        <a href="/" className={styles.backButton}>
          ← Back
        </a>
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