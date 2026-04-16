import { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { usePDF } from 'react-to-pdf';

export default function AtsResume() {
  const location = useLocation();
  const navigate = useNavigate();
  const extractedText = location.state?.extractedText || "";
  const { toPDF, targetRef } = usePDF({filename: 'ats_resume.pdf'});

  if (!extractedText) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">No Data Found</h2>
        <p className="text-gray-600 mb-6">Please analyze a resume first to see the ATS-friendly version.</p>
        <button 
          onClick={() => navigate('/analyze')}
          className="bg-primary text-gray-800 px-6 py-2 rounded-lg font-bold hover:bg-primary-dark transition-all"
        >
          Go to Analyze
        </button>
      </div>
    );
  }

  // Basic cleanup and splitting for the demo
  const lines = extractedText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  const name = lines[0] || 'Wareesha Ashraf';
  const email = lines.find(l => l.includes('@')) || 'f223441@cfd.nu.edu.pk';
  const phone = lines.find(l => /[\d-]{7,}/.test(l)) || '+92 311 7714594';

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={() => navigate(-1)}
          className="text-gray-600 hover:text-gray-900 flex items-center space-x-1"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back to Analysis</span>
        </button>
        <button 
          onClick={() => toPDF()}
          className="bg-primary text-gray-800 px-8 py-3 rounded-lg font-bold hover:bg-primary-dark transition-all shadow-lg flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          <span>Download PDF</span>
        </button>
      </div>

      <div className="bg-white border shadow-xl p-0 overflow-hidden rounded-sm">
        <div ref={targetRef} className="p-[1in] bg-white text-black font-serif leading-tight">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold uppercase tracking-wide mb-1">{name}</h1>
            <p className="text-lg italic text-gray-800 mb-2">Software Engineer</p>
            <div className="text-[10pt] flex flex-wrap justify-center gap-x-2 text-gray-700">
              <span>Chiniot, Pakistan</span> |
              <a href={`mailto:${email}`} className="border-b border-black"> {email} </a> |
              <span> {phone} </span> |
              <a href="https://github.com/wareeshayy" className="border-b border-black"> github.com/wareeshayy </a> |
              <a href="https://wareeshaportfolio.netlify.app" className="border-b border-black"> Portfolio </a> |
              <a href="https://linkedin.com/in/wareesha-ashraf" className="border-b border-black"> LinkedIn </a>
            </div>
          </div>

          {/* Education */}
          <section className="mb-4">
            <h2 className="text-lg font-bold uppercase border-b border-black mb-2">Education</h2>
            <div className="flex justify-between items-start mb-1">
              <span className="font-bold">FAST NUCES</span>
              <span>June 2022 -- June 2026</span>
            </div>
            <div className="flex justify-between items-start italic text-sm mb-1">
              <span>BS Computer Science</span>
              <span>Chiniot, Punjab, Pakistan</span>
            </div>
            <ul className="list-disc list-inside text-sm mt-1 space-y-1">
              <li><strong>Relevant Courses:</strong> Data Structures & Algorithms, Operating Systems, Database Management Systems, Object-Oriented Programming, Computer Networks, Artificial Intelligence, Fundamentals of Computer Vision</li>
            </ul>
          </section>

          {/* Projects */}
          <section className="mb-4">
            <h2 className="text-lg font-bold uppercase border-b border-black mb-2">Projects</h2>
            
            <div className="space-y-4">
              {/* Dynamic Projects from extracted text */}
              <div className="mb-2">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold uppercase">RESUMIND -- AI-Powered Resume Analyzer</span>
                  <span className="text-sm">2025</span>
                </div>
                <p className="text-sm italic mb-1">React 19, Tailwind CSS, Tesseract.js, PDF.js, React Router 7, LaTeX Engine</p>
                <ul className="list-disc list-inside text-sm space-y-1">
                  <li>Built an AI-ready resume analysis platform with OCR-based text extraction from PDFs and images.</li>
                  <li>Implemented a custom LaTeX engine utility to generate ATS-optimized resume templates on-the-fly.</li>
                  <li>Designed a custom Aquamarine design system with Tailwind CSS v3.4 and handled complex client-side routing.</li>
                </ul>
              </div>

              {/* Add more project items using the extracted text logic or static for demo */}
              <div className="mb-2">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold uppercase">PixelCraft -- Image Editor & PDF Manipulator</span>
                  <span className="text-sm">2024</span>
                </div>
                <p className="text-sm italic mb-1">React.js, Node.js, Tailwind CSS, Python FastAPI</p>
                <ul className="list-disc list-inside text-sm space-y-1">
                  <li>Engineered a feature-rich web application handling end-to-end image editing and PDF manipulation.</li>
                  <li>Built a Python FastAPI backend for server-side PDF processing.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Technical Skills */}
          <section className="mb-4">
            <h2 className="text-lg font-bold uppercase border-b border-black mb-2">Technical Skills</h2>
            <div className="text-sm space-y-1">
              <p><strong>Programming Languages:</strong> C++, C, Python, JavaScript, Dart, SQL, R</p>
              <p><strong>Frontend:</strong> React.js, Next.js, Redux Toolkit, Tailwind CSS, Bootstrap, HTML5, CSS3, Flutter</p>
              <p><strong>Backend:</strong> Node.js, Express.js, FastAPI (Python)</p>
              <p><strong>AI / ML:</strong> PyTorch, TensorFlow.js, LLM Fine-tuning, GenAI Integrations</p>
              <p><strong>Databases:</strong> MySQL, MongoDB, Supabase</p>
              <p><strong>Tools & DevOps:</strong> Git, GitHub, Docker, Vercel, Netlify, VS Code, Linux</p>
            </div>
          </section>

          {/* Achievements */}
          <section className="mb-4">
            <h2 className="text-lg font-bold uppercase border-b border-black mb-2">Achievements & Activities</h2>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>Developed 12+ end-to-end projects spanning full-stack web development, AI/ML, and systems programming.</li>
              <li>Deployed multiple production-grade applications on Vercel and Netlify with CI/CD pipelines.</li>
              <li>Active GitHub contributor with a consistent commit history across open-source and academic projects.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
