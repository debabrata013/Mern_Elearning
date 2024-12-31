import React, { useState, useEffect, useCallback } from 'react';
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
    jobImageUrl: '',
    jobLink: ''
  });
  const [currentJobId, setCurrentJobId] = useState(null);

  // Fetch jobs from the backend
  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      const data = await jobService.getAllJobs();
      setJobs(data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

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
        await jobService.updateJob(currentJobId, formData);
        console.log('Job updated successfully');
      } else {
        const response = await jobService.createJob(formData);
        console.log('Job created successfully:', response);
      }
      await fetchJobs(); // Refresh job list
      setShowJobForm(false);
      setFormData({
        jobTitle: '',
        jobDescription: '',
        salary: '',
        experience: '',
        applyStartDate: '',
        applyEndDate: '',
        jobjobImageUrl: '',
        jobLink: ''
      });
      setCurrentJobId(null);
    } catch (error) {
      console.error('Error submitting job:', error.response?.data || error.message);
    }
  };

  const handleRemoveJob = async (jobId) => {
    try {
      await jobService.deleteJob(jobId);
      console.log('Job deleted successfully');
      await fetchJobs(); // Refresh job list after deletion
    } catch (error) {
      console.error('Error deleting job:', error.response?.data || error.message);
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
      jobImageUrl: job.jobImageUrl,
      jobLink: job.jobLink
    });
    setCurrentJobId(job._id); 
    setShowJobForm(true);
  };

  const renderJobCard = (job) => (
    <div key={job._id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      <div className="relative">
        <img 
          src={job.jobImageUrl || '/api/placeholder/300/200'} 
          alt={job.jobTitle} 
          className="w-full h-56 object-cover rounded-lg mb-4" 
        />
        <div className="absolute top-2 right-2 flex gap-2">
          <button
            onClick={() => handleEditJob(job)}
            className="p-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition-colors"
            title="Edit Job"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>
          <button
            onClick={() => handleRemoveJob(job._id)}
            className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            title="Remove Job"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="space-y-3">
        <h3 className="text-xl font-bold text-gray-800">{job.jobTitle}</h3>  
        <p className="text-gray-600 leading-relaxed">{job.jobDescription}</p>
        
        <div className="flex flex-wrap gap-2 my-3">
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
            ₹{job.salary}
          </span>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
            {job.experience} years exp
          </span>
        </div>
        
        <div className="text-sm text-gray-600">
          <p>Application Period:</p>
          <p className="font-medium">{job.applyStartDate} - {job.applyEndDate}</p>
        </div>

        <a 
          href={job.jobLink} 
          className="mt-4 block w-full text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
          target="_blank" 
          rel="noopener noreferrer"
        >
          Apply Now
        </a>
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
                <label className="block text-sm font-medium mb-1" htmlFor="jobDescription">Job Description</label>
                <input
                  type="text"
                  id="jobDescription"
                  name="jobDescription"
                  value={formData.jobDescription}
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
                <label className="block text-sm font-medium mb-1" htmlFor="jobImageUrl">Job Image URL</label>
                <input
                  type="url"
                  id="jobImageUrl"
                  name="jobImageUrl"
                  value={formData.jobImageUrl}
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
              {currentJobId ? 'Update Job' : 'Create Job'}
            </button>
          </form>
        </div>
      )}

      {/* Loading Spinner */}
      {loading && (
        <div className="text-center my-6">
          <div className="spinner"></div>
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
