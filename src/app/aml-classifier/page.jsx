import Link from 'next/link';

export const metadata = {
  title: 'AML Classifier',
  description:
    'Explore Haem.io AML classification support with WHO 2022, ICC 2022, and ELN-aligned risk logic for clinician-led genomic-era review.',
  alternates: {
    canonical: '/aml-classifier'
  }
};

export default function AmlClassifierPage() {
  return (
    <section style={{ backgroundColor: '#ffffff', minHeight: '100vh', padding: '4rem 1.25rem' }}>
      <div style={{ maxWidth: '980px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#0f172a' }}>
          AML Classifier for WHO 2022 and ICC 2022
        </h1>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#334155', marginBottom: '1.25rem' }}>
          Haem.io provides explainable AML classification support for genomic-era hematology workflows. The platform is built to execute complex guideline logic consistently, with transparent evidence trails and risk outputs aligned to ELN guidance.
        </p>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#334155', marginBottom: '2rem' }}>
          Current production focus is AML and MDS pathways. Teams can review deterministic outputs, compare WHO and ICC framing, and inspect the criteria path behind each classification support output.
        </p>

        <h2 style={{ fontSize: '1.65rem', marginBottom: '0.75rem', color: '#0f766e' }}>What this page targets</h2>
        <ul style={{ color: '#334155', lineHeight: '1.9', marginBottom: '2rem' }}>
          <li>Acute myeloid leukemia classification support</li>
          <li>AML classification with WHO 2022 and ICC 2022 criteria</li>
          <li>Explainable clinical decision support in hematology</li>
        </ul>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link href="/interactive-classifier" style={{ color: '#0f766e', textDecoration: 'underline', fontWeight: 600 }}>
            Try the interactive classifier
          </Link>
          <Link href="/leukemia-diagnostic-tool" style={{ color: '#0f766e', textDecoration: 'underline', fontWeight: 600 }}>
            Leukemia decision support overview
          </Link>
          <Link href="/articles" style={{ color: '#0f766e', textDecoration: 'underline', fontWeight: 600 }}>
            Read related articles
          </Link>
        </div>
      </div>
    </section>
  );
}
