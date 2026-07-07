'use client';

import Image from 'next/image';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import styles from './ProductWalkthrough.module.css';

const sections = [
  {
    id: 'upload',
    step: '01',
    title: 'Upload a report, or enter data manually',
    description: 'Enter structured findings directly, or use a report workflow to prepare key haematology findings for clinician review: mutations, VAF, cytogenetic abnormalities, blast percentage, and clinical qualifiers.',
    points: [
      'Supports structured review of report findings',
      'Detects mutations with variant allele frequency',
      'Identifies cytogenetic abnormalities and karyotype',
      'Extracts blast counts, flow markers, and clinical context',
    ],
    image: '/new-screenshots-for-landing/data-entry.png',
    alt: 'Report workflow showing structured findings from a TP53 case report',
    align: 'right',
  },
  {
    id: 'inspect',
    step: '02',
    title: 'Review the structured data',
    description: 'Every parsed or entered value is displayed in a structured summary alongside the source material. Clinicians can check, correct, and confirm the data before criteria are applied. Nothing is a black box.',
    points: [
      'Side-by-side view: parsed data vs original report',
      'Genetic mutations with classification significance flags',
      'TP53 allelic status detection (LOH, del17p, multi-hit)',
      'Cytogenetic complexity and myeloid-related abnormalities identified',
    ],
    image: '/new-screenshots-for-landing/data-inspector.png',
    alt: 'Data inspector showing parsed mutations (TP53, DNMT3A, TET2, ASXL1), cytogenetics, and original report',
    align: 'left',
  },
  {
    id: 'classify',
    step: '03',
    title: 'See the full criteria pathway',
    description: 'Haem.io runs clinician-confirmed case data through every decision node in the WHO 2022 and ICC 2022 classification trees. The result is not just a label: it is the complete execution path showing exactly which rules fired and why.',
    points: [
      'Full decision tree visualisation for WHO and ICC',
      'Every branch point shown: which passed, which failed',
      'Traceable reasoning with no hidden logic',
      'Dual classification: WHO 2022 5th Edition + ICC 2022',
    ],
    image: '/new-screenshots-for-landing/diagnostic-path.png',
    alt: 'ICC 2022 execution path showing the complete criteria decision tree with highlighted route',
    align: 'right',
  },
  {
    id: 'result',
    step: '04',
    title: 'Dual-framework classification with full reasoning',
    description: 'Haem.io displays WHO 2022 and ICC 2022 classification outputs side by side for clinician review. Each result includes the complete reasoning chain: every rule evaluated and every decision explained.',
    points: [
      'WHO 2022 5th Edition and ICC 2022 results side by side',
      'Clinical reasoning steps numbered and explained',
      'Final pathway derivation from blast percentage to genetic findings',
      'TP53 multi-hit evaluation with allelic status logic',
    ],
    image: '/new-screenshots-for-landing/classification-result.png',
    alt: 'Classification results showing WHO 2022 and ICC 2022 with clinical reasoning traces',
    align: 'left',
  },
  {
    id: 'risk',
    step: '05',
    title: 'Risk stratification and clinical decision support',
    description: 'Where configured, Haem.io applies ELN 2022 and ELN 2024 risk logic. Each risk category includes the calculation chain and supporting context so clinicians can verify every step.',
    points: [
      'ELN 2022 intensive and ELN 2024 non-intensive risk',
      'Median overall survival estimates',
      'Calculation steps visible and auditable',
    ],
    image: '/new-screenshots-for-landing/Risk-calculator.png',
    alt: 'Risk stratification showing ELN 2022 Adverse and ELN 2024 Adverse with median survival',
    align: 'left',
  },
  {
    id: 'trials',
    step: '06',
    title: 'Clinical trial matching support',
    description: 'Based on classification context, genetics, and case profile, Haem.io can surface potentially relevant clinical trials for review. Each match shows eligibility signals and what additional data is needed to confirm suitability.',
    points: [
      'Matches against curated UK trial database',
      'Eligibility signals (high, needs data, ineligible)',
      'Shows what extra information would refine the match',
      'Direct links to trial registries and contact details',
    ],
    image: '/new-screenshots-for-landing/clinical-trials.png',
    alt: 'Clinical trial matching showing eligible trials with confidence scores',
    align: 'right',
  },
];

export default function ProductWalkthrough() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.sectionTitle}>See Inside the Platform</h2>
          <p className={styles.sectionSubtitle}>
            From report upload to trial matching — every step is transparent, traceable, and clinician-verifiable.
          </p>
        </div>

        {sections.map((s) => (
          <WalkthroughRow key={s.id} {...s} />
        ))}
      </div>
    </section>
  );
}

function WalkthroughRow({ step, title, description, points, image, alt, align }) {
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
          width={1000}
          height={630}
          className={styles.screenshot}
        />
      </div>
    </div>
  );
}
