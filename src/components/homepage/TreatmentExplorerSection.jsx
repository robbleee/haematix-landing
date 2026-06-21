'use client';

import Link from 'next/link';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import styles from './TreatmentExplorerSection.module.css';

export default function TreatmentExplorerSection() {
  const [ref, visible] = useIntersectionObserver({ threshold: .18 });
  return <section ref={ref} className={styles.section}>
    <div className={`${styles.inner} ${visible ? styles.visible : ''}`}>
      <div className={styles.copy}><span className={styles.eyebrow}>Try the pathway</span><h2>From molecular profile<br/>to consensus pathway.</h2><p>Walk through all 28 Coats–Delphi AML treatment cases in a transparent, deterministic decision tree. No report upload and no AI required.</p><Link href="/aml-treatment-explorer" className={styles.cta}>Open the treatment explorer <span>→</span></Link><div className={styles.meta}><span>● Browser-only</span><span>● No data stored</span><span>● Fully explainable</span></div></div>
      <div className={styles.preview}><div className={styles.previewTop}><span><i/> Path in progress</span><em>04 / 07</em></div><div className={styles.route}><div className={styles.done}><b>✓</b><span><strong>NPM1 detected</strong><small>Defining genetics</small></span></div><i/><div className={styles.done}><b>✓</b><span><strong>FLT3-ITD</strong><small>FLT3 profile</small></span></div><i/><div className={styles.active}><b>3</b><span><strong>Normal cytogenetics</strong><small>Current branch</small></span></div><i/><div className={styles.future}><b>4</b><span><strong>sAML mutations</strong><small>Next question</small></span></div></div><div className={styles.previewResult}><span>Cases remaining</span><strong>2</strong><div><i>Case 10</i><i>Case 11</i></div></div></div>
    </div>
  </section>;
}
