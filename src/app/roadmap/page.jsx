'use client';

import { useState } from 'react';
import styles from './roadmap.module.css';

const roadmapData = [
  {
    status: 'completed',
    title: 'Completed Platforms',
    items: [
      {
        id: 'aml',
        name: 'Acute Myeloid Leukemia',
        abbrev: 'AML',
        description: 'WHO 2022 & ICC 2022 classification with ELN risk stratification',
        completedDate: '2024',
        features: ['WHO 2022 Classification', 'ICC 2022 Classification', 'ELN Risk Scoring', 'Genetic Marker Integration']
      },
      {
        id: 'mds',
        name: 'Myelodysplastic Syndromes',
        abbrev: 'MDS',
        description: 'Comprehensive classification and IPSS-R risk assessment',
        completedDate: '2024',
        features: ['WHO 2022 Classification', 'ICC 2022 Classification', 'IPSS-R Scoring', 'Morphology Integration']
      }
    ]
  },
  {
    status: 'inProgress',
    title: 'Currently In Development',
    items: [
      {
        id: 'cll',
        name: 'Chronic Lymphocytic Leukemia',
        abbrev: 'CLL',
        description: 'B-cell chronic leukemia with iwCLL staging and prognostic markers',
        targetDate: 'Q2 2025',
        priority: 'high',
        features: ['iwCLL Staging', 'Prognostic Markers', 'Treatment Response', 'Genetic Risk Factors']
      }
    ]
  },
  {
    status: 'planned',
    title: 'Planned Expansion',
    items: [
      {
        id: 'all',
        name: 'Acute Lymphoblastic Leukemia',
        abbrev: 'ALL',
        description: 'Pediatric and adult ALL classification with risk stratification',
        targetDate: 'Q4 2025',
        priority: 'high',
        features: ['Pediatric ALL', 'Adult ALL', 'Genetic Subtypes', 'MRD Monitoring']
      },
      {
        id: 'cmml',
        name: 'Chronic Myelomonocytic Leukemia',
        abbrev: 'CMML',
        description: 'Myelodysplastic/myeloproliferative neoplasm with prognostic scoring',
        targetDate: 'Q1 2026',
        priority: 'high',
        features: ['WHO Classification', 'CPSS Scoring', 'Molecular Markers', 'Transformation Risk']
      },
      {
        id: 'cml',
        name: 'Chronic Myeloid Leukemia',
        abbrev: 'CML',
        description: 'BCR-ABL positive leukemia with response monitoring',
        targetDate: 'Q2 2026',
        priority: 'high',
        features: ['Phase Classification', 'BCR-ABL Monitoring', 'Resistance Mutations', 'Treatment Response']
      },
      {
        id: 'dlbcl',
        name: 'Diffuse Large B-Cell Lymphoma',
        abbrev: 'DLBCL',
        description: 'Aggressive B-cell lymphoma with molecular subtyping',
        targetDate: 'Q3 2026',
        priority: 'high',
        features: ['COO Classification', 'Double/Triple Hit', 'IPI Scoring', 'Molecular Subtypes']
      },
      {
        id: 'follicular',
        name: 'Follicular Lymphoma',
        abbrev: 'FL',
        description: 'Indolent B-cell lymphoma with grading and risk assessment',
        targetDate: 'Q4 2026',
        priority: 'medium',
        features: ['Histologic Grading', 'FLIPI Scoring', 'Transformation Risk', 'Molecular Markers']
      },
      {
        id: 'hodgkin',
        name: 'Hodgkin Lymphoma',
        abbrev: 'HL',
        description: 'Classical and nodular lymphocyte-predominant Hodgkin lymphoma',
        targetDate: 'Q1 2027',
        priority: 'medium',
        features: ['Classical HL', 'NLPHL', 'Ann Arbor Staging', 'Response Assessment']
      },
      {
        id: 'mantle',
        name: 'Mantle Cell Lymphoma',
        abbrev: 'MCL',
        description: 'Aggressive B-cell lymphoma with prognostic markers',
        targetDate: 'Q2 2027',
        priority: 'medium',
        features: ['Morphologic Variants', 'MIPI Scoring', 'TP53 Status', 'Minimal Residual Disease']
      },
      {
        id: 'marginal',
        name: 'Marginal Zone Lymphomas',
        abbrev: 'MZL',
        description: 'MALT, nodal, and splenic marginal zone lymphomas',
        targetDate: 'Q3 2027',
        priority: 'medium',
        features: ['MALT Lymphoma', 'Nodal MZL', 'Splenic MZL', 'Site-specific Features']
      },
      {
        id: 'burkitt',
        name: 'Burkitt Lymphoma',
        abbrev: 'BL',
        description: 'Highly aggressive B-cell lymphoma with molecular confirmation',
        targetDate: 'Q4 2027',
        priority: 'medium',
        features: ['Endemic/Sporadic/Immunodeficiency', 'MYC Rearrangements', 'Morphologic Features', 'Differential Diagnosis']
      },
      {
        id: 'tcell',
        name: 'Peripheral T-Cell Lymphomas',
        abbrev: 'PTCL',
        description: 'Heterogeneous group of mature T-cell neoplasms',
        targetDate: 'Q1 2028',
        priority: 'medium',
        features: ['PTCL-NOS', 'Angioimmunoblastic', 'ALCL', 'NK/T-cell Lymphomas']
      },
      {
        id: 'cutaneous',
        name: 'Cutaneous Lymphomas',
        abbrev: 'CTL',
        description: 'Primary cutaneous B-cell and T-cell lymphomas',
        targetDate: 'Q2 2028',
        priority: 'low',
        features: ['Mycosis Fungoides', 'Sézary Syndrome', 'Primary Cutaneous DLBCL', 'Staging Systems']
      },
      {
        id: 'plasma',
        name: 'Plasma Cell Disorders',
        abbrev: 'PCD',
        description: 'Multiple myeloma, MGUS, and related plasma cell neoplasms',
        targetDate: 'Q3 2028',
        priority: 'high',
        features: ['Multiple Myeloma', 'MGUS Classification', 'ISS Staging', 'Prognostic Markers']
      },
      {
        id: 'hairy',
        name: 'Hairy Cell Leukemia',
        abbrev: 'HCL',
        description: 'Rare B-cell leukemia with characteristic morphology',
        targetDate: 'Q4 2028',
        priority: 'low',
        features: ['Classic HCL', 'HCL Variant', 'BRAF V600E', 'Treatment Response']
      },
      {
        id: 'myeloproliferative',
        name: 'Myeloproliferative Neoplasms',
        abbrev: 'MPN',
        description: 'BCR-ABL negative MPNs including PV, ET, and PMF',
        targetDate: 'Q1 2029',
        priority: 'medium',
        features: ['Polycythemia Vera', 'Essential Thrombocythemia', 'Primary Myelofibrosis', 'JAK2/CALR/MPL']
      },
      {
        id: 'mastocytosis',
        name: 'Mastocytosis',
        abbrev: 'SM',
        description: 'Clonal mast cell disorders with KIT mutations',
        targetDate: 'Q2 2029',
        priority: 'low',
        features: ['Cutaneous Mastocytosis', 'Systemic Mastocytosis', 'KIT D816V', 'Prognostic Scoring']
      },
      {
        id: 'aplastic',
        name: 'Bone Marrow Failure Syndromes',
        abbrev: 'BMF',
        description: 'Aplastic anemia and inherited bone marrow failure syndromes',
        targetDate: 'Q3 2029',
        priority: 'low',
        features: ['Aplastic Anemia', 'Fanconi Anemia', 'Dyskeratosis Congenita', 'Telomere Disorders']
      },
      {
        id: 'histiocytic',
        name: 'Histiocytic Disorders',
        abbrev: 'HD',
        description: 'Langerhans cell histiocytosis and related disorders',
        targetDate: 'Q4 2029',
        priority: 'low',
        features: ['Langerhans Cell Histiocytosis', 'Erdheim-Chester Disease', 'Hemophagocytic Lymphohistiocytosis', 'BRAF/MAP2K1 Mutations']
      }
    ]
  }
];

