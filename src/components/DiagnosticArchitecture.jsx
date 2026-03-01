'use client';

import React, { useState, useEffect } from 'react';
import styles from './DiagnosticArchitecture.module.css';

const architectureData = [
  {
    id: 'input',
    title: 'Multi-Modal Input',
    shortDesc: 'Eliminates manual data entry by extracting key parameters directly from clinical reports.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
        <path d="M21 5c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
      </svg>
    ),
    modalDetails: {
      overview: 'Haematologists spend hours hunting for data across scattered reports. Haem.io acts as a clinical assistant, instantly finding and organizing what matters.',
      points: [
        { title: 'No More Manual Transcription', text: 'Simply upload the NGS panel, Flow Cytometry, and Cytogenetics reports. The platform reads them just like a clinician would.' },
        { title: 'Haematology-Tuned Understanding', text: 'Understands complex clinical phrasing, accurately pulling out exact blast percentages, intricate karyotypes (e.g., t(8;21)), and sub-clonal variants.' },
        { title: 'Unified Patient View', text: 'Consolidates messy, multi-source data into a single, clean patient profile, ready for diagnosis.' }
      ]
    },
    dataVisualization: (
      <div className={styles.clinicalUI}>
        <div className={styles.reportSnippet}>
          <div className={styles.reportHeader}>Morphology & Genetics Report</div>
          <div className={styles.reportText}>
            ... bone marrow aspirate shows <mark>26% blasts</mark>. Molecular genetics is positive for <mark>FLT3-ITD</mark>. Karyotype: <mark>46,XX,t(8;21)(q22;q22.1)[10]</mark> ...
          </div>
        </div>
        
        <div className={styles.extractionArrow}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
          Extracted Profile
        </div>
        
        <div className={styles.patientCard}>
          <div className={styles.patientRow}>
            <span className={styles.rowLabel}>Blasts (BM)</span>
            <span className={styles.rowValue}>26%</span>
          </div>
          <div className={styles.patientRow}>
            <span className={styles.rowLabel}>Mutations</span>
            <span className={styles.rowValueHighlight}>FLT3-ITD</span>
          </div>
          <div className={styles.patientRow}>
            <span className={styles.rowLabel}>Karyotype</span>
            <span className={styles.rowValue}>t(8;21)(q22;q22.1)</span>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'core',
    title: 'AI & Logic Core',
    shortDesc: 'Applies rigid WHO/ICC guidelines with mathematical certainty. No AI hallucinations.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"></path>
        <path d="M8.5 8.5v.01"></path>
        <path d="M16 15.5v.01"></path>
        <path d="M12 12v.01"></path>
      </svg>
    ),
    isCore: true,
    modalDetails: {
      overview: 'Generative AI is great for reading, but dangerous for diagnosing. Haem.io strictly separates extraction from deterministic, verifiable guideline logic.',
      points: [
        { title: 'Mathematical Guideline Adherence', text: 'The rules of the WHO and ICC are encoded into formal logic. The system never guesses; it calculates the exact pathway dictated by the evidence.' },
        { title: 'Transparent Reasoning', text: 'Every decision is fully traceable. You can see exactly which rule and which patient finding triggered the final diagnosis.' },
        { title: 'Clinical Guardrails', text: 'Instantly alerts you to impossible or conflicting data states in the patient record (e.g., mutually exclusive primary drivers) before an erroneous diagnosis is made.' }
      ]
    },
    dataVisualization: (
      <div className={styles.clinicalUI}>
        <div className={styles.guardrailAlert}>
          <div className={styles.alertIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
          </div>
          <div className={styles.alertText}>
            <strong>Guardrail Triggered: TP53 Evidence Conflict</strong>
            <span>Contradictory genomic findings detected across reports.</span>
          </div>
        </div>
        
        <div className={styles.logicTrace}>
          <div className={styles.traceHeader}>Logic Engine Evaluation</div>
          <div className={styles.traceStep}>
            <span className={styles.traceCheck}>✓</span> Cytogenetics: del(17p) detected [loss of TP53 locus]
          </div>
          <div className={styles.traceStep}>
            <span className={styles.traceCheck}>✓</span> VAF Data: TP53 somatic mutation (80%) detected
          </div>
          <div className={styles.traceStepError}>
            <span className={styles.traceCross}>✕</span> <strong>Rule Violation:</strong> Multi-hit TP53 criteria met, but NGS report explicitly marks TP53 state as "Wild-Type". Manual clinician review required to resolve report contradiction.
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'refinement',
    title: 'Clinician Refinement',
    shortDesc: 'Prompts for missing "just-in-time" criteria to finalize ambiguous cases.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <polyline points="16 11 18 13 22 9"></polyline>
      </svg>
    ),
    modalDetails: {
      overview: 'Not all necessary clinical context is documented in the initial reports. When diagnostic rules require specific context, Haem.io knows exactly what to ask.',
      points: [
        { title: 'Just-in-Time Prompting', text: 'Instead of failing or hallucinating, the logic engine pauses and asks the clinician for the precise missing parameter needed to proceed.' },
        { title: 'Dynamic Branching', text: 'If evaluating AML vs. MDS with erythroid predominance, it explicitly asks for the erythroid precursor percentage to finalize the diagnostic branch.' },
        { title: 'Audit Trail Integration', text: 'Any manual input provided by the clinician is permanently logged and timestamped as part of the formal derivation trace.' }
      ]
    },
    dataVisualization: (
      <div className={styles.clinicalUI}>
        <div className={styles.missingDataAlert}>
          <div className={styles.missingHeader}>
             <span className={styles.alertIcon}>⚠️</span>
             Missing Data for Classification
          </div>
          <div className={styles.missingBody}>
            <p><strong>Pending Pathway:</strong> Acute myeloid leukaemia vs. Myelodysplastic syndrome</p>
            <p className={styles.missingContext}>Blasts are 18%. To determine if this is AML with myelodysplasia-related changes or MDS, we need erythroid lineage data.</p>
          </div>
        </div>
        
        <div className={styles.userInputForm}>
          <label className={styles.inputLabel}>Are erythroid precursors ≥ 50% of all nucleated cells?</label>
          <div className={styles.inputOptions}>
            <button className={styles.inputBtnActive}>Yes (≥ 50%)</button>
            <button className={styles.inputBtn}>No (&lt; 50%)</button>
          </div>
          <div className={styles.systemResponse}>
            <span className={styles.responseIcon}>↳</span> Proceeding with erythroid predominance logic...
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'diagnosis',
    title: 'Precision Diagnosis',
    shortDesc: 'Instantly navigates complex mutational hierarchies to deliver the exact classification.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
        <line x1="12" y1="18" x2="12" y2="12"></line>
        <line x1="9" y1="15" x2="15" y2="15"></line>
        <line x1="8" y1="6" x2="16" y2="6"></line>
      </svg>
    ),
    modalDetails: {
      overview: 'The 2022 updates introduced an explosion of combinatorial possibilities. Haem.io calculates the exact sub-type without the cognitive overload.',
      points: [
        { title: 'Simultaneous Dual-Classification', text: 'Instantly evaluates the patient profile against both WHO 2022 and ICC 2022 guidelines side-by-side, highlighting any divergence.' },
        { title: 'Resolves Diagnostic Ambiguity', text: 'Autonomously navigates the hierarchy of genetic abnormalities, prioritizing defining mutations over secondary variations according to guideline rules.' },
        { title: 'Automated Prognostic Scoring', text: 'Instantly calculates standard risk scores—such as ELN 2022 for AML and IPSS-M for MDS—saving you from complex manual scoring tables.' }
      ]
    },
    dataVisualization: (
      <div className={styles.clinicalUI}>
        <div className={styles.diagnosisGroup}>
          <div className={styles.diagnosisCard}>
            <div className={styles.diagSystem}>WHO 2022</div>
            <div className={styles.diagName}>AML with t(8;21)(q22;q22.1); RUNX1::RUNX1T1</div>
            <div className={styles.diagCode}>ICD-O: 9896/3</div>
          </div>
          
          <div className={styles.diagnosisCard}>
            <div className={styles.diagSystem}>ICC 2022</div>
            <div className={styles.diagName}>AML with recurrent genetic abnormalities</div>
            <div className={styles.diagSub}>Subtype: t(8;21)(q22;q22.1)</div>
          </div>
        </div>
        
        <div className={styles.riskBadge}>
          <div className={styles.riskInfo}>
            <span className={styles.riskLabel}>ELN 2022 Risk Category</span>
            <span className={styles.riskSubtext}>Based on t(8;21) presence</span>
          </div>
          <strong className={styles.riskFavorable}>Favorable</strong>
        </div>
      </div>
    )
  },
  {
    id: 'action',
    title: 'Clinical Action',
    shortDesc: 'Translates the molecular profile into actionable treatments and trial matches.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
      </svg>
    ),
    modalDetails: {
      overview: 'Diagnosis is only the first step. Haem.io bridges the gap between molecular findings and real-world clinical decision-making.',
      points: [
        { title: 'Targeted Therapy Mapping', text: 'Instantly highlights FDA/EMA approved targeted therapies that match the patient\'s exact mutational profile (e.g., FLT3, IDH1/2 inhibitors).' },
        { title: 'Pathway Suitability', text: 'Assists in determining optimal treatment pathways, such as eligibility for intensive chemotherapy vs. non-intensive regimens.' },
        { title: 'Clinical Trial Matching', text: 'Automatically cross-references the patient\'s exact biomarker profile and age with inclusion criteria for active oncology trials.' }
      ]
    },
    dataVisualization: (
      <div className={styles.clinicalUI}>
        <div className={styles.actionCard}>
          <div className={styles.actionHeader}>
            <span className={styles.actionIcon}>💊</span>
            <span className={styles.actionType}>Targeted Therapy Indicated</span>
          </div>
          <div className={styles.actionBody}>
            <div className={styles.actionDrug}>Gilteritinib</div>
            <div className={styles.actionReason}><strong>Rationale:</strong> FDA Approved for FLT3-ITD mutated AML.</div>
          </div>
        </div>
        
        <div className={styles.actionCardTrial}>
          <div className={styles.actionHeader}>
            <span className={styles.actionIcon}>🔬</span>
            <span className={styles.actionType}>Clinical Trial Match (98%)</span>
          </div>
          <div className={styles.actionBody}>
            <div className={styles.actionTrial}>NCT04293562 <span className={styles.trialBadge}>Recruiting</span></div>
            <div className={styles.actionReason}>Phase III study of FLT3 inhibitors in newly diagnosed patients. Matches age and mutational profile.</div>
          </div>
        </div>
      </div>
    )
  }
];

