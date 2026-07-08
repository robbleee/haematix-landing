'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { jsPDF } from 'jspdf';
import { classifyEln2022 } from '../../lib/classifierEngine';
import {
  CYTOGENETIC_GROUPS,
  CYTOGENETIC_MODIFIERS,
  INITIAL_PROFILE,
  SAML_GENES,
  classifyCoats,
  deriveCoatsCytogenetics,
  getPrimaryCytogeneticKey,
  hasPrimaryCytogeneticFinding,
  isCytogeneticModifierDisabled,
  isCytogeneticOptionDisabled,
  selectTransplantGuidance,
  selectTransplantText,
  selectVenAzaText,
  toElnInput,
  toggleCytogeneticFinding as toggleCytogeneticFindingValue,
} from '../../lib/coatsExplorer';
import styles from './TreatmentExplorer.module.css';

const STEPS = [
  { key: 'markers', eyebrow: 'Defining genetics', title: 'Defining mutations', hint: 'Select every confirmed positive finding. Unselected markers will be treated as not detected.' },
  { key: 'flt3', eyebrow: 'FLT3 profile', title: 'FLT3 result', hint: 'Choose the most specific confirmed result.' },
  { key: 'cytogenetics', eyebrow: 'Cytogenetics', title: 'Cytogenetic findings', hint: 'Set the report status, then select every confirmed finding. ELN risk updates automatically.' },
  { key: 'saml', eyebrow: 'Myelodysplasia-related genetics', title: 'sAML-defining mutations', hint: 'Select any confirmed sAML-defining mutation. The current Coats lookup treats this as present or absent.' },
  { key: 'context', eyebrow: 'Disease context', title: 'Disease context', hint: 'Choose the best-supported clinical history.' },
  { key: 'dnmt3a', eyebrow: 'Refining marker', title: 'DNMT3A status', hint: 'This separates the two NPM1 + FLT3-ITD consensus pathways.' },
  { key: 'patient', eyebrow: 'Patient context', title: 'Age and MRD status', hint: 'These refine the transplant context; they do not change the matched consensus case.' },
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
  const [cytoModifierPromptOpen, setCytoModifierPromptOpen] = useState(false);
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
  const toggleCytogeneticFinding = (finding) => {
    const wasSelected = profile.cytogeneticFindings.includes(finding);
    const cytogeneticFindings = toggleCytogeneticFindingValue(profile.cytogeneticFindings, finding);
    const nextProfile = { ...profile, cytogeneticFindings };
    setProfile(nextProfile);
    if (CYTOGENETIC_MODIFIERS.some((modifier) => modifier.key === finding)) {
      setCytoModifierPromptOpen(true);
      return;
    }
    const openedPrimary = !wasSelected && getPrimaryCytogeneticKey(nextProfile) === finding && !isCytogeneticModifierDisabled(nextProfile);
    setCytoModifierPromptOpen(openedPrimary);
  };
  const clearCytogeneticModifiers = () => {
    const modifierKeys = new Set(CYTOGENETIC_MODIFIERS.map((modifier) => modifier.key));
    setProfile((current) => ({ ...current, cytogeneticFindings: current.cytogeneticFindings.filter((finding) => !modifierKeys.has(finding)) }));
    setCytoModifierPromptOpen(false);
  };
  const setCytogeneticsStatus = (status) => {
    setProfile((current) => ({ ...current, cytogeneticsStatus: status, cytogeneticFindings: status === 'reported' ? current.cytogeneticFindings : [] }));
    setCytoModifierPromptOpen(false);
  };
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
    setCytoModifierPromptOpen(false);
    setStep((s) => s + 1);
  };
  const back = () => { setDirection('back'); setShowWhy(false); setCytoModifierPromptOpen(false); setStep((s) => Math.max(0, s - 1)); };
  const reset = () => {
    trackExplorerEvent(sessionId, 'reset', buildTelemetryProfile(profile, matched, eln));
    resultTrackedRef.current = null;
    setProfile(INITIAL_PROFILE);
    setDirection('back');
    setShowWhy(false);
    setShowElnWhy(false);
    setCytoModifierPromptOpen(false);
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
              <span className={styles.pathCopy}><strong>Consensus match</strong><small>{isResult ? matched ? consensusDisplayLabel(matched) : 'No exact match' : 'Waiting'}</small></span>
            </div>
          </div>
          <div className={styles.panelLinks}>
            <a href="/aml-treatment-explorer/algorithm">Algorithm sheet</a>
            <a href="/" aria-label="Back to haem.io home">← haem.io home</a>
          </div>
        </aside>

        <div className={styles.questionPanel}>
          {!isResult ? <div className={`${styles.questionInner} ${currentStep.key === 'cytogenetics' ? styles.compactStep : ''}`}>
            <div className={styles.progressRow}><span>Step {String(step + 1).padStart(2, '0')}</span><div className={styles.progressTrack}><i style={{width: `${((step + 1) / activeSteps.length) * 100}%`}}/></div><span>{activeSteps.length}</span></div>
            <div key={step} className={`${styles.slideContent} ${direction === 'back' ? styles.slideBack : styles.slideForward}`}>
            <div className={styles.questionHeader}><h2>{currentStep.title}</h2><p>{currentStep.hint}</p></div>

            {currentStep.key === 'markers' && <div className={styles.markerGrid}>{MARKERS.map(([key, label]) => <button key={key} onClick={() => update(key, !profile[key])} className={`${styles.markerCard} ${profile[key] ? styles.selected : ''}`}><span className={styles.selectMark}>{profile[key] ? '✓' : '+'}</span><strong>{label}</strong><small>{profile[key] ? 'Detected' : 'Not detected'}</small></button>)}</div>}
            {currentStep.key === 'flt3' && <ChoiceGrid value={profile.flt3} onChange={(v) => update('flt3', v)} choices={[[ 'none','Not detected','Neither ITD nor TKD'],['itd','FLT3-ITD','Internal tandem duplication'],['tkd','FLT3-TKD','Tyrosine kinase domain'],['both','Both','ITD and TKD detected']]}/>}
            {currentStep.key === 'cytogenetics' && <CytogeneticsSelector profile={profile} onStatus={setCytogeneticsStatus} onToggle={toggleCytogeneticFinding} onOpenModifiers={() => setCytoModifierPromptOpen(true)}/>}
            {currentStep.key === 'cytogenetics' && cytoModifierPromptOpen && <CytogeneticModifierModal profile={profile} onToggle={toggleCytogeneticFinding} onClear={clearCytogeneticModifiers} onClose={() => setCytoModifierPromptOpen(false)}/>}
            {currentStep.key === 'saml' && <><div className={styles.countBadge}><span>{profile.samlGenes.length}</span><div><strong>selected</strong><small>{profile.samlGenes.length === 0 ? 'sAML flag absent' : 'sAML flag present'}</small></div></div><div className={styles.geneGrid}>{SAML_GENES.map((gene) => <button key={gene} onClick={() => toggleGene(gene)} className={profile.samlGenes.includes(gene) ? styles.geneSelected : ''}><span>{profile.samlGenes.includes(gene) ? '✓' : '+'}</span>{gene}</button>)}</div></>}
            {currentStep.key === 'context' && <ChoiceGrid value={profile.context} onChange={(v) => update('context', v)} choices={CONTEXT_CHOICES}/>}
            {currentStep.key === 'dnmt3a' && <div className={styles.binaryWrap}><button onClick={() => update('DNMT3A', true)} className={profile.DNMT3A === true ? styles.binarySelected : ''}><span>+</span><strong>Detected</strong><small>DNMT3A mutation present</small></button><button onClick={() => update('DNMT3A', false)} className={profile.DNMT3A === false ? styles.binarySelected : ''}><span>−</span><strong>Not detected</strong><small>Wild-type DNMT3A</small></button></div>}
            {currentStep.key === 'patient' && <div className={styles.patientStack}><div className={styles.patientGrid}><label><span>Age <small>optional</small></span><div className={styles.inputWrap}><input value={profile.age} onChange={(e) => update('age', e.target.value.replace(/\D/g, '').slice(0,3))} inputMode="numeric" placeholder="e.g. 54"/><em>years</em></div></label><div><span className={styles.fieldLabel}>MRD status <small>optional</small></span><div className={styles.segmented}>{[['positive','Positive'],['negative','Negative'],['unknown','Not assessed']].map(([v,l]) => <button key={v} onClick={() => update('mrd', v)} className={profile.mrd === v ? styles.segmentActive : ''}>{l}</button>)}</div></div></div>{Number(profile.age || 0) >= 60 && <div><span className={styles.fieldLabel}>AML60+ risk <small>optional</small></span><div className={styles.segmented}>{[[null,'Not set'],['favourable','Favourable'],['intermediate_poor','Intermediate / poor']].map(([v,l]) => <button key={v || 'unset'} onClick={() => update('aml60Risk', v)} className={profile.aml60Risk === v ? styles.segmentActive : ''}>{l}</button>)}</div></div>}</div>}

            {profile.cytogeneticsStatus && <ElnBadge eln={eln} provisional={profile.cytogeneticsStatus === 'unavailable'} expanded={showElnWhy} onToggle={() => setShowElnWhy((value) => !value)}/>}

            <button className={styles.whyButton} onClick={() => setShowWhy(!showWhy)}><span>i</span>Why this matters<svg className={showWhy ? styles.rotated : ''} viewBox="0 0 20 20"><path d="m6 8 4 4 4-4"/></svg></button>
            {showWhy && <div className={styles.whyBox}>{whyCopy(currentStep.key)}</div>}
            <div className={styles.actions}>{step > 0 ? <button className={styles.backButton} onClick={back}>← Back</button> : <span/>}<button disabled={!canContinue} className={styles.continueButton} onClick={next}>{step === activeSteps.length - 1 ? 'Reveal consensus match' : 'Continue'}<span>→</span></button></div>
            </div>
          </div> : <Result matched={matched} profile={profile} eln={eln} provisional={profile.cytogeneticsStatus === 'unavailable'} sessionId={sessionId} onBack={back} onReset={reset}/>}
        </div>
      </section>

      <section className={styles.disclaimer}><div className={styles.disclaimerIcon}>!</div><div><strong>Clinical context required</strong><p>This is not a medical device and does not provide medical advice. It reflects Delphi poll outputs only and should be interpreted in the context of the individual patient, current evidence, local protocols, prescribing information, funding context, and MDT discussion.</p></div></section>
    </main>
  );
}

