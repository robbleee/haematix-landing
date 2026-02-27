'use client';

import { useEffect, useMemo, useState } from 'react';
import s from './explorer.module.css';

const PAGE_SIZE = 40;

/* ── Helpers ── */

function deriveStatus(row) {
  if (!row.python_matches_expected) return 'python_fail';
  if (!row.imandra_matches_python) return 'imandra_fail';
  return 'all_pass';
}

function prettifyLabel(label) {
  return label || '\u2014';
}

function pageNumbers(current, total) {
  const pages = [];
  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i);
    return pages;
  }
  pages.push(1);
  if (current > 3) pages.push('...');
  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) pages.push(i);
  if (current < total - 2) pages.push('...');
  pages.push(total);
  return pages;
}

/* Pretty section titles */
const SECTION_LABELS = {
  aml_defining: 'AML-defining genetic abnormalities',
  tp53: 'TP53 mutation status',
  mds_mutations: 'MDS-related mutations',
  mds_cytogenetics: 'MDS-related cytogenetics',
  qualifiers: 'Clinical qualifiers',
  erythroid: 'Erythroid lineage',
};

/* Pretty field names: snake_case -> Title Case */
function humanise(key) {
  return key
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace(/Tp53/g, 'TP53')
    .replace(/Aml/g, 'AML')
    .replace(/Mds/g, 'MDS')
    .replace(/Vaf/g, 'VAF')
    .replace(/Loh/g, 'LOH')
    .replace(/Vus/g, 'VUS');
}

/* ── Input field value renderer ── */
function InputValue({ value }) {
  if (value === 'BTrue') return <span className={s.valTrue}>True</span>;
  if (value === 'BFalse') return <span className={s.valFalse}>False</span>;
  if (value === 'BUnknown') return <span className={s.valUnknown}>Unknown</span>;
  if (value === true) return <span className={s.valTrue}>Yes</span>;
  if (value === false) return <span className={s.valFalse}>No</span>;
  if (value === null || value === undefined || value === '')
    return <span className={s.valUnknown}>{'\u2014'}</span>;
  if (typeof value === 'number')
    return <span className={s.valNumeric}>{value}</span>;
  return <span>{String(value)}</span>;
}

/* ── Input section (group of fields) ── */
function InputSection({ title, fields }) {
  if (!fields || typeof fields !== 'object') return null;

  /* Filter out BUnknown-only sections for compactness —
     but keep them if at least one non-unknown value exists */
  const entries = Object.entries(fields);
  const hasSignal = entries.some(([, v]) => v !== 'BUnknown' && v !== null && v !== undefined && v !== '');

  return (
    <div className={s.inputSection}>
      <div className={s.inputSectionTitle}>{title}</div>
      <div className={s.inputFieldList}>
        {hasSignal
          ? entries.map(([k, v]) => (
              <div className={s.inputField} key={k}>
                <span className={s.inputFieldName}>{humanise(k)}</span>
                <span className={s.inputFieldValue}>
                  <InputValue value={v} />
                </span>
              </div>
            ))
          : <span className={s.valUnknown} style={{ fontSize: '0.75rem' }}>All unknown</span>}
      </div>
    </div>
  );
}

