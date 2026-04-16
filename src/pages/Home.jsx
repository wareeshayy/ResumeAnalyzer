import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Smart feedback for your dream job</h1>
          <p className="text-xl text-gray-600 mb-8">
            Upload your resume and get instant AI-powered feedback to improve your chances with recruiters and applicant tracking systems.
          </p>
          <Link 
            to="/analyze" 
            className="inline-block bg-primary text-gray-800 px-8 py-4 rounded-lg text-lg font-bold hover:bg-primary-dark transition-all shadow-lg transform hover:-translate-y-1"
          >
            Analyze Your Resume Now
          </Link>
        </div>
      </div>
    </div>
  );
}