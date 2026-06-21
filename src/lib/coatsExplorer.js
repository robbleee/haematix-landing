export const SAML_GENES = ['ASXL1', 'BCOR', 'EZH2', 'SF3B1', 'SRSF2', 'STAG2', 'U2AF1', 'ZRSR2', 'RUNX1'];

export const CASES = {
  1: ['CBF AML (Core Binding Factor)', '~10%', 'DA + GO', ['No other treatment considered reasonable'], null],
  2: ['NPM1 favourable risk', '~13%', 'DA + GO', ['FLAG-Ida'], 'VICTOR'],
  3: ['NPM1 favourable with FLT3-TKD', '~2.25%', 'DA + Midostaurin', ['DA + Midostaurin'], 'Optimise FLT3'],
  4: ['NPM1 with 1 secondary AML mutation', '~1.5%', 'DA + GO', ['FLAG-Ida'], 'VICTOR'],
  5: ['NPM1 with 2+ secondary AML mutations', '~0.15%', 'DA + GO', ['FLAG-Ida'], 'VICTOR'],
  6: ['NPM1 AML arising from prior MDS', '<1%', 'No consensus', ['DA + GO', 'CPX', 'FLAG-Ida'], null],
  7: ['Therapy-related AML with NPM1', '~0.75%', 'DA + GO', ['CPX', 'FLAG-Ida'], null],
  8: ['CEBPA bZIP mutation', '~7%', 'DA + GO', ['No other treatment considered reasonable'], null],
  9: ['Intermediate cytogenetics AML', '~1%', 'DA + GO', ['No consensus on alternatives'], null],
  10: ['Intermediate cytogenetics: NPM1 + FLT3-ITD, wild-type DNMT3A', '~7%', 'No consensus', ['DA + Midostaurin', 'DA + Quizartinib'], 'Optimise FLT3'],
  11: ['Intermediate cytogenetics: NPM1 + FLT3-ITD + DNMT3A', '~8%', 'DA + Quizartinib', ['DA + Midostaurin', 'DA + Quizartinib'], 'Optimise FLT3'],
  12: ['Intermediate cytogenetics with FLT3-ITD only', '~12%', 'No consensus', ['DA + Midostaurin', 'DA + Quizartinib'], 'Optimise FLT3'],
  13: ['Intermediate cytogenetics with FLT3-TKD', '~5%', 'DA + Midostaurin', ['No other treatment considered reasonable'], 'Optimise FLT3'],
  14: ['Intermediate cytogenetics with FLT3-ITD and TKD', '~1%', 'DA + Midostaurin', ['No consensus on alternatives'], 'Optimise FLT3'],
  15: ['Intermediate cytogenetics with therapy-related AML', '~5%', 'CPX', ['DA + GO'], null],
  16: ['t(9;11) KMT2A rearrangement', '~1%', 'FLAG-Ida', ['DA + GO', 'FLAG-Ida'], 'Menin inhibitor trials'],
  17: ['Adverse KMT2A rearrangement', '~1%', 'FLAG-Ida', ['No consensus on alternatives'], 'Menin inhibitor trials'],
  18: ['Complex karyotype with monosomy 7, wild-type TP53', '~4%', 'CPX', ['FLAG-Ida', 'CPX'], null],
  19: ['Complex karyotype with monosomy 7 and TP53 mutation', '~10%', 'No consensus', ['FLAG-Ida', 'CPX'], 'Any appropriate trial'],
  20: ['Intermediate cytogenetics with 1 secondary AML mutation', '~4%', 'No consensus', ['FLAG-Ida', 'CPX'], null],
  21: ['Intermediate cytogenetics with 2+ secondary AML mutations', '~8%', 'No consensus', ['FLAG-Ida', 'CPX'], null],
  22: ['Adverse karyotype with NPM1', '<1%', 'No consensus', ['FLAG-Ida', 'CPX'], null],
  23: ['Adverse karyotype with FLT3-ITD', '<1%', 'DA + Quizartinib', ['DA + Midostaurin'], 'Optimise FLT3'],
  24: ['Adverse karyotype with FLT3-TKD', '<1%', 'No consensus', ['DA + Midostaurin', 'CPX'], 'Optimise FLT3'],
  25: ['Secondary AML with FLT3-ITD', '<1%', 'DA + Quizartinib', ['DA + Midostaurin', 'DA + Quizartinib'], 'Optimise FLT3'],
  26: ['Secondary AML with FLT3-TKD', '<1%', 'DA + Midostaurin', ['CPX'], 'Optimise FLT3'],
  27: ['GATA2::MECOM rearrangement', '~2%', 'FLAG-Ida', ['No consensus on alternatives'], null],
  28: ['DDX41 mutation', '~5%', 'DA + GO', ['No consensus on alternatives'], null],
};

