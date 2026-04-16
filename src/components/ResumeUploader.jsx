import { useDropzone } from 'react-dropzone';
import { useState } from 'react';

export default function ResumeUploader({ onUpload }) {
  const [file, setFile] = useState(null);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    maxFiles: 1,
    maxSize: 20 * 1024 * 1024, // 20MB
    onDrop: acceptedFiles => {
      setFile(acceptedFiles[0]);
    }
  });

  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50">
      {!file ? (
        <div 
          {...getRootProps()} 
          className={`cursor-pointer p-8 rounded-lg transition-all ${isDragActive ? 'bg-primary-light border-primary' : 'hover:bg-gray-100'}`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center space-y-2">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="font-medium">
              {isDragActive ? 'Drop your resume here' : 'Drag & drop your resume here'}
            </p>
            <p className="text-gray-500 text-sm">or click to browse files</p>
            <p className="text-gray-400 text-xs">PDF or images (max. 20MB)</p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center space-x-4 bg-white p-4 rounded-lg">
            <svg className="w-8 h-8 text-primary-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <div>
              <p className="font-medium">{file.name}</p>
              <p className="text-gray-500 text-sm">{(file.size / 1024).toFixed(2)} KB</p>
            </div>
          </div>
          <button 
            onClick={() => onUpload(file)}
            className="w-full bg-primary text-gray-800 py-3 rounded-lg hover:bg-primary-dark transition-all flex items-center justify-center space-x-2 font-bold shadow-md transform hover:-translate-y-1"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            <span>Analyze Resume</span>
          </button>
        </div>
      )}
    </div>
  );
}