import React from 'react';
import { Clock, Edit, BookOpen, CheckCircle, AlertCircle } from 'lucide-react';
import { Activity } from '../../types';

interface RecentActivityProps {
  activities: Activity[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'statusChange':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'comment':
        return <Edit className="w-5 h-5 text-purple-500" />;
      case 'upload':
        return <BookOpen className="w-5 h-5 text-green-500" />;
      case 'publish':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'feedback':
        return <AlertCircle className="w-5 h-5 text-orange-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const past = new Date(timestamp);
    const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return 'Just now';
    }
    
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
    }
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
    }
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) {
      return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
    }
    
    const diffInMonths = Math.floor(diffInDays / 30);
    return `${diffInMonths} ${diffInMonths === 1 ? 'month' : 'months'} ago`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="font-semibold text-lg text-gray-900">Recent Activity</h3>
      </div>
      
      <div className="divide-y divide-gray-200">
        {activities.length > 0 ? (
          activities.map((activity, index) => (
            <div key={index} className="px-6 py-4 flex items-start">
              <div className="mr-3 mt-1">
                {getActivityIcon(activity.type)}
              </div>
              
              <div className="flex-1">
                <p className="text-sm text-gray-900">{activity.message}</p>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-xs text-gray-500">
                    {activity.manuscriptTitle && (
                      <span className="font-medium">{activity.manuscriptTitle}</span>
                    )}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatTimeAgo(activity.timestamp)}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="px-6 py-8 text-center">
            <p className="text-gray-500">No recent activity</p>
          </div>
        )}
      </div>
      
      {activities.length > 0 && (
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
          <a href="/activity" className="text-sm font-medium text-green-700 hover:text-green-800">
            View All Activity
          </a>
        </div>
      )}
    </div>
  );
};

export default RecentActivity;