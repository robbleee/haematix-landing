'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { jsPDF } from 'jspdf';
import { classifyEln2022 } from '../../lib/classifierEngine';
import { CYTOGENETIC_GROUPS, INITIAL_PROFILE, SAML_GENES, classifyCoats, deriveCoatsCytogenetics, toElnInput, transplantText } from '../../lib/coatsExplorer';
import styles from './TreatmentExplorer.module.css';

const STEPS = [
  { key: 'markers', eyebrow: 'Defining genetics', title: 'Which defining mutations are present?', hint: 'Select every confirmed positive finding. Unselected markers will be treated as not detected.' },
  { key: 'flt3', eyebrow: 'FLT3 profile', title: 'What is the FLT3 result?', hint: 'Choose the most specific confirmed result.' },
  { key: 'cytogenetics', eyebrow: 'Cytogenetics', title: 'What did cytogenetic testing show?', hint: 'Set the report status, then select every confirmed finding. ELN risk updates automatically.' },
  { key: 'saml', eyebrow: 'Myelodysplasia-related genetics', title: 'Select any sAML-defining mutations', hint: 'The pathway distinguishes between zero, one, and two or more mutations.' },
  { key: 'context', eyebrow: 'Disease context', title: 'What is the disease context?', hint: 'Choose the best-supported clinical history.' },
  { key: 'dnmt3a', eyebrow: 'Refining marker', title: 'Is DNMT3A mutated?', hint: 'This separates the two NPM1 + FLT3-ITD consensus pathways.' },
  { key: 'patient', eyebrow: 'Patient context', title: 'Add age and MRD status', hint: 'These refine the transplant context; they do not change the matched consensus case.' },
];

const MARKERS = [
  ['NPM1', 'NPM1'], ['TP53', 'TP53'], ['DDX41', 'DDX41'], ['CEBPA_bZIP', 'CEBPA bZIP'],
];

const CONTEXT_CHOICES = [
  ['denovo', 'De novo AML', 'No prior MDS/MPN or therapy'],
  ['prior_mds', 'Prior MDS', 'Arising from MDS or CMML'],
  ['taml', 'Therapy-related AML', 'Following chemotherapy or radiotherapy'],
  ['transformed_mpn', 'Transformed from an MPN', 'Not surveyed in this consensus', { disabled: true }],
];

