import React, { useState, useEffect, useCallback } from 'react';
import { Plus, X, Briefcase, BadgeIndianRupee, Clock, Calendar, Link, Image, Award, FileText, Menu } from 'lucide-react';
// import jobService from '/api/jobService';
import jobService from '../../pages/admin/api/jobService';
import Sidebar from './studentComponent/Sidebar';
import TopBar from './studentComponent/Topbar';
import { format } from 'date-fns';
const JobsContent = () => {
  const [showJobForm, setShowJobForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
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

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setIsSidebarOpen(!mobile);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  
const [showNotifications, setShowNotifications] = useState(false);

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
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
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
 
    <div  >
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
                <BadgeIndianRupee className="h-3 w-3 mr-0.5" />
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
           
            <span>
  {format(new Date(job.applyStartDate), 'MMMM d, yyyy')} - 
  {format(new Date(job.applyEndDate), 'MMMM d, yyyy')}
</span>
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
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className={`md:hidden fixed top-4 z-50 p-2 rounded-md bg-[#5491CA] text-white shadow-lg hover:bg-[#467bb0] transition-colors 
            ${isSidebarOpen ? 'right-4' : 'left-4'}`}
        >
          <Menu className="h-6 w-6" />
        </button>
      )}

      {/* Sidebar backdrop for mobile */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`bg-white shadow-xl w-[280px] h-screen fixed top-0 left-0 border-r border-gray-200 transition-transform duration-300 ease-in-out z-40 ${
          isMobile ? (isSidebarOpen ? "translate-x-0" : "-translate-x-full") : "translate-x-0"
        }`}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${
        isMobile ? 'ml-0' : 'ml-[280px]'
      }`}>
        <TopBar />


        <div className="p-4 md:p-8">
          {/* Header with menu button */}
          <header className="mb-8 md:mb-12 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-[#7670AC] dark:text-white">
                  Explore <span className="text-[#5491CA] dark:text-[#7670AC]">Jobs</span>
                </h1>
          </header>
          
          {/* Loading Spinner */}
          {loading && (
            <div className="text-center my-8">
              <div className="inline-block w-10 h-10 border-3 border-[#5491CA] border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-2 text-[#5491CA] text-sm">Loading jobs...</p>
            </div>
          )}

          {/* Jobs Grid */}
          {!loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {jobs.length === 0 ? (
                <div className="col-span-full text-center py-8">
                  <Briefcase className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                  <p className="text-gray-500">No jobs available</p>
                </div>
              ) : (
                jobs.map(renderJobCard)
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};


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
