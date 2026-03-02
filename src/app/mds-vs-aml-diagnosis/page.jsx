import Link from 'next/link';

export const metadata = {
  title: 'MDS vs AML Diagnosis',
  description:
    'Understand key differences between MDS and AML diagnosis, including blast thresholds, genomic context, and guideline-driven classification logic.',
  alternates: {
    canonical: '/mds-vs-aml-diagnosis'
  }
};

export default function MdsVsAmlDiagnosisPage() {
  return (
    <section style={{ backgroundColor: '#ffffff', minHeight: '100vh', padding: '4rem 1.25rem' }}>
      <div style={{ maxWidth: '980px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#0f172a' }}>
          MDS vs AML Diagnosis in Genomic-Era Hematology
        </h1>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#334155', marginBottom: '1.25rem' }}>
          Distinguishing myelodysplastic syndromes (MDS) from acute myeloid leukemia (AML) increasingly requires multi-factor reasoning across blast percentages, genomic findings, cytogenetics, and treatment context.
        </p>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#334155', marginBottom: '2rem' }}>
          Haem.io is designed to execute this diagnostic logic consistently while preserving traceability to specific criteria in WHO 2022 and ICC 2022 frameworks.
        </p>

        <h2 style={{ fontSize: '1.65rem', marginBottom: '0.75rem', color: '#0f766e' }}>Why this matters</h2>
        <ul style={{ color: '#334155', lineHeight: '1.9', marginBottom: '2rem' }}>
          <li>Borderline presentations can alter treatment decisions and prognosis.</li>
          <li>Guideline complexity has grown beyond practical manual execution at scale.</li>
          <li>Auditable, deterministic tooling helps reduce inconsistency and drift.</li>
        </ul>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link href="/interactive-classifier" style={{ color: '#0f766e', textDecoration: 'underline', fontWeight: 600 }}>
            Try classifier workflow
          </Link>
          <Link href="/articles/version-control-of-medicine" style={{ color: '#0f766e', textDecoration: 'underline', fontWeight: 600 }}>
            Read clinical systems article
          </Link>
          <Link href="/leukemia-diagnostic-tool" style={{ color: '#0f766e', textDecoration: 'underline', fontWeight: 600 }}>
            Back to leukemia tool overview
          </Link>
        </div>
      </div>
    </section>
  );
}
