'use client';

import { useState, useEffect } from 'react';
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

export default function DisparityDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

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
          <p className="mt-4 text-gray-600">Loading disparity analysis...</p>
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

  const summary = data?.summary || {};
  
  // Overview charts data
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
    labels: ['High', 'Medium', 'Low'],
    datasets: [{
      label: 'Significance Levels',
      data: [
        summary.high_significance_differences || 0,
        summary.medium_significance_differences || 0,
        summary.low_significance_differences || 0
      ],
      backgroundColor: ['#dc2626', '#f59e0b', '#3b82f6'],
      borderColor: ['#b91c1c', '#d97706', '#2563eb'],
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

  const clinicalImpactData = {
    labels: Object.keys(summary.differences_by_category || {}),
    datasets: [{
      label: 'Clinical Impact Distribution',
      data: Object.values(summary.differences_by_category || {}),
      backgroundColor: ['#dc2626', '#f59e0b', '#f97316', '#10b981'],
      borderColor: ['#b91c1c', '#d97706', '#ea580c', '#059669'],
      borderWidth: 2
    }]
  };

  // Process individual test results for detailed analysis
  const processTestResults = () => {
    if (!data?.test_results) return {};
    
    const significanceCount = {};
    const clinicalImpactScores = [];
    const focusAreaDetails = {};
    const classificationTypes = {};
    
    data.test_results.forEach(test => {
      // Count significance levels
      const sig = test.significance || 'unknown';
      significanceCount[sig] = (significanceCount[sig] || 0) + 1;
      
      // Collect clinical impact scores
      if (test.clinical_impact_score !== undefined) {
        clinicalImpactScores.push(test.clinical_impact_score);
      }
      
      // Focus area details
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
      
      // Classification type analysis
      const whoType = test.who_disease_type || 'unknown';
      const iccType = test.icc_disease_type || 'unknown';
      
      if (!classificationTypes[whoType]) {
        classificationTypes[whoType] = { who: 0, icc: 0, matches: 0 };
      }
      classificationTypes[whoType].who++;
      
      if (whoType === iccType) {
        classificationTypes[whoType].matches++;
      }
    });
    
    return { significanceCount, clinicalImpactScores, focusAreaDetails, classificationTypes };
  };

  const processedData = processTestResults();

  // Create significance distribution chart
  const significanceDistributionData = {
    labels: Object.keys(processedData.significanceCount || {}),
    datasets: [{
      label: 'Test Cases by Significance',
      data: Object.values(processedData.significanceCount || {}),
      backgroundColor: {
        critical: '#7f1d1d',
        high: '#dc2626',
        medium: '#f59e0b',
        low: '#3b82f6',
        minimal: '#10b981'
      },
      borderColor: {
        critical: '#991b1b',
        high: '#b91c1c',
        medium: '#d97706',
        low: '#2563eb',
        minimal: '#059669'
      },
      borderWidth: 2
    }]
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'significance', label: 'Significance Analysis', icon: '⚡' },
    { id: 'clinical', label: 'Clinical Impact', icon: '🏥' },
    { id: 'focus', label: 'Focus Areas', icon: '🎯' },
    { id: 'detailed', label: 'Detailed Analysis', icon: '🔍' }
  ];

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-3xl font-bold text-gray-900">
              WHO vs ICC Classification Disparity Analysis
            </h1>
            <p className="mt-2 text-gray-600">
              Comprehensive analysis of {summary.total_tests} classification comparisons
            </p>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="text-3xl">📊</div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Total Tests</h3>
                <p className="text-3xl font-bold text-blue-600">{summary.total_tests}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="text-3xl">✅</div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Equivalent</h3>
                <p className="text-3xl font-bold text-green-600">{summary.equivalent_results}</p>
                <p className="text-xs text-gray-500">
                  {((summary.equivalent_results / summary.total_tests) * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="text-3xl">⚠️</div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Different</h3>
                <p className="text-3xl font-bold text-red-600">{summary.different_results}</p>
                <p className="text-xs text-gray-500">
                  {((summary.different_results / summary.total_tests) * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="text-3xl">🔥</div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">High Impact</h3>
                <p className="text-3xl font-bold text-orange-600">{summary.high_significance_differences}</p>
                <p className="text-xs text-gray-500">Critical disparities</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Results Distribution</h3>
              <div className="h-64">
                <Pie data={overviewData} options={chartOptions} />
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Significance Levels</h3>
              <div className="h-64">
                <Doughnut data={significanceData} options={chartOptions} />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'significance' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Significance Distribution</h3>
                <div className="h-64">
                  <Bar data={significanceDistributionData} options={{
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
              
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Significance Breakdown</h3>
                <div className="space-y-4">
                  {Object.entries(processedData.significanceCount || {}).map(([significance, count]) => {
                    const percentage = ((count / summary.total_tests) * 100).toFixed(1);
                    const colorMap = {
                      critical: 'bg-red-800',
                      high: 'bg-red-600',
                      medium: 'bg-yellow-500',
                      low: 'bg-blue-500',
                      minimal: 'bg-green-500'
                    };
                    
                    return (
                      <div key={significance} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`w-4 h-4 rounded-full ${colorMap[significance] || 'bg-gray-400'}`}></div>
                          <span className="font-medium capitalize">{significance}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold">{count}</div>
                          <div className="text-sm text-gray-500">{percentage}%</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Focus Area Impact Analysis</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Focus Area
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total Cases
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Critical
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        High
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Medium
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Low/Minimal
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {Object.entries(processedData.focusAreaDetails || {}).map(([focus, details]) => (
                      <tr key={focus}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 capitalize">
                          {focus.replace(/_/g, ' ')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {details.total}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            {details.critical || 0}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            {details.high || 0}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            {details.medium || 0}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
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

        {activeTab === 'focus' && (
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Differences by Focus Area</h3>
              <div className="h-96">
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

        {activeTab === 'clinical' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Clinical Impact Categories</h3>
              <div className="h-64">
                <Pie data={clinicalImpactData} options={chartOptions} />
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Impact Summary</h3>
              <div className="space-y-4">
                {Object.entries(summary.differences_by_category || {}).map(([category, count]) => (
                  <div key={category} className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700 capitalize">
                      {category.replace('_', ' ')}
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">{count}</span>
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(count / Math.max(...Object.values(summary.differences_by_category))) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'detailed' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Test Results Summary</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Metric
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Value
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Percentage
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Total Tests
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {summary.total_tests}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        100%
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Equivalent Results
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {summary.equivalent_results}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {((summary.equivalent_results / summary.total_tests) * 100).toFixed(1)}%
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Different Results
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {summary.different_results}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {((summary.different_results / summary.total_tests) * 100).toFixed(1)}%
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Focus Area Breakdown</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(summary.differences_by_focus || {}).map(([focus, count]) => (
                  <div key={focus} className="border rounded-lg p-4">
                    <h4 className="font-medium text-sm text-gray-900 mb-2 capitalize">
                      {focus.replace(/_/g, ' ')}
                    </h4>
                    <p className="text-2xl font-bold text-blue-600">{count}</p>
                    <p className="text-xs text-gray-500">
                      {((count / summary.different_results) * 100).toFixed(1)}% of differences
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 