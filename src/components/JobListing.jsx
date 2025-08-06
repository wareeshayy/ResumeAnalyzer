export default function JobListing({ title, company, description }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-xl">{title}</h3>
          <p className="text-gray-600">{company}</p>
        </div>
        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
          Open
        </span>
      </div>
      <p className="mt-3 text-gray-700 line-clamp-3">{description}</p>
      <div className="mt-4 flex justify-between items-center">
        <span className="text-sm text-gray-500">Posted 2 days ago</span>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          View Details
        </button>
      </div>
    </div>
  );
}