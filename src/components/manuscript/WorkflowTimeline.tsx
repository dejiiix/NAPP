import React from 'react';
import { CheckCircle, Clock } from 'lucide-react';
import { Manuscript } from '../../types';

interface WorkflowTimelineProps {
  manuscript: Manuscript;
}

const WorkflowTimeline: React.FC<WorkflowTimelineProps> = ({ manuscript }) => {
  const stages = [
    { name: 'Submission', completed: true, date: manuscript.uploadDate },
    { name: 'Editing', completed: ['editing', 'design', 'review', 'published'].includes(manuscript.status), date: manuscript.editingStartDate },
    { name: 'Design', completed: ['design', 'review', 'published'].includes(manuscript.status), date: manuscript.designStartDate },
    { name: 'Review', completed: ['review', 'published'].includes(manuscript.status), date: manuscript.reviewStartDate },
    { name: 'Publishing', completed: ['published'].includes(manuscript.status), date: manuscript.publishDate },
  ];

  const currentStageIndex = stages.findIndex(stage => !stage.completed) - 1;

  return (
    <div className="py-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Publishing Workflow</h3>
      
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-7 top-0 h-full w-0.5 bg-gray-200"></div>
        
        {/* Timeline items */}
        <div className="space-y-8">
          {stages.map((stage, index) => {
            const isActive = index === currentStageIndex + 1;
            const isPast = index <= currentStageIndex;
            
            return (
              <div key={index} className="relative flex items-start">
                <div className={`absolute left-7 top-5 h-full w-0.5 ${isPast ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                
                {/* Circle */}
                <div className={`relative flex items-center justify-center w-14 h-14 rounded-full border-2 ${
                  stage.completed 
                    ? 'bg-green-100 border-green-500 text-green-500' 
                    : isActive 
                      ? 'bg-blue-100 border-blue-500 text-blue-500'
                      : 'bg-gray-100 border-gray-300 text-gray-400'
                }`}>
                  {stage.completed ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    <Clock className="w-6 h-6" />
                  )}
                </div>
                
                {/* Content */}
                <div className="ml-6 pb-8">
                  <div className={`text-lg font-semibold ${
                    stage.completed 
                      ? 'text-green-700' 
                      : isActive 
                        ? 'text-blue-700'
                        : 'text-gray-500'
                  }`}>
                    {stage.name}
                  </div>
                  
                  {stage.date && (
                    <div className="text-sm text-gray-500 mt-1">
                      {new Date(stage.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  )}
                  
                  {isActive && (
                    <div className="mt-2 text-sm text-blue-600 animate-pulse flex items-center">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                      Current Stage
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WorkflowTimeline;