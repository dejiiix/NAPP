import React, { useState, useRef } from 'react';
import { Upload, File, CheckCircle, AlertCircle, X } from 'lucide-react';
import Button from './Button';

interface FileUploadProps {
  accept?: string;
  maxSize?: number; // in MB
  onFileSelect: (file: File) => void;
  multiple?: boolean;
  label?: string;
  helperText?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  accept = '.pdf,.docx',
  maxSize = 10, // Default 10MB
  onFileSelect,
  multiple = false,
  label = 'Upload Manuscript',
  helperText = 'Drag and drop your manuscript or click to browse',
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const validateFile = (file: File): string | null => {
    // Check file type
    const fileType = file.name.split('.').pop()?.toLowerCase();
    const acceptedTypes = accept.split(',').map(type => 
      type.trim().replace('.', '').toLowerCase()
    );
    
    if (!acceptedTypes.includes(fileType || '')) {
      return `Invalid file type. Please upload ${accept} files only.`;
    }
    
    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      return `File size exceeds ${maxSize}MB limit.`;
    }
    
    return null;
  };

  const processFiles = (fileList: FileList) => {
    const newFiles: File[] = [];
    const newErrors: string[] = [];
    
    Array.from(fileList).forEach(file => {
      const error = validateFile(file);
      if (error) {
        newErrors.push(`${file.name}: ${error}`);
      } else {
        newFiles.push(file);
        onFileSelect(file);
      }
    });
    
    if (multiple) {
      setFiles(prevFiles => [...prevFiles, ...newFiles]);
    } else if (newFiles.length > 0) {
      setFiles([newFiles[0]]);
    }
    
    setErrors(newErrors);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const removeFile = (index: number) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  const removeError = (index: number) => {
    setErrors(prevErrors => prevErrors.filter((_, i) => i !== index));
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    
    if (extension === 'pdf') {
      return <File className="w-6 h-6 text-red-500" />;
    } else if (extension === 'docx' || extension === 'doc') {
      return <File className="w-6 h-6 text-blue-500" />;
    } else {
      return <File className="w-6 h-6 text-gray-500" />;
    }
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center ${
          isDragging 
            ? 'border-green-500 bg-green-50' 
            : 'border-gray-300 hover:border-green-500 hover:bg-green-50'
        } transition-colors duration-200 cursor-pointer`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleButtonClick}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept={accept}
          multiple={multiple}
          onChange={handleFileInput}
        />
        
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm font-medium text-gray-900">{helperText}</p>
        <p className="text-xs text-gray-500 mt-1">
          {accept.split(',').join(', ')} files up to {maxSize}MB
        </p>
        
        <Button 
          variant="outline"
          size="sm"
          className="mt-4"
        >
          Select File
        </Button>
      </div>
      
      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          <p className="text-sm font-medium text-gray-700">Uploaded Files:</p>
          {files.map((file, index) => (
            <div 
              key={`${file.name}-${index}`}
              className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-md"
            >
              <div className="flex items-center">
                {getFileIcon(file.name)}
                <div className="ml-2">
                  <p className="text-sm font-medium text-gray-900">{file.name}</p>
                  <p className="text-xs text-gray-500">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                  className="text-gray-500 hover:text-red-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {errors.length > 0 && (
        <div className="mt-4 space-y-2">
          <p className="text-sm font-medium text-red-700">Errors:</p>
          {errors.map((error, index) => (
            <div 
              key={index}
              className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-md"
            >
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <p className="ml-2 text-sm text-red-700">{error}</p>
              </div>
              <button 
                onClick={() => removeError(index)}
                className="text-gray-500 hover:text-red-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;