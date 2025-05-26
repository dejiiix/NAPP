export interface Manuscript {
  id: string;
  title: string;
  description: string;
  status: 'editing' | 'design' | 'review' | 'published';
  uploadDate: string;
  editingStartDate: string;
  designStartDate: string;
  reviewStartDate: string;
  publishDate: string;
  version: string;
  formatChecksPassed: number;
  formatChecksFailed: number;
  author?: string;
  wordCount?: number;
  pages?: number;
  coverImage?: string;
}

export interface Activity {
  type: 'statusChange' | 'comment' | 'upload' | 'feedback' | 'publish';
  message: string;
  manuscriptId: string;
  manuscriptTitle?: string;
  timestamp: string;
}

export interface FormatCheckResult {
  checkName: string;
  status: 'pass' | 'warning' | 'error';
  message: string;
  details?: string[];
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  role?: string;
  text: string;
  timestamp: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'author' | 'editor' | 'designer' | 'publisher' | 'admin';
  avatar?: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  assignedTo?: string;
  dueDate?: string;
  status: 'pending' | 'in-progress' | 'completed';
  manuscriptId: string;
  createdAt: string;
}

export interface Analytics {
  pageViews: number;
  downloads: number;
  salesCount: number;
  salesAmount: number;
  geographicDistribution: {
    country: string;
    count: number;
  }[];
  timeframe: 'week' | 'month' | 'year' | 'all-time';
}