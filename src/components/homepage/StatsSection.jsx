'use client';

import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import useAnimatedCounter from '../../hooks/useAnimatedCounter';
import styles from './StatsSection.module.css';

const stats = [
  { value: 100, suffix: '%', label: 'Gene Extraction Accuracy', prefix: '' },
  { value: 2, suffix: '', label: 'Classification Frameworks', prefix: '' },
  { value: 3, suffix: 'x', label: 'Faster with Parallel Processing', prefix: '' },
  { value: 2, suffix: 'min', label: 'Report to Diagnosis', prefix: '<' },
];

function StatItem({ stat, isVisible }) {
  const count = useAnimatedCounter(stat.value, stat.value > 10 ? 2000 : 1200, isVisible);

  return (
    <div className={styles.stat}>
      <div className={styles.statValue}>
        {stat.prefix}{count}{stat.suffix}
      </div>
      <div className={styles.statLabel}>{stat.label}</div>
    </div>
  );
}

export default function StatsSection() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.2 });

  return (
    <section className={styles.section} ref={ref}>
      <div className={styles.pattern} />
      <div className={styles.container}>
        <div className={`${styles.grid} ${isVisible ? styles.visible : ''}`}>
          {stats.map((stat) => (
            <StatItem key={stat.label} stat={stat} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}
