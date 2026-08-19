import './globals.css';
import Link from 'next/link';
import CookieBanner from '../components/CookieBanner';
import ConsentAnalytics from '../components/ConsentAnalytics';
import ComplianceFooter from '../components/ComplianceFooter';
import MobileNav from '../components/MobileNav';

export const metadata = {
  metadataBase: new URL('https://haem.io'),
  title: {
    default: 'Haem.io | Haematology Decision Support',
    template: '%s | Haem.io'
  },
  description: 'Haem.io is currently focused on clinician-reviewed AML and MDS diagnostic classification, risk profiling, and potential clinical-trial matching.',
  alternates: {
    canonical: '/'
  },
  keywords: [
    'Haem.io',
    'Haemio',
    'leukaemia decision support',
    'leukaemia classifier',
    'myeloid disease classification',
    'haematology criteria review'
  ],
  openGraph: {
    type: 'website',
    url: 'https://haem.io',
    siteName: 'Haem.io',
    title: 'Haem.io | Haematology Decision Support',
    description: 'Clinician-reviewed software focused on AML and MDS diagnostic classification, risk profiling, and potential clinical-trial matching.',
    images: [
      {
        url: '/new-screenshots-for-landing/classification-result.png',
        width: 1200,
        height: 630,
        alt: 'Haem.io WHO 2022 and ICC 2022 leukaemia classification support with transparent reasoning',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Haem.io | Haematology Decision Support',
    description: 'Clinician-reviewed software focused on AML and MDS diagnostic classification, risk profiling, and potential clinical-trial matching.',
    images: ['/new-screenshots-for-landing/classification-result.png'],
  },
  robots: {
    index: true,
    follow: true
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any', type: 'image/x-icon' },
      { url: '/favicon.svg', type: 'image/svg+xml' }
    ]
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="header-inner">
            <div className="site-logo">
              <Link href="/">
                Haem<span>.io</span>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="desktop-nav" aria-label="Primary navigation">
              <ul>
                <li><Link href="/#projects">Projects</Link></li>
                <li><Link href="/clinical-trials">Clinical trials</Link></li>
                <li><Link href="/articles">Articles</Link></li>
                <li><Link href="/team">Team</Link></li>
                <li><a className="header-login" href="https://app.haem.io/" target="_blank" rel="noopener noreferrer">Sign in</a></li>
              </ul>
            </nav>

            {/* Mobile Navigation Component */}
            <MobileNav />
          </div>
        </header>
        <main>
          {children}
        </main>
        <ConsentAnalytics />
        <ComplianceFooter />
        <CookieBanner />
      </body>
    </html>
  );
}
