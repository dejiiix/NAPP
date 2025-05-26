import React, { useState } from 'react';
import { User, Send } from 'lucide-react';
import { Comment } from '../../types';
import Button from '../common/Button';

interface CommentsProps {
  comments: Comment[];
  manuscriptId: string;
  onAddComment: (comment: string) => void;
}

const Comments: React.FC<CommentsProps> = ({ comments, manuscriptId, onAddComment }) => {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="font-semibold text-lg text-gray-900">Comments & Feedback</h3>
      </div>
      
      <div className="p-6">
        {/* Comment List */}
        <div className="space-y-4 max-h-80 overflow-y-auto mb-6">
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <div key={index} className="flex space-x-3">
                <div className="flex-shrink-0">
                  {comment.userAvatar ? (
                    <img 
                      src={comment.userAvatar} 
                      alt={comment.userName} 
                      className="h-10 w-10 rounded-full"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="h-6 w-6 text-gray-500" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1 bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-gray-900">{comment.userName}</h4>
                    <span className="text-xs text-gray-500">{formatDate(comment.timestamp)}</span>
                  </div>
                  
                  <p className="mt-1 text-sm text-gray-700">{comment.text}</p>
                  
                  {comment.role && (
                    <span className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {comment.role}
                    </span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-4">
              <p className="text-gray-500">No comments yet</p>
            </div>
          )}
        </div>
        
        {/* Add Comment Form */}
        <form onSubmit={handleSubmit}>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <User className="h-6 w-6 text-green-600" />
              </div>
            </div>
            
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add your comment or feedback..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                rows={3}
              ></textarea>
              
              <div className="mt-2 flex justify-end">
                <Button 
                  type="submit"
                  variant="primary"
                  size="sm"
                  icon={<Send className="w-4 h-4" />}
                  disabled={!newComment.trim()}
                >
                  Send
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Comments;