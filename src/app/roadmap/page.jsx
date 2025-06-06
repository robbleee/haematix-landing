'use client';

import { useState } from 'react';
import styles from './roadmap.module.css';

const roadmapData = {
  completed: [
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
  ],
  inProgress: [
    {
      id: 'cll',
      name: 'Chronic Lymphocytic Leukemia',
      abbrev: 'CLL',
      description: 'B-cell chronic leukemia with iwCLL staging and prognostic markers',
      targetDate: 'Q2 2025',
      priority: 'high',
      features: ['iwCLL Staging', 'Prognostic Markers', 'Treatment Response', 'Genetic Risk Factors']
    }
  ],
  planned: [
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
};

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
    <div className={styles.roadmapPage}>
      {/* Header */}
      <section className={styles.header}>
        <div className="container">
          <a href="/" className={styles.backButton}>← Back to Home</a>
          <div className={styles.headerContent}>
            <h1>
              <span className="text-gradient">Platform Expansion Roadmap</span>
            </h1>
            <p className={styles.subtitle}>
              Systematic expansion across all areas of hematology, building on our proven AML and MDS foundation
            </p>
          </div>
        </div>
      </section>

      {/* Progress Overview */}
      <section className={styles.progressSection}>
        <div className="container">
          <div className={styles.progressStats}>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>{roadmapData.completed.length}</div>
              <div className={styles.statLabel}>Completed</div>
              <div className={styles.statIndicator} style={{ backgroundColor: '#10b981' }}></div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>{roadmapData.inProgress.length}</div>
              <div className={styles.statLabel}>In Progress</div>
              <div className={styles.statIndicator} style={{ backgroundColor: '#f59e0b' }}></div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>{roadmapData.planned.length}</div>
              <div className={styles.statLabel}>Planned</div>
              <div className={styles.statIndicator} style={{ backgroundColor: '#6b7280' }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap Visualization */}
      <section className={styles.roadmapSection}>
        <div className="container">
          <div className={styles.roadmapContainer}>
            
            {/* Completed Section */}
            <div className={styles.roadmapGroup}>
              <h2 className={styles.groupTitle}>
                <span className={styles.groupIcon}>✅</span>
                Completed Platforms
              </h2>
              <div className={styles.itemsGrid}>
                {roadmapData.completed.map((item) => (
                  <div 
                    key={item.id} 
                    className={`${styles.roadmapItem} ${styles.completed}`}
                    onClick={() => setSelectedItem(item)}
                  >
                    <div className={styles.itemHeader}>
                      <div className={styles.itemAbbrev}>{item.abbrev}</div>
                      <div className={styles.statusBadge} style={{ backgroundColor: getStatusColor('completed') }}>
                        ✓ Complete
                      </div>
                    </div>
                    <h3 className={styles.itemName}>{item.name}</h3>
                    <p className={styles.itemDescription}>{item.description}</p>
                    <div className={styles.itemMeta}>
                      <span className={styles.completedDate}>Completed {item.completedDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* In Progress Section */}
            <div className={styles.roadmapGroup}>
              <h2 className={styles.groupTitle}>
                <span className={styles.groupIcon}>🚧</span>
                Currently In Development
              </h2>
              <div className={styles.itemsGrid}>
                {roadmapData.inProgress.map((item) => (
                  <div 
                    key={item.id} 
                    className={`${styles.roadmapItem} ${styles.inProgress}`}
                    onClick={() => setSelectedItem(item)}
                  >
                    <div className={styles.itemHeader}>
                      <div className={styles.itemAbbrev}>{item.abbrev}</div>
                      <div className={styles.statusBadge} style={{ backgroundColor: getStatusColor('inProgress') }}>
                        In Progress
                      </div>
                    </div>
                    <h3 className={styles.itemName}>{item.name}</h3>
                    <p className={styles.itemDescription}>{item.description}</p>
                    <div className={styles.itemMeta}>
                      <span className={styles.targetDate}>Target: {item.targetDate}</span>
                      <span 
                        className={styles.priority} 
                        style={{ color: getPriorityColor(item.priority) }}
                      >
                        {item.priority.toUpperCase()} PRIORITY
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Planned Section */}
            <div className={styles.roadmapGroup}>
              <h2 className={styles.groupTitle}>
                <span className={styles.groupIcon}>📋</span>
                Planned Expansion
              </h2>
              <div className={styles.itemsGrid}>
                {roadmapData.planned.map((item) => (
                  <div 
                    key={item.id} 
                    className={`${styles.roadmapItem} ${styles.planned} ${styles[item.priority]}`}
                    onClick={() => setSelectedItem(item)}
                  >
                    <div className={styles.itemHeader}>
                      <div className={styles.itemAbbrev}>{item.abbrev}</div>
                      <div className={styles.statusBadge} style={{ backgroundColor: getStatusColor('planned') }}>
                        Planned
                      </div>
                    </div>
                    <h3 className={styles.itemName}>{item.name}</h3>
                    <p className={styles.itemDescription}>{item.description}</p>
                    <div className={styles.itemMeta}>
                      <span className={styles.targetDate}>Target: {item.targetDate}</span>
                      <span 
                        className={styles.priority} 
                        style={{ color: getPriorityColor(item.priority) }}
                      >
                        {item.priority.toUpperCase()} PRIORITY
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Selection Details Modal */}
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

      {/* Vision Statement */}
      <section className={styles.visionSection}>
        <div className="container">
          <div className={styles.visionContent}>
            <h2>Building the Complete Hematology Intelligence Platform</h2>
            <p>
              Our systematic expansion covers all major hematologic malignancies through 2029. Starting with 
              aggressive leukemias where diagnostic precision saves lives, we're building towards 
              comprehensive coverage including lymphomas, plasma cell disorders, myeloproliferative neoplasms, 
              and rare conditions like mastocytosis and histiocytic disorders.
            </p>
            <div className={styles.visionPoints}>
              <div className={styles.visionPoint}>
                <h4>Evidence-Based Prioritization</h4>
                <p>Expansion targets based on clinical impact, diagnostic complexity, and market demand</p>
              </div>
              <div className={styles.visionPoint}>
                <h4>Scalable Architecture</h4>
                <p>Each new disease area leverages our proven formal logic and AI extraction framework</p>
              </div>
              <div className={styles.visionPoint}>
                <h4>Clinical Partnership</h4>
                <p>Deep collaboration with hematology experts ensures clinical accuracy and adoption</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 