import TreatmentExplorer from '../../components/treatment-explorer/TreatmentExplorer';

export const metadata = {
  title: 'AML Treatment Path Explorer',
  description: 'Explore the deterministic Coats–Delphi AML treatment consensus pathway with a transparent, step-by-step decision tree.',
};

export default function TreatmentExplorerPage() {
  return <TreatmentExplorer />;
}
