import React from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { FormatCheckResult } from '../../types';

interface FormatAnalysisProps {
  formatResults: FormatCheckResult[];
}

const FormatAnalysis: React.FC<FormatAnalysisProps> = ({ formatResults }) => {
  // Count overall status
  const passedCount = formatResults.filter(result => result.status === 'pass').length;
  const warningCount = formatResults.filter(result => result.status === 'warning').length;
  const errorCount = formatResults.filter(result => result.status === 'error').length;
  
  // Calculate overall percentage
  const totalChecks = formatResults.length;
  const passPercentage = Math.round((passedCount / totalChecks) * 100);

  const getStatusIcon = (status: 'pass' | 'warning' | 'error') => {
    switch (status) {
      case 'pass':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-orange-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getStatusBadge = (status: 'pass' | 'warning' | 'error') => {
    switch (status) {
      case 'pass':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Pass</span>;
      case 'warning':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">Warning</span>;
      case 'error':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Error</span>;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="font-semibold text-lg text-gray-900">Format Analysis</h3>
      </div>
      
      <div className="p-6">
        {/* Summary Section */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">{passPercentage}%</div>
              <p className="text-sm text-gray-500">Format Compliance</p>
            </div>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-700">{passedCount}</div>
              <p className="text-sm text-green-600">Passed Checks</p>
            </div>
          </div>
          
          <div className="bg-orange-50 p-4 rounded-lg">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-700">{warningCount}</div>
              <p className="text-sm text-orange-600">Warnings</p>
            </div>
          </div>
          
          <div className="bg-red-50 p-4 rounded-lg">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-700">{errorCount}</div>
              <p className="text-sm text-red-600">Errors</p>
            </div>
          </div>
        </div>
        
        {/* Detailed Results */}
        <div className="space-y-4">
          <h4 className="text-md font-medium text-gray-900">Detailed Results</h4>
          
          {formatResults.map((result, index) => (
            <div 
              key={index}
              className={`p-4 rounded-lg border ${
                result.status === 'pass' 
                  ? 'border-green-200 bg-green-50' 
                  : result.status === 'warning'
                    ? 'border-orange-200 bg-orange-50'
                    : 'border-red-200 bg-red-50'
              }`}
            >
              <div className="flex items-start">
                <div className="mr-3 mt-0.5">
                  {getStatusIcon(result.status)}
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h5 className="text-sm font-medium text-gray-900">{result.checkName}</h5>
                    {getStatusBadge(result.status)}
                  </div>
                  
                  <p className="mt-1 text-sm text-gray-600">{result.message}</p>
                  
                  {result.details && (
                    <div className="mt-2 text-xs text-gray-500">
                      <ul className="list-disc list-inside space-y-1">
                        {result.details.map((detail, i) => (
                          <li key={i}>{detail}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FormatAnalysis;