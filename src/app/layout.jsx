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
  description: 'Haem.io (Haemio) is clinician-facing haematology decision support for transparent WHO 2022, ICC 2022, and ELN-aligned criteria review.',
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
    description: 'Haem.io (Haemio) supports clinician-led leukaemia and myeloid disease classification review using transparent WHO 2022, ICC 2022, and ELN-guided logic.',
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
    description: 'Haem.io (Haemio) supports clinician-led leukaemia and myeloid disease classification review using WHO 2022, ICC 2022, and ELN-guided logic.',
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
        <header style={{ backgroundColor: 'var(--background-color)', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', position: 'relative' }}>
          <div className="header-inner" style={{ 
            padding: '1rem 1.25rem',
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            maxWidth: '1600px',
            margin: '0 auto'
          }}>
            <div style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
              <Link href="/" style={{ textDecoration: 'none' }}>
                <span className="text-gradient">Haem.io</span>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <nav>
              <ul style={{ display: 'flex', gap: '1.5rem', listStyle: 'none', margin: 0, padding: 0 }}>
                <li><Link href="/" style={{ textDecoration: 'none' }}>Home</Link></li>
                <li><Link href="/team" style={{ textDecoration: 'none' }}>Team</Link></li>
                <li><Link href="/articles" style={{ textDecoration: 'none' }}>Articles</Link></li>
                <li><Link href="/tools" style={{ textDecoration: 'none' }}>Tools</Link></li>
                <li><a href="https://learn.haem.io" style={{ textDecoration: 'none' }}>Learn</a></li>
                <li><Link href="/clinical-trials" style={{ textDecoration: 'none' }}>Clinical Trials</Link></li>
                <li><Link href="/mcp" style={{ textDecoration: 'none' }}>MCP</Link></li>
                <li><a className="button" href="https://app.haem.io/" target="_blank" rel="noopener noreferrer">Login</a></li>
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
