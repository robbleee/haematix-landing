import ProjectPage from '../../../components/projects/ProjectPage';

export const metadata = {
  title: 'haemOS Workflow Project',
  description: 'A sandbox proof of concept for a connected haematology-oncology referral, result, classification and sign-off workflow.',
};

const project = {
  eyebrow: 'haemOS · Beyond HODS',
  title: 'A connected workspace for the whole diagnostic pathway.',
  summary: 'haemOS is a proof of concept exploring what a modern successor to fragmented HODS-era workflows could look like.',
  facts: [
    { label: 'Stage', value: 'Sandbox proof of concept' },
    { label: 'Entry paths', value: 'Epic SMART sandbox and external portal' },
    { label: 'Environment', value: 'Synthetic data only' },
  ],
  problemTitle: 'The opportunity is larger than replacing a form or recreating an inbox.',
  problem: [
    'A diagnostic workflow crosses organisations, laboratory systems, referrals, source results, specialist interpretation and final reporting. Re-entering the same information at each boundary creates delay and makes provenance harder to follow.',
    'haemOS explores a single case workspace in which the referral, validated source results, classification support, report generation and sign-off can remain connected without asking laboratory staff to duplicate their work.',
  ],
  workflowTitle: 'A case moves forward without losing its source context.',
  steps: [
    { title: 'Create or receive a referral', text: 'A case can begin in an Epic SMART on FHIR sandbox flow or through an external clinician portal with NHS PDS sandbox lookup.' },
    { title: 'Receive validated results', text: 'Reporting clinicians review results in Epic. Validated component results are then received idempotently by haemOS; browser users cannot alter those source results.' },
    { title: 'Review the case workspace', text: 'The workspace aggregates available components and provides access to classification support while preserving the distinction between source data and derived outputs.' },
    { title: 'Generate and sign off', text: 'The proof of concept includes diagnostic-request PDF generation, report creation and a final sign-off workflow.' },
  ],
  provides: [
    'Two sandbox entry paths for different referral contexts',
    'A unified case view from referral to sign-off',
    'Explicit provenance for results received from the reporting system',
    'Draft and published local pathway configuration',
  ],
  boundaries: [
    'Proof of concept for sandbox evaluation only',
    'No live MFT Digital integration is claimed',
    'Not a medical device and not for live clinical decision-making',
    'Organisational onboarding, assurance and production credentials remain external gates',
  ],
  next: { href: '/projects/cambodia', label: 'Cambodia AML workspace' },
};

export default function HaemosProjectPage() {
  return <ProjectPage project={project} />;
}