function ChoiceGrid({ choices, value, onChange, wide = false }) {
  return <div className={`${styles.choiceGrid} ${wide ? styles.choiceGridWide : ''}`}>{choices.map(([key,label,desc,meta = {}]) => <button key={key} disabled={meta.disabled} onClick={() => !meta.disabled && onChange(key)} className={`${value === key ? styles.choiceSelected : ''} ${meta.disabled ? styles.choiceDisabled : ''}`}><span className={styles.radio}><i/></span><span><strong>{label}</strong><small>{desc}</small>{meta.disabled && <em>Not selectable</em>}</span></button>)}</div>;
}

function CytogeneticsSelector({ profile, onStatus, onToggle, onOpenModifiers }) {
  const statuses = [
    ['reported', 'Cytogenetic result available', 'Select the matching group below'],
    ['unavailable', 'Unavailable', 'Pending, failed, or not performed'],
  ];
  const canUseModifiers = profile.cytogeneticsStatus === 'reported' && !isCytogeneticModifierDisabled(profile);
  const selectedModifiers = CYTOGENETIC_MODIFIERS.filter((modifier) => profile.cytogeneticFindings.includes(modifier.key));
  return <div className={styles.cytoSelector}>
    <div className={styles.statusGrid}>{statuses.map(([key, label, description]) => <button key={key} onClick={() => onStatus(key)} className={profile.cytogeneticsStatus === key ? styles.statusSelected : ''}><span className={styles.radio}><i/></span><span><strong>{label}</strong><small>{description}</small></span></button>)}</div>
    {profile.cytogeneticsStatus === 'reported' && <div className={styles.cytoGroups}>{CYTOGENETIC_GROUPS.map((group) => <section key={group.label} className={styles.cytoGroup} data-tone={group.tone}><div className={styles.cytoGroupTitle}><span/>{group.label}</div><div className={styles.cytoGrid}>{group.findings.map((finding) => {
      const selected = profile.cytogeneticFindings.includes(finding.key);
      const disabled = isCytogeneticOptionDisabled(profile, finding);
      return <div key={finding.key} className={styles.cytoRow}>
        <button aria-pressed={selected} disabled={disabled} onClick={() => !disabled && onToggle(finding.key)} className={`${selected ? styles.cytoSelected : ''} ${disabled ? styles.cytoDisabled : ''}`}>
          <span className={styles.cytoCheck}>{selected ? '✓' : disabled ? '–' : '+'}</span>
          <span><strong>{finding.label}</strong><small>{finding.description}</small>{finding.disabled && <em>{finding.disabledReason || 'Not yet surveyed'}</em>}{disabled && !finding.disabled && <em>Clear the selected cytogenetic group to choose this instead</em>}</span>
        </button>
      </div>;
    })}</div></section>)}
      {canUseModifiers && <section className={styles.cytoModifierSummary}><div><span>Karyotype follow-up</span><strong>{selectedModifiers.length ? selectedModifiers.map((modifier) => modifier.label).join(', ') : 'No complex or monosomal modifier selected'}</strong><small>Asked separately because this should not replace the primary cytogenetic branch.</small></div><button onClick={onOpenModifiers}>{selectedModifiers.length ? 'Edit' : 'Answer'}</button></section>}
    </div>}
    {profile.cytogeneticsStatus === 'reported' && profile.cytogeneticFindings.length === 0 && <p className={styles.emptyFindingNote}>Select Normal or the closest reported cytogenetic group to continue.</p>}
    {profile.cytogeneticsStatus === 'unavailable' && <p className={styles.unavailableNote}>A provisional molecular ELN result can be shown, but no cytogenetic finding will be assumed absent and no Coats case will be forced.</p>}
  </div>;
}

