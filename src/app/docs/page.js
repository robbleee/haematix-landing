'use client';

import { useState, useEffect } from 'react';
import { marked } from 'marked';

export default function DocsPage() {
  const [docs, setDocs] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [docContent, setDocContent] = useState('');
  const [loading, setLoading] = useState(false);

  // List of documentation files
  const docFiles = [
    { name: 'User Manual', file: 'user_manual.md', description: 'Complete guide for end users' },
    { name: 'Developer Guide', file: 'developer_guide.md', description: 'Technical guide for developers' },
    { name: 'Technical Architecture', file: 'technical_architecture.md', description: 'System architecture and design' },
    { name: 'Data Formats', file: 'data_formats.md', description: 'Data structure specifications' },
    { name: 'Classification Algorithms', file: 'classification_algorithms.md', description: 'Algorithm implementations and logic' },
    { name: 'Clinical Trial Matching', file: 'clinical_trial_matching_system.md', description: 'Clinical trial matching system overview' },
    { name: 'Treatment Parser Integration', file: 'treatment_parser_integration.md', description: 'Treatment parser integration guide' },
    { name: 'App Functionality', file: 'app_functionality.md', description: 'Application features and functionality' }
  ];

  useEffect(() => {
    setDocs(docFiles);
  }, []);

  const loadDoc = async (filename) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/docs/${filename}`);
      if (!response.ok) throw new Error('Failed to load document');
      const content = await response.text();
      setDocContent(marked(content));
      setSelectedDoc(filename);
    } catch (error) {
      console.error('Error loading document:', error);
      setDocContent('<p style="color: #ef4444;">Error loading document. Please try again.</p>');
    }
    setLoading(false);
  };

  const goBack = () => {
    setSelectedDoc(null);
    setDocContent('');
  };

  if (selectedDoc) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: 'var(--secondary-background-color)' }}>
        <div className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
          {/* Header with back button */}
          <div style={{ marginBottom: '2rem' }}>
            <button
              onClick={goBack}
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
                cursor: 'pointer',
                transition: 'var(--transition)'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#f9fafb'}
              onMouseOut={(e) => e.target.style.backgroundColor = 'var(--background-color)'}
            >
              <span style={{ marginRight: '0.5rem' }}>←</span>
              Back to Documentation
            </button>
            <h1 style={{ marginTop: '1rem', fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-color)' }}>
              {docs.find(doc => doc.file === selectedDoc)?.name || selectedDoc}
            </h1>
          </div>

          {/* Document content */}
          <div style={{
            backgroundColor: 'var(--background-color)',
            borderRadius: 'var(--border-radius)',
            boxShadow: 'var(--box-shadow)',
            border: '1px solid #e5e7eb'
          }}>
            {loading ? (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '3rem'
              }}>
                <div style={{
                  width: '2rem',
                  height: '2rem',
                  border: '2px solid #f3f4f6',
                  borderTop: '2px solid var(--primary-color)',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}></div>
                <span style={{ marginLeft: '0.75rem', color: '#6b7280' }}>Loading document...</span>
              </div>
            ) : (
              <div 
                style={{
                  maxWidth: 'none',
                  padding: '2rem',
                  lineHeight: '1.75',
                  fontSize: '1.125rem'
                }}
                dangerouslySetInnerHTML={{ __html: docContent }}
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--secondary-background-color)' }}>
      <div className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--text-color)', marginBottom: '1rem' }}>
            Documentation
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#6b7280', maxWidth: '48rem', margin: '0 auto' }}>
            Comprehensive guides and references for understanding and working with our medical classification system.
          </p>
        </div>

        {/* Documentation Grid */}
        <div style={{
          display: 'grid',
          gap: '1.5rem',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          marginBottom: '4rem'
        }}>
          {docs.map((doc, index) => (
            <div
              key={doc.file}
              style={{
                backgroundColor: 'var(--background-color)',
                borderRadius: 'var(--border-radius)',
                boxShadow: 'var(--box-shadow)',
                border: '1px solid #e5e7eb',
                cursor: 'pointer',
                transition: 'var(--transition)'
              }}
              onClick={() => loadDoc(doc.file)}
              onMouseOver={(e) => e.target.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)'}
              onMouseOut={(e) => e.target.style.boxShadow = 'var(--box-shadow)'}
            >
              <div style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                  <div style={{ flexShrink: 0 }}>
                    <div style={{
                      width: '2.5rem',
                      height: '2.5rem',
                      backgroundColor: '#dbeafe',
                      borderRadius: 'var(--border-radius)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <span style={{ fontSize: '1.25rem' }}>📄</span>
                    </div>
                  </div>
                  <div style={{ marginLeft: '1rem' }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: 'var(--text-color)', margin: 0 }}>
                      {doc.name}
                    </h3>
                  </div>
                </div>
                <p style={{ color: '#6b7280', marginBottom: '1rem', fontSize: '0.875rem' }}>
                  {doc.description}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', color: 'var(--primary-color)', fontSize: '0.875rem', fontWeight: '500' }}>
                  <span>Read documentation</span>
                  <span style={{ marginLeft: '0.25rem' }}>→</span>
                </div>
              </div>
            </div>
          ))}
        </div>


      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
} 