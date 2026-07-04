'use client';

import BackendLinkedTool from './BackendLinkedTool';
import { toolConfigs } from './toolConfigs';

export default function ToolShell({ toolKey }) {
  const config = toolConfigs[toolKey];

  if (!config) {
    return null;
  }

  return <BackendLinkedTool config={config} />;
}
