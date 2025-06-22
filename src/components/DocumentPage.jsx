import Link from 'next/link';
import MarkdownRenderer from './MarkdownRenderer';

export default function DocumentPage({ 
  title, 
  description, 
  documentPath,
  backHref = "/",
  backText = "Back to Home"
}) {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--secondary-background-color)' }}>
      <div className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        {/* Header with back button */}
        <div style={{ marginBottom: '2rem' }}>
          <Link
            href={backHref}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '0.5rem 1rem',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: 'var(--text-color)',
              backgroundColor: 'var(--background-color)',
              border: '1px solid #d1d5db',
              borderRadius: 'var(--border-radius)',
              textDecoration: 'none',
              transition: 'var(--transition)'
            }}
          >
            <span style={{ marginRight: '0.5rem' }}>←</span>
            {backText}
          </Link>
          <h1 style={{ 
            marginTop: '1rem', 
            fontSize: '2.5rem', 
            fontWeight: 'bold', 
            color: 'var(--text-color)',
            marginBottom: '0.5rem'
          }}>
            {title}
          </h1>
          <p style={{ color: '#6b7280', fontSize: '1.125rem' }}>
            {description}
          </p>
        </div>

        {/* Document Content */}
        <div style={{
          backgroundColor: 'var(--background-color)',
          borderRadius: 'var(--border-radius)',
          boxShadow: 'var(--box-shadow)',
          border: '1px solid #e5e7eb',
          overflow: 'hidden'
        }}>
          <MarkdownRenderer 
            documentPath={documentPath}
            title={title}
            description={description}
          />
        </div>
      </div>
    </div>
  );
} 