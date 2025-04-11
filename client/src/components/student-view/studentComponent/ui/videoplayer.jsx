// components/VideoPlayer.jsx
import React, { useState, useRef, useEffect } from 'react';
import {
  FaPlay, FaPause, FaForward, FaBackward,
  FaExpand, FaCompress, FaCog, FaVolumeUp, FaVolumeMute
} from 'react-icons/fa';

const speeds = [0.5, 1, 1.25, 1.5, 2];

const VideoPlayer = ({ videoUrl, thumbnailUrl, title, className = '' }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showSpeedOptions, setShowSpeedOptions] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    const video = videoRef.current;

    const updateDuration = () => setDuration(video.duration);
    const updateCurrentTime = () => setCurrentTime(video.currentTime);

    video.addEventListener('loadedmetadata', updateDuration);
    video.addEventListener('timeupdate', updateCurrentTime);

    return () => {
      video.removeEventListener('loadedmetadata', updateDuration);
      video.removeEventListener('timeupdate', updateCurrentTime);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const skip = (sec) => {
    videoRef.current.currentTime += sec;
  };

  const handleVolume = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    videoRef.current.volume = val;
    setIsMuted(val === 0);
  };

  const toggleMute = () => {
    if (isMuted) {
      videoRef.current.volume = volume || 1;
      setIsMuted(false);
    } else {
      videoRef.current.volume = 0;
      setIsMuted(true);
    }
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

  const changeSpeed = (speed) => {
    videoRef.current.playbackRate = speed;
    setPlaybackSpeed(speed);
    setShowSpeedOptions(false);
  };

  const seek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = percent * duration;
  };

  const formatTime = (time) => {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60).toString().padStart(2, '0');
    return `${min}:${sec}`;
  };

  return (
    <div
      ref={playerRef}
      className={`relative rounded-xl overflow-hidden bg-black group ${className}`}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <video
        ref={videoRef}
        className="w-full h-full cursor-pointer"
        poster={thumbnailUrl}
        onClick={togglePlay}
        src={videoUrl}
        type="video/mp4"
      />

      {/* Controls */}
      <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-4 py-3 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* Progress Bar */}
        <div className="w-full h-2 bg-gray-400 rounded-full mb-4 cursor-pointer" onClick={seek}>
          <div
            className="h-full bg-[#5491CA] rounded-full"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          />
        </div>

        {/* Bottom Controls */}
        <div className="flex justify-between items-center text-white text-sm">
          {/* Left Controls */}
          <div className="flex items-center gap-4">
            <button onClick={togglePlay}>{isPlaying ? <FaPause size={18} /> : <FaPlay size={18} />}</button>
            <button onClick={() => skip(-10)}><FaBackward size={18} /></button>
            <button onClick={() => skip(10)}><FaForward size={18} /></button>
            <button onClick={toggleMute}>
              {isMuted ? <FaVolumeMute size={18} /> : <FaVolumeUp size={18} />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={handleVolume}
              className="w-20 accent-[#5491CA]"
            />
            <div>{formatTime(currentTime)} / {formatTime(duration)}</div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-4">
            {/* Speed */}
            <div className="relative">
              <button onClick={() => setShowSpeedOptions(!showSpeedOptions)} className="flex items-center gap-1">
                <FaCog size={18} /><span>{playbackSpeed}x</span>
              </button>
              {showSpeedOptions && (
                <div className="absolute bottom-full right-0 mb-2 bg-black/90 p-2 rounded-lg shadow-md flex flex-col gap-1 z-10">
                  {speeds.map((s) => (
                    <button
                      key={s}
                      onClick={() => changeSpeed(s)}
                      className={`px-3 py-1 rounded hover:bg-[#5491CA]/30 ${s === playbackSpeed ? 'bg-[#5491CA]/30' : ''}`}
                    >
                      {s}x
                    </button>
                  ))}
                </div>
              )}
            </div>
            {/* Fullscreen */}
            <button onClick={toggleFullscreen}>
              {isFullscreen ? <FaCompress size={18} /> : <FaExpand size={18} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
