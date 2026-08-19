import Link from 'next/link';
import styles from './tools.module.css';

const toolRows = [
  {
    name: 'ELN 2022 AML Risk Calculator',
    type: 'Risk stratification calculator',
    status: 'Available',
    purpose: 'Explore illustrative ELN 2022 intensive-treatment AML risk logic from preset genetic and cytogenetic inputs, with visible reasoning.',
    data: 'Runs locally for education only. It does not assess reports, flow/morphology, or BPDCN. Do not enter patient identifiers.',
    href: '/tools/eln-risk-calculator',
    external: false,
  },
  {
    name: 'MDS / AML Boundary Checker',
    type: 'WHO/ICC classification helper',
    status: 'Available',
    purpose: 'Explore illustrative WHO 2022 and ICC 2022 outputs around the MDS, MDS/AML, and AML boundary using preset inputs.',
    data: 'Runs locally for education only. It does not assess reports, flow/morphology, or BPDCN. Do not enter patient identifiers.',
    href: '/tools/mds-aml-boundary-checker',
    external: false,
  },
  {
    name: 'TP53 Multi-Hit Checker',
    type: 'Molecular rule checker',
    status: 'Available',
    purpose: 'Explore how preset TP53 configurations affect illustrative WHO 2022, ICC 2022, and ELN 2022 outputs.',
    data: 'Runs locally for education only. It does not assess reports, flow/morphology, or BPDCN. Do not enter patient identifiers.',
    href: '/tools/tp53-multi-hit-checker',
    external: false,
  },
  {
    name: 'AML Treatment Explorer',
    type: 'Consensus pathway explorer',
    status: 'Available',
    purpose: 'Step through Coats-Delphi AML consensus pathway cases for educational review using structured molecular and clinical inputs.',
    data: 'Browser-based use. No account required for the public explorer.',
    href: '/aml-treatment-explorer',
    external: false,
  },
  {
    name: 'ELN AML Response Calculator',
    type: 'Response criteria calculator',
    status: 'Demo hosted',
    purpose: 'Apply ELN 2017 and ELN 2022 AML response criteria from marrow findings and blood counts for clinician review, with visible reasoning and PDF report output.',
    data: 'Hosted demo. For patient-identifiable use, deploy the standalone Node app inside the relevant organisation.',
    href: 'https://haem-eln-response-calculator-92c7a45c14b8.herokuapp.com/',
    external: true,
  },
];

export const metadata = {
  title: 'Tools',
  description: 'Haem.io tools and calculators for AML pathway exploration and transparent ELN response criteria review.',
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
          Hospital or trial workflows should use a governed local deployment
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
