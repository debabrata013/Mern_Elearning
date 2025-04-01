import React, { useState, useEffect, useCallback } from 'react';
import { Plus, X, Briefcase, DollarSign, Clock, Calendar, Link, Image, Award, FileText } from 'lucide-react';
// import jobService from '/api/jobService';
import jobService from '../../pages/admin/api/jobService';

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
        jobImageUrl: '',
        jobLink: ''
      });
      setCurrentJobId(null);
    } catch (error) {
      console.error('Error submitting job:', error.response?.data || error.message);
    }
  };

  const handleRemoveJob = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        await jobService.deleteJob(jobId);
        console.log('Job deleted successfully');
        await fetchJobs(); // Refresh job list after deletion
      } catch (error) {
        console.error('Error deleting job:', error.response?.data || error.message);
      }
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
    
    // Scroll to form
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const resetForm = () => {
    setFormData({
      jobTitle: '',
      jobDescription: '',
      salary: '',
      experience: '',
      applyStartDate: '',
      applyEndDate: '',
      jobImageUrl: '',
      jobLink: ''
    });
    setCurrentJobId(null);
    setShowJobForm(false);
  };

  // Job card with 4:5 ratio
  const renderJobCard = (job) => (
    <div key={job._id} className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 w-full overflow-hidden" style={{ aspectRatio: '3/5' }}>
      <div className="relative h-full flex flex-col">
        {/* Image container with overlay gradient */}
        <div className="h-2/5 relative">
          <img 
            src={job.jobImageUrl || 'https://via.placeholder.com/300x200?text=Job+Opportunity'} 
            alt={job.jobTitle} 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          
          {/* Action buttons - moved to top right with better visibility */}
          <div className="absolute top-2 right-2 flex gap-1.5">
            <button
              onClick={() => handleEditJob(job)}
              className="p-1.5 bg-white text-[#5491CA] rounded-full hover:bg-[#5491CA] hover:text-white transition-colors shadow-md"
              title="Edit Job"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </button>
           
        </div>
        
          {/* Job title overlay on image for better visibility */}
          <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-black/0">
            <h3 className="text-white font-bold line-clamp-1 text-sm">{job.jobTitle}</h3>
          </div>
        </div>
        
        {/* Content section with improved spacing and layout */}
        <div className="p-3 flex flex-col h-3/5">
          {/* Top content area */}
          <div className="mb-2">
            {/* Tags in a clean row */}
            <div className="flex flex-wrap gap-1.5 mb-2">
              <span className="px-2 py-0.5 bg-[#5491CA]/10 text-[#5491CA] rounded-full text-xs font-medium flex items-center">
                <DollarSign className="h-3 w-3 mr-0.5" />
                ₹{job.salary}
              </span>
              <span className="px-2 py-0.5 bg-[#b1a9f1]/10 text-[#b1a9f1] rounded-full text-xs font-medium flex items-center">
                <Award className="h-3 w-3 mr-0.5" />
                {job.experience} yrs
              </span>
            </div>
            
            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{job.jobDescription}</p>
          </div>
          
          {/* Date information */}
          <div className="text-xs text-gray-500 flex items-center mb-3">
            <Calendar className="h-3 w-3 mr-0.5 text-[#5491CA]" />
            <span>{job.applyStartDate} - {job.applyEndDate}</span>
          </div>
          
          {/* Apply button - positioned at bottom with improved visibility */}
          <div className="mt-auto">
            <a 
              href={job.jobLink} 
              className="block w-full text-center bg-[#5491CA] text-white py-2 rounded-md hover:bg-[#4a82b6] transition-colors text-sm font-medium shadow-md"
              target="_blank" 
              rel="noopener noreferrer"
            >
              Apply Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 p-4 md:p-6 rounded-xl">
      {/* Header with title and add button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#5491CA] flex items-center">
            <Briefcase className="mr-2 h-5 w-5" />
            Job Management
          </h2>
          <p className="text-gray-500 text-sm">Create and manage job opportunities</p>
        </div>
        {!showJobForm && (
          <button
            onClick={() => setShowJobForm(true)}
            className="bg-[#5491CA] text-white px-3 py-1.5 rounded-lg hover:bg-[#4a82b6] transition-colors flex items-center gap-1.5 self-end text-sm"
          >
            <Plus className="h-4 w-4" />
            Add New Job
          </button>
        )}
      </div>

      {/* Job Form (visible when showJobForm is true) */}
      {showJobForm ? (
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6 border-t-4 border-[#5491CA] animate-fadeIn">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-[#5491CA]">{currentJobId ? 'Edit Job' : 'Add New Job'}</h3>
            <button
              onClick={resetForm}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <form onSubmit={handleAddJob}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="mb-3">
                <label className="block text-sm font-medium mb-1 text-gray-700" htmlFor="jobTitle">
                  <div className="flex items-center">
                    <Briefcase className="h-3.5 w-3.5 mr-1 text-[#5491CA]" />
                    Job Title
                  </div>
                </label>
                <input
                  type="text"
                  id="jobTitle"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-[#5491CA] focus:border-[#5491CA] text-sm"
                  placeholder="e.g. Senior Web Developer"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium mb-1 text-gray-700" htmlFor="salary">
                  <div className="flex items-center">
                    <DollarSign className="h-3.5 w-3.5 mr-1 text-[#5491CA]" />
                    Salary
                  </div>
                </label>
                <input
                  type="text"
                  id="salary"
                  name="salary"
                  value={formData.salary}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-[#5491CA] focus:border-[#5491CA] text-sm"
                  placeholder="e.g. 80,000 - 1,20,000"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium mb-1 text-gray-700" htmlFor="experience">
                  <div className="flex items-center">
                    <Award className="h-3.5 w-3.5 mr-1 text-[#5491CA]" />
                    Experience
                  </div>
                </label>
                <input
                  type="text"
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-[#5491CA] focus:border-[#5491CA] text-sm"
                  placeholder="e.g. 2-3"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium mb-1 text-gray-700" htmlFor="jobImageUrl">
                  <div className="flex items-center">
                    <Image className="h-3.5 w-3.5 mr-1 text-[#5491CA]" />
                    Job Image URL
                  </div>
                </label>
                <input
                  type="url"
                  id="jobImageUrl"
                  name="jobImageUrl"
                  value={formData.jobImageUrl}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-[#5491CA] focus:border-[#5491CA] text-sm"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium mb-1 text-gray-700" htmlFor="applyStartDate">
                  <div className="flex items-center">
                    <Calendar className="h-3.5 w-3.5 mr-1 text-[#5491CA]" />
                    Apply Start Date
                  </div>
                </label>
                <input
                  type="date"
                  id="applyStartDate"
                  name="applyStartDate"
                  value={formData.applyStartDate}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-[#5491CA] focus:border-[#5491CA] text-sm"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium mb-1 text-gray-700" htmlFor="applyEndDate">
                  <div className="flex items-center">
                    <Calendar className="h-3.5 w-3.5 mr-1 text-[#5491CA]" />
                    Apply End Date
                  </div>
                </label>
                <input
                  type="date"
                  id="applyEndDate"
                  name="applyEndDate"
                  value={formData.applyEndDate}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-[#5491CA] focus:border-[#5491CA] text-sm"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium mb-1 text-gray-700" htmlFor="jobLink">
                  <div className="flex items-center">
                    <Link className="h-3.5 w-3.5 mr-1 text-[#5491CA]" />
                    Application Link
                  </div>
                </label>
                <input
                  type="url"
                  id="jobLink"
                  name="jobLink"
                  value={formData.jobLink}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-[#5491CA] focus:border-[#5491CA] text-sm"
                  placeholder="https://example.com/apply"
                />
              </div>
              <div className="mb-3 sm:col-span-2">
                <label className="block text-sm font-medium mb-1 text-gray-700" htmlFor="jobDescription">
                  <div className="flex items-center">
                    <FileText className="h-3.5 w-3.5 mr-1 text-[#5491CA]" />
                    Job Description
                  </div>
                </label>
                <textarea
                  id="jobDescription"
                  name="jobDescription"
                  value={formData.jobDescription}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-[#5491CA] focus:border-[#5491CA] text-sm"
                  rows="3"
                  placeholder="Describe the job responsibilities and requirements..."
                  required
                ></textarea>
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              <button
                type="button"
                onClick={resetForm}
                className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-[#5491CA] text-white py-2 rounded-lg hover:bg-[#4a82b6] transition-colors text-sm"
              >
                {currentJobId ? 'Update Job' : 'Create Job'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <>
          {/* Loading Spinner - Only show when not in form mode */}
          {loading && (
            <div className="text-center my-8">
              <div className="inline-block w-10 h-10 border-3 border-[#5491CA] border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-2 text-[#5491CA] text-sm">Loading jobs...</p>
            </div>
          )}

          {/* Display Jobs as Cards - Only show when not in form mode */}
          {!loading && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {jobs.length === 0 ? (
                <div className="col-span-full text-center py-8">
                  <Briefcase className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                  <p className="text-gray-500">No jobs available. Add some jobs!</p>
                  <button
                    onClick={() => setShowJobForm(true)}
                    className="mt-3 bg-[#5491CA] text-white px-3 py-1.5 rounded-lg hover:bg-[#4a82b6] transition-colors inline-flex items-center gap-1.5 text-sm"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Add Your First Job
                  </button>
                </div>
              ) : (
                jobs.map(renderJobCard)
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

// Add this CSS animation to your global styles or component
const globalStyles = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fadeIn {
  animation: fadeIn 0.3s ease-out forwards;
}

.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
`;

export default JobsContent;