function CytogeneticModifierModal({ profile, onToggle, onClear, onClose }) {
  return <div className={styles.modalBackdrop} role="presentation" onClick={onClose}>
    <div className={styles.cytoModal} role="dialog" aria-modal="true" aria-labelledby="cyto-modifier-title" onClick={(event) => event.stopPropagation()}>
      <span className={styles.modalEyebrow}>Cytogenetic follow-up</span>
      <h3 id="cyto-modifier-title">Does the report also show complex or monosomal karyotype?</h3>
      <p>Use this only if the report states complex karyotype, three or more cytogenetic abnormalities, or monosomal karyotype. It is not asked for the non-adverse trisomy or multiple-trisomy branch.</p>
      <div className={styles.modifierChoices}>{CYTOGENETIC_MODIFIERS.map((modifier) => {
        const selected = profile.cytogeneticFindings.includes(modifier.key);
        return <button key={modifier.key} aria-pressed={selected} onClick={() => onToggle(modifier.key)} className={selected ? styles.modifierSelected : ''}>
          <span>{selected ? '✓' : '+'}</span>
          <strong>{modifier.label}</strong>
          <small>{modifier.description}</small>
        </button>;
      })}</div>
      <div className={styles.modalActions}><button className={styles.modalSecondary} onClick={onClear}>Neither / not reported</button><button className={styles.modalPrimary} onClick={onClose}>Done</button></div>
    </div>
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
  if (!matched) return <div className={styles.noMatch}>
    <SourceWarning/>
    <div className={styles.noMatchPanel}>
      <div className={styles.noMatchMark}>!</div>
      <div>
        <span>Review pathway</span>
        <h2>No surveyed consensus match</h2>
        <p>This input combination is not directly covered by the current Coats-Delphi lookup, or cytogenetics are incomplete. The explorer therefore has not extrapolated a treatment recommendation.</p>
      </div>
    </div>
    <div className={styles.noMatchGrid}>
      <DecisionTrace profile={profile} matched={matched} eln={eln}/>
      <ElnBadge eln={eln} provisional={provisional} expanded={showResultEln} onToggle={() => setShowResultEln((value) => !value)}/>
    </div>
    {pdfError && <p className={styles.pdfError}>{pdfError}</p>}
    <div className={styles.resultActions}><button onClick={onBack}>← Review answers</button><button className={styles.pdfButton} onClick={onExportPdf} disabled={exportingPdf}>{exportingPdf ? 'Preparing PDF…' : 'Export PDF'}</button><button onClick={onReset}>Start a new pathway</button></div>
  </div>;
  const noConsensus = matched.preferred.toLowerCase().includes('no consensus');
  const transplantGuidance = selectTransplantGuidance(matched, profile);
  const venAza = selectVenAzaText(matched, profile);
  return <div className={styles.resultWrap}>
    <SourceWarning/>
    <div className={styles.resultTop}><div className={styles.resultSeal}><span>{matched.scenario ? 'Scenario' : 'Lookup'}</span><strong>{String(matched.number).padStart(2,'0')}</strong></div><div><span className={styles.resultEyebrow}>Consensus pathway matched</span><h2>{matched.name}</h2><p>{matched.incidence} of AML cases · workbook row {matched.lookupRow}</p></div></div>
    {matched.borrowedFrom && <SimilarCaseNotice matched={matched} noConsensus={noConsensus}/>}
    <div className={`${styles.treatmentHero} ${noConsensus ? styles.consensusAmber : ''}`}><div><span>Preferred consensus treatment</span><h3>{matched.preferred}</h3>{matched.preferredStrength && <p>{matched.preferredStrength}</p>}</div><span className={styles.matchPill}>{noConsensus ? 'MDT decision' : matched.preferredStrength || 'Primary pathway'}</span></div>
    <ReasonableTreatments matched={matched}/>
    <DecisionTrace profile={profile} matched={matched} eln={eln}/>
    <ElnBadge eln={eln} provisional={provisional} expanded={showResultEln} onToggle={() => setShowResultEln((value) => !value)}/>
    <div className={styles.resultColumns}><div className={styles.resultCard}><span>Reasoning path</span><ol>{matched.reasons.map((reason,i) => <li key={reason}><i>{i+1}</i>{reason}</li>)}</ol></div><div className={styles.resultStack}><TransplantGuidance guidance={transplantGuidance}/>{venAza && <div className={styles.miniCard}><span>Non-intensive option</span><RecommendationText value={venAza}/></div>}</div></div>
    <div className={styles.detailGrid}>
      {matched.ageImpact && <InfoCard label="Impact of age" value={matched.ageImpact}/>}
      {matched.nonNhsAlternatives && <InfoCard label="Non-NHS funded alternatives" value={matched.nonNhsAlternatives}/>}
      {matched.trial && <InfoCard label="Specific trial options" value={matched.trial}/>}
      {matched.expertComment && <InfoCard label="Expert comment" value={matched.expertComment}/>}
      {matched.comment && <InfoCard label="Consensus rationale" value={matched.comment}/>}
    </div>
    {pdfError && <p className={styles.pdfError}>{pdfError}</p>}
    <div className={styles.resultFooter}><button onClick={onBack}>← Review answers</button><button className={styles.pdfButton} onClick={onExportPdf} disabled={exportingPdf}>{exportingPdf ? 'Preparing PDF…' : 'Export PDF'}</button><button onClick={onReset}>Start a new pathway ↗</button></div>
  </div>;
}

function RecommendationText({ value }) {
  return <p>{String(value || '').split('\n').map((line, index) => <span key={`${line}-${index}`}>{line}{index < String(value || '').split('\n').length - 1 && <br/>}</span>)}</p>;
}

function SourceWarning() {
  return <div className={styles.sourceWarning}><strong>Reference lookup only</strong><p>This page is a searchable view of the source Delphi poll spreadsheet, filtered by the inputs provided. It is not a standalone treatment recommendation or medical device output. Check the source row before using the result in discussion.</p><a href="/aml-delphi-source-lookup.xlsx" download>Download source spreadsheet</a></div>;
}

function SimilarCaseNotice({ matched, noConsensus }) {
  const title = noConsensus ? 'Similar-case consensus position' : 'Similar-case recommendation';
  const body = noConsensus
    ? `The Delphi poll lookup records this exact combination but does not provide direct treatment fields. It is mapped to ${matched.borrowedFrom.name} for the consensus position and row-specific expert comment; that source case did not reach a preferred-treatment consensus.`
    : `The Delphi poll lookup records this exact combination but does not provide direct treatment fields. The treatment recommendation below is borrowed from ${matched.borrowedFrom.name} with the row-specific expert comment retained.`;
  return <div className={styles.borrowedNotice}><strong>{title}</strong><p>{body}</p></div>;
}

