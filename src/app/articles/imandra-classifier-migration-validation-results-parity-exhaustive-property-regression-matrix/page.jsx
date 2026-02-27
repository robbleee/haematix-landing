import Link from 'next/link';
import styles from '../safe-diagnostic-algorithms-imandra-verification-formal-methods-guardrail-architecture/article.module.css';
import CasesExplorer from './CasesExplorer';

export const metadata = {
  title: 'Imandra Validation Results | Haem.io',
  description:
    'Executed test results from the Haem.io Python-to-IML migration validation: parity, exhaustive, property, regressions, and matrix comparison outputs.',
};

export default function ImandraValidationResultsPage() {
  return (
    <div className={styles.articleContainer}>
      <Link href="/articles/safe-diagnostic-algorithms-imandra-verification-formal-methods-guardrail-architecture" className={styles.backButton}>
        {'<-'} Back to Imandra Article
      </Link>

      <div className={styles.articleContent}>
        <article className={styles.articleCard}>
          <header className={styles.header}>
            <h1 className={styles.title}>Imandra Classifier Migration Validation Results</h1>
            <p className={styles.subtitle}>
              Full executed test output from the parity testing that validated the Python-to-IML migration,
              plus guardrail validation suites discussed in the main article.
            </p>
          </header>

          <div className={styles.body}>
            <h2 id="run-context">Run context</h2>
            <ul>
              <li>Repository: <code>haem.io-Imandra</code></li>
              <li>Date: February 10, 2026</li>
              <li>Snapshot timestamp: 2026-02-10T14:41:42Z</li>
              <li>Bridge binary: present and rebuilt before parity execution</li>
              <li>Vector set: 472 test vectors (1888 classifier comparisons in matrix run)</li>
            </ul>

            <h2>Suite-by-suite results</h2>

            <h3>1) Formal verification goals</h3>
            <p>
              Status: <strong>not executed in this environment</strong> due to missing Imandra REPL binary in
              path.
            </p>
            <pre className={styles.codeBlock}>
{`=== Running Imandra verification goals ===
/bin/sh: imandra-repl: command not found
VERIFY_EXIT:2`}
            </pre>

            <h3>2) Deterministic + seeded vector generation</h3>
            <p>Status: <strong>pass</strong>.</p>
            <pre className={styles.codeBlock}>
{`Random seed: 1337
Random cases: 250
Total test cases: 472
VECTORS_EXIT:0`}
            </pre>

            <h3>3) Local bridge build</h3>
            <p>Status: <strong>pass</strong>.</p>
            <pre className={styles.codeBlock}>
{`Bridge binary created at parallel_tests/imandra_bridge
BRIDGE_EXIT:0`}
            </pre>

            <h3 id="regression-fixtures">4) Regression fixtures</h3>
            <p>Status: <strong>pass</strong>.</p>
            <pre className={styles.codeBlock}>
{`python -m pytest -q tests/test_00_regressions.py
2 passed in 0.56s
REGRESSIONS_EXIT:0`}
            </pre>

            <h3 id="parity-suite">5) Parity (Python vs Imandra)</h3>
            <p>Status: <strong>pass</strong>.</p>
            <pre className={styles.codeBlock}>
{`python -m pytest -q tests/test_00_regressions.py tests/test_parity.py
4 passed in 0.99s
PARITY_EXIT:0`}
            </pre>

            <h3 id="exhaustive-suite">6) Bounded exhaustive parity</h3>
            <p>Status: <strong>pass</strong>.</p>
            <pre className={styles.codeBlock}>
{`python -m pytest -q tests/test_exhaustive_parity.py
1 passed in 2.86s
EXHAUSTIVE_EXIT:0`}
            </pre>

            <h3 id="property-suite">7) Property-based parity</h3>
            <p>Status: <strong>pass</strong>.</p>
            <pre className={styles.codeBlock}>
{`python -m pytest -q tests/test_property_parity.py
1 passed in 2.97s
PROPERTY_EXIT:0`}
            </pre>

            <h3 id="tp53-suite">8) TP53/Erythroid parity scenarios</h3>
            <p>Status: <strong>pass</strong>.</p>
            <pre className={styles.codeBlock}>
{`python -m pytest -q tests/test_tp53_erythroid_parity.py
2 passed in 0.27s
TP53_PARITY_EXIT:0`}
            </pre>

            <h3 id="matrix-summary">9) Full matrix runner summary</h3>
            <p>Status: <strong>pass</strong>.</p>
            <pre className={styles.codeBlock}>
{`Loaded 472 test vectors
Total comparisons: 1888

Python vs Expected:
  Matches: 1888
  Failures: 0

Imandra vs Python:
  Matches: 1888
  Failures: 0
  Skipped: 0`}
            </pre>

            <h3 id="impossibility-publication">10) Impossibility challenge-set publication status</h3>
            <p>
              Status: <strong>published as a case-set snapshot</strong>. This one-time page publishes the
              contradiction-case category and expected guardrail behavior referenced in the main article.
            </p>
            <pre className={styles.codeBlock}>
{`Published challenge-set scope:
- TP53 contradiction case family
- Age inconsistency contradiction case family
- Numeric out-of-range contradiction case family
- CEBPA contradiction case family

Expected behavior:
- Cases emit impossibility warnings for contradictory internal states
- Cases are used for guardrail hardening and review workflows`}
            </pre>

            <h2 id="result-interpretation">Result interpretation</h2>
            <ul>
              <li>Parity suites show full agreement between the Python classifier and the IML implementation
                across the tested vector set — this is the evidence that justified retiring the Python
                classifier.</li>
              <li>Regression fixtures and specialized TP53 suites passed in this run.</li>
              <li>
                Formal verification goals require installing <code>imandra-repl</code> on this machine before they
                can be reported as pass/fail.
              </li>
              <li>
                Impossibility challenge-set publication is included here as snapshot evidence of the contradiction
                test categories discussed in the article.
              </li>
            </ul>

            <p>
              This page is the canonical public snapshot for the migration validation results referenced in the
              main Imandra article. The IML implementation is now the sole production classifier.
            </p>

            <h2 id="exact-test-data">Exact test inputs and outputs</h2>
            <p>
              Use the explorer below to inspect every case in this snapshot. You can search by genetics/test id
              text and filter by classifier, category, source, and status.
            </p>
            <CasesExplorer />
          </div>
        </article>
      </div>
    </div>
  );
}
