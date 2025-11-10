import './globals.css';
import Link from 'next/link';
import CookieBanner from '../components/CookieBanner';
import ComplianceFooter from '../components/ComplianceFooter';
import MobileNav from '../components/MobileNav';

export const metadata = {
  title: 'Haem.io - Haematology Diagnosis Tool',
  description: 'Advanced tool for haematology diagnoses using WHO 2022 and ICC 2022 classifications',
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
          <div style={{ 
            padding: '1rem 2rem', 
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
              <ul style={{ display: 'flex', gap: '1.5rem', listStyle: 'none', margin: 0, padding: 0, alignItems: 'center' }}>
                <li><Link href="/" style={{ textDecoration: 'none', color: '#333', fontWeight: '500' }}>Home</Link></li>
                <li><Link href="/vision" style={{ textDecoration: 'none', color: '#333', fontWeight: '500' }}>Our Vision</Link></li>
                <li><Link href="/roadmap" style={{ textDecoration: 'none', color: '#333', fontWeight: '500' }}>Roadmap</Link></li>
                <li><Link href="/about" style={{ textDecoration: 'none', color: '#333', fontWeight: '500' }}>About</Link></li>
                <li><Link href="/contact" style={{ textDecoration: 'none', color: '#333', fontWeight: '500' }}>Contact</Link></li>
                <li><Link href="/data-room" style={{ textDecoration: 'none', color: '#009688', fontWeight: '600' }}>For Investors</Link></li>
                <li><a className="button" href="https://app.haem.io/" target="_blank" rel="noopener noreferrer" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>Login</a></li>
              </ul>
            </nav>

            {/* Mobile Navigation Component */}
            <MobileNav />
          </div>
        </header>
        <main>
          {children}
        </main>
        <ComplianceFooter />
        <CookieBanner />
      </body>
    </html>
  );
} 