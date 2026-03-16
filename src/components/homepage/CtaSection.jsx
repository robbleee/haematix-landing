'use client';

import Link from 'next/link';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import styles from './CtaSection.module.css';

export default function CtaSection() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.2 });

  return (
    <section className={styles.section} ref={ref}>
      {/* Wave divider */}
      <div className={styles.waveDivider}>
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 40C240 80 480 0 720 40C960 80 1200 0 1440 40V80H0V40Z" fill="#e8f5f3" />
        </svg>
      </div>

      {/* Floating orbs */}
      <div className={`${styles.orb} ${styles.orb1}`} />
      <div className={`${styles.orb} ${styles.orb2}`} />

      <div className={styles.container}>
        <div className={`${styles.content} ${isVisible ? styles.visible : ''}`}>
          <h2 className={styles.title}>
            Ready to modernise your diagnostic workflow?
          </h2>
          <p className={styles.subtitle}>
            Try the interactive AML/MDS classifier — no login required.
          </p>
          <div className={styles.ctaGroup}>
            <Link href="/interactive-classifier" className={styles.ctaPrimary}>
              Launch Classifier
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
            <a href="https://app.haem.io/" target="_blank" rel="noopener noreferrer" className={styles.ctaSecondary}>
              Sign In to App
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
