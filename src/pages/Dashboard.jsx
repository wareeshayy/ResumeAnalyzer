import ResumeCard from '../components/ResumeCard';

export default function Dashboard() {
  const recentResumes = [
    { name: 'Software Engineer Resume', score: 78, date: '2023-05-15' },
    { name: 'Updated Resume 2023', score: 65, date: '2023-04-28' },
    { name: 'First Draft Resume', score: 42, date: '2023-03-10' }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-medium mb-2">Total Resumes Analyzed</h2>
          <p className="text-3xl font-bold">12</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-medium mb-2">Average Score</h2>
          <p className="text-3xl font-bold">68</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-medium mb-2">Jobs Applied</h2>
          <p className="text-3xl font-bold">5</p>
        </div>
      </div>
      
      <h2 className="text-xl font-semibold mb-4">Recent Resumes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recentResumes.map((resume, index) => (
          <ResumeCard 
            key={index}
            name={resume.name}
            score={resume.score}
            date={resume.date}
          />
        ))}
      </div>
    </div>
  );
}