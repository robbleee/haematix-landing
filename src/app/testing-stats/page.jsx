'use client';

import { useState, useEffect } from 'react';
import { parse } from 'yaml';

export default function TestingSuitePage() {
  const [testData, setTestData] = useState(null);
  const [selectedSuite, setSelectedSuite] = useState('aml_classification');
  const [selectedTest, setSelectedTest] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestData();
  }, []);

  const fetchTestData = async () => {
    try {
      const response = await fetch('/api/testing-yaml');
      const yamlText = await response.text();
      const data = parse(yamlText);
      setTestData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error loading test data:', error);
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

  if (!testData) {
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
    // Handle both WHO 2022 and ICC 2022 tests, but exclude tests where both are null (error handling tests)
    const testResults = test.who_2022 || test.icc_2022;
    
    // Skip tests that have no valid results (error handling tests)
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
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          }
        }
        @media (min-width: 1024px) {
          .responsive-grid {
            grid-template-columns: 300px 400px 1fr;
          }
        }
        .wide-container {
          max-width: 95%;
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
        {/* Hero Section */}
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
              
              {/* Metadata Cards */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                gap: '1.5rem',
                marginTop: '2rem'
              }}>
                <div style={{
                  backgroundColor: 'var(--background-color)',
                  padding: '1.5rem',
                  borderRadius: 'var(--border-radius)',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                  border: '1px solid rgba(0, 150, 136, 0.1)'
                }}>
                  <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#6b7280', marginBottom: '0.5rem' }}>Test Run</p>
                  <p style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--text-color)' }}>
                    {new Date(testData.test_run_metadata.timestamp).toLocaleString()}
                  </p>
                </div>
                <div style={{
                  backgroundColor: 'var(--background-color)',
                  padding: '1.5rem',
                  borderRadius: 'var(--border-radius)',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                  border: '1px solid rgba(0, 150, 136, 0.1)'
                }}>
                  <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#6b7280', marginBottom: '0.5rem' }}>Total Suites</p>
                  <p style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--text-color)' }}>
                    {testData.test_run_metadata.total_test_suites}
                  </p>
                </div>
                <div style={{
                  backgroundColor: 'var(--background-color)',
                  padding: '1.5rem',
                  borderRadius: 'var(--border-radius)',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                  border: '1px solid rgba(0, 150, 136, 0.1)'
                }}>
                  <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#6b7280', marginBottom: '0.5rem' }}>Python Version</p>
                  <p style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--text-color)' }}>
                    {testData.test_run_metadata.python_version.split(' ')[0]}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section style={{ padding: '3rem 0' }}>
          <div className="wide-container">
            <div className="responsive-grid">
              {/* Left Panel - Test Selection */}
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
                  Test Configuration
                </h2>
                
                {/* Suite Selector */}
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

                {/* Filters */}
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

                {/* Search */}
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

                {/* Summary */}
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

              {/* Middle Panel - Test List */}
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

              {/* Right Panel - Test Details */}
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
                    {/* Test Header */}
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

                    {/* Input Data */}
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

                    {/* Expected vs Actual */}
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

                    {/* Derivation Logic */}
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

                    {/* Status */}
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

                    {/* Error (if any) */}
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
          </div>
        </section>
      </div>
    </>
  );
} 