'use client';

import Image from 'next/image';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import styles from './ProductWalkthrough.module.css';

const sections = [
  {
    id: 'inspect',
    step: '01',
    title: 'Review findings against their source',
    description: 'Structured findings remain alongside the original report text, so clinicians can inspect what was recorded and identify items that still need review.',
    points: [
      'Source report and structured findings shown together',
      'Blast, molecular, cytogenetic, and immunophenotype review',
      'Clinician-entered values clearly distinguished',
      'Uncertain parser matches surfaced for review',
    ],
    image: '/new-screenshots-for-landing/source-review-current.png',
    width: 2870,
    height: 1622,
    alt: 'Classification results input summary showing structured findings beside highlighted source report evidence',
    align: 'right',
  },
  {
    id: 'map',
    step: '02',
    title: 'See the complete classifier map',
    description: 'Explore the configured WHO, ICC, ELN risk, validation-and-gates, and downstream MRD logic as a connected system rather than a hidden calculation.',
    points: [
      'Complete WHO 2022 classifier view',
      'Explicit terminal results and labelled branches',
      'Selectable decisions and outcomes',
      'Separate views for AML, CML, MDS, CMML, and MPN rules',
    ],
    image: '/new-screenshots-for-landing/classifier-map-current.png',
    width: 2872,
    height: 1618,
    alt: 'Complete classifier map showing WHO 2022 AML rules, labelled branches, and terminal results',
    align: 'left',
  },
  {
    id: 'result',
    step: '03',
    title: 'Compare framework outputs',
    description: 'WHO 2022 and ICC 2022 outcomes are presented separately, with direct access to the clinical reasoning steps and diagnostic trace behind each result.',
    points: [
      'WHO 2022 and ICC 2022 outcomes kept distinct',
      'Clinical reasoning available step by step',
      'Diagnostic trace linked from each framework result',
      'Outputs remain available for clinician review',
    ],
    image: '/new-screenshots-for-landing/classification-results-current.png',
    width: 1748,
    height: 570,
    alt: 'WHO 2022 and ICC 2022 classification outputs with links to clinical reasoning and diagnostic traces',
    align: 'right',
  },
];

export default function ProductWalkthrough() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.kicker}>How we build</span>
          <h2 className={styles.sectionTitle}>The source and the reasoning stay visible</h2>
          <p className={styles.sectionSubtitle}>
            Our main platform is currently focused on AML and MDS, from source-linked
            findings and diagnostic classification to risk profiling and potential
            trial matching.
          </p>
        </div>

        {sections.map((s) => (
          <WalkthroughRow key={s.id} {...s} />
        ))}
      </div>
    </section>
  );
}

function WalkthroughRow({ step, title, description, points, image, width, height, alt, align }) {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.15 });

  return (
    <div
      ref={ref}
      className={`${styles.row} ${styles[`align${align}`]} ${isVisible ? styles.rowVisible : ''}`}
    >
      <div className={styles.textCol}>
        <span className={styles.stepNum}>{step}</span>
        <h3 className={styles.rowTitle}>{title}</h3>
        <p className={styles.rowDesc}>{description}</p>
        <ul className={styles.pointsList}>
          {points.map((p, i) => (
            <li key={i}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              {p}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.imageCol}>
        <Image
          src={image}
          alt={alt}
          width={width}
          height={height}
          className={styles.screenshot}
        />
      </div>
    </div>
  );
}
