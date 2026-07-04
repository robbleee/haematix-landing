import ToolShell from '../../../components/tools/ToolShell';

export const metadata = {
  title: 'TP53 Multi-Hit Checker',
  description: 'Backend-linked TP53 multi-hit checker for WHO 2022, ICC 2022, and ELN 2022 outputs.',
  alternates: {
    canonical: '/tools/tp53-multi-hit-checker',
  },
};

export default function Tp53MultiHitCheckerPage() {
  return <ToolShell toolKey="tp53Checker" />;
}
