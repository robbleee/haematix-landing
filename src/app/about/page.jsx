'use client';

import Link from 'next/link';

export default function AboutPage() {
  return (
    <div style={{ minHeight: '80vh', padding: '4rem 2rem' }}>
      <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem', color: '#00695c' }}>
            About Haem.io
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#666', maxWidth: '700px', margin: '0 auto' }}>
            Transforming haematology diagnostics through AI-powered precision medicine
          </p>
        </div>

        <div style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '600', marginBottom: '1.5rem', color: '#00695c' }}>
            Our Mission
          </h2>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#333', marginBottom: '1.5rem' }}>
            Haem.io was born from a conversation between a cancer survivor and a consultant haematologist 
            about the challenges of diagnosing complex blood cancers. We recognized that the diagnostic 
            process for conditions like Acute Myeloid Leukemia (AML) and Myelodysplastic Syndromes (MDS) 
            is fragmented, time-consuming, and prone to human error.
          </p>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#333', marginBottom: '1.5rem' }}>
            Our mission is to empower clinicians with AI-powered tools that integrate all diagnostic 
            data sources—genetics, cytogenetics, morphology, and flow cytometry—to provide instant, 
            accurate, and WHO 2022 & ICC 2022 compliant diagnoses. We're building the essential 
            diagnostic intelligence platform that clinicians need on the front lines of blood cancer care.
          </p>
        </div>

        <div style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '600', marginBottom: '1.5rem', color: '#00695c' }}>
            What We Do
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }}>
            <div style={{
              padding: '2rem',
              backgroundColor: '#f8f9fa',
              borderRadius: '12px',
              border: '1px solid #e0e0e0'
            }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#009688' }}>
                Comprehensive Diagnosis
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                Our platform diagnoses all AML and MDS subtypes by integrating over 100 genetic and 
                clinical data points, ensuring complete coverage of WHO 2022 and ICC 2022 classifications.
              </p>
            </div>
            <div style={{
              padding: '2rem',
              backgroundColor: '#f8f9fa',
              borderRadius: '12px',
              border: '1px solid #e0e0e0'
            }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#009688' }}>
                Risk Stratification
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                Automated ELN risk stratification for AML and IPSS scoring for MDS provides crucial 
                prognostic information to guide treatment decisions.
              </p>
            </div>
            <div style={{
              padding: '2rem',
              backgroundColor: '#f8f9fa',
              borderRadius: '12px',
              border: '1px solid #e0e0e0'
            }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#009688' }}>
                Clinical Trial Matching
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                AI-powered matching of patient profiles to relevant clinical trials, ensuring patients 
                have access to cutting-edge treatments.
              </p>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '600', marginBottom: '1.5rem', color: '#00695c' }}>
            Clinical Validation
          </h2>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#333', marginBottom: '2rem' }}>
            We're working with leading NHS trusts and research networks to validate our platform:
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem'
          }}>
            <div style={{
              padding: '1.5rem',
              backgroundColor: 'white',
              borderRadius: '12px',
              border: '2px solid #e0e0e0',
              textAlign: 'center'
            }}>
              <div style={{ fontWeight: '600', color: '#00695c', marginBottom: '0.5rem' }}>
                The Christie NHS
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>Foundation Trust</div>
            </div>
            <div style={{
              padding: '1.5rem',
              backgroundColor: 'white',
              borderRadius: '12px',
              border: '2px solid #e0e0e0',
              textAlign: 'center'
            }}>
              <div style={{ fontWeight: '600', color: '#00695c', marginBottom: '0.5rem' }}>
                Royal Devon & Exeter
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>NHS Foundation Trust</div>
            </div>
            <div style={{
              padding: '1.5rem',
              backgroundColor: 'white',
              borderRadius: '12px',
              border: '2px solid #e0e0e0',
              textAlign: 'center'
            }}>
              <div style={{ fontWeight: '600', color: '#00695c', marginBottom: '0.5rem' }}>
                Manchester Foundation
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>NHS Trust</div>
            </div>
            <div style={{
              padding: '1.5rem',
              backgroundColor: 'white',
              borderRadius: '12px',
              border: '2px solid #e0e0e0',
              textAlign: 'center'
            }}>
              <div style={{ fontWeight: '600', color: '#00695c', marginBottom: '0.5rem' }}>
                UK AML Research
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>Network</div>
            </div>
          </div>
        </div>

        <div style={{
          backgroundColor: '#f0fdf4',
          padding: '2.5rem',
          borderRadius: '12px',
          border: '2px solid #009688',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '600', marginBottom: '1rem', color: '#00695c' }}>
            Ready to Transform Haematology Diagnostics?
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '2rem' }}>
            Request a demo or learn more about how Haem.io can support your clinical practice.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/contact"
              style={{
                padding: '1rem 2rem',
                backgroundColor: '#009688',
                color: 'white',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '600',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#00897b';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#009688';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Request Demo
            </Link>
            <Link
              href="/vision"
              style={{
                padding: '1rem 2rem',
                backgroundColor: 'white',
                color: '#009688',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '600',
                border: '2px solid #009688',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f0fdf4';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Our Vision
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

