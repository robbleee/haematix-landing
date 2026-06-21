'use client';

import { useMemo, useState } from 'react';
import { INITIAL_PROFILE, SAML_GENES, classifyCoats, transplantText } from '../../lib/coatsExplorer';
import styles from './TreatmentExplorer.module.css';

const STEPS = [
  { key: 'markers', eyebrow: 'Defining genetics', title: 'Which defining mutations are present?', hint: 'Select every confirmed positive finding. Unselected markers will be treated as not detected.' },
  { key: 'flt3', eyebrow: 'FLT3 profile', title: 'What is the FLT3 result?', hint: 'Choose the most specific confirmed result.' },
  { key: 'cytogenetics', eyebrow: 'Cytogenetics', title: 'Which cytogenetic pathway applies?', hint: 'This choice is required. If it is not known, the explorer will not infer a treatment.' },
  { key: 'saml', eyebrow: 'Myelodysplasia-related genetics', title: 'Select any sAML-defining mutations', hint: 'The pathway distinguishes between zero, one, and two or more mutations.' },
  { key: 'context', eyebrow: 'Disease context', title: 'What is the disease context?', hint: 'Choose the best-supported clinical history.' },
  { key: 'dnmt3a', eyebrow: 'Refining marker', title: 'Is DNMT3A mutated?', hint: 'This separates the two NPM1 + FLT3-ITD consensus pathways.' },
  { key: 'patient', eyebrow: 'Patient context', title: 'Add age and MRD status', hint: 'These refine the transplant context; they do not change the matched consensus case.' },
];

const MARKERS = [
  ['NPM1', 'NPM1'], ['TP53', 'TP53'], ['DDX41', 'DDX41'], ['CEBPA_bZIP', 'CEBPA bZIP'],
];

