'use client';

import styles from './ConferenceAIPage.module.css';

export default function ConferenceAIPage() {
  return (
    <div className={styles.page}>
      {/* Background layers */}
      <div className={styles.gradientBg} />
      <div className={styles.gridPattern} />
      <div className={`${styles.orb} ${styles.orb1}`} />
      <div className={`${styles.orb} ${styles.orb2}`} />

      <div className={styles.container}>
        <div className={styles.eyebrow}>
          <span className={styles.eyebrowDot} />
          Haem.io Product
        </div>

        <h1 className={styles.title}>
          <span className={styles.titleLine}>Conference</span>
          <span className={styles.titleAccent}>IQ</span>
        </h1>

        <p className={styles.subtitle}>
          AI-powered capture and analysis for haematology conferences.
        </p>

        <div className={styles.confStrip}>
          {['EBMT', 'ASH', 'EHA', 'ASCO', 'BSH'].map(c => (
            <span key={c} className={styles.confChip}>{c}</span>
          ))}
        </div>

        <div className={styles.ctaGroup}>
          <a
            href="https://haemio-conferenceai-cc44c37efac2.herokuapp.com/dashboard/index.html"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaPrimary}
          >
            Open Dashboard
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
