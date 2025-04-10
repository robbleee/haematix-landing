import React, { useState, useRef, useEffect } from 'react';

const FlowchartDiagram = () => {
  const [hoveredNodeId, setHoveredNodeId] = useState(null);
  const [hoveredPathId, setHoveredPathId] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [panelPosition, setPanelPosition] = useState({ top: 0, left: '50%', transform: 'translateX(-50%)' });
  const diagramRef = useRef(null);

  const nodes = [
    { id: 'start', x: 50, y: 250, width: 100, height: 40, type: 'ellipse', label: 'Start', explanation: 'Initiates the data processing workflow.' },
    { id: 'reports', x: 200, y: 225, width: 130, height: 50, type: 'rect', label: 'All Relevant Reports', explanation: 'Input data source: Gathers all necessary patient reports or documents.' },
    { id: 'nlp', x: 400, y: 225, width: 140, height: 50, type: 'rect', label: 'Natural Language Model', explanation: 'Processes the text from reports using NLP techniques.' },
    { id: 'predefined', x: 400, y: 310, width: 140, height: 50, type: 'rect', label: 'Predefined Required Data Fields', explanation: 'Specifies the key data points the NLP model should look for and extract.', style: { fill: '#e0f2f1', stroke: '#00796b' } },
    { id: 'extracted', x: 610, y: 225, width: 130, height: 50, type: 'rect', label: 'Extracted Data fields', explanation: 'Structured data extracted from the reports by the NLP model.' },
    { id: 'classificationModel', x: 810, y: 150, width: 140, height: 50, type: 'rect', label: 'Classification Model', explanation: 'Analyzes extracted data to assign disease classifications.' },
    { id: 'who', x: 1020, y: 100, width: 140, height: 40, type: 'parallelogram', label: 'WHO Classification', explanation: 'Outputs classification based on World Health Organization standards.' },
    { id: 'icc', x: 1020, y: 160, width: 140, height: 40, type: 'parallelogram', label: 'ICC Classification', explanation: 'Outputs classification based on International Consensus Classification standards.' },
    { id: 'classifications', x: 1230, y: 130, width: 130, height: 50, type: 'parallelogram', label: 'Classifications', explanation: 'Consolidated output of the different classification results.' },
    { id: 'decision', x: 810, y: 300, width: 100, height: 80, type: 'diamond', label: 'AML or MDS', explanation: 'Decision point: Determines the disease subtype (Acute Myeloid Leukemia or Myelodysplastic Syndromes) to guide risk stratification.' },
    { id: 'ipcc', x: 1020, y: 250, width: 150, height: 50, type: 'rect', label: 'IPCC Risk Stratification Model', explanation: 'Risk model applied if the diagnosis is MDS (uses International Prognostic Scoring System criteria).' },
    { id: 'ipccScores', x: 1230, y: 250, width: 130, height: 40, type: 'parallelogram', label: 'IPCC Risk Scores', explanation: 'Calculated risk score for MDS patients.' },
    { id: 'eln', x: 1020, y: 350, width: 150, height: 50, type: 'rect', label: 'ELN Risk Stratification Model', explanation: 'Risk model applied if the diagnosis is AML (uses European LeukemiaNet criteria).' },
    { id: 'elnScores', x: 1230, y: 350, width: 130, height: 40, type: 'parallelogram', label: 'ELN Risk Scores', explanation: 'Calculated risk score for AML patients.' },
    { id: 'allData', x: 610, y: 400, width: 100, height: 100, type: 'circle', label: 'All Data', explanation: 'A central pool potentially combining extracted data with other sources for deeper analysis.' },
    { id: 'reasoning', x: 810, y: 425, width: 140, height: 50, type: 'rect', label: 'Reasoning Model', explanation: 'Performs advanced analysis or review based on the comprehensive data.' },
    { id: 'classReview', x: 1020, y: 425, width: 150, height: 40, type: 'roundedRect', label: 'Classification Review', explanation: 'Output review related to the assigned classifications.' },
    { id: 'mrdReview', x: 1020, y: 475, width: 150, height: 40, type: 'roundedRect', label: 'MRD Strategy Review', explanation: 'Output review related to Minimal Residual Disease strategy.' },
    { id: 'geneReview', x: 1020, y: 525, width: 150, height: 40, type: 'roundedRect', label: 'Gene Review', explanation: 'Output review focusing on genetic markers or mutations.' },
    { id: 'diffReview', x: 1020, y: 575, width: 150, height: 40, type: 'roundedRect', label: 'Differentiation Review', explanation: 'Output review related to cell differentiation status.' },
  ];

  const connections = [
    { id: 'c1', source: 'start', target: 'reports', type: 'solid' },
    { id: 'c2', source: 'reports', target: 'nlp', type: 'solid' },
    { id: 'c3', source: 'predefined', target: 'nlp', type: 'solid' }, // Input dependency arrow
    { id: 'c4', source: 'nlp', target: 'extracted', type: 'solid' },
    { id: 'c5', source: 'extracted', target: 'classificationModel', type: 'solid', pathType: 'elbow', midY: 175 },
    { id: 'c6', source: 'extracted', target: 'decision', type: 'solid', pathType: 'elbow', midY: 340 },
    { id: 'c7', source: 'classificationModel', target: 'who', type: 'solid' },
    { id: 'c8', source: 'classificationModel', target: 'icc', type: 'solid' },
    { id: 'c9', source: 'who', target: 'classifications', type: 'solid' },
    { id: 'c10', source: 'icc', target: 'classifications', type: 'solid' },
    { id: 'c11', source: 'decision', target: 'ipcc', type: 'solid', label: 'MDS' },
    { id: 'c12', source: 'decision', target: 'eln', type: 'solid', label: 'AML' },
    { id: 'c13', source: 'ipcc', target: 'ipccScores', type: 'solid' },
    { id: 'c14', source: 'eln', target: 'elnScores', type: 'solid' },
    // Dashed connection and Reasoning path
    { id: 'c15', source: 'extracted', target: 'allData', type: 'dashed', pathType: 'elbow', midY: 310 },
    { id: 'c16', source: 'allData', target: 'reasoning', type: 'solid' },
    { id: 'c17', source: 'reasoning', target: 'classReview', type: 'solid' },
    { id: 'c18', source: 'reasoning', target: 'mrdReview', type: 'solid' },
    { id: 'c19', source: 'reasoning', target: 'geneReview', type: 'solid' },
    { id: 'c20', source: 'reasoning', target: 'diffReview', type: 'solid' },
    // Dashed line from All Data towards Classifications (interpretation: input or relation)
    { id: 'c21', source: 'allData', target: 'classifications', type: 'dashed', pathType: 'curve' },
  ];

  const findNodeById = (id) => nodes.find(n => n.id === id);

  const getNodeCenter = (node) => {
    if (!node) return { x: 0, y: 0 };
    return {
      x: node.x + node.width / 2,
      y: node.y + node.height / 2,
    };
  };

  const getNodeConnectionPoint = (node, targetX, targetY) => {
    if (!node) return { x: 0, y: 0 };
    const { x: cx, y: cy } = getNodeCenter(node);
    const { width: w, height: h } = node;
    const dx = targetX - cx;
    const dy = targetY - cy;

    if (dx === 0 && dy === 0) return { x: cx, y: cy };

    let pointX, pointY;

    if (node.type === 'ellipse' || node.type === 'circle') {
        const radiusX = node.width / 2;
        const radiusY = node.height / 2;
        const angle = Math.atan2(dy, dx);
        pointX = cx + radiusX * Math.cos(angle);
        pointY = cy + radiusY * Math.sin(angle);
    } else if (node.type === 'diamond') {
        const halfW = w / 2;
        const halfH = h / 2;
        const angle = Math.atan2(dy, dx);
        const tanTheta = Math.tan(angle);
        
        // Determine intersection edge based on angle
        if (Math.abs(dy) * halfW <= Math.abs(dx) * halfH) {
             // Intersects top or bottom edge
            pointX = cx + (dx > 0 ? halfW : -halfW);
            pointY = cy + tanTheta * (dx > 0 ? halfW : -halfW);
         } else {
             // Intersects left or right edge
             pointX = cx + (dy > 0 ? halfH / tanTheta : -halfH / tanTheta);
             pointY = cy + (dy > 0 ? halfH : -halfH);
         }
        // Simplified diamond connection points (corners or mid-sides)
        // This calculation is complex, approximate for now
        const side = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'bottom' : 'top');
        if(side === 'right') {
          pointX = node.x + node.width; 
          pointY = node.y + node.height/2;
        }
        else if(side === 'left') {
          pointX = node.x; 
          pointY = node.y + node.height/2;
        }
        else if(side === 'bottom') {
          pointX = node.x + node.width/2; 
          pointY = node.y + node.height;
        }
        else {
          pointX = node.x + node.width/2; 
          pointY = node.y;
        }

    } else { // Rect, Parallelogram, RoundedRect
      const ratio = Math.abs(dx / (w / 2));
      const ratioY = Math.abs(dy / (h / 2));

      if (ratio > ratioY) {
        // Intersects left or right edge
        pointX = cx + (dx > 0 ? w / 2 : -w / 2);
        pointY = cy + dy * (w / 2 / Math.abs(dx));
      } else {
        // Intersects top or bottom edge
        pointX = cx + dx * (h / 2 / Math.abs(dy));
        pointY = cy + (dy > 0 ? h / 2 : -h / 2);
      }
    }
    
    // Adjust for parallelogram skew if needed (approximation)
    if (node.type === 'parallelogram') {
         pointX += 10 * ((pointY - node.y) / node.height) // Simple skew adjustment based on vertical position
    }

    return { x: pointX, y: pointY };
  };

  const getPathData = (connection) => {
    const sourceNode = findNodeById(connection.source);
    const targetNode = findNodeById(connection.target);
    if (!sourceNode || !targetNode) return '';

    const start = getNodeConnectionPoint(sourceNode, getNodeCenter(targetNode).x, getNodeCenter(targetNode).y);
    const end = getNodeConnectionPoint(targetNode, getNodeCenter(sourceNode).x, getNodeCenter(sourceNode).y);

    if (connection.pathType === 'elbow') {
      const midX = start.x; // Simple elbow: vertical then horizontal
      const midY = connection.midY || end.y; // Can specify midpoint Y
      return `M ${start.x} ${start.y} L ${start.x} ${midY} L ${end.x} ${midY} L ${end.x} ${end.y}`;
    } else if (connection.pathType === 'curve') {
       // Simple quadratic curve aiming towards target center initially
       const sx = start.x; const sy = start.y;
       const ex = end.x; const ey = end.y;
       const tcx = getNodeCenter(targetNode).x;
       const tcy = getNodeCenter(targetNode).y;
       // Control point influences curve direction - simple midpoint for now
       const ctrlX = (sx + ex) / 2 + (tcy - sy) * 0.2; // Offset control point slightly
       const ctrlY = (sy + ey) / 2 + (tcx - sx) * 0.2;
       return `M ${sx} ${sy} Q ${ctrlX} ${ctrlY}, ${ex} ${ey}`;
    } else {
      // Straight line
      return `M ${start.x} ${start.y} L ${end.x} ${end.y}`;
    }
  };
  
  const getLabelPosition = (connection) => {
      const sourceNode = findNodeById(connection.source);
      const targetNode = findNodeById(connection.target);
      if (!sourceNode || !targetNode || !connection.label) return null;

      const start = getNodeConnectionPoint(sourceNode, getNodeCenter(targetNode).x, getNodeCenter(targetNode).y);
      const end = getNodeConnectionPoint(targetNode, getNodeCenter(sourceNode).x, getNodeCenter(sourceNode).y);
      
      // Position label near the start of the path, slightly offset
      const midX = start.x + (end.x - start.x) * 0.2;
      const midY = start.y + (end.y - start.y) * 0.2;
      const angle = Math.atan2(end.y - start.y, end.x - start.x) * (180 / Math.PI);

      // Offset perpendicular to the line
      const offsetX = 10 * Math.sin(angle * Math.PI / 180);
      const offsetY = -10 * Math.cos(angle * Math.PI / 180);

      return { x: midX + offsetX, y: midY + offsetY, angle: angle > 90 || angle < -90 ? angle + 180 : angle };
  };

  const handleNodeClick = (node, event) => {
      setSelectedNode(node);
      const diagramRect = diagramRef.current.getBoundingClientRect();
      const nodeElement = event.currentTarget; // Get the clicked SVG element
      const nodeRect = nodeElement.getBoundingClientRect();

      // Position panel below the node, centered horizontally
      const panelTop = nodeRect.bottom - diagramRect.top + 20; // Add some space below the node
      const panelLeft = nodeRect.left - diagramRect.left + nodeRect.width / 2;

      setPanelPosition({
          top: panelTop,
          left: panelLeft,
          transform: 'translateX(-50%)', // Center align
      });
  };
  
   const getDiamondPoints = (node) => {
      const x = node.x;
      const y = node.y;
      const w = node.width;
      const h = node.height;
      return `${x + w/2},${y} ${x + w},${y + h/2} ${x + w/2},${y + h} ${x},${y + h/2}`;
  };

  return (
    <div className="diagramContainer" ref={diagramRef}>
      <h2 className="diagramTitle">Data Processing Flowchart</h2>
      <svg className="diagram" width="1400" height="700" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1400 700">
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="8" // Adjusted refX to position arrowhead correctly on path end
            refY="3.5"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <polygon points="0 0, 10 3.5, 0 7" className="arrowHead" />
          </marker>
        </defs>

        {/* Connections */}
        {connections.map((conn) => (
          <g
            key={conn.id}
            onMouseEnter={() => setHoveredPathId(conn.id)}
            onMouseLeave={() => setHoveredPathId(null)}
            className={`${hoveredPathId === conn.id ? 'hoverPath' : ''} ${selectedNode && (selectedNode.id === conn.source || selectedNode.id === conn.target) ? 'activePath' : ''}`}
          >
            <path
              d={getPathData(conn)}
              className="connectionPath"
              markerEnd="url(#arrowhead)"
              strokeDasharray={conn.type === 'dashed' ? '5,5' : 'none'}
            />
            {conn.label && getLabelPosition(conn) && (
               <text
                   x={getLabelPosition(conn).x}
                   y={getLabelPosition(conn).y}
                   fontSize="10"
                   fill="#546e7a"
                   textAnchor="middle"
                   // transform={`rotate(${getLabelPosition(conn).angle}, ${getLabelPosition(conn).x}, ${getLabelPosition(conn).y})`} // Optional rotation
                   dominantBaseline="central"
               >
                   {conn.label}
               </text>
            )}
          </g>
        ))}

        {/* Nodes */}
        {nodes.map((node) => (
          <g
            key={node.id}
            className={`node ${hoveredNodeId === node.id ? 'hoverNode' : ''} ${selectedNode?.id === node.id ? 'activeNode' : ''}`}
            onMouseEnter={() => setHoveredNodeId(node.id)}
            onMouseLeave={() => setHoveredNodeId(null)}
            onClick={(e) => handleNodeClick(node, e)}
            style={{ cursor: 'pointer' }}
          >
            {node.type === 'ellipse' && (
              <ellipse
                cx={node.x + node.width / 2}
                cy={node.y + node.height / 2}
                rx={node.width / 2}
                ry={node.height / 2}
                className="nodeRect"
                style={node.style}
              />
            )}
            {node.type === 'rect' && (
              <rect
                x={node.x}
                y={node.y}
                width={node.width}
                height={node.height}
                rx="3" // Slight rounding for standard rects
                ry="3"
                className="nodeRect"
                style={node.style}
              />
            )}
             {node.type === 'parallelogram' && (
                 <rect
                    x={node.x}
                    y={node.y}
                    width={node.width}
                    height={node.height}
                    className="nodeRect"
                    transform={`skewX(-15)`} // Apply skew
                    style={{ transformBox: 'fill-box', transformOrigin: 'center center', ...node.style }}
                 />
            )}
             {node.type === 'diamond' && (
               <polygon
                 points={getDiamondPoints(node)}
                 className="nodeRect"
                 style={node.style}
               />
             )}
             {node.type === 'circle' && (
               <circle
                 cx={node.x + node.width / 2}
                 cy={node.y + node.height / 2}
                 r={node.width / 2} // Assuming width is diameter
                 className="nodeRect"
                 style={node.style}
               />
             )}
            {node.type === 'roundedRect' && (
               <rect
                 x={node.x}
                 y={node.y}
                 width={node.width}
                 height={node.height}
                 rx="15" // More rounding
                 ry="15"
                 className="nodeRect"
                 style={node.style}
               />
             )}
            <text
              x={node.x + node.width / 2}
              y={node.y + node.height / 2}
              textAnchor="middle"
              dominantBaseline="central" // Vertically center text
              className="nodeTitle" // Adjusted class name for consistency if needed
              style={node.type === 'parallelogram' ? { transform: `skewX(-15)`, transformOrigin: `${node.x + node.width / 2}px ${node.y + node.height / 2}px` } : {}} // Skew text in parallelogram slightly
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>

      {/* Explanation Panel */}
      {selectedNode && (
          <div className="explanationPanel" style={{ position: 'absolute', ...panelPosition }}>
              <h3>{selectedNode.label}</h3>
               {/* <p className="subtitleText">Node Details</p> */}
               <p className="descriptionText">{selectedNode.explanation}</p>
               <div className="detailsText">
                   Type: {selectedNode.type} <br/>
                   {/* Add more details if needed */}
                   Inputs: {connections.filter(c => c.target === selectedNode.id).map(c => findNodeById(c.source)?.label || 'Unknown').join(', ') || 'None'} <br/>
                   Outputs: {connections.filter(c => c.source === selectedNode.id).map(c => findNodeById(c.target)?.label || 'Unknown').join(', ') || 'None'}
               </div>
              <button className="closePanel" onClick={() => setSelectedNode(null)}>Close</button>
          </div>
      )}

      {/* Include the CSS */}
      <style jsx global>{`
        .diagramContainer {
            position: relative; /* Needed for absolute positioning of panel */
            width: 100%;
            /* max-width: 1400px; Increased max-width */
            margin: 0 auto;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            /* padding-bottom: 260px; Adjust if needed based on panel */
            padding-top: 10px; /* Added top padding */
            background-color: #f8f9fa; /* Light grey background */
            border-radius: 12px;
            box-shadow: 0 8px 30px rgba(0,0,0,0.08), 0 0 15px rgba(0, 150, 136, 0.1);
            border: 1px solid rgba(0, 150, 136, 0.1);
            padding: 25px;
            overflow: auto; /* Allow scrolling if content exceeds bounds */
            height: 80vh; /* Limit container height */
        }

        /* Removed ::after pseudo-element for simplicity */

        .diagramTitle {
            font-size: 18px;
            font-weight: 500;
            text-align: left;
            color: #00796b; /* Darker teal */
            margin: 0 0 20px;
            padding-bottom: 15px;
            border-bottom: 1px solid rgba(0, 150, 136, 0.15);
        }

        .diagram {
           width: 100%; /* Ensure SVG takes container width */
           height: auto;
           display: block; /* Prevent extra space below SVG */
           min-width: 1400px; /* Set minimum width based on content */
        }

        /* Node styling */
        .node {
            cursor: pointer;
            transition: filter 0.2s ease-out;
        }

        .nodeRect { /* General shape style */
            fill: white;
            stroke: #009688; /* Standard teal */
            stroke-width: 1.5;
            filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.1));
            transition: fill 0.2s ease, stroke-width 0.2s ease, filter 0.2s ease, stroke 0.2s ease;
        }

        .hoverNode .nodeRect {
            fill: #e0f2f1; /* Lighter teal fill on hover */
            stroke: #00796b; /* Darker teal stroke */
            stroke-width: 2;
            filter: drop-shadow(3px 3px 5px rgba(0,0,0,0.15)) brightness(1.03);
        }

        .activeNode .nodeRect {
            fill: #b2dfdb; /* Medium teal fill */
            stroke: #00695c; /* Even darker teal stroke */
            stroke-width: 2.5;
            filter: drop-shadow(3px 3px 5px rgba(0,0,0,0.2)) brightness(1.05);
        }

        .nodeTitle {
            font-size: 12px;
            fill: #37474f; /* Dark blue-grey text */
            pointer-events: none;
            font-weight: 500;
            dominant-baseline: middle;
            -webkit-user-select: none; /* Disable text selection */
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }

        /* Connection styling */
        .connectionPath {
            fill: none;
            stroke: #78909c; /* Blue-grey connector */
            stroke-width: 1.5;
            transition: stroke 0.2s ease, stroke-width 0.2s ease;
        }

        .arrowHead {
            fill: #78909c;
            transition: fill 0.2s ease;
        }

        .hoverPath .connectionPath {
            stroke: #26a69a; /* Lighter active teal */
            stroke-width: 2;
        }
        .hoverPath .arrowHead {
            fill: #26a69a;
        }

        .activePath .connectionPath {
            stroke: #009688; /* Standard teal */
            stroke-width: 2.5;
        }
        .activePath .arrowHead {
            fill: #009688;
        }


        /* Explanation panel styling */
        .explanationPanel {
          background-color: white;
          border-radius: 10px; /* Slightly smaller radius */
          box-shadow: 0 10px 30px rgba(0,0,0,0.15), 0 0 10px rgba(0,0,0,0.05);
          padding: 15px 20px 20px; /* Adjusted padding */
          z-index: 1000;
          animation: fadeIn 0.3s ease-out;
          border: 1px solid rgba(0, 150, 136, 0.15);
          border-top: 4px solid #009688;
          width: 300px; /* Fixed width */
          max-width: 90%;
          /* Position is set dynamically via style prop */
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px) translateX(-50%); }
          to { opacity: 1; transform: translateY(0) translateX(-50%); }
        }

        .explanationPanel h3 {
          margin-top: 0;
          margin-bottom: 8px; /* More space below title */
          color: #00796b; /* Darker teal */
          font-size: 14px; /* Larger title */
          font-weight: 600;
          text-align: center;
          padding-bottom: 8px;
          border-bottom: 1px solid rgba(0, 150, 136, 0.15);
        }

        /* Subtitle removed for simplicity */

        .descriptionText {
          margin-bottom: 12px; /* More space */
          font-size: 12px;
          line-height: 1.5; /* Improved readability */
          color: #455a64; /* Slightly darker grey */
          text-align: left;
        }

        .detailsText {
          font-size: 11px; /* Smaller font for details */
          line-height: 1.5;
          color: #546e7a;
          background-color: #f5f7fa; /* Light background */
          padding: 10px 12px;
          border-radius: 6px;
          margin-bottom: 15px; /* More space */
          border-left: 3px solid rgba(0, 150, 136, 0.2);
        }

        /* Connection info removed for simplicity, integrated into detailsText */

        .closePanel {
          display: block;
          margin: 0 auto; /* Center button */
          padding: 6px 14px; /* Slightly larger button */
          background-color: #009688;
          color: white;
          border: none; /* Removed border */
          border-radius: 6px;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: center;
          font-weight: 500;
          width: 80px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }

        .closePanel:hover {
          background-color: #00796b; /* Darker hover */
          box-shadow: 0 4px 8px rgba(0,0,0,0.15);
          transform: translateY(-1px); /* Slight lift effect */
        }


        /* Minimal Responsive styles */
        @media (max-width: 768px) {
           .diagramContainer {
                padding: 15px;
                height: 75vh; /* Adjust height on smaller screens */
            }
             .diagramTitle {
                font-size: 16px;
             }
            .explanationPanel {
                width: 90%;
                left: 50% !important; /* Force center */
                transform: translateX(-50%) !important; /* Force center */
                /* Dynamic top positioning is retained */
            }
            .nodeTitle {
              font-size: 10px;
            }
        }

      `}</style>
    </div>
  );
};

export default FlowchartDiagram;