'use client';

import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import styles from './EndorsementsSection.module.css';

const endorsements = [
  {
    quote: 'Haem.io has the potential to transform diagnosis and decision making for patients with haematological malignancies across the NHS.',
    name: 'Prof Charles Craddock CBE',
    role: 'Chair, UK AML Research Network',
    org: 'University of Warwick',
  },
  {
    quote: 'Haem.io has the potential to revolutionise the quality of care that patients receive.',
    name: 'Dr John Chadwick',
    role: 'Consultant Haematologist',
    org: 'The Christie NHS Foundation Trust',
  },
  {
    quote: 'A real step forward in what technology can offer in supporting clinicians to make accurate clinical diagnoses.',
    name: 'Dr Tom Coats',
    role: 'Haematology Consultant',
    org: 'Royal Devon & Exeter NHS Trust',
  },
  {
    quote: 'I would wholeheartedly recommend this platform. This will be of significant use for clinicians in the front line.',
    name: 'Dr P A Cahalin',
    role: 'Consultant Haematologist',
    org: 'Blackpool Teaching Hospitals NHS Trust',
  },
];

export default function EndorsementsSection() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section className={styles.section} ref={ref}>
      <div className={styles.container}>
        <div className={`${styles.header} ${isVisible ? styles.visible : ''}`}>
          <h2 className={styles.sectionTitle}>Supported by Leading NHS Clinicians</h2>
          <p className={styles.sectionSubtitle}>
            Senior haematologists across the UK are supporting Haem.io's validation work and clinician-led adoption pathway.
          </p>
        </div>

        <div className={`${styles.grid} ${isVisible ? styles.visible : ''}`}>
          {endorsements.map((e) => (
            <div key={e.name} className={styles.quoteCard}>
              <p className={styles.quoteText}>"{e.quote}"</p>
              <div className={styles.attribution}>
                <span className={styles.attributionName}>{e.name}</span>
                <span className={styles.attributionRole}>{e.role}</span>
                <span className={styles.attributionOrg}>{e.org}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
