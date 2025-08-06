import JobListing from '../components/JobListing';

export default function Jobs() {
  const jobListings = [
    {
      title: "Full Stack Developer",
      company: "PixelForge Studio",
      description: "We're looking for a full stack developer with experience in React, Node.js, and modern web technologies to join our product team."
    },
    {
      title: "Frontend Engineer",
      company: "TechCorp Inc.",
      description: "Join our frontend team to build beautiful, responsive user interfaces with React and TypeScript."
    },
    {
      title: "Backend Developer",
      company: "DataSystems LLC",
      description: "Help us build scalable backend services with Node.js, Python, and cloud technologies."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Job Listings</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Post New Job
        </button>
      </div>
      
      <div className="space-y-6">
        {jobListings.map((job, index) => (
          <JobListing 
            key={index}
            title={job.title}
            company={job.company}
            description={job.description}
          />
        ))}
      </div>
    </div>
  );
}