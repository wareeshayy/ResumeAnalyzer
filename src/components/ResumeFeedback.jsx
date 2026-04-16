export default function ResumeFeedback({ score, feedback }) {
  const scoreColor = (score) => {
    if (score >= 75) return 'bg-green-500';
    if (score >= 50) return 'bg-primary-dark';
    if (score >= 25) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Resume Review</h2>
        <div className="mt-4">
          <div className={`w-24 h-24 rounded-full ${scoreColor(score)} flex items-center justify-center text-white text-2xl font-bold mx-auto`}>
            {score}
          </div>
          <p className="mt-2 text-gray-600">Overall Score /100</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(feedback)
          .filter(([key]) => key.endsWith('Score'))
          .map(([key, value]) => (
            <div key={key} className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold capitalize text-gray-800">{key.replace('Score', '')}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${scoreColor(value)} text-white shadow-sm`}>
                  {value}/100
                </span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                {feedback[`${key.replace('Score', '')}Feedback`]}
              </p>
            </div>
          ))}
      </div>

      <div className="bg-primary-light p-5 rounded-xl border border-primary">
        <h3 className="font-bold text-gray-800 mb-2">ATS Score: {feedback.atsScore}/100</h3>
        <p className="text-sm text-gray-700 mb-3">How well does your resume pass through Applicant Tracking Systems?</p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {feedback.atsSuggestions.map((suggestion, index) => (
            <li key={index} className="flex items-start bg-white/50 p-2 rounded-md">
              <svg className="w-5 h-5 mr-2 text-primary-dark flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm text-gray-700 leading-tight">{suggestion}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}