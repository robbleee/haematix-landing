'use client';

import MarkdownRenderer from '../../components/MarkdownRenderer';
import ExpansionSidebar from './ExpansionSidebar';
import { FunnelExpansion, TimeTaxChart } from './ExpansionVisuals';

export default function ExpansionThesisContent() {
  return (
    <div style={{ 
      maxWidth: '1600px', 
      margin: '0 auto', 
      padding: '2rem',
      display: 'flex',
      gap: '3rem',
      position: 'relative'
    }}>
      {/* Left Sidebar Column */}
      <div style={{ 
        width: '300px', 
        flexShrink: 0,
        display: 'none', // Hidden on mobile by default, controlled by media query below
      }} className="desktop-sidebar">
        <div style={{ position: 'sticky', top: '100px' }}>
          <ExpansionSidebar />
        </div>
      </div>

      {/* Main Content Column */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Visual Abstract */}
        <FunnelExpansion />
        
        <MarkdownRenderer 
          documentPath="clinical/Form Ventures Rejection and Oncology Research.md"
          title="The Expansion Thesis"
          customComponents={{
            div: ({node, className, children, ...props}) => {
              if (className === 'time-tax-chart-container') {
                return <TimeTaxChart />;
              }
              return <div className={className} {...props}>{children}</div>;
            }
          }}
        />
      </div>

      <style jsx>{`
        @media (min-width: 1024px) {
          .desktop-sidebar {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
}
