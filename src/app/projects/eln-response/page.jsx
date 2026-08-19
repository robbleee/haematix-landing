import ProjectPage from '../../../components/projects/ProjectPage';

export const metadata = {
  title: 'AML Treatment Response Project',
  description: 'An auditable ELN 2017 and 2022 AML treatment response calculator developed for internal clinical evaluation with The Christie.',
};

const project = {
  eyebrow: 'The Christie · AML treatment response',
  title: 'Making treatment response criteria easier to apply and review.',
  summary: 'An internal clinical coordination aid for applying ELN 2017 or 2022 AML response criteria with explicit, auditable reasoning.',
  facts: [
    { label: 'Stage', value: 'Internal evaluation and handoff' },
    { label: 'Guidelines', value: 'ELN 2017 and ELN 2022' },
    { label: 'Output', value: 'On-screen review and PDF report' },
  ],
  problemTitle: 'Response assessment contains simple thresholds—but the surrounding evidence is rarely simple.',
  problem: [
    'Marrow findings, circulating blasts, extramedullary disease, count recovery and assessment timing all contribute to the final category. Missing or ambiguous values should not quietly become negative findings.',
    'The tool is being developed to make those inputs, thresholds and unresolved items visible to the clinical team, while keeping the final interpretation with the responsible clinician and protocol.',
  ],
  workflowTitle: 'One calculation, with the full working left visible.',
  steps: [
    { title: 'Record the assessment', text: 'Choose the ELN version and enter marrow, disease and response-assessment findings. Required, conditional and contextual fields remain distinct.' },
    { title: 'Bring in blood counts', text: 'Enter counts manually, paste copied laboratory text, or upload CSV data. The selected assessment window and source dates remain visible.' },
    { title: 'Apply deterministic criteria', text: 'The engine evaluates CR, CRh, CRi, MLFS, PR and incomplete or non-evaluable states against the configured guideline version.' },
    { title: 'Review and export', text: 'The result includes the values used, threshold checks, missing-data warnings and compact summaries of other categories considered.' },
  ],
  provides: [
    'Explicit pass, fail and missing status for each relevant threshold',
    'Visible blood-count window and selected source dates',
    'A PDF generated from the same calculation payload',
    'An implementation mapping back to cited ELN guideline tables',
  ],
  boundaries: [
    'Internal trial-coordination aid; not a medical device',
    'Results require clinical and protocol review',
    'Borderline or regenerating cases still require interpretation',
    'Clinical-logic changes require governed review and updated tests',
  ],
  next: { href: '/projects/haemos', label: 'haemOS' },
};

export default function ElnResponseProjectPage() {
  return <ProjectPage project={project} />;
}
