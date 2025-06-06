'use client';

import { useState, useEffect } from 'react';

export default function TestExplorer() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSignificance, setSelectedSignificance] = useState('all');
  const [selectedFocus, setSelectedFocus] = useState('all');
  const [selectedTest, setSelectedTest] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const testsPerPage = 10;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/disparity-json');
      if (!response.ok) throw new Error('Failed to fetch data');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading test cases...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Data</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  const testResults = data?.test_results || [];

  // Filter tests based on search and filters
  const filteredTests = testResults.filter(test => {
    const matchesSearch = !searchTerm || 
      test.test_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.who_classification.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.icc_classification.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSignificance = selectedSignificance === 'all' || test.significance === selectedSignificance;
    const matchesFocus = selectedFocus === 'all' || test.test_focus === selectedFocus;
    
    return matchesSearch && matchesSignificance && matchesFocus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredTests.length / testsPerPage);
  const startIndex = (currentPage - 1) * testsPerPage;
  const paginatedTests = filteredTests.slice(startIndex, startIndex + testsPerPage);

  // Get unique values for filters
  const significanceLevels = [...new Set(testResults.map(test => test.significance))].filter(Boolean);
  const focusAreas = [...new Set(testResults.map(test => test.test_focus))].filter(Boolean);

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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-3xl font-bold text-gray-900">Test Case Explorer</h1>
            <p className="mt-2 text-gray-600">
              Browse and analyze individual test cases from the WHO vs ICC classification comparison study
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Test Cases
              </label>
              <input
                type="text"
                placeholder="Search by ID, WHO or ICC classification..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Significance Level
              </label>
              <select
                value={selectedSignificance}
                onChange={(e) => setSelectedSignificance(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Levels</option>
                {significanceLevels.map(level => (
                  <option key={level} value={level} className="capitalize">{level}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Focus Area
              </label>
              <select
                value={selectedFocus}
                onChange={(e) => setSelectedFocus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Areas</option>
                {focusAreas.map(area => (
                  <option key={area} value={area} className="capitalize">
                    {area.replace(/_/g, ' ')}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedSignificance('all');
                  setSelectedFocus('all');
                  setCurrentPage(1);
                }}
                className="w-full px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
          
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredTests.length} of {testResults.length} test cases
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Test List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Test Cases</h3>
              </div>
              
              <div className="divide-y divide-gray-200">
                {paginatedTests.map((test, index) => (
                  <div
                    key={test.test_id}
                    className={`p-6 cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedTest?.test_id === test.test_id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                    }`}
                    onClick={() => setSelectedTest(test)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">
                          {test.test_id}
                        </h4>
                        
                        <div className="space-y-1 text-sm">
                          <div>
                            <span className="text-gray-500">WHO:</span>
                            <span className="ml-2 text-gray-900">{test.who_classification}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">ICC:</span>
                            <span className="ml-2 text-gray-900">{test.icc_classification}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 mt-3">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSignificanceColor(test.significance)}`}>
                            {test.significance}
                          </span>
                          
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getImpactColor(test.clinical_impact_score)}`}>
                            Impact: {test.clinical_impact_score}
                          </span>
                          
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {test.test_focus?.replace(/_/g, ' ')}
                          </span>
                        </div>
                      </div>
                      
                      <div className="ml-4">
                        {test.are_equivalent ? (
                          <div className="text-green-500">✓</div>
                        ) : (
                          <div className="text-red-500">✗</div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="px-6 py-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      Page {currentPage} of {totalPages}
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                      >
                        Previous
                      </button>
                      <button
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Test Details */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Test Details</h3>
              </div>
              
              {selectedTest ? (
                <div className="p-6 space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Test Information</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-500">ID:</span>
                        <span className="ml-2 text-gray-900">{selectedTest.test_id}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Focus:</span>
                        <span className="ml-2 text-gray-900 capitalize">
                          {selectedTest.test_focus?.replace(/_/g, ' ')}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">Equivalent:</span>
                        <span className={`ml-2 ${selectedTest.are_equivalent ? 'text-green-600' : 'text-red-600'}`}>
                          {selectedTest.are_equivalent ? 'Yes' : 'No'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Classifications</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <div className="text-xs text-blue-600 font-medium mb-1">WHO 2022</div>
                        <div className="text-sm text-gray-900">{selectedTest.who_classification}</div>
                      </div>
                      <div className="p-3 bg-purple-50 rounded-lg">
                        <div className="text-xs text-purple-600 font-medium mb-1">ICC 2022</div>
                        <div className="text-sm text-gray-900">{selectedTest.icc_classification}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Impact Assessment</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Significance:</span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSignificanceColor(selectedTest.significance)}`}>
                          {selectedTest.significance}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Clinical Impact:</span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getImpactColor(selectedTest.clinical_impact_score)}`}>
                          Score: {selectedTest.clinical_impact_score}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {selectedTest.clinical_consequences && selectedTest.clinical_consequences.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Clinical Consequences</h4>
                      <ul className="space-y-1">
                        {selectedTest.clinical_consequences.map((consequence, index) => (
                          <li key={index} className="text-sm text-gray-600">
                            • {consequence}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {selectedTest.input_data && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Input Data</h4>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <pre className="text-xs text-gray-600 whitespace-pre-wrap">
                          {JSON.stringify(selectedTest.input_data, null, 2)}
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-6 text-center text-gray-500">
                  Select a test case to view details
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 