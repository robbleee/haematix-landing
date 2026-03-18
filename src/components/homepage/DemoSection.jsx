'use client';

import Link from 'next/link';
import styles from './DemoSection.module.css';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';

export default function DemoSection() {
  const [headerRef, headerVisible] = useIntersectionObserver();
  const [videoRef, videoVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section className={styles.section}>
      {/* Wave divider — smooth transition from HeroSection */}
      <div className={styles.waveDivider}>
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 40C240 0 480 80 720 40C960 0 1200 80 1440 40V0H0V40Z" fill="#ffffff" />
        </svg>
      </div>
      <div className={styles.container}>
        <div
          ref={headerRef}
          className={`${styles.header} ${headerVisible ? styles.visible : ''}`}
        >
          <h2 className={styles.sectionTitle}>See It in Action</h2>
          <p className={styles.sectionSubtitle}>
            Watch{' '}
            <Link href="/team" className={styles.nameLink}>
              Dr. Luke Carter-Brzezinski
            </Link>{' '}
            demonstrate Haem.io classifying a real AML case in minutes
          </p>
        </div>

        <div
          ref={videoRef}
          className={`${styles.videoWrapper} ${videoVisible ? styles.visible : ''}`}
        >
          <div className={styles.videoContainer}>
            <iframe
              src="https://www.loom.com/embed/b7ed13ff312447cfb2352f813400a3f7"
              frameBorder="0"
              webkitallowfullscreen="true"
              mozallowfullscreen="true"
              allowFullScreen
              className={styles.video}
              title="Haem.io AML diagnostic demo by Dr. Luke Carter-Brzezinski"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
