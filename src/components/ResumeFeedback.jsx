export default function ResumeFeedback({ score, feedback }) {
  const scoreColor = (score) => {
    if (score >= 75) return 'bg-green-500';
    if (score >= 50) return 'bg-blue-500';
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
        {Object.entries(feedback).map(([key, value]) => (
          <div key={key} className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium capitalize">{key.replace('Score', '')}</h3>
              <span className={`px-2 py-1 rounded-full text-xs ${scoreColor(value)} text-white`}>
                {value}/100
              </span>
            </div>
            <p className="text-sm text-gray-600">{feedback[`${key.replace('Score', '')}Feedback`]}</p>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-medium mb-2">ATS Score: {feedback.atsScore}/100</h3>
        <p className="text-sm mb-3">How well does your resume pass through Applicant Tracking Systems?</p>
        <ul className="space-y-2">
          {feedback.atsSuggestions.map((suggestion, index) => (
            <li key={index} className="flex items-start">
              <svg className="w-4 h-4 mt-1 mr-2 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm">{suggestion}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}