const result = (number, reasons) => {
  const [name, incidence, preferred, alternatives, trial] = CASES[number];
  return { number, name, incidence, preferred, alternatives, trial, reasons };
};

export function classifyCoats(p) {
  const reasons = [];
  const count = SAML_GENES.filter((gene) => p.samlGenes.includes(gene)).length;
  const intermediate = p.cytogenetics === 'intermediate';
  const adverse = ['adverse', 'complex', 'complex_m7', 'm7', 'm5', 'mecom'].includes(p.cytogenetics);
  const complex = p.cytogenetics === 'complex' || p.cytogenetics === 'complex_m7';
  const m7 = p.cytogenetics === 'complex_m7' || p.cytogenetics === 'm7';

  if (p.DDX41 && !p.TP53) return result(28, ['DDX41 detected', 'TP53 not detected', 'Highest-priority matching branch']);
  if (p.cytogenetics === 'cbf' && !p.DDX41 && !p.TP53) return result(1, ['Core binding factor abnormality', 'DDX41 and TP53 not detected']);

  if (p.NPM1 && !p.DDX41 && !p.TP53 && !adverse) {
    reasons.push('NPM1 detected', 'No adverse karyotype');
    if (p.flt3 === 'tkd' && count === 0) return result(3, [...reasons, 'FLT3-TKD detected', 'No sAML-defining mutations']);
    if (p.flt3 !== 'itd' && p.flt3 !== 'both' && count === 0 && !['taml', 'prior_mds'].includes(p.context)) return result(2, [...reasons, 'No FLT3-ITD or secondary AML features']);
    if (count === 1) return result(4, [...reasons, 'Exactly 1 sAML-defining mutation']);
    if (count >= 2) return result(5, [...reasons, `${count} sAML-defining mutations`]);
    if (p.context === 'prior_mds') return result(6, [...reasons, 'AML arising after prior MDS']);
    if (p.context === 'taml') return result(7, [...reasons, 'Therapy-related AML']);
  }

  if (p.CEBPA_bZIP && !p.DDX41 && !p.TP53) return result(8, ['CEBPA bZIP mutation detected', 'DDX41 and TP53 not detected']);
  if (p.cytogenetics === 't911') return result(16, ['t(9;11) detected', 'Specific KMT2A branch']);
  if (p.cytogenetics === 'kmt2a' && !p.DDX41 && !p.TP53) return result(17, ['KMT2A rearrangement detected', 'DDX41 and TP53 not detected']);

  if (intermediate) {
    reasons.push('Intermediate or normal cytogenetics');
    if (p.NPM1 && ['itd', 'both'].includes(p.flt3) && p.DNMT3A && !p.DDX41 && !p.TP53) return result(11, [...reasons, 'NPM1, FLT3-ITD and DNMT3A detected']);
    if (p.NPM1 && ['itd', 'both'].includes(p.flt3) && !p.DNMT3A && !p.DDX41 && !p.TP53) return result(10, [...reasons, 'NPM1 and FLT3-ITD detected', 'DNMT3A not detected']);
    if (p.flt3 === 'both' && !p.NPM1 && !p.DDX41 && !p.TP53) return result(14, [...reasons, 'Both FLT3-ITD and FLT3-TKD detected']);
    if (p.flt3 === 'tkd' && !p.NPM1 && !p.DDX41 && !p.TP53) return result(13, [...reasons, 'FLT3-TKD detected']);
    if (p.flt3 === 'itd' && !p.NPM1 && !p.DDX41 && !p.TP53) return result(12, [...reasons, 'FLT3-ITD detected']);
    if (p.context === 'taml' && !p.DDX41 && !p.TP53) return result(15, [...reasons, 'Therapy-related AML']);
    if (count === 1 && !p.TP53 && !p.CEBPA_bZIP && !p.DDX41) return result(20, [...reasons, 'Exactly 1 sAML-defining mutation']);
    if (count >= 2 && !p.TP53 && !p.CEBPA_bZIP && !p.DDX41) return result(21, [...reasons, `${count} sAML-defining mutations`]);
    if (!p.DDX41 && !p.TP53) return result(9, [...reasons, 'No higher-priority defining feature matched']);
  }

  if (adverse) {
    reasons.push('Adverse karyotype');
    if (p.NPM1 && !p.TP53 && !p.CEBPA_bZIP && !p.DDX41) return result(22, [...reasons, 'NPM1 detected']);
    if (p.cytogenetics === 'kmt2a' && !p.DDX41 && !p.TP53) return result(17, [...reasons, 'KMT2A rearrangement']);
    if (['itd', 'both'].includes(p.flt3) && !p.TP53 && !p.CEBPA_bZIP && !p.DDX41) return result(23, [...reasons, 'FLT3-ITD detected']);
    if (p.flt3 === 'tkd' && !p.TP53 && !p.CEBPA_bZIP && !p.DDX41) return result(24, [...reasons, 'FLT3-TKD detected']);
  }
  if (complex && m7 && !p.TP53 && !p.DDX41 && !p.CEBPA_bZIP) return result(18, ['Complex karyotype', 'Monosomy 7', 'TP53 not detected']);
  if (complex && m7 && p.TP53 && !p.DDX41) return result(19, ['Complex karyotype', 'Monosomy 7', 'TP53 detected']);
  if (p.context === 'saml' && p.flt3 === 'itd' && !p.TP53 && !p.CEBPA_bZIP && !p.DDX41) return result(25, ['Secondary AML', 'FLT3-ITD detected']);
  if (p.context === 'saml' && p.flt3 === 'tkd' && !p.TP53 && !p.CEBPA_bZIP && !p.DDX41) return result(26, ['Secondary AML', 'FLT3-TKD detected']);
  if (p.cytogenetics === 'mecom' && !p.TP53 && !p.CEBPA_bZIP && !p.DDX41) return result(27, ['inv(3), t(3;3), or 3q26 abnormality', 'GATA2::MECOM branch']);
  return null;
}

export function transplantText(caseNumber, age, mrd) {
  const always = [12, 14, 15, 17, 18, 20, 21, 22, 23, 24, 25, 26, 27];
  if (caseNumber === 19 && age >= 60) return 'No / Yes — controversial; specialist transplant discussion required.';
  if (caseNumber === 28 && age < 60) return 'No / Yes — case-dependent.';
  if (always.includes(caseNumber)) return 'Yes — consensus recommendation regardless of MRD.';
  if (mrd === 'positive') return 'Yes — MRD-positive pathway.';
  if (mrd === 'negative') return 'Not routinely indicated by this consensus branch; review in MDT.';
  return 'Depends on MRD status; complete MRD assessment and review in MDT.';
}

export const INITIAL_PROFILE = {
  NPM1: false, TP53: false, DDX41: false, CEBPA_bZIP: false,
  flt3: null, cytogenetics: null, samlGenes: [], context: null,
  DNMT3A: null, age: '', mrd: null,
};
