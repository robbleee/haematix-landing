function fallbackPanel(title, label) {
  return {
    title,
    label,
    value: 'Waiting for result',
    trace: ['Adjust inputs to run the classifier.'],
  };
}

function classificationValue(result, key) {
  return result?.[key]?.classification || 'Unavailable';
}

function trace(result, key) {
  return Array.isArray(result?.[key]?.derivation) ? result[key].derivation : [];
}

const favorableFields = [
  { path: 'AML_defining_recurrent_genetic_abnormalities.RUNX1::RUNX1T1', label: 'RUNX1::RUNX1T1', helper: 't(8;21)' },
  { path: 'AML_defining_recurrent_genetic_abnormalities.CBFB::MYH11', label: 'CBFB::MYH11', helper: 'inv(16) / t(16;16)' },
  { path: 'AML_defining_recurrent_genetic_abnormalities.NPM1', label: 'NPM1', helper: 'Favourable unless FLT3-ITD selected' },
  { path: 'AML_defining_recurrent_genetic_abnormalities.CEBPA_bZIP_inframe', label: 'CEBPA bZIP in-frame' },
];

const adverseFields = [
  { path: 'AML_defining_recurrent_genetic_abnormalities.DEK::NUP214', label: 'DEK::NUP214', helper: 't(6;9)' },
  { path: 'AML_defining_recurrent_genetic_abnormalities.BCR::ABL1', label: 'BCR::ABL1', helper: 't(9;22)' },
  { path: 'AML_defining_recurrent_genetic_abnormalities.KMT2A', label: 'KMT2A rearranged', helper: 'Not t(9;11)' },
  { path: 'AML_defining_recurrent_genetic_abnormalities.GATA2::MECOM', label: 'GATA2::MECOM', helper: 'inv(3) / t(3;3)' },
  { path: 'MDS_related_cytogenetics.del_5q', label: 'del(5q)' },
  { path: 'MDS_related_cytogenetics.-7', label: '-7' },
  { path: 'MDS_related_cytogenetics.del_17p', label: '17p abnormality' },
  { path: 'MDS_related_cytogenetics.Complex_karyotype', label: 'Complex karyotype' },
  { path: 'MDS_related_cytogenetics.monosomal_karyotype', label: 'Monosomal karyotype' },
  { path: 'Biallelic_TP53_mutation.1_x_TP53_mutation_10_percent_vaf', label: 'TP53 mutation' },
  { path: 'MDS_related_mutation.RUNX1', label: 'RUNX1 mutation' },
  { path: 'MDS_related_mutation.ASXL1', label: 'ASXL1 mutation' },
  { path: 'MDS_related_mutation.BCOR', label: 'BCOR mutation' },
  { path: 'MDS_related_mutation.EZH2', label: 'EZH2 mutation' },
  { path: 'MDS_related_mutation.SF3B1', label: 'SF3B1 mutation' },
  { path: 'MDS_related_mutation.SRSF2', label: 'SRSF2 mutation' },
  { path: 'MDS_related_mutation.STAG2', label: 'STAG2 mutation' },
  { path: 'MDS_related_mutation.U2AF1', label: 'U2AF1 mutation' },
  { path: 'MDS_related_mutation.ZRSR2', label: 'ZRSR2 mutation' },
];

const mdsRelatedFields = [
  { path: 'MDS_related_mutation.ASXL1', label: 'ASXL1' },
  { path: 'MDS_related_mutation.BCOR', label: 'BCOR' },
  { path: 'MDS_related_mutation.EZH2', label: 'EZH2' },
  { path: 'MDS_related_mutation.RUNX1', label: 'RUNX1' },
  { path: 'MDS_related_mutation.SF3B1', label: 'SF3B1' },
  { path: 'MDS_related_mutation.SRSF2', label: 'SRSF2' },
  { path: 'MDS_related_mutation.STAG2', label: 'STAG2' },
  { path: 'MDS_related_mutation.U2AF1', label: 'U2AF1' },
  { path: 'MDS_related_mutation.ZRSR2', label: 'ZRSR2' },
  { path: 'MDS_related_cytogenetics.del_5q', label: 'del(5q)' },
  { path: 'MDS_related_cytogenetics.-7', label: '-7' },
  { path: 'MDS_related_cytogenetics.del_7q', label: 'del(7q)' },
  { path: 'MDS_related_cytogenetics.+8', label: '+8', helper: 'ICC route' },
  { path: 'MDS_related_cytogenetics.Complex_karyotype', label: 'Complex karyotype' },
];

