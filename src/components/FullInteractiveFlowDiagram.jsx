import React, { useState, useRef, useEffect } from 'react';

const FlowchartDiagram = () => {
  const [hoveredNodeId, setHoveredNodeId] = useState(null);
  const [hoveredPathId, setHoveredPathId] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [panelPosition, setPanelPosition] = useState({ top: 0, left: '50%', transform: 'translateX(-50%)' });
  const diagramRef = useRef(null);

  // --- Node Definitions ---
  // Final coordinates after all adjustments (including +30px shift down)
  // Includes dataExample property
  const nodes = [
      // Main Path
      { id: 'start', x: 50, y: 285, width: 100, height: 40, type: 'ellipse', label: 'Start', explanation: 'Initiates the data processing workflow.', dataExample: 'Process triggered.', style: { fill: '#C8E6C9', stroke: '#66BB6A', strokeWidth: 2 } },
      { id: 'reports', x: 200, y: 280, width: 130, height: 50, type: 'rect', label: 'All Relevant Reports', explanation: 'Input data source: Gathers all necessary patient reports or documents.', dataExample: 'Patient: JD001\nReports: Path_Report_12A.pdf, Mol_Report_34B.txt, Cyto_Report_56C.hl7...' },
      { id: 'nlp', x: 400, y: 280, width: 160, height: 50, type: 'rect', label: 'Natural Language Model', explanation: 'Processes the text from reports using NLP techniques.', dataExample: 'Analyzing text for keywords and values...' },
              { id: 'predefined', x: 400, y: 370, width: 160, height: 60, type: 'rect', label: ["Predefined Required", "Data Fields"], explanation: 'Specifies the key data points the NLP model should look for and extract.', dataExample: "['Gene Mutation', 'VAF', 'Blast %', 'Cytogenetics', 'Diagnosis Term']" },
      { id: 'extracted', x: 610, y: 280, width: 130, height: 50, type: 'rect', label: 'Extracted Data fields', explanation: 'Structured data extracted from the reports by the NLP model.', dataExample: JSON.stringify({ gene: 'FLT3', mutation: 'ITD', vaf: '45%', blasts: '60%', cyto: '46,XX', diagnosis: 'AML' }, null, 2) },

      // Treatment and Clinical Trial Path
      { id: 'treatmentEngine', x: 450, y: 10, width: 200, height: 50, type: 'rect', label: 'Treatment Suggestion Engine', explanation: 'AI-powered system that analyzes patient data to recommend personalized treatment options based on current guidelines and evidence.', dataExample: 'Recommendations:\n1. Gilteritinib (FLT3 inhibitor) - FDA approved for FLT3-ITD AML\n2. Intensive chemotherapy: 7+3 (Cytarabine + Daunorubicin)\n3. Consider clinical trials for novel FLT3 inhibitors', style: { fill: '#E3F2FD', stroke: '#1976D2', strokeWidth: 2 } },
      { id: 'clinicalTrialEngine', x: 700, y: 10, width: 200, height: 50, type: 'rect', label: 'Clinical Trial Matching Engine', explanation: 'Intelligent matching system that identifies relevant clinical trials based on patient molecular profile, disease characteristics, and eligibility criteria.', dataExample: 'Matched Trials:\n1. NCT04293562: FLT3-ITD AML combination therapy\n2. NCT04462627: Novel FLT3 inhibitor Phase II\n3. NCT04170816: Personalized AML treatment study\nMatch Score: 95%', style: { fill: '#E3F2FD', stroke: '#1976D2', strokeWidth: 2 } },

      // Reasoning Path
      { id: 'allData', x: 625, y: 90, width: 100, height: 100, type: 'circle', label: 'All Data', explanation: 'A central pool potentially combining extracted data with other sources for deeper analysis.', dataExample: JSON.stringify({ patient_id: 'JD001', report_ids: ['12A', '34B', '56C'], extracted_fields: { gene: 'FLT3', mutation: 'ITD', vaf: '45%' }, demographic: { age: 55, sex: 'F'}, lab_values: { wbc: '15.3', hgb: '9.8' } }, null, 2)},
      { id: 'reasoning', x: 860, y: 115, width: 140, height: 50, type: 'rect', label: 'Reasoning Model', explanation: 'Performs advanced analysis or review based on the comprehensive data.', dataExample: 'Applying rules, heuristics, and AI models...' },
      { id: 'classReview', x: 1200, y: 30, width: 150, height: 40, type: 'roundedRect', label: 'Classification Review', explanation: 'Output review related to the assigned classifications.', dataExample: 'Review Result: Classification consistent with extracted data.', style: { fill: '#E3F2FD', stroke: '#1976D2', strokeWidth: 2 } },
      { id: 'mrdReview', x: 1200, y: 80, width: 150, height: 40, type: 'roundedRect', label: 'MRD Strategy Review', explanation: 'Output review related to Minimal Residual Disease strategy.', dataExample: 'Recommendation: Follow-up MRD testing via flow cytometry.', style: { fill: '#E3F2FD', stroke: '#1976D2', strokeWidth: 2 } },
      { id: 'geneReview', x: 1200, y: 130, width: 150, height: 40, type: 'roundedRect', label: 'Gene Review', explanation: 'Output review focusing on genetic markers or mutations.', dataExample: 'Finding: Actionable FLT3-ITD mutation identified. Consider Gilteritinib.', style: { fill: '#E3F2FD', stroke: '#1976D2', strokeWidth: 2 } },
      { id: 'diffReview', x: 1200, y: 180, width: 150, height: 40, type: 'roundedRect', label: 'Differentiation Review', explanation: 'Output review related to cell differentiation status.', dataExample: 'Finding: Markers indicate myeloid lineage consistent with AML.', style: { fill: '#E3F2FD', stroke: '#1976D2', strokeWidth: 2 } },

      // Classification Path (WHO/ICC are parallelograms)
      { id: 'classificationModel', x: 810, y: 280, width: 140, height: 50, type: 'rect', label: 'Classification Model', explanation: 'Analyzes extracted data to assign disease classifications.', dataExample: 'Input: { blasts: 60, cyto: \'46,XX\', gene: \'FLT3\', ...}\nApplying WHO 2022 / ICC 2022 logic...' },
      { id: 'who', x: 1020, y: 255, width: 140, height: 40, type: 'parallelogram', label: 'WHO Classification', explanation: 'Outputs classification based on World Health Organization standards.', dataExample: 'WHO 2022: Acute myeloid leukaemia, NOS > AML with FLT3-ITD' }, // Type changed back
      { id: 'icc', x: 1020, y: 305, width: 140, height: 40, type: 'parallelogram', label: 'ICC Classification', explanation: 'Outputs classification based on International Consensus Classification standards.', dataExample: 'ICC 2022: AML with other defined genetic alterations > AML, FLT3-ITD mutated' }, // Type changed back
      { id: 'classifications', x: 1230, y: 280, width: 130, height: 50, type: 'roundedRect', label: 'Classifications', explanation: 'Consolidated output of the different classification results.', dataExample: JSON.stringify({ WHO_2022: 'AML with FLT3-ITD', ICC_2022: 'AML, FLT3-ITD mutated'}, null, 2), style: { fill: '#E3F2FD', stroke: '#1976D2', strokeWidth: 2 } },

      // Decision and Risk Path
      { id: 'decision', x: 830, y: 410, width: 100, height: 80, type: 'diamond', label: 'AML or MDS', explanation: 'Decision point: Determines the disease subtype (Acute Myeloid Leukemia or Myelodysplastic Syndromes) to guide risk stratification.', dataExample: 'Condition: blasts (60%) >= 20%\nResult: AML' },
      { id: 'ipcc', x: 1020, y: 385, width: 150, height: 60, type: 'rect', label: ["IPCC Risk", "Stratification Model"], explanation: 'Risk model applied if the diagnosis is MDS (uses International Prognostic Scoring System criteria).', dataExample: 'N/A for this AML case.' },
      { id: 'ipccScores', x: 1230, y: 395, width: 130, height: 40, type: 'roundedRect', label: 'IPCC Risk Scores', explanation: 'Calculated risk score for MDS patients.', dataExample: 'N/A', style: { fill: '#E3F2FD', stroke: '#1976D2', strokeWidth: 2 } },
      { id: 'eln', x: 1020, y: 460, width: 150, height: 60, type: 'rect', label: ["ELN Risk", "Stratification Model"], explanation: 'Risk model applied if the diagnosis is AML (uses European LeukemiaNet criteria).', dataExample: 'Input: { cyto: \'46,XX\', gene: \'FLT3\', mutation: \'ITD\', ...}\nApplying ELN 2022 criteria...' },
      { id: 'elnScores', x: 1230, y: 470, width: 130, height: 40, type: 'roundedRect', label: 'ELN Risk Scores', explanation: 'Calculated risk score for AML patients.', dataExample: 'ELN 2022 Risk: Adverse', style: { fill: '#E3F2FD', stroke: '#1976D2', strokeWidth: 2 } },
  ];

  // --- Connection Definitions ---
  // Adjusted midX for c17-c20, removed labels c11/c12
  const connections = [
      { id: 'c1', source: 'start', target: 'reports', type: 'solid' }, { id: 'c2', source: 'reports', target: 'nlp', type: 'solid' },
      { id: 'c3', source: 'predefined', target: 'nlp', type: 'solid' },       { id: 'c4', source: 'nlp', target: 'extracted', type: 'solid' },
      { id: 'c5', source: 'extracted', target: 'classificationModel', type: 'solid' }, { id: 'c15', source: 'extracted', target: 'allData', type: 'dashed' },
      { id: 'c16', source: 'allData', target: 'reasoning', type: 'solid' },
      { id: 'c24', source: 'allData', target: 'treatmentEngine', type: 'solid' },
      { id: 'c25', source: 'allData', target: 'clinicalTrialEngine', type: 'solid' },
      { id: 'c17', source: 'reasoning', target: 'classReview', type: 'solid', pathType: 'elbow', midX: 1100 }, // Adjusted midX based on reasoning pos
      { id: 'c18', source: 'reasoning', target: 'mrdReview', type: 'solid', pathType: 'elbow', midX: 1100 },
      { id: 'c19', source: 'reasoning', target: 'geneReview', type: 'solid', pathType: 'elbow', midX: 1100 },
      { id: 'c20', source: 'reasoning', target: 'diffReview', type: 'solid', pathType: 'elbow', midX: 1100 },
      { id: 'c21', source: 'classifications', target: 'allData', type: 'dashed', pathType: 'curve' }, { id: 'c22', source: 'reports', target: 'allData', type: 'dashed', pathType: 'curve' },
      { id: 'c23', source: 'classificationModel', target: 'decision', type: 'solid' },
      { id: 'c7', source: 'classificationModel', target: 'who', type: 'solid', pathType: 'elbow', midX: 950 }, { id: 'c8', source: 'classificationModel', target: 'icc', type: 'solid', pathType: 'elbow', midX: 950 },
      { id: 'c9', source: 'who', target: 'classifications', type: 'solid' }, { id: 'c10', source: 'icc', target: 'classifications', type: 'solid' },
      { id: 'c11', source: 'decision', target: 'ipcc', type: 'solid' }, // Label removed
      { id: 'c12', source: 'decision', target: 'eln', type: 'solid' }, // Label removed
      { id: 'c13', source: 'ipcc', target: 'ipccScores', type: 'solid' }, { id: 'c14', source: 'eln', target: 'elnScores', type: 'solid' },
  ];

  // --- Helper Functions ---
  const findNodeById = (id) => nodes.find(n => n.id === id);

  const getNodeCenter = (node) => {
      if (!node) return { x: 0, y: 0 };
      return { x: node.x + node.width / 2, y: node.y + node.height / 2 };
  };

  const getNodeConnectionPoint = (node, targetX, targetY, connectionId = null, sourceNodeId = null) => {
      // Calculates the point on the node's border closest to the target point,
      // with specific logic for diamond vertices and review node edges.
      if (!node) return { x: 0, y: 0 };
      const { x: cx, y: cy } = getNodeCenter(node);
      const { width: w, height: h } = node;
      let dx = targetX - cx;
      let dy = targetY - cy;

      const epsilon = 0.01;
      if (Math.abs(dx) < epsilon && Math.abs(dy) < epsilon) return {x: cx, y: cy};
      if (Math.abs(dx) < epsilon) dx = Math.sign(dx) * epsilon || epsilon;
      if (Math.abs(dy) < epsilon) dy = Math.sign(dy) * epsilon || epsilon;

      let pointX, pointY;

      const reviewNodeIds = ['classReview', 'mrdReview', 'geneReview', 'diffReview'];
      const reasoningReviewConnectionIds = ['c17', 'c18', 'c19', 'c20'];

      // --- Specific source point logic for Reasoning -> Reviews ---
      if (node.id === 'reasoning' && reasoningReviewConnectionIds.includes(connectionId)) {
           pointX = node.x + w; pointY = cy; // Middle of right edge
           return { x: pointX, y: pointY };
      }
      // --- Specific target point logic for review nodes ---
      if (sourceNodeId === 'reasoning' && reviewNodeIds.includes(node.id)) {
           pointX = node.x; pointY = cy; // Middle of left edge
           return { x: pointX, y: pointY };
      }

      if (node.type === 'ellipse' || node.type === 'circle') {
          const radiusX = node.width / 2; const radiusY = node.height / 2;
          const angle = Math.atan2(dy / radiusY, dx / radiusX);
          pointX = cx + radiusX * Math.cos(angle); pointY = cy + radiusY * Math.sin(angle);
      } else if (node.type === 'diamond') {
           if ((connectionId === 'c11' || connectionId === 'c12') && sourceNodeId === 'decision') { pointX = node.x + w; pointY = cy; } // Right vertex
           else if (connectionId === 'c23' && sourceNodeId === 'classificationModel') { pointX = cx; pointY = node.y; } // Top point
           else { const angle = Math.atan2(dy, dx); const pi = Math.PI; const diamondAngle = Math.atan2(h / 2, w / 2); if (angle > -diamondAngle && angle <= diamondAngle) { pointX = node.x + w; pointY = cy; } else if (angle > diamondAngle && angle <= pi - diamondAngle) { pointX = cx; pointY = node.y + h; } else if (angle > pi - diamondAngle || angle <= -(pi - diamondAngle)) { pointX = node.x; pointY = cy; } else { pointX = cx; pointY = node.y; } }
      } else { // Rect, Parallelogram, RoundedRect
        const angle = Math.atan2(dy, dx); const tan_phi = Math.tan(angle);
        const halfW = w / 2; const halfH = h / 2; let Px, Py;
        const thresholdAngle = Math.atan2(halfH, halfW);
        if (Math.abs(angle) < thresholdAngle || Math.abs(angle) > Math.PI - thresholdAngle) { Px = dx > 0 ? halfW : -halfW; Py = Px * tan_phi; }
        else { Py = dy > 0 ? halfH : -halfH; Px = Py / tan_phi; }
         pointX = cx + Px; pointY = cy + Py;

         if (node.id === 'classificationModel' && connectionId === 'c23') { pointX = cx; pointY = node.y + h; } // Bottom center for outgoing c23

         // Apply visual skew offset if parallelogram for WHO/ICC
         if (node.type === 'parallelogram') {
              const skewFactor = -0.26; // Corresponds roughly to skewX(-15)
              const relativeY = pointY - cy;
              pointX += relativeY * skewFactor;
         }
      }

      return { x: pointX, y: pointY };
  };

  const getPathData = (connection) => {
      // Calculates the SVG path string (d attribute) for a connection
      const sourceNode = findNodeById(connection.source);
      const targetNode = findNodeById(connection.target);
      if (!sourceNode || !targetNode) return '';
      const startCenter = getNodeCenter(sourceNode);
      const endCenter = getNodeCenter(targetNode);
      const start = getNodeConnectionPoint(sourceNode, endCenter.x, endCenter.y, connection.id, sourceNode.id);
      const end = getNodeConnectionPoint(targetNode, startCenter.x, startCenter.y, connection.id, sourceNode.id);
      if (connection.pathType === 'elbow') {
          const midX = connection.midX !== undefined ? connection.midX : start.x;
          const midY = connection.midY !== undefined ? connection.midY : end.y;
          if (connection.source === 'reasoning') { return `M ${start.x} ${start.y} L ${midX} ${start.y} L ${midX} ${end.y} L ${end.x} ${end.y}`; } // Horizontal first for Reasoning -> Reviews
          else { return `M ${start.x} ${start.y} L ${start.x} ${midY} L ${end.x} ${midY} L ${end.x} ${end.y}`; } // Default Vertical first
      } else if (connection.pathType === 'curve') {
          const sx = start.x; const sy = start.y; const ex = end.x; const ey = end.y;
          const dx = ex - sx; const dy = ey - sy; let ctrlX, ctrlY;
          if (connection.id === 'c22') { ctrlX = sx + dx * 0.1; ctrlY = sy + dy * 0.9; }
          else if (connection.id === 'c21') { ctrlX = sx + dx * 0.3; ctrlY = sy + dy * 0.7; }
          else { const curveFactor = 0.3; ctrlX = (sx + ex) / 2 - dy * curveFactor; ctrlY = (sy + ey) / 2 + dx * curveFactor; }
          return `M ${sx} ${sy} Q ${ctrlX} ${ctrlY}, ${ex} ${ey}`;
      } else { return `M ${start.x} ${start.y} L ${end.x} ${end.y}`; } // Straight line
  };

  const getLabelPosition = (connection) => {
      // Calculates the position for connection labels (if they exist)
      const sourceNode = findNodeById(connection.source);
      const targetNode = findNodeById(connection.target);
      if (!sourceNode || !targetNode || !connection.label) return null; // No label = return null
      const startCenter = getNodeCenter(sourceNode);
      const endCenter = getNodeCenter(targetNode);
      const start = getNodeConnectionPoint(sourceNode, endCenter.x, endCenter.y, connection.id, sourceNode.id);
      const end = getNodeConnectionPoint(targetNode, startCenter.x, startCenter.y, connection.id, sourceNode.id);
      const t = 0.5; const offset = 15;
      const midX = start.x + (end.x - start.x) * t; const midY = start.y + (end.y - start.y) * t;
      const angleRad = Math.atan2(end.y - start.y, end.x - start.x);
      const offsetX = offset * Math.sin(angleRad); const offsetY = -offset * Math.cos(angleRad);
      let labelX = midX + offsetX; let labelY = midY + offsetY;
      return { x: labelX, y: labelY };
  };

  const handleNodeClick = (node, event) => {
      // Handles clicks on nodes to show the explanation panel
      setSelectedNode(node);
      const diagramRect = diagramRef.current?.getBoundingClientRect();
      const nodeElement = event.currentTarget;
      const nodeRect = nodeElement?.getBoundingClientRect();
      if (!diagramRect || !nodeRect) { setPanelPosition({ top: 200, left: '50%', transform: 'translateX(-50%)'}); return; }
      const panelTop = nodeRect.bottom - diagramRect.top + 20 + (diagramRef.current?.scrollTop || 0);
      const panelLeft = nodeRect.left - diagramRect.left + nodeRect.width / 2 + (diagramRef.current?.scrollLeft || 0);
      setPanelPosition({ top: panelTop, left: panelLeft, transform: 'translateX(-50%)', });
  };

  const getDiamondPoints = (node) => {
      // Calculates the points string for a diamond polygon
      const x = node.x; const y = node.y; const w = node.width; const h = node.height;
      return `${x + w/2},${y} ${x + w},${y + h/2} ${x + w/2},${y + h} ${x},${y + h/2}`;
  };

  // --- Render ---
  return (
    <div className="diagramContainer" ref={diagramRef}>

      <svg className="diagram" width="1500" height="620" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1800 750">
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="8" refY="3.5" orient="auto" markerUnits="strokeWidth">
            <polygon points="0 0, 10 3.5, 0 7" className="arrowHead" />
          </marker>
        </defs>

        {/* Connections */}
        {connections.map((conn) => {
             const isActive = selectedNode && (selectedNode.id === conn.source || selectedNode.id === conn.target);
             return (
                  <g key={conn.id} onMouseEnter={() => setHoveredPathId(conn.id)} onMouseLeave={() => setHoveredPathId(null)} className={`${hoveredPathId === conn.id ? 'hoverPath' : ''} ${isActive ? 'activePath' : ''}`}>
                    <path d={getPathData(conn)} className="connectionPath" markerEnd={"url(#arrowhead)"} strokeDasharray={conn.type === 'dashed' ? '5,5' : 'none'} />
                    {conn.label && getLabelPosition(conn) && ( <text x={getLabelPosition(conn).x} y={getLabelPosition(conn).y} className="connectionLabel" textAnchor="middle" dominantBaseline="central">{conn.label}</text> )}
                  </g>
             );
        })}

        {/* Nodes */}
        {nodes.map((node) => (
          <g key={node.id} className={`node ${hoveredNodeId === node.id ? 'hoverNode' : ''} ${selectedNode?.id === node.id ? 'activeNode' : ''}`} onMouseEnter={() => setHoveredNodeId(node.id)} onMouseLeave={() => setHoveredNodeId(null)} onClick={(e) => handleNodeClick(node, e)} style={{ cursor: 'pointer' }}>
             {node.type === 'ellipse' && ( <ellipse cx={node.x + node.width / 2} cy={node.y + node.height / 2} rx={node.width / 2} ry={node.height / 2} className="nodeRect" style={node.style} /> )}
             {node.type === 'rect' && ( <rect x={node.x} y={node.y} width={node.width} height={node.height} rx="3" ry="3" className="nodeRect" style={node.style} /> )}
             {/* --- Added back parallelogram rendering --- */}
             {node.type === 'parallelogram' && ( <rect x={node.x} y={node.y} width={node.width} height={node.height} className="nodeRect" transform={`skewX(-15)`} style={{ transformBox: 'fill-box', transformOrigin: 'center center', ...node.style }} /> )}
             {node.type === 'diamond' && ( <polygon points={getDiamondPoints(node)} className="nodeRect" style={node.style} /> )}
             {node.type === 'circle' && ( <circle cx={node.x + node.width / 2} cy={node.y + node.height / 2} r={node.width / 2} className="nodeRect" style={node.style} /> )}
             {node.type === 'roundedRect' && ( <rect x={node.x} y={node.y} width={node.width} height={node.height} rx="15" ry="15" className="nodeRect" style={node.style} /> )}

            {/* Text Rendering with Wrapping */}
            {typeof node.label === 'string' ? ( <text x={node.x + node.width / 2} y={node.y + node.height / 2} textAnchor="middle" dominantBaseline="central" className="nodeTitle"> {node.label} </text> ) :
            ( <text x={node.x + node.width / 2} y={node.y + node.height / 2 - (node.label.length - 1) * 7} textAnchor="middle" className="nodeTitle" dominantBaseline="central"> {node.label.map((line, index) => ( <tspan key={index} x={node.x + node.width / 2} dy={index === 0 ? '0.1em' : '1.2em'} > {line} </tspan> ))} </text> )}
          </g>
        ))}
      </svg>

      {/* Explanation Panel */}
      {selectedNode && (
          <div className="explanationPanel" style={{ position: 'absolute', ...panelPosition }}>
              <h3>{selectedNode.label}</h3>
              <p className="descriptionText">{selectedNode.explanation}</p>
              {/* Display Data Example instead of Inputs/Outputs */}
              {selectedNode.dataExample && (
                  <div className="dataExampleSection">
                      <h4>Data Example:</h4>
                      <pre className="dataExampleText">{selectedNode.dataExample}</pre>
                  </div>
              )}
              <button className="closePanel" onClick={() => setSelectedNode(null)}>Close</button>
          </div>
      )}

      {/* --- CSS --- */}
      <style jsx global>{`
        /* Same CSS as before */
        .diagramContainer { position: relative; width: 100%; margin: 0 auto; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; padding-top: 10px; background-color: #f8f9fa; border-radius: 12px; box-shadow: 0 8px 30px rgba(0,0,0,0.08), 0 0 15px rgba(0, 150, 136, 0.1); border: 1px solid rgba(0, 150, 136, 0.1); padding: 25px; overflow: auto; height: 85vh; }
        .diagramTitle { font-size: 18px; font-weight: 500; text-align: left; color: #00796b; margin: 0 0 20px; padding-bottom: 15px; border-bottom: 1px solid rgba(0, 150, 136, 0.15); }
        .diagram { width: 100%; height: auto; display: block; min-width: 1200px; }
        .node { cursor: pointer; transition: filter 0.2s ease-out; }
        .nodeRect { fill: white; stroke: #009688; stroke-width: 1.5; filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.1)); transition: fill 0.2s ease, stroke-width 0.2s ease, filter 0.2s ease, stroke 0.2s ease; }
        .hoverNode .nodeRect { fill: #e0f2f1; stroke: #00796b; stroke-width: 2; filter: drop-shadow(3px 3px 5px rgba(0,0,0,0.15)) brightness(1.03); }
        .activeNode .nodeRect { fill: #b2dfdb; stroke: #00695c; stroke-width: 2.5; filter: drop-shadow(3px 3px 5px rgba(0,0,0,0.2)) brightness(1.05); }
        .nodeTitle { font-size: 12px; fill: #37474f; pointer-events: none; font-weight: 500; dominant-baseline: central; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; }
        g > text { transform: none !important; } /* Prevent text skew in parallelograms */

        .connectionPath { fill: none; stroke: #78909c; stroke-width: 1.5; transition: stroke 0.2s ease, stroke-width 0.2s ease; }
        .arrowHead { fill: #78909c; transition: fill 0.2s ease; }
        .connectionLabel { font-size: 10px; fill: #546e7a; pointer-events: none; }
        .hoverPath .connectionPath { stroke: #26a69a; stroke-width: 2; }
        .hoverPath .arrowHead { fill: #26a69a; }
        .hoverPath .connectionLabel { fill: #1a7f74; }
        .activePath .connectionPath { stroke: #009688; stroke-width: 2.5; }
        .activePath .arrowHead { fill: #009688; }
        .activePath .connectionLabel { fill: #00695c; font-weight: 500; }
        
        /* Explanation Panel Styles */
        .explanationPanel { background-color: white; border-radius: 10px; box-shadow: 0 10px 30px rgba(0,0,0,0.15), 0 0 10px rgba(0,0,0,0.05); padding: 15px 20px 20px; z-index: 1000; animation: fadeIn 0.3s ease-out; border: 1px solid rgba(0, 150, 136, 0.15); border-top: 4px solid #009688; width: 320px; max-width: 90%; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px) translateX(-50%); } to { opacity: 1; transform: translateY(0) translateX(-50%); } }
        .explanationPanel h3 { margin-top: 0; margin-bottom: 8px; color: #00796b; font-size: 14px; font-weight: 600; text-align: center; padding-bottom: 8px; border-bottom: 1px solid rgba(0, 150, 136, 0.15); }
        .descriptionText { margin-bottom: 12px; font-size: 12px; line-height: 1.5; color: #455a64; text-align: left; }
        
        /* Styles for the Data Example Section */
        .dataExampleSection { margin-top: 15px; padding-top: 10px; border-top: 1px solid rgba(0, 150, 136, 0.1); }
        .dataExampleSection h4 { margin-top: 0; margin-bottom: 5px; color: #00796b; font-size: 12px; font-weight: 600; }
        .dataExampleText { font-size: 11px; line-height: 1.4; color: #37474f; background-color: #e8f5e9; padding: 8px 10px; border-radius: 4px; margin: 0; white-space: pre-wrap; word-wrap: break-word; font-family: 'Courier New', Courier, monospace; border: 1px solid #c8e6c9; }
        
        .closePanel { display: block; margin: 15px auto 0; padding: 6px 14px; background-color: #009688; color: white; border: none; border-radius: 6px; font-size: 12px; cursor: pointer; transition: all 0.2s ease; text-align: center; font-weight: 500; width: 80px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
        .closePanel:hover { background-color: #00796b; box-shadow: 0 4px 8px rgba(0,0,0,0.15); transform: translateY(-1px); }
        @media (max-width: 768px) { .diagramContainer { padding: 15px; height: 75vh; } .diagramTitle { font-size: 16px; } .explanationPanel { width: 90%; left: 50% !important; transform: translateX(-50%) !important; } .nodeTitle { font-size: 10px; } }
      `}</style>
    </div>
  );
};

export default FlowchartDiagram;