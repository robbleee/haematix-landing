import Link from 'next/link';

export const metadata = {
  title: 'Leukemia Diagnostic Tool',
  description:
    'Haem.io is a leukemia diagnostic tool for AML and MDS classification, designed for transparent, guideline-aligned clinical execution.',
  alternates: {
    canonical: '/leukemia-diagnostic-tool'
  }
};

export default function LeukemiaDiagnosticToolPage() {
  return (
    <section style={{ backgroundColor: '#f8fafc', minHeight: '100vh', padding: '4rem 1.25rem' }}>
      <div style={{ maxWidth: '980px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#0f172a' }}>
          Leukemia Diagnostic Tool for Clinical Teams
        </h1>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#334155', marginBottom: '1.25rem' }}>
          Haem.io (Haemio) is a hematology diagnostic platform built to help teams handle high-complexity leukemia and myeloid disease classification. It combines deterministic algorithmic execution with explainable diagnostic logic.
        </p>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#334155', marginBottom: '2rem' }}>
          The current product scope supports AML and MDS pathways. Broader leukemia coverage is part of the roadmap, and this page will expand as additional disease modules become production-ready.
        </p>

        <h2 style={{ fontSize: '1.65rem', marginBottom: '0.75rem', color: '#0f766e' }}>Current capabilities</h2>
        <ul style={{ color: '#334155', lineHeight: '1.9', marginBottom: '2rem' }}>
          <li>WHO 2022 and ICC 2022 classification logic for AML and MDS</li>
          <li>Risk stratification support for AML and MDS contexts</li>
          <li>Traceable decision paths for every diagnostic output</li>
        </ul>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link href="/aml-classifier" style={{ color: '#0f766e', textDecoration: 'underline', fontWeight: 600 }}>
            AML classifier page
          </Link>
          <Link href="/mds-vs-aml-diagnosis" style={{ color: '#0f766e', textDecoration: 'underline', fontWeight: 600 }}>
            MDS vs AML explainer
          </Link>
          <Link href="/roadmap" style={{ color: '#0f766e', textDecoration: 'underline', fontWeight: 600 }}>
            View roadmap
          </Link>
        </div>
      </div>
    </section>
  );
}