export const toolConfigs = {
  elnRisk: {
    title: 'ELN 2022 AML Risk Calculator',
    subtitle:
      'Enter key AML genetic and cytogenetic findings to return the ELN 2022 intensive-treatment risk category with the reasoning trail.',
    defaultBlasts: 25,
    groups: [
      {
        title: 'Favourable markers',
        note: 'Adverse markers override favourable markers where both are selected.',
        fields: favorableFields,
      },
      {
        title: 'Intermediate markers',
        fields: [
          { path: 'flt3_itd', label: 'FLT3-ITD' },
          { path: 'AML_defining_recurrent_genetic_abnormalities.MLLT3::KMT2A', label: 'MLLT3::KMT2A', helper: 't(9;11)' },
        ],
      },
      {
        title: 'Adverse markers',
        fields: adverseFields,
      },
    ],
    renderResults(result) {
      if (!result) return [fallbackPanel('ELN 2022', 'Risk')];
      return [
        {
          title: 'ELN 2022',
          label: 'Risk',
          value: `${result?.eln?.risk || 'Unavailable'} risk`,
          trace: trace(result, 'eln'),
        },
        {
          title: 'WHO 2022',
          label: 'Classification context',
          value: classificationValue(result, 'who'),
          trace: trace(result, 'who'),
        },
        {
          title: 'ICC 2022',
          label: 'Classification context',
          value: classificationValue(result, 'icc'),
          trace: trace(result, 'icc'),
        },
      ];
    },
  },

  mdsAmlBoundary: {
    title: 'MDS / AML Boundary Checker',
    subtitle:
      'Explore how blast percentage, AML-defining genetics, TP53, and MDS-related features change WHO 2022 and ICC 2022 outputs.',
    defaultBlasts: 15,
    groups: [
      {
        title: 'AML-defining abnormalities',
        note: 'Useful for seeing when a case exits the MDS/MDS-AML boundary.',
        fields: [
          { path: 'AML_defining_recurrent_genetic_abnormalities.PML::RARA', label: 'PML::RARA' },
          { path: 'AML_defining_recurrent_genetic_abnormalities.NPM1', label: 'NPM1' },
          { path: 'AML_defining_recurrent_genetic_abnormalities.RUNX1::RUNX1T1', label: 'RUNX1::RUNX1T1' },
          { path: 'AML_defining_recurrent_genetic_abnormalities.CBFB::MYH11', label: 'CBFB::MYH11' },
          { path: 'AML_defining_recurrent_genetic_abnormalities.BCR::ABL1', label: 'BCR::ABL1' },
          { path: 'AML_defining_recurrent_genetic_abnormalities.CEBPA_bZIP_inframe', label: 'CEBPA bZIP in-frame' },
        ],
      },
      {
        title: 'TP53 and MDS-related findings',
        fields: [
          { path: 'Biallelic_TP53_mutation.2_x_TP53_mutations', label: 'TP53: two mutations' },
          { path: 'Biallelic_TP53_mutation.1_x_TP53_mutation_del_17p', label: 'TP53 + del(17p)' },
          { path: 'Biallelic_TP53_mutation.1_x_TP53_mutation_LOH', label: 'TP53 + LOH' },
          { path: 'Biallelic_TP53_mutation.1_x_TP53_mutation_50_percent_vaf', label: 'TP53 >=50% VAF' },
          ...mdsRelatedFields,
        ],
      },
    ],
    renderResults(result) {
      if (!result) {
        return [
          fallbackPanel('WHO 2022', 'Output'),
          fallbackPanel('ICC 2022', 'Output'),
        ];
      }
      return [
        {
          title: 'WHO 2022',
          label: 'Output',
          value: classificationValue(result, 'who'),
          trace: trace(result, 'who'),
        },
        {
          title: 'ICC 2022',
          label: 'Output',
          value: classificationValue(result, 'icc'),
          trace: trace(result, 'icc'),
        },
      ];
    },
  },

  tp53Checker: {
    title: 'TP53 Multi-Hit Checker',
    subtitle:
      'Check how common TP53 configurations are represented in the WHO 2022, ICC 2022, and ELN 2022 classification/risk outputs.',
    defaultBlasts: 20,
    groups: [
      {
        title: 'TP53 configuration',
        note: 'Select the confirmed pathogenic features. VUS-only calls should not be entered as pathogenic TP53.',
        fields: [
          { path: 'Biallelic_TP53_mutation.2_x_TP53_mutations', label: 'Two TP53 mutations' },
          { path: 'Biallelic_TP53_mutation.1_x_TP53_mutation_del_17p', label: 'One TP53 mutation + del(17p)' },
          { path: 'Biallelic_TP53_mutation.1_x_TP53_mutation_LOH', label: 'One TP53 mutation + LOH' },
          { path: 'Biallelic_TP53_mutation.1_x_TP53_mutation_10_percent_vaf', label: 'One TP53 mutation >=10% VAF' },
          { path: 'Biallelic_TP53_mutation.1_x_TP53_mutation_50_percent_vaf', label: 'One TP53 mutation >=50% VAF' },
          { path: 'MDS_related_cytogenetics.del_17p', label: 'del(17p) cytogenetic abnormality' },
          { path: 'MDS_related_cytogenetics.Complex_karyotype', label: 'Complex karyotype' },
        ],
      },
    ],
    renderResults(result) {
      if (!result) {
        return [
          fallbackPanel('WHO 2022', 'TP53 output'),
          fallbackPanel('ICC 2022', 'TP53 output'),
          fallbackPanel('ELN 2022', 'Risk impact'),
        ];
      }
      return [
        {
          title: 'WHO 2022',
          label: 'TP53 output',
          value: classificationValue(result, 'who'),
          trace: trace(result, 'who'),
        },
        {
          title: 'ICC 2022',
          label: 'TP53 output',
          value: classificationValue(result, 'icc'),
          trace: trace(result, 'icc'),
        },
        {
          title: 'ELN 2022',
          label: 'Risk impact',
          value: `${result?.eln?.risk || 'Unavailable'} risk`,
          trace: trace(result, 'eln'),
        },
      ];
    },
  },
};