function Icon({ name }) {
  const paths = {
    markers: <><circle cx="12" cy="7" r="3"/><circle cx="7" cy="17" r="3"/><circle cx="17" cy="17" r="3"/><path d="M10 9.5 8.5 14M14 9.5l1.5 4.5M10 17h4"/></>,
    flt3: <><path d="m13 2-9 12h7l-1 8 9-12h-7z"/></>,
    cytogenetics: <><path d="M8 3c0 4 8 14 8 18M16 3C16 7 8 17 8 21M9 7h6M7 12h10M9 17h6"/></>,
    saml: <><path d="M4 5h16M4 12h16M4 19h16"/><circle cx="8" cy="5" r="2"/><circle cx="16" cy="12" r="2"/><circle cx="10" cy="19" r="2"/></>,
    context: <><path d="M12 3v18M3 8h6a3 3 0 0 0 3-3M21 8h-6a3 3 0 0 1-3-3M5 16h4a3 3 0 0 1 3 3M19 16h-4a3 3 0 0 0-3 3"/></>,
    dnmt3a: <><circle cx="12" cy="12" r="9"/><path d="M9 8h3a4 4 0 0 1 0 8H9z"/></>,
    patient: <><circle cx="12" cy="8" r="4"/><path d="M5 21a7 7 0 0 1 14 0"/></>,
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

export default function TreatmentExplorer() {
  const [profile, setProfile] = useState(INITIAL_PROFILE);
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState('forward');
  const [showWhy, setShowWhy] = useState(false);
  const [showElnWhy, setShowElnWhy] = useState(false);
  const [sessionId] = useState(createExplorerSessionId);
  const resultTrackedRef = useRef(null);
  const coatsCytogenetics = useMemo(() => deriveCoatsCytogenetics(profile), [profile]);
  const askDnmt3a = shouldAskDnmt3a(profile);
  const activeSteps = useMemo(() => STEPS.filter((item) => item.key !== 'dnmt3a' || askDnmt3a), [askDnmt3a]);
  const isResult = step >= activeSteps.length;
  const currentStep = activeSteps[step];
  const eln = useMemo(() => classifyEln2022(toElnInput(profile)), [profile]);
  const matched = useMemo(() => isResult && coatsCytogenetics ? classifyCoats({ ...profile, cytogenetics: coatsCytogenetics }) : null, [isResult, profile, coatsCytogenetics]);

  const update = (key, value) => setProfile((current) => ({ ...current, [key]: value }));
  const toggleGene = (gene) => update('samlGenes', profile.samlGenes.includes(gene) ? profile.samlGenes.filter((g) => g !== gene) : [...profile.samlGenes, gene]);
  const toggleCytogeneticFinding = (finding) => update('cytogeneticFindings', profile.cytogeneticFindings.includes(finding) ? profile.cytogeneticFindings.filter((item) => item !== finding) : [...profile.cytogeneticFindings, finding]);
  const setCytogeneticsStatus = (status) => setProfile((current) => ({ ...current, cytogeneticsStatus: status, cytogeneticFindings: status === 'reported' ? current.cytogeneticFindings : [] }));
  const canContinue = canContinueFromStep(currentStep?.key, profile);
  const next = () => {
    if (!canContinue) return;
    trackExplorerEvent(sessionId, 'step_continue', {
      step_key: currentStep?.key,
      step_number: step + 1,
      total_steps: activeSteps.length,
      ...buildTelemetryProfile(profile, matched, eln),
    });
    setDirection('forward');
    setShowWhy(false);
    setStep((s) => s + 1);
  };
  const back = () => { setDirection('back'); setShowWhy(false); setStep((s) => Math.max(0, s - 1)); };
  const reset = () => {
    trackExplorerEvent(sessionId, 'reset', buildTelemetryProfile(profile, matched, eln));
    resultTrackedRef.current = null;
    setProfile(INITIAL_PROFILE);
    setDirection('back');
    setShowWhy(false);
    setShowElnWhy(false);
    setStep(0);
  };

  useEffect(() => {
    document.body.classList.add('treatment-explorer-fullscreen');
    trackExplorerEvent(sessionId, 'session_start', { version: 'coats-delphi-v1' });
    return () => document.body.classList.remove('treatment-explorer-fullscreen');
  }, [sessionId]);

  useEffect(() => {
    if (step > activeSteps.length) setStep(activeSteps.length);
  }, [activeSteps.length, step]);

  useEffect(() => {
    if (!isResult) return;
    const resultKey = matched ? `case-${matched.number}` : 'no-match';
    if (resultTrackedRef.current === resultKey) return;
    resultTrackedRef.current = resultKey;
    trackExplorerEvent(sessionId, 'result_viewed', buildTelemetryProfile(profile, matched, eln));
  }, [eln, isResult, matched, profile, sessionId]);

  const summary = getSummary(profile, eln);

  return (
    <main className={styles.page}>
      <div className={styles.orbOne}/><div className={styles.orbTwo}/><div className={styles.gridTexture}/>
      <section className={styles.explorerShell}>
        <aside className={styles.pathPanel}>
          <div className={styles.panelTop}><span>Your pathway</span><button onClick={reset}>Reset</button></div>
          <div className={styles.pathList}>
            {activeSteps.map((item, index) => {
              const status = index < step ? 'done' : index === step ? 'active' : 'future';
              return <button key={item.key} disabled={index > step} onClick={() => index < step && setStep(index)} className={`${styles.pathItem} ${styles[status]}`}>
                <span className={styles.pathIcon}>{status === 'done' ? <span className={styles.check}>✓</span> : <Icon name={item.key}/>}</span>
                <span className={styles.pathCopy}><strong>{item.eyebrow}</strong><small>{index < step ? summary[item.key] : index === step ? 'In progress' : 'Waiting'}</small></span>
                {index < activeSteps.length - 1 && <span className={styles.pathLine}/>}
              </button>;
            })}
            <div className={`${styles.pathItem} ${isResult ? styles.active : styles.future}`}>
              <span className={styles.pathIcon}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="m5 12 4 4L19 6"/></svg></span>
              <span className={styles.pathCopy}><strong>Consensus match</strong><small>{isResult ? matched ? `Case ${matched.number}` : 'No exact match' : 'Waiting'}</small></span>
            </div>
          </div>
          <div className={styles.privacyNote}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg><span><strong>Private by design</strong>Selections stay on this device and are cleared when you leave.</span></div>
        </aside>

        <div className={styles.questionPanel}>
          {!isResult ? <div key={step} className={`${styles.questionInner} ${direction === 'back' ? styles.slideBack : styles.slideForward}`}>
            <div className={styles.progressRow}><span>Step {String(step + 1).padStart(2, '0')}</span><div className={styles.progressTrack}><i style={{width: `${((step + 1) / activeSteps.length) * 100}%`}}/></div><span>{activeSteps.length}</span></div>
            <div className={styles.questionHeader}><span>{currentStep.eyebrow}</span><h2>{currentStep.title}</h2><p>{currentStep.hint}</p></div>

            {currentStep.key === 'markers' && <div className={styles.markerGrid}>{MARKERS.map(([key, label]) => <button key={key} onClick={() => update(key, !profile[key])} className={`${styles.markerCard} ${profile[key] ? styles.selected : ''}`}><span className={styles.selectMark}>{profile[key] ? '✓' : '+'}</span><strong>{label}</strong><small>{profile[key] ? 'Detected' : 'Not detected'}</small></button>)}</div>}
            {currentStep.key === 'flt3' && <ChoiceGrid value={profile.flt3} onChange={(v) => update('flt3', v)} choices={[[ 'none','Not detected','Neither ITD nor TKD'],['itd','FLT3-ITD','Internal tandem duplication'],['tkd','FLT3-TKD','Tyrosine kinase domain'],['both','Both','ITD and TKD detected']]}/>}
            {currentStep.key === 'cytogenetics' && <CytogeneticsSelector profile={profile} onStatus={setCytogeneticsStatus} onToggle={toggleCytogeneticFinding}/>}
            {currentStep.key === 'saml' && <><div className={styles.countBadge}><span>{profile.samlGenes.length}</span><div><strong>selected</strong><small>{profile.samlGenes.length === 0 ? 'No defining mutations' : profile.samlGenes.length === 1 ? 'Single-mutation pathway' : '2+ mutation pathway'}</small></div></div><div className={styles.geneGrid}>{SAML_GENES.map((gene) => <button key={gene} onClick={() => toggleGene(gene)} className={profile.samlGenes.includes(gene) ? styles.geneSelected : ''}><span>{profile.samlGenes.includes(gene) ? '✓' : '+'}</span>{gene}</button>)}</div></>}
            {currentStep.key === 'context' && <ChoiceGrid value={profile.context} onChange={(v) => update('context', v)} choices={CONTEXT_CHOICES}/>}
            {currentStep.key === 'dnmt3a' && <div className={styles.binaryWrap}><button onClick={() => update('DNMT3A', true)} className={profile.DNMT3A === true ? styles.binarySelected : ''}><span>+</span><strong>Detected</strong><small>DNMT3A mutation present</small></button><button onClick={() => update('DNMT3A', false)} className={profile.DNMT3A === false ? styles.binarySelected : ''}><span>−</span><strong>Not detected</strong><small>Wild-type DNMT3A</small></button></div>}
            {currentStep.key === 'patient' && <div className={styles.patientGrid}><label><span>Age <small>optional</small></span><div className={styles.inputWrap}><input value={profile.age} onChange={(e) => update('age', e.target.value.replace(/\D/g, '').slice(0,3))} inputMode="numeric" placeholder="e.g. 54"/><em>years</em></div></label><div><span className={styles.fieldLabel}>MRD status <small>optional</small></span><div className={styles.segmented}>{[['positive','Positive'],['negative','Negative'],['unknown','Not assessed']].map(([v,l]) => <button key={v} onClick={() => update('mrd', v)} className={profile.mrd === v ? styles.segmentActive : ''}>{l}</button>)}</div></div></div>}

            {profile.cytogeneticsStatus && <ElnBadge eln={eln} provisional={profile.cytogeneticsStatus === 'unavailable'} expanded={showElnWhy} onToggle={() => setShowElnWhy((value) => !value)}/>}

            <button className={styles.whyButton} onClick={() => setShowWhy(!showWhy)}><span>i</span>Why this matters<svg className={showWhy ? styles.rotated : ''} viewBox="0 0 20 20"><path d="m6 8 4 4 4-4"/></svg></button>
            {showWhy && <div className={styles.whyBox}>{whyCopy(currentStep.key)}</div>}
            <div className={styles.actions}>{step > 0 ? <button className={styles.backButton} onClick={back}>← Back</button> : <span/>}<button disabled={!canContinue} className={styles.continueButton} onClick={next}>{step === activeSteps.length - 1 ? 'Reveal consensus match' : 'Continue'}<span>→</span></button></div>
          </div> : <Result matched={matched} profile={profile} eln={eln} provisional={profile.cytogeneticsStatus === 'unavailable'} sessionId={sessionId} onBack={back} onReset={reset}/>}
        </div>
      </section>

      <section className={styles.disclaimer}><div className={styles.disclaimerIcon}>!</div><div><strong>Clinical decision-support demonstration</strong><p>This explorer reproduces the current Coats–Delphi rule logic for educational demonstration. It does not provide medical advice and must not replace multidisciplinary review, patient assessment, local protocols, or current prescribing information.</p></div></section>
    </main>
  );
}

function ChoiceGrid({ choices, value, onChange, wide = false }) {
  return <div className={`${styles.choiceGrid} ${wide ? styles.choiceGridWide : ''}`}>{choices.map(([key,label,desc,meta = {}]) => <button key={key} disabled={meta.disabled} onClick={() => !meta.disabled && onChange(key)} className={`${value === key ? styles.choiceSelected : ''} ${meta.disabled ? styles.choiceDisabled : ''}`}><span className={styles.radio}><i/></span><span><strong>{label}</strong><small>{desc}</small>{meta.disabled && <em>Not selectable</em>}</span></button>)}</div>;
}

function CytogeneticsSelector({ profile, onStatus, onToggle }) {
  const statuses = [
    ['reported', 'Cytogenetic result available', 'Select the matching group below'],
    ['unavailable', 'Unavailable', 'Pending, failed, or not performed'],
  ];
  return <div className={styles.cytoSelector}>
    <div className={styles.statusGrid}>{statuses.map(([key, label, description]) => <button key={key} onClick={() => onStatus(key)} className={profile.cytogeneticsStatus === key ? styles.statusSelected : ''}><span className={styles.radio}><i/></span><span><strong>{label}</strong><small>{description}</small></span></button>)}</div>
    {profile.cytogeneticsStatus === 'reported' && <div className={styles.cytoGroups}>{CYTOGENETIC_GROUPS.map((group) => <section key={group.label} className={styles.cytoGroup} data-tone={group.tone}><div className={styles.cytoGroupTitle}><span/>{group.label}</div><div className={styles.cytoGrid}>{group.findings.map((finding) => {
      const selected = profile.cytogeneticFindings.includes(finding.key);
      const adjunctSelected = finding.adjunctKey && profile.cytogeneticFindings.includes(finding.adjunctKey);
      return <div key={finding.key} className={`${styles.cytoRow} ${finding.adjunctKey ? styles.cytoRowWithAdjunct : ''}`}>
        <button aria-pressed={selected} disabled={finding.disabled} onClick={() => !finding.disabled && onToggle(finding.key)} className={`${selected ? styles.cytoSelected : ''} ${finding.disabled ? styles.cytoDisabled : ''}`}>
          <span className={styles.cytoCheck}>{selected ? '✓' : finding.disabled ? '–' : '+'}</span>
          <span><strong>{finding.label}</strong><small>{finding.description}</small>{finding.disabled && <em>Not yet surveyed</em>}</span>
        </button>
        {finding.adjunctKey && <button aria-pressed={adjunctSelected} onClick={() => onToggle(finding.adjunctKey)} className={`${styles.cytoAdjunct} ${adjunctSelected ? styles.cytoSelected : ''}`}>
          <span className={styles.cytoCheck}>{adjunctSelected ? '✓' : '+'}</span>
          <span><strong>{finding.adjunctLabel}</strong>{finding.adjunctDescription && <small>{finding.adjunctDescription}</small>}</span>
        </button>}
      </div>;
    })}</div></section>)}</div>}
    {profile.cytogeneticsStatus === 'reported' && profile.cytogeneticFindings.length === 0 && <p className={styles.emptyFindingNote}>Select Normal or the closest reported cytogenetic group to continue.</p>}
    {profile.cytogeneticsStatus === 'unavailable' && <p className={styles.unavailableNote}>A provisional molecular ELN result can be shown, but no cytogenetic finding will be assumed absent and no Coats case will be forced.</p>}
  </div>;
}

function ElnBadge({ eln, provisional, expanded, onToggle }) {
  const tone = eln.risk.toLowerCase();
  return <div className={`${styles.elnCard} ${styles[`eln${tone}`]}`}><div className={styles.elnMain}><div><span>ELN 2022 · intensive therapy</span><strong>{provisional ? 'Provisional ' : ''}{eln.risk}</strong></div><button onClick={onToggle} aria-expanded={expanded}>{expanded ? 'Hide reasoning' : 'Why this risk?'} <span>{expanded ? '−' : '+'}</span></button></div>{provisional && <p className={styles.provisionalNote}>Cytogenetics unavailable — this result uses confirmed molecular findings only.</p>}{expanded && <ol className={styles.elnDerivation}>{eln.derivation.map((line, index) => <li key={`${line}-${index}`}>{line.replace(/^Step \d+:?\s*/, '').replace(/^Final ELN 2022 risk:\s*/, 'Final risk: ')}</li>)}</ol>}</div>;
}

function DecisionTrace({ profile, matched, eln }) {
  const nodes = getDecisionTrace(profile, matched, eln);
  return <section className={styles.decisionTrace}><div className={styles.traceHeader}><span>Decision trace</span><strong>{matched ? 'How this consensus case was reached' : 'Why this pathway did not force a case'}</strong></div><div className={styles.traceRail}>{nodes.map((node, index) => <div key={node.key} className={`${styles.traceNode} ${index === nodes.length - 1 ? styles.traceTerminal : ''}`}><div className={styles.traceDot}>{index + 1}</div><div><span>{node.label}</span><strong>{node.value}</strong>{node.detail && <small>{node.detail}</small>}</div></div>)}</div>{matched?.reasons?.length > 0 && <div className={styles.traceEvidence}><span>Matched branch evidence</span><ol>{matched.reasons.map((reason) => <li key={reason}>{reason}</li>)}</ol></div>}</section>;
}

function Result({ matched, profile, eln, provisional, sessionId, onBack, onReset }) {
  const [showResultEln, setShowResultEln] = useState(false);
  const [exportingPdf, setExportingPdf] = useState(false);
  const [pdfError, setPdfError] = useState('');
  const onExportPdf = async () => {
    setExportingPdf(true);
    setPdfError('');
    try {
      await exportExplorerPdf({ profile, matched, eln, provisional });
      trackExplorerEvent(sessionId, 'pdf_export', buildTelemetryProfile(profile, matched, eln));
    } catch (error) {
      console.error('Treatment explorer PDF export failed:', error);
      setPdfError('PDF export failed. Please retry after refreshing the page.');
    } finally {
      setExportingPdf(false);
    }
  };
  if (!matched) return <div className={styles.noMatch}><div className={styles.noMatchIcon}>?</div><span>Pathway complete</span><h2>No exact consensus case matched</h2><p>This combination falls outside the 28 defined Coats–Delphi cases, or cytogenetics are incomplete. It should be reviewed by a specialist multidisciplinary team rather than forced into a nearby branch.</p><DecisionTrace profile={profile} matched={matched} eln={eln}/><ElnBadge eln={eln} provisional={provisional} expanded={showResultEln} onToggle={() => setShowResultEln((value) => !value)}/>{pdfError && <p className={styles.pdfError}>{pdfError}</p>}<div className={styles.resultActions}><button onClick={onBack}>← Review answers</button><button className={styles.pdfButton} onClick={onExportPdf} disabled={exportingPdf}>{exportingPdf ? 'Preparing PDF…' : 'Export PDF'}</button><button onClick={onReset}>Start a new pathway</button></div></div>;
  const noConsensus = matched.preferred === 'No consensus';
  return <div className={styles.resultWrap}>
    <div className={styles.resultTop}><div className={styles.resultSeal}><span>CASE</span><strong>{String(matched.number).padStart(2,'0')}</strong></div><div><span className={styles.resultEyebrow}>Consensus pathway matched</span><h2>{matched.name}</h2><p>{matched.incidence} of AML cases</p></div></div>
    <div className={`${styles.treatmentHero} ${noConsensus ? styles.consensusAmber : ''}`}><div><span>Preferred consensus treatment</span><h3>{matched.preferred}</h3></div><span className={styles.matchPill}>{noConsensus ? 'MDT decision' : 'Primary pathway'}</span></div>
    <DecisionTrace profile={profile} matched={matched} eln={eln}/>
    <ElnBadge eln={eln} provisional={provisional} expanded={showResultEln} onToggle={() => setShowResultEln((value) => !value)}/>
    <div className={styles.resultColumns}><div className={styles.resultCard}><span>Reasoning path</span><ol>{matched.reasons.map((reason,i) => <li key={reason}><i>{i+1}</i>{reason}</li>)}</ol></div><div className={styles.resultStack}><div className={styles.miniCard}><span>Reasonable alternatives</span><div className={styles.chips}>{matched.alternatives.map((a) => <i key={a}>{a}</i>)}</div></div><div className={styles.miniCard}><span>Transplant consensus</span><p>{transplantText(matched.number, Number(profile.age || 0), profile.mrd)}</p></div>{matched.trial && <div className={styles.miniCard}><span>Relevant trial pathway</span><p>{matched.trial}</p></div>}</div></div>
    {pdfError && <p className={styles.pdfError}>{pdfError}</p>}
    <div className={styles.resultFooter}><button onClick={onBack}>← Review answers</button><button className={styles.pdfButton} onClick={onExportPdf} disabled={exportingPdf}>{exportingPdf ? 'Preparing PDF…' : 'Export PDF'}</button><button onClick={onReset}>Start a new pathway ↗</button></div>
  </div>;
}

function canContinueFromStep(stepKey, profile) {
  if (stepKey === 'flt3') return Boolean(profile.flt3);
  if (stepKey === 'cytogenetics') return profile.cytogeneticsStatus === 'unavailable' || (profile.cytogeneticsStatus === 'reported' && profile.cytogeneticFindings.length > 0);
  if (stepKey === 'context') return Boolean(profile.context);
  if (stepKey === 'dnmt3a') return profile.DNMT3A !== null;
  return true;
}

function shouldAskDnmt3a(profile) {
  const selected = new Set(profile.cytogeneticFindings || []);
  const intermediateCytogenetics = profile.cytogeneticsStatus === 'normal' || selected.has('normal') || selected.has('other_non_adverse');
  return Boolean(profile.NPM1 && ['itd', 'both'].includes(profile.flt3) && intermediateCytogenetics);
}

function getDecisionTrace(profile, matched, eln) {
  const selectedMarkers = MARKERS.filter(([key]) => profile[key]).map(([, label]) => label);
  const samlCount = profile.samlGenes.length;
  const nodes = [
    {
      key: 'markers',
      label: 'Defining genetics',
      value: selectedMarkers.length ? selectedMarkers.join(', ') : 'No defining marker selected',
      detail: selectedMarkers.length ? 'These markers are checked first.' : 'No top-level genetic branch was triggered here.',
    },
    {
      key: 'flt3',
      label: 'FLT3 branch',
      value: profile.flt3 ? { none: 'Not detected', itd: 'FLT3-ITD', tkd: 'FLT3-TKD', both: 'FLT3-ITD + TKD' }[profile.flt3] : 'Not set',
      detail: ['itd', 'both'].includes(profile.flt3) ? 'FLT3-ITD keeps the DNMT3A refinement in scope when cytogenetics are intermediate.' : 'No FLT3-ITD refinement required.',
    },
    {
      key: 'cytogenetics',
      label: 'Cytogenetic group',
      value: getCytogeneticTraceLabel(profile),
      detail: `ELN risk context: ${eln.risk}`,
    },
    {
      key: 'saml',
      label: 'MDS-related mutations',
      value: samlCount ? `${samlCount} selected` : 'None selected',
      detail: samlCount ? profile.samlGenes.join(', ') : 'No sAML-defining mutation branch selected.',
    },
    {
      key: 'context',
      label: 'Disease context',
      value: profile.context ? { denovo: 'De novo AML', taml: 'Therapy-related AML', prior_mds: 'Prior MDS / CMML' }[profile.context] : 'Not set',
      detail: profile.context === 'prior_mds' ? 'Prior MDS pathway uses the updated MDS/CMML wording.' : 'Clinical history branch applied.',
    },
  ];

  if (profile.DNMT3A !== null) {
    nodes.push({
      key: 'dnmt3a',
      label: 'DNMT3A refinement',
      value: profile.DNMT3A ? 'Detected' : 'Not detected',
      detail: 'Shown because NPM1 + FLT3-ITD + intermediate cytogenetics were selected.',
    });
  }

  nodes.push({
    key: 'match',
    label: 'Consensus output',
    value: matched ? `Case ${String(matched.number).padStart(2, '0')}` : 'No exact case',
    detail: matched ? matched.name : 'No surveyed case matched this exact combination.',
  });

  return nodes;
}

function getCytogeneticTraceLabel(profile) {
  if (profile.cytogeneticsStatus === 'unavailable') return 'Unavailable';
  const selected = new Set(profile.cytogeneticFindings || []);
  if (!selected.size) return 'No cytogenetic group selected';

  const primaryFindings = CYTOGENETIC_GROUPS
    .flatMap((group) => group.findings)
    .filter((finding) => selected.has(finding.key))
    .map((finding) => finding.label);
  const adjuncts = CYTOGENETIC_GROUPS
    .flatMap((group) => group.findings)
    .filter((finding) => finding.adjunctKey && selected.has(finding.adjunctKey))
    .map((finding) => finding.adjunctLabel);

  return [...primaryFindings, ...adjuncts].join(' + ') || 'Reported, no listed group selected';
}

function createExplorerSessionId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  return `aml-${Date.now()}-${Math.random().toString(36).slice(2, 12)}`;
}

function trackExplorerEvent(sessionId, eventType, payload = {}) {
  if (typeof window === 'undefined') return;
  fetch('/api/treatment-explorer/telemetry', {
    method: 'POST',
    keepalive: true,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sessionId,
      eventType,
      payload,
      pathname: window.location.pathname,
    }),
  }).catch(() => {});
}

