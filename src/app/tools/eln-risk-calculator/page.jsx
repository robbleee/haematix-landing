import ToolShell from '../../../components/tools/ToolShell';

export const metadata = {
  title: 'ELN 2022 AML Risk Calculator',
  description: 'Educational local ELN 2022 AML risk calculator with visible illustrative reasoning.',
  alternates: {
    canonical: '/tools/eln-risk-calculator',
  },
};

export default function ElnRiskCalculatorPage() {
  return <ToolShell toolKey="elnRisk" />;
}
