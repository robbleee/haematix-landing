'use client';

import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import 'github-markdown-css/github-markdown-light.css';

export default function MarkdownRenderer({ 
  documentPath, 
  title, 
  description,
  loadingText = "Loading document..." 
}) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDocument = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`/api/docs/${documentPath}`);
        if (!response.ok) throw new Error(`Failed to load ${title}`);
        const markdownContent = await response.text();
        setContent(markdownContent);
      } catch (error) {
        console.error(`Error loading ${title}:`, error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (documentPath) {
      loadDocument();
    }
  }, [documentPath, title]);

  if (loading) {
    return (
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
        <span style={{ marginLeft: '0.75rem', color: '#6b7280' }}>{loadingText}</span>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        padding: '2rem',
        textAlign: 'center',
        color: '#ef4444'
      }}>
        <p>Error loading {title}: {error}</p>
        <p style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.5rem' }}>
          Please try refreshing the page or contact support if the problem persists.
        </p>
      </div>
    );
  }

  return (
    <div className="markdown-body" style={{
      padding: '2rem',
      fontSize: '16px',
      lineHeight: '1.6',
      backgroundColor: 'white',
      maxWidth: 'none',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif'
    }}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          table: ({node, ...props}) => (
            <table style={{ 
              width: '100%', 
              marginBottom: '1rem',
              borderCollapse: 'collapse',
              display: 'table'
            }} {...props} />
          ),
          th: ({node, ...props}) => (
            <th style={{ 
              padding: '0.75rem',
              textAlign: 'left',
              fontWeight: '600',
              borderBottom: '2px solid #d0d7de',
              backgroundColor: '#f6f8fa'
            }} {...props} />
          ),
          td: ({node, ...props}) => (
            <td style={{ 
              padding: '0.75rem',
              borderBottom: '1px solid #d0d7de',
              verticalAlign: 'top'
            }} {...props} />
          )
        }}
      >
        {content}
      </ReactMarkdown>
      
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
} 