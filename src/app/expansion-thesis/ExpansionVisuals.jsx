'use client';

export function FunnelExpansion() {
  return (
    <div style={{ 
      background: '#f8f9fa', 
      padding: '3rem 2rem', 
      borderRadius: '12px',
      margin: '2rem 0',
      border: '1px solid #e2e8f0',
      overflowX: 'auto'
    }}>
      <h3 style={{ color: '#009688', textAlign: 'center', marginBottom: '2rem' }}>The Diagnostic Funnel Expansion</h3>
      
      {/* SVG-based diagram for perfect alignment */}
      <svg width="700" height="500" viewBox="0 0 700 500" style={{ margin: '0 auto', display: 'block' }}>
        {/* Level 1: Legacy Node */}
        <rect x="250" y="20" width="200" height="60" rx="8" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="2"/>
        <text x="350" y="45" textAnchor="middle" fill="#475569" fontWeight="bold" fontSize="14">Legacy Diagnosis</text>
        <text x="350" y="65" textAnchor="middle" fill="#1e293b" fontWeight="bold" fontSize="16">Lung Cancer</text>
        
        {/* Vertical line down from Legacy */}
        <line x1="350" y1="80" x2="350" y2="120" stroke="#cbd5e1" strokeWidth="2"/>
        
        {/* Horizontal connector bar */}
        <line x1="90" y1="120" x2="610" y2="120" stroke="#cbd5e1" strokeWidth="2"/>
        
        {/* Three vertical drops */}
        <line x1="90" y1="120" x2="90" y2="150" stroke="#cbd5e1" strokeWidth="2"/>
        <line x1="350" y1="120" x2="350" y2="150" stroke="#cbd5e1" strokeWidth="2"/>
        <line x1="610" y1="120" x2="610" y2="150" stroke="#cbd5e1" strokeWidth="2"/>
        
        {/* Level 2: Adenocarcinoma */}
        <rect x="0" y="150" width="180" height="50" rx="8" fill="white" stroke="#009688" strokeWidth="2"/>
        <text x="90" y="180" textAnchor="middle" fill="#009688" fontWeight="600" fontSize="14">Adenocarcinoma</text>
        
        {/* Line down from Adeno */}
        <line x1="90" y1="200" x2="90" y2="240" stroke="#009688" strokeWidth="2"/>
        
        {/* Level 2: Large Cell Carcinoma (Ghost) */}
        <rect x="260" y="150" width="180" height="50" rx="8" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,5"/>
        <text x="350" y="175" textAnchor="middle" fill="#64748b" fontWeight="600" fontSize="14">Large Cell Carcinoma</text>
        <text x="350" y="192" textAnchor="middle" fill="#ef4444" fontSize="11">(Reclassified)</text>
        
        {/* Level 2: Squamous Cell */}
        <rect x="520" y="150" width="180" height="50" rx="8" fill="white" stroke="#94a3b8" strokeWidth="2"/>
        <text x="610" y="180" textAnchor="middle" fill="#64748b" fontWeight="600" fontSize="14">Squamous Cell</text>
        
        {/* Line down from Squamous */}
        <line x1="610" y1="200" x2="610" y2="240" stroke="#94a3b8" strokeWidth="2"/>
        
        {/* Level 3: Molecular Panel (Adenocarcinoma) */}
        <rect x="0" y="240" width="340" height="180" rx="12" fill="rgba(0, 150, 136, 0.05)" stroke="#009688" strokeWidth="1" strokeDasharray="5,5"/>
        
        {/* Gene boxes - 4x2 grid */}
        {[
          {x: 20, y: 250, text: 'EGFR'},
          {x: 95, y: 250, text: 'ALK'},
          {x: 170, y: 250, text: 'ROS1'},
          {x: 245, y: 250, text: 'BRAF'},
          {x: 20, y: 290, text: 'KRAS'},
          {x: 95, y: 290, text: 'MET'},
          {x: 170, y: 290, text: 'RET'},
          {x: 245, y: 290, text: 'NTRK'}
        ].map((gene, i) => (
          <g key={i}>
            <rect x={gene.x} y={gene.y} width="65" height="30" rx="6" fill="#009688"/>
            <text x={gene.x + 32.5} y={gene.y + 20} textAnchor="middle" fill="white" fontWeight="600" fontSize="12">{gene.text}</text>
          </g>
        ))}
        
        <text x="170" y="350" textAnchor="middle" fill="#009688" fontSize="11" fontStyle="italic">+ Tier 2 Emerging Biomarkers</text>
        
        {/* Level 3: IHC Panel (Squamous) */}
        <rect x="540" y="240" width="140" height="140" rx="12" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1" strokeDasharray="5,5"/>
        
        <rect x="550" y="250" width="120" height="30" rx="6" fill="#94a3b8"/>
        <text x="610" y="270" textAnchor="middle" fill="white" fontWeight="600" fontSize="12">p40 Positive</text>
        
        <rect x="550" y="290" width="120" height="30" rx="6" fill="#94a3b8"/>
        <text x="610" y="310" textAnchor="middle" fill="white" fontWeight="600" fontSize="12">PD-L1</text>
        
        <text x="610" y="345" textAnchor="middle" fill="#64748b" fontSize="11" fontStyle="italic">Immunotherapy</text>
        <text x="610" y="360" textAnchor="middle" fill="#64748b" fontSize="11" fontStyle="italic">Eligible</text>
      </svg>
      
      <div style={{ textAlign: 'center', marginTop: '2rem', color: '#64748b', fontSize: '0.9rem', maxWidth: '800px', margin: '2rem auto 0' }}>
        <strong>Figure 1: The Fragmentation of Diagnosis.</strong> <br/>
        The "Legacy" diagnosis of Lung Cancer has fractured. Note the dissolution of "Large Cell Carcinoma" (Center), which is now reclassified into specific molecular lineages (Left) or squamous subtypes (Right), mandating complex testing for every patient.
      </div>
    </div>
  );
}

export function TimeTaxChart() {
  return (
    <div style={{ 
      background: '#f8f9fa', 
      padding: '2rem', 
      borderRadius: '12px',
      margin: '2rem 0',
      border: '1px solid #e2e8f0'
    }}>
      <h3 style={{ color: '#009688', textAlign: 'center', marginBottom: '1.5rem' }}>The "Time Tax" of Manual Workflows</h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        {/* Manual Bar */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontWeight: '600' }}>Manual Preparation</span>
            <span style={{ fontWeight: 'bold', color: '#ef4444' }}>3-4 Hours</span>
          </div>
          <div style={{ width: '100%', background: '#e2e8f0', height: '24px', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ width: '100%', background: '#ef4444', height: '100%' }}></div>
          </div>
        </div>

        {/* Automated Bar */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontWeight: '600' }}>Software-Augmented</span>
            <span style={{ fontWeight: 'bold', color: '#009688' }}>1 Hour</span>
          </div>
          <div style={{ width: '100%', background: '#e2e8f0', height: '24px', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ width: '30%', background: '#009688', height: '100%' }}></div>
          </div>
          <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem', fontStyle: 'italic' }}>
            ~69% Reduction in Nav time (University of Missouri Study)
          </div>
        </div>

      </div>
    </div>
  );
}