function getFlt3Label(value) {
  return {
    none: 'Not detected',
    itd: 'FLT3-ITD',
    tkd: 'FLT3-TKD',
    both: 'FLT3-ITD and FLT3-TKD',
  }[value] || 'Not set';
}

function getContextLabel(value) {
  return {
    denovo: 'De novo AML',
    prior_mds: 'Arising from MDS or CMML',
    taml: 'Therapy-related AML',
    transformed_mpn: 'Transformed from an MPN',
  }[value] || 'Not set';
}

function getAgeBand(age) {
  const value = Number(age);
  if (!value) return 'not_provided';
  if (value < 40) return '<40';
  if (value < 60) return '40-59';
  if (value < 70) return '60-69';
  return '70+';
}

function selectedMarkerLabels(profile) {
  return MARKERS.filter(([key]) => profile[key]).map(([, label]) => label);
}

function cytogeneticLabels(profile) {
  if (profile.cytogeneticsStatus === 'unavailable') return ['Unavailable'];
  const selected = new Set(profile.cytogeneticFindings || []);
  const labels = [];
  CYTOGENETIC_GROUPS.flatMap((group) => group.findings).forEach((finding) => {
    if (selected.has(finding.key)) labels.push(`${finding.label}${finding.description ? ` (${finding.description})` : ''}`);
    if (finding.adjunctKey && selected.has(finding.adjunctKey)) {
      labels.push(`${finding.adjunctLabel}${finding.adjunctDescription ? ` (${finding.adjunctDescription})` : ''}`);
    }
  });
  return labels.length ? labels : ['No cytogenetic group selected'];
}

