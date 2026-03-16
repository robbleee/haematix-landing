'use client';

import { useState } from 'react';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import styles from './HowItWorksSection.module.css';

const steps = [
  {
    id: 'extract',
    number: '01',
    title: 'Extract',
    shortDesc: 'Pull key findings from reports into a clean structured profile.',
    detail: 'LLM-powered extraction from free-text haematology reports. Identifies mutations, cytogenetics, blast counts, and flow cytometry markers with 100% gene detection accuracy.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        <path d="M21 5c0 1.66-4 3-9 3s-9-1.34-9-3" />
      </svg>
    )
  },
  {
    id: 'classify',
    number: '02',
    title: 'Classify',
    shortDesc: 'Apply WHO, ICC, and ELN logic to produce a traceable result.',
    detail: 'Dual-framework classification against WHO 2022 5th Edition and ICC 2022. Every decision node is traceable with full reasoning chains visible.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
        <path d="M8.5 8.5v.01" /><path d="M16 15.5v.01" /><path d="M12 12v.01" />
      </svg>
    )
  },
  {
    id: 'act',
    number: '03',
    title: 'Act',
    shortDesc: 'Support next-step decisions with diagnosis, risk, and rationale.',
    detail: 'Generates ELN 2022 risk for AML, IPSS-M/R for MDS. Provides rationale and evidence for clinical decision support alongside treatment considerations.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    )
  }
];

export default function HowItWorksSection() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className={styles.section} ref={ref}>
      <div className={styles.container}>
        <div className={`${styles.header} ${isVisible ? styles.visible : ''}`}>
          <h2 className={styles.sectionTitle}>How Haem.io Works</h2>
          <p className={styles.sectionSubtitle}>A simple three-step diagnostic workflow</p>
        </div>

        <div className={styles.stepsContainer}>
          {steps.map((step, index) => (
            <div key={step.id} className={styles.stepWrapper}>
              <div
                className={`${styles.stepCard} ${isVisible ? styles.visible : ''}`}
                style={{ animationDelay: `${index * 0.3}s` }}
                onClick={() => toggleExpand(step.id)}
              >
                <div className={styles.stepNumber}>{step.number}</div>
                <div className={`${styles.iconContainer} ${isVisible ? styles.iconVisible : ''}`}
                     style={{ animationDelay: `${index * 0.3 + 0.2}s` }}>
                  {step.icon}
                </div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.shortDesc}</p>
                <div className={`${styles.stepDetail} ${expandedId === step.id ? styles.expanded : ''}`}>
                  <p>{step.detail}</p>
                </div>
                <button className={styles.expandBtn} aria-label={expandedId === step.id ? 'Collapse' : 'Expand'}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                       strokeLinecap="round" strokeLinejoin="round"
                       className={expandedId === step.id ? styles.rotated : ''}>
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
              </div>

              {index < steps.length - 1 && (
                <div className={`${styles.arrow} ${isVisible ? styles.arrowVisible : ''}`}
                     style={{ animationDelay: `${index * 0.3 + 0.15}s` }}>
                  <svg width="40" height="24" viewBox="0 0 40 24" fill="none">
                    <path d="M0 12h32M26 6l8 6-8 6" stroke="#009688" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
