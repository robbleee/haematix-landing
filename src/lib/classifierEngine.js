const NON_AML_SENTINEL = 'Not AML, consider MDS classification';

const WHO_AML_DEF_ORDER = [
  ['PML::RARA', 'Acute promyelocytic leukaemia with PML::RARA fusion'],
  ['NPM1', 'AML with NPM1 mutation'],
  ['RUNX1::RUNX1T1', 'AML with RUNX1::RUNX1T1 fusion'],
  ['CBFB::MYH11', 'AML with CBFB::MYH11 fusion'],
  ['DEK::NUP214', 'AML with DEK::NUP214 fusion'],
  ['RBM15::MRTFA', 'AML with RBM15::MRTFA fusion'],
  ['MLLT3::KMT2A', 'AML with KMT2A rearrangement'],
  ['GATA2::MECOM', 'AML with MECOM rearrangement'],
  ['KMT2A', 'AML with KMT2A rearrangement'],
  ['MECOM', 'AML with MECOM rearrangement'],
  ['NUP98', 'AML with NUP98 rearrangement'],
];

const ICC_AML_DEF_ORDER = [
  ['PML::RARA', 'APL with t(15;17)(q24.1;q21.2)/PML::RARA'],
  ['NPM1', 'AML with mutated NPM1'],
  ['RUNX1::RUNX1T1', 'AML with t(8;21)(q22;q22.1)/RUNX1::RUNX1T1'],
  ['CBFB::MYH11', 'AML with inv(16)(p13.1q22) or t(16;16)(p13.1;q22)/CBFB::MYH11'],
  ['DEK::NUP214', 'AML with t(6;9)(p22.3;q34.1)/DEK::NUP214'],
  ['RBM15::MRTFA', 'AML (megakaryoblastic) with t(1;22)(p13.3;q13.1)/RBM15::MRTFA'],
  ['MLLT3::KMT2A', 'AML with t(9;11)(p21.3;q23.3)/MLLT3::KMT2A'],
  ['GATA2::MECOM', 'AML with inv(3)(q21.3q26.2) or t(3;3)(q21.3;q26.2)/GATA2, MECOM(EVI1)'],
  ['KMT2A', 'AML with other KMT2A rearrangements'],
  ['MECOM', 'AML with other MECOM rearrangements'],
  ['NUP98', 'AML with NUP98 and other partners'],
  ['BCR::ABL1', 'AML with t(9;22)(q34.1;q11.2)/BCR::ABL1'],
];

const MDS_GENE_KEYS = ['ASXL1', 'BCOR', 'EZH2', 'RUNX1', 'SF3B1', 'SRSF2', 'STAG2', 'U2AF1', 'ZRSR2'];
const MDS_CYTO_KEYS_WHO = ['Complex_karyotype', 'del_5q', 't_5q', 'add_5q', '-7', 'del_7q', 'del_12p', 't_12p', 'add_12p', '-13', '-17', 'add_17p', 'del_17p', 'del_20q', 'idic_X_q13', 'inv3_t33'];
const MDS_CYTO_KEYS_ICC = [...MDS_CYTO_KEYS_WHO, '+8'];

function isTrue(v) {
  return v === true || v === 'true' || v === 'True';
}

function selectedKeys(obj = {}, keys = null) {
  const scope = keys || Object.keys(obj);
  return scope.filter((k) => isTrue(obj[k]));
}

function applySuffix(label, scheme) {
  if (!label || label.startsWith('Error:') || label.startsWith('Not AML')) {
    return label;
  }
  return `${label} (${scheme})`;
}

function classifyWho(parsedData) {
  const derivation = [];
  const blasts = parsedData.blasts_percentage;
  const amlDef = parsedData.AML_defining_recurrent_genetic_abnormalities || {};
  const mdsMut = parsedData.MDS_related_mutation || {};
  const mdsCyto = parsedData.MDS_related_cytogenetics || {};
  const tp53 = parsedData.Biallelic_TP53_mutation || {};

  if (typeof blasts !== 'number' || Number.isNaN(blasts) || blasts < 0 || blasts > 100) {
    return {
      classification: 'Error: Blast percentage must be a numeric value between 0 and 100.',
      derivation: ['Invalid blast percentage.'],
    };
  }

  derivation.push(`Blast percentage: ${blasts}`);

  for (const [key, label] of WHO_AML_DEF_ORDER) {
    if (!isTrue(amlDef[key])) continue;
    derivation.push(`WHO AML-defining abnormality triggered: ${key}`);
    return { classification: applySuffix(label, 'WHO 2022'), derivation };
  }

  if (isTrue(amlDef.CEBPA_bZIP_inframe) || isTrue(amlDef.CEBPA_biallelic) || isTrue(amlDef.bZIP)) {
    if (blasts >= 20) {
      derivation.push('WHO CEBPA branch triggered (in-frame bZIP or biallelic CEBPA).');
      return { classification: applySuffix('AML with CEBPA mutation', 'WHO 2022'), derivation };
    } else {
      derivation.push('CEBPA mutation detected but blasts <20%; WHO requires >=20%.');
    }
  }

  if (isTrue(amlDef['BCR::ABL1'])) {
    if (blasts >= 20) {
      derivation.push('WHO BCR::ABL1 branch triggered with blasts >=20%.');
      return { classification: applySuffix('AML with BCR::ABL1 fusion', 'WHO 2022'), derivation };
    } else {
      derivation.push('BCR::ABL1 detected but blasts <20%; WHO requires >=20%.');
    }
  }

  if (blasts < 20) {
    if (isTrue(parsedData.erythroid_confirmation)) {
      derivation.push('Erythroid confirmation met (≥80% erythroid, ≥30% proerythroblasts) with blasts <20%.');
      return { classification: applySuffix('Acute Erythroid leukaemia', 'WHO 2022'), derivation };
    }
    const down_syndrome = isTrue(parsedData.down_syndrome);
    const gata1_mut = isTrue(parsedData.gata1_mutation);
    if (down_syndrome && gata1_mut) {
      derivation.push('Down syndrome + GATA1 mutation with blasts <20% → TAM');
      return { classification: applySuffix('Transient abnormal myelopoiesis (Down syndrome)', 'WHO 2022'), derivation };
    }
    derivation.push('No WHO AML-defining route matched and blasts <20%.');
    return { classification: NON_AML_SENTINEL, derivation };
  }

  const mdsGenes = selectedKeys(mdsMut, MDS_GENE_KEYS);
  if (mdsGenes.length) {
    derivation.push(`MDS-related mutations detected: ${mdsGenes.join(', ')}`);
    return { classification: applySuffix('AML, myelodysplasia related', 'WHO 2022'), derivation };
  }

  const mdsCytoWho = selectedKeys(mdsCyto, MDS_CYTO_KEYS_WHO);
  if (mdsCytoWho.length) {
    derivation.push(`WHO MDS-related cytogenetics detected: ${mdsCytoWho.join(', ')}`);
    return { classification: applySuffix('AML, myelodysplasia related', 'WHO 2022'), derivation };
  }

  if (isTrue(parsedData.basophilic_differentiation) || isTrue(parsedData.ABL_immunophenotype_support)) {
    derivation.push('Basophilic differentiation detected ⇒ Acute basophilic leukaemia');
    return { classification: applySuffix('Acute basophilic leukaemia', 'WHO 2022'), derivation };
  }

  const bm_panmye = isTrue(parsedData.bm_trilineage_proliferation);
  const bm_fibrosis_flag = isTrue(parsedData.bm_fibrosis);
  if (bm_panmye && bm_fibrosis_flag && blasts >= 20) {
    derivation.push('Panmyelosis + significant fibrosis with blasts ≥20% ⇒ Acute panmyelosis with myelofibrosis');
    return { classification: applySuffix('Acute panmyelosis with myelofibrosis', 'WHO 2022'), derivation };
  }

  const down_syndrome_high = isTrue(parsedData.down_syndrome);
  const gata1_mut_high = isTrue(parsedData.gata1_mutation);
  if (down_syndrome_high && gata1_mut_high && blasts >= 20) {
    derivation.push('Down syndrome + GATA1 mutation with blasts ≥20% → ML-DS');
    return { classification: applySuffix('Myeloid leukemia associated with Down syndrome (ML-DS)', 'WHO 2022'), derivation };
  }

  if (isTrue(parsedData.erythroid_confirmation)) {
    derivation.push('Erythroid confirmation met (≥80% erythroid, ≥30% proerythroblasts) → Acute Erythroid leukaemia');
    return { classification: applySuffix('Acute Erythroid leukaemia', 'WHO 2022'), derivation };
  }

  derivation.push('Fallback branch: AML, unknown differentiation.');
  return { classification: applySuffix('Acute myeloid leukaemia, unknown differentiation', 'WHO 2022'), derivation };
}

function classifyIcc(parsedData) {
  const derivation = [];
  const blasts = parsedData.blasts_percentage;
  const amlDef = parsedData.AML_defining_recurrent_genetic_abnormalities || {};
  const mdsMut = parsedData.MDS_related_mutation || {};
  const mdsCyto = parsedData.MDS_related_cytogenetics || {};
  const tp53 = parsedData.Biallelic_TP53_mutation || {};

  if (typeof blasts !== 'number' || Number.isNaN(blasts) || blasts < 0 || blasts > 100) {
    return {
      classification: 'Error: Blast percentage must be a numeric value between 0 and 100.',
      derivation: ['Invalid blast percentage.'],
    };
  }

  derivation.push(`Blast percentage: ${blasts}`);

  if (blasts >= 10) {
    for (const [key, label] of ICC_AML_DEF_ORDER) {
      if (isTrue(amlDef[key])) {
        derivation.push(`ICC AML-defining abnormality triggered: ${key}`);
        return { classification: applySuffix(label, 'ICC 2022'), derivation };
      }
    }

    if (isTrue(amlDef.CEBPA_bZIP_inframe) || isTrue(amlDef.bZIP)) {
      derivation.push('ICC CEBPA bZIP branch triggered.');
      return { classification: applySuffix('AML with in-frame bZIP mutated CEBPA', 'ICC 2022'), derivation };
    }
  } else {
    derivation.push('ICC AML-defining abnormalities require blasts >=10%.');
  }

  const tp53MultiHit =
    isTrue(tp53['2_x_TP53_mutations']) ||
    isTrue(tp53['1_x_TP53_mutation_del_17p']) ||
    isTrue(tp53['1_x_TP53_mutation_LOH']) ||
    isTrue(tp53['1_x_TP53_mutation_50_percent_vaf']) ||
    isTrue(tp53['1_x_TP53_mutation_10_percent_vaf']) ||
    isTrue(parsedData.tp53_mutation_simple);

  if (tp53MultiHit) {
    derivation.push('ICC TP53 branch triggered.');
    if (blasts < 10) return { classification: NON_AML_SENTINEL, derivation };
    if (blasts < 20) return { classification: applySuffix('MDS/AML with mutated TP53', 'ICC 2022'), derivation };
    return { classification: applySuffix('AML with mutated TP53', 'ICC 2022'), derivation };
  }

  const mdsGenes = selectedKeys(mdsMut, MDS_GENE_KEYS);
  if (mdsGenes.length) {
    derivation.push(`ICC MDS-related mutations detected: ${mdsGenes.join(', ')}`);
    if (blasts < 10) return { classification: NON_AML_SENTINEL, derivation };
    if (blasts < 20) return { classification: applySuffix('MDS/AML with myelodysplasia related gene mutation', 'ICC 2022'), derivation };
    return { classification: applySuffix('AML with myelodysplasia related gene mutation', 'ICC 2022'), derivation };
  }

  const mdsCytoIcc = selectedKeys(mdsCyto, MDS_CYTO_KEYS_ICC);
  if (mdsCytoIcc.length) {
    derivation.push(`ICC MDS-related cytogenetics detected: ${mdsCytoIcc.join(', ')}`);
    if (blasts < 10) return { classification: NON_AML_SENTINEL, derivation };
    if (blasts < 20) return { classification: applySuffix('MDS/AML with myelodysplasia related cytogenetic abnormality', 'ICC 2022'), derivation };
    return { classification: applySuffix('AML with myelodysplasia related cytogenetic abnormality', 'ICC 2022'), derivation };
  }

  if (blasts < 10) {
    derivation.push('Fallback ICC branch: blasts <10%.');
    return { classification: NON_AML_SENTINEL, derivation };
  }
  if (blasts < 20) {
    derivation.push('Fallback ICC branch: blasts 10-19%.');
    return { classification: applySuffix('MDS/AML, NOS', 'ICC 2022'), derivation };
  }

  derivation.push('Fallback ICC branch: AML, NOS.');
  return { classification: applySuffix('AML, NOS', 'ICC 2022'), derivation };
}

function classifyMdsWho(parsedData) {
  const derivation = [];
  const blasts = parsedData.blasts_percentage;
  const tp53 = parsedData.Biallelic_TP53_mutation || {};
  const mdsMut = parsedData.MDS_related_mutation || {};
  const mdsCyto = parsedData.MDS_related_cytogenetics || {};
  const fibrotic = isTrue(parsedData.fibrotic);
  const hypoplasia = isTrue(parsedData.hypoplasia);
  const lineagesRaw = parsedData.number_of_dysplastic_lineages;
  const lineages = typeof lineagesRaw === 'number' ? lineagesRaw : null;

  if (typeof blasts !== 'number' || Number.isNaN(blasts) || blasts < 0 || blasts > 100) {
    return {
      classification: 'Error: Blast percentage must be a numeric value between 0 and 100.',
      derivation: ['Invalid blast percentage.'],
    };
  }

  derivation.push(`Blast percentage: ${blasts}`);

  const tp53MultiHit =
    isTrue(tp53['2_x_TP53_mutations']) ||
    isTrue(tp53['1_x_TP53_mutation_del_17p']) ||
    isTrue(tp53['1_x_TP53_mutation_LOH']) ||
    isTrue(tp53['1_x_TP53_mutation_50_percent_vaf']);

  if (tp53MultiHit) {
    derivation.push('WHO MDS TP53 branch triggered.');
    return { classification: applySuffix('MDS with biallelic TP53 inactivation', 'WHO 2022'), derivation };
  }

  if (blasts >= 20) {
    derivation.push('Blast percentage >=20% is not MDS by WHO.');
    return { classification: 'Not MDS - blasts ≥20% (consider AML)', derivation };
  }

  if (blasts >= 5 && blasts <= 19 && fibrotic) {
    derivation.push('Fibrotic morphology with 5-19% blasts.');
    return { classification: applySuffix('MDS, fibrotic', 'WHO 2022'), derivation };
  }
  if (blasts >= 5 && blasts <= 9) {
    derivation.push('WHO MDS-IB1 branch (5-9% blasts).');
    return { classification: applySuffix('MDS with increased blasts 1', 'WHO 2022'), derivation };
  }
  if (blasts >= 10 && blasts <= 19) {
    derivation.push('WHO MDS-IB2 branch (10-19% blasts).');
    return { classification: applySuffix('MDS with increased blasts 2', 'WHO 2022'), derivation };
  }

  if (isTrue(mdsMut.SF3B1)) {
    derivation.push('SF3B1 mutation branch triggered.');
    return { classification: applySuffix('MDS with low blasts and SF3B1', 'WHO 2022'), derivation };
  }
  if (isTrue(mdsCyto.del_5q)) {
    derivation.push('Isolated del(5q) branch triggered.');
    return { classification: applySuffix('MDS with low blasts and isolated 5q-', 'WHO 2022'), derivation };
  }
  if (hypoplasia) {
    derivation.push('Hypoplastic marrow branch triggered.');
    return { classification: applySuffix('MDS, hypoplastic', 'WHO 2022'), derivation };
  }
  if (lineages !== null && lineages >= 1) {
    if (lineages === 1) {
      derivation.push('Single dysplastic lineage branch triggered.');
      return { classification: applySuffix('MDS with low blasts', 'WHO 2022'), derivation };
    }
    derivation.push('Multilineage dysplasia branch triggered.');
    return { classification: applySuffix('MDS, morphologically defined', 'WHO 2022'), derivation };
  }

  derivation.push('No WHO MDS criteria matched.');
  return { classification: 'Not MDS', derivation };
}

function classifyMdsIcc(parsedData) {
  const derivation = [];
  const blasts = parsedData.blasts_percentage;
  const tp53 = parsedData.Biallelic_TP53_mutation || {};
  const mdsMut = parsedData.MDS_related_mutation || {};
  const mdsCyto = parsedData.MDS_related_cytogenetics || {};
  const lineagesRaw = parsedData.number_of_dysplastic_lineages;
  const lineages = typeof lineagesRaw === 'number' ? lineagesRaw : null;

  if (typeof blasts !== 'number' || Number.isNaN(blasts) || blasts < 0 || blasts > 100) {
    return {
      classification: 'Error: Blast percentage must be a numeric value between 0 and 100.',
      derivation: ['Invalid blast percentage.'],
    };
  }

  derivation.push(`Blast percentage: ${blasts}`);

  const hasComplexKaryotype = isTrue(mdsCyto.complex_karyotype) || isTrue(mdsCyto.Complex_karyotype);
  const tp53MultiHit =
    isTrue(tp53['2_x_TP53_mutations']) ||
    isTrue(tp53['1_x_TP53_mutation_del_17p']) ||
    isTrue(tp53['1_x_TP53_mutation_LOH']) ||
    isTrue(tp53['1_x_TP53_mutation_50_percent_vaf']) ||
    (isTrue(tp53['1_x_TP53_mutation_10_percent_vaf']) && hasComplexKaryotype);

  if (tp53MultiHit) {
    derivation.push('ICC MDS TP53 branch triggered.');
    return { classification: applySuffix('MDS with mutated TP53', 'ICC 2022'), derivation };
  }

  if (blasts >= 20) {
    derivation.push('Blast percentage >=20% is not MDS by ICC.');
    return { classification: 'Not MDS - blasts ≥20% (consider AML)', derivation };
  }
  if (blasts >= 10 && blasts <= 19) {
    derivation.push('ICC MDS/AML branch (10-19% blasts).');
    return { classification: applySuffix('MDS/AML', 'ICC 2022'), derivation };
  }
  if (blasts >= 5 && blasts <= 9) {
    derivation.push('ICC excess blasts branch (5-9% blasts).');
    return { classification: applySuffix('MDS with excess blasts', 'ICC 2022'), derivation };
  }

  if (isTrue(mdsMut.SF3B1)) {
    derivation.push('SF3B1 mutation branch triggered.');
    return { classification: applySuffix('MDS with mutated SF3B1', 'ICC 2022'), derivation };
  }
  if (isTrue(mdsCyto.del_5q)) {
    derivation.push('del(5q) branch triggered.');
    return { classification: applySuffix('MDS with del(5q)', 'ICC 2022'), derivation };
  }
  if (lineages !== null && lineages >= 1) {
    if (lineages === 1) {
      derivation.push('Single dysplastic lineage branch triggered.');
      return { classification: applySuffix('MDS, NOS with single lineage dysplasia', 'ICC 2022'), derivation };
    }
    derivation.push('Multilineage dysplasia branch triggered.');
    return { classification: applySuffix('MDS, NOS with multilineage dysplasia', 'ICC 2022'), derivation };
  }

  derivation.push('No ICC MDS criteria matched.');
  return { classification: 'Not MDS', derivation };
}

