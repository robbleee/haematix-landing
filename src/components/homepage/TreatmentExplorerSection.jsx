'use client';

import Link from 'next/link';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import styles from './TreatmentExplorerSection.module.css';

export default function TreatmentExplorerSection() {
  const [ref, visible] = useIntersectionObserver({ threshold: .18 });
  return <section ref={ref} className={styles.section}>
    <div className={`${styles.inner} ${visible ? styles.visible : ''}`}>
      <div className={styles.copy}>
        <span className={styles.eyebrow}>Free tools</span>
        <h2>Small, transparent tools for AML decisions.</h2>
        <p>Browser-first calculators for exploring AML pathways and checking response criteria without report upload, account setup, or black-box reasoning.</p>
        <div className={styles.meta}><span>Browser-only options</span><span>No data stored</span><span>Fully explainable</span></div>
      </div>

      <div className={styles.toolGrid}>
        <article className={styles.toolCard}>
          <div className={styles.toolTop}>
            <span className={styles.toolTag}>Treatment pathway</span>
            <span className={styles.toolStatus}>Live</span>
          </div>
          <h3>AML Treatment Explorer</h3>
          <p>Walk through all 28 Coats-Delphi AML treatment cases in a deterministic decision tree.</p>
          <div className={styles.toolPoints}>
            <span>Molecular profile inputs</span>
            <span>Step-by-step pathway</span>
            <span>No AI required</span>
          </div>
          <Link href="/aml-treatment-explorer" className={styles.cta}>Open explorer <span>→</span></Link>
        </article>

        <article className={styles.toolCard}>
          <div className={styles.toolTop}>
            <span className={styles.toolTag}>Response criteria</span>
            <span className={styles.toolStatus}>Live demo</span>
          </div>
          <h3>ELN AML Response Calculator</h3>
          <p>ELN 2017/2022 response assessment from marrow findings and blood counts, with visible reasoning and a printable coordinator report.</p>
          <div className={styles.toolPoints}>
            <span>Manual, paste, or CSV bloods</span>
            <span>7-day blood-count window</span>
            <span>PDF report output</span>
          </div>
          <a href="https://haem-eln-response-calculator-92c7a45c14b8.herokuapp.com/" target="_blank" rel="noopener noreferrer" className={styles.cta}>Open calculator <span>→</span></a>
        </article>
      </div>
    </div>
  </section>;
}
