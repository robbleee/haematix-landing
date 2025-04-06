'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './FlowDiagram.module.css';

const FlowDiagram = ({ horizontal = true }) => {
  const [animate, setAnimate] = useState(false);
  const [activeNode, setActiveNode] = useState(null);
  const [activeConnections, setActiveConnections] = useState([]);
  const diagramRef = useRef(null);
  
  useEffect(() => {
    // Add animation when component is in view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    
    if (diagramRef.current) {
      observer.observe(diagramRef.current);
    }
    
    return () => {
      if (diagramRef.current) {
        observer.disconnect();
      }
    };
  }, []);
  
  // Flow steps data with descriptions for tooltips
  const steps = [
    {
      id: 'input',
      label: 'Molecular & Cytogenetic Reports',
      type: 'input',
      description: 'Free text molecular, cytogenetic, and clinical reports are provided as input'
    },
    {
      id: 'extraction',
      label: 'Key Field Extraction',
      type: 'extraction',
      description: 'Critical data points are extracted from unstructured text reports'
    },
    {
      id: 'classification',
      label: 'Classification Model',
      type: 'classification',
      description: 'Extracted data is processed through classification algorithms'
    },
    {
      id: 'who',
      label: 'WHO 2022',
      type: 'pathway',
      description: 'World Health Organization 2022 classification criteria'
    },
    {
      id: 'icc',
      label: 'ICC 2022',
      type: 'pathway',
      description: 'International Consensus Classification 2022 criteria'
    },
    {
      id: 'who-output',
      label: 'WHO Output',
      type: 'output',
      description: 'WHO 2022 classification for AML and MDS with risk stratification'
    },
    {
      id: 'icc-output',
      label: 'ICC Output',
      type: 'output',
      description: 'ICC 2022 classification with ELN risk for AML and IPSS for MDS'
    }
  ];
  
  // Connections between nodes
  const connections = [
    { from: 'input', to: 'extraction' },
    { from: 'extraction', to: 'classification' },
    { from: 'classification', to: 'who' },
    { from: 'classification', to: 'icc' },
    { from: 'who', to: 'who-output' },
    { from: 'icc', to: 'icc-output' }
  ];
  
  // Handle node click
  const handleNodeClick = (nodeId) => {
    const node = steps.find(step => step.id === nodeId);
    const connectedNodes = connections
      .filter(conn => conn.from === nodeId || conn.to === nodeId)
      .map(conn => conn.from === nodeId ? conn.to : conn.from);
      
    setActiveNode(nodeId);
    setActiveConnections(connections.filter(
      conn => conn.from === nodeId || conn.to === nodeId
    ));
  };
  
  // Get step by ID
  const getStepById = (id) => {
    return steps.find(step => step.id === id);
  };

  // Render node with tooltip
  const renderNode = (node) => {
    return (
      <div 
        key={node.id}
        className={`${styles.node} ${styles[`${node.type}Node`]} ${activeNode === node.id ? styles.active : ''}`}
        onClick={() => handleNodeClick(node.id)}
      >
        {node.label}
        
        {/* Show tooltip when node is active */}
        {activeNode === node.id && (
          <div className={styles.tooltip}>{node.description}</div>
        )}
      </div>
    );
  };
  
  return (
    <div className={`${styles.flowDiagram} ${horizontal ? styles.horizontal : ''}`} ref={diagramRef}>
      <h2 className={styles.diagramTitle}>Dual Pathway Classification Logic</h2>
      
      <div className={`${styles.diagram} ${animate ? styles.animate : ''}`}>
        {/* Main flow nodes */}
        {steps
          .filter(step => ['input', 'extraction', 'classification'].includes(step.id))
          .map(node => renderNode(node))}
        
        {/* Pathway container for WHO and ICC */}
        <div className={styles.pathwayContainer}>
          {steps
            .filter(step => step.type === 'pathway')
            .map(node => (
              <div key={node.id} className={styles.pathwayNode}>
                {renderNode(node)}
              </div>
            ))}
        </div>
        
        {/* Output container for classification outputs */}
        <div className={styles.outputContainer}>
          {steps
            .filter(step => step.type === 'output')
            .map(node => (
              <div key={node.id} className={styles.outputNode}>
                {renderNode(node)}
              </div>
            ))}
        </div>
        
        {/* Render connections */}
        {connections.map((conn, index) => {
          const fromNode = steps.find(step => step.id === conn.from);
          const toNode = steps.find(step => step.id === conn.to);
          const isActive = activeConnections.some(
            activeConn => activeConn.from === conn.from && activeConn.to === conn.to
          );
          
          return (
            <div
              key={`${conn.from}-${conn.to}`}
              className={`${styles.connection} ${horizontal ? styles.horizontal : styles.vertical} ${isActive ? styles.active : ''}`}
              style={{
                // Simplified connection positioning
                left: conn.from === 'input' ? '25%' : 
                    conn.from === 'extraction' ? '50%' :
                    conn.from === 'classification' ? '75%' :
                    conn.from === 'who' || conn.from === 'icc' ? '85%' : undefined,
                width: '10%',
                top: conn.from === 'classification' && conn.to === 'who' ? '40%' :
                    conn.from === 'classification' && conn.to === 'icc' ? '60%' :
                    conn.from === 'who' ? '40%' :
                    conn.from === 'icc' ? '60%' : '50%'
              }}
            />
          );
        })}
      </div>
      
      {/* Information panel for selected node */}
      {activeNode && (
        <div className={styles.infoPanel}>
          <h3>{getStepById(activeNode).label}</h3>
          <p>{getStepById(activeNode).description}</p>
          
          {/* Show connected nodes info */}
          <div className={styles.connectionInfo}>
            {connections
              .filter(conn => conn.from === activeNode)
              .map(conn => (
                <div key={conn.to} className={styles.connectedNode}>
                  <span className={styles.connectionLabel}>→ Leads to:</span> {getStepById(conn.to).label}
                </div>
              ))
            }
            
            {connections
              .filter(conn => conn.to === activeNode)
              .map(conn => (
                <div key={conn.from} className={styles.connectedNode}>
                  <span className={styles.connectionLabel}>← Preceded by:</span> {getStepById(conn.from).label}
                </div>
              ))
            }
          </div>
        </div>
      )}
      
      {/* Interactive controls */}
      <div className={styles.controls}>
        <button 
          className={styles.resetButton} 
          onClick={() => {
            setAnimate(false);
            setActiveNode(null);
            setTimeout(() => setAnimate(true), 50);
          }}
        >
          Replay Animation
        </button>
      </div>
    </div>
  );
}

export default FlowDiagram; 