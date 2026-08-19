'use client';

import { useState } from 'react';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import styles from './HowItWorksSection.module.css';

const steps = [
  {
    id: 'extract',
    number: '01',
    title: 'Structure',
    shortDesc: 'Turn case findings into a clinician-reviewable structured profile.',
    detail: 'Report findings can be entered manually or structured for review. Mutations, cytogenetics, blast counts, and flow markers remain visible so clinicians can verify the input before criteria are applied.',
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
    title: 'Map',
    shortDesc: 'Map the reviewed inputs against configured classification and risk criteria.',
    detail: 'The interface presents WHO 2022 and ICC 2022 criteria mapping with the relevant pathway and rationale available for inspection.',
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
    title: 'Review',
    shortDesc: 'Support clinician review with classification context, risk logic, and rationale.',
    detail: 'Displays risk stratification and supporting rationale where configured. Outputs are decision support for qualified clinicians and do not replace local governance or professional judgement.',
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
          <span className={styles.kicker}>Workflow</span>
          <h2 className={styles.sectionTitle}>From findings to a reviewable result</h2>
          <p className={styles.sectionSubtitle}>A focused three-step criteria review workflow.</p>
        </div>

        <div className={styles.stepsContainer}>
          {steps.map((step, index) => (
            <div key={step.id} className={styles.stepWrapper}>
              <article
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
              </article>

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
