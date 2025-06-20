import './globals.css';
import Link from 'next/link';

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
        <header style={{ backgroundColor: 'var(--background-color)', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
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
            <nav>
              <ul style={{ display: 'flex', gap: '1.5rem', listStyle: 'none' }}>
                <li><Link href="/" style={{ textDecoration: 'none' }}>Home</Link></li>
                <li><Link href="/vision" style={{ textDecoration: 'none' }}>Our Vision</Link></li>
                <li><Link href="/roadmap" style={{ textDecoration: 'none' }}>Roadmap</Link></li>
                <li><Link href="/testing-stats" style={{ textDecoration: 'none' }}>Testing Suite</Link></li>
                <li><a className="button" href="https://haemio.streamlit.app/" target="_blank" rel="noopener noreferrer">Login</a></li>
              </ul>
            </nav>
          </div>
        </header>
        <main>
          {children}
        </main>
        <footer style={{ backgroundColor: 'var(--secondary-background-color)', padding: '2rem 0' }}>
          <div className="container" style={{ textAlign: 'center' }}>
            <p>© {new Date().getFullYear()} Haem.io. All rights reserved.</p> 
          </div>
        </footer>
      </body>
    </html>
  );
} 