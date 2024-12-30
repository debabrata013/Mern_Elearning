import React, { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';
import jobService from './api/jobService';

const JobsContent = () => {
  const [showJobForm, setShowJobForm] = useState(false);
  const [loading, setLoading] = useState(true);
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
  const [currentJobId, setCurrentJobId] = useState(null);

  // Fetch jobs from the backend
  const fetchJobs = async () => {
    setLoading(true);
    try {
      const data = await jobService.getAllJobs();
      console.log(data);
      
      setJobs(data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddJob = async (e) => {
    e.preventDefault();
    try {
      if (currentJobId) {
        await jobService.updateJob(currentJobId, formData); // Update the job if editing
      } else {
        await jobService.createJob(formData); // Create a new job
      }
      fetchJobs(); // Refresh job list
      setShowJobForm(false);
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
      setCurrentJobId(null); // Reset the current job id
    } catch (error) {
      console.error('Error submitting job:', error);
    }
  };

  const handleRemoveJob = async (id) => {
    try {
      await jobService.deleteJob(id);
      fetchJobs(); // Refresh job list after deletion
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  const handleEditJob = (job) => {
    setFormData({
      jobTitle: job.jobTitle,
      jobDescription: job.jobDescription,
      salary: job.salary,
      experience: job.experience,
      applyStartDate: job.applyStartDate,
      applyEndDate: job.applyEndDate,
      imageUrl: job.imageUrl,
      jobLink: job.jobLink
    });
    setCurrentJobId(job.id); // Set the job id to update
    setShowJobForm(true); // Show the form to edit
  };

  const renderJobCard = (job) => (
   
    
    <div key={job._id} className="bg-white p-6 rounded-lg shadow-md">
      <img src={job.imageUrl || '/api/placeholder/300/200'} alt={job.jobTitle} className="w-full h-48 object-cover rounded-md mb-4" />
      <div className="flex flex-col">
        <h3 className="text-lg font-semibold">{job.jobTitle}</h3>  
        <p className="text-sm text-gray-600 mb-2">{job.jobDescription}</p>
        <p className="text-sm text-gray-500">Salary: ${job.salary}</p>
        <p className="text-sm text-gray-500">Experience: {job.experience} years</p>
        <p className="text-sm text-gray-500">Apply from: {job.applyStartDate} to {job.applyEndDate}</p>
        <a href={job.jobLink} className="text-blue-600 hover:text-blue-700" target="_blank" rel="noopener noreferrer">Apply Now</a>
        <button
          onClick={() => handleEditJob(job)}
          className="mt-4 text-yellow-600 hover:text-yellow-700 flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Modify Job
        </button>
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
      {/* Add/Modify Job Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setShowJobForm(!showJobForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          {currentJobId ? 'Edit Job' : 'Add Job'}
        </button>
      </div>

      {/* Job Form (visible when showJobForm is true) */}
      {showJobForm && (
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <h3 className="text-xl font-semibold mb-4">{currentJobId ? 'Edit Job' : 'Add New Job'}</h3>
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

      {/* Loading Spinner */}
      {loading && (
        <div className="text-center my-6">
          <div className="spinner"></div> {/* You can replace this with your own loader */}
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
    </div>
  );
};

export default JobsContent;
