import React from 'react';
import { BookMarked, Clock, Pencil, BookOpen, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface StatusSummaryProps {
  stats: {
    total: number;
    editing: number;
    design: number;
    review: number;
    published: number;
  };
}

const StatusSummary: React.FC<StatusSummaryProps> = ({ stats }) => {
  const statCards = [
    {
      title: 'Total Manuscripts',
      count: stats.total,
      icon: <BookMarked className="w-8 h-8 text-green-500" />,
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
      path: '/manuscripts',
    },
    {
      title: 'In Editing',
      count: stats.editing,
      icon: <Pencil className="w-8 h-8 text-blue-500" />,
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      path: '/manuscripts?status=editing',
    },
    {
      title: 'In Design',
      count: stats.design,
      icon: <BookOpen className="w-8 h-8 text-purple-500" />,
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700',
      path: '/manuscripts?status=design',
    },
    {
      title: 'Under Review',
      count: stats.review,
      icon: <Clock className="w-8 h-8 text-orange-500" />,
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700',
      path: '/manuscripts?status=review',
    },
    {
      title: 'Published',
      count: stats.published,
      icon: <CheckCircle className="w-8 h-8 text-green-500" />,
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
      path: '/manuscripts?status=published',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {statCards.map((card, index) => (
        <Link 
          key={index}
          to={card.path}
          className={`${card.bgColor} p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200`}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className={`text-sm font-medium ${card.textColor}`}>{card.title}</p>
              <p className="text-2xl font-bold mt-1">{card.count}</p>
            </div>
            <div>{card.icon}</div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default StatusSummary;