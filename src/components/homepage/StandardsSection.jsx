'use client';

import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import styles from './StandardsSection.module.css';

const standards = [
  {
    name: 'WHO 2022',
    edition: '5th Edition',
    description: 'World Health Organization Classification of Haematolymphoid Tumours',
    delay: 0
  },
  {
    name: 'ICC 2022',
    edition: 'International Consensus',
    description: 'International Consensus Classification of Myeloid Neoplasms and Acute Leukaemias',
    delay: 0.15
  },
  {
    name: 'ELN 2022',
    edition: 'Risk Stratification',
    description: 'European LeukemiaNet Recommendations for Diagnosis and Management of AML',
    delay: 0.3
  }
];

export default function StandardsSection() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.15 });

  return (
    <section className={styles.section} ref={ref}>
      <div className={styles.container}>
        <div className={`${styles.header} ${isVisible ? styles.visible : ''}`}>
          <h2 className={styles.sectionTitle}>Built on Clinical Standards</h2>
          <p className={styles.sectionSubtitle}>
            Every classification decision maps directly to published guideline criteria.
          </p>
        </div>

        <div className={styles.badgesRow}>
          {standards.map((standard) => (
            <div
              key={standard.name}
              className={`${styles.badge} ${isVisible ? styles.badgeVisible : ''}`}
              style={{ animationDelay: `${standard.delay}s` }}
            >
              <div className={styles.badgeAccent} />
              <div className={styles.badgeContent}>
                <h3 className={styles.badgeName}>{standard.name}</h3>
                <span className={styles.badgeEdition}>{standard.edition}</span>
                <p className={styles.badgeDesc}>{standard.description}</p>
              </div>
            </div>
          ))}
        </div>

        <p className={`${styles.footnote} ${isVisible ? styles.visible : ''}`}>
          Dual-framework classification ensures comprehensive coverage across both major international standards, with automated risk scoring aligned to current evidence-based guidelines.
        </p>
      </div>
    </section>
  );
}