function buildTelemetryProfile(profile, matched, eln) {
  return {
    version: 'coats-delphi-v1',
    outcome: matched ? 'matched' : 'no_exact_match',
    case_number: matched?.number || null,
    preferred_treatment: matched?.preferred || null,
    eln_risk: eln?.risk || null,
    markers: selectedMarkerLabels(profile),
    flt3: profile.flt3 || null,
    cytogenetics_status: profile.cytogeneticsStatus || null,
    cytogenetic_findings: profile.cytogeneticFindings || [],
    saml_gene_count: profile.samlGenes.length,
    context: profile.context || null,
    dnmt3a_asked: profile.DNMT3A !== null,
    dnmt3a_detected: profile.DNMT3A,
    age_band: getAgeBand(profile.age),
    mrd: profile.mrd || null,
  };
}

async function exportExplorerPdf({ profile, matched, eln, provisional }) {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const page = { width: doc.internal.pageSize.getWidth(), height: doc.internal.pageSize.getHeight(), margin: 46 };
  const colours = {
    ink: [16, 39, 42],
    muted: [91, 111, 113],
    teal: [0, 143, 131],
    pale: [239, 250, 248],
    line: [210, 226, 224],
    amber: [156, 103, 26],
  };
  let y = page.margin;

  const text = (value) => (value === null || value === undefined || value === '' ? 'Not provided' : String(value));
  const setText = (size, colour = colours.ink, style = 'normal') => {
    doc.setFont('helvetica', style);
    doc.setFontSize(size);
    doc.setTextColor(...colour);
  };
  const ensureSpace = (height) => {
    if (y + height <= page.height - page.margin) return;
    addFooter();
    doc.addPage();
    y = page.margin;
    addPageHeader();
  };
  const addWrapped = (value, x, width, size = 10, colour = colours.ink, style = 'normal', lineHeight = 13) => {
    setText(size, colour, style);
    const lines = doc.splitTextToSize(text(value), width);
    doc.text(lines, x, y);
    y += lines.length * lineHeight;
  };
  const section = (title) => {
    ensureSpace(36);
    y += 14;
    setText(9, colours.teal, 'bold');
    doc.text(title.toUpperCase(), page.margin, y);
    y += 10;
    doc.setDrawColor(...colours.line);
    doc.line(page.margin, y, page.width - page.margin, y);
    y += 18;
  };
  const keyValue = (label, value, x, width) => {
    ensureSpace(36);
    setText(8, colours.muted, 'bold');
    doc.text(label.toUpperCase(), x, y);
    y += 12;
    addWrapped(value, x, width, 10, colours.ink, 'normal', 13);
    y += 5;
  };
  const bulletList = (items, x, width) => {
    const list = items?.length ? items : ['None recorded'];
    list.forEach((item) => {
      ensureSpace(24);
      setText(10, colours.teal, 'bold');
      doc.text('-', x, y);
      addWrapped(item, x + 12, width - 12, 10, colours.ink, 'normal', 13);
      y += 2;
    });
  };
  const addPageHeader = () => {
    setText(8, colours.muted, 'bold');
    doc.text('Haem.io AML Treatment Explorer', page.margin, 28);
    doc.setDrawColor(...colours.line);
    doc.line(page.margin, 36, page.width - page.margin, 36);
  };
  const addFooter = () => {
    const footerY = page.height - 26;
    setText(7, colours.muted);
    doc.text('Clinical decision-support demonstration only. Not medical advice.', page.margin, footerY);
    doc.text(`Page ${doc.internal.getNumberOfPages()}`, page.width - page.margin - 36, footerY);
  };

  doc.setFillColor(...colours.pale);
  doc.roundedRect(0, 0, page.width, 178, 0, 0, 'F');
  setText(11, colours.teal, 'bold');
  doc.text('Haem.io', page.margin, y);
  y += 26;
  setText(25, colours.ink, 'bold');
  doc.text('AML Treatment Explorer Result', page.margin, y);
  y += 22;
  addWrapped(
    'Coats-Delphi consensus pathway export. Generated from the selected inputs in the web explorer.',
    page.margin,
    page.width - page.margin * 2,
    10,
    colours.muted,
    'normal',
    13
  );
  y += 16;
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(page.margin, y, page.width - page.margin * 2, 70, 10, 10, 'F');
  const caseLabel = matched ? `Case ${String(matched.number).padStart(2, '0')}` : 'No exact case';
  setText(9, colours.teal, 'bold');
  doc.text(caseLabel.toUpperCase(), page.margin + 18, y + 22);
  setText(16, colours.ink, 'bold');
  doc.text(doc.splitTextToSize(matched?.name || 'No exact consensus case matched', page.width - page.margin * 2 - 36), page.margin + 18, y + 42);
  y += 98;

  section('Consensus Output');
  const left = page.margin;
  const right = page.margin + 260;
  const colWidth = 226;
  keyValue('Preferred consensus treatment', matched?.preferred || 'No exact consensus treatment matched', left, colWidth);
  const afterLeft = y;
  y -= 53;
  keyValue('ELN 2022 risk context', `${provisional ? 'Provisional ' : ''}${eln.risk}`, right, colWidth);
  y = Math.max(y, afterLeft);
  keyValue('Incidence', matched?.incidence || 'Not applicable', left, colWidth);
  const afterIncidence = y;
  y -= 53;
  keyValue('Transplant consensus', matched ? transplantText(matched.number, Number(profile.age || 0), profile.mrd) : 'Specialist MDT review recommended.', right, colWidth);
  y = Math.max(y, afterIncidence);
  if (matched?.trial) keyValue('Relevant trial pathway', matched.trial, left, page.width - page.margin * 2);

  section('Decision Trace');
  bulletList(getDecisionTrace(profile, matched, eln).map((node, index) => `${index + 1}. ${node.label}: ${node.value}${node.detail ? ` - ${node.detail}` : ''}`), page.margin, page.width - page.margin * 2);

  if (matched?.reasons?.length) {
    section('Matched Branch Evidence');
    bulletList(matched.reasons, page.margin, page.width - page.margin * 2);
  }

  section('Selected Inputs');
  keyValue('Defining genetics', selectedMarkerLabels(profile).join(', ') || 'No defining marker selected', left, colWidth);
  const afterMarkers = y;
  y -= 53;
  keyValue('FLT3 result', getFlt3Label(profile.flt3), right, colWidth);
  y = Math.max(y, afterMarkers);
  keyValue('Cytogenetics', cytogeneticLabels(profile).join('; '), left, page.width - page.margin * 2);
  keyValue('MDS-related mutation genes', profile.samlGenes.join(', ') || 'None selected', left, page.width - page.margin * 2);
  keyValue('Disease context', getContextLabel(profile.context), left, colWidth);
  const afterContext = y;
  y -= 53;
  keyValue('DNMT3A', profile.DNMT3A === null ? 'Not asked for this pathway' : profile.DNMT3A ? 'Detected' : 'Not detected', right, colWidth);
  y = Math.max(y, afterContext);
  keyValue('Age', profile.age ? `${profile.age} years` : 'Not provided', left, colWidth);
  const afterAge = y;
  y -= 53;
  keyValue('MRD status', profile.mrd ? profile.mrd : 'Not assessed', right, colWidth);
  y = Math.max(y, afterAge);

  section('ELN Derivation');
  bulletList((eln.derivation || []).map((line) => line.replace(/^Step \d+:?\s*/, '').replace(/^Final ELN 2022 risk:\s*/, 'Final risk: ')), page.margin, page.width - page.margin * 2);

  section('Clinical Safety Note');
  addWrapped(
    'This export is an educational decision-support artefact. It must not replace specialist multidisciplinary review, patient-specific assessment, local protocols, or current prescribing information.',
    page.margin,
    page.width - page.margin * 2,
    10,
    colours.muted,
    'normal',
    13
  );
  y += 10;
  setText(8, colours.muted);
  doc.text(`Generated: ${new Date().toLocaleString()}`, page.margin, y);

  addFooter();
  const safeCase = matched ? `case-${String(matched.number).padStart(2, '0')}` : 'no-exact-match';
  doc.save(`aml-treatment-explorer-${safeCase}.pdf`);
}

