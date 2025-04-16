// // components/VideoPlayer.jsx
// import React, { useState, useRef, useEffect } from 'react';
// import {
//   FaPlay, FaPause, FaForward, FaBackward,
//   FaExpand, FaCompress, FaCog, FaVolumeUp, FaVolumeMute, FaArrowLeft
// } from 'react-icons/fa';

// const speeds = [0.5, 1, 1.25, 1.5, 2];

// const VideoPlayer = ({ videoUrl, onBack }) => {
//   const videoRef = useRef(null);
//   const playerRef = useRef(null);

//   const [isPlaying, setIsPlaying] = useState(false);
//   const [isMuted, setIsMuted] = useState(false);
//   const [volume, setVolume] = useState(1);
//   const [duration, setDuration] = useState(0);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [playbackSpeed, setPlaybackSpeed] = useState(1);
//   const [showSpeedOptions, setShowSpeedOptions] = useState(false);
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const [showControls, setShowControls] = useState(true);

//   useEffect(() => {
//     const video = videoRef.current;

//     const updateDuration = () => setDuration(video.duration);
//     const updateCurrentTime = () => setCurrentTime(video.currentTime);

//     video.addEventListener('loadedmetadata', updateDuration);
//     video.addEventListener('timeupdate', updateCurrentTime);

//     return () => {
//       video.removeEventListener('loadedmetadata', updateDuration);
//       video.removeEventListener('timeupdate', updateCurrentTime);
//     };
//   }, []);

//   const togglePlay = () => {
//     const video = videoRef.current;
//     if (video.paused) {
//       video.play();
//       setIsPlaying(true);
//     } else {
//       video.pause();
//       setIsPlaying(false);
//     }
//   };

//   const skip = (sec) => {
//     videoRef.current.currentTime += sec;
//   };

//   const handleVolume = (e) => {
//     const val = parseFloat(e.target.value);
//     setVolume(val);
//     videoRef.current.volume = val;
//     setIsMuted(val === 0);
//   };

//   const toggleMute = () => {
//     if (isMuted) {
//       videoRef.current.volume = volume || 1;
//       setIsMuted(false);
//     } else {
//       videoRef.current.volume = 0;
//       setIsMuted(true);
//     }
//   };

//   const toggleFullscreen = () => {
//     if (!document.fullscreenElement) {
//       playerRef.current.requestFullscreen();
//       setIsFullscreen(true);
//     } else {
//       document.exitFullscreen();
//       setIsFullscreen(false);
//     }
//   };

//   const changeSpeed = (speed) => {
//     videoRef.current.playbackRate = speed;
//     setPlaybackSpeed(speed);
//     setShowSpeedOptions(false);
//   };

//   const seek = (e) => {
//     const rect = e.currentTarget.getBoundingClientRect();
//     const percent = (e.clientX - rect.left) / rect.width;
//     videoRef.current.currentTime = percent * duration;
//   };

//   const formatTime = (time) => {
//     const min = Math.floor(time / 60);
//     const sec = Math.floor(time % 60).toString().padStart(2, '0');
//     return `${min}:${sec}`;
//   };

//   return (
//     <div
//       ref={playerRef}
//       className="relative rounded-xl overflow-hidden bg-black group w-full h-full"
//       onMouseEnter={() => setShowControls(true)}
//       onMouseLeave={() => setShowControls(false)}
//     >
//       {/* Back Button */}
//       {/* <button
//         className="absolute top-4 left-4 z-20 bg-black/60 text-white p-2 rounded-full hover:bg-black/80"
//         onClick={onBack}
//       >
//         <FaArrowLeft size={18} />
//       </button> */}

//       <video
//         ref={videoRef}
//         className="w-full h-full cursor-pointer"
//         onClick={togglePlay}
//         src={videoUrl}
//         type="video/mp4"
//       />

//       {/* Controls */}
//       <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-4 py-3 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        
//         {/* Progress Bar */}
//         <div className="w-full h-2 bg-gray-400 rounded-full mb-4 cursor-pointer" onClick={seek}>
//           <div
//             className="h-full bg-[#5491CA] rounded-full"
//             style={{ width: `${(currentTime / duration) * 100}%` }}
//           />
//         </div>