/* ── Input panel ── */
function InputPanel({ input }) {
  if (!input) return <div className={s.noInput}>Input vector not available for this case.</div>;

  /* Separate scalar fields from sub-objects */
  const scalars = {};
  const sections = {};
  for (const [k, v] of Object.entries(input)) {
    if (v !== null && typeof v === 'object' && !Array.isArray(v)) {
      sections[k] = v;
    } else {
      scalars[k] = v;
    }
  }

  return (
    <div className={s.inputPanel}>
      <div className={s.inputPanelHeader}>Test input vector</div>
      <div className={s.inputSections}>
        {/* Scalar fields first (blasts %, differentiation, etc.) */}
        {Object.keys(scalars).length > 0 && (
          <div className={s.inputSection}>
            <div className={s.inputSectionTitle}>Core parameters</div>
            <div className={s.inputFieldList}>
              {Object.entries(scalars).map(([k, v]) => (
                <div className={s.inputField} key={k}>
                  <span className={s.inputFieldName}>{humanise(k)}</span>
                  <span className={s.inputFieldValue}>
                    <InputValue value={v} />
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Sub-object sections */}
        {Object.entries(sections).map(([k, v]) => (
          <InputSection key={k} title={SECTION_LABELS[k] || humanise(k)} fields={v} />
        ))}
      </div>
    </div>
  );
}

/* ── Status badge ── */
function StatusBadge({ pass, label }) {
  return (
    <span className={`${s.badge} ${pass ? s.badgePass : s.badgeFail}`}>
      {pass ? '\u2713' : '\u2717'} {label}
    </span>
  );
}

/* ── Case card ── */
function CaseCard({ row, isOpen, onToggle }) {
  const pyOk = row.python_matches_expected;
  const imlOk = row.imandra_matches_python;

  return (
    <div className={`${s.card} ${isOpen ? s.cardOpen : ''}`}>
      <div className={s.cardHeader} onClick={onToggle} role="button" tabIndex={0}>
        <span className={s.cardId}>{row.test_id}</span>
        <div className={s.cardMeta}>
          <span className={`${s.badge} ${s.badgeClassifier}`}>{row.classifier}</span>
          <span className={`${s.badge} ${s.badgeCategory}`}>{row.vector_category}</span>
          <span className={`${s.badge} ${s.badgeSource}`}>{row.vector_source}</span>
        </div>
        <div className={s.statusBadges}>
          <StatusBadge pass={pyOk} label="Py" />
          <StatusBadge pass={imlOk} label="IML" />
        </div>
      </div>

      {isOpen && (
        <div className={s.cardDetail}>
          {/* Output comparison */}
          <div className={s.outputRow}>
            <div className={s.detailColumn}>
              <div className={s.detailColumnLabel}>Expected</div>
              <div className={s.detailColumnValue}>{prettifyLabel(row.expected_result?.label)}</div>
              {row.expected_result?.definitive_label && (
                <div className={s.detailColumnDefinitive}>
                  Definitive: {row.expected_result.definitive_label}
                </div>
              )}
            </div>
            <div className={s.detailColumn}>
              <div className={s.detailColumnLabel}>Python classifier</div>
              <div className={s.detailColumnValue}>{prettifyLabel(row.python_result?.label)}</div>
              {row.python_result?.definitive_label && (
                <div className={s.detailColumnDefinitive}>
                  Definitive: {row.python_result.definitive_label}
                </div>
              )}
            </div>
            <div className={s.detailColumn}>
              <div className={s.detailColumnLabel}>Imandra (IML twin)</div>
              <div className={s.detailColumnValue}>{prettifyLabel(row.imandra_result?.label)}</div>
              {row.imandra_result?.definitive_label && (
                <div className={s.detailColumnDefinitive}>
                  Definitive: {row.imandra_result.definitive_label}
                </div>
              )}
            </div>
          </div>

          {/* Full input vector */}
          <InputPanel input={row.vector_input} />
        </div>
      )}
    </div>
  );
}

/* ── Main explorer ── */
export default function CasesExplorer() {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [classifier, setClassifier] = useState('all');
  const [category, setCategory] = useState('all');
  const [source, setSource] = useState('all');
  const [status, setStatus] = useState('all');
  const [page, setPage] = useState(1);
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError('');
      try {
        const res = await fetch('/articles/imandra-classifier-migration-validation-results-parity-exhaustive-property-regression-matrix/test-results', {
          cache: 'no-store',
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const payload = await res.json();
        if (!cancelled) setRows(payload.all_results || []);
      } catch (err) {
        if (!cancelled) setError(String(err));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  /* Derived filter options */
  const classifiers = useMemo(
    () => ['all', ...Array.from(new Set(rows.map((r) => r.classifier).filter(Boolean))).sort()],
    [rows]
  );
  const categories = useMemo(
    () => ['all', ...Array.from(new Set(rows.map((r) => r.vector_category).filter(Boolean))).sort()],
    [rows]
  );
  const sources = useMemo(
    () => ['all', ...Array.from(new Set(rows.map((r) => r.vector_source).filter(Boolean))).sort()],
    [rows]
  );

  /* Summary counts */
  const counts = useMemo(() => {
    let pass = 0, pyFail = 0, imlFail = 0;
    rows.forEach((r) => {
      const st = deriveStatus(r);
      if (st === 'all_pass') pass++;
      else if (st === 'python_fail') pyFail++;
      else imlFail++;
    });
    return { total: rows.length, pass, pyFail, imlFail };
  }, [rows]);

  /* Filtering */
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((row) => {
      if (classifier !== 'all' && row.classifier !== classifier) return false;
      if (category !== 'all' && row.vector_category !== category) return false;
      if (source !== 'all' && row.vector_source !== source) return false;
      if (status !== 'all' && deriveStatus(row) !== status) return false;
      if (!q) return true;
      const hay = [
        row.test_id, row.classifier, row.vector_category, row.vector_source,
        row.python_result?.label, row.expected_result?.label, row.imandra_result?.label,
      ].filter(Boolean).join(' ').toLowerCase();
      return hay.includes(q);
    });
  }, [rows, query, classifier, category, source, status]);

  /* Pagination */
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageRows = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, safePage]);

  /* Reset on filter change */
  useEffect(() => {
    setPage(1);
    setOpenId(null);
  }, [query, classifier, category, source, status]);

  /* ── Render ── */
  if (loading) return <div className={s.loadingState}><p>Loading case-level results&hellip;</p></div>;
  if (error) return <div className={s.errorState}><p>Unable to load test results: {error}</p></div>;

  return (
    <div className={s.explorer}>
      {/* Summary chips */}
      <div className={s.summaryBar}>
        <span className={s.summaryChip}>
          <span className={s.summaryChipCount}>{counts.total}</span> total cases
        </span>
        <span className={s.summaryChip}>
          <span className={s.summaryChipCount} style={{ color: '#15803d' }}>{counts.pass}</span>{' '}
          all pass
        </span>
        {counts.pyFail > 0 && (
          <span className={s.summaryChip}>
            <span className={s.summaryChipCount} style={{ color: '#b91c1c' }}>{counts.pyFail}</span>{' '}
            Python mismatch
          </span>
        )}
        {counts.imlFail > 0 && (
          <span className={s.summaryChip}>
            <span className={s.summaryChipCount} style={{ color: '#b91c1c' }}>{counts.imlFail}</span>{' '}
            IML mismatch
          </span>
        )}
      </div>

      {/* Controls */}
      <div className={s.controls}>
        <div className={s.searchRow}>
          <svg className={s.searchIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          <input
            className={s.searchInput}
            type="text"
            placeholder="Search test id, label, genetics..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className={s.filterChips}>
          <select className={s.chipSelect} value={classifier} onChange={(e) => setClassifier(e.target.value)}>
            {classifiers.map((v) => (
              <option key={v} value={v}>{v === 'all' ? 'All classifiers' : v}</option>
            ))}
          </select>
          <select className={s.chipSelect} value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map((v) => (
              <option key={v} value={v}>{v === 'all' ? 'All categories' : v}</option>
            ))}
          </select>
          <select className={s.chipSelect} value={source} onChange={(e) => setSource(e.target.value)}>
            {sources.map((v) => (
              <option key={v} value={v}>{v === 'all' ? 'All sources' : v}</option>
            ))}
          </select>
          <select className={s.chipSelect} value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="all">All statuses</option>
            <option value="all_pass">All pass</option>
            <option value="python_fail">Python mismatch</option>
            <option value="imandra_fail">IML mismatch</option>
          </select>
        </div>
      </div>

      {/* Results count */}
      <p className={s.resultsInfo}>
        Showing{' '}
        <span className={s.resultsInfoBold}>
          {(safePage - 1) * PAGE_SIZE + 1}&ndash;{Math.min(safePage * PAGE_SIZE, filtered.length)}
        </span>{' '}
        of <span className={s.resultsInfoBold}>{filtered.length}</span> cases
        {filtered.length !== rows.length && <> (filtered from {rows.length})</>}
        {' \u2014 click a row to expand inputs'}
      </p>

      {/* Card list */}
      <div className={s.cardList}>
        {pageRows.map((row, idx) => {
          const key = `${row.test_id}-${row.classifier}-${idx}`;
          return (
            <CaseCard
              key={key}
              row={row}
              isOpen={openId === key}
              onToggle={() => setOpenId(openId === key ? null : key)}
            />
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className={s.pagination}>
          <button className={s.pageBtn} onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={safePage <= 1}>
            &larr; Prev
          </button>
          {pageNumbers(safePage, totalPages).map((n, i) =>
            n === '...' ? (
              <span key={`e${i}`} className={s.pageEllipsis}>&hellip;</span>
            ) : (
              <button
                key={n}
                className={`${s.pageBtn} ${n === safePage ? s.pageBtnActive : ''}`}
                onClick={() => setPage(n)}
              >
                {n}
              </button>
            )
          )}
          <button className={s.pageBtn} onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={safePage >= totalPages}>
            Next &rarr;
          </button>
        </div>
      )}
    </div>
  );
}
