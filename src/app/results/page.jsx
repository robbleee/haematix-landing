'use client';

import { useState, useMemo } from 'react';
import styles from './results.module.css';

const diagnosticData = [
  {
    episodeNumber: '1',
    hodsD: 'AML with CBFB::MYH11 fusion',
    hodsICC: 'Yes',
    hodsWHO: 'Yes',
    hodsMRD: 'Yes',
    hodsGene: 'NA',
    haemTool: 'AML with CBFB::MYH11 fusion (WHO 2022), AML with inv(16)(p13.1q22) or t(16;16)(p13.1;q22)/CBFB::MYH11 (ICC 2022)',
    match: 'Yes',
    comments: '',
    fixes: ''
  },
  {
    episodeNumber: '2',
    hodsD: 'AML NOS',
    hodsICC: 'Yes',
    hodsWHO: 'No',
    hodsMRD: 'Yes',
    hodsGene: 'Yes',
    haemTool: 'Acute myeloid leukaemia without maturation (WHO 2022), AML, NOS (ICC 2022)',
    match: 'Yes',
    comments: 'HODS advice RE IDH1- would be good to add target lesion info',
    fixes: 'System says no cytogenetics but then comments on then in MRD'
  },
  {
    episodeNumber: '3',
    hodsD: 'AML with NPM1 mutation',
    hodsICC: 'Yes',
    hodsWHO: 'Yes',
    hodsMRD: 'No',
    hodsGene: 'No',
    haemTool: 'AML with NPM1 mutation (WHO 2022),  AML with mutated NPM1 (ICC 2022)',
    match: 'Yes',
    comments: 'IDH1 seen- no advice given',
    fixes: ''
  },
  {
    episodeNumber: '4',
    hodsD: 'AML NOS, AML with maturation',
    hodsICC: 'Yes',
    hodsWHO: 'Yes',
    hodsMRD: 'Yes',
    hodsGene: 'Yes',
    haemTool: 'AML with CEBPA mutation (WHO 2022), AML, NOS (ICC 2022)',
    match: 'No',
    comments: 'Advice re ? Germline given',
    fixes: ''
  },
  {
    episodeNumber: '5',
    hodsD: 'AML with NPM1 mutation',
    hodsICC: 'Yes',
    hodsWHO: 'Yes',
    hodsMRD: 'Yes',
    hodsGene: 'Yes',
    haemTool: 'AML with NPM1 mutation (WHO 2022), AML with mutated NPM1 (ICC 2022)',
    match: 'Yes',
    comments: 'IDH1 and FLT3 mentioned',
    fixes: ''
  },
  {
    episodeNumber: '6',
    hodsD: 'MDS with increased blasts -2 (MDS-IB2 - WHO 2022) MDS/AML (ICC 2022)',
    hodsICC: 'Yes',
    hodsWHO: 'Yes',
    hodsMRD: 'No',
    hodsGene: 'Yes',
    haemTool: 'MDS with increased blasts 2 (WHO 2022), MDS/AML with myelodysplasia related gene mutation (ICC 2022)',
    match: 'Yes',
    comments: 'DDX41 gene advice germline',
    fixes: ''
  },
  {
    episodeNumber: '7',
    hodsD: 'AML with mutated TP53 (ICC 2022)/ AML with MDS related cytogenetics (WHO 2022).',
    hodsICC: 'Yes',
    hodsWHO: 'Yes',
    hodsMRD: 'Yes',
    hodsGene: 'NA',
    haemTool: 'AML, myelodysplasia related (WHO 2022), AML with mutated TP53 (ICC 2022)',
    match: 'Yes',
    comments: '',
    fixes: ''
  },
  {
    episodeNumber: '8',
    hodsD: 'AML with NPM1 mutation',
    hodsICC: 'Yes',
    hodsWHO: 'Yes',
    hodsMRD: 'No',
    hodsGene: 'NA',
    haemTool: 'AML with NPM1 mutation (WHO 2022), AML with mutated NPM1 (ICC 2022)',
    match: 'Yes',
    comments: '',
    fixes: ''
  },
  {
    episodeNumber: '9',
    hodsD: 'AML with NPM1 mutation.',
    hodsICC: 'Yes',
    hodsWHO: 'Yes',
    hodsMRD: 'No',
    hodsGene: 'No',
    haemTool: 'AML with NPM1 mutation (WHO 2022), AML with mutated NPM1 (ICC 2022)',
    match: 'Yes',
    comments: 'Concurrent DNMT3A and IDH1- no advice given',
    fixes: ''
  },
  {
    episodeNumber: '10',
    hodsD: 'Acute Myeloid Leukaemia, myelodysplasia-related (WHO 2022)',
    hodsICC: 'No',
    hodsWHO: 'Yes',
    hodsMRD: 'No',
    hodsGene: 'No',
    haemTool: 'AML, myelodysplasia related (WHO 2022), AML with myelodysplasia related cytogenetic abnormality (ICC 2022))',
    match: 'Yes',
    comments: 'No mention complexx karyotype follow up',
    fixes: ''
  },
  {
    episodeNumber: '11',
    hodsD: 'AML with NPM1 mutation',
    hodsICC: 'Yes',
    hodsWHO: 'Yes',
    hodsMRD: 'No',
    hodsGene: 'Yes',
    haemTool: 'AML with NPM1 mutation (WHO 2022), AML with mutated NPM1 (ICC 2022)',
    match: 'Yes',
    comments: 'mentioned co-existant FLT3 ',
    fixes: ''
  },
  {
    episodeNumber: '12',
    hodsD: 'MDS-IB2 (WHO5) / MDS/AML (ICC2022)',
    hodsICC: 'Yes',
    hodsWHO: 'Yes',
    hodsMRD: 'No',
    hodsGene: 'NA',
    haemTool: 'MDS with increased blasts 2 (WHO 2022), MDS/AML, NOS (ICC 2022)',
    match: 'Yes',
    comments: '',
    fixes: ''
  },
  {
    episodeNumber: '13',
    hodsD: 'AML with NPM1 mutation',
    hodsICC: 'Yes',
    hodsWHO: 'Yes',
    hodsMRD: 'Yes',
    hodsGene: 'NA',
    haemTool: 'AML with NPM1 mutation (WHO 2022), AML with mutated NPM1 (ICC 2022)',
    match: 'Yes',
    comments: '',
    fixes: ''
  },
  {
    episodeNumber: '14',
    hodsD: 'AML with myelodysplasia-related gene mutations',
    hodsICC: 'Yes',
    hodsWHO: 'No',
    hodsMRD: 'No',
    hodsGene: 'No',
    haemTool: ' AML, myelodysplasia related (WHO 2022), AML with myelodysplasia related gene mutation (ICC 2022)',
    match: 'Yes',
    comments: 'No mention of IDH1',
    fixes: ''
  },
  {
    episodeNumber: '15',
    hodsD: 'AML',
    hodsICC: 'No',
    hodsWHO: 'No',
    hodsMRD: 'No',
    hodsGene: 'NA',
    haemTool: ' AML, myelodysplasia related (WHO 2022), AML with myelodysplasia related gene mutation (ICC 2022)',
    match: 'No',
    comments: 'Lack of deail in HODS report here. ',
    fixes: ''
  },
  {
    episodeNumber: '16',
    hodsD: 'AML with myelodysplasia-related gene mutation',
    hodsICC: 'Yes',
    hodsWHO: 'No',
    hodsMRD: 'No',
    hodsGene: 'Yes',
    haemTool: ' AML, myelodysplasia related (WHO 2022), AML with myelodysplasia related gene mutation (ICC 2022)',
    match: 'Yes',
    comments: 'DDX41 advice given',
    fixes: ''
  },
  {
    episodeNumber: '17',
    hodsD: 'AML with mutated CEBPA (ICC 2022) / AML with CEBPA mutation (WHO 2022)',
    hodsICC: 'Yes',
    hodsWHO: 'Yes',
    hodsMRD: 'Yes',
    hodsGene: 'Yes',
    haemTool: 'AML with CEBPA mutation (WHO 2022), AML with mutated CEBPA (ICC 2022)',
    match: 'Yes',
    comments: 'advice given re potentially germline CEBPA',
    fixes: ''
  },
  {
    episodeNumber: '18',
    hodsD: 'AML with myelodysplasia-related cytogenetic abnormality (ICC 2022) AML, myelodysplasia-related (WHO 2022)',
    hodsICC: 'Yes',
    hodsWHO: 'Yes',
    hodsMRD: 'Yes',
    hodsGene: 'No',
    haemTool: 'AML, myelodysplasia related (WHO 2022), AML with myelodysplasia related cytogenetic abnormality (ICC 2022)',
    match: 'Yes',
    comments: 'NRAS mutation advice - but no mention in classification',
    fixes: ''
  },
  {
    episodeNumber: '19',
    hodsD: 'AML with t(8;21)',
    hodsICC: 'Yes',
    hodsWHO: 'Yes',
    hodsMRD: 'Yes',
    hodsGene: 'NA',
    haemTool: 'AML with RUNX1::RUNX1T1 fusion (WHO 2022), AML with t(8;21)(q22;q22.1)/RUNX1::RUNX1T1 (ICC 2022)',
    match: 'Yes',
    comments: 'KIT gene mentioned',
    fixes: ''
  },
  {
    episodeNumber: '20',
    hodsD: 'Acute myeloid leukaemia, myelodysplasia-related (WHO 2022)/ AML with myelodysplasia-related cytogenetic abnormality (ICC 2022)',
    hodsICC: 'Yes',
    hodsWHO: 'Yes',
    hodsMRD: 'Yes',
    hodsGene: 'No',
    haemTool: 'AML, myelodysplasia related (WHO 2022), AML with myelodysplasia related cytogenetic abnormality (ICC 2022)',
    match: 'Yes',
    comments: 'NF1 mutation mentioned',
    fixes: ''
  },
  {
    episodeNumber: '21',
    hodsD: 'AML, myelodysplasia related',
    hodsICC: 'Yes',
    hodsWHO: 'Yes',
    hodsMRD: 'Yes',
    hodsGene: 'No',
    haemTool: 'AML, myelodysplasia related (WHO 2022), AML with myelodysplasia related gene mutation (ICC 2022)',
    match: 'Yes',
    comments: '',
    fixes: ''
  },
  {
    episodeNumber: '22',
    hodsD: 'Acute myeloid leukaemia myelodysplasia-related (WHO 2022)/ AML with myelodysplasia-related gene mutation (ICC 2022)',
    hodsICC: 'Yes',
    hodsWHO: 'Yes',
    hodsMRD: 'Yes',
    hodsGene: 'No',
    haemTool: 'AML, myelodysplasia related (WHO 2022), AML with myelodysplasia related gene mutation (ICC 2022)',
    match: 'Yes',
    comments: '',
    fixes: ''
  },
  {
    episodeNumber: '23',
    hodsD: 'AML with myelodysplasia related cytogenetic abnormality (ICC 2022) / AML, myelodysplasia related (WHO 2022)',
    hodsICC: 'Yes',
    hodsWHO: 'Yes',
    hodsMRD: 'Yes',
    hodsGene: 'Yes',
    haemTool: 'AML, myelodysplasia related (WHO 2022), AML with myelodysplasia related cytogenetic abnormality (ICC 2022)',
    match: 'Yes',
    comments: '',
    fixes: ''
  },
  {
    episodeNumber: '24',
    hodsD: 'AML, NOS, AML with recurrent genetic abnormalities',
    hodsICC: 'Yes',
    hodsWHO: 'Yes',
    hodsMRD: 'Yes',
    hodsGene: 'Yes',
    haemTool: 'AML with CEBPA mutation (WHO 2022), AML with mutated CEBPA (ICC 2022)',
    match: 'No',
    comments: '',
    fixes: ''
  },
  {
    episodeNumber: '25',
    hodsD: 'AML with myelodysplasia-related gene mutation',
    hodsICC: 'Yes',
    hodsWHO: 'No',
    hodsMRD: 'Yes',
    hodsGene: 'Yes',
    haemTool: 'AML, myelodysplasia related (WHO 2022), AML with myelodysplasia related gene mutation (ICC 2022)',
    match: 'Yes',
    comments: 'DDX41 advice given',
    fixes: ''
  },
  {
    episodeNumber: '26',
    hodsD: 'AML, myelodysplasia related (WHO2022) AML with myelodysplasia-related gene mutation (ICC2022)',
    hodsICC: 'Yes',
    hodsWHO: 'Yes',
    hodsMRD: 'Yes',
    hodsGene: 'Yes',
    haemTool: 'AML, myelodysplasia related, progressed from MDS (WHO,2022), AML with myelodysplasia related gene mutation, arising post MDS (ICC 2022)',
    match: 'Yes',
    comments: 'KMT2A PTD info added',
    fixes: ''
  },
  {
    episodeNumber: '27',
    hodsD: 'Acute erythroid leukaemia, post cytotoxic therapy (WHO, 2022), AML with TP53 mutation, therapy related (ICC 2022)',
    hodsICC: 'Yes',
    hodsWHO: 'Yes',
    hodsMRD: 'Yes',
    hodsGene: 'No',
    haemTool: 'AML, myelodysplasia related, previous cytotoxic therapy (WHO 2022), AML with mutated TP53, therapy related (ICC 2022)',
    match: '',
    comments: '? Not enough info in histopath report to give erythroid diagnosis. Is AEL up the hierachy',
    fixes: ''
  },
  {
    episodeNumber: '28',
    hodsD: 'AML with TP53 mutation (ICC 2022)',
    hodsICC: 'Yes',
    hodsWHO: 'No',
    hodsMRD: 'No',
    hodsGene: 'No',
    haemTool: 'AML with TP53 mutation (ICC 2022), AML, myelodysplasia related (WHO, 2022)',
    match: 'Yes',
    comments: 'WHO classification not offered on HODS',
    fixes: ''
  }
];

