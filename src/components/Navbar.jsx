import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-primary text-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-tight">RESUMIND</Link>
        <div className="flex space-x-6">
          <Link to="/dashboard" className="hover:text-primary-dark font-medium">Dashboard</Link>
          <Link to="/analyze" className="hover:text-primary-dark font-medium">Analyze</Link>
          <Link to="/jobs" className="hover:text-primary-dark font-medium">Jobs</Link>
          <Link to="/login" className="bg-white text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors shadow-sm font-semibold">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}