import { useState } from 'react';
import ResumeUploader from '../components/ResumeUploader';
import ResumeFeedback from '../components/ResumeFeedback';
import { extractTextFromFile } from '../utils/ocrService';

export default function Analyze() {
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [extractedText, setExtractedText] = useState('');

  const handleUpload = async (file) => {
    setIsLoading(true);
    setExtractedText('');

    try {
      // Extract text from the uploaded resume using OCR/PDF extraction
      const text = await extractTextFromFile(file);
      setExtractedText(text);
      console.log('Extracted Resume Content:', text);
    } catch (error) {
      console.error('Failed to extract text from file', error);
      alert('Failed to extract text from the uploaded resume.');
      setIsLoading(false);
      return;
    }
    
    // Simulate API call delay
    setTimeout(() => {
      setAnalysis({
        score: 65,
        feedback: {
          toneScore: 65,
          toneFeedback: "Your tone is professional but could be more concise in some sections.",
          contentScore: 50,
          contentFeedback: "Missing quantifiable achievements in your experience sections.",
          structureScore: 60,
          structureFeedback: "Good overall structure but consider reordering sections for better flow.",
          skillsScore: 70,
          skillsFeedback: "Relevant skills are listed but could include more technical keywords.",
          atsScore: 40,
          atsSuggestions: [
            "Add a dedicated Skills section with technical keywords",
            "Include relevant technical keywords throughout the resume",
            "Use standard section headers like 'Work Experience' and 'Education'",
            "Add quantifiable metrics to your achievements"
          ]
        }
      });
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Resume Analysis</h1>
      
      {!analysis ? (
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Upload Your Resume</h2>
            <ResumeUploader onUpload={handleUpload} />
          </div>
          
          {isLoading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-lg">Analyzing your resume...</p>
              <p className="text-gray-500">This may take a few moments</p>
            </div>
          )}
        </div>
      ) : (
        <div className="max-w-4xl mx-auto space-y-8">
          <ResumeFeedback score={analysis.score} feedback={analysis.feedback} />
          
          <div className="flex justify-center">
            <button 
              onClick={() => { setAnalysis(null); setExtractedText(''); }}
              className="bg-gray-200 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>Analyze Another Resume</span>
            </button>
          </div>
          
          {extractedText && (
            <div className="mt-8 bg-white p-6 rounded-lg shadow border border-gray-200">
              <h3 className="text-xl font-semibold mb-4">Extracted Content Preview:</h3>
              <pre className="whitespace-pre-wrap text-gray-700 text-sm max-h-64 overflow-y-auto bg-gray-50 p-4 rounded border">
                {extractedText}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}