export default function Results() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMatch, setFilterMatch] = useState('all');
  const [sortField, setSortField] = useState('episodeNumber');
  const [sortDirection, setSortDirection] = useState('asc');

  const filteredAndSortedData = useMemo(() => {
    let filtered = diagnosticData.filter(item => {
      const matchesSearch = Object.values(item).some(value => 
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
      const matchesFilter = filterMatch === 'all' || 
        (filterMatch === 'yes' && item.match === 'Yes') ||
        (filterMatch === 'no' && item.match === 'No') ||
        (filterMatch === 'empty' && item.match === '');
      
      return matchesSearch && matchesFilter;
    });

    filtered.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      
      if (sortField === 'episodeNumber') {
        aVal = parseInt(aVal) || 0;
        bVal = parseInt(bVal) || 0;
      }
      
      if (sortDirection === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    return filtered;
  }, [searchTerm, filterMatch, sortField, sortDirection]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getMatchBadge = (match) => {
    if (match === 'Yes') {
      return <span className={styles.matchYes}>✓ Match</span>;
    } else if (match === 'No') {
      return <span className={styles.matchNo}>✗ No Match</span>;
    } else {
      return <span className={styles.matchEmpty}>—</span>;
    }
  };

  const getBooleanBadge = (value) => {
    if (value === 'Yes') {
      return <span className={styles.boolYes}>Yes</span>;
    } else if (value === 'No') {
      return <span className={styles.boolNo}>No</span>;
    } else {
      return <span className={styles.boolNA}>N/A</span>;
    }
  };

  const totalResults = filteredAndSortedData.length;
  const matchCount = filteredAndSortedData.filter(item => item.match === 'Yes').length;
  const noMatchCount = filteredAndSortedData.filter(item => item.match === 'No').length;
  const matchRate = totalResults > 0 ? ((matchCount / totalResults) * 100).toFixed(1) : 0;

  return (
    <div className={styles.resultsPage}>


      <section className={styles.content}>
        <div className="container">
          <div className={styles.controls}>
            <div className={styles.searchBox}>
              <input
                type="text"
                placeholder="Search by case number, diagnosis, or comments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
            </div>
            
            <div className={styles.filters}>
              <select 
                value={filterMatch} 
                onChange={(e) => setFilterMatch(e.target.value)}
                className={styles.filterSelect}
              >
                <option value="all">All Results</option>
                <option value="yes">Matches Only</option>
                <option value="no">No Matches</option>
                <option value="empty">Unspecified</option>
              </select>
            </div>
          </div>

          <div className={styles.tableContainer}>
            <table className={styles.resultsTable}>
              <thead>
                <tr>
                  <th onClick={() => handleSort('episodeNumber')} className={styles.sortable}>
                    Case #
                    {sortField === 'episodeNumber' && (
                      <span className={styles.sortIcon}>
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </th>
                  <th onClick={() => handleSort('hodsD')} className={styles.sortable}>
                    HODS Diagnosis
                    {sortField === 'hodsD' && (
                      <span className={styles.sortIcon}>
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </th>
                  <th>ICC</th>
                  <th>WHO</th>
                  <th>MRD</th>
                  <th>Gene</th>
                  <th>Haem.io Classification</th>
                  <th onClick={() => handleSort('match')} className={styles.sortable}>
                    Match
                    {sortField === 'match' && (
                      <span className={styles.sortIcon}>
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </th>
                  <th>Comments</th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedData.map((item, index) => (
                  <tr key={index} className={styles.resultRow}>
                    <td className={styles.episodeNumber}>{item.episodeNumber}</td>
                    <td className={styles.diagnosis}>{item.hodsD}</td>
                    <td>{getBooleanBadge(item.hodsICC)}</td>
                    <td>{getBooleanBadge(item.hodsWHO)}</td>
                    <td>{getBooleanBadge(item.hodsMRD)}</td>
                    <td>{getBooleanBadge(item.hodsGene)}</td>
                    <td className={styles.haemTool}>{item.haemTool}</td>
                    <td>{getMatchBadge(item.match)}</td>
                    <td className={styles.comments}>{item.comments}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredAndSortedData.length === 0 && (
            <div className={styles.noResults}>
              <p>No results found matching your search criteria.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
} 