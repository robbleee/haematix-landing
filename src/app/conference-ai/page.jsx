export const metadata = {
  title: 'ConferenceAI',
  description: 'AI-powered conference capture for medical haematology conferences. Extract clinical highlights, efficacy data, and safety signals from EBMT, ASH, and EHA presentations.',
};

export default function ConferenceAIPage() {
  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh' }}>

      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, #009688 0%, #00796B 100%)',
        color: 'white',
        padding: '5rem 0 4rem',
        textAlign: 'center',
      }}>
        <div className="container">
          <p style={{
            fontSize: '0.85rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '1rem',
            opacity: 0.85,
          }}>
            Haem.io Product
          </p>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3.25rem)',
            fontWeight: 800,
            marginBottom: '1.25rem',
            lineHeight: 1.1,
          }}>
            ConferenceAI
          </h1>
          <p style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
            maxWidth: '680px',
            margin: '0 auto 2.5rem',
            lineHeight: 1.6,
            opacity: 0.92,
          }}>
            AI-powered capture and analysis of medical conference presentations.
            Turn hours of slides and speaker audio into structured clinical summaries in minutes.
          </p>
          <a
            href="https://haemio-conferenceai-cc44c37efac2.herokuapp.com/dashboard/index.html"
            target="_blank"
            rel="noopener noreferrer"
            className="button"
            style={{
              fontSize: '1.05rem',
              padding: '0.85rem 2.25rem',
              background: 'white',
              color: '#009688',
              fontWeight: 700,
              borderRadius: '8px',
              textDecoration: 'none',
              display: 'inline-block',
            }}
          >
            Access Dashboard
          </a>
        </div>
      </section>

      {/* Description */}
      <section style={{ padding: '4rem 0', background: 'white' }}>
        <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1a202c', marginBottom: '1.25rem' }}>
            Clinical Intelligence from Every Session
          </h2>
          <p style={{ fontSize: '1.05rem', color: '#4a5568', lineHeight: 1.7 }}>
            ConferenceAI captures presentations from major haematology conferences
            — EBMT, ASH, and EHA — and uses AI to extract clinical highlights,
            efficacy data, and safety signals. The result is a structured, searchable
            knowledge base that keeps your medical affairs and clinical teams current
            without requiring hours of manual note-taking.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1a202c', textAlign: 'center', marginBottom: '3rem' }}>
            How It Works
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '2rem',
            maxWidth: '960px',
            margin: '0 auto',
          }}>
            {[
              {
                step: '1',
                title: 'Install Extension',
                desc: 'Add the ConferenceAI Chrome extension to your browser.',
              },
              {
                step: '2',
                title: 'Navigate to Session',
                desc: 'Open any conference presentation on the virtual platform (EBMT, ASH, EHA).',
              },
              {
                step: '3',
                title: 'Click Capture',
                desc: 'The extension records slides and transcript as the presentation plays.',
              },
              {
                step: '4',
                title: 'AI Summary',
                desc: 'Claude AI processes the content and generates a structured clinical summary with efficacy and safety data.',
              },
            ].map((item) => (
              <div
                key={item.step}
                style={{
                  background: 'white',
                  borderRadius: '12px',
                  padding: '2rem 1.5rem',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  border: '1px solid #e2e8f0',
                  textAlign: 'center',
                }}
              >
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: '#009688',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  margin: '0 auto 1rem',
                }}>
                  {item.step}
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a202c', marginBottom: '0.5rem' }}>
                  {item.title}
                </h3>
                <p style={{ color: '#718096', fontSize: '0.95rem', lineHeight: 1.5, margin: 0 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section style={{ padding: '4rem 0', background: 'white' }}>
        <div className="container">
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1a202c', textAlign: 'center', marginBottom: '3rem' }}>
            Key Features
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.25rem',
            maxWidth: '900px',
            margin: '0 auto',
          }}>
            {[
              { title: 'Slide + Transcript Capture', desc: 'Records every slide image alongside synchronised speaker audio transcript.' },
              { title: 'Claude AI Analysis', desc: 'Powered by Anthropic Claude to produce accurate, context-aware clinical summaries.' },
              { title: 'Efficacy Data Extraction', desc: 'Automatically identifies and structures key efficacy endpoints from presentations.' },
              { title: 'Safety Signal Detection', desc: 'Highlights adverse events, dose modifications, and safety-related findings.' },
              { title: 'Multi-Conference Support', desc: 'Works across EBMT, ASH, and EHA virtual conference platforms.' },
              { title: 'Batch Capture Mode', desc: 'Queue multiple sessions for unattended capture and processing.' },
              { title: 'Token Cost Tracking', desc: 'Transparent reporting of AI processing costs per session and in aggregate.' },
            ].map((feature) => (
              <div
                key={feature.title}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                  padding: '1.25rem',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  background: '#f8f9fa',
                }}
              >
                <span style={{
                  color: '#009688',
                  fontWeight: 700,
                  fontSize: '1.2rem',
                  lineHeight: 1,
                  flexShrink: 0,
                  marginTop: '2px',
                }}>
                  &#x2713;
                </span>
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1a202c', margin: '0 0 0.25rem' }}>
                    {feature.title}
                  </h3>
                  <p style={{ color: '#718096', fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '4rem 0 5rem', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a202c', marginBottom: '1rem' }}>
            Ready to streamline your conference coverage?
          </h2>
          <p style={{ color: '#4a5568', marginBottom: '2rem', fontSize: '1.05rem' }}>
            Access the ConferenceAI dashboard to view captured sessions and AI-generated summaries.
          </p>
          <a
            href="https://haemio-conferenceai-cc44c37efac2.herokuapp.com/dashboard/index.html"
            target="_blank"
            rel="noopener noreferrer"
            className="button"
            style={{
              fontSize: '1.05rem',
              padding: '0.85rem 2.25rem',
              textDecoration: 'none',
              display: 'inline-block',
            }}
          >
            Access Dashboard
          </a>
        </div>
      </section>
    </div>
  );
}
