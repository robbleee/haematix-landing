'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { CORE_FIELDS, ADVANCED_FIELDS, allFieldPaths } from '../lib/classifierFieldCatalog';
import { runInteractiveClassifiers } from '../lib/classifierEngine';
import styles from './InteractiveClassifier.module.css';

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

function countEnabled(state) {
  return Object.values(state).filter(Boolean).length;
}

const DEFAULT_FIELD_STATE = allFieldPaths().reduce((acc, p) => {
  acc[p] = false;
  return acc;
}, {});

const DEFAULT_RESULTS = {
  who: { classification: 'Waiting for input...', derivation: ['Adjust markers to classify.'] },
  icc: { classification: 'Waiting for input...', derivation: ['Adjust markers to classify.'] },
  eln: { risk: 'Intermediate', medianOS: 'Unavailable', derivation: ['Adjust markers to classify.'] },
};

const DEFAULT_MDS_CONFIRMATION = {
  cytopenia_confirmed: false,
  morphological_dysplasia: false,
  wbc_cytosis: false,
  monocyte_cytosis: false,
  platelet_cytosis: false,
  eosinophil_cytosis: false,
};

function withFallbackTrace(resultSet, message) {
  const annotate = (item, key) => {
    const trace = Array.isArray(item?.derivation) ? item.derivation : [];
    return { ...item, derivation: [message, ...trace], fallbackSource: key };
  };
  return {
    who: annotate(resultSet?.who, 'who'),
    icc: annotate(resultSet?.icc, 'icc'),
    eln: annotate(resultSet?.eln, 'eln'),
  };
}