const CYTO = [
  ['intermediate', 'Normal / intermediate', 'Normal karyotype or ELN intermediate'],
  ['cbf', 'Core binding factor', 't(8;21), inv(16), or t(16;16)'],
  ['t911', 't(9;11)', 'Specific KMT2A rearrangement'],
  ['kmt2a', 'Other KMT2A', 'MLL, 11q23, or other KMT2A rearrangement'],
  ['adverse', 'Other adverse', 'Adverse, del(5q), or monosomy 5'],
  ['complex', 'Complex karyotype', 'Three or more abnormalities'],
  ['complex_m7', 'Complex + monosomy 7', 'Complex karyotype containing −7'],
  ['m7', 'Monosomy 7', 'Without confirmed complex karyotype'],
  ['m5', 'Monosomy 5 / del(5q)', 'Adverse chromosome 5 abnormality'],
  ['mecom', 'GATA2::MECOM', 'inv(3), t(3;3), or 3q26'],
  ['other', 'Other / unclassified', 'No listed category applies'],
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
  const isResult = step === STEPS.length;
  const matched = useMemo(() => isResult ? classifyCoats(profile) : null, [isResult, profile]);

  const update = (key, value) => setProfile((current) => ({ ...current, [key]: value }));
  const toggleGene = (gene) => update('samlGenes', profile.samlGenes.includes(gene) ? profile.samlGenes.filter((g) => g !== gene) : [...profile.samlGenes, gene]);
  const canContinue = [true, Boolean(profile.flt3), Boolean(profile.cytogenetics), true, Boolean(profile.context), profile.DNMT3A !== null, true][step] ?? true;
  const next = () => { if (!canContinue) return; setDirection('forward'); setShowWhy(false); setStep((s) => s + 1); };
  const back = () => { setDirection('back'); setShowWhy(false); setStep((s) => Math.max(0, s - 1)); };
  const reset = () => { setProfile(INITIAL_PROFILE); setDirection('back'); setShowWhy(false); setStep(0); };

  const summary = [
    [...MARKERS.filter(([key]) => profile[key]).map(([, label]) => label), ...(profile.NPM1 || profile.TP53 || profile.DDX41 || profile.CEBPA_bZIP ? [] : ['No defining mutation selected'])].join(', '),
    profile.flt3 ? `FLT3 ${profile.flt3 === 'none' ? 'not detected' : profile.flt3.toUpperCase()}` : null,
    CYTO.find(([key]) => key === profile.cytogenetics)?.[1],
    profile.samlGenes.length ? `${profile.samlGenes.length} sAML mutation${profile.samlGenes.length > 1 ? 's' : ''}` : 'No sAML mutations',
    profile.context ? { denovo: 'De novo AML', saml: 'Secondary AML', taml: 'Therapy-related AML', prior_mds: 'Prior MDS' }[profile.context] : null,
    profile.DNMT3A === null ? null : `DNMT3A ${profile.DNMT3A ? 'detected' : 'not detected'}`,
    profile.age ? `Age ${profile.age}${profile.mrd ? ` · MRD ${profile.mrd}` : ''}` : profile.mrd ? `MRD ${profile.mrd}` : 'Patient context optional',
  ];

  return (
    <main className={styles.page}>
      <div className={styles.orbOne}/><div className={styles.orbTwo}/><div className={styles.gridTexture}/>
      <section className={styles.explorerShell}>
        <aside className={styles.pathPanel}>
          <div className={styles.panelTop}><span>Your pathway</span><button onClick={reset}>Reset</button></div>
          <div className={styles.pathList}>
            {STEPS.map((item, index) => {
              const status = index < step ? 'done' : index === step ? 'active' : 'future';
              return <button key={item.key} disabled={index > step} onClick={() => index < step && setStep(index)} className={`${styles.pathItem} ${styles[status]}`}>
                <span className={styles.pathIcon}>{status === 'done' ? <span className={styles.check}>✓</span> : <Icon name={item.key}/>}</span>
                <span className={styles.pathCopy}><strong>{item.eyebrow}</strong><small>{index < step ? summary[index] : index === step ? 'In progress' : 'Waiting'}</small></span>
                {index < STEPS.length - 1 && <span className={styles.pathLine}/>} 
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
            <div className={styles.progressRow}><span>Step {String(step + 1).padStart(2, '0')}</span><div className={styles.progressTrack}><i style={{width: `${((step + 1) / STEPS.length) * 100}%`}}/></div><span>{STEPS.length}</span></div>
            <div className={styles.questionHeader}><span>{STEPS[step].eyebrow}</span><h2>{STEPS[step].title}</h2><p>{STEPS[step].hint}</p></div>

            {step === 0 && <div className={styles.markerGrid}>{MARKERS.map(([key, label]) => <button key={key} onClick={() => update(key, !profile[key])} className={`${styles.markerCard} ${profile[key] ? styles.selected : ''}`}><span className={styles.selectMark}>{profile[key] ? '✓' : '+'}</span><strong>{label}</strong><small>{profile[key] ? 'Detected' : 'Not detected'}</small></button>)}</div>}
            {step === 1 && <ChoiceGrid value={profile.flt3} onChange={(v) => update('flt3', v)} choices={[[ 'none','Not detected','Neither ITD nor TKD'],['itd','FLT3-ITD','Internal tandem duplication'],['tkd','FLT3-TKD','Tyrosine kinase domain'],['both','Both','ITD and TKD detected']]}/>} 
            {step === 2 && <ChoiceGrid wide value={profile.cytogenetics} onChange={(v) => update('cytogenetics', v)} choices={CYTO}/>} 
            {step === 3 && <><div className={styles.countBadge}><span>{profile.samlGenes.length}</span><div><strong>selected</strong><small>{profile.samlGenes.length === 0 ? 'No defining mutations' : profile.samlGenes.length === 1 ? 'Single-mutation pathway' : '2+ mutation pathway'}</small></div></div><div className={styles.geneGrid}>{SAML_GENES.map((gene) => <button key={gene} onClick={() => toggleGene(gene)} className={profile.samlGenes.includes(gene) ? styles.geneSelected : ''}><span>{profile.samlGenes.includes(gene) ? '✓' : '+'}</span>{gene}</button>)}</div></>}
            {step === 4 && <ChoiceGrid value={profile.context} onChange={(v) => update('context', v)} choices={[[ 'denovo','De novo AML','No prior MDS/MPN or therapy'],['saml','Secondary AML','Arising from MDS or MPN'],['taml','Therapy-related AML','Following chemotherapy or radiotherapy'],['prior_mds','Prior MDS','Documented MDS preceding NPM1 AML']]}/>} 
            {step === 5 && <div className={styles.binaryWrap}><button onClick={() => update('DNMT3A', true)} className={profile.DNMT3A === true ? styles.binarySelected : ''}><span>+</span><strong>Detected</strong><small>DNMT3A mutation present</small></button><button onClick={() => update('DNMT3A', false)} className={profile.DNMT3A === false ? styles.binarySelected : ''}><span>−</span><strong>Not detected</strong><small>Wild-type DNMT3A</small></button></div>}
            {step === 6 && <div className={styles.patientGrid}><label><span>Age <small>optional</small></span><div className={styles.inputWrap}><input value={profile.age} onChange={(e) => update('age', e.target.value.replace(/\D/g, '').slice(0,3))} inputMode="numeric" placeholder="e.g. 54"/><em>years</em></div></label><div><span className={styles.fieldLabel}>MRD status <small>optional</small></span><div className={styles.segmented}>{[['positive','Positive'],['negative','Negative'],['unknown','Not assessed']].map(([v,l]) => <button key={v} onClick={() => update('mrd', v)} className={profile.mrd === v ? styles.segmentActive : ''}>{l}</button>)}</div></div></div>}

            <button className={styles.whyButton} onClick={() => setShowWhy(!showWhy)}><span>i</span>Why this matters<svg className={showWhy ? styles.rotated : ''} viewBox="0 0 20 20"><path d="m6 8 4 4 4-4"/></svg></button>
            {showWhy && <div className={styles.whyBox}>{whyCopy(step)}</div>}
            <div className={styles.actions}>{step > 0 ? <button className={styles.backButton} onClick={back}>← Back</button> : <span/>}<button disabled={!canContinue} className={styles.continueButton} onClick={next}>{step === STEPS.length - 1 ? 'Reveal consensus match' : 'Continue'}<span>→</span></button></div>
          </div> : <Result matched={matched} profile={profile} onBack={back} onReset={reset}/>} 
        </div>
      </section>

      <section className={styles.disclaimer}><div className={styles.disclaimerIcon}>!</div><div><strong>Clinical decision-support demonstration</strong><p>This explorer reproduces the current Coats–Delphi rule logic for educational demonstration. It does not provide medical advice and must not replace multidisciplinary review, patient assessment, local protocols, or current prescribing information.</p></div></section>
    </main>
  );
}

function ChoiceGrid({ choices, value, onChange, wide = false }) {
  return <div className={`${styles.choiceGrid} ${wide ? styles.choiceGridWide : ''}`}>{choices.map(([key,label,desc]) => <button key={key} onClick={() => onChange(key)} className={value === key ? styles.choiceSelected : ''}><span className={styles.radio}><i/></span><span><strong>{label}</strong><small>{desc}</small></span></button>)}</div>;
}

function Result({ matched, profile, onBack, onReset }) {
  if (!matched) return <div className={styles.noMatch}><div className={styles.noMatchIcon}>?</div><span>Pathway complete</span><h2>No exact consensus case matched</h2><p>This combination falls outside the 28 defined Coats–Delphi cases. It should be reviewed by a specialist multidisciplinary team rather than forced into a nearby branch.</p><div className={styles.resultActions}><button onClick={onBack}>← Review answers</button><button onClick={onReset}>Start a new pathway</button></div></div>;
  const noConsensus = matched.preferred === 'No consensus';
  return <div className={styles.resultWrap}>
    <div className={styles.resultTop}><div className={styles.resultSeal}><span>CASE</span><strong>{String(matched.number).padStart(2,'0')}</strong></div><div><span className={styles.resultEyebrow}>Consensus pathway matched</span><h2>{matched.name}</h2><p>{matched.incidence} of AML cases</p></div></div>
    <div className={`${styles.treatmentHero} ${noConsensus ? styles.consensusAmber : ''}`}><div><span>Preferred consensus treatment</span><h3>{matched.preferred}</h3></div><span className={styles.matchPill}>{noConsensus ? 'MDT decision' : 'Primary pathway'}</span></div>
    <div className={styles.resultColumns}><div className={styles.resultCard}><span>Reasoning path</span><ol>{matched.reasons.map((reason,i) => <li key={reason}><i>{i+1}</i>{reason}</li>)}</ol></div><div className={styles.resultStack}><div className={styles.miniCard}><span>Reasonable alternatives</span><div className={styles.chips}>{matched.alternatives.map((a) => <i key={a}>{a}</i>)}</div></div><div className={styles.miniCard}><span>Transplant consensus</span><p>{transplantText(matched.number, Number(profile.age || 0), profile.mrd)}</p></div>{matched.trial && <div className={styles.miniCard}><span>Relevant trial pathway</span><p>{matched.trial}</p></div>}</div></div>
    <div className={styles.resultFooter}><button onClick={onBack}>← Review answers</button><button onClick={onReset}>Start a new pathway ↗</button></div>
  </div>;
}

function whyCopy(step) {
  return [
    'These defining mutations sit near the top of the decision tree and can override later cytogenetic or secondary-mutation branches.',
    'FLT3-ITD and FLT3-TKD lead to different consensus cases and distinguish several targeted-treatment pathways.',
    'Cytogenetic category determines whether favourable, intermediate, adverse, KMT2A, complex-karyotype, or MECOM logic is evaluated.',
    'The consensus separates NPM1 and intermediate-cytogenetic cases according to whether zero, one, or at least two myelodysplasia-related mutations are present.',
    'Therapy-related disease, secondary AML, and AML arising after prior MDS each have dedicated consensus branches.',
    'DNMT3A specifically separates Cases 10 and 11 when NPM1 and FLT3-ITD coexist in an intermediate cytogenetic profile.',
    'Age selects the relevant transplant age band. MRD determines whether conditional “transplant if MRD-positive” recommendations apply.',
  ][step];
}
