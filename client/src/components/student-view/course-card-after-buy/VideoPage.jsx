// // pages/VideoPage.jsx
// import React from 'react';
// import { useParams } from 'react-router-dom';
// import VideoPlayer from '../studentComponent/ui/videoplayer';

// const VideoPage = () => {
//     const { videoUrl, url } = useParams();

//     const decodedUrl = decodeURIComponent(videoUrl); // dynamic bhi ho sakta hai

//   return (
    
//       <VideoPlayer videoUrl={decodedUrl}/>

//   );
// };

// export default VideoPage;
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import VideoPlayer from '../studentComponent/ui/videoplayer';

const VideoPage = () => {
  const { videoUrl } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [videoTitle, setVideoTitle] = useState('');
  
  // Decode the URL parameter
  const decodedUrl = videoUrl ? decodeURIComponent(videoUrl) : '';
  
  useEffect(() => {
    if (!decodedUrl) {
      setError('No video URL provided');
      setIsLoading(false);
      return;
    }
    
    // Extract video title from URL if possible
    try {
      const urlObj = new URL(decodedUrl);
      const pathSegments = urlObj.pathname.split('/');
      const fileName = pathSegments[pathSegments.length - 1];
      
      // Remove file extension and replace hyphens/underscores with spaces
      const title = fileName
        .replace(/\.[^/.]+$/, '') // Remove file extension
        .replace(/[-_]/g, ' '); // Replace hyphens and underscores with spaces
        
      setVideoTitle(title || 'Video Player');
    } catch (e) {
      // If URL parsing fails, use a default title
      setVideoTitle('Video Player');
    }
    
    setIsLoading(false);
  }, [decodedUrl]);
  
  // Handle going back to the course
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 p-4 shadow-md flex items-center justify-between">
        <button 
          onClick={handleGoBack}
          className="flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-200"
          aria-label="Go back"
        >
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="hidden sm:inline">Back to Course</span>
        </button>
        
        <h1 className="text-lg sm:text-xl font-semibold text-white truncate max-w-xs sm:max-w-md">
          {videoTitle}
        </h1>
        
        <div className="w-5 sm:w-24"></div> {/* Spacer for balanced layout */}
      </header>
      
      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-md max-w-lg mx-auto">
            <p className="font-medium">Error</p>
            <p>{error}</p>
            <button 
              onClick={handleGoBack} 
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Return to Course
            </button>
          </div>
        ) : (
          <div className="w-full max-w-4xl mx-auto bg-black rounded-lg overflow-hidden shadow-xl">
            <div className="aspect-video w-full">
              <VideoPlayer videoUrl={decodedUrl} />
            </div>
          </div>
        )}
      </main>
      
      {/* Video Controls - Could be expanded with additional functionality */}
      <footer className="bg-gray-800 p-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex justify-center gap-4">
          <button 
            onClick={handleGoBack}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Course
          </button>
        </div>
      </footer>
    </div>
  );
};

export default VideoPage;
