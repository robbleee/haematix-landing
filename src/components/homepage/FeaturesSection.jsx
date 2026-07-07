'use client';

import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import styles from './FeaturesSection.module.css';

const features = [
  {
    title: 'Dual Classification',
    description: 'Simultaneous criteria mapping against both WHO 2022 and ICC 2022 guidelines supports clinician-led review.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
    delay: 0
  },
  {
    title: 'Risk Stratification',
    description: 'Deterministic calculation of ELN 2022 (AML) and IPSS-M/R (MDS) risk logic with visible inputs and reasoning.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
      </svg>
    ),
    delay: 0.15
  },
  {
    title: 'Transparent Logic',
    description: 'Every criteria outcome is traceable to specific evidence and guideline logic. No black boxes.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
    ),
    delay: 0.3
  },
  {
    title: 'Data Review',
    description: 'Structured data points remain visible for clinician review before classification criteria are applied.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v6M12 16v6M4.93 4.93l4.24 4.24M14.83 14.83l4.24 4.24M2 12h6M16 12h6M4.93 19.07l4.24-4.24M14.83 9.17l4.24-4.24" />
      </svg>
    ),
    delay: 0.45
  },
  {
    title: 'NHS-Ready Deployment',
    description: 'Designed for local deployment patterns where customer governance requires data to remain inside the organisation.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    delay: 0.6
  }
];

export default function FeaturesSection() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.08 });

  return (
    <section className={styles.section} ref={ref}>
      <div className={styles.bgOrb} />
      <div className={styles.container}>
        <div className={`${styles.header} ${isVisible ? styles.visible : ''}`}>
          <h2 className={styles.sectionTitle}>Core Capabilities</h2>
          <p className={styles.sectionSubtitle}>
            Focused on classification, risk, and transparent reasoning.
          </p>
        </div>

        <div className={styles.grid}>
          {features.map((feature) => (
            <div
              key={feature.title}
              className={`${styles.card} ${isVisible ? styles.cardVisible : ''}`}
              style={{ animationDelay: `${feature.delay}s` }}
            >
              <div className={styles.cardGlow} />
              <div className={`${styles.iconContainer} ${isVisible ? styles.iconFloat : ''}`}
                   style={{ animationDelay: `${feature.delay + 0.8}s` }}>
                {feature.icon}
              </div>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardDesc}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