function similarCaseSourceText(matched) {
  if (!matched?.borrowedFrom) return '';
  return isPreferredNoConsensus(matched)
    ? `Consensus position mapped to ${matched.borrowedFrom.name}; no preferred-treatment consensus was reached in that source case.`
    : `Recommendation borrowed from ${matched.borrowedFrom.name}.`;
}

function isPreferredNoConsensus(matched) {
  return Boolean(matched?.preferred && matched.preferred.toLowerCase().includes('no consensus'));
}

function ReasonableTreatments({ matched }) {
  const rationale = reasonableTreatmentRationale(matched);
  return <div className={`${styles.miniCard} ${styles.reasonablePanel}`}><span>Reasonable treatments</span><div className={styles.chips}>{matched.alternativeTreatments.length ? matched.alternativeTreatments.map((item) => <i key={`${item.treatment}-${item.strength || ''}`}>{item.treatment}{item.strength && <small>{item.strength}</small>}</i>) : <i>No alternatives recorded</i>}</div>{rationale && <p className={styles.treatmentRationale}><strong>Reasoning:</strong> {rationale}</p>}</div>;
}

function TransplantGuidance({ guidance }) {
  const branches = Array.isArray(guidance) && guidance.length ? guidance : [{ label: 'Transplant consensus', value: 'No transplant consensus recorded in the lookup table.', tone: 'general' }];
  return <div className={styles.miniCard}><span>MRD-directed transplant guidance</span><div className={styles.mrdGuidance}>{branches.map((item, index) => <div className={`${styles.mrdBranch} ${styles[`mrdBranch_${item.tone || 'general'}`] || ''}`} key={`${item.label || 'branch'}-${index}`}><strong>{item.label || 'Transplant guidance'}</strong><RecommendationText value={item.value}/></div>)}</div></div>;
}