function TerminalTrace({ steps }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.terminalWrapper}>
      <button 
        className={styles.terminalToggle} 
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        <span className={`${styles.toggleIcon} ${isOpen ? styles.open : ''}`}>▶</span>
        View Execution Trace
      </button>
      {isOpen && (
        <div className={styles.terminalWindow}>
          <div className={styles.terminalHeader}>
            <div className={styles.macButtons}>
              <span className={styles.macRed}></span>
              <span className={styles.macYellow}></span>
              <span className={styles.macGreen}></span>
            </div>
            <span className={styles.terminalTitle}>engine_trace.log</span>
          </div>
          <div className={styles.terminalBody}>
            {steps.map((step, idx) => (
              <div key={`${idx}-${step}`} className={styles.terminalLine}>
                <span className={styles.prompt}>&gt;</span> {step}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function FieldSection({ group, values, onToggle, filter }) {
  const visibleFields = group.fields.filter((f) => f.label.toLowerCase().includes(filter));
  if (!visibleFields.length) return null;

  return (
    <div className={styles.sectionCard}>
      <h3 className={styles.sectionLabel}>{group.group}</h3>
      <div className={styles.pillGrid}>
        {visibleFields.map((f) => {
          const isActive = Boolean(values[f.path]);
          return (
            <button
              key={f.path}
              type="button"
              className={`${styles.pill} ${isActive ? styles.pillActive : ''}`}
              onClick={() => onToggle(f.path, !isActive)}
            >
              {isActive && (
                <svg className={styles.checkIcon} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
              {f.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

const InteractiveClassifier = () => {
  const [blasts, setBlasts] = useState(25);
  const [fieldState, setFieldState] = useState(() => ({ ...DEFAULT_FIELD_STATE }));
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [search, setSearch] = useState('');
  const [results, setResults] = useState(DEFAULT_RESULTS);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [usingFallback, setUsingFallback] = useState(false);
  const [showMdsConfirmation, setShowMdsConfirmation] = useState(false);
  const [isSubmittingMdsConfirmation, setIsSubmittingMdsConfirmation] = useState(false);
  const [mdsConfirmation, setMdsConfirmation] = useState({ ...DEFAULT_MDS_CONFIRMATION });

  const filter = search.trim().toLowerCase();

  const handleFieldToggle = (path, checked) => {
    setFieldState((prev) => ({ ...prev, [path]: checked }));
  };

  const parsedData = useMemo(() => {
    const parsedData = { blasts_percentage: blasts };
    Object.entries(fieldState).forEach(([path, enabled]) => {
      if (!enabled) return;
      setPathValue(parsedData, path, true);
    });
    return parsedData;
  }, [blasts, fieldState]);

  useEffect(() => {
    let cancelled = false;

    const classify = async () => {
      setIsLoading(true);
      setApiError(null);
      try {
        const response = await fetch('/api/classifier', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ parsed_data: parsedData }),
        });

        const payload = await response.json();
        if (!response.ok) {
          throw new Error(payload?.error || 'Classification failed.');
        }

        if (!cancelled) {
          setUsingFallback(false);
          setResults(payload);
        }
      } catch (error) {
        if (!cancelled) {
          const fallback = withFallbackTrace(
            runInteractiveClassifiers(parsedData),
            'Backend unavailable. Falling back to local classifier engine.'
          );
          setResults(fallback);
          setUsingFallback(true);
          setApiError(null);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    classify();

    return () => {
      cancelled = true;
    };
  }, [parsedData]);

  const needsMdsConfirmation =
    (results?.who?.classification === 'Needs MDS confirmation' ||
      results?.icc?.classification === 'Needs MDS confirmation') &&
    !isLoading;

  useEffect(() => {
    if (needsMdsConfirmation) {
      setShowMdsConfirmation(true);
    }
  }, [needsMdsConfirmation]);

  const handleMdsToggle = (field) => {
    setMdsConfirmation((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleMdsConfirmSubmit = async () => {
    setIsSubmittingMdsConfirmation(true);
    setApiError(null);
    const mdsData = {
      ...parsedData,
      ...mdsConfirmation,
      require_mds_confirmation: true,
    };
    try {
      const response = await fetch('/api/classifier', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          parsed_data: mdsData,
        }),
      });
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload?.error || 'MDS confirmation failed.');
      }
      setUsingFallback(false);
      setResults(payload);
      setShowMdsConfirmation(false);
    } catch (error) {
      const fallback = withFallbackTrace(
        runInteractiveClassifiers(mdsData),
        'Backend unavailable during MDS confirmation. Falling back to local classifier engine.'
      );
      setResults(fallback);
      setUsingFallback(true);
      setApiError(null);
      setShowMdsConfirmation(false);
    } finally {
      setIsSubmittingMdsConfirmation(false);
    }
  };

  const resetAll = () => {
    setFieldState({ ...DEFAULT_FIELD_STATE });
    setBlasts(25);
    setSearch('');
  };

  const activeCount = countEnabled(fieldState);

  return (
    <div className={styles.container}>
      <div className={styles.pageGlow} />
      
      <div className={styles.header}>
        <div className={styles.badge}>Real-Time Evaluation</div>
        <h1 className={styles.title}>Interactive Classifier Engine</h1>
        <p className={styles.subtitle}>
          Experiment with genetic permutations and blast thresholds to see how our logic seamlessly processes WHO 2022, ICC 2022, and ELN 2022 criteria.
        </p>
        <div className={styles.disclaimer}>
          <strong>Note:</strong> This calculator is a highly simplified demonstration. Unlike our main haem.io platform—which features automated AI extraction and comprehensive guardrails—this tool requires manual data entry and is provided for illustrative purposes only. It currently supports AML and MDS pathways only. No clinical guarantees are made regarding the results it produces.
        </div>
      </div>

      <div className={styles.grid}>
        {/* Left Column - Inputs */}
        <div className={styles.inputColumn}>
          
          <div className={styles.toolbar}>
            <div className={styles.searchWrapper}>
              <svg className={styles.searchIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={styles.searchInput}
                placeholder="Search genetic markers..."
              />
            </div>
            <button
              type="button"
              className={`${styles.advancedToggle} ${showAdvanced ? styles.advancedActive : ''}`}
              onClick={() => setShowAdvanced((prev) => !prev)}
            >
              <svg className={styles.filterIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              {showAdvanced ? 'Hide Advanced' : 'Advanced Config'}
            </button>
          </div>

          <div className={styles.controlsHeader}>
            <span className={styles.activeMeta}>
              {activeCount} marker{activeCount !== 1 ? 's' : ''} selected
            </span>
            {activeCount > 0 && (
              <button type="button" onClick={resetAll} className={styles.clearButton}>
                Reset Profile
              </button>
            )}
          </div>
          {apiError && (
            <div className={styles.disclaimer} style={{ marginTop: '-0.25rem', marginBottom: '0.5rem' }}>
              <strong>Backend error:</strong> {apiError}
            </div>
          )}
          {usingFallback && !apiError && (
            <div className={styles.disclaimer} style={{ marginTop: '-0.25rem', marginBottom: '0.5rem' }}>
              <strong>Offline mode:</strong> Backend unavailable. Using local classifier engine fallback.
            </div>
          )}

          <div className={styles.sliderCard}>
            <div className={styles.sliderHeader}>
              <h3 className={styles.sectionLabel}>Bone Marrow Blasts</h3>
              <div className={styles.blastBadge}>{blasts}%</div>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={blasts}
              onChange={(e) => setBlasts(Number(e.target.value))}
              className={styles.rangeInput}
              style={{ '--value': `${blasts}%` }}
            />
            <div className={styles.sliderTicks}>
              <span>0%</span>
              <span>10% (ICC cut-off)</span>
              <span>20% (WHO cut-off)</span>
              <span>100%</span>
            </div>
          </div>

          <div className={styles.scrollableSections}>
            {CORE_FIELDS.map((group) => (
              <FieldSection
                key={group.group}
                group={group}
                values={fieldState}
                onToggle={handleFieldToggle}
                filter={filter}
              />
            ))}

            {showAdvanced &&
              ADVANCED_FIELDS.map((group) => (
                <FieldSection
                  key={group.group}
                  group={group}
                  values={fieldState}
                  onToggle={handleFieldToggle}
                  filter={filter}
                />
              ))}
          </div>
        </div>

        {/* Right Column - Results */}
        <div className={styles.resultsColumn}>
          <div className={styles.resultsDashboard}>
            
            <div className={`${styles.resultCard} ${styles.schemeCard}`}>
              <div className={styles.resultHeader}>
                <div className={styles.resultIcon}>WHO</div>
                <div className={styles.resultLabel}>WHO 2022 Classification</div>
              </div>
              <div className={styles.resultValue}>{isLoading ? 'Calculating...' : results.who.classification}</div>
              <TerminalTrace steps={isLoading ? ['Waiting for backend response...'] : results.who.derivation} />
            </div>

            <div className={`${styles.resultCard} ${styles.schemeCard}`}>
              <div className={styles.resultHeader}>
                <div className={styles.resultIcon}>ICC</div>
                <div className={styles.resultLabel}>ICC 2022 Classification</div>
              </div>
              <div className={styles.resultValue}>{isLoading ? 'Calculating...' : results.icc.classification}</div>
              <TerminalTrace steps={isLoading ? ['Waiting for backend response...'] : results.icc.derivation} />
            </div>

            <div className={`${styles.resultCard} ${styles[`eln${results.eln.risk}`]}`}>
              <div className={styles.resultHeader}>
                <div className={styles.resultIcon}>ELN</div>
                <div className={styles.resultLabel}>ELN 2022 (Intensive) Risk Stratification</div>
              </div>
              <div className={styles.resultValue}>
                {isLoading ? 'Calculating...' : `${results.eln.risk} Risk`}
                <span className={styles.subValue}>Median OS: {isLoading ? '...' : results.eln.medianOS}</span>
              </div>
              <TerminalTrace steps={isLoading ? ['Waiting for backend response...'] : results.eln.derivation} />
            </div>

          </div>
        </div>
      </div>
      {showMdsConfirmation && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalCard}>
            <h3 className={styles.modalTitle}>MDS Confirmation Required</h3>
            <p className={styles.modalSubtitle}>
              The backend requested additional confirmation to determine whether this case is truly MDS.
            </p>
            <div className={styles.modalChecklist}>
              <button type="button" className={`${styles.modalToggle} ${mdsConfirmation.cytopenia_confirmed ? styles.modalToggleActive : ''}`} onClick={() => handleMdsToggle('cytopenia_confirmed')}>
                Persistent cytopenia confirmed
              </button>
              <button type="button" className={`${styles.modalToggle} ${mdsConfirmation.morphological_dysplasia ? styles.modalToggleActive : ''}`} onClick={() => handleMdsToggle('morphological_dysplasia')}>
                Morphological dysplasia present
              </button>
              <button type="button" className={`${styles.modalToggle} ${mdsConfirmation.wbc_cytosis ? styles.modalToggleActive : ''}`} onClick={() => handleMdsToggle('wbc_cytosis')}>
                WBC cytosis present (exclusion)
              </button>
              <button type="button" className={`${styles.modalToggle} ${mdsConfirmation.monocyte_cytosis ? styles.modalToggleActive : ''}`} onClick={() => handleMdsToggle('monocyte_cytosis')}>
                Monocyte cytosis present (exclusion)
              </button>
              <button type="button" className={`${styles.modalToggle} ${mdsConfirmation.platelet_cytosis ? styles.modalToggleActive : ''}`} onClick={() => handleMdsToggle('platelet_cytosis')}>
                Platelet cytosis present (exclusion unless del5q/inv3)
              </button>
              <button type="button" className={`${styles.modalToggle} ${mdsConfirmation.eosinophil_cytosis ? styles.modalToggleActive : ''}`} onClick={() => handleMdsToggle('eosinophil_cytosis')}>
                Eosinophil cytosis present (possible exclusion)
              </button>
            </div>
            <div className={styles.modalActions}>
              <button
                type="button"
                className={styles.modalSecondary}
                onClick={() => setShowMdsConfirmation(false)}
                disabled={isSubmittingMdsConfirmation}
              >
                Close
              </button>
              <button
                type="button"
                className={styles.modalPrimary}
                onClick={handleMdsConfirmSubmit}
                disabled={isSubmittingMdsConfirmation}
              >
                {isSubmittingMdsConfirmation ? 'Submitting...' : 'Reclassify with MDS Confirmation'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveClassifier;