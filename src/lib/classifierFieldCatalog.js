export const CORE_FIELDS = [
  {
    group: 'AML Defining (Core)',
    fields: [
      { path: 'AML_defining_recurrent_genetic_abnormalities.PML::RARA', label: 'PML::RARA' },
      { path: 'AML_defining_recurrent_genetic_abnormalities.NPM1', label: 'NPM1' },
      { path: 'AML_defining_recurrent_genetic_abnormalities.RUNX1::RUNX1T1', label: 'RUNX1::RUNX1T1' },
      { path: 'AML_defining_recurrent_genetic_abnormalities.CBFB::MYH11', label: 'CBFB::MYH11' },
      { path: 'AML_defining_recurrent_genetic_abnormalities.BCR::ABL1', label: 'BCR::ABL1' },
      { path: 'AML_defining_recurrent_genetic_abnormalities.CEBPA_bZIP_inframe', label: 'CEBPA bZIP in-frame' },
      { path: 'AML_defining_recurrent_genetic_abnormalities.MLLT3::KMT2A', label: 'MLLT3::KMT2A' },
      { path: 'AML_defining_recurrent_genetic_abnormalities.DEK::NUP214', label: 'DEK::NUP214' },
    ],
  },
  {
    group: 'TP53 / Key Risk',
    fields: [
      { path: 'Biallelic_TP53_mutation.2_x_TP53_mutations', label: 'TP53: 2 mutations' },
      { path: 'Biallelic_TP53_mutation.1_x_TP53_mutation_del_17p', label: 'TP53: mutation + del(17p)' },
      { path: 'Biallelic_TP53_mutation.1_x_TP53_mutation_LOH', label: 'TP53: mutation + LOH' },
      { path: 'Biallelic_TP53_mutation.1_x_TP53_mutation_50_percent_vaf', label: 'TP53: mutation >=50% VAF' },
      { path: 'Biallelic_TP53_mutation.1_x_TP53_mutation_10_percent_vaf', label: 'TP53: mutation >=10% VAF' },
      { path: 'tp53_mutation_simple', label: 'TP53 mutation (single marker)' },
      { path: 'flt3_itd', label: 'FLT3-ITD' },
    ],
  },
  {
    group: 'MDS Related (Core)',
    fields: [
      { path: 'MDS_related_mutation.ASXL1', label: 'ASXL1' },
      { path: 'MDS_related_mutation.BCOR', label: 'BCOR' },
      { path: 'MDS_related_mutation.EZH2', label: 'EZH2' },
      { path: 'MDS_related_mutation.RUNX1', label: 'RUNX1' },
      { path: 'MDS_related_mutation.SF3B1', label: 'SF3B1' },
      { path: 'MDS_related_mutation.SRSF2', label: 'SRSF2' },
      { path: 'MDS_related_mutation.STAG2', label: 'STAG2' },
      { path: 'MDS_related_mutation.U2AF1', label: 'U2AF1' },
      { path: 'MDS_related_mutation.ZRSR2', label: 'ZRSR2' },
    ],
  },
  {
    group: 'Morphology & Clinical (AML)',
    fields: [
      { path: 'basophilic_differentiation', label: 'Basophilic differentiation' },
      { path: 'bm_trilineage_proliferation', label: 'Panmyelosis' },
      { path: 'bm_fibrosis', label: 'Significant marrow fibrosis' },
      { path: 'erythroid_confirmation', label: 'Erythroid differentiation (≥80%)' },
      { path: 'down_syndrome', label: 'Down syndrome' },
      { path: 'gata1_mutation', label: 'GATA1 mutation' },
    ],
  },
];

export const ADVANCED_FIELDS = [
  {
    group: 'AML Defining (Advanced)',
    fields: [
      { path: 'AML_defining_recurrent_genetic_abnormalities.KMT2A', label: 'KMT2A (other rearrangement)' },
      { path: 'AML_defining_recurrent_genetic_abnormalities.MECOM', label: 'MECOM (other rearrangement)' },
      { path: 'AML_defining_recurrent_genetic_abnormalities.GATA2::MECOM', label: 'GATA2::MECOM' },
      { path: 'AML_defining_recurrent_genetic_abnormalities.NUP98', label: 'NUP98' },
      { path: 'AML_defining_recurrent_genetic_abnormalities.RBM15::MRTFA', label: 'RBM15::MRTFA' },
      { path: 'AML_defining_recurrent_genetic_abnormalities.bZIP', label: 'Legacy bZIP flag' },
      { path: 'AML_defining_recurrent_genetic_abnormalities.CEBPA_biallelic', label: 'CEBPA biallelic' },
    ],
  },
  {
    group: 'Cytogenetics',
    fields: [
      { path: 'MDS_related_cytogenetics.Complex_karyotype', label: 'Complex karyotype' },
      { path: 'MDS_related_cytogenetics.del_5q', label: 'del(5q)' },
      { path: 'MDS_related_cytogenetics.t_5q', label: 't(5q)' },
      { path: 'MDS_related_cytogenetics.add_5q', label: 'add(5q)' },
      { path: 'MDS_related_cytogenetics.-7', label: '-7' },
      { path: 'MDS_related_cytogenetics.del_7q', label: 'del(7q)' },
      { path: 'MDS_related_cytogenetics.del_12p', label: 'del(12p)' },
      { path: 'MDS_related_cytogenetics.t_12p', label: 't(12p)' },
      { path: 'MDS_related_cytogenetics.add_12p', label: 'add(12p)' },
      { path: 'MDS_related_cytogenetics.+8', label: '+8 (ICC route)' },
      { path: 'MDS_related_cytogenetics.del_17p', label: 'del(17p)' },
      { path: 'MDS_related_cytogenetics.-13', label: '-13' },
      { path: 'MDS_related_cytogenetics.-17', label: '-17' },
      { path: 'MDS_related_cytogenetics.add_17p', label: 'add(17p)' },
      { path: 'MDS_related_cytogenetics.del_20q', label: 'del(20q)' },
      { path: 'MDS_related_cytogenetics.idic_X_q13', label: 'idic(X)(q13)' },
      { path: 'MDS_related_cytogenetics.inv3_t33', label: 'inv(3)/t(3;3)' },
    ],
  },
];

export function allFieldPaths() {
  return [...CORE_FIELDS, ...ADVANCED_FIELDS].flatMap((g) => g.fields.map((f) => f.path));
}

