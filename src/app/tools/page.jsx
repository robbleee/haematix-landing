import Link from 'next/link';
import styles from './tools.module.css';

const toolRows = [
  {
    name: 'AML Treatment Explorer',
    type: 'Treatment pathway explorer',
    status: 'Available',
    purpose: 'Step through the Coats-Delphi AML treatment pathway cases using structured molecular and clinical inputs.',
    data: 'Browser-based use. No account required for the public explorer.',
    href: '/aml-treatment-explorer',
    external: false,
  },
  {
    name: 'ELN AML Response Calculator',
    type: 'Response criteria calculator',
    status: 'Demo hosted',
    purpose: 'Apply ELN 2017 and ELN 2022 AML response criteria from marrow findings and blood counts, with visible reasoning and PDF report output.',
    data: 'Hosted demo. For patient-identifiable use, deploy the standalone Node app inside the relevant organisation.',
    href: 'https://haem-eln-response-calculator-92c7a45c14b8.herokuapp.com/',
    external: true,
  },
];

export const metadata = {
  title: 'Tools',
  description: 'Haem.io tools and calculators for AML pathway exploration and ELN response assessment.',
  alternates: {
    canonical: '/tools',
  },
};

export default function ToolsPage() {
  return (
    <div className={styles.page}>
      <section className={styles.header}>
        <p className={styles.kicker}>Tools</p>
        <h1>Clinical workflow tools</h1>
        <p>
          A small directory of standalone haem.io tools. These are intended for
          structured exploration, audit, and decision support, not autonomous
          clinical decision-making.
        </p>
      </section>

      <section className={styles.notice}>
        <strong>Data handling note</strong>
        <p>
          Public hosted demos should not be used with identifiable patient data.
          Hospital or trial workflows should use an approved local deployment
          where required by information governance.
        </p>
      </section>

      <section className={styles.listSection} aria-label="Available tools">
        <div className={styles.tableHeader}>
          <span>Tool</span>
          <span>Use</span>
          <span>Status</span>
          <span>Data handling</span>
          <span>Access</span>
        </div>

        <div className={styles.toolList}>
          {toolRows.map((tool) => (
            <article className={styles.toolRow} key={tool.name}>
              <div className={styles.toolName}>
                <h2>{tool.name}</h2>
                <p>{tool.type}</p>
              </div>
              <p className={styles.purpose}>{tool.purpose}</p>
              <span className={styles.status}>{tool.status}</span>
              <p className={styles.data}>{tool.data}</p>
              {tool.external ? (
                <a
                  className={styles.action}
                  href={tool.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open
                </a>
              ) : (
                <Link className={styles.action} href={tool.href}>
                  Open
                </Link>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className={styles.footerNote}>
        <h2>Local deployment</h2>
        <p>
          The ELN AML Response Calculator is available as a lightweight Node app
          for private server deployment. It has no LLM component and is designed
          to show the response criteria and reasoning used for each assessment.
        </p>
        <a href="mailto:robert.lee@haem.io?subject=ELN%20AML%20Response%20Calculator%20deployment">
          Request deployment pack
        </a>
      </section>
    </div>
  );
}
