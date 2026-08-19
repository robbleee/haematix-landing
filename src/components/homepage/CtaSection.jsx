'use client';

import Link from 'next/link';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import styles from './CtaSection.module.css';

export default function CtaSection() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.2 });

  return (
    <section className={styles.section} ref={ref}>
      <div className={styles.container}>
        <div className={`${styles.content} ${isVisible ? styles.visible : ''}`}>
          <h2 className={styles.title}>
            Building with clinical teams
          </h2>
          <p className={styles.subtitle}>
            We are developing focused tools with collaborators in the UK and Cambodia.
          </p>
          <div className={styles.ctaGroup}>
            <Link href="/#projects" className={styles.ctaPrimary}>
              Explore our work
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
            <Link href="/team" className={styles.ctaSecondary}>About the team</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