//         {/* Bottom Controls */}
//         <div className="flex justify-between items-center text-white text-sm">
//           {/* Left Controls */}
//           <div className="flex items-center gap-4">
//             <button onClick={togglePlay}>{isPlaying ? <FaPause size={18} /> : <FaPlay size={18} />}</button>
//             <button onClick={() => skip(-10)}><FaBackward size={18} /></button>
//             <button onClick={() => skip(10)}><FaForward size={18} /></button>
//             <button onClick={toggleMute}>
//               {isMuted ? <FaVolumeMute size={18} /> : <FaVolumeUp size={18} />}
//             </button>
//             <input
//               type="range"
//               min="0"
//               max="1"
//               step="0.05"
//               value={isMuted ? 0 : volume}
//               onChange={handleVolume}
//               className="w-20 accent-[#5491CA]"
//             />
//             <div>{formatTime(currentTime)} / {formatTime(duration)}</div>
//           </div>

//           {/* Right Controls */}
//           <div className="flex items-center gap-4">
//             {/* Speed */}
//             <div className="relative">
//               <button onClick={() => setShowSpeedOptions(!showSpeedOptions)} className="flex items-center gap-1">
//                 <FaCog size={18} /><span>{playbackSpeed}x</span>
//               </button>
//               {showSpeedOptions && (
//                 <div className="absolute bottom-full right-0 mb-2 bg-black/90 p-2 rounded-lg shadow-md flex flex-col gap-1 z-10">
//                   {speeds.map((s) => (
//                     <button
//                       key={s}
//                       onClick={() => changeSpeed(s)}
//                       className={`px-3 py-1 rounded hover:bg-[#5491CA]/30 ${s === playbackSpeed ? 'bg-[#5491CA]/30' : ''}`}
//                     >
//                       {s}x
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>
//             {/* Fullscreen */}
//             <button onClick={toggleFullscreen}>
//               {isFullscreen ? <FaCompress size={18} /> : <FaExpand size={18} />}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VideoPlayer;










import React, { useState, useRef, useEffect } from 'react';
import {
  FaPlay, FaPause, FaForward, FaBackward,
  FaExpand, FaCompress, FaCog, FaVolumeUp, FaVolumeMute, FaArrowLeft,
  FaClosedCaptioning
} from 'react-icons/fa';

const speeds = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

