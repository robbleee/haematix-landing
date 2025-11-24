'use client';

import React, { useState } from 'react';
import styles from './InteractiveDemo.module.css';

export default function InteractiveDemo() {
  const [activeStep, setActiveStep] = useState(null);
  const [validated, setValidated] = useState(false);

  return (
    <div className={styles.demoContainer}>
      {/* Column 1: The Input */}
      <div 
        className={`${styles.column} ${activeStep === 1 ? styles.active : ''}`}
        onMouseEnter={() => setActiveStep(1)}
        onMouseLeave={() => setActiveStep(null)}
      >
        <div className={styles.columnHeader}>
          <span>📄</span> The Input (Signal)
        </div>
        <div className={styles.contentArea}>
          <p>
            ...flow cytometry shows{' '}
            <span className={styles.highlightTerm}>CD34+ blasts (18%)</span>,{' '}
            <span className={styles.highlightTerm}>CD117+</span>,{' '}
            <span className={styles.highlightTerm}>HLA-DR+</span>. 
            Molecular analysis confirms{' '}
            <span className={styles.highlightTerm}>NPM1 mutation</span> present. 
            Cytogenetics: Normal Karyotype...
          </p>
        </div>
        <div className={styles.caption}>
          <strong>AI Extraction Layer.</strong> The Neural Network handles the unstructured noise. It identifies parameters but makes no decisions.
        </div>
      </div>

      {/* Column 2: The Engine */}
      <div 
        className={`${styles.column} ${activeStep === 2 ? styles.active : ''}`}
        onMouseEnter={() => setActiveStep(2)}
        onMouseLeave={() => setActiveStep(null)}
      >
        <div className={styles.columnHeader}>
          <span>⚙️</span> The Engine (Execution)
        </div>
        <div className={`${styles.contentArea} ${styles.logicBlock}`}>
          <div className={styles.tooltipTrigger}>
            <span className={styles.logicRow}>IF "NPM1" == DETECTED</span>
            <span className={styles.logicRow}>AND "FLT3-ITD" == NOT_DETECTED</span>
            <span className={styles.logicRow}>AND "BLASTS" {'>='} 20%</span>
            <span className={styles.logicRow} style={{ color: '#3182ce', fontWeight: 'bold', marginTop: '0.5rem' }}>
              THEN CLASS = "AML with NPM1 Mutation"
            </span>
            <div className={styles.tooltip}>
              Source: WHO Classification of Haematolymphoid Tumours (5th Ed, 2022).
            </div>
          </div>
        </div>
        <div className={styles.caption}>
          <strong>Deterministic Logic.</strong> Extracted data is fed into a rigid logic engine. This layer is non-probabilistic. It cannot hallucinate.
        </div>
      </div>

      {/* Column 3: The Output */}
      <div 
        className={`${styles.column} ${activeStep === 3 ? styles.active : ''}`}
        onMouseEnter={() => setActiveStep(3)}
        onMouseLeave={() => setActiveStep(null)}
      >
        <div className={styles.columnHeader}>
          <span>✅</span> The Output (Validation)
        </div>
        <div className={`${styles.contentArea} ${styles.diagnosisCard}`}>
          <div className={styles.diagnosisRow}>
            <span className={styles.label}>Diagnosis:</span> Acute Myeloid Leukemia
          </div>
          <div className={styles.diagnosisRow}>
            <span className={styles.label}>Subtype:</span> NPM1-mutated <sup className={styles.citation}>[533-558]</sup>
          </div>
          <div className={styles.diagnosisRow}>
            <span className={styles.label}>Risk:</span> Favorable (ELN 2022)
          </div>
          
          <button 
            className={`${styles.validateBtn} ${!validated ? styles.pulsing : ''}`}
            onClick={() => setValidated(true)}
          >
            {validated ? '✓ Validated by Clinician' : 'Validate Diagnosis'}
          </button>
        </div>
        <div className={styles.caption}>
          <strong>Human-in-the-Loop.</strong> The clinician adds missing context and validates the logic chain. <sup className={styles.citation}>[519-521]</sup>
        </div>
      </div>
    </div>
  );
}

