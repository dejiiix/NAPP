import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeft, Download, BookOpen, Edit, Trash2, Upload, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import WorkflowTimeline from '../components/manuscript/WorkflowTimeline';
import FormatAnalysis from '../components/manuscript/FormatAnalysis';
import Comments from '../components/manuscript/Comments';
import { Manuscript, FormatCheckResult, Comment } from '../types';

const ManuscriptDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'overview' | 'workflow' | 'format' | 'comments'>('overview');
  
  // Mock data for demonstration
  const manuscript: Manuscript = {
    id: id || '1',
    title: 'The Lagos Chronicles',
    description: 'A tale of ambition and resilience in Nigeria\'s most vibrant city. Follow the interconnected lives of three young professionals as they navigate the challenges and opportunities of Lagos.',
    status: 'editing',
    uploadDate: '2023-05-15T10:30:00Z',
    editingStartDate: '2023-05-18T09:15:00Z',
    designStartDate: '',
    reviewStartDate: '',
    publishDate: '',
    version: '1.2',
    formatChecksPassed: 8,
    formatChecksFailed: 2,
    author: 'Chinua Achebe',
    wordCount: 85400,
    pages: 324,
    coverImage: 'https://images.pexels.com/photos/3646172/pexels-photo-3646172.jpeg?auto=compress&cs=tinysrgb&w=600',
  };
  
  const formatResults: FormatCheckResult[] = [
    {
      checkName: 'Font Type',
      status: 'pass',
      message: 'Font type is consistent and compliant with publishing standards.',
      details: ['Times New Roman 12pt used throughout the document'],
    },
    {
      checkName: 'Margins',
      status: 'pass',
      message: 'Margins meet the required specifications.',
      details: ['Left: 1.25 inches', 'Right: 1 inch', 'Top: 1 inch', 'Bottom: 1 inch'],
    },
    {
      checkName: 'Line Spacing',
      status: 'warning',
      message: 'Line spacing is inconsistent in some sections.',
      details: ['Pages 45-48: Line spacing is 1.0 instead of 1.5', 'Consider updating for consistency'],
    },
    {
      checkName: 'Headers and Footers',
      status: 'error',
      message: 'Headers are missing author name and page numbers.',
      details: ['Add author name to header', 'Add page numbers to footer'],
    },
    {
      checkName: 'Paragraph Formatting',
      status: 'pass',
      message: 'Paragraph formatting is consistent throughout.',
    },
    {
      checkName: 'Chapter Headings',
      status: 'pass',
      message: 'Chapter headings follow the recommended style.',
    },
    {
      checkName: 'Image Resolution',
      status: 'pass',
      message: 'All images meet the required resolution for print quality.',
    },
    {
      checkName: 'Table of Contents',
      status: 'warning',
      message: 'Table of contents requires updating to match chapter titles.',
      details: ['Chapter 7 title in TOC does not match actual chapter title'],
    },
    {
      checkName: 'Citation Format',
      status: 'pass',
      message: 'Citations are consistently formatted.',
    },
    {
      checkName: 'Metadata',
      status: 'pass',
      message: 'Document metadata is properly configured.',
    },
  ];
  
  const comments: Comment[] = [
    {
      id: '1',
      userId: 'editor123',
      userName: 'John Editor',
      role: 'Senior Editor',
      text: 'The opening chapters are strong, but consider reworking the transition between chapters 3 and 4 for better flow.',
      timestamp: '2023-05-20T09:45:00Z',
    },
    {
      id: '2',
      userId: 'author001',
      userName: 'Chinua Achebe',
      role: 'Author',
      text: 'Thanks for the feedback. I\'ve updated the transition in the latest version.',
      timestamp: '2023-05-21T14:30:00Z',
    },
    {
      id: '3',
      userId: 'designer456',
      userName: 'Sarah Designer',
      role: 'Layout Designer',
      text: 'I\'ve started working on the initial layout. Do you have any specific preferences for chapter headings?',
      timestamp: '2023-05-22T11:15:00Z',
    },
    {
      id: '4',
      userId: 'author001',
      userName: 'Chinua Achebe',
      role: 'Author',
      text: 'I\'m thinking something minimalist but with a subtle Nigerian motif. Nothing too ornate.',
      timestamp: '2023-05-22T16:20:00Z',
    },
  ];
  
  const handleAddComment = (comment: string) => {
    console.log('Adding comment:', comment);
    // In a real app, this would add the comment to the database
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Link */}
          <div className="mb-6">
            <Link to="/dashboard" className="inline-flex items-center text-sm font-medium text-green-700 hover:text-green-800">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Dashboard
            </Link>
          </div>
          
          {/* Manuscript Header */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
            <div className="p-6">
              <div className="flex flex-col md:flex-row">
                {/* Cover Image */}
                <div className="md:w-1/4 flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                  {manuscript.coverImage ? (
                    <img 
                      src={manuscript.coverImage} 
                      alt={`Cover of ${manuscript.title}`}
                      className="w-full h-auto rounded-md shadow-sm"
                    />
                  ) : (
                    <div className="w-full aspect-[2/3] bg-gray-200 rounded-md flex items-center justify-center">
                      <BookOpen className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                </div>
                
                {/* Manuscript Info */}
                <div className="md:w-3/4">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900">{manuscript.title}</h1>
                      <p className="mt-1 text-sm text-gray-500">by {manuscript.author}</p>
                    </div>
                    
                    <div className="mt-2 md:mt-0">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        manuscript.status === 'editing' 
                          ? 'bg-blue-100 text-blue-800'
                          : manuscript.status === 'design'
                            ? 'bg-purple-100 text-purple-800'
                            : manuscript.status === 'review'
                              ? 'bg-orange-100 text-orange-800'
                              : 'bg-green-100 text-green-800'
                      }`}>
                        {manuscript.status === 'editing' 
                          ? 'In Editing'
                          : manuscript.status === 'design'
                            ? 'In Design'
                            : manuscript.status === 'review'
                              ? 'Under Review'
                              : 'Published'}
                      </span>
                    </div>
                  </div>
                  
                  <p className="mt-4 text-gray-600">{manuscript.description}</p>
                  
                  <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Version</span>
                      <p className="font-medium text-gray-900">{manuscript.version}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Word Count</span>
                      <p className="font-medium text-gray-900">{manuscript.wordCount?.toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Pages</span>
                      <p className="font-medium text-gray-900">{manuscript.pages}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Uploaded</span>
                      <p className="font-medium text-gray-900">
                        {new Date(manuscript.uploadDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      icon={<Download className="w-4 h-4" />}
                    >
                      Download
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      icon={<Upload className="w-4 h-4" />}
                    >
                      Upload New Version
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      icon={<Edit className="w-4 h-4" />}
                    >
                      Edit Details
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      icon={<Share2 className="w-4 h-4" />}
                    >
                      Share
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      icon={<Trash2 className="w-4 h-4" />}
                      className="!text-red-600 !border-red-200 hover:!bg-red-50"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="mb-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                {[
                  { name: 'Overview', value: 'overview' },
                  { name: 'Workflow', value: 'workflow' },
                  { name: 'Format Analysis', value: 'format' },
                  { name: 'Comments', value: 'comments' },
                ].map((tab) => (
                  <button
                    key={tab.value}
                    onClick={() => setActiveTab(tab.value as any)}
                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.value
                        ? 'border-green-500 text-green-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>
          </div>
          
          {/* Tab Content */}
          <div>
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <Card title="Manuscript Summary">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Format Check Status</h4>
                        <div className="mt-2 flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className="bg-green-600 h-2.5 rounded-full" 
                              style={{ width: `${(manuscript.formatChecksPassed / (manuscript.formatChecksPassed + manuscript.formatChecksFailed)) * 100}%` }}
                            ></div>
                          </div>
                          <span className="ml-2 text-sm text-gray-700">
                            {manuscript.formatChecksPassed}/{manuscript.formatChecksPassed + manuscript.formatChecksFailed}
                          </span>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Publication Timeline</h4>
                        <div className="mt-2">
                          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm">
                            <div className="sm:col-span-1">
                              <dt className="text-gray-500">Submitted</dt>
                              <dd className="font-medium text-gray-900">
                                {new Date(manuscript.uploadDate).toLocaleDateString()}
                              </dd>
                            </div>
                            <div className="sm:col-span-1">
                              <dt className="text-gray-500">Editing Started</dt>
                              <dd className="font-medium text-gray-900">
                                {manuscript.editingStartDate 
                                  ? new Date(manuscript.editingStartDate).toLocaleDateString()
                                  : 'Pending'}
                              </dd>
                            </div>
                            <div className="sm:col-span-1">
                              <dt className="text-gray-500">Design Started</dt>
                              <dd className="font-medium text-gray-900">
                                {manuscript.designStartDate 
                                  ? new Date(manuscript.designStartDate).toLocaleDateString()
                                  : 'Pending'}
                              </dd>
                            </div>
                            <div className="sm:col-span-1">
                              <dt className="text-gray-500">Review Started</dt>
                              <dd className="font-medium text-gray-900">
                                {manuscript.reviewStartDate 
                                  ? new Date(manuscript.reviewStartDate).toLocaleDateString()
                                  : 'Pending'}
                              </dd>
                            </div>
                            <div className="sm:col-span-1">
                              <dt className="text-gray-500">Published</dt>
                              <dd className="font-medium text-gray-900">
                                {manuscript.publishDate 
                                  ? new Date(manuscript.publishDate).toLocaleDateString()
                                  : 'Pending'}
                              </dd>
                            </div>
                            <div className="sm:col-span-1">
                              <dt className="text-gray-500">Estimated Completion</dt>
                              <dd className="font-medium text-gray-900">
                                {manuscript.status === 'published' 
                                  ? 'Completed'
                                  : 'July 15, 2023'}
                              </dd>
                            </div>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
                
                <div className="md:col-span-1">
                  <Card title="Activity">
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="min-w-0 flex-1">
                          <p className="text-sm text-gray-900">Format check completed</p>
                          <p className="text-xs text-gray-500">May 16, 2023</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="min-w-0 flex-1">
                          <p className="text-sm text-gray-900">Assigned to editor John</p>
                          <p className="text-xs text-gray-500">May 18, 2023</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="min-w-0 flex-1">
                          <p className="text-sm text-gray-900">Editor left feedback</p>
                          <p className="text-xs text-gray-500">May 20, 2023</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="min-w-0 flex-1">
                          <p className="text-sm text-gray-900">New version uploaded</p>
                          <p className="text-xs text-gray-500">May 22, 2023</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            )}
            
            {activeTab === 'workflow' && (
              <WorkflowTimeline manuscript={manuscript} />
            )}
            
            {activeTab === 'format' && (
              <FormatAnalysis formatResults={formatResults} />
            )}
            
            {activeTab === 'comments' && (
              <Comments 
                comments={comments} 
                manuscriptId={manuscript.id} 
                onAddComment={handleAddComment} 
              />
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ManuscriptDetail;