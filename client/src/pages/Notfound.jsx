import React, { useEffect, useState } from 'react';
import { FileQuestion, Compass, MapPin, RotateCcw, ChevronRight } from 'lucide-react';

const AnimatedNotFoundPage = () => {
  const [animationStage, setAnimationStage] = useState(0);
  
  useEffect(() => {
    // Sequence the animations
    const timer1 = setTimeout(() => setAnimationStage(1), 500);
    const timer2 = setTimeout(() => setAnimationStage(2), 1300);
    const timer3 = setTimeout(() => setAnimationStage(3), 2100);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-indigo-200 opacity-20 animate-pulse"
            style={{
              width: `${Math.random() * 200 + 50}px`,
              height: `${Math.random() * 200 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 5}s`,
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 max-w-lg w-full text-center">
        {/* Animated 404 */}
        <div className="relative mb-8">
          <div className={`text-8xl font-bold text-indigo-600 transition-all duration-1000 transform ${animationStage >= 1 ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}>
            404
          </div>
          
          {/* Animated compass */}
          <div className={`absolute -right-4 -top-4 transform transition-all duration-1000 ${animationStage >= 2 ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
            <div className="animate-spin-slow">
              <Compass size={64} className="text-indigo-500" />
            </div>
          </div>
          
          {/* Animated map pin */}
          <div className={`absolute -left-4 -bottom-4 transform transition-all duration-1000 ${animationStage >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="animate-bounce">
              <MapPin size={48} className="text-red-500" />
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className={`transition-all duration-1000 delay-300 transform ${animationStage >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Page Not Found</h1>
          
          <p className="text-gray-600 mb-8">
            The page you're looking for seems to have wandered off the map. 
            Let's help you find your way back.
          </p>
          
          {/* Animated floating file icon */}
          <div className="relative h-40 mb-8">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-float">
                <FileQuestion size={96} className="text-indigo-400" />
              </div>
            </div>
          </div>
          
          {/* Action buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-500 transform ${animationStage >= 3 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
           
            
            <button className="px-6 py-3 border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors duration-300 flex items-center justify-center gap-2 group" onClick={() => window.history.back()}>
              <span>Go Home</span>
              <ChevronRight size={20} className="transition-transform group-hover:translate-x-1 duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add this to your global CSS or in a style tag
const styleTag = document.createElement('style');
styleTag.textContent = `
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
    100% { transform: translateY(0px); }
  }
  
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  
  .animate-spin-slow {
    animation: spin-slow 8s linear infinite;
  }
`;
document.head.appendChild(styleTag);

export default AnimatedNotFoundPage;