export default function RoadmapPage() {
  const [selectedItem, setSelectedItem] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#10b981';
      case 'inProgress': return '#f59e0b';
      case 'planned': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#6b7280';
      default: return '#6b7280';
    }
  };

  return (
    <div className={styles.roadmapPage} style={{ background: '#f8f9fa' }}>
      {/* Header */}
      <section className={styles.header} style={{ background: 'white', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container">
          <a href="/" className={styles.backButton}>← Back to Home</a>
          <div className={styles.headerContent}>
            <h1 style={{ color: '#1a202c' }}>
              Platform Expansion Roadmap
            </h1>
            <p className={styles.subtitle}>
              Systematic expansion across all areas of hematology, building on our proven AML and MDS foundation.
            </p>
          </div>
        </div>
      </section>

      {/* Roadmap List View */}
      <section className={styles.roadmapSection}>
        <div className="container">
          <div className={styles.roadmapContainer}>
            
            {roadmapData.map((group) => (
              <div key={group.status} className={styles.roadmapGroup}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1rem', 
                  marginBottom: '2rem',
                  paddingBottom: '1rem',
                  borderBottom: '2px solid #e2e8f0'
                }}>
                  <div style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    background: getStatusColor(group.status)
                  }} />
                  <h2 style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: '700', 
                    color: '#2d3748',
                    margin: 0
                  }}>
                    {group.title}
                  </h2>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {group.items.map((item) => (
                    <div 
                      key={item.id} 
                      className={`${styles.roadmapItem} ${styles[group.status]}`}
                      onClick={() => setSelectedItem(item)}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '80px 1fr auto',
                        alignItems: 'center',
                        gap: '2rem',
                        padding: '1.5rem 2rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        border: '1px solid #e2e8f0',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
                      }}
                    >
                      <div style={{
                        fontWeight: '700',
                        color: '#009688',
                        fontSize: '1.2rem',
                        textAlign: 'center'
                      }}>
                        {item.abbrev}
                      </div>
                      
                      <div>
                        <h3 style={{ 
                          margin: '0 0 0.25rem 0', 
                          fontSize: '1.1rem',
                          color: '#2d3748'
                        }}>
                          {item.name}
                        </h3>
                        <p style={{ 
                          margin: 0, 
                          color: '#718096', 
                          fontSize: '0.95rem' 
                        }}>
                          {item.description}
                        </p>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        {item.completedDate ? (
                          <span style={{ 
                            display: 'inline-block',
                            padding: '0.25rem 0.75rem',
                            background: '#ecfdf5',
                            color: '#047857',
                            borderRadius: '999px',
                            fontSize: '0.85rem',
                            fontWeight: '600'
                          }}>
                            {item.completedDate}
                          </span>
                        ) : (
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.25rem' }}>
                            <span style={{ 
                              fontSize: '0.9rem', 
                              fontWeight: '600',
                              color: '#4a5568' 
                            }}>
                              {item.targetDate}
                            </span>
                            {item.priority && (
                              <span style={{ 
                                fontSize: '0.75rem',
                                textTransform: 'uppercase',
                                color: getPriorityColor(item.priority),
                                fontWeight: '700',
                                letterSpacing: '0.05em'
                              }}>
                                {item.priority} Priority
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* Modal remains mostly the same but with inline style tweaks for consistency if needed, relying on CSS module for now */}
      {selectedItem && (
        <div className={styles.modal} onClick={() => setSelectedItem(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>{selectedItem.name} ({selectedItem.abbrev})</h3>
              <button 
                className={styles.closeButton}
                onClick={() => setSelectedItem(null)}
              >
                ×
              </button>
            </div>
            <div className={styles.modalBody}>
              <p className={styles.modalDescription}>{selectedItem.description}</p>
              
              <h4>Key Features & Capabilities</h4>
              <ul className={styles.featuresList}>
                {selectedItem.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>

              <div className={styles.modalMeta}>
                {selectedItem.completedDate && (
                  <div className={styles.modalMetaItem}>
                    <strong>Completed:</strong> {selectedItem.completedDate}
                  </div>
                )}
                {selectedItem.targetDate && (
                  <div className={styles.modalMetaItem}>
                    <strong>Target Date:</strong> {selectedItem.targetDate}
                  </div>
                )}
                {selectedItem.priority && (
                  <div className={styles.modalMetaItem}>
                    <strong>Priority:</strong> 
                    <span style={{ color: getPriorityColor(selectedItem.priority) }}>
                      {selectedItem.priority.toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
