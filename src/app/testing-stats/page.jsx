'use client';

import { useState, useEffect } from 'react';
import { parse } from 'yaml';
import { Bar, Pie, Line, Doughnut, Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  Filler
);

export default function TestingSuitePage() {
  const [testData, setTestData] = useState(null);
  const [disparityData, setDisparityData] = useState(null);
  const [selectedSuite, setSelectedSuite] = useState('aml_classification');
  const [selectedTest, setSelectedTest] = useState(null);
  const [selectedDisparityTest, setSelectedDisparityTest] = useState(null);
  const [filter, setFilter] = useState('all');
  const [disparityFilter, setDisparityFilter] = useState('different');
  const [searchTerm, setSearchTerm] = useState('');
  const [disparitySearchTerm, setDisparitySearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('individual');
  const [disparitySubTab, setDisparitySubTab] = useState('overview');

  useEffect(() => {
    fetchTestData();
    fetchDisparityData();
  }, []);

  const fetchTestData = async () => {
    try {
      const response = await fetch('/api/testing-yaml');
      const yamlText = await response.text();
      const data = parse(yamlText);
      setTestData(data);
    } catch (error) {
      console.error('Error loading test data:', error);
    }
  };

  const fetchDisparityData = async () => {
    try {
      const response = await fetch('/api/disparity-json');
      const data = await response.json();
      setDisparityData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error loading disparity data:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: 'var(--secondary-background-color)', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '64px',
            height: '64px',
            border: '4px solid var(--secondary-background-color)',
            borderTop: '4px solid var(--primary-color)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }}></div>
          <p style={{ fontSize: '1.125rem', color: 'var(--text-color)' }}>Loading test suite data...</p>
        </div>
      </div>
    );
  }

  if (!testData || !disparityData) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: 'var(--secondary-background-color)', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '1.125rem', color: '#e53e3e' }}>Error loading test data</p>
        </div>
      </div>
    );
  }

  const currentSuite = testData.test_suites[selectedSuite];
  const filteredTests = currentSuite?.test_cases?.filter(test => {
    const testResults = test.who_2022 || test.icc_2022;
    
    if (!testResults) {
      return false;
    }
    
    const isSuccess = testResults?.success === true || testResults?.success === 'true';
    
    const matchesFilter = filter === 'all' || 
      (filter === 'passed' && isSuccess) ||
      (filter === 'failed' && !isSuccess);
    
    const matchesSearch = !searchTerm || 
      test.test_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testResults?.expected?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      JSON.stringify(test.input_data).toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  }) || [];

  const getTestResults = (test) => {
    return test.who_2022 || test.icc_2022;
  };

  const getStatusColor = (success) => {
    const isSuccess = success === true || success === 'true';
    return isSuccess ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)';
  };

  const getStatusTextColor = (success) => {
    const isSuccess = success === true || success === 'true';
    return isSuccess ? '#059669' : '#dc2626';
  };

  const getSuccessStatus = (success) => {
    return success === true || success === 'true';
  };

  const getMatchesExpected = (matches_expected) => {
    return matches_expected === true || matches_expected === 'true';
  };

  // Filter disparity tests
  const filteredDisparityTests = disparityData?.test_results?.filter(test => {
    const matchesFilter = disparityFilter === 'all' || 
      (disparityFilter === 'different' && test.are_equivalent === false) ||
      (disparityFilter === 'equivalent' && test.are_equivalent === true) ||
      (disparityFilter === 'high_significance' && test.significance === 'high') ||
      (disparityFilter === 'critical_significance' && test.significance === 'critical') ||
      (disparityFilter === 'medium_significance' && test.significance === 'medium');
    
    const matchesSearch = !disparitySearchTerm || 
      test.test_id?.toLowerCase().includes(disparitySearchTerm.toLowerCase()) ||
      test.who_classification?.toLowerCase().includes(disparitySearchTerm.toLowerCase()) ||
      test.icc_classification?.toLowerCase().includes(disparitySearchTerm.toLowerCase()) ||
      test.test_focus?.toLowerCase().includes(disparitySearchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  }) || [];

  // Process disparity data for visualizations
  const processDisparityData = () => {
    if (!disparityData?.test_results) return {};
    
    const significanceCount = {};
    const focusAreaDetails = {};
    
    disparityData.test_results.forEach(test => {
      const sig = test.significance || 'unknown';
      significanceCount[sig] = (significanceCount[sig] || 0) + 1;
      
      const focus = test.test_focus || 'unknown';
      if (!focusAreaDetails[focus]) {
        focusAreaDetails[focus] = {
          total: 0,
          high: 0,
          medium: 0,
          low: 0,
          minimal: 0,
          critical: 0
        };
      }
      focusAreaDetails[focus].total++;
      focusAreaDetails[focus][sig] = (focusAreaDetails[focus][sig] || 0) + 1;
    });
    
    return { significanceCount, focusAreaDetails };
  };

  const processedDisparityData = processDisparityData();
  const summary = disparityData?.summary || {};

  // Chart data
  const overviewData = {
    labels: ['Equivalent Results', 'Different Results'],
    datasets: [{
      data: [summary.equivalent_results || 0, summary.different_results || 0],
      backgroundColor: ['#10b981', '#ef4444'],
      borderColor: ['#059669', '#dc2626'],
      borderWidth: 2
    }]
  };

  const significanceData = {
    labels: Object.keys(processedDisparityData.significanceCount || {}),
    datasets: [{
      label: 'Test Cases by Significance',
      data: Object.values(processedDisparityData.significanceCount || {}),
      backgroundColor: ['#7f1d1d', '#dc2626', '#f59e0b', '#3b82f6', '#10b981'],
      borderColor: ['#991b1b', '#b91c1c', '#d97706', '#2563eb', '#059669'],
      borderWidth: 2
    }]
  };

  const focusAreasData = {
    labels: Object.keys(summary.differences_by_focus || {}),
    datasets: [{
      label: 'Differences by Focus Area',
      data: Object.values(summary.differences_by_focus || {}),
      backgroundColor: [
        '#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6',
        '#f97316', '#06b6d4', '#84cc16', '#ec4899', '#6366f1',
        '#14b8a6', '#f43f5e', '#a855f7', '#22c55e'
      ],
      borderWidth: 2
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
      },
    },
  };

  const getSignificanceColor = (significance) => {
    const colors = {
      critical: 'bg-red-800 text-white',
      high: 'bg-red-600 text-white',
      medium: 'bg-yellow-500 text-white',
      low: 'bg-blue-500 text-white',
      minimal: 'bg-green-500 text-white'
    };
    return colors[significance] || 'bg-gray-500 text-white';
  };

  const getImpactColor = (score) => {
    if (score >= 8) return 'bg-red-600 text-white';
    if (score >= 5) return 'bg-yellow-500 text-white';
    if (score >= 2) return 'bg-blue-500 text-white';
    return 'bg-green-500 text-white';
  };

  return (
    <>
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .responsive-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }
        @media (min-width: 768px) {
          .responsive-grid {
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          }
        }
        @media (min-width: 1024px) {
          .responsive-grid {
            grid-template-columns: 350px 450px 1fr;
          }
        }
        .wide-container {
          max-width: 98%;
          margin: 0 auto;
          padding: 0 1rem;
        }
        @media (min-width: 768px) {
          .wide-container {
            padding: 0 2rem;
          }
        }
      `}</style>
      
      <div style={{ minHeight: '100vh', backgroundColor: 'var(--secondary-background-color)' }}>
        <section style={{
          backgroundColor: 'var(--background-color)',
          padding: '4rem 0 3rem',
          boxShadow: 'var(--box-shadow)',
          borderBottom: '1px solid rgba(0, 150, 136, 0.1)'
        }}>
          <div className="wide-container">
            <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
              <h1 style={{ 
                fontSize: '2.5rem', 
                fontWeight: 'bold', 
                color: 'var(--text-color)', 
                marginBottom: '1rem' 
              }}>
                <span className="text-gradient">Testing Suite Dashboard</span>
              </h1>
              <p style={{ 
                fontSize: '1.125rem', 
                color: '#4a5568', 
                marginBottom: '2rem', 
                lineHeight: '1.6' 
              }}>
                Comprehensive test suite results for WHO 2022 and ICC 2022 classification functions
              </p>
              
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '2rem'
              }}>
                <div style={{
                  display: 'flex',
                  backgroundColor: 'var(--secondary-background-color)',
                  borderRadius: 'var(--border-radius)',
                  padding: '0.25rem'
                }}>
                  <button
                    onClick={() => setActiveTab('individual')}
                    style={{
                      padding: '0.75rem 1.5rem',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      borderRadius: 'var(--border-radius)',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'var(--transition)',
                      backgroundColor: activeTab === 'individual' ? 'var(--primary-color)' : 'transparent',
                      color: activeTab === 'individual' ? 'white' : 'var(--text-color)'
                    }}
                  >
                    Individual Tests
                  </button>
                  <button
                    onClick={() => setActiveTab('differences')}
                    style={{
                      padding: '0.75rem 1.5rem',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      borderRadius: 'var(--border-radius)',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'var(--transition)',
                      backgroundColor: activeTab === 'differences' ? 'var(--primary-color)' : 'transparent',
                      color: activeTab === 'differences' ? 'white' : 'var(--text-color)'
                    }}
                  >
                    WHO vs ICC Analysis ({disparityData?.summary?.total_tests || 0})
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section style={{ padding: '3rem 0' }}>
          <div className="wide-container">
            {activeTab === 'individual' ? (
              <div className="responsive-grid">
                <div style={{
                  backgroundColor: 'var(--background-color)',
                  borderRadius: 'var(--border-radius)',
                  boxShadow: 'var(--box-shadow)',
                  padding: '2rem',
                  height: 'fit-content'
                }}>
                  <h2 style={{ 
                    fontSize: '1.25rem', 
                    fontWeight: 'bold', 
                    color: 'var(--text-color)', 
                    marginBottom: '0.5rem' 
                  }}>
                    Test Configuration
                  </h2>
                  
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ 
                      display: 'block', 
                      fontSize: '0.875rem', 
                      fontWeight: '600', 
                      color: 'var(--text-color)', 
                      marginBottom: '0.5rem' 
                    }}>
                      Test Type
                    </label>
                    <select
                      value="synthetic_positive_unit_tests"
                      disabled
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: 'var(--border-radius)',
                        backgroundColor: '#f9fafb',
                        color: '#6b7280',
                        fontSize: '0.875rem',
                        cursor: 'not-allowed'
                      }}
                    >
                      <option value="synthetic_positive_unit_tests">Synthetic Positive Unit Tests</option>
                      <option value="real_world_validation" disabled>Real-world Validation (Coming Soon)</option>
                    </select>
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ 
                      display: 'block', 
                      fontSize: '0.875rem', 
                      fontWeight: '600', 
                      color: 'var(--text-color)', 
                      marginBottom: '0.5rem' 
                    }}>
                      Select Test Suite
                    </label>
                    <select
                      value={selectedSuite}
                      onChange={(e) => {
                        setSelectedSuite(e.target.value);
                        setSelectedTest(null);
                      }}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: 'var(--border-radius)',
                        backgroundColor: 'var(--background-color)',
                        color: 'var(--text-color)',
                        fontSize: '0.875rem'
                      }}
                    >
                      {Object.entries(testData.test_suites).map(([key, suite]) => (
                        <option key={key} value={key}>
                          {suite.test_suite} ({suite.total_tests} tests)
                        </option>
                      ))}
                    </select>
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ 
                      display: 'block', 
                      fontSize: '0.875rem', 
                      fontWeight: '600', 
                      color: 'var(--text-color)', 
                      marginBottom: '0.5rem' 
                    }}>
                      Filter Tests
                    </label>
                    <select
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: 'var(--border-radius)',
                        backgroundColor: 'var(--background-color)',
                        color: 'var(--text-color)',
                        fontSize: '0.875rem'
                      }}
                    >
                      <option value="all">All Tests</option>
                      <option value="passed">Passed Only</option>
                      <option value="failed">Failed Only</option>
                    </select>
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ 
                      display: 'block', 
                      fontSize: '0.875rem', 
                      fontWeight: '600', 
                      color: 'var(--text-color)', 
                      marginBottom: '0.5rem' 
                    }}>
                      Search Tests
                    </label>
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search by name, classification, or input..."
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: 'var(--border-radius)',
                        backgroundColor: 'var(--background-color)',
                        color: 'var(--text-color)',
                        fontSize: '0.875rem'
                      }}
                    />
                  </div>

                  {testData.summary && (
                    <div style={{
                      backgroundColor: 'var(--secondary-background-color)',
                      borderRadius: 'var(--border-radius)',
                      padding: '1rem'
                    }}>
                      <h3 style={{ 
                        fontWeight: '600', 
                        color: 'var(--text-color)', 
                        marginBottom: '0.75rem',
                        fontSize: '0.875rem'
                      }}>
                        Test Summary
                      </h3>
                      {Object.entries(testData.summary).map(([key, summary]) => (
                        <div key={key} style={{ marginBottom: '0.5rem' }}>
                          <p style={{ 
                            fontSize: '0.75rem', 
                            fontWeight: '600', 
                            color: 'var(--text-color)', 
                            textTransform: 'capitalize' 
                          }}>
                            {key}
                          </p>
                          <div style={{ fontSize: '0.6875rem', color: '#6b7280' }}>
                            <span style={{ color: '#059669' }}>✓ {summary.who_2022_passed || 0} WHO 2022</span>
                            {summary.icc_2022_passed && (
                              <span style={{ marginLeft: '0.5rem', color: 'var(--primary-color)' }}>
                                ✓ {summary.icc_2022_passed} ICC 2022
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div style={{
                  backgroundColor: 'var(--background-color)',
                  borderRadius: 'var(--border-radius)',
                  boxShadow: 'var(--box-shadow)',
                  padding: '2rem',
                  height: 'fit-content'
                }}>
                  <h2 style={{ 
                    fontSize: '1.25rem', 
                    fontWeight: 'bold', 
                    color: 'var(--text-color)', 
                    marginBottom: '1.5rem' 
                  }}>
                    Test Cases ({filteredTests.length})
                  </h2>
                  
                  <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '0.75rem', 
                    maxHeight: '600px', 
                    overflowY: 'auto' 
                  }}>
                    {filteredTests.map((test, index) => {
                      const testResults = getTestResults(test);
                      return (
                        <div
                          key={index}
                          onClick={() => setSelectedTest(test)}
                          style={{
                            padding: '1rem',
                            border: selectedTest === test ? '2px solid var(--primary-color)' : '1px solid #e5e7eb',
                            borderRadius: 'var(--border-radius)',
                            cursor: 'pointer',
                            transition: 'var(--transition)',
                            backgroundColor: selectedTest === test ? 'rgba(0, 150, 136, 0.05)' : 'var(--background-color)'
                          }}
                          onMouseOver={(e) => {
                            if (selectedTest !== test) {
                              e.target.style.backgroundColor = 'var(--secondary-background-color)';
                            }
                          }}
                          onMouseOut={(e) => {
                            if (selectedTest !== test) {
                              e.target.style.backgroundColor = 'var(--background-color)';
                            }
                          }}
                        >
                          <div style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'flex-start', 
                            marginBottom: '0.5rem' 
                          }}>
                            <h3 style={{ 
                              fontSize: '0.875rem', 
                              fontWeight: '600', 
                              color: 'var(--text-color)',
                              wordWrap: 'break-word',
                              overflowWrap: 'break-word',
                              lineHeight: '1.4'
                            }}>
                              {testResults?.expected}
                            </h3>
                            <span style={{
                              padding: '0.25rem 0.5rem',
                              fontSize: '0.6875rem',
                              borderRadius: '9999px',
                              backgroundColor: getStatusColor(testResults?.success),
                              color: getStatusTextColor(testResults?.success),
                              fontWeight: '600'
                            }}>
                              {getSuccessStatus(testResults?.success) ? 'PASS' : 'FAIL'}
                            </span>
                          </div>
                          <p style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
                            Blasts: {test.input_data?.blasts_percentage || 'N/A'}%
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div style={{
                  backgroundColor: 'var(--background-color)',
                  borderRadius: 'var(--border-radius)',
                  boxShadow: 'var(--box-shadow)',
                  padding: '2rem',
                  height: 'fit-content',
                  minWidth: 0,
                  overflow: 'hidden'
                }}>
                  <h2 style={{ 
                    fontSize: '1.25rem', 
                    fontWeight: 'bold', 
                    color: 'var(--text-color)', 
                    marginBottom: '1.5rem' 
                  }}>
                    Test Details
                  </h2>
                  
                  {selectedTest ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                      <div>
                        <h3 style={{ 
                          fontSize: '1.125rem', 
                          fontWeight: '600', 
                          color: 'var(--text-color)', 
                          marginBottom: '0.5rem',
                          wordWrap: 'break-word',
                          overflowWrap: 'break-word'
                        }}>
                          {selectedTest.test_method}
                        </h3>
                        <p style={{ 
                          fontSize: '0.875rem', 
                          color: '#6b7280',
                          wordWrap: 'break-word',
                          overflowWrap: 'break-word'
                        }}>
                          {selectedTest.test_name}
                        </p>
                      </div>

                      <div>
                        <h4 style={{ fontWeight: '600', color: 'var(--text-color)', marginBottom: '0.5rem' }}>Input Data</h4>
                        <div style={{
                          backgroundColor: 'var(--secondary-background-color)',
                          borderRadius: 'var(--border-radius)',
                          padding: '0.75rem',
                          overflow: 'auto',
                          maxHeight: '200px'
                        }}>
                          <pre style={{ 
                            fontSize: '0.75rem', 
                            color: 'var(--text-color)', 
                            whiteSpace: 'pre-wrap',
                            wordWrap: 'break-word',
                            overflowWrap: 'break-word',
                            fontFamily: 'monospace',
                            margin: 0,
                            lineHeight: '1.4'
                          }}>
                            {JSON.stringify(selectedTest.input_data, null, 2)}
                          </pre>
                        </div>
                      </div>

                      {(() => {
                        const testResults = getTestResults(selectedTest);
                        return (
                          <div>
                            <h4 style={{ fontWeight: '600', color: 'var(--text-color)', marginBottom: '0.5rem' }}>
                              Classification Results
                            </h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                              <div>
                                <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#6b7280' }}>Expected:</p>
                                <p style={{
                                  fontSize: '0.875rem',
                                  color: 'var(--text-color)',
                                  backgroundColor: 'rgba(59, 130, 246, 0.1)',
                                  padding: '0.5rem',
                                  borderRadius: 'var(--border-radius)',
                                  wordWrap: 'break-word',
                                  overflowWrap: 'break-word',
                                  lineHeight: '1.4'
                                }}>
                                  {testResults?.expected}
                                </p>
                              </div>
                              <div>
                                <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#6b7280' }}>Actual:</p>
                                <p style={{
                                  fontSize: '0.875rem',
                                  padding: '0.5rem',
                                  borderRadius: 'var(--border-radius)',
                                  backgroundColor: getMatchesExpected(testResults?.matches_expected) 
                                    ? 'rgba(16, 185, 129, 0.1)' 
                                    : 'rgba(239, 68, 68, 0.1)',
                                  color: getMatchesExpected(testResults?.matches_expected) 
                                    ? '#059669' 
                                    : '#dc2626',
                                  wordWrap: 'break-word',
                                  overflowWrap: 'break-word',
                                  lineHeight: '1.4'
                                }}>
                                  {testResults?.actual}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })()}

                      {(() => {
                        const testResults = getTestResults(selectedTest);
                        return (
                          <div>
                            <h4 style={{ fontWeight: '600', color: 'var(--text-color)', marginBottom: '0.5rem' }}>
                              Derivation Logic
                            </h4>
                            <div style={{
                              backgroundColor: 'var(--secondary-background-color)',
                              borderRadius: 'var(--border-radius)',
                              padding: '0.75rem',
                              maxHeight: '300px',
                              overflowY: 'auto',
                              overflowX: 'hidden'
                            }}>
                              <ol style={{ 
                                fontSize: '0.75rem', 
                                color: 'var(--text-color)', 
                                margin: 0,
                                paddingLeft: '1rem',
                                lineHeight: '1.5'
                              }}>
                                {testResults?.derivation?.map((step, index) => (
                                  <li key={index} style={{ 
                                    marginBottom: '0.5rem',
                                    wordWrap: 'break-word',
                                    overflowWrap: 'break-word'
                                  }}>
                                    {step}
                                  </li>
                                ))}
                              </ol>
                            </div>
                          </div>
                        );
                      })()}

                      {(() => {
                        const testResults = getTestResults(selectedTest);
                        return (
                          <div>
                            <h4 style={{ fontWeight: '600', color: 'var(--text-color)', marginBottom: '0.5rem' }}>
                              Test Status
                            </h4>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                              <span style={{
                                padding: '0.5rem 0.75rem',
                                fontSize: '0.875rem',
                                borderRadius: '9999px',
                                backgroundColor: getStatusColor(testResults?.success),
                                color: getStatusTextColor(testResults?.success),
                                fontWeight: '600',
                                whiteSpace: 'nowrap'
                              }}>
                                {getSuccessStatus(testResults?.success) ? 'PASSED' : 'FAILED'}
                              </span>
                              <span style={{
                                padding: '0.5rem 0.75rem',
                                fontSize: '0.875rem',
                                borderRadius: '9999px',
                                backgroundColor: getMatchesExpected(testResults?.matches_expected) 
                                  ? 'rgba(16, 185, 129, 0.1)' 
                                  : 'rgba(239, 68, 68, 0.1)',
                                color: getMatchesExpected(testResults?.matches_expected) 
                                  ? '#059669' 
                                  : '#dc2626',
                                fontWeight: '600',
                                whiteSpace: 'nowrap'
                              }}>
                                {getMatchesExpected(testResults?.matches_expected) ? 'MATCHES EXPECTED' : 'MISMATCH'}
                              </span>
                            </div>
                          </div>
                        );
                      })()}

                      {(() => {
                        const testResults = getTestResults(selectedTest);
                        return testResults?.error && (
                          <div>
                            <h4 style={{ fontWeight: '600', color: '#dc2626', marginBottom: '0.5rem' }}>Error</h4>
                            <div style={{
                              backgroundColor: 'rgba(239, 68, 68, 0.1)',
                              border: '1px solid rgba(239, 68, 68, 0.2)',
                              borderRadius: 'var(--border-radius)',
                              padding: '0.75rem'
                            }}>
                              <p style={{ 
                                fontSize: '0.875rem', 
                                color: '#dc2626',
                                wordWrap: 'break-word',
                                overflowWrap: 'break-word',
                                lineHeight: '1.4'
                              }}>
                                {testResults.error}
                              </p>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  ) : (
                    <div style={{ 
                      textAlign: 'center', 
                      color: '#9ca3af', 
                      padding: '2rem 0',
                      fontSize: '0.875rem'
                    }}>
                      <p>Select a test case to view details</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              // Enhanced WHO vs ICC Disparity Analysis Dashboard
              <div>
                {/* Disparity Sub-Navigation */}
                <div style={{
                  backgroundColor: 'var(--background-color)',
                  borderRadius: 'var(--border-radius)',
                  boxShadow: 'var(--box-shadow)',
                  padding: '1.5rem',
                  marginBottom: '2rem'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                    <div style={{
                      display: 'flex',
                      backgroundColor: 'var(--secondary-background-color)',
                      borderRadius: 'var(--border-radius)',
                      padding: '0.25rem'
                    }}>
                      {[
                        { id: 'overview', label: 'Overview', icon: '📊' },
                        { id: 'visualizations', label: 'Charts', icon: '📈' },
                        { id: 'analysis', label: 'Analysis', icon: '🔍' },
                        { id: 'explorer', label: 'Test Explorer', icon: '🗂️' }
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setDisparitySubTab(tab.id)}
                          style={{
                            padding: '0.75rem 1.25rem',
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            borderRadius: 'var(--border-radius)',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'var(--transition)',
                            backgroundColor: disparitySubTab === tab.id ? 'var(--primary-color)' : 'transparent',
                            color: disparitySubTab === tab.id ? 'white' : 'var(--text-color)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                          }}
                        >
                          <span>{tab.icon}</span>
                          <span>{tab.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Tab Content */}
                {disparitySubTab === 'overview' && (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                    gap: '2rem'
                  }}>
                    <div style={{
                      backgroundColor: 'var(--background-color)',
                      borderRadius: 'var(--border-radius)',
                      boxShadow: 'var(--box-shadow)',
                      padding: '2rem'
                    }}>
                      <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--text-color)' }}>
                        Results Distribution
                      </h3>
                      <div style={{ height: '300px' }}>
                        <Pie data={overviewData} options={chartOptions} />
                      </div>
                    </div>

                    <div style={{
                      backgroundColor: 'var(--background-color)',
                      borderRadius: 'var(--border-radius)',
                      boxShadow: 'var(--box-shadow)',
                      padding: '2rem'
                    }}>
                      <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--text-color)' }}>
                        Focus Area Breakdown
                      </h3>
                      <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                        {Object.entries(summary.differences_by_focus || {}).map(([focus, count]) => (
                          <div key={focus} style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '0.75rem',
                            borderBottom: '1px solid var(--secondary-background-color)',
                            fontSize: '0.875rem'
                          }}>
                            <span style={{ color: 'var(--text-color)', textTransform: 'capitalize' }}>
                              {focus.replace(/_/g, ' ')}
                            </span>
                            <span style={{
                              backgroundColor: 'var(--primary-color)',
                              color: 'white',
                              padding: '0.25rem 0.5rem',
                              borderRadius: '0.25rem',
                              fontSize: '0.75rem',
                              fontWeight: '600'
                            }}>
                              {count}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {disparitySubTab === 'visualizations' && (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                    gap: '2rem'
                  }}>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                      gap: '2rem'
                    }}>
                      <div style={{
                        backgroundColor: 'var(--background-color)',
                        borderRadius: 'var(--border-radius)',
                        boxShadow: 'var(--box-shadow)',
                        padding: '2rem'
                      }}>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--text-color)' }}>
                          Significance Distribution
                        </h3>
                        <div style={{ height: '300px' }}>
                          <Bar data={significanceData} options={{
                            ...chartOptions,
                            scales: {
                              y: {
                                beginAtZero: true,
                                title: {
                                  display: true,
                                  text: 'Number of Test Cases'
                                }
                              }
                            }
                          }} />
                        </div>
                      </div>

                      <div style={{
                        backgroundColor: 'var(--background-color)',
                        borderRadius: 'var(--border-radius)',
                        boxShadow: 'var(--box-shadow)',
                        padding: '2rem'
                      }}>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--text-color)' }}>
                          Clinical Impact Categories
                        </h3>
                        <div style={{ height: '300px' }}>
                          <Doughnut data={{
                            labels: Object.keys(summary.differences_by_category || {}),
                            datasets: [{
                              data: Object.values(summary.differences_by_category || {}),
                              backgroundColor: ['#dc2626', '#f59e0b', '#f97316', '#10b981'],
                              borderColor: ['#b91c1c', '#d97706', '#ea580c', '#059669'],
                              borderWidth: 2
                            }]
                          }} options={chartOptions} />
                        </div>
                      </div>
                    </div>

                    <div style={{
                      backgroundColor: 'var(--background-color)',
                      borderRadius: 'var(--border-radius)',
                      boxShadow: 'var(--box-shadow)',
                      padding: '2rem'
                    }}>
                      <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--text-color)' }}>
                        Differences by Focus Area
                      </h3>
                      <div style={{ height: '400px' }}>
                        <Bar data={focusAreasData} options={{
                          ...chartOptions,
                          scales: {
                            y: {
                              beginAtZero: true,
                              title: {
                                display: true,
                                text: 'Number of Differences'
                              }
                            },
                            x: {
                              title: {
                                display: true,
                                text: 'Focus Areas'
                              }
                            }
                          }
                        }} />
                      </div>
                    </div>
                  </div>
                )}

                {disparitySubTab === 'analysis' && (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                    gap: '2rem'
                  }}>
                    <div style={{
                      backgroundColor: 'var(--background-color)',
                      borderRadius: 'var(--border-radius)',
                      boxShadow: 'var(--box-shadow)',
                      padding: '2rem'
                    }}>
                      <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--text-color)' }}>
                        Focus Area Impact Analysis
                      </h3>
                      <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                          <thead>
                            <tr style={{ backgroundColor: 'var(--secondary-background-color)' }}>
                              <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>
                                Focus Area
                              </th>
                              <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>
                                Total Cases
                              </th>
                              <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>
                                Critical
                              </th>
                              <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>
                                High
                              </th>
                              <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>
                                Medium
                              </th>
                              <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>
                                Low/Minimal
                              </th>
                            </tr>
                          </thead>
                          <tbody style={{ backgroundColor: 'var(--background-color)' }}>
                            {Object.entries(processedDisparityData.focusAreaDetails || {}).map(([focus, details]) => (
                              <tr key={focus} style={{ borderBottom: '1px solid var(--secondary-background-color)' }}>
                                <td style={{ padding: '1rem', fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-color)', textTransform: 'capitalize' }}>
                                  {focus.replace(/_/g, ' ')}
                                </td>
                                <td style={{ padding: '1rem', fontSize: '0.875rem', color: 'var(--text-color)' }}>
                                  {details.total}
                                </td>
                                <td style={{ padding: '1rem' }}>
                                  <span style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: '9999px',
                                    fontSize: '0.75rem',
                                    fontWeight: '500',
                                    backgroundColor: 'rgba(127, 29, 29, 0.1)',
                                    color: '#7f1d1d'
                                  }}>
                                    {details.critical || 0}
                                  </span>
                                </td>
                                <td style={{ padding: '1rem' }}>
                                  <span style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: '9999px',
                                    fontSize: '0.75rem',
                                    fontWeight: '500',
                                    backgroundColor: 'rgba(220, 38, 38, 0.1)',
                                    color: '#dc2626'
                                  }}>
                                    {details.high || 0}
                                  </span>
                                </td>
                                <td style={{ padding: '1rem' }}>
                                  <span style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: '9999px',
                                    fontSize: '0.75rem',
                                    fontWeight: '500',
                                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                                    color: '#f59e0b'
                                  }}>
                                    {details.medium || 0}
                                  </span>
                                </td>
                                <td style={{ padding: '1rem' }}>
                                  <span style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: '9999px',
                                    fontSize: '0.75rem',
                                    fontWeight: '500',
                                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                                    color: '#10b981'
                                  }}>
                                    {(details.low || 0) + (details.minimal || 0)}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {disparitySubTab === 'explorer' && (
                  <div className="responsive-grid">
                    {/* Left Panel - Filters */}
                    <div style={{
                      backgroundColor: 'var(--background-color)',
                      borderRadius: 'var(--border-radius)',
                      boxShadow: 'var(--box-shadow)',
                      padding: '2rem',
                      height: 'fit-content'
                    }}>
                      <h2 style={{ 
                        fontSize: '1.25rem', 
                        fontWeight: 'bold', 
                        color: 'var(--text-color)', 
                        marginBottom: '1rem' 
                      }}>
                        Test Explorer
                      </h2>
                      
                      <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ 
                          display: 'block', 
                          fontSize: '0.875rem', 
                          fontWeight: '600', 
                          color: 'var(--text-color)', 
                          marginBottom: '0.5rem' 
                        }}>
                          Filter by Result
                        </label>
                        <select
                          value={disparityFilter}
                          onChange={(e) => setDisparityFilter(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: '1px solid #d1d5db',
                            borderRadius: 'var(--border-radius)',
                            backgroundColor: 'var(--background-color)',
                            color: 'var(--text-color)',
                            fontSize: '0.875rem'
                          }}
                        >
                          <option value="all">All Tests</option>
                          <option value="different">Different Results</option>
                          <option value="equivalent">Equivalent Results</option>
                          <option value="critical_significance">Critical Significance</option>
                          <option value="high_significance">High Significance</option>
                          <option value="medium_significance">Medium Significance</option>
                        </select>
                      </div>

                      <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ 
                          display: 'block', 
                          fontSize: '0.875rem', 
                          fontWeight: '600', 
                          color: 'var(--text-color)', 
                          marginBottom: '0.5rem' 
                        }}>
                          Search Tests
                        </label>
                        <input
                          type="text"
                          value={disparitySearchTerm}
                          onChange={(e) => setDisparitySearchTerm(e.target.value)}
                          placeholder="Search by test ID, classification, or focus..."
                          style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: '1px solid #d1d5db',
                            borderRadius: 'var(--border-radius)',
                            backgroundColor: 'var(--background-color)',
                            color: 'var(--text-color)',
                            fontSize: '0.875rem'
                          }}
                        />
                      </div>

                      <div style={{
                        backgroundColor: 'var(--secondary-background-color)',
                        borderRadius: 'var(--border-radius)',
                        padding: '1rem'
                      }}>
                        <h3 style={{ 
                          fontWeight: '600', 
                          color: 'var(--text-color)', 
                          marginBottom: '0.75rem',
                          fontSize: '0.875rem'
                        }}>
                          Filtered Results
                        </h3>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                          Showing {filteredDisparityTests.length} of {disparityData?.test_results?.length || 0} tests
                        </div>
                      </div>
                    </div>

                    {/* Middle Panel - Test List */}
                    <div style={{
                      backgroundColor: 'var(--background-color)',
                      borderRadius: 'var(--border-radius)',
                      boxShadow: 'var(--box-shadow)',
                      height: '800px',
                      display: 'flex',
                      flexDirection: 'column'
                    }}>
                      <div style={{ 
                        padding: '1.5rem 1.5rem 1rem',
                        borderBottom: '1px solid var(--secondary-background-color)'
                      }}>
                        <h3 style={{ 
                          fontSize: '1.125rem', 
                          fontWeight: 'bold', 
                          color: 'var(--text-color)',
                          margin: 0
                        }}>
                          Test Cases
                        </h3>
                      </div>
                      
                      <div style={{ 
                        flex: 1, 
                        overflowY: 'auto',
                        padding: '0'
                      }}>
                        {filteredDisparityTests.map((test, index) => (
                          <div
                            key={test.test_id}
                            onClick={() => setSelectedDisparityTest(test)}
                            style={{
                              padding: '1rem 1.5rem',
                              borderBottom: '1px solid var(--secondary-background-color)',
                              cursor: 'pointer',
                              backgroundColor: selectedDisparityTest?.test_id === test.test_id 
                                ? 'rgba(0, 150, 136, 0.1)' 
                                : 'transparent',
                              borderLeft: selectedDisparityTest?.test_id === test.test_id 
                                ? '4px solid var(--primary-color)' 
                                : '4px solid transparent',
                              transition: 'var(--transition)'
                            }}
                            onMouseOver={(e) => {
                              if (selectedDisparityTest?.test_id !== test.test_id) {
                                e.target.style.backgroundColor = 'var(--secondary-background-color)';
                              }
                            }}
                            onMouseOut={(e) => {
                              if (selectedDisparityTest?.test_id !== test.test_id) {
                                e.target.style.backgroundColor = 'transparent';
                              }
                            }}
                          >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                              <div style={{ flex: 1 }}>
                                <h4 style={{ 
                                  fontSize: '0.875rem', 
                                  fontWeight: '600', 
                                  color: 'var(--text-color)', 
                                  marginBottom: '0.5rem',
                                  wordWrap: 'break-word'
                                }}>
                                  {test.test_id}
                                </h4>
                                
                                <div style={{ fontSize: '0.75rem', marginBottom: '0.75rem' }}>
                                  <div style={{ marginBottom: '0.25rem' }}>
                                    <span style={{ color: '#6b7280' }}>WHO:</span>
                                    <span style={{ marginLeft: '0.5rem', color: 'var(--text-color)' }}>
                                      {test.who_classification}
                                    </span>
                                  </div>
                                  <div>
                                    <span style={{ color: '#6b7280' }}>ICC:</span>
                                    <span style={{ marginLeft: '0.5rem', color: 'var(--text-color)' }}>
                                      {test.icc_classification}
                                    </span>
                                  </div>
                                </div>
                                
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                  <span className={getSignificanceColor(test.significance)} style={{
                                    padding: '0.25rem 0.5rem',
                                    borderRadius: '9999px',
                                    fontSize: '0.625rem',
                                    fontWeight: '500',
                                    textTransform: 'capitalize'
                                  }}>
                                    {test.significance}
                                  </span>
                                  
                                  <span className={getImpactColor(test.clinical_impact_score)} style={{
                                    padding: '0.25rem 0.5rem',
                                    borderRadius: '9999px',
                                    fontSize: '0.625rem',
                                    fontWeight: '500'
                                  }}>
                                    Impact: {test.clinical_impact_score}
                                  </span>
                                  
                                  <span style={{
                                    padding: '0.25rem 0.5rem',
                                    borderRadius: '9999px',
                                    fontSize: '0.625rem',
                                    fontWeight: '500',
                                    backgroundColor: 'var(--secondary-background-color)',
                                    color: 'var(--text-color)'
                                  }}>
                                    {test.test_focus?.replace(/_/g, ' ')}
                                  </span>
                                </div>
                              </div>
                              
                              <div style={{ marginLeft: '1rem' }}>
                                {test.are_equivalent ? (
                                  <div style={{ color: '#10b981', fontSize: '1.25rem' }}>✓</div>
                                ) : (
                                  <div style={{ color: '#ef4444', fontSize: '1.25rem' }}>✗</div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right Panel - Test Details */}
                    <div style={{
                      backgroundColor: 'var(--background-color)',
                      borderRadius: 'var(--border-radius)',
                      boxShadow: 'var(--box-shadow)',
                      height: '800px',
                      display: 'flex',
                      flexDirection: 'column'
                    }}>
                      <div style={{ 
                        padding: '1.5rem 1.5rem 1rem',
                        borderBottom: '1px solid var(--secondary-background-color)'
                      }}>
                        <h3 style={{ 
                          fontSize: '1.125rem', 
                          fontWeight: 'bold', 
                          color: 'var(--text-color)',
                          margin: 0
                        }}>
                          Test Details
                        </h3>
                      </div>
                      
                      {selectedDisparityTest ? (
                        <div style={{ 
                          flex: 1, 
                          overflowY: 'auto',
                          padding: '1.5rem'
                        }}>
                          <div style={{ marginBottom: '1.5rem' }}>
                            <h4 style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-color)', marginBottom: '0.75rem' }}>
                              Test Information
                            </h4>
                            <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                <span>ID:</span>
                                <span style={{ fontWeight: '600', color: 'var(--text-color)' }}>{selectedDisparityTest.test_id}</span>
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                <span>Focus:</span>
                                <span style={{ fontWeight: '600', color: 'var(--text-color)', textTransform: 'capitalize' }}>
                                  {selectedDisparityTest.test_focus?.replace(/_/g, ' ')}
                                </span>
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>Equivalent:</span>
                                <span style={{ 
                                  fontWeight: '600', 
                                  color: selectedDisparityTest.are_equivalent ? '#10b981' : '#ef4444' 
                                }}>
                                  {selectedDisparityTest.are_equivalent ? 'Yes' : 'No'}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          {selectedDisparityTest.input_data && (
                            <div style={{ marginBottom: '1.5rem' }}>
                              <h4 style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-color)', marginBottom: '0.75rem' }}>
                                Input Data
                              </h4>
                              <div style={{
                                backgroundColor: 'var(--secondary-background-color)',
                                borderRadius: 'var(--border-radius)',
                                padding: '0.75rem'
                              }}>
                                <pre style={{ 
                                  fontSize: '0.625rem', 
                                  color: '#6b7280',
                                  margin: 0,
                                  whiteSpace: 'pre-wrap',
                                  wordWrap: 'break-word'
                                }}>
                                  {JSON.stringify(selectedDisparityTest.input_data, null, 2)}
                                </pre>
                              </div>
                            </div>
                          )}
                          
                          <div style={{ marginBottom: '1.5rem' }}>
                            <h4 style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-color)', marginBottom: '0.75rem' }}>
                              Classifications
                            </h4>
                            <div style={{ marginBottom: '0.75rem' }}>
                              <div style={{
                                padding: '0.75rem',
                                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                                borderRadius: 'var(--border-radius)'
                              }}>
                                <div style={{ fontSize: '0.625rem', fontWeight: '600', color: '#3b82f6', marginBottom: '0.25rem' }}>
                                  WHO 2022
                                </div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-color)' }}>
                                  {selectedDisparityTest.who_classification}
                                </div>
                              </div>
                            </div>
                            <div>
                              <div style={{
                                padding: '0.75rem',
                                backgroundColor: 'rgba(139, 92, 246, 0.1)',
                                borderRadius: 'var(--border-radius)'
                              }}>
                                <div style={{ fontSize: '0.625rem', fontWeight: '600', color: '#8b5cf6', marginBottom: '0.25rem' }}>
                                  ICC 2022
                                </div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-color)' }}>
                                  {selectedDisparityTest.icc_classification}
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {selectedDisparityTest.who_derivation && (
                            <div style={{ marginBottom: '1.5rem' }}>
                              <h4 style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-color)', marginBottom: '0.75rem' }}>
                                WHO 2022 Derivation Logic
                              </h4>
                              <div style={{
                                backgroundColor: 'rgba(59, 130, 246, 0.05)',
                                borderRadius: 'var(--border-radius)',
                                padding: '0.75rem',
                                maxHeight: '200px',
                                overflowY: 'auto'
                              }}>
                                <ol style={{ 
                                  fontSize: '0.75rem', 
                                  color: 'var(--text-color)', 
                                  margin: 0,
                                  paddingLeft: '1rem',
                                  lineHeight: '1.5'
                                }}>
                                  {selectedDisparityTest.who_derivation.map((step, index) => (
                                    <li key={index} style={{ 
                                      marginBottom: '0.5rem',
                                      wordWrap: 'break-word',
                                      overflowWrap: 'break-word'
                                    }}>
                                      {step}
                                    </li>
                                  ))}
                                </ol>
                              </div>
                            </div>
                          )}

                          {selectedDisparityTest.icc_derivation && (
                            <div style={{ marginBottom: '1.5rem' }}>
                              <h4 style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-color)', marginBottom: '0.75rem' }}>
                                ICC 2022 Derivation Logic
                              </h4>
                              <div style={{
                                backgroundColor: 'rgba(139, 92, 246, 0.05)',
                                borderRadius: 'var(--border-radius)',
                                padding: '0.75rem',
                                maxHeight: '200px',
                                overflowY: 'auto'
                              }}>
                                <ol style={{ 
                                  fontSize: '0.75rem', 
                                  color: 'var(--text-color)', 
                                  margin: 0,
                                  paddingLeft: '1rem',
                                  lineHeight: '1.5'
                                }}>
                                  {selectedDisparityTest.icc_derivation.map((step, index) => (
                                    <li key={index} style={{ 
                                      marginBottom: '0.5rem',
                                      wordWrap: 'break-word',
                                      overflowWrap: 'break-word'
                                    }}>
                                      {step}
                                    </li>
                                  ))}
                                </ol>
                              </div>
                            </div>
                          )}
                          
                          <div style={{ marginBottom: '1.5rem' }}>
                            <h4 style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-color)', marginBottom: '0.75rem' }}>
                              Impact Assessment
                            </h4>
                            <div style={{ marginBottom: '0.5rem' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>Significance:</span>
                                <span className={getSignificanceColor(selectedDisparityTest.significance)} style={{
                                  padding: '0.25rem 0.5rem',
                                  borderRadius: '9999px',
                                  fontSize: '0.625rem',
                                  fontWeight: '500',
                                  textTransform: 'capitalize'
                                }}>
                                  {selectedDisparityTest.significance}
                                </span>
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>Clinical Impact:</span>
                                <span className={getImpactColor(selectedDisparityTest.clinical_impact_score)} style={{
                                  padding: '0.25rem 0.5rem',
                                  borderRadius: '9999px',
                                  fontSize: '0.625rem',
                                  fontWeight: '500'
                                }}>
                                  Score: {selectedDisparityTest.clinical_impact_score}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          {selectedDisparityTest.clinical_consequences && selectedDisparityTest.clinical_consequences.length > 0 && (
                            <div>
                              <h4 style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-color)', marginBottom: '0.75rem' }}>
                                Clinical Consequences
                              </h4>
                              <ul style={{ fontSize: '0.75rem', color: '#6b7280', paddingLeft: '1rem' }}>
                                {selectedDisparityTest.clinical_consequences.map((consequence, index) => (
                                  <li key={index} style={{ marginBottom: '0.25rem' }}>
                                    {consequence}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div style={{ 
                          flex: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#9ca3af',
                          fontSize: '0.875rem'
                        }}>
                          Select a test case to view details
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
} 