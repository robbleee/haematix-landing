import Link from 'next/link';
import Image from 'next/image';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.introGrid}>
          <div className={styles.titleColumn}>
            <div className={styles.eyebrow}>
              AML &amp; MDS decision support
            </div>

            <h1 className={styles.title}>
              Focused software for the work around an <em>AML or MDS diagnosis.</em>
            </h1>
          </div>

          <div className={styles.copyColumn}>
            <p className={styles.subtitle}>
              Our current focus is a clinician-reviewed platform that brings together
              source-linked findings, diagnostic classification, risk profiling, and
              potential clinical-trial matching for AML and MDS.
            </p>

            <div className={styles.ctaGroup}>
              <Link href="/#projects" className={styles.ctaPrimary}>
                See what we are building
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
              <Link href="/team" className={styles.ctaSecondary}>
                Meet the team <span aria-hidden="true">↗</span>
              </Link>
            </div>

            <p className={styles.safetyNote}>
              Built as clinical workflow support—not autonomous diagnosis.
            </p>
          </div>
        </div>

        <figure className={styles.productFigure}>
          <figcaption className={styles.figureCaption}>
            <span>Fig. 01</span>
            <span>WHO diagnostic trace</span>
            <span>Synthetic example</span>
          </figcaption>

          <div className={styles.imageFrame}>
            <Image
              src="/new-screenshots-for-landing/diagnostic-trace-current.png"
              alt="Diagnostic trace showing a WHO 2022 decision map, the selected criterion, evidence used, and resulting pathway"
              width={2874}
              height={1620}
              className={styles.screenshotImg}
              priority
            />
          </div>

          <div className={styles.figureNote}>
            <span>Source visible</span>
            <span>Criteria explicit</span>
            <span>Clinician reviewed</span>
          </div>
        </figure>
      </div>
    </section>
  );
}
