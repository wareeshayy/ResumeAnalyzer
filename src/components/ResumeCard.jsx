export default function ResumeCard({ name, score, date }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start">
        <h3 className="font-medium text-lg">{name}</h3>
        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
          {score}/100
        </span>
      </div>
      <p className="text-gray-500 text-sm mt-2">Analyzed on {date}</p>
      <div className="mt-4">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full" 
            style={{ width: `${score}%` }}
          ></div>
        </div>
      </div>
      <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
        View Details
      </button>
    </div>
  );
}