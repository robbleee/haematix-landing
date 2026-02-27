'use client';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const sharedStyle = {
  background: '#0f172a',
  borderRadius: '10px',
  border: '1px solid #1e293b',
  margin: '2rem 0',
  fontSize: '0.85rem',
  lineHeight: '1.7',
  padding: '1.5rem',
  fontFamily: "'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
  overflowX: 'auto',
};

export default function CodeBlock({ children, language = 'ocaml' }) {
  // Plain text blocks — no tokeniser, no background artefacts
  if (language === 'text') {
    return (
      <pre style={{ ...sharedStyle, color: '#e2e8f0' }}>
        <code
          style={{
            fontFamily: 'inherit',
            background: 'transparent',
            border: 'none',
            padding: 0,
            color: 'inherit',
            display: 'block',
          }}
        >
          {children}
        </code>
      </pre>
    );
  }

  return (
    <SyntaxHighlighter
      language={language}
      style={vscDarkPlus}
      customStyle={sharedStyle}
      codeTagProps={{
        style: {
          fontFamily: "'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
          background: 'transparent',
          border: 'none',
          padding: 0,
          display: 'block',
        },
      }}
    >
      {children}
    </SyntaxHighlighter>
  );
}