function InfoCard({ label, value }) {
  return <div className={styles.miniCard}><span>{label}</span><RecommendationText value={value}/></div>;
}

function canContinueFromStep(stepKey, profile) {
  if (stepKey === 'flt3') return Boolean(profile.flt3);
  if (stepKey === 'cytogenetics') return profile.cytogeneticsStatus === 'unavailable' || (profile.cytogeneticsStatus === 'reported' && hasPrimaryCytogeneticFinding(profile));
  if (stepKey === 'context') return Boolean(profile.context);
  if (stepKey === 'dnmt3a') return profile.DNMT3A !== null;
  return true;
}

function shouldAskDnmt3a(profile) {
  const selected = new Set(profile.cytogeneticFindings || []);
  const intermediateCytogenetics = profile.cytogeneticsStatus === 'normal' || selected.has('normal') || selected.has('other_non_adverse');
  return Boolean(profile.NPM1 && ['itd', 'both'].includes(profile.flt3) && intermediateCytogenetics);
}

function reasonableTreatmentRationale(matched) {
  const source = matched?.comment || matched?.expertComment || '';
  if (!source) return '';
  const terms = (matched.alternativeTreatments || [])
    .flatMap((item) => [item.treatment, item.treatment?.replace(/\s+/g, ''), item.treatment?.replace(/CPX-351/i, 'CPX')])
    .filter(Boolean)
    .map((term) => term.toLowerCase());
  const sentences = source
    .replace(/\s+/g, ' ')
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
  const treatmentSentences = sentences.filter((sentence) => !/MRD|transplant|allogeneic|alloSCT|allo-SCT|SCT|consolidat/i.test(sentence));
  const picked = treatmentSentences.filter((sentence) => {
    const normalised = sentence.toLowerCase().replace(/\s+/g, '');
    return terms.some((term) => normalised.includes(term.replace(/\s+/g, ''))) || /alternative|reasonable|some experts|some participants|preference|favou?r|no consensus/i.test(sentence);
  });
  return (picked.length ? picked : treatmentSentences).slice(0, 2).join(' ');
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
    value: matched ? consensusDisplayLabel(matched) : 'No exact consensus case',
    detail: matched?.borrowedFrom ? similarCaseSourceText(matched) : matched ? matched.name : 'No surveyed case matched this exact combination.',
  });

  return nodes;
}

function consensusDisplayLabel(matched) {
  if (!matched) return 'No exact consensus case';
  return matched.scenario ? `Scenario ${String(matched.scenario).padStart(2, '0')}` : `Lookup row ${matched.lookupRow}`;
}

function getCytogeneticTraceLabel(profile) {
  if (profile.cytogeneticsStatus === 'unavailable') return 'Unavailable';
  const selected = new Set(profile.cytogeneticFindings || []);
  if (!selected.size) return 'No cytogenetic group selected';

  const primaryFindings = CYTOGENETIC_GROUPS
    .flatMap((group) => group.findings)
    .filter((finding) => selected.has(finding.key))
    .map((finding) => finding.label);
  const adjuncts = CYTOGENETIC_MODIFIERS
    .filter((modifier) => selected.has(modifier.key))
    .map((modifier) => modifier.label);

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
  });
  CYTOGENETIC_MODIFIERS.forEach((modifier) => {
    if (selected.has(modifier.key)) labels.push(`${modifier.label}${modifier.description ? ` (${modifier.description})` : ''}`);
  });
  return labels.length ? labels : ['No cytogenetic group selected'];
}

