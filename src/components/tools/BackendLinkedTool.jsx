'use client';

import { useEffect, useMemo, useState } from 'react';
import { runInteractiveClassifiers } from '../../lib/classifierEngine';
import {
  educationalMetadata,
  validateEducationalClassifierInput,
} from '../../lib/educationalClassifierSafety.mjs';
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

export default function EducationalCalculatorTool({ config }) {
  const [blasts, setBlasts] = useState(config.defaultBlasts ?? 25);
  const [fieldState, setFieldState] = useState(() => buildInitialFieldState(config.groups));
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

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
    const validation = validateEducationalClassifierInput(parsedData);
    if (!validation.ok) {
      setError(validation.message);
      setResult(null);
      return;
    }
    setError('');
    setResult({
      ...runInteractiveClassifiers(parsedData),
      metadata: educationalMetadata(),
    });
  }, [parsedData]);

  const selected = countSelected(fieldState);

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
        <strong>Educational local calculator</strong>
        <p>
          This page evaluates preset variables locally in your browser. It does not
          use the clinical classifier, parse reports, reconcile flow and morphology,
          or screen for BPDCN. It is illustrative only and must not guide care.
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
            <span className={styles.statusOk}>
              Local educational model
            </span>
          </div>

          {error || !result ? (
            <p className={styles.error}>
              No classification produced. {error || 'The educational input could not be evaluated.'}
            </p>
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
