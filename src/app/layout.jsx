import './globals.css';

export const metadata = {
  title: 'Haematix - Haematology Diagnosis Tool',
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
          <div className="container" style={{ padding: '1rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
              <span className="text-gradient">Haematix</span>
            </div>
            <nav>
              <ul style={{ display: 'flex', gap: '1.5rem', listStyle: 'none' }}>
                <li><a href="#features">Features</a></li>
                <li><a href="full-flow">Workflow</a></li>
                <li><a href="#contact">Contact</a></li>
                <li><a className="button" href="https://blood-cancer-classifier.streamlit.app/">Login</a></li>
              </ul>
            </nav>
          </div>
        </header>
        <main>
          {children}
        </main>
        <footer style={{ backgroundColor: 'var(--secondary-background-color)', padding: '2rem 0' }}>
          <div className="container" style={{ textAlign: 'center' }}>
            <p>© {new Date().getFullYear()} Haematix. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
} 