const DiagnosticArchitecture = () => {
  const [activeModal, setActiveModal] = useState(null);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activeModal]);

  return (
    <div className={styles.container}>
      <div className={styles.architectureWrapper}>
        <h2 className={styles.title}>Future-Ready Diagnostic Architecture</h2>
        <p className={styles.subtitle}>Click any stage to explore the clinical workflow</p>
        
        <div className={styles.flowScrollWrapper}>
          <div className={styles.flowContainer}>
            {architectureData.map((stage, index) => (
              <React.Fragment key={stage.id}>
                {/* Card */}
                <div 
                  className={`${styles.card} ${stage.isCore ? styles.coreCard : ''}`} 
                  onClick={() => setActiveModal(stage)}
                >
                  <div className={styles.iconContainer}>
                    {stage.icon}
                  </div>
                  <h3 className={styles.cardTitle}>{stage.title}</h3>
                  <p className={styles.cardDescription}>{stage.shortDesc}</p>
                  <div className={styles.clickHint}>View clinical flow</div>
                </div>

                {/* Arrow */}
                {index < architectureData.length - 1 && (
                  <div className={styles.arrow}></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      {activeModal && (
        <div className={styles.modalOverlay} onClick={() => setActiveModal(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalCloseBtn} onClick={() => setActiveModal(null)} aria-label="Close modal">
              ×
            </button>
            
            <div className={styles.modalGrid}>
              {/* Left Column: Explanatory Text */}
              <div className={styles.modalTextColumn}>
                <div className={styles.modalHeader}>
                  <div className={styles.modalIconLarge}>
                    {activeModal.icon}
                  </div>
                  <h3 className={styles.modalTitleLarge}>{activeModal.title}</h3>
                </div>
                
                <p className={styles.modalOverview}>{activeModal.modalDetails.overview}</p>
                
                <div className={styles.modalPoints}>
                  {activeModal.modalDetails.points.map((pt, i) => (
                    <div key={i} className={styles.modalPointClean}>
                      <h4 className={styles.pointTitleClean}>
                        <span className={styles.pointBullet}>✦</span>
                        {pt.title}
                      </h4>
                      <p className={styles.pointTextClean}>{pt.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Clinical Visualization */}
              <div className={styles.modalVisualColumn}>
                {activeModal.dataVisualization}
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default DiagnosticArchitecture;
