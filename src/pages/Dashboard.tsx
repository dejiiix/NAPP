import React from 'react';
import { Plus, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Button from '../components/common/Button';
import StatusSummary from '../components/dashboard/StatusSummary';
import ManuscriptCard from '../components/dashboard/ManuscriptCard';
import RecentActivity from '../components/dashboard/RecentActivity';
import { Manuscript, Activity } from '../types';

const Dashboard: React.FC = () => {
  // Mock data for demonstration
  const stats = {
    total: 8,
    editing: 3,
    design: 2,
    review: 2,
    published: 1,
  };
  
  const manuscripts: Manuscript[] = [
    {
      id: '1',
      title: 'The Lagos Chronicles',
      description: 'A tale of ambition and resilience in Nigeria\'s most vibrant city.',
      status: 'editing',
      uploadDate: '2023-05-15T10:30:00Z',
      editingStartDate: '2023-05-18T09:15:00Z',
      designStartDate: '',
      reviewStartDate: '',
      publishDate: '',
      version: '1.2',
      formatChecksPassed: 8,
      formatChecksFailed: 2,
    },
    {
      id: '2',
      title: 'Echoes of the Savannah',
      description: 'A collection of short stories inspired by traditional Nigerian folklore.',
      status: 'design',
      uploadDate: '2023-04-22T14:45:00Z',
      editingStartDate: '2023-04-25T11:20:00Z',
      designStartDate: '2023-05-10T10:00:00Z',
      reviewStartDate: '',
      publishDate: '',
      version: '2.0',
      formatChecksPassed: 10,
      formatChecksFailed: 0,
    },
    {
      id: '3',
      title: 'Market Forces: A Nigerian Perspective',
      description: 'An analysis of economic trends in modern Nigeria.',
      status: 'review',
      uploadDate: '2023-03-10T09:00:00Z',
      editingStartDate: '2023-03-15T10:30:00Z',
      designStartDate: '2023-04-05T14:20:00Z',
      reviewStartDate: '2023-05-01T09:45:00Z',
      publishDate: '',
      version: '1.8',
      formatChecksPassed: 9,
      formatChecksFailed: 1,
    },
    {
      id: '4',
      title: 'Daughters of the Delta',
      description: 'A powerful story of three generations of women from the Niger Delta.',
      status: 'published',
      uploadDate: '2023-01-05T11:15:00Z',
      editingStartDate: '2023-01-10T09:30:00Z',
      designStartDate: '2023-02-01T13:45:00Z',
      reviewStartDate: '2023-02-20T10:15:00Z',
      publishDate: '2023-03-15T14:30:00Z',
      version: '3.0',
      formatChecksPassed: 10,
      formatChecksFailed: 0,
    },
  ];
  
  const activities: Activity[] = [
    {
      type: 'statusChange',
      message: 'Your manuscript has moved to the Design stage',
      manuscriptId: '2',
      manuscriptTitle: 'Echoes of the Savannah',
      timestamp: '2023-05-10T10:00:00Z',
    },
    {
      type: 'comment',
      message: 'Editor has left a comment on your manuscript',
      manuscriptId: '1',
      manuscriptTitle: 'The Lagos Chronicles',
      timestamp: '2023-05-19T14:20:00Z',
    },
    {
      type: 'upload',
      message: 'You uploaded a new version of your manuscript',
      manuscriptId: '1',
      manuscriptTitle: 'The Lagos Chronicles',
      timestamp: '2023-05-17T11:30:00Z',
    },
    {
      type: 'feedback',
      message: 'Format check completed with 2 issues to resolve',
      manuscriptId: '1',
      manuscriptTitle: 'The Lagos Chronicles',
      timestamp: '2023-05-15T16:45:00Z',
    },
    {
      type: 'publish',
      message: 'Congratulations! Your book has been published',
      manuscriptId: '4',
      manuscriptTitle: 'Daughters of the Delta',
      timestamp: '2023-03-15T14:30:00Z',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Dashboard Header */}
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Author Dashboard</h1>
              <p className="mt-1 text-sm text-gray-500">
                Welcome back, Chinua Achebe
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <Link to="/upload">
                <Button
                  variant="primary"
                  icon={<Plus className="w-5 h-5" />}
                >
                  Upload New Manuscript
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Status Summary */}
          <div className="mb-8">
            <StatusSummary stats={stats} />
          </div>
          
          {/* Manuscripts Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Your Manuscripts</h2>
              
              <div className="flex items-center">
                <button className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  <Filter className="w-4 h-4 mr-1" />
                  Filter
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {manuscripts.map((manuscript) => (
                <ManuscriptCard key={manuscript.id} manuscript={manuscript} />
              ))}
            </div>
            
            <div className="mt-4 text-center">
              <Link 
                to="/manuscripts" 
                className="text-sm font-medium text-green-700 hover:text-green-800"
              >
                View All Manuscripts
              </Link>
            </div>
          </div>
          
          {/* Recent Activity */}
          <div>
            <RecentActivity activities={activities} />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;