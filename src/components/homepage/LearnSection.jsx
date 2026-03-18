'use client';

import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import styles from './LearnSection.module.css';

export default function LearnSection() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.15 });

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div
          ref={ref}
          className={`${styles.card} ${isVisible ? styles.visible : ''}`}
        >
          {/* Left: text */}
          <div className={styles.textSide}>
            <div className={styles.eyebrow}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
              </svg>
              Education Platform
            </div>
            <h2 className={styles.title}>
              <span className={styles.titleGradient}>Haem.io</span> Learn
            </h2>
            <p className={styles.subtitle}>
              Master WHO 2022 and ICC 2022 haematology classification through guided lessons,
              real case practice, and daily challenges — built by clinicians, for clinicians.
            </p>
            <ul className={styles.features}>
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                Structured AML &amp; MDS classification modules
              </li>
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                Daily practice with real case reports
              </li>
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                ELN risk &amp; IPSS-M stratification training
              </li>
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                Track streaks, earn certificates
              </li>
            </ul>
            <a href="https://learn.haem.io" className={styles.cta}>
              Start Learning Free
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
              </svg>
            </a>
          </div>

          {/* Right: visual */}
          <div className={styles.visualSide}>
            <div className={styles.iconBadge}>
              <svg width="56" height="56" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="learnGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#009688" />
                    <stop offset="100%" stopColor="#00796B" />
                  </linearGradient>
                </defs>
                <rect width="64" height="64" rx="12" fill="url(#learnGrad)" />
                <polygon points="32,14 52,24 32,34 12,24" fill="white" opacity="0.95" />
                <polygon points="32,34 52,24 52,27 32,37 12,27 12,24" fill="white" opacity="0.7" />
                <line x1="42" y1="24" x2="42" y2="38" stroke="#64FFDA" strokeWidth="2" strokeLinecap="round" />
                <circle cx="42" cy="40" r="2.5" fill="#64FFDA" />
                <path d="M20 36 L20 44 Q32 50 32 50 Q32 50 44 44 L44 36" stroke="white" strokeWidth="2" fill="none" opacity="0.8" />
              </svg>
            </div>
            <div className={styles.statGrid}>
              <div className={styles.stat}>
                <span className={styles.statNumber}>WHO</span>
                <span className={styles.statLabel}>2022 Aligned</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>ICC</span>
                <span className={styles.statLabel}>2022 Aligned</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>ELN</span>
                <span className={styles.statLabel}>Risk Scoring</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>Free</span>
                <span className={styles.statLabel}>To Access</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
