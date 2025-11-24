import styles from './ClinicalFlowDiagram.module.css';

export default function ClinicalFlowDiagram() {
  return (
    <div className={styles.flowDiagram}>
      <div className={styles.container}>
        <div className={styles.step}>
          <div className={styles.stepNumber}>1</div>
          <div className={styles.stepContent}>
            <h3 className={styles.stepTitle}>Multi-Modal Input</h3>
            <p className={styles.stepDescription}>
              Ingests genetics, cytogenetics, and clinical history from diverse formats.
            </p>
          </div>
        </div>

        <div className={styles.arrow}>
          <svg width="40" height="20" viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 10 L30 10 M22 4 L30 10 L22 16" stroke="var(--primary-color)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <div className={styles.step}>
          <div className={styles.stepNumber}>2</div>
          <div className={styles.stepContent}>
            <h3 className={styles.stepTitle}>AI</h3>
            <p className={styles.stepDescription}>
              NLP data extraction from unstructured reports.
            </p>
          </div>
        </div>

        <div className={styles.arrow}>
          <svg width="40" height="20" viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 10 L30 10 M22 4 L30 10 L22 16" stroke="var(--primary-color)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <div className={styles.step}>
          <div className={styles.stepNumber}>3</div>
          <div className={styles.stepContent}>
            <h3 className={styles.stepTitle}>Logic Core & Precision Diagnosis</h3>
            <p className={styles.stepDescription}>
              Provable WHO/ICC logic delivers exact disease classification.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