const VideoPlayer = ({ videoUrl, onBack }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);
  const progressRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showSpeedOptions, setShowSpeedOptions] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);

  // Check if mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Video event listeners
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateDuration = () => setDuration(video.duration);
    const updateCurrentTime = () => setCurrentTime(video.currentTime);
    const handleEnded = () => setIsPlaying(false);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    
    video.addEventListener('loadedmetadata', updateDuration);
    video.addEventListener('timeupdate', updateCurrentTime);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('loadedmetadata', updateDuration);
      video.removeEventListener('timeupdate', updateCurrentTime);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, []);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      const video = videoRef.current;
      if (!video) return;
      
      // Don't trigger keyboard shortcuts when user is typing in an input
      if (e.target.tagName === 'INPUT') return;
      
      switch (e.key.toLowerCase()) {
        case ' ':
          e.preventDefault();
          togglePlay();
          break;
        case 'k':
          togglePlay();
          break;
        case 'm':
          toggleMute();
          break;
        case 'f':
          toggleFullscreen();
          break;
        case 'arrowright':
          e.preventDefault();
          skip(5);
          showControlsTemporarily();
          break;
        case 'arrowleft':
          e.preventDefault();
          skip(-5);
          showControlsTemporarily();
          break;
        case 'arrowup':
          e.preventDefault();
          if (volume < 1) {
            const newVolume = Math.min(1, volume + 0.1);
            setVolume(newVolume);
            video.volume = newVolume;
            setIsMuted(false);
          }
          showControlsTemporarily();
          break;
        case 'arrowdown':
          e.preventDefault();
          if (volume > 0) {
            const newVolume = Math.max(0, volume - 0.1);
            setVolume(newVolume);
            video.volume = newVolume;
            setIsMuted(newVolume === 0);
          }
          showControlsTemporarily();
          break;
        case '>':
          changeSpeed(Math.min(2, playbackSpeed + 0.25));
          showControlsTemporarily();
          break;
        case '<':
          changeSpeed(Math.max(0.25, playbackSpeed - 0.25));
          showControlsTemporarily();
          break;
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
          // Jump to percentage of video
          const percent = parseInt(e.key) * 10;
          video.currentTime = (percent / 100) * duration;
          showControlsTemporarily();
          break;
        case '?':
          setShowKeyboardShortcuts(prev => !prev);
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [volume, playbackSpeed, duration]);

  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Auto-hide controls
  useEffect(() => {
    const hideControls = () => {
      if (!videoRef.current?.paused && !isDragging) {
        setShowControls(false);
      }
    };
    
    if (showControls) {
      clearTimeout(controlsTimeoutRef.current);
      controlsTimeoutRef.current = setTimeout(hideControls, 3000);
    }
    
    return () => clearTimeout(controlsTimeoutRef.current);
  }, [showControls, isDragging]);

  const showControlsTemporarily = () => {
    setShowControls(true);
    clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (!videoRef.current?.paused && !isDragging) {
        setShowControls(false);
      }
    }, 3000);
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
    showControlsTemporarily();
  };

  const skip = (sec) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime += sec;
  };

  const handleVolume = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    videoRef.current.volume = val;
    setIsMuted(val === 0);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    
    if (isMuted) {
      videoRef.current.volume = volume || 1;
      setIsMuted(false);
    } else {
      videoRef.current.volume = 0;
      setIsMuted(true);
    }
    showControlsTemporarily();
  };

  const toggleFullscreen = () => {
    if (!playerRef.current) return;
    
    if (!document.fullscreenElement) {
      playerRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    showControlsTemporarily();
  };

  const changeSpeed = (speed) => {
    if (!videoRef.current) return;
    
    videoRef.current.playbackRate = speed;
    setPlaybackSpeed(speed);
    setShowSpeedOptions(false);
    showControlsTemporarily();
  };

  const handleProgressClick = (e) => {
    if (!progressRef.current || !videoRef.current) return;
    
    const rect = progressRef.current.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = percent * duration;
  };

  const handleProgressTouchMove = (e) => {
    if (!progressRef.current || !videoRef.current || !e.touches[0]) return;
    
    const rect = progressRef.current.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (e.touches[0].clientX - rect.left) / rect.width));
    videoRef.current.currentTime = percent * duration;
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const mins = (minutes % 60).toString().padStart(2, '0');
      return `${hours}:${mins}:${seconds}`;
    }
    
    return `${minutes}:${seconds}`;
  };

  return (
    <div
      ref={playerRef}
      className="relative rounded-lg overflow-hidden bg-black w-full aspect-video touch-manipulation"
      onMouseMove={showControlsTemporarily}
      onMouseEnter={() => setShowControls(true)}
      onTouchStart={showControlsTemporarily}
      tabIndex="0"
    >
      {/* Video */}
      <video
        ref={videoRef}
        className="w-full h-full cursor-pointer"
        onClick={togglePlay}
        src={videoUrl}
        playsInline
      />

      {/* Play/Pause overlay (for mobile tap) */}
      {isMobile && (
        <div 
          className="absolute inset-0 flex items-center justify-center"
          onClick={togglePlay}
        >
          {isPlaying ? null : (
            <div className="bg-black/40 rounded-full p-4">
              <FaPlay className="text-white" size={32} />
            </div>
          )}
        </div>
      )}

      {/* Controls */}
      <div 
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-2 sm:px-4 py-2 sm:py-3 transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Progress Bar */}
        <div 
          ref={progressRef}
          className="w-full h-2 bg-gray-400/50 rounded-full mb-2 sm:mb-4 cursor-pointer group relative"
          onClick={handleProgressClick}
          onTouchMove={handleProgressTouchMove}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => isDragging && setIsDragging(false)}
        >
          <div
            className="h-full bg-blue-500 rounded-full relative"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full transform scale-0 group-hover:scale-100 transition-transform" />
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="flex flex-wrap justify-between items-center text-white text-xs sm:text-sm gap-2">
          {/* Left Controls */}
          <div className="flex items-center gap-1 sm:gap-3">
            <button 
              onClick={togglePlay}
              className="hover:text-blue-400 transition-colors p-1"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <FaPause size={isMobile ? 16 : 18} /> : <FaPlay size={isMobile ? 16 : 18} />}
            </button>
            
            <button 
              onClick={() => skip(-10)}
              className="hover:text-blue-400 transition-colors p-1 hidden xs:block"
              aria-label="Rewind 10 seconds"
            >
              <FaBackward size={isMobile ? 16 : 18} />
            </button>
            
            <button 
              onClick={() => skip(10)}
              className="hover:text-blue-400 transition-colors p-1 hidden xs:block"
              aria-label="Forward 10 seconds"
            >
              <FaForward size={isMobile ? 16 : 18} />
            </button>
            
            <button 
              onClick={toggleMute}
              className="hover:text-blue-400 transition-colors p-1"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <FaVolumeMute size={isMobile ? 16 : 18} /> : <FaVolumeUp size={isMobile ? 16 : 18} />}
            </button>
            
            <div className="hidden sm:block relative group">
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolume}
                className="w-12 sm:w-20 accent-blue-500"
                aria-label="Volume"
              />
            </div>
            
            <div className="text-xs sm:text-sm whitespace-nowrap">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-1 sm:gap-3">
            {/* Speed */}
            <div className="relative">
              <button 
                onClick={() => setShowSpeedOptions(!showSpeedOptions)} 
                className="hover:text-blue-400 transition-colors p-1 flex items-center gap-1"
                aria-label="Playback speed"
              >
                <span className="hidden sm:inline">{playbackSpeed}x</span>
                <FaCog size={isMobile ? 16 : 18} className="sm:hidden" />
              </button>
              
              {showSpeedOptions && (
                <div className="absolute bottom-full right-0 mb-2 bg-black/90 p-2 rounded-lg shadow-md flex flex-col gap-1 z-10">
                  {speeds.map((s) => (
                    <button
                      key={s}
                      onClick={() => changeSpeed(s)}
                      className={`px-3 py-1 rounded hover:bg-blue-500/30 ${s === playbackSpeed ? 'bg-blue-500/30' : ''}`}
                    >
                      {s}x
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Fullscreen */}
            <button 
              onClick={toggleFullscreen}
              className="hover:text-blue-400 transition-colors p-1"
              aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              {isFullscreen ? <FaCompress size={isMobile ? 16 : 18} /> : <FaExpand size={isMobile ? 16 : 18} />}
            </button>
            
            {/* Keyboard shortcuts info button */}
            <button 
              onClick={() => setShowKeyboardShortcuts(prev => !prev)}
              className="hover:text-blue-400 transition-colors p-1 hidden sm:block"
              aria-label="Keyboard shortcuts"
            >
              <span className="text-xs border border-white/50 rounded px-1">?</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile tap instruction (shows only once) */}
      {isMobile && (
        <div className="absolute top-2 left-0 right-0 flex justify-center pointer-events-none">
          <div className="bg-black/70 text-white text-xs px-3 py-1 rounded-full">
            Tap to play/pause, double-tap to skip
          </div>
        </div>
      )}
      
      {/* Keyboard shortcuts overlay */}
      {showKeyboardShortcuts && (
        <div className="absolute inset-0 bg-black/90 z-20 flex items-center justify-center overflow-auto">
          <div className="max-w-lg w-full bg-gray-800 rounded-lg p-4 sm:p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">Keyboard Shortcuts</h3>
              <button 
                onClick={() => setShowKeyboardShortcuts(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
              <div className="flex items-center">
                <kbd className="px-2 py-1 bg-gray-700 rounded text-white mr-2">Space</kbd>
                <span className="text-gray-300">Play/Pause</span>
              </div>
              <div className="flex items-center">
                <kbd className="px-2 py-1 bg-gray-700 rounded text-white mr-2">K</kbd>
                <span className="text-gray-300">Play/Pause</span>
              </div>
              <div className="flex items-center">
                <kbd className="px-2 py-1 bg-gray-700 rounded text-white mr-2">M</kbd>
                <span className="text-gray-300">Mute/Unmute</span>
              </div>
              <div className="flex items-center">
                <kbd className="px-2 py-1 bg-gray-700 rounded text-white mr-2">F</kbd>
                <span className="text-gray-300">Fullscreen</span>
              </div>
              <div className="flex items-center">
                <kbd className="px-2 py-1 bg-gray-700 rounded text-white mr-2">←</kbd>
                <span className="text-gray-300">Rewind 5 seconds</span>
              </div>
              <div className="flex items-center">
                <kbd className="px-2 py-1 bg-gray-700 rounded text-white mr-2">→</kbd>
                <span className="text-gray-300">Forward 5 seconds</span>
              </div>
              <div className="flex items-center">
                <kbd className="px-2 py-1 bg-gray-700 rounded text-white mr-2">↑</kbd>
                <span className="text-gray-300">Volume up</span>
              </div>
              <div className="flex items-center">
                <kbd className="px-2 py-1 bg-gray-700 rounded text-white mr-2">↓</kbd>
                <span className="text-gray-300">Volume down</span>
              </div>
              <div className="flex items-center">
                <kbd className="px-2 py-1 bg-gray-700 rounded text-white mr-2">&lt;</kbd>
                <span className="text-gray-300">Decrease speed</span>
              </div>
              <div className="flex items-center">
                <kbd className="px-2 py-1 bg-gray-700 rounded text-white mr-2">&gt;</kbd>
                <span className="text-gray-300">Increase speed</span>
              </div>
              <div className="flex items-center">
                <kbd className="px-2 py-1 bg-gray-700 rounded text-white mr-2">0-9</kbd>
                <span className="text-gray-300">Jump to percentage</span>
              </div>
              <div className="flex items-center">
                <kbd className="px-2 py-1 bg-gray-700 rounded text-white mr-2">?</kbd>
                <span className="text-gray-300">Show keyboard shortcuts</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
