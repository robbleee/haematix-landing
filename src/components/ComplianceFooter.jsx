'use client';

import Link from 'next/link';
import styles from './ComplianceFooter.module.css';

export default function ComplianceFooter() {
  const complianceLinks = [
    {
      title: 'Privacy Policy',
      href: '/privacy-policy',
      description: 'How we collect, use, and protect your data'
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
    { title: 'Home', href: '/' },
    { title: 'Our Vision', href: '/vision' },
    { title: 'Roadmap', href: '/roadmap' },
    { title: 'About', href: '/about' },
    { title: 'Contact', href: '/contact' },
    { title: 'For Investors', href: '/data-room' },
    { title: 'App Login', href: 'https://app.haem.io/', external: true }
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerGrid}>
          {/* Company Info */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Haem.io</h3>
            <p className={styles.description}>
              Advanced haematology diagnosis tool using WHO 2022 and ICC 2022 classifications 
              to support healthcare professionals in accurate blood cancer diagnosis.
            </p>
            <div className={styles.contact}>
              <p>
                <strong>Contact:</strong><br />
                <a href="mailto:robert.lee@haem.io" className={styles.link}>
                 robert.lee@haem.io
                </a>
              </p>
              <p style={{ marginTop: '1rem' }}>
                <strong>Company:</strong><br />
                HAEMIO LTD<br />
                Company Number: 16528517<br />
                73 Meliden Road, Prestatyn<br />
                LL19 8RH, United Kingdom
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Quick Links</h3>
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

          {/* Healthcare Compliance */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Healthcare Standards</h3>
            <div className={styles.complianceInfo}>
              <p className={styles.complianceItem}>
                <span className={styles.complianceIcon}>🛡️</span>
                <strong>UK GDPR Compliant</strong><br />
                <small>Full data protection compliance</small>
              </p>
              <p className={styles.complianceItem}>
                <span className={styles.complianceIcon}>🔒</span>
                <strong>Healthcare Grade Security</strong><br />
                <small>End-to-end encryption & anonymization</small>
              </p>
              <p className={styles.complianceItem}>
                <span className={styles.complianceIcon}>📋</span>
                <strong>Clinical Standards</strong><br />
                <small>WHO 2022 & ICC 2022 classifications</small>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <div className={styles.copyright}>
            <p>© {new Date().getFullYear()} Haem.io. All rights reserved.</p>
            <p className={styles.disclaimer}>
              This tool is for healthcare professional use only and should not replace clinical judgment.
            </p>
          </div>
          <div className={styles.lastUpdated}>
            <p>Documentation last updated: December 2024</p>
          </div>
        </div>
      </div>
    </footer>
  );
} 