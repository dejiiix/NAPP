import React from 'react';
import { Clock, AlertCircle, CheckCircle, BookOpen, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Manuscript } from '../../types';

interface ManuscriptCardProps {
  manuscript: Manuscript;
}

const ManuscriptCard: React.FC<ManuscriptCardProps> = ({ manuscript }) => {
  const getStatusIcon = () => {
    switch (manuscript.status) {
      case 'editing':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'design':
        return <BookOpen className="w-5 h-5 text-purple-500" />;
      case 'review':
        return <AlertCircle className="w-5 h-5 text-orange-500" />;
      case 'published':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusText = () => {
    switch (manuscript.status) {
      case 'editing':
        return 'In Editing';
      case 'design':
        return 'In Design';
      case 'review':
        return 'Under Review';
      case 'published':
        return 'Published';
      default:
        return 'Processing';
    }
  };

  const getStatusColor = () => {
    switch (manuscript.status) {
      case 'editing':
        return 'bg-blue-100 text-blue-800';
      case 'design':
        return 'bg-purple-100 text-purple-800';
      case 'review':
        return 'bg-orange-100 text-orange-800';
      case 'published':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressPercentage = () => {
    switch (manuscript.status) {
      case 'editing':
        return 25;
      case 'design':
        return 50;
      case 'review':
        return 75;
      case 'published':
        return 100;
      default:
        return 0;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="p-5">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{manuscript.title}</h3>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor()}`}>
            {getStatusIcon()}
            <span className="ml-1">{getStatusText()}</span>
          </span>
        </div>
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{manuscript.description}</p>
        
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div 
            className="bg-green-600 h-2 rounded-full" 
            style={{ width: `${getProgressPercentage()}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            <span>Uploaded: {new Date(manuscript.uploadDate).toLocaleDateString()}</span>
          </div>
          <div>
            <span>Version: {manuscript.version}</span>
          </div>
        </div>
        
        <Link 
          to={`/manuscripts/${manuscript.id}`}
          className="text-green-700 hover:text-green-800 font-medium text-sm inline-flex items-center"
        >
          View Details
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default ManuscriptCard;