function getSummary(profile, eln) {
  return {
    markers: [...MARKERS.filter(([key]) => profile[key]).map(([, label]) => label), ...(profile.NPM1 || profile.TP53 || profile.DDX41 || profile.CEBPA_bZIP ? [] : ['No defining mutation selected'])].join(', '),
    flt3: profile.flt3 ? `FLT3 ${profile.flt3 === 'none' ? 'not detected' : profile.flt3.toUpperCase()}` : null,
    cytogenetics: profile.cytogeneticsStatus === 'normal' ? 'Normal karyotype' : profile.cytogeneticsStatus === 'unavailable' ? 'Unavailable' : profile.cytogeneticsStatus === 'reported' ? `${profile.cytogeneticFindings.length} finding${profile.cytogeneticFindings.length === 1 ? '' : 's'} · ${eln.risk}` : null,
    saml: profile.samlGenes.length ? `${profile.samlGenes.length} sAML mutation${profile.samlGenes.length > 1 ? 's' : ''}` : 'No sAML mutations',
    context: profile.context ? { denovo: 'De novo AML', taml: 'Therapy-related AML', prior_mds: 'Prior MDS' }[profile.context] : null,
    dnmt3a: profile.DNMT3A === null ? null : `DNMT3A ${profile.DNMT3A ? 'detected' : 'not detected'}`,
    patient: profile.age ? `Age ${profile.age}${profile.mrd ? ` · MRD ${profile.mrd}` : ''}` : profile.mrd ? `MRD ${profile.mrd}` : 'Patient context optional',
  };
}

function whyCopy(stepKey) {
  return {
    markers: 'These defining mutations sit near the top of the decision tree and can override later cytogenetic or secondary-mutation branches.',
    flt3: 'FLT3-ITD and FLT3-TKD lead to different consensus cases and distinguish several targeted-treatment pathways.',
    cytogenetics: 'Cytogenetic category determines whether favourable, intermediate, adverse, KMT2A, complex-karyotype, or MECOM logic is evaluated.',
    saml: 'The consensus separates NPM1 and intermediate-cytogenetic cases according to whether zero, one, or at least two myelodysplasia-related mutations are present.',
    context: 'Therapy-related disease and AML arising after prior MDS or CMML have dedicated consensus branches; transformed MPN is shown but not yet selectable.',
    dnmt3a: 'DNMT3A specifically separates Cases 10 and 11 when NPM1 and FLT3-ITD coexist with normal or other non-adverse intermediate cytogenetics.',
    patient: 'Age selects the relevant transplant age band. MRD determines whether conditional “transplant if MRD-positive” recommendations apply.',
  }[stepKey];
}
