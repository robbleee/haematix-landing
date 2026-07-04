import ToolShell from '../../../components/tools/ToolShell';

export const metadata = {
  title: 'MDS / AML Boundary Checker',
  description: 'Backend-linked WHO 2022 and ICC 2022 MDS/AML boundary checker.',
  alternates: {
    canonical: '/tools/mds-aml-boundary-checker',
  },
};

export default function MdsAmlBoundaryCheckerPage() {
  return <ToolShell toolKey="mdsAmlBoundary" />;
}
