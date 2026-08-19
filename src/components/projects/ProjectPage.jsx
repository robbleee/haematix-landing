import Link from 'next/link';
import styles from './ProjectPage.module.css';

export default function ProjectPage({ project }) {
  return (
    <article className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.container}>
          <Link className={styles.backLink} href="/#projects">← Current work</Link>
          <div className={styles.heroGrid}>
            <div>
              <div className={styles.eyebrow}>{project.eyebrow}</div>
              <h1>{project.title}</h1>
            </div>
            <div className={styles.intro}>
              <p>{project.summary}</p>
              <dl className={styles.facts}>
                {project.facts.map((fact) => (
                  <div key={fact.label}>
                    <dt>{fact.label}</dt>
                    <dd>{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </header>

      <section className={styles.overview}>
        <div className={styles.container}>
          <div className={styles.sectionGrid}>
            <span className={styles.sectionLabel}>The work</span>
            <div className={styles.prose}>
              <h2>{project.problemTitle}</h2>
              {project.problem.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.workflow}>
        <div className={styles.container}>
          <div className={styles.sectionGrid}>
            <span className={styles.sectionLabel}>How it works</span>
            <div>
              <h2>{project.workflowTitle}</h2>
              <ol className={styles.steps}>
                {project.steps.map((step, index) => (
                  <li key={step.title}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <div>
                      <h3>{step.title}</h3>
                      <p>{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.boundaries}>
        <div className={styles.container}>
          <div className={styles.boundaryGrid}>
            <div>
              <span className={styles.sectionLabel}>Designed to provide</span>
              <ul>
                {project.provides.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
            <div>
              <span className={styles.sectionLabel}>Current boundaries</span>
              <ul>
                {project.boundaries.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <span>Next project</span>
          <Link href={project.next.href}>{project.next.label} →</Link>
        </div>
      </footer>
    </article>
  );
}
