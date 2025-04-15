import React, { useState, useEffect } from "react";
import axiosInstance from '@/api/axiosInstance';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const DoubtsPage = () => {
  const [doubts, setDoubts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('unresolved');
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const { courseId } = useParams();

  // Fetch all doubts when the component mounts or courseId changes
  useEffect(() => {
    fetchDoubts();
  }, [courseId]);

  const fetchDoubts = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(`/api/doubts/course/${courseId}`);
      setDoubts(response.data);
    } catch (error) {
      console.error('Error fetching doubts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const createDoubt = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/api/doubts", {
        courseId,
        askedBy: user._id,
        title,
        description,
      });
      // Refresh the list after creating a new doubt
      fetchDoubts();
      // Clear form inputs and close modal
      setTitle('');
      setDescription('');
      setShowModal(false);
      // Automatically switch to unresolved tab to show the new doubt
      setActiveTab('unresolved');
    } catch (error) {
      console.error('Error creating doubt:', error);
    }
  };

  // Redirect to doubt detail page on card click
  const handleCardClick = (doubtId) => {
    navigate(`/doubt/${doubtId}/discussion`);
  };

  // Close modal when clicking outside
  const handleModalBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowModal(false);
    }
  };

  // Handle escape key press to close modal
  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === 'Escape' && showModal) {
        setShowModal(false);
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [showModal]);

  // Get counts for each category
  const unresolvedCount = doubts.filter(doubt => !doubt.isResolved).length;
  const resolvedCount = doubts.filter(doubt => doubt.isResolved).length;
  const allCount = doubts.length;

  return (
    <div className="m-auto p-auto mt-9 p-10">
      {/* Header Section with Title and Create Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Discussion Forum</h1>
        <motion.button 
          onClick={() => setShowModal(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg shadow-md transition-all duration-200 flex items-center justify-center font-medium mt-4 sm:mt-0"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          aria-label="Create new doubt"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Ask a Question
        </motion.button>
      </div>
      
      {/* Navigation Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <div className="flex flex-wrap">
          <button
            onClick={() => setActiveTab('unresolved')}
            className={`py-3 px-6 font-medium text-sm transition-colors duration-200 relative ${
              activeTab === 'unresolved'
                ? 'text-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            aria-current={activeTab === 'unresolved' ? 'page' : undefined}
          >
            Unresolved
            <span className="ml-2 bg-amber-100 text-amber-800 text-xs font-medium px-2 py-0.5 rounded-full">
              {unresolvedCount}
            </span>
            {activeTab === 'unresolved' && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"
                layoutId="activeTabIndicator"
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab('resolved')}
            className={`py-3 px-6 font-medium text-sm transition-colors duration-200 relative ${
              activeTab === 'resolved'
                ? 'text-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            aria-current={activeTab === 'resolved' ? 'page' : undefined}
          >
            Resolved
            <span className="ml-2 bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded-full">
              {resolvedCount}
            </span>
            {activeTab === 'resolved' && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"
                layoutId="activeTabIndicator"
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab('all')}
            className={`py-3 px-6 font-medium text-sm transition-colors duration-200 relative ${
              activeTab === 'all'
                ? 'text-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            aria-current={activeTab === 'all' ? 'page' : undefined}
          >
            All Questions
            <span className="ml-2 bg-gray-100 text-gray-800 text-xs font-medium px-2 py-0.5 rounded-full">
              {allCount}
            </span>
            {activeTab === 'all' && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"
                layoutId="activeTabIndicator"
              />
            )}
          </button>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      )}

      {/* All Doubts Section */}
      {!isLoading && (
        <>
          {/* Unresolved Section */}
          {activeTab === 'unresolved' && (
            <div className="mb-8">
              {doubts.filter(doubt => !doubt.isResolved).length === 0 ? (
                <div className="text-center py-10 bg-gray-50 rounded-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-xl font-medium text-gray-700 mb-2">No unresolved questions</h3>
                  <p className="text-gray-500">There are no unresolved questions in this course.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {doubts.filter(doubt => !doubt.isResolved).map((doubt, index) => (
                    <motion.div
                      key={doubt._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="cursor-pointer p-6 rounded-lg shadow-md transition-all duration-300 bg-white hover:shadow-lg border-l-4 border-l-amber-500"
                      onClick={() => handleCardClick(doubt._id)}
                    >
                      <div className="flex items-center mb-4">
                        <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center overflow-hidden mr-3">
                          {doubt.askedBy.profileImage ? (
                            <img
                              src={doubt.askedBy.profileImage}
                              alt={`${doubt.askedBy.userName}'s profile`}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <span className="text-indigo-600 font-medium">
                              {doubt.askedBy.userName?.charAt(0).toUpperCase() || "?"}
                            </span>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{doubt.askedBy.userName}</p>
                          <p className="text-gray-500 text-sm">
                            {new Date(doubt.createdAt).toLocaleDateString(undefined, {
                              month: 'short', 
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold mb-3 text-gray-800 line-clamp-2">{doubt.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {doubt.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-800">
                          <span className="w-2 h-2 rounded-full mr-1.5 bg-amber-500"></span>
                          Unresolved
                        </span>
                        <span className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                          View Details →
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Resolved Section */}
          {activeTab === 'resolved' && (
            <div className="mb-8">
              {doubts.filter(doubt => doubt.isResolved).length === 0 ? (
                <div className="text-center py-10 bg-gray-50 rounded-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-xl font-medium text-gray-700 mb-2">No resolved questions</h3>
                  <p className="text-gray-500">There are no resolved questions in this course yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {doubts.filter(doubt => doubt.isResolved).map((doubt, index) => (
                    <motion.div
                      key={doubt._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="cursor-pointer p-6 rounded-lg shadow-md transition-all duration-300 bg-white hover:shadow-lg border-l-4 border-l-green-500"
                      onClick={() => handleCardClick(doubt._id)}
                    >
                      <div className="flex items-center mb-4">
                        <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center overflow-hidden mr-3">
                          {doubt.askedBy.profileImage ? (
                            <img
                              src={doubt.askedBy.profileImage}
                              alt={`${doubt.askedBy.userName}'s profile`}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <span className="text-indigo-600 font-medium">
                              {doubt.askedBy.userName?.charAt(0).toUpperCase() || "?"}
                            </span>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{doubt.askedBy.userName}</p>
                          <p className="text-gray-500 text-sm">
                            {new Date(doubt.createdAt).toLocaleDateString(undefined, {
                              month: 'short', 
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold mb-3 text-gray-800 line-clamp-2">{doubt.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {doubt.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                          <span className="w-2 h-2 rounded-full mr-1.5 bg-green-500"></span>
                          Resolved
                        </span>
                        <span className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                          View Details →
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* All Questions Section */}
          {activeTab === 'all' && (
            <div className="mb-8">
              {doubts.length === 0 ? (
                <div className="text-center py-10 bg-gray-50 rounded-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-xl font-medium text-gray-700 mb-2">No questions yet</h3>
                  <p className="text-gray-500 mb-4">Be the first to ask a question in this course!</p>
                  <button 
                    onClick={() => setShowModal(true)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg shadow-md transition-all duration-200"
                  >
                    Ask a Question
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {doubts.map((doubt, index) => (
                    <motion.div
                      key={doubt._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className={`cursor-pointer p-6 rounded-lg shadow-md transition-all duration-300 bg-white hover:shadow-lg border-l-4 ${
                        doubt.isResolved ? "border-l-green-500" : "border-l-amber-500"
                      }`}
                      onClick={() => handleCardClick(doubt._id)}
                    >
                      <div className="flex items-center mb-4">
                        <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center overflow-hidden mr-3">
                          {doubt.askedBy.profileImage ? (
                            <img
                              src={doubt.askedBy.profileImage}
                              alt={`${doubt.askedBy.userName}'s profile`}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <span className="text-indigo-600 font-medium">
                              {doubt.askedBy.userName?.charAt(0).toUpperCase() || "?"}
                            </span>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{doubt.askedBy.userName}</p>
                          <p className="text-gray-500 text-sm">
                            {new Date(doubt.createdAt).toLocaleDateString(undefined, {
                              month: 'short', 
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold mb-3 text-gray-800 line-clamp-2">{doubt.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {doubt.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                            doubt.isResolved
                              ? "bg-green-100 text-green-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          <span className={`w-2 h-2 rounded-full mr-1.5 ${doubt.isResolved ? "bg-green-500" : "bg-amber-500"}`}></span>
                          {doubt.isResolved ? "Resolved" : "Unresolved"}
                        </span>
                        <span className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                          View Details →
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* Modal for Creating a New Doubt */}
      <AnimatePresence>
        {showModal && (
          <motion.div 
            className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleModalBackdropClick}
          >
            <motion.div 
              className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Ask a Question</h2>
                <button 
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                  aria-label="Close modal"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <form onSubmit={createDoubt}>
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="doubt-title">
                    Title
                  </label>
                  <input
                    id="doubt-title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    placeholder="What's your question about?"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="doubt-description">
                    Description
                  </label>
                  <textarea
                    id="doubt-description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border border-gray-300 p-3 rounded-lg h-32 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    placeholder="Provide details about your question..."
                    required
                  ></textarea>
                </div>
                <div className="flex justify-end space-x-3">
                  <button 
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-5 py-2.5 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-all duration-200 flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                    </svg>
                    Submit Question
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DoubtsPage;