'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './InteractiveFlowDiagram.module.css';

const InteractiveFlowDiagram = () => {
  // State to track which node is active/clicked
  const [activeNode, setActiveNode] = useState(null);
  // State to track which node is being hovered
  const [hoverNode, setHoverNode] = useState(null);
  // State to store explanation panel position
  const [panelPosition, setPanelPosition] = useState({ top: 0, left: 0 });
  
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
      // Calculate position for explanation panel when a node is clicked
      updateExplanationPanelPosition(nodeId);
    }
  };
  
  // Function to calculate and update explanation panel position
  const updateExplanationPanelPosition = (nodeId) => {
    if (!nodeId || !nodeRefs.current[nodeId] || !diagramRef.current) return;
    
    const nodeElement = nodeRefs.current[nodeId];
    const diagramRect = diagramRef.current.getBoundingClientRect();
    const nodeRect = nodeElement.getBoundingClientRect();
    
    // Calculate relative position within the diagram
    const nodeCenter = nodeRect.left + nodeRect.width / 2 - diagramRect.left;
    
    // Position the explanation panel centered under the node
    setPanelPosition({
      top: nodeRect.bottom - diagramRect.top + 20, // 20px below the node
      left: Math.max(0, nodeCenter - 140) // Center the 280px wide panel under the node
    });
  };
  
  // Recalculate panel position when window resizes
  useEffect(() => {
    const handleResize = () => {
      if (activeNode) {
        updateExplanationPanelPosition(activeNode);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeNode]);
  
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
    <div className={styles.diagramContainer} onClick={handleBackgroundClick} ref={diagramRef}>
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
      
      {/* Explanation panel with dynamic positioning */}
      {activeNode && (
        <div 
          className={styles.explanationPanel} 
          onClick={(e) => e.stopPropagation()}
          style={{ 
            position: 'absolute',
            top: `${panelPosition.top}px`,
            left: `${panelPosition.left}px`,
            transform: 'none' // Override any transform from CSS
          }}
        >
          <h3>{getNodeById(activeNode).title}</h3>
          <p className={styles.descriptionText}>{getNodeById(activeNode).description}</p>
          <p className={styles.detailsText}>{getNodeById(activeNode).details}</p>
          
          {/* Connection information */}
          <div className={styles.connectionInfo}>
            {connections
              .filter(conn => conn.from === activeNode)
              .map(conn => (
                <div key={conn.to} className={styles.connectionDetail}>
                  <span className={styles.connectionLabel}>→ Leads to:</span> 
                  <span>{getNodeById(conn.to).title}</span>
                </div>
              ))
            }
            
            {connections
              .filter(conn => conn.to === activeNode)
              .map(conn => (
                <div key={conn.from} className={styles.connectionDetail}>
                  <span className={styles.connectionLabel}>← Preceded by:</span> 
                  <span>{getNodeById(conn.from).title}</span>
                </div>
              ))
            }
          </div>
          
          <div className={styles.closePanel} onClick={() => setActiveNode(null)}>
            Close
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveFlowDiagram; 