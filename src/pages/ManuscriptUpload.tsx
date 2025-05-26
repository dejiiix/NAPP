import React, { useState } from 'react';
import { BookOpenCheck, Info } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import FileUpload from '../components/common/FileUpload';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

const ManuscriptUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [description, setDescription] = useState('');
  const [keywords, setKeywords] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  
  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile || !title || !genre) {
      return;
    }
    
    setIsUploading(true);
    
    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false);
      setUploadSuccess(true);
    }, 2000);
  };
  
  const genres = [
    'Fiction - Novel',
    'Fiction - Short Story',
    'Non-fiction',
    'Poetry',
    'Memoir',
    'Biography',
    'Academic',
    'Children\'s Book',
    'Young Adult',
    'Historical',
    'Science Fiction',
    'Fantasy',
    'Mystery/Thriller',
    'Romance',
    'Other',
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Upload Manuscript</h1>
            <p className="mt-1 text-sm text-gray-500">
              Submit your manuscript for publication. We support .docx and .pdf formats.
            </p>
          </div>
          
          {uploadSuccess ? (
            <Card className="text-center py-10">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="mt-4 text-2xl font-semibold text-gray-900">Upload Successful!</h2>
              <p className="mt-2 text-gray-600">
                Your manuscript has been uploaded and is now being processed. Our team will begin the formatting review shortly.
              </p>
              <div className="mt-8">
                <Link to="/dashboard">
                  <Button variant="primary">Go to Dashboard</Button>
                </Link>
              </div>
            </Card>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Manuscript Details</h2>
                </div>
                
                <div className="p-6 space-y-6">
                  {/* File Upload */}
                  <div>
                    <FileUpload 
                      accept=".docx,.pdf" 
                      maxSize={20} 
                      onFileSelect={handleFileSelect}
                      label="Manuscript File"
                      helperText="Upload your complete manuscript in .docx or .pdf format"
                    />
                  </div>
                  
                  {/* Title */}
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                      Title *
                    </label>
                    <input
                      type="text"
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter the title of your manuscript"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>
                  
                  {/* Genre */}
                  <div>
                    <label htmlFor="genre" className="block text-sm font-medium text-gray-700 mb-1">
                      Genre *
                    </label>
                    <select
                      id="genre"
                      value={genre}
                      onChange={(e) => setGenre(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    >
                      <option value="">Select a genre</option>
                      {genres.map((g) => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Description */}
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Provide a brief description of your manuscript"
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    ></textarea>
                  </div>
                  
                  {/* Keywords */}
                  <div>
                    <label htmlFor="keywords" className="block text-sm font-medium text-gray-700 mb-1">
                      Keywords
                    </label>
                    <input
                      type="text"
                      id="keywords"
                      value={keywords}
                      onChange={(e) => setKeywords(e.target.value)}
                      placeholder="Enter keywords separated by commas"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Keywords help readers discover your book. Example: fiction, nigeria, politics
                    </p>
                  </div>
                  
                  {/* Guidelines */}
                  <div className="bg-blue-50 p-4 rounded-md">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <Info className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-blue-800">Formatting Guidelines</h3>
                        <div className="mt-2 text-sm text-blue-700">
                          <ul className="list-disc pl-5 space-y-1">
                            <li>Manuscripts should use standard font (Times New Roman or Arial)</li>
                            <li>Font size should be 12pt with 1.5 line spacing</li>
                            <li>Margins should be at least 1 inch on all sides</li>
                            <li>Include page numbers in the footer</li>
                            <li>Maximum file size is 20MB</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                  <span className="text-sm text-gray-500">* Required fields</span>
                  <div className="flex space-x-3">
                    <Button
                      type="button"
                      variant="outline"
                    >
                      Save Draft
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                      isLoading={isUploading}
                      disabled={!selectedFile || !title || !genre || isUploading}
                    >
                      Submit Manuscript
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ManuscriptUpload;