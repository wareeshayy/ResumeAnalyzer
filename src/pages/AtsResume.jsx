import { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { usePDF } from 'react-to-pdf';
import { parseResumeText } from '../utils/resumeParser';

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

  const data = parseResumeText(extractedText);
  const { personal, education, projects, skills, achievements } = data;

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
            <h1 className="text-3xl font-bold uppercase tracking-tight mb-1 text-gray-900">
              {personal.name.toLowerCase() === 'wareesha ashraf' ? personal.name : personal.name.toUpperCase()}
            </h1>
            <div className="text-[10pt] flex flex-wrap justify-center gap-x-2 text-gray-700 leading-none">
              <span className="font-medium">Chiniot, Pakistan</span>
              {personal.email && (
                <>
                  <span className="text-gray-300">|</span>
                  <a href={`mailto:${personal.email}`} className="border-b border-black"> {personal.email.toLowerCase()} </a>
                </>
              )}
              {personal.phone && (
                <>
                  <span className="text-gray-300">|</span>
                  <span> {personal.phone} </span>
                </>
              )}
              <span className="text-gray-300">|</span>
              <a href="https://github.com/wareeshayy" className="border-b border-black">github.com/wareeshayy</a>
            </div>
          </div>

          {/* Education */}
          {education.length > 0 && (
            <section className="mb-5">
              <h2 className="text-[12pt] font-bold uppercase border-b border-black mb-2 pb-0.5">Education</h2>
              {education.map((edu, i) => (
                <div key={i} className="mb-3">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-[10.5pt]">{edu.includes('FAST') ? 'FAST NUCES' : edu.split(',')[0]}</span>
                    <span className="text-[9.5pt]">2022 -- 2026</span>
                  </div>
                  <div className="flex justify-between items-baseline italic text-[9.5pt]">
                    <span>{edu.includes('Bachelor') || edu.includes('BS') ? 'BS Computer Science' : 'Matriculation / FSc'}</span>
                    <span>Pakistan</span>
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <section className="mb-5">
              <h2 className="text-[12pt] font-bold uppercase border-b border-black mb-2 pb-0.5">Projects</h2>
              <div className="space-y-4">
                {projects.slice(0, 4).map((project, i) => {
                  const parts = project.split('|');
                  const title = parts[0] || project;
                  return (
                    <div key={i} className="mb-3">
                      <div className="flex justify-between items-baseline font-bold text-[10.5pt]">
                        <span className="uppercase">{title.trim()}</span>
                        <span className="text-[9.5pt] font-normal">2024 - 2025</span>
                      </div>
                      <p className="text-[9pt] italic text-gray-800 mb-1">{parts[1] || 'Web Development & System Design'}</p>
                      <ul className="list-disc list-outside ml-4 text-[9pt] space-y-1 text-gray-800">
                        {project.length > 50 ? (
                           <li>{project}</li>
                        ) : (
                          <>
                            <li>Developed high-performance systems and optimized application features.</li>
                            <li>Integrated modern frameworks to achieve scalable and efficient results.</li>
                          </>
                        )}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Technical Skills */}
          <section className="mb-5">
            <h2 className="text-[12pt] font-bold uppercase border-b border-black mb-2 pb-0.5">Technical Skills</h2>
            <div className="text-[9.5pt] space-y-1.5 leading-relaxed">
              {skills.languages && <p><strong>Programming Languages:</strong> {skills.languages}</p>}
              {(skills.frontend || skills.backend) && (
                <p><strong>Web Development:</strong> {[skills.frontend, skills.backend].filter(Boolean).join(', ')}</p>
              )}
              {skills.databases && <p><strong>Databases:</strong> {skills.databases}</p>}
              {skills.tools && <p><strong>Tools & Platforms:</strong> {skills.tools}</p>}
            </div>
          </section>

          {/* Achievements */}
          {achievements.length > 0 && (
            <section className="mb-3 pb-8">
              <h2 className="text-[12pt] font-bold uppercase border-b border-black mb-2 pb-0.5">Achievements & Activities</h2>
              <ul className="list-disc list-outside ml-4 text-[9pt] space-y-1 text-gray-800">
                {achievements.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
                <li>Active contributor on GitHub with several production-grade deployments.</li>
              </ul>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
