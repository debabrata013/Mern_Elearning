import React, { useState, useRef, useEffect } from 'react';
import { 
  FaPlay, FaPause, FaForward, FaBackward, 
  FaExpand, FaCompress, FaCog, FaVolumeUp, FaVolumeMute 
} from 'react-icons/fa';

const VideoPlayer = ({ videoUrl, thumbnailUrl, title, className }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showSpeedOptions, setShowSpeedOptions] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => setDuration(video.duration);
    const handleTimeUpdate = () => setCurrentTime(video.currentTime);

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleSkip = (seconds) => {
    videoRef.current.currentTime += seconds;
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      playerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    videoRef.current.volume = newVolume;
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (isMuted) {
      videoRef.current.volume = volume;
      setIsMuted(false);
    } else {
      videoRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  const handleSpeedChange = (speed) => {
    videoRef.current.playbackRate = speed;
    setPlaybackSpeed(speed);
    setShowSpeedOptions(false);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div 
      ref={playerRef}
      className="relative group bg-black rounded-xl overflow-hidden"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <video
        ref={videoRef}
        className="w-full h-full"
        poster={thumbnailUrl}
        onClick={togglePlay}
      >
        <source src="https://edu-tec.s3.ap-south-1.amazonaws.com/videos/1744051301976-Will+There+be+Delay+in+India%27s+OTP+Delivery+from+December+1%EF%BC%9F+%EF%BD%9C+Vantage+with+Palki+Sharma.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Video Controls */}
      <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        {/* Progress Bar */}
        <div className="w-full h-1 bg-gray-400 rounded-full mb-4 cursor-pointer"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            videoRef.current.currentTime = percent * duration;
          }}
        >
          <div 
            className="h-full bg-[#5491CA] rounded-full"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          />
        </div>

        <div className="flex items-center justify-between">
          {/* Left Controls */}
          <div className="flex items-center gap-4">
            <button onClick={togglePlay} className="text-white hover:text-[#5491CA] transition-colors">
              {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
            </button>
            <button onClick={() => handleSkip(-10)} className="text-white hover:text-[#5491CA] transition-colors">
              <FaBackward size={20} />
            </button>
            <button onClick={() => handleSkip(10)} className="text-white hover:text-[#5491CA] transition-colors">
              <FaForward size={20} />
            </button>
            
            {/* Volume Control */}
            <div className="flex items-center gap-2">
              <button onClick={toggleMute} className="text-white hover:text-[#5491CA] transition-colors">
                {isMuted ? <FaVolumeMute size={20} /> : <FaVolumeUp size={20} />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-20 accent-[#5491CA]"
              />
            </div>

            {/* Time Display */}
            <div className="text-white text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-4">
            {/* Playback Speed */}
            <div className="relative">
              <button 
                onClick={() => setShowSpeedOptions(!showSpeedOptions)}
                className="text-white hover:text-[#5491CA] transition-colors flex items-center gap-1"
              >
                <FaCog size={20} />
                <span>{playbackSpeed}x</span>
              </button>
              
              {showSpeedOptions && (
                <div className="absolute bottom-full right-0 mb-2 bg-black/90 rounded-lg p-2 flex flex-col gap-1">
                  {[0.5, 1, 1.25, 1.5, 2].map((speed) => (
                    <button
                      key={speed}
                      onClick={() => handleSpeedChange(speed)}
                      className={`px-4 py-1 text-white hover:bg-[#5491CA]/20 rounded ${playbackSpeed === speed ? 'bg-[#5491CA]/20' : ''}`}
                    >
                      {speed}x
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Fullscreen Toggle */}
            <button onClick={toggleFullscreen} className="text-white hover:text-[#5491CA] transition-colors">
              {isFullscreen ? <FaCompress size={20} /> : <FaExpand size={20} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
