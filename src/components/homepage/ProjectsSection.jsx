import Link from 'next/link';
import styles from './ProjectsSection.module.css';

const projects = [
  {
    number: '01',
    partner: 'The Christie',
    title: 'AML treatment response',
    status: 'Internal evaluation',
    description:
      'A deterministic ELN 2017 and 2022 response calculator that makes every threshold, missing value and blood-count source visible for review.',
    outcome: 'From assessment data to an auditable response summary and PDF.',
    href: '/projects/eln-response',
  },
  {
    number: '02',
    partner: 'haemOS',
    title: 'A modern diagnostic workflow',
    status: 'Sandbox proof of concept',
    description:
      'An exploration of what comes after HODS: connecting referral, validated laboratory results, classification, reporting and final sign-off in one case workspace.',
    outcome: 'Designed around Epic and NHS sandbox integration boundaries.',
    href: '/projects/haemos',
  },
  {
    number: '03',
    partner: 'Cambodia',
    title: 'AML records and cohort exploration',
    status: 'Prototype',
    description:
      'Source-linked extraction from Cambodian Tumor Board and CanReg proformas, followed by human review, a shared case register and governed cohort queries.',
    outcome: 'The core extraction and query workflow is deterministic.',
    href: '/projects/cambodia',
  },
];

export default function ProjectsSection() {
  return (
    <section className={styles.section} id="projects">
      <div className={styles.container}>
        <header className={styles.header}>
          <span className={styles.kicker}>Current work</span>
          <h2>Three problems we are working on now.</h2>
          <p>
            Different clinical settings, one approach: make the source, rules and
            human review points explicit.
          </p>
        </header>

        <div className={styles.list}>
          {projects.map((project) => (
            <article className={styles.project} key={project.href}>
              <div className={styles.projectIndex}>{project.number}</div>
              <div className={styles.projectBody}>
                <div className={styles.projectMeta}>
                  <span>{project.partner}</span>
                  <span>{project.status}</span>
                </div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className={styles.projectFooter}>
                  <span>{project.outcome}</span>
                  <Link href={project.href}>Read about the project <span aria-hidden="true">↗</span></Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
