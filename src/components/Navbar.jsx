import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">RESUMIND</Link>
        <div className="flex space-x-6">
          <Link to="/dashboard" className="hover:underline">Dashboard</Link>
          <Link to="/analyze" className="hover:underline">Analyze</Link>
          <Link to="/jobs" className="hover:underline">Jobs</Link>
          <Link to="/login" className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}