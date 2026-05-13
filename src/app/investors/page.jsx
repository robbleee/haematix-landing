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
            <div className={styles.seedBadge}>Seed Round: £750,000</div>
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
    title: "The Problem",
    subtitle: "Haematology diagnosis is broken",
    content: (
      <div className={styles.slideContent}>
        <div className={styles.humanCostLayout}>
          <div className={styles.costStats}>
            <div className={styles.statBlock}>
              <div className={styles.statNumber}>Days to Weeks</div>
              <div className={styles.statLabel}>Current diagnosis time</div>
            </div>

            <div className={styles.statDivider}></div>

            <div className={styles.statBlock}>
              <div className={styles.statNumber}>24 hours</div>
              <div className={styles.statLabel}>Cancer cells can double</div>
            </div>

            <div className={styles.statDivider}></div>

            <div className={styles.statBlock}>
              <div className={styles.statNumber}>15,000+</div>
              <div className={styles.statLabel}>UK blood cancer deaths/year</div>
            </div>
          </div>

          <div className={styles.diagnosticFlow}>
            <div className={styles.flowPanel}>
              <h4>Unstructured Data</h4>
              <p>Clinicians manually synthesize genetic markers from cytogenetics, flow cytometry, and molecular data — each in different formats with no standardization.</p>
            </div>

            <div className={styles.flowArrow}>→</div>

            <div className={styles.diagnostician}>
              <h4>Overwhelmed Diagnostician</h4>
              <p>Hours spent manually extracting information before any diagnostic logic can begin. Smaller trusts outsource to 5 specialist centres at great cost.</p>
            </div>

            <div className={styles.flowArrow}>→</div>

            <div className={styles.flowPanel}>
              <h4>Impossible Complexity</h4>
              <p>WHO 2022 and ICC 2022 guidelines contain hundreds of interconnected diagnostic pathways — too complex for consistent human application.</p>
            </div>
          </div>

          <div className={styles.bottomStatement}>
            This isn't an efficiency problem — it's a patient survival problem
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'traction',
    title: "Early Traction",
    subtitle: "Product built, clinical partnerships secured, international validation",
    content: (
      <div className={styles.slideContent}>
        <div className={styles.advantageGrid} style={{gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginTop: '1rem'}}>
          <div className={styles.advantagePoint} style={{padding: '2rem', borderRadius: '20px', background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', border: '2px solid var(--primary-color)'}}>
            <div className={styles.pointNumber} style={{background: 'var(--primary-color)'}}>1</div>
            <h4>Working Product</h4>
            <p>AML classifier, MDS classifier, and clinical trial matching — all <strong>LIVE in production</strong>. Covers all WHO 2022 and ICC 2022 subtypes.</p>
          </div>

          <div className={styles.advantagePoint} style={{padding: '2rem', borderRadius: '20px', background: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.08)'}}>
            <div className={styles.pointNumber}>2</div>
            <h4>Pharma Grant Pipeline</h4>
            <p><strong>Pfizer, Servier, Jazz, and J&J</strong> in active discussions for ~£210k in grant funding. All expressing strong interest.</p>
          </div>

          <div className={styles.advantagePoint} style={{padding: '2rem', borderRadius: '20px', background: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.08)'}}>
            <div className={styles.pointNumber}>3</div>
            <h4>£7M National Grant</h4>
            <p>Co-applicant on <strong>£7M UK AML Research Network</strong> grant for national AML relapse MDT standardisation.</p>
          </div>

          <div className={styles.advantagePoint} style={{padding: '2rem', borderRadius: '20px', background: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.08)'}}>
            <div className={styles.pointNumber}>4</div>
            <h4>4 NHS Endorsements</h4>
            <p>Letters of support from <strong>consultant haematologists</strong> at The Christie, Royal Devon, Blackpool Teaching Hospitals, and the UK AML Research Network.</p>
          </div>

          <div className={styles.advantagePoint} style={{padding: '2rem', borderRadius: '20px', background: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.08)'}}>
            <div className={styles.pointNumber}>5</div>
            <h4>International Interest</h4>
            <p><strong>Cambodia demo</strong> completed — strong interest in deployment. Built on WHO/ICC global standards — works in any country without modification.</p>
          </div>

          <div className={styles.advantagePoint} style={{padding: '2rem', borderRadius: '20px', background: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.08)'}}>
            <div className={styles.pointNumber}>6</div>
            <h4>IP Strategy</h4>
            <p>IP assignment from <strong>Manchester Foundation Trust</strong> in active negotiation. Core codebase independently developed by founding team.</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 2,
    title: "The Solution",
    subtitle: "End-to-end AI-powered haematology diagnostics",
    content: (
      <div className={styles.slideContent}>
        <h3>Haem.io is the only platform that combines AI data extraction with formal diagnostic logic engines to deliver complete haematology classification, risk stratification, and treatment guidance.</h3>

        <div className={styles.horizontalFlow}>
          <div className={styles.hFlowStep}>
            <span className={styles.miniNum}>1</span>
            <span>Upload unstructured lab report</span>
          </div>
          <div className={styles.hFlowArrow}>→</div>
          <div className={styles.hFlowStep}>
            <span className={styles.miniNum}>2</span>
            <span>AI extracts + Logic engine classifies</span>
          </div>
          <div className={styles.hFlowArrow}>→</div>
          <div className={styles.hFlowStep}>
            <span className={styles.miniNum}>3</span>
            <span>Complete diagnosis + treatment plan</span>
          </div>
        </div>

        <div className={styles.transformResult} style={{borderColor: 'var(--primary-color)', color: 'var(--primary-color)', maxWidth: '400px', margin: '0 auto 2rem'}}>
          ~2 minutes · Accurate · Explainable
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
                <div className={styles.afterValue}>~2 Minutes</div>
                <div className={styles.afterDescription}>Complete diagnostic report</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 3,
    title: "Step 1: AI Extracts Structure from Chaos",
    subtitle: "Unstructured lab reports → clean, structured data in seconds",
    content: (
      <div className={styles.slideContent}>
        <div className={styles.demoCard} style={{maxWidth: '95%', margin: '0 auto'}}>
          <img src="/screenshots/data-input-summary.png" alt="Input Data Summary" style={{width: '100%', display: 'block', maxHeight: '560px', objectFit: 'contain', objectPosition: 'top'}} />
        </div>
      </div>
    )
  },
  {
    id: 4,
    title: "Step 2: Logic Engine Runs Diagnostic Pathways",
    subtitle: "WHO 2022 & ICC 2022 classification — fully explainable, fully auditable",
    content: (
      <div className={styles.slideContent}>
        <div className={styles.demoCard} style={{maxWidth: '95%', margin: '0 auto'}}>
          <img src="/screenshots/classif-results.png" alt="Classification Results" style={{width: '100%', display: 'block', maxHeight: '560px', objectFit: 'contain', objectPosition: 'top'}} />
        </div>
      </div>
    )
  },
  {
    id: 5,
    title: "Step 3: Every Decision is Traceable",
    subtitle: "Full execution trace — every criterion checked, every pathway followed",
    content: (
      <div className={styles.slideContent}>
        <div className={styles.demoCard} style={{maxWidth: '95%', margin: '0 auto'}}>
          <img src="/screenshots/trace.png" alt="Execution Trace" style={{width: '100%', display: 'block', maxHeight: '560px', objectFit: 'contain', objectPosition: 'top'}} />
        </div>
      </div>
    )
  },
  {
    id: 'trials',
    title: "Step 4: Clinical Trial Matching",
    subtitle: "Automatically matches patients to eligible trials based on their diagnosis",
    content: (
      <div className={styles.slideContent}>
        <div className={styles.demoCard} style={{maxWidth: '95%', margin: '0 auto'}}>
          <img src="/screenshots/clin-trials.png" alt="Clinical Trial Matching" style={{width: '100%', display: 'block', maxHeight: '560px', objectFit: 'contain', objectPosition: 'top'}} />
        </div>
      </div>
    )
  },
  {
    id: 'how-it-works',
    title: "How It Works",
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
    id: 'why-we-win',
    title: "Why We Win",
    subtitle: "What makes us hard to replicate",
    content: (
      <div className={styles.slideContent}>
        <div className={styles.advantageGrid} style={{gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem', marginTop: '1rem'}}>
          <div className={styles.advantagePoint} style={{padding: '2.5rem', borderRadius: '20px', background: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.08)'}}>
            <div className={styles.pointNumber}>1</div>
            <h4>Zero Integration Friction</h4>
            <p>Works with any report format — PDF, scanned documents, text files. No IT integration required. Hospitals start using it immediately without changing existing systems.</p>
          </div>

          <div className={styles.advantagePoint} style={{padding: '2.5rem', borderRadius: '20px', background: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.08)'}}>
            <div className={styles.pointNumber}>2</div>
            <h4>Clinical Expertise as Code</h4>
            <p>Thousands of hours of consultant haematologists iterating directly with engineers to codify WHO/ICC diagnostic logic. This clinical-engineering feedback loop took years — it cannot be replicated by bolting AI onto existing platforms.</p>
          </div>

          <div className={styles.advantagePoint} style={{padding: '2.5rem', borderRadius: '20px', background: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.08)'}}>
            <div className={styles.pointNumber}>3</div>
            <h4>Full Diagnostic Pipeline</h4>
            <p>Not just a diagnosis — we deliver treatment recommendations, clinical trial matching, risk stratification, and MRD monitoring. A complete decision support system, not a point solution.</p>
          </div>

          <div className={styles.advantagePoint} style={{padding: '2.5rem', borderRadius: '20px', background: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.08)'}}>
            <div className={styles.pointNumber}>4</div>
            <h4>Explainable by Design</h4>
            <p>Our logic engine produces a full derivation trace — every diagnostic decision is auditable. Critical for clinical trust, regulatory approval, and clinician adoption.</p>
          </div>

          <div className={styles.advantagePoint} style={{padding: '2.5rem', borderRadius: '20px', background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', gridColumn: '1 / -1'}}>
            <div className={styles.pointNumber} style={{background: 'var(--primary-color)'}}>5</div>
            <h4>Global by Default</h4>
            <p>Built on WHO 2022 and ICC 2022 international standards. Works in any country, any hospital, from day one. No localization or adaptation needed — the diagnostic logic is universal.</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 51,
    title: "Competitive Landscape",
    subtitle: "We are the only end-to-end solution for modern haematology",
    content: (
      <div className={styles.slideContent}>
        <div className={styles.competitionGrid} style={{gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginBottom: '2rem'}}>
          <div className={styles.competitorCard}>
            <h4>Lab Automation</h4>
            <p className={styles.competitorExample}>e.g., Scopio Labs</p>
            <p className={styles.competitorFocus}>AI-powered morphology analysis</p>
            <p className={styles.competitorGap}>Gap: No genomic integration or WHO/ICC classification</p>
          </div>
          <div className={styles.competitorCard}>
            <h4>Genomics Platforms</h4>
            <p className={styles.competitorExample}>e.g., SOPHiA GENETICS</p>
            <p className={styles.competitorFocus}>Genomic sequencing analysis</p>
            <p className={styles.competitorGap}>Gap: No automated diagnosis or risk stratification</p>
          </div>
          <div className={styles.competitorCard}>
            <h4>AI Pathology</h4>
            <p className={styles.competitorExample}>e.g., PathAI</p>
            <p className={styles.competitorFocus}>Solid tumor histology</p>
            <p className={styles.competitorGap}>Gap: Not built for haematology complexity</p>
          </div>
        </div>

        <div className={styles.ourEdge}>
          <h4>Our Unique Position</h4>
          <div className={styles.edgePoints}>
            <div className={styles.edgePoint}>
              <strong>Integrated, Not Siloed</strong>
              <p>First to fuse morphology, flow cytometry, and genomics into a single diagnostic workflow</p>
            </div>
            <div className={styles.edgePoint}>
              <strong>Built for 2022 Guidelines</strong>
              <p>Purpose-built for WHO & ICC 2022 mutation-based criteria — not retrofitting old systems</p>
            </div>
            <div className={styles.edgePoint}>
              <strong>Diagnosis to Decision</strong>
              <p>Beyond classification — risk stratification (ELN 2022, IPSS-M), treatment guidance, trial matching</p>
            </div>
          </div>
        </div>

        <div style={{background: '#f8fafc', borderRadius: '12px', padding: '1.25rem 1.5rem', marginTop: '1.5rem', borderLeft: '4px solid var(--primary-color)'}}>
          <p style={{margin: 0, fontSize: '1rem', color: '#334155', lineHeight: 1.6}}>
            <strong>Why can't well-funded competitors build this?</strong> Classification logic required thousands of hours of specialist haematologists iterating directly with engineers. It's codified clinical judgement built over years — not a dataset you can license or an algorithm you can train.
          </p>
        </div>
      </div>
    )
  },
  {
    id: 6,
    title: "Market Opportunity",
    subtitle: "All cancer diagnostics are going genomic. Haematology is the leading edge.",
    content: (
      <div className={styles.slideContent}>
        <div style={{display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: '3rem', alignItems: 'start', marginTop: '0.5rem'}}>

          {/* Left: Genomic Complexity Ladder */}
          <div style={{display: 'flex', flexDirection: 'column', gap: '0'}}>
            <div style={{fontSize: '1rem', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem'}}>Genomic Complexity by Cancer Type</div>

            {/* Haematology - top of ladder */}
            <div style={{display: 'flex', alignItems: 'center', padding: '1rem 1.5rem', background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)', borderRadius: '12px', border: '2px solid var(--primary-color)', marginBottom: '0.6rem'}}>
              <div style={{width: '100%'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem'}}>
                  <span style={{fontWeight: '700', color: 'var(--primary-color)', fontSize: '1.2rem'}}>Haematology</span>
                  <span style={{fontSize: '0.85rem', fontWeight: '600', background: 'var(--primary-color)', color: 'white', padding: '0.2rem 0.75rem', borderRadius: '99px'}}>WE ARE HERE</span>
                </div>
                <div style={{height: '10px', background: '#e2e8f0', borderRadius: '99px', overflow: 'hidden'}}>
                  <div style={{height: '100%', width: '95%', background: 'var(--primary-color)', borderRadius: '99px'}}></div>
                </div>
                <div style={{fontSize: '0.9rem', color: '#475569', marginTop: '0.35rem'}}>200+ subtypes · 60+ gene mutations · WHO + ICC dual guidelines</div>
              </div>
            </div>

            {/* Other cancer types - descending complexity */}
            {[
              { name: 'Lung Cancer', width: '70%', detail: 'EGFR, ALK, ROS1, KRAS', color: '#6366f1' },
              { name: 'Breast Cancer', width: '55%', detail: 'HER2, BRCA, multi-gene', color: '#8b5cf6' },
              { name: 'Colorectal', width: '45%', detail: 'MSI, KRAS, BRAF', color: '#a78bfa' },
              { name: 'Prostate', width: '30%', detail: 'Emerging markers', color: '#c4b5fd' },
            ].map((cancer, i) => (
              <div key={i} style={{padding: '0.6rem 1.5rem', background: 'white', borderRadius: '10px', marginBottom: '0.4rem', border: '1px solid #e2e8f0'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem'}}>
                  <span style={{fontWeight: '600', color: '#334155', fontSize: '1.05rem'}}>{cancer.name}</span>
                  <span style={{fontSize: '0.85rem', color: '#94a3b8'}}>{cancer.detail}</span>
                </div>
                <div style={{height: '7px', background: '#f1f5f9', borderRadius: '99px', overflow: 'hidden'}}>
                  <div style={{height: '100%', width: cancer.width, background: cancer.color, borderRadius: '99px', opacity: 0.7}}></div>
                </div>
              </div>
            ))}

            <div style={{background: '#f8fafc', borderRadius: '12px', padding: '1.1rem 1.5rem', marginTop: '0.6rem', borderLeft: '4px solid var(--primary-color)'}}>
              <p style={{margin: 0, fontSize: '1.05rem', color: '#334155', lineHeight: 1.5}}>
                <strong>Solve the hardest cancer first</strong> — the framework, credibility, and regulatory pathway extend to every cancer type as genomic classification becomes standard.
              </p>
            </div>
          </div>

          {/* Right: Market Numbers */}
          <div style={{display: 'flex', flexDirection: 'column', gap: '0.85rem'}}>
            <div style={{background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)', borderRadius: '16px', padding: '1.5rem', textAlign: 'center'}}>
              <div style={{fontSize: '3.25rem', fontWeight: '700', color: 'var(--primary-color)', lineHeight: 1}}>1.2M</div>
              <div style={{fontSize: '1.05rem', color: '#475569', marginTop: '0.4rem', fontWeight: '500'}}>blood cancer diagnoses / year globally</div>
              <div style={{fontSize: '0.9rem', color: '#64748b', marginTop: '0.2rem'}}>40,000+ in the UK alone — most at non-specialist centres that outsource at significant cost</div>
              <div style={{fontSize: '0.8rem', color: 'var(--primary-color)', marginTop: '0.3rem', fontWeight: '500'}}>WHO/ICC are global standards — product works internationally without modification</div>
            </div>

            <div style={{background: 'linear-gradient(135deg, #eff6ff, #dbeafe)', borderRadius: '16px', padding: '1.5rem', textAlign: 'center'}}>
              <div style={{fontSize: '3.25rem', fontWeight: '700', color: '#1d4ed8', lineHeight: 1}}>£30B</div>
              <div style={{fontSize: '1.05rem', color: '#475569', marginTop: '0.4rem', fontWeight: '500'}}>AI medical diagnostics market by 2034</div>
              <div style={{fontSize: '0.9rem', color: '#64748b', marginTop: '0.2rem'}}>37.6% CAGR — driven by genomic complexity</div>
            </div>

            <div style={{background: 'linear-gradient(135deg, #fdf4ff, #fae8ff)', borderRadius: '16px', padding: '1.25rem', textAlign: 'center'}}>
              <div style={{fontSize: '2.25rem', fontWeight: '700', color: '#7e22ce', lineHeight: 1}}>£20M</div>
              <div style={{fontSize: '1.05rem', color: '#475569', marginTop: '0.35rem', fontWeight: '500'}}>NHS AI Diagnostic Fund</div>
              <div style={{fontSize: '0.9rem', color: '#64748b', marginTop: '0.2rem'}}>Government tailwind behind exactly what we build</div>
            </div>

            <div style={{background: 'white', borderRadius: '12px', padding: '1.1rem', border: '1px solid #e2e8f0', textAlign: 'center'}}>
              <div style={{fontSize: '0.9rem', color: '#64748b', marginBottom: '0.3rem'}}>Beachhead → Total addressable</div>
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem'}}>
                <div>
                  <div style={{fontSize: '1.6rem', fontWeight: '700', color: 'var(--primary-color)'}}>£2B</div>
                  <div style={{fontSize: '0.85rem', color: '#64748b'}}>Haem diagnostics</div>
                </div>
                <div style={{fontSize: '1.5rem', color: '#cbd5e1'}}>→</div>
                <div>
                  <div style={{fontSize: '1.6rem', fontWeight: '700', color: '#6366f1'}}>£30B</div>
                  <div style={{fontSize: '0.85rem', color: '#64748b'}}>All oncology AI</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 7,
    title: "Business Model",
    subtitle: "SaaS licensing to NHS trusts, private hospitals, and diagnostic labs",
    content: (
      <div className={styles.slideContent}>
        <div className={styles.revenueTableLayout}>
          <div className={styles.pricingSection}>
            <h3>Annual SaaS Licensing</h3>
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

          <div className={styles.revenueSimple}>
            <div className={styles.revenueYear}>
              <h4>Year 1 (2026)</h4>
              <p>Pilots & clinical validation with 4 NHS trusts. No revenue.</p>
            </div>
            <div className={styles.revenueYear}>
              <h4>Year 2 (2027)</h4>
              <p>Class I registration complete. First 2-3 contracts signed Q2-Q3.</p>
            </div>
            <div className={styles.revenueYear}>
              <h4>Year 3 (2028)</h4>
              <p>12 customers. ~£700k revenue. Breakeven.</p>
            </div>
          </div>

        </div>
      </div>
    )
  },
  {
    id: 'roi',
    title: "ROI: Why Hospitals Switch",
    subtitle: "Outsourcing costs thousands per case. Haem.io costs a fraction.",
    content: (
      <div className={styles.slideContent}>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem', marginTop: '1rem'}}>

          <div style={{background: '#fef2f2', borderRadius: '20px', padding: '2.5rem', border: '2px solid #fca5a5'}}>
            <div style={{fontSize: '0.85rem', fontWeight: '600', color: '#dc2626', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem'}}>Current: Outsourced Diagnosis</div>
            <div style={{display: 'flex', flexDirection: 'column', gap: '1.25rem'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px solid #fecaca', paddingBottom: '0.75rem'}}>
                <span style={{color: '#334155', fontWeight: '500'}}>Cost per case</span>
                <span style={{fontSize: '1.5rem', fontWeight: '700', color: '#dc2626'}}>~£2,000+</span>
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px solid #fecaca', paddingBottom: '0.75rem'}}>
                <span style={{color: '#334155', fontWeight: '500'}}>Turnaround</span>
                <span style={{fontSize: '1.25rem', fontWeight: '700', color: '#dc2626'}}>Days to Weeks</span>
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px solid #fecaca', paddingBottom: '0.75rem'}}>
                <span style={{color: '#334155', fontWeight: '500'}}>Specialist centres in UK</span>
                <span style={{fontSize: '1.25rem', fontWeight: '700', color: '#dc2626'}}>Only 5</span>
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
                <span style={{color: '#334155', fontWeight: '500'}}>Annual cost (50 cases)</span>
                <span style={{fontSize: '1.5rem', fontWeight: '700', color: '#dc2626'}}>£100,000+</span>
              </div>
            </div>
          </div>

          <div style={{background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)', borderRadius: '20px', padding: '2.5rem', border: '2px solid var(--primary-color)'}}>
            <div style={{fontSize: '0.85rem', fontWeight: '600', color: 'var(--primary-color)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem'}}>With Haem.io</div>
            <div style={{display: 'flex', flexDirection: 'column', gap: '1.25rem'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px solid #bbf7d0', paddingBottom: '0.75rem'}}>
                <span style={{color: '#334155', fontWeight: '500'}}>Annual license</span>
                <span style={{fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary-color)'}}>£50-100k</span>
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px solid #bbf7d0', paddingBottom: '0.75rem'}}>
                <span style={{color: '#334155', fontWeight: '500'}}>Turnaround</span>
                <span style={{fontSize: '1.25rem', fontWeight: '700', color: 'var(--primary-color)'}}>~2 Minutes</span>
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px solid #bbf7d0', paddingBottom: '0.75rem'}}>
                <span style={{color: '#334155', fontWeight: '500'}}>Cases included</span>
                <span style={{fontSize: '1.25rem', fontWeight: '700', color: 'var(--primary-color)'}}>Unlimited</span>
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
                <span style={{color: '#334155', fontWeight: '500'}}>IT integration needed</span>
                <span style={{fontSize: '1.25rem', fontWeight: '700', color: 'var(--primary-color)'}}>None</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{background: '#f8fafc', borderRadius: '16px', padding: '1.5rem 2rem', marginTop: '2rem', borderLeft: '4px solid var(--primary-color)', textAlign: 'center'}}>
          <p style={{margin: 0, fontSize: '1.15rem', color: '#334155', lineHeight: 1.6}}>
            <strong>~140+ NHS trusts</strong> lack specialist haematology diagnostics and outsource at significant cost.
            <br/>A trust processing <strong>50 cases/year at £2k = £100k</strong>. Haem.io license: <strong>£50-100k</strong>. The product pays for itself.
          </p>
        </div>

        <div style={{textAlign: 'center', marginTop: '1.25rem'}}>
          <p style={{margin: 0, fontSize: '1rem', color: '#64748b'}}>
            ~40,000 AML/MDS cases diagnosed in the UK annually
          </p>
        </div>
      </div>
    )
  },
  {
    id: 8,
    title: "Clinical Validation",
    subtitle: "Endorsed by leading NHS haematologists",
    content: (
      <div className={styles.slideContent}>
        <div className={styles.validationLayout}>
          <div className={styles.quoteGrid}>
            <div className={styles.quoteCard}>
              <div className={styles.quoteText}>
                "Haem.io has the potential to transform diagnosis and decision making for patients with haematological malignancies across the NHS."
              </div>
              <div className={styles.quoteAttribution}>
                <strong>Prof Charles Craddock CBE</strong>
                <span>Chair, UK AML Research Network</span>
                <span>University of Warwick</span>
              </div>
            </div>

            <div className={styles.quoteCard}>
              <div className={styles.quoteText}>
                "Haem.io has the potential to revolutionise the quality of care that patients receive."
              </div>
              <div className={styles.quoteAttribution}>
                <strong>Dr John Chadwick</strong>
                <span>Consultant Haematologist</span>
                <span>The Christie NHS Foundation Trust</span>
              </div>
            </div>

            <div className={styles.quoteCard}>
              <div className={styles.quoteText}>
                "A real step forward in what technology can offer in supporting clinicians to make accurate clinical diagnoses."
              </div>
              <div className={styles.quoteAttribution}>
                <strong>Dr Tom Coats</strong>
                <span>Haematology Consultant</span>
                <span>Royal Devon & Exeter NHS Trust</span>
              </div>
            </div>

            <div className={styles.quoteCard}>
              <div className={styles.quoteText}>
                "I would wholeheartedly recommend this platform. This will be of significant use for clinicians in the front line."
              </div>
              <div className={styles.quoteAttribution}>
                <strong>Dr P A Cahalin</strong>
                <span>Consultant Haematologist</span>
                <span>Blackpool Teaching Hospitals NHS Trust</span>
              </div>
            </div>
          </div>

          <div className={styles.validationFooter}>
            <span>4 Letters of Support</span>
            <span>•</span>
            <span>Letter of Intent for Pilot Study</span>
            <span>•</span>
            <span>3 NHS Trusts in pipeline</span>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 9,
    title: "Expansion Path",
    subtitle: "Starting with the hardest problem first",
    content: (
      <div className={styles.slideContent}>
        <div className={styles.expansionPathLayout}>
          <div className={styles.pathStagesRow}>
            <div className={styles.pathStage} data-stage="current">
              <div className={styles.stageHeader}>
                <div className={styles.stageBadge} style={{background: '#10b981'}}>NOW</div>
                <h3>AML + MDS</h3>
              </div>
              <div className={styles.stageContent}>
                <p className={styles.stageDescription}>
                  The most complex blood cancers — hundreds of subtypes requiring integration of cytogenetics, flow cytometry, molecular data, and clinical history
                </p>
                <div style={{display: 'flex', flexDirection: 'column', gap: '0.3rem', marginTop: '0.5rem'}}>
                  <div className={styles.stageStatus}>
                    <span className={styles.statusIcon}>✓</span>
                    <span className={styles.statusText}>AML Classifier</span>
                  </div>
                  <div className={styles.stageStatus}>
                    <span className={styles.statusIcon}>✓</span>
                    <span className={styles.statusText}>MDS Classifier</span>
                  </div>
                  <div className={styles.stageStatus}>
                    <span className={styles.statusIcon}>✓</span>
                    <span className={styles.statusText}>Clinical Trial Matching</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.pathArrowLarge}>→</div>

            <div className={styles.pathStage} data-stage="next">
              <div className={styles.stageHeader}>
                <div className={styles.stageBadge} style={{background: '#0891b2'}}>NEXT</div>
                <h3>Other Blood Cancers</h3>
              </div>
              <div className={styles.stageContent}>
                <p className={styles.stageDescription}>
                  Lymphomas, multiple myeloma, and other haematological malignancies
                </p>
                <div className={styles.stageTimeline}>12-18 months</div>
              </div>
            </div>

            <div className={styles.pathArrowLarge}>→</div>

            <div className={styles.pathStage} data-stage="future">
              <div className={styles.stageHeader}>
                <div className={styles.stageBadge} style={{background: '#6366f1'}}>FUTURE</div>
                <h3>Solid Tumors</h3>
              </div>
              <div className={styles.stageContent}>
                <p className={styles.stageDescription}>
                  Expanding our AI + logic framework to genomics-driven solid tumor diagnostics
                </p>
                <div className={styles.stageTimeline}>36+ months</div>
              </div>
            </div>
          </div>

          <div className={styles.expansionFooter}>
            Strategy: Master the most complex diagnosis first, then scale the framework.
            <br/><span style={{fontSize: '0.9em', color: '#64748b'}}>International interest: Cambodia demo completed with strong reception. WHO/ICC global standards = no localization needed.</span>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 10,
    title: "The Team",
    subtitle: "Clinical expertise meets technical depth",
    content: (
      <div className={styles.slideContent}>
        <div className={styles.teamLayout}>
          <div className={styles.teamGrid}>
            <div className={styles.teamMember}>
              <div className={styles.memberPhoto}>
                <img src="/profile-pics/robbie.png" alt="Robert Lee" />
              </div>
              <div className={styles.memberInfo}>
                <h3>Robert Lee</h3>
                <h4>CEO & Co-Founder</h4>
                <p>BSc Computer Science, Manchester. Cancer survivor driving the mission. Leaving senior role at Coinbase (&gt;70% pay cut) to build Haem.io full-time. Background in FinTech at LSEG and FlexTrade.</p>
              </div>
            </div>

            <div className={styles.teamMember}>
              <div className={styles.memberPhoto}>
                <img src="/profile-pics/danny.png" alt="Dr. Daniel Clarke" />
              </div>
              <div className={styles.memberInfo}>
                <h3>Dr. Daniel Clarke</h3>
                <h4>CTO & Co-Founder</h4>
                <p>PhD Physics, University of Manchester & CERN. Former UK Civil Service data scientist. Leading platform architecture and AI strategy.</p>
              </div>
            </div>

            <div className={styles.teamMember}>
              <div className={styles.memberPhoto}>
                <img src="/profile-pics/john.png" alt="Dr. John Burthem" />
              </div>
              <div className={styles.memberInfo}>
                <h3>Dr. John Burthem</h3>
                <h4>Chief Medical Officer & Co-Founder</h4>
                <p>FRCP, FRCPath. Lead Haematology Diagnostician at Manchester Foundation Trust. 50+ peer-reviewed publications. Co-inventor of Haem.io's clinical logic.</p>
              </div>
            </div>

            <div className={styles.teamMember}>
              <div className={styles.memberPhoto}>
                <img src="/profile-pics/luke.png" alt="Dr. Luke Carter-Brzezinski" />
              </div>
              <div className={styles.memberInfo}>
                <h3>Dr. Luke Carter-Brzezinski</h3>
                <h4>Clinical Director & Co-Founder</h4>
                <p>FRCPath. Consultant Haematologist at MFT. Leading clinical outreach, pilot studies, and validation strategy across the NHS.</p>
              </div>
            </div>
          </div>
          <div style={{textAlign: 'center', marginTop: '1.25rem', padding: '0.75rem 1.5rem', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0'}}>
            <p style={{margin: 0, fontSize: '0.95rem', color: '#475569'}}>
              All founders taking significantly below-market salaries. <strong>Next hire: Commercial/Sales Lead</strong> to drive NHS adoption post-registration.
            </p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 11,
    title: "The Ask",
    subtitle: "£750k seed round. 18 months to Series A.",
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
                  <span>CEO & Lead Engineer</span>
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
                <div className={styles.runwayItem}>
                  <span>Commercial/Sales Lead (6 months)</span>
                  <span className={styles.runwayAmount}>£60k</span>
                </div>
              </div>
              <div className={styles.sectionTotal}>£420k</div>
            </div>

            <div className={styles.runwaySection}>
              <h4>Regulatory & Pilots</h4>
              <div className={styles.runwayItems}>
                <div className={styles.runwayItem}>
                  <span>Class I registration & compliance</span>
                  <span className={styles.runwayAmount}>£40k</span>
                </div>
                <div className={styles.runwayItem}>
                  <span>4 NHS pilot studies</span>
                  <span className={styles.runwayAmount}>£80k</span>
                </div>
              </div>
              <div className={styles.sectionTotal}>£120k</div>
            </div>

            <div className={styles.runwaySection}>
              <h4>Infrastructure & Operations</h4>
              <div className={styles.runwayItems}>
                <div className={styles.runwayItem}>
                  <span>Cloud, AI compute, legal, insurance, office</span>
                  <span className={styles.runwayAmount}>£90k</span>
                </div>
                <div className={styles.runwayItem}>
                  <span>Contingency buffer (16%)</span>
                  <span className={styles.runwayAmount}>£120k</span>
                </div>
              </div>
              <div className={styles.sectionTotal}>£210k</div>
            </div>
          </div>

          <div style={{background: '#f0fdf4', borderRadius: '10px', padding: '0.75rem 1.25rem', marginTop: '0.5rem', border: '1px solid #bbf7d0', textAlign: 'center'}}>
            <p style={{margin: 0, fontSize: '0.9rem', color: '#334155'}}>
              <strong>Non-dilutive funding pipeline:</strong> ~£210k in pharma grant discussions (Pfizer, Servier, Jazz, J&J). Co-applicant on £7M UK AML Research Network grant.
            </p>
          </div>

          <div className={styles.milestoneTimeline}>
            <div className={styles.milestoneItem}>
              <div className={styles.milestoneTime}>Months 1-6</div>
              <div className={styles.milestoneText}>Complete Class I registration. Launch first 2 NHS pilot studies.</div>
            </div>
            <div className={styles.milestoneItem}>
              <div className={styles.milestoneTime}>Months 6-12</div>
              <div className={styles.milestoneText}>Complete pilot validations. First paying customers.</div>
            </div>
            <div className={styles.milestoneItem}>
              <div className={styles.milestoneTime}>Months 12-18</div>
              <div className={styles.milestoneText}>5+ NHS trust contracts. International expansion. Series A ready.</div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 12,
    content: (
      <div className={styles.slideContent}>
        <div className={styles.ctaSlide}>
          <h1 className={styles.companyName} style={{fontSize: '4rem'}}>
            Haem.io
          </h1>
          <p className={styles.ctaTagline}>
            Precision diagnostics for every haematologist, everywhere.<br/>
            Built by clinicians. Powered by AI. Explainable by design.
          </p>
          <div style={{fontSize: '1rem', color: '#64748b', marginBottom: '1rem'}}>
            Class I registered. Global standards. Already working.
          </div>
          <div className={styles.ctaBadge}>
            Raising £750,000 to transform haematology diagnosis
          </div>
          <div className={styles.ctaContact}>
            <span>robert.lee@haem.io</span>
            <span>haem.io</span>
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
        <>
          <a href="/" className={styles.backButton}>
            ← Back
          </a>
          <a href="/investors/three-minute-pitch" className={styles.shortPitchButton}>
            3-min pitch
          </a>
        </>
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
