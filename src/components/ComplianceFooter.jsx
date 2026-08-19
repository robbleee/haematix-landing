'use client';

import Link from 'next/link';
import styles from './ComplianceFooter.module.css';

export default function ComplianceFooter() {
  const complianceLinks = [
    {
      title: 'Privacy Notice',
      href: '/privacy-policy',
      description: 'How we collect, use, and protect your data'
    },
    {
      title: 'Data Processing Addendum',
      href: '/data-processing-addendum',
      description: 'Processor terms for customer deployments'
    },
    {
      title: 'Subprocessors',
      href: '/subprocessors',
      description: 'Third-party providers used to operate Haem.io'
    },
    {
      title: 'Retention',
      href: '/data-retention',
      description: 'How long we keep different categories of data'
    },
    {
      title: 'Clinical Safety',
      href: '/clinical-safety',
      description: 'Intended use and clinician-in-the-loop notice'
    },
    {
      title: 'Cookie Notice',
      href: '/cookie-notice',
      description: 'Cookies, local storage, and analytics'
    },
    {
      title: 'Security & Compliance',
      href: '/compliance/security',
      description: 'Security measures and compliance overview'
    },
    {
      title: 'Your Rights',
      href: '/compliance/individual-rights',
      description: 'How to exercise your data protection rights'
    },
    {
      title: 'Legal Basis',
      href: '/compliance/legal-basis',
      description: 'Legal justification for data processing'
    }
  ];

  const quickLinks = [
    { title: 'Tools', href: '/tools' },
    { title: 'Clinical trials', href: '/clinical-trials' },
    { title: 'Articles', href: '/articles' },
    { title: 'Team', href: '/team' },
    { title: 'App Login', href: 'https://app.haem.io/', external: true },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerGrid}>
          {/* Company Info */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Haem.io</h3>
            <p className={styles.description}>
              Clinician-facing haematology decision support using transparent WHO 2022 and ICC 2022
              criteria mapping. Outputs support professional review and do not replace clinical judgement.
            </p>
            <div className={styles.contact}>
              <p>
                <strong>Contact:</strong><br />
                <a href="mailto:robert.lee@haem.io" className={styles.link}>
                 robert.lee@haem.io
                </a>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Explore</h3>
            <ul className={styles.linkList}>
              {quickLinks.map((link, index) => (
                <li key={index}>
                  {link.external ? (
                    <a 
                      href={link.href} 
                      className={styles.link}
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      {link.title}
                    </a>
                  ) : (
                    <Link href={link.href} className={styles.link}>
                      {link.title}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Compliance & Legal */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Compliance & Legal</h3>
            <ul className={styles.linkList}>
              {complianceLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className={styles.link} title={link.description}>
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <div className={styles.copyright}>
            <p>© {new Date().getFullYear()} Haem.io. All rights reserved.</p>
            <p className={styles.disclaimer}>
              This tool is for healthcare professional decision support only and should not replace clinical judgement.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
} 
