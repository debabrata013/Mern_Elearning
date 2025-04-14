// pages/VideoPage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import VideoPlayer from '../studentComponent/ui/videoplayer';

const VideoPage = () => {
    const { videoUrl, url } = useParams();

    const decodedUrl = decodeURIComponent(videoUrl); // dynamic bhi ho sakta hai

  return (
    
      <VideoPlayer videoUrl={decodedUrl}/>

  );
};

export default VideoPage;
