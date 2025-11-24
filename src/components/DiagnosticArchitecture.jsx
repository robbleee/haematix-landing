import React from 'react';
import styles from './DiagnosticArchitecture.module.css';

const DiagnosticArchitecture = () => {
  return (
    <div className={styles.container}>
      <div className={styles.architectureWrapper}>
        <h2 className={styles.title}>Future-Ready Diagnostic Architecture</h2>
        
        <div className={styles.flowContainer}>
          {/* Input Stage */}
          <div className={styles.card}>
            <div className={styles.iconContainer}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
                <path d="M21 5c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
              </svg>
            </div>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>Multi-Modal Input</h3>
              <p className={styles.cardDescription}>
                Ingests molecular genetics, cytogenetics, and clinical history from diverse report formats.
              </p>
            </div>
          </div>

          <div className={styles.arrow}></div>

          {/* Processing Stage - The Core */}
          <div className={`${styles.card} ${styles.coreCard}`}>
            <div className={styles.iconContainer}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"></path>
                <path d="M8.5 8.5v.01"></path>
                <path d="M16 15.5v.01"></path>
                <path d="M12 12v.01"></path>
              </svg>
            </div>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>AI & Logic Core</h3>
              <p className={styles.cardDescription}>
                Combines NLP data extraction with provable WHO/ICC logic for transparent reasoning.
              </p>
            </div>
          </div>

          <div className={styles.arrow}></div>

          {/* Classification Stage */}
          <div className={styles.card}>
            <div className={styles.iconContainer}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
                <line x1="12" y1="18" x2="12" y2="12"></line>
                <line x1="9" y1="15" x2="15" y2="15"></line>
                <line x1="8" y1="6" x2="16" y2="6"></line>
              </svg>
            </div>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>Precision Diagnosis</h3>
              <p className={styles.cardDescription}>
                Delivers exact disease classification and risk stratification (ELN/IPSS-R).
              </p>
            </div>
          </div>

          <div className={styles.arrow}></div>

          {/* Output Stage */}
          <div className={styles.card}>
            <div className={styles.iconContainer}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
            </div>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>Clinical Action</h3>
              <p className={styles.cardDescription}>
                Matches patients to optimal treatments and relevant clinical trials.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagnosticArchitecture;


