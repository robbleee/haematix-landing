'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './InteractiveFlowDiagram.module.css';

const InteractiveFlowDiagram = () => {
  // State to track which node is active/clicked
  const [activeNode, setActiveNode] = useState('molecular');
  // State to track which node is being hovered
  const [hoverNode, setHoverNode] = useState(null);
  
  // Refs for measuring
  const diagramRef = useRef(null);
  const nodeRefs = useRef({});
  
  // Data for the flow diagram nodes
  const nodes = [
    {
      id: 'molecular',
      title: 'Molecular Reports',
      description: 'Free text laboratory reports containing molecular genetic findings and mutations.',
      details: 'These reports include key genetic information such as FLT3-ITD, NPM1, CEBPA, TP53, IDH1/2, and other mutations critical for accurate hematological diagnosis and classification.',
      x: 50,
      y: 70,
      width: 160,
      height: 70
    },
    {
      id: 'cytogenetic',
      title: 'Cytogenetic Reports',
      description: 'Laboratory reports with chromosomal analysis and findings.',
      details: 'These reports detail chromosomal abnormalities like translocations, inversions, deletions, and complex karyotypes that are essential for disease classification according to both WHO and ICC guidelines.',
      x: 50,
      y: 150,
      width: 160,
      height: 70
    },
    {
      id: 'clinical',
      title: 'Clinical Data',
      description: 'Patient clinical information and history relevant to diagnosis.',
      details: 'This includes blood counts, bone marrow findings, previous treatments, patient history, and other clinical parameters that influence both diagnosis and risk stratification.',
      x: 50,
      y: 230,
      width: 160,
      height: 70
    },
    {
      id: 'extraction',
      title: 'Key Field Extraction',
      description: 'Our AI system extracts relevant diagnostic data from all input sources with high accuracy.',
      details: 'The extraction engine identifies over 50 key data points including gene mutations, cytogenetic abnormalities, blast percentages, and clinical parameters that are essential for classification.',
      x: 300,
      y: 150,
      width: 160,
      height: 80
    },
    {
      id: 'classification',
      title: 'Classification Model',
      description: 'The extracted data is processed through our classification algorithms that apply diagnostic criteria.',
      details: 'Our proprietary model applies complex rule sets from WHO and ICC guidelines to the extracted data, integrating molecular and morphological findings to determine the appropriate classification.',
      x: 530,
      y: 150,
      width: 160,
      height: 80
    },
    {
      id: 'who',
      title: 'WHO 2022',
      description: 'Classification according to World Health Organization 2022 criteria.',
      details: 'The WHO 2022 classification for myeloid neoplasms incorporates genetic data with morphological findings to define disease entities. Our system generates the appropriate WHO classification and provides relevant risk stratification.',
      x: 760,
      y: 100,
      width: 160,
      height: 70
    },
    {
      id: 'icc',
      title: 'ICC 2022',
      description: 'Classification according to International Consensus Classification 2022.',
      details: 'The ICC 2022 offers an alternative classification system with emphasis on genetic drivers. Our system provides ICC classification and ELN risk for AML and IPSS-R for MDS to guide treatment decisions.',
      x: 760,
      y: 200,
      width: 160,
      height: 70
    }
  ];
  
  // Connection data
  const connections = [
    { from: 'molecular', to: 'extraction' },
    { from: 'cytogenetic', to: 'extraction' },
    { from: 'clinical', to: 'extraction' },
    { from: 'extraction', to: 'classification' },
    { from: 'classification', to: 'who' },
    { from: 'classification', to: 'icc' }
  ];
  
  // Function to handle node clicks
  const handleNodeClick = (nodeId, event) => {
    // Prevent event bubbling
    event.stopPropagation();
    
    if (activeNode === nodeId) {
      setActiveNode(null);
    } else {
      setActiveNode(nodeId);
    }
  };
  
  // Recalculate panel position when window resizes - no longer needed but keeping simplified version for possible future use
  useEffect(() => {
    const handleResize = () => {
      // No need to update position as we're using fixed central position
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Close panel when clicking outside
  const handleBackgroundClick = () => {
    if (activeNode) {
      setActiveNode(null);
    }
  };
  
  // Handle mouse enter on node
  const handleMouseEnter = (nodeId) => {
    setHoverNode(nodeId);
  };
  
  // Handle mouse leave on node
  const handleMouseLeave = () => {
    setHoverNode(null);
  };
  
  // Function to find node by ID
  const getNodeById = (id) => nodes.find(node => node.id === id);
  
  // Draw arrow path between nodes
  const getConnectionPath = (fromNode, toNode) => {
    const from = getNodeById(fromNode);
    const to = getNodeById(toNode);
    
    if (!from || !to) return '';
    
    // Default straight connection
    let startX = from.x + from.width;
    let startY = from.y + from.height / 2;
    let endX = to.x;
    let endY = to.y + to.height / 2;
    
    // Special paths for different connections
    
    // Input nodes to extraction
    if (to.id === 'extraction') {
      // Custom curved paths from each input to extraction
      if (from.id === 'molecular') {
        // From top input to extraction (molecular)
        return `M${startX},${startY} 
                C${startX + 40},${startY} 
                  ${endX - 40},${endY - 30} 
                  ${endX},${endY - 15}`;
      } else if (from.id === 'clinical') {
        // From bottom input to extraction (clinical)
        return `M${startX},${startY} 
                C${startX + 40},${startY} 
                  ${endX - 40},${endY + 30} 
                  ${endX},${endY + 15}`;
      } else {
        // Middle input to extraction (cytogenetic) - straighter line
        return `M${startX},${startY} 
                C${startX + 30},${startY} 
                  ${endX - 30},${endY} 
                  ${endX},${endY}`;
      }
    }
    
    // Special case for connections from classification to outputs
    if (fromNode === 'classification') {
      if (toNode === 'who') {
        // Path to WHO (top)
        return `M${startX},${startY} 
                C${startX + 40},${startY} 
                  ${endX - 40},${endY} 
                  ${endX},${endY}`;
      } else if (toNode === 'icc') {
        // Path to ICC (bottom)
        return `M${startX},${startY} 
                C${startX + 40},${startY} 
                  ${endX - 40},${endY} 
                  ${endX},${endY}`;
      }
    }
    
    // Default straight line with curve
    return `M${startX},${startY} 
            C${startX + 30},${startY} 
              ${endX - 30},${endY} 
              ${endX},${endY}`;
  };
  
  return (
    <div className={`${styles.diagramContainer} interactive-flow`} onClick={handleBackgroundClick} ref={diagramRef}>
      <div className={styles.diagramHeader}>
        <h4 className={styles.diagramTitle}>Classification workflow</h4>
        <a 
          href="/full-flow" 
          className={styles.fullFlowButton}
          onClick={(e) => e.stopPropagation()}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="8" y1="12" x2="16" y2="12"></line>
            <line x1="12" y1="8" x2="12" y2="16"></line>
          </svg>
          Full Workflow
        </a>
      </div>
      <svg className={styles.diagram} viewBox="0 0 980 280">
        {/* Draw connections first so they're behind nodes */}
        {connections.map(conn => {
          const isActive = activeNode === conn.from || activeNode === conn.to;
          const isHovered = hoverNode === conn.from || hoverNode === conn.to;
          return (
            <g key={`${conn.from}-${conn.to}`} 
               className={`${isActive ? styles.activePath : ''} ${isHovered ? styles.hoverPath : ''}`}>
              <path 
                d={getConnectionPath(conn.from, conn.to)} 
                className={styles.connectionPath}
              />
              <path 
                d={getConnectionPath(conn.from, conn.to)} 
                className={styles.arrowPath}
                markerEnd="url(#arrowhead)"
              />
            </g>
          );
        })}
        
        {/* Arrow marker definition */}
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon 
              points="0 0, 10 3.5, 0 7" 
              className={styles.arrowHead} 
            />
          </marker>
        </defs>
        
        {/* Draw nodes */}
        {nodes.map(node => (
          <g 
            key={node.id} 
            transform={`translate(${node.x}, ${node.y})`}
            onClick={(e) => handleNodeClick(node.id, e)}
            onMouseEnter={() => handleMouseEnter(node.id)}
            onMouseLeave={handleMouseLeave}
            className={`${styles.node} ${activeNode === node.id ? styles.activeNode : ''} ${hoverNode === node.id ? styles.hoverNode : ''}`}
            ref={el => nodeRefs.current[node.id] = el}
          >
            <rect
              width={node.width}
              height={node.height}
              rx="5"
              className={styles.nodeRect}
            />
            <text
              x={node.width / 2}
              y={node.height / 2}
              textAnchor="middle"
              className={styles.nodeTitle}
            >
              {node.title}
            </text>
          </g>
        ))}
      </svg>
      
      {/* Default explanation panel when no node is selected */}
      {!activeNode && (
        <div 
          className={styles.explanationPanel} 
          onClick={(e) => e.stopPropagation()}
          style={{ 
            position: 'absolute',
            top: '430px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '98%',
            maxWidth: '800px'
          }}
        >
          <h3>HaematoAx Diagnostic Flow</h3>
          <p className={styles.descriptionText}>
            This diagram shows how our system processes and classifies hematologic findings.
          </p>
          <p className={styles.detailsText}>
            Data flows from left to right: input sources (Molecular, Cytogenetic, Clinical) → 
            Key Field Extraction → Classification Model → WHO and ICC classifications.
            Click any element for more details.
          </p>
        </div>
      )}
      
      {/* Explanation panel with fixed central positioning */}
      {activeNode && (
        <div 
          className={styles.explanationPanel} 
          onClick={(e) => e.stopPropagation()}
          style={{ 
            position: 'absolute',
            top: '430px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '98%',
            maxWidth: '800px'
          }}
        >
          <h3>{getNodeById(activeNode).title}</h3>
          <p className={styles.descriptionText}>{getNodeById(activeNode).description}</p>
          <p className={styles.detailsText}>{getNodeById(activeNode).details}</p>
          
          <div style={{ 
            display: 'flex', 
            gap: '1rem', 
            justifyContent: 'flex-start',
            marginTop: '20px'
          }}>
            <div 
              className={styles.closePanel} 
              onClick={() => setActiveNode(null)}
              style={{
                margin: '0',
                textAlign: 'center',
                width: '80px'
              }}
            >
              Close
            </div>
            {activeNode === 'classification' && (
              <a 
                href="/classifer_methodology.pdf" 
                download="HaematoAx_Classifier_Methodology.pdf"
                className={styles.closePanel}
                style={{ 
                  backgroundColor: '#009688', 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  whiteSpace: 'nowrap',
                  width: 'auto',
                  minWidth: '180px',
                  padding: '4px 16px',
                  margin: '0'
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="12" y1="18" x2="12" y2="12"></line>
                  <line x1="9" y1="15" x2="15" y2="15"></line>
                </svg>
                View Methodology
              </a>
            )}
          </div>
        </div>
      )}
      
      <style jsx>{`
        /* Increase text size */
        :global(.interactive-flow .node text) {
          font-size: 15px !important;
          font-weight: 500 !important;
        }
        
        :global(.interactive-flow .connection) {
          stroke-width: 2px !important;
        }
        
        :global(.interactive-flow rect),
        :global(.interactive-flow circle),
        :global(.interactive-flow ellipse) {
          stroke-width: 2px !important;
        }
      `}</style>
    </div>
  );
};

export default InteractiveFlowDiagram; 