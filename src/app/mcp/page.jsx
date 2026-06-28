import Link from 'next/link';
import styles from './mcp.module.css';

const MCP_ENDPOINT = 'https://mcp.haem.io/mcp';

const tools = [
  {
    name: 'parse_haematology_report',
    scope: 'diagnostic:parse',
    summary: 'Extract structured marrow, flow, genetics, and warning fields from free-text reports.',
  },
  {
    name: 'classify_myeloid_case',
    scope: 'diagnostic:classify',
    summary: 'Run the audited myeloid orchestrator for AML, MDS, CML, and CMML decision support.',
  },
  {
    name: 'calculate_risk',
    scope: 'diagnostic:risk',
    summary: 'Calculate supported ELN and IPSS risk outputs from structured case data.',
  },
  {
    name: 'evaluate_guardrails',
    scope: 'diagnostic:guardrails',
    summary: 'Return deterministic safety checks, missing-data gates, and Imandra diagnostics.',
  },
  {
    name: 'get_diagnostic_capabilities',
    scope: 'diagnostic:*',
    summary: 'Show supported disease areas, schemes, required fields, and non-covered areas.',
  },
];

const setupSteps = [
  {
    title: '1. Request access',
    body: 'Create or use an active haem.io account, then request MCP access. We approve MCP separately from normal app login because agentic diagnostic access needs tighter control.',
  },
  {
    title: '2. Sign in with approved OAuth',
    body: `Use ${MCP_ENDPOINT} as the server URL in your MCP-capable client. OAuth tokens must include the MCP audience, diagnostic scopes, and a haem.io MCP entitlement.`,
  },
  {
    title: '3. Keep the agent in decision-support mode',
    body: 'Agents should call capabilities first, parse reports before classification, and stop at clinician-confirmation states instead of inventing missing clinical facts.',
  },
];

const accessRows = [
  {
    label: 'haem.io account',
    value: 'Required for user-facing OAuth access. The account must be active.',
  },
  {
    label: 'MCP entitlement',
    value: 'Required separately from normal app access. Approved users have MCP access enabled on their haem.io profile.',
  },
  {
    label: 'Diagnostic scopes',
    value: 'The OAuth token must include the requested tool scopes, such as diagnostic:parse or diagnostic:classify.',
  },
  {
    label: 'Service tokens',
    value: 'Reserved for approved beta, service, or integration testing workflows and should use the narrowest practical scope.',
  },
];

const clientSetup = [
  {
    title: 'Add the remote MCP server',
    body: `Use ${MCP_ENDPOINT} as the server URL in your MCP-capable client. The transport is hosted HTTP MCP with JSON-RPC tool calls.`,
  },
  {
    title: 'Authorize with haem.io',
    body: 'Complete the haem.io/Auth0 OAuth flow. Access succeeds only for active haem.io users with MCP enabled.',
  },
  {
    title: 'Start with capabilities',
    body: 'Ask the agent to call get_diagnostic_capabilities before parsing or classification so it understands scope and stopping rules.',
  },
];

const coverageRows = [
  ['Supported in v1', 'AML, MDS, CML, and CMML myeloid decision support under WHO 2022 and ICC 2022.'],
  ['Risk support', 'ELN 2022 intensive AML, ELN 2024 non-intensive AML, IPSS-M, and IPSS-R where data are available.'],
  ['Guardrails', 'Flow cytometry gates, confirmation sentinels, missing-data warnings, parser diagnostics, and Imandra parity checks.'],
  ['Not v1 coverage', 'MPN is documented as future work. Lymphoid diagnosis, MPAL final diagnosis, and autonomous final reporting are out of scope.'],
];

export const metadata = {
  title: 'MCP Server',
  description: 'Connect AI agents to the hosted Haem.io MCP server for audited haematology diagnostic decision support.',
  alternates: {
    canonical: '/mcp',
  },
};

export default function McpPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>Hosted MCP server</p>
          <h1>Connect AI agents to Haem.io diagnostic decision support</h1>
          <p className={styles.lede}>
            The Haem.io MCP server gives approved AI clients a narrow, audited tool
            interface for parsing haematology reports, routing myeloid cases, checking
            guardrails, and returning explainable risk support.
          </p>
          <div className={styles.actions}>
            <a
              className={styles.primaryAction}
              href="mailto:robert.lee@haem.io?subject=Haem.io%20MCP%20access"
            >
              Request access
            </a>
            <Link className={styles.secondaryAction} href="/myeloid-orchestrator">
              View classifier logic
            </Link>
          </div>
        </div>

        <div className={styles.connectPanel} aria-label="MCP connection details">
          <div className={styles.panelHeader}>
            <span className={styles.statusDot} aria-hidden="true" />
            <span>Remote MCP endpoint</span>
          </div>
          <code className={styles.endpoint}>{MCP_ENDPOINT}</code>
          <dl className={styles.connectionList}>
            <div>
              <dt>Transport</dt>
              <dd>Hosted HTTP MCP</dd>
            </div>
            <div>
              <dt>Auth</dt>
              <dd>haem.io OAuth entitlement</dd>
            </div>
            <div>
              <dt>Default mode</dt>
              <dd>Deterministic tools, AI review off</dd>
            </div>
          </dl>
          <p className={styles.safetyNote}>
            Clinical decision support only. Final diagnosis requires qualified
            clinician review.
          </p>
        </div>
      </section>

      <section className={styles.band}>
        <div className={styles.sectionHeader}>
          <p className={styles.kicker}>How users connect</p>
          <h2>Designed for MCP-capable clinical AI workflows</h2>
        </div>
        <div className={styles.stepsGrid}>
          {setupSteps.map((step) => (
            <article className={styles.step} key={step.title}>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.accessSection}>
        <div className={styles.sectionHeader}>
          <p className={styles.kicker}>Access model</p>
          <h2>Login is necessary, approval is separate</h2>
          <p>
            A haem.io account proves who the user is. MCP entitlement controls
            whether that user can connect clinical AI agents to the diagnostic tools.
          </p>
        </div>
        <div className={styles.accessGrid}>
          {accessRows.map((row) => (
            <article className={styles.accessItem} key={row.label}>
              <h3>{row.label}</h3>
              <p>{row.value}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.twoColumn}>
        <div>
          <div className={styles.sectionHeader}>
            <p className={styles.kicker}>Tool surface</p>
            <h2>Narrow tools, explicit scopes</h2>
            <p>
              Agents do not receive source code, filesystem access, database mutation,
              or arbitrary function execution. Each call returns an audit run ID where
              a parse or classification workflow is performed.
            </p>
          </div>
          <div className={styles.toolList}>
            {tools.map((tool) => (
              <article className={styles.tool} key={tool.name}>
                <div>
                  <h3>{tool.name}</h3>
                  <p>{tool.summary}</p>
                </div>
                <code>{tool.scope}</code>
              </article>
            ))}
          </div>
        </div>

        <aside className={styles.workflowPanel}>
          <h2>Recommended agent workflow</h2>
          <ol>
            <li>Call <code>get_diagnostic_capabilities</code> before clinical use.</li>
            <li>Call <code>parse_haematology_report</code> for free-text reports.</li>
            <li>Review parser warnings, missing fields, and flow gate status.</li>
            <li>Call <code>classify_myeloid_case</code> only when the case is in scope.</li>
            <li>Use <code>calculate_risk</code> only after disease type and required data are clear.</li>
          </ol>
          <p>
            Confirmation sentinels such as ambiguous CEBPA, MDS, CMML, erythroid, or
            MPAL-like flow findings are returned as stop states for clinician review.
          </p>
        </aside>
      </section>

      <section className={styles.coverageSection}>
        <div className={styles.sectionHeader}>
          <p className={styles.kicker}>Clinical scope</p>
          <h2>Clear boundaries for safer agent use</h2>
        </div>
        <div className={styles.coverageTable}>
          {coverageRows.map(([label, value]) => (
            <div className={styles.coverageRow} key={label}>
              <strong>{label}</strong>
              <span>{value}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.clientSection}>
        <div className={styles.sectionHeader}>
          <p className={styles.kicker}>Client setup</p>
          <h2>Connection details for early adopters</h2>
        </div>
        <div className={styles.clientGrid}>
          {clientSetup.map((step) => (
            <article className={styles.clientBlock} key={step.title}>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          ))}
          <article className={styles.clientBlock}>
            <h3>ChatGPT and custom GPT actions</h3>
            <p>
              Use the remote server URL when MCP connectors are available for your
              workspace. OAuth sign-in is the production access pattern for approved
              haem.io users.
            </p>
            <pre><code>{`Server URL: ${MCP_ENDPOINT}
Auth: haem.io OAuth with MCP access enabled`}</code></pre>
          </article>
          <article className={styles.clientBlock}>
            <h3>Claude and MCP-compatible clients</h3>
            <p>
              Add Haem.io as a remote HTTP MCP server and pass the access token in the
              Authorization header if your client supports bearer-token MCP servers.
            </p>
            <pre><code>{`Authorization: Bearer <haemio_mcp_token>
Content-Type: application/json`}</code></pre>
          </article>
          <article className={styles.clientBlock}>
            <h3>Generic HTTP test</h3>
            <p>
              For technical validation, call the JSON-RPC initialize method, then list
              tools with an approved access token.
            </p>
            <pre><code>{`POST ${MCP_ENDPOINT}
{ "jsonrpc": "2.0", "id": 1, "method": "tools/list" }`}</code></pre>
          </article>
        </div>
      </section>
    </div>
  );
}