function buildTelemetryProfile(profile, matched, eln) {
  return {
    version: 'coats-delphi-v1',
    outcome: matched ? 'matched' : 'no_exact_match',
    case_number: matched?.number || null,
    case_id: matched?.caseId || null,
    borrowed_from_case: matched?.borrowedFrom?.scenario || null,
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
    aml60_risk: profile.aml60Risk || null,
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

  const text = (value) => (
    value === null || value === undefined || value === ''
      ? 'Not provided'
      : String(value).replace(/[\u2012-\u2015]/g, '-').replace(/\u00b7/g, '-')
  );
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
  const wrappedLines = (value, width) => doc.splitTextToSize(text(value), width);
  const keyValueHeight = (value, width) => wrappedLines(value, width).length * 13 + 19;
  const drawKeyValueAt = (label, value, x, startY, width) => {
    setText(8, colours.muted, 'bold');
    doc.text(text(label).toUpperCase(), x, startY);
    setText(10, colours.ink, 'bold');
    doc.text(wrappedLines(value, width), x, startY + 13);
  };
  const section = (title, minHeight = 36) => {
    ensureSpace(minHeight);
    y += 12;
    setText(9, colours.teal, 'bold');
    doc.text(title.toUpperCase(), page.margin, y);
    y += 11;
    doc.setDrawColor(...colours.line);
    doc.line(page.margin, y, page.width - page.margin, y);
    y += 16;
  };
  const keyValue = (label, value, x, width) => {
    const height = keyValueHeight(value, width);
    ensureSpace(height);
    drawKeyValueAt(label, value, x, y, width);
    y += height + 5;
  };
  const twoColumnRow = (leftLabel, leftValue, rightLabel, rightValue) => {
    const leftHeight = keyValueHeight(leftValue, colWidth);
    const rightHeight = keyValueHeight(rightValue, colWidth);
    const rowHeight = Math.max(leftHeight, rightHeight);
    ensureSpace(rowHeight + 8);
    const rowY = y;
    drawKeyValueAt(leftLabel, leftValue, left, rowY, colWidth);
    drawKeyValueAt(rightLabel, rightValue, right, rowY, colWidth);
    y += rowHeight + 12;
  };
  const bulletList = (items, x, width) => {
    const list = items?.length ? items : ['None recorded'];
    list.forEach((item) => {
      const lines = wrappedLines(item, width - 14);
      const itemHeight = lines.length * 12 + 7;
      ensureSpace(itemHeight);
      setText(10, colours.teal, 'bold');
      doc.text('-', x, y);
      setText(9.5, colours.ink);
      doc.text(lines, x + 14, y);
      y += itemHeight;
    });
  };
  const numberedList = (items, x, width) => {
    const list = items?.length ? items : ['None recorded'];
    list.forEach((item, index) => {
      const lines = wrappedLines(item, width - 28);
      const itemHeight = lines.length * 12 + 8;
      ensureSpace(itemHeight);
      setText(8, [255, 255, 255], 'bold');
      doc.setFillColor(...colours.teal);
      doc.roundedRect(x, y - 8, 15, 15, 4, 4, 'F');
      doc.text(String(index + 1), x + 5, y + 3);
      setText(9.5, colours.ink);
      doc.text(lines, x + 25, y);
      y += itemHeight;
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
  const caseLabel = consensusDisplayLabel(matched);
  setText(9, colours.teal, 'bold');
  doc.text(caseLabel.toUpperCase(), page.margin + 18, y + 22);
  setText(16, colours.ink, 'bold');
  doc.text(doc.splitTextToSize(matched?.name || 'No exact consensus case matched', page.width - page.margin * 2 - 36), page.margin + 18, y + 42);
  y += 98;

  section('Consensus Output');
  const left = page.margin;
  const right = page.margin + 260;
  const colWidth = 226;
  const transplantConsensus = matched ? selectTransplantText(matched, profile) : 'Specialist MDT review recommended.';
  const venAzaGuidance = matched ? selectVenAzaText(matched, profile) : null;
  twoColumnRow(
    'Preferred consensus treatment',
    matched ? `${matched.preferred}${matched.preferredStrength ? ` (${matched.preferredStrength})` : ''}` : 'No exact consensus treatment matched',
    'ELN 2022 risk context',
    `${provisional ? 'Provisional ' : ''}${eln.risk}`
  );
  twoColumnRow(
    'Incidence',
    matched?.incidence || 'Not applicable',
    'Transplant consensus',
    transplantConsensus
  );
  if (matched?.alternativeTreatments?.length) keyValue('Reasonable treatments', matched.alternativeTreatments.map((item) => `${item.treatment}${item.strength ? ` (${item.strength})` : ''}`).join('; '), left, page.width - page.margin * 2);
  if (matched?.ageImpact) keyValue('Impact of age on decision', matched.ageImpact, left, page.width - page.margin * 2);
  if (venAzaGuidance) keyValue('Ven-Aza / non-intensive guidance', venAzaGuidance, left, page.width - page.margin * 2);
  if (matched?.nonNhsAlternatives) keyValue('Non-NHS funded alternatives', matched.nonNhsAlternatives, left, page.width - page.margin * 2);
  if (matched?.trial) keyValue('Specific trial options', matched.trial, left, page.width - page.margin * 2);
  if (matched?.borrowedFrom) keyValue('Similar-case source', similarCaseSourceText(matched), left, page.width - page.margin * 2);
  if (matched?.expertComment) keyValue('Expert comment', matched.expertComment, left, page.width - page.margin * 2);

  section('Decision Trace');
  numberedList(getDecisionTrace(profile, matched, eln).map((node) => `${node.label}: ${node.value}${node.detail ? ` - ${node.detail}` : ''}`), page.margin, page.width - page.margin * 2);

  if (matched?.reasons?.length) {
    section('Matched Branch Evidence');
    bulletList(matched.reasons, page.margin, page.width - page.margin * 2);
  }

  section('Selected Inputs', 285);
  twoColumnRow(
    'Defining genetics',
    selectedMarkerLabels(profile).join(', ') || 'No defining marker selected',
    'FLT3 result',
    getFlt3Label(profile.flt3)
  );
  keyValue('Cytogenetics', cytogeneticLabels(profile).join('; '), left, page.width - page.margin * 2);
  keyValue('MDS-related mutation genes', profile.samlGenes.join(', ') || 'None selected', left, page.width - page.margin * 2);
  twoColumnRow(
    'Disease context',
    getContextLabel(profile.context),
    'DNMT3A',
    profile.DNMT3A === null ? 'Not asked for this pathway' : profile.DNMT3A ? 'Detected' : 'Not detected'
  );
  twoColumnRow(
    'Age',
    profile.age ? `${profile.age} years` : 'Not provided',
    'MRD status',
    profile.mrd ? profile.mrd : 'Not assessed'
  );
  if (Number(profile.age || 0) >= 60) keyValue('AML60+ risk', profile.aml60Risk ? profile.aml60Risk.replace('_', '/') : 'Not provided', left, page.width - page.margin * 2);

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
  const safeLabel = consensusDisplayLabel(matched).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  doc.save(`aml-treatment-explorer-${safeLabel}.pdf`);
}

function getSummary(profile, eln) {
  return {
    markers: [...MARKERS.filter(([key]) => profile[key]).map(([, label]) => label), ...(profile.NPM1 || profile.TP53 || profile.DDX41 || profile.CEBPA_bZIP ? [] : ['No defining mutation selected'])].join(', '),
    flt3: profile.flt3 ? `FLT3 ${profile.flt3 === 'none' ? 'not detected' : profile.flt3.toUpperCase()}` : null,
    cytogenetics: profile.cytogeneticsStatus === 'normal' ? 'Normal karyotype' : profile.cytogeneticsStatus === 'unavailable' ? 'Unavailable' : profile.cytogeneticsStatus === 'reported' ? `${profile.cytogeneticFindings.length} finding${profile.cytogeneticFindings.length === 1 ? '' : 's'} · ${eln.risk}` : null,
    saml: profile.samlGenes.length ? `${profile.samlGenes.length} sAML mutation${profile.samlGenes.length > 1 ? 's' : ''}` : 'No sAML mutations',
    context: profile.context ? { denovo: 'De novo AML', taml: 'Therapy-related AML', prior_mds: 'Prior MDS' }[profile.context] : null,
    dnmt3a: profile.DNMT3A === null ? null : `DNMT3A ${profile.DNMT3A ? 'detected' : 'not detected'}`,
    patient: profile.age ? `Age ${profile.age}${profile.mrd ? ` · MRD ${profile.mrd}` : ''}${profile.aml60Risk ? ` · AML60+ ${profile.aml60Risk.replace('_', '/')}` : ''}` : profile.mrd ? `MRD ${profile.mrd}` : 'Patient context optional',
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
