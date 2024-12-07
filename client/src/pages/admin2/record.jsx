import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

const JobsContent = () => {
  const [showJobForm, setShowJobForm] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [formData, setFormData] = useState({
    jobTitle: '',
    jobDescription: '',
    salary: '',
    experience: '',
    applyStartDate: '',
    applyEndDate: '',
    imageUrl: '',
    jobLink: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddJob = (e) => {
    e.preventDefault();
    setJobs((prevJobs) => [...prevJobs, { ...formData, id: Date.now() }]);
    setFormData({
      jobTitle: '',
      jobDescription: '',
      salary: '',
      experience: '',
      applyStartDate: '',
      applyEndDate: '',
      imageUrl: '',
      jobLink: ''
    });
    setShowJobForm(false);
  };

  const handleRemoveJob = (id) => {
    setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
  };

  const renderJobCard = (job) => (
    <div key={job.id} className="bg-white p-6 rounded-lg shadow-md">
      <img src={job.imageUrl || '/api/placeholder/300/200'} alt={job.jobTitle} className="w-full h-48 object-cover rounded-md mb-4" />
      <div className="flex flex-col">
        <h3 className="text-lg font-semibold">{job.jobTitle}</h3>
        <p className="text-sm text-gray-600 mb-2">{job.jobDescription}</p>
        <p className="text-sm text-gray-500">Salary: ${job.salary}</p>
        <p className="text-sm text-gray-500">Experience: {job.experience} years</p>
        <p className="text-sm text-gray-500">Apply from: {job.applyStartDate} to {job.applyEndDate}</p>
        <a href={job.jobLink} className="text-blue-600 hover:text-blue-700" target="_blank" rel="noopener noreferrer">Apply Now</a>
        <button
          onClick={() => handleRemoveJob(job.id)}
          className="mt-4 text-red-600 hover:text-red-700 flex items-center gap-2"
        >
          <X className="h-4 w-4" />
          Remove Job
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 p-6 rounded-xl">
      {/* Add Job Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setShowJobForm(!showJobForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Job
        </button>
      </div>

      {/* Job Form (visible when showJobForm is true) */}
      {showJobForm && (
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <h3 className="text-xl font-semibold mb-4">Add New Job</h3>
          <form onSubmit={handleAddJob}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="jobTitle">Job Title</label>
                <input
                  type="text"
                  id="jobTitle"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="salary">Salary</label>
                <input
                  type="text"
                  id="salary"
                  name="salary"
                  value={formData.salary}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="experience">Experience</label>
                <input
                  type="text"
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="applyStartDate">Apply Start Date</label>
                <input
                  type="date"
                  id="applyStartDate"
                  name="applyStartDate"
                  value={formData.applyStartDate}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="applyEndDate">Apply End Date</label>
                <input
                  type="date"
                  id="applyEndDate"
                  name="applyEndDate"
                  value={formData.applyEndDate}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="imageUrl">Job Image URL</label>
                <input
                  type="url"
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="jobLink">Job Link</label>
                <input
                  type="url"
                  id="jobLink"
                  name="jobLink"
                  value={formData.jobLink}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Submit Job
            </button>
          </form>
        </div>
      )}

      {/* Display Jobs as Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">No jobs available. Add some jobs!</p>
        ) : (
          jobs.map(renderJobCard)
        )}
      </div>

      {/* Demo Jobs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {/* Demo Job 1 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <img src="/api/placeholder/300/200" alt="Demo Job" className="w-full h-48 object-cover rounded-md mb-4" />
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold">Frontend Developer</h3>
            <p className="text-sm text-gray-600 mb-2">Build beautiful and responsive websites</p>
            <p className="text-sm text-gray-500">Salary: $80,000</p>
            <p className="text-sm text-gray-500">Experience: 3-5 years</p>
            <p className="text-sm text-gray-500">Apply from: 2024-01-01 to 2024-02-01</p>
            <a href="#" className="text-blue-600 hover:text-blue-700" target="_blank" rel="noopener noreferrer">Apply Now</a>
          </div>
        </div>
        {/* Demo Job 2 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <img src="/api/placeholder/300/200" alt="Demo Job" className="w-full h-48 object-cover rounded-md mb-4" />
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold">Backend Developer</h3>
            <p className="text-sm text-gray-600 mb-2">Work on server-side logic and databases</p>
            <p className="text-sm text-gray-500">Salary: $95,000</p>
            <p className="text-sm text-gray-500">Experience: 5+ years</p>
            <p className="text-sm text-gray-500">Apply from: 2024-02-01 to 2024-03-01</p>
            <a href="#" className="text-blue-600 hover:text-blue-700" target="_blank" rel="noopener noreferrer">Apply Now</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsContent;
