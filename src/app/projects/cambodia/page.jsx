import ProjectPage from '../../../components/projects/ProjectPage';

export const metadata = {
  title: 'Cambodia AML Data Project',
  description: 'Deterministic, source-linked extraction and cohort exploration for Cambodian AML proformas.',
};

const project = {
  eyebrow: 'Cambodia · AML data',
  title: 'Turning clinical proformas into a reviewable AML register.',
  summary: 'A focused application for deterministic extraction, evidence review and governed cohort exploration of Cambodian AML proformas.',
  facts: [
    { label: 'Stage', value: 'Prototype' },
    { label: 'Documents', value: 'Tumor Board and CanReg PDFs' },
    { label: 'Core method', value: 'Deterministic and source-linked' },
  ],
  problemTitle: 'Useful clinical data is often present, but trapped inside documents and inconsistent workflows.',
  problem: [
    'The Cambodia application is designed around the forms already used by the clinical team. It extracts a governed set of AML fields from digitally generated PDFs and keeps each value connected to its source evidence for review.',
    'Approved records then form a shared register that can be searched and explored through typed, allow-listed cohort queries without giving free-form text direct access to the database.',
  ],
  workflowTitle: 'Documents become data without becoming a black box.',
  steps: [
    { title: 'Import the existing proformas', text: 'Users can upload supported PDFs individually or stage larger PDF and ZIP imports. Unsupported or ambiguous documents fail closed for review.' },
    { title: 'Review source-linked extraction', text: 'Each governed value is shown with its source evidence. Corrections preserve the original extracted value and are recorded in the audit trail.' },
    { title: 'Approve the shared record', text: 'Reviewed cases enter a role-controlled clinical workspace with retained source documents, activity logging and recoverable deletion.' },
    { title: 'Explore the cohort', text: 'A visual builder and compact typed language compile through the same allow-listed field catalogue to parameterised queries.' },
  ],
  provides: [
    'Deterministic extraction from supported digital PDFs',
    'Evidence-linked review and correction history',
    'Bulk-import controls and explicit conflict handling',
    'Governed cohort queries with reusable templates',
  ],
  boundaries: [
    'Synthetic documents and records are used in development',
    'Unsupported scans fail closed rather than being guessed',
    'The optional language assistant never receives patient records and cannot execute queries',
    'Go-live requires local governance, security, storage and recovery controls',
  ],
  next: { href: '/projects/eln-response', label: 'AML treatment response' },
};

export default function CambodiaProjectPage() {
  return <ProjectPage project={project} />;
}
