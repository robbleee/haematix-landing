'use client';

import { useEffect, useMemo, useState } from 'react';
import styles from './BackendLinkedTool.module.css';

function setPathValue(target, path, value) {
  const parts = path.split('.');
  let cursor = target;
  for (let i = 0; i < parts.length - 1; i += 1) {
    const key = parts[i];
    if (!cursor[key] || typeof cursor[key] !== 'object') {
      cursor[key] = {};
    }
    cursor = cursor[key];
  }
  cursor[parts[parts.length - 1]] = value;
}

function countSelected(fields) {
  return Object.values(fields).filter(Boolean).length;
}

async function classify(parsedData) {
  const response = await fetch('/api/classifier', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      parsed_data: parsedData,
      tool_mode: 'public_structured_calculator',
    }),
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload?.error || 'Classification failed.');
  }
  return payload;
}

function ResultPanel({ title, value, label, trace }) {
  const safeTrace = Array.isArray(trace) ? trace : [];

  return (
    <section className={styles.resultPanel}>
      <div className={styles.resultTopline}>
        <span>{label}</span>
        <strong>{title}</strong>
      </div>
      <p className={styles.resultValue}>{value}</p>
      {safeTrace.length > 0 && (
        <details className={styles.trace}>
          <summary>Reasoning</summary>
          <ol>
            {safeTrace.map((step, index) => (
              <li key={`${index}-${step}`}>{step}</li>
            ))}
          </ol>
        </details>
      )}
    </section>
  );
}

function FieldGroup({ group, values, onToggle }) {
  return (
    <section className={styles.group}>
      <div>
        <h2>{group.title}</h2>
        {group.note && <p>{group.note}</p>}
      </div>
      <div className={styles.fieldGrid}>
        {group.fields.map((field) => {
          const active = Boolean(values[field.path]);
          return (
            <button
              key={field.path}
              type="button"
              className={`${styles.fieldButton} ${active ? styles.fieldButtonActive : ''}`}
              onClick={() => onToggle(field.path)}
            >
              <span>{field.label}</span>
              {field.helper && <small>{field.helper}</small>}
            </button>
          );
        })}
      </div>
    </section>
  );
}

function buildInitialFieldState(groups) {
  const state = {};
  groups.forEach((group) => {
    group.fields.forEach((field) => {
      state[field.path] = Boolean(field.default);
    });
  });
  return state;
}

export default function BackendLinkedTool({ config }) {
  const [blasts, setBlasts] = useState(config.defaultBlasts ?? 25);
  const [fieldState, setFieldState] = useState(() => buildInitialFieldState(config.groups));
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const parsedData = useMemo(() => {
    const data = { blasts_percentage: Number(blasts) };
    Object.entries(fieldState).forEach(([path, enabled]) => {
      if (enabled) {
        setPathValue(data, path, true);
      }
    });
    if (typeof config.extendParsedData === 'function') {
      config.extendParsedData(data, fieldState);
    }
    return data;
  }, [blasts, config, fieldState]);

  useEffect(() => {
    let cancelled = false;
    let timerId;

    async function run() {
      setLoading(true);
      setError('');
      try {
        const payload = await classify(parsedData);
        if (!cancelled) {
          setResult(payload);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Classification failed.');
          setResult(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    timerId = setTimeout(run, 350);

    return () => {
      cancelled = true;
      clearTimeout(timerId);
    };
  }, [parsedData]);

  const selected = countSelected(fieldState);
  const source = result?.metadata?.source === 'backend' ? 'Backend classifier' : 'Local fallback';
  const backendAvailable = result?.metadata?.backend_available !== false;

  const reset = () => {
    setBlasts(config.defaultBlasts ?? 25);
    setFieldState(buildInitialFieldState(config.groups));
  };

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.kicker}>Free tool</p>
        <h1>{config.title}</h1>
        <p>{config.subtitle}</p>
      </section>

      <section className={styles.notice}>
        <strong>Backend-linked</strong>
        <p>
          This page sends structured, non-identifiable inputs to the same classifier
          proxy used by the haem.io demo tools. If that backend is unavailable, the
          page shows that it has used the local deterministic fallback. Flow
          cytometry gating is treated as out of scope for these focused calculators.
        </p>
      </section>

      <div className={styles.layout}>
        <section className={styles.inputs}>
          <div className={styles.inputHeader}>
            <div>
              <h2>Inputs</h2>
              <p>{selected} marker{selected === 1 ? '' : 's'} selected</p>
            </div>
            <button type="button" onClick={reset}>Reset</button>
          </div>

          <label className={styles.numberField}>
            <span>Bone marrow blasts (%)</span>
            <input
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={blasts}
              onChange={(event) => setBlasts(event.target.value)}
            />
          </label>

          {config.groups.map((group) => (
            <FieldGroup
              key={group.title}
              group={group}
              values={fieldState}
              onToggle={(path) => setFieldState((prev) => ({ ...prev, [path]: !prev[path] }))}
            />
          ))}
        </section>

        <aside className={styles.results}>
          <div className={styles.statusLine}>
            <span className={backendAvailable ? styles.statusOk : styles.statusFallback}>
              {loading ? 'Calculating' : source}
            </span>
          </div>

          {error && <p className={styles.error}>{error}</p>}

          {loading && !result ? (
            <div className={styles.empty}>Running criteria engine...</div>
          ) : (
            config.renderResults(result).map((panel) => (
              <ResultPanel
                key={panel.title}
                title={panel.title}
                label={panel.label}
                value={panel.value}
                trace={panel.trace}
              />
            ))
          )}
        </aside>
      </div>
    </main>
  );
}