function classifyCombinedWho(parsedData) {
  const aml = classifyWho(parsedData);
  if (aml.classification !== NON_AML_SENTINEL) return aml;

  const mds = classifyMdsWho(parsedData);
  return {
    classification: mds.classification,
    derivation: [...aml.derivation, 'AML WHO classifier indicated non-AML. Switching to MDS WHO classification...', ...mds.derivation],
  };
}

function classifyCombinedIcc(parsedData) {
  const aml = classifyIcc(parsedData);
  if (aml.classification !== NON_AML_SENTINEL) return aml;

  const mds = classifyMdsIcc(parsedData);
  return {
    classification: mds.classification,
    derivation: [...aml.derivation, 'AML ICC classifier indicated non-AML. Switching to MDS ICC classification...', ...mds.derivation],
  };
}

function classifyEln2022(parsedData) {
  const derivation = [];
  const amlDef = parsedData.AML_defining_recurrent_genetic_abnormalities || {};
  const mdsMut = parsedData.MDS_related_mutation || {};
  const mdsCyto = parsedData.MDS_related_cytogenetics || {};
  const tp53 = parsedData.Biallelic_TP53_mutation || {};

  const markers = {
    t_8_21: isTrue(amlDef['RUNX1::RUNX1T1']),
    inv_16_or_t_16_16: isTrue(amlDef['CBFB::MYH11']),
    t_9_11: isTrue(amlDef['MLLT3::KMT2A']),
    t_6_9: isTrue(amlDef['DEK::NUP214']),
    t_9_22: isTrue(amlDef['BCR::ABL1']),
    kmt2a_rearranged: isTrue(amlDef.KMT2A) && !isTrue(amlDef['MLLT3::KMT2A']),
    inv3_or_t3: isTrue(amlDef['GATA2::MECOM']) || isTrue(mdsCyto.inv3_t33),
    minus5_or_del5q: isTrue(mdsCyto.del_5q),
    minus7: isTrue(mdsCyto['-7']),
    abnormal17p: isTrue(mdsCyto.del_17p),
    complex_karyotype: isTrue(mdsCyto.Complex_karyotype),
    npm1_mutation: isTrue(amlDef.NPM1),
    flt3_itd: isTrue(parsedData.flt3_itd),
    cebpa_bzip: isTrue(amlDef.CEBPA_bZIP_inframe) || isTrue(amlDef.bZIP) || isTrue(amlDef.CEBPA_biallelic),
    tp53_mutation:
      isTrue(parsedData.tp53_mutation_simple) ||
      isTrue(tp53['2_x_TP53_mutations']) ||
      isTrue(tp53['1_x_TP53_mutation_del_17p']) ||
      isTrue(tp53['1_x_TP53_mutation_LOH']) ||
      isTrue(tp53['1_x_TP53_mutation_50_percent_vaf']) ||
      isTrue(tp53['1_x_TP53_mutation_10_percent_vaf']),
    runx1_mutation: isTrue(mdsMut.RUNX1),
    asxl1_mutation: isTrue(mdsMut.ASXL1),
    ezh2_mutation: isTrue(mdsMut.EZH2),
    bcor_mutation: isTrue(mdsMut.BCOR),
    stag2_mutation: isTrue(mdsMut.STAG2),
    srsf2_mutation: isTrue(mdsMut.SRSF2),
    u2af1_mutation: isTrue(mdsMut.U2AF1),
    zrsr2_mutation: isTrue(mdsMut.ZRSR2),
  };

  const adverseReasons = [];
  if (markers.t_6_9) adverseReasons.push('t(6;9) [DEK::NUP214]');
  if (markers.t_9_22) adverseReasons.push('t(9;22) [BCR::ABL1]');
  if (markers.kmt2a_rearranged) adverseReasons.push('KMT2A rearrangement (not t(9;11))');
  if (markers.inv3_or_t3) adverseReasons.push('inv(3)/t(3;3) [MECOM]');
  if (markers.minus5_or_del5q) adverseReasons.push('-5 or del(5q)');
  if (markers.minus7) adverseReasons.push('-7');
  if (markers.abnormal17p) adverseReasons.push('17p abnormality');
  if (markers.complex_karyotype) adverseReasons.push('complex karyotype');
  if (markers.tp53_mutation) adverseReasons.push('TP53 mutation');
  if (markers.runx1_mutation) adverseReasons.push('RUNX1 mutation');
  if (markers.asxl1_mutation) adverseReasons.push('ASXL1 mutation');
  if (markers.ezh2_mutation) adverseReasons.push('EZH2 mutation');
  if (markers.bcor_mutation) adverseReasons.push('BCOR mutation');
  if (markers.stag2_mutation) adverseReasons.push('STAG2 mutation');
  if (markers.srsf2_mutation) adverseReasons.push('SRSF2 mutation');
  if (markers.u2af1_mutation) adverseReasons.push('U2AF1 mutation');
  if (markers.zrsr2_mutation) adverseReasons.push('ZRSR2 mutation');

  derivation.push('Step 1: Check adverse markers');
  if (adverseReasons.length) {
    derivation.push(`Adverse markers found: ${adverseReasons.join(', ')}`);
    derivation.push('Final ELN 2022 risk: Adverse');
    return { risk: 'Adverse', medianOS: 'Approximately 8-10 months', derivation };
  }
  derivation.push('No adverse markers found.');

  const favorableReasons = [];
  if (markers.t_8_21) favorableReasons.push('t(8;21) [RUNX1::RUNX1T1]');
  if (markers.inv_16_or_t_16_16) favorableReasons.push('inv(16)/t(16;16) [CBFB::MYH11]');
  if (markers.npm1_mutation && !markers.flt3_itd) favorableReasons.push('NPM1 without FLT3-ITD');
  if (markers.cebpa_bzip) favorableReasons.push('in-frame bZIP CEBPA');

  derivation.push('Step 2: Check favorable markers');
  if (favorableReasons.length) {
    derivation.push(`Favorable markers found: ${favorableReasons.join(', ')}`);
  } else {
    derivation.push('No favorable markers found.');
  }

  derivation.push('Step 3: Check intermediate markers');
  const intermediateReasons = [];
  if (markers.flt3_itd) intermediateReasons.push('FLT3-ITD');
  if (markers.t_9_11) intermediateReasons.push('t(9;11) [MLLT3::KMT2A]');
  if (intermediateReasons.length) {
    derivation.push(`Intermediate markers found: ${intermediateReasons.join(', ')}`);
  } else {
    derivation.push('No specific intermediate markers found.');
  }

  if (favorableReasons.length && !markers.flt3_itd) {
    derivation.push('Final ELN 2022 risk: Favorable');
    return { risk: 'Favorable', medianOS: 'Not reached or >60 months', derivation };
  }

  derivation.push('Final ELN 2022 risk: Intermediate');
  return { risk: 'Intermediate', medianOS: 'Approximately 16-24 months', derivation };
}

export function runInteractiveClassifiers(parsedData) {
  const who = classifyCombinedWho(parsedData);
  const icc = classifyCombinedIcc(parsedData);
  const eln = classifyEln2022(parsedData);
  return { who, icc, eln };
}

