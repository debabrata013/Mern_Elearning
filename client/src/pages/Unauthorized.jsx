// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const Unauthorized = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="text-center">
//         <h1 className="text-4xl font-bold text-red-600 mb-4">Unauthorized Access</h1>
//         <p className="text-gray-600 mb-4">You don't have permission to access this page.</p>
//         <button 
//           onClick={() => navigate('/')}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Go to Home
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Unauthorized;
import React from 'react';
import { Lock, HomeIcon, AlertCircle } from 'lucide-react';

const Unauthorized = () => {
  const handleNavigateHome = () => {
    console.log('Navigating to home');
    // Navigation logic would go here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-lg w-full mx-4">
        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
          {/* Icon and Alert Section */}
          <div className="relative flex justify-center">
            <div className="absolute -top-16">
              <div className="bg-red-100 rounded-full p-4">
                <div className="bg-red-200 rounded-full p-4">
                  <Lock className="h-12 w-12 text-red-500 animate-pulse" />
                </div>
              </div>
            </div>
          </div>

          {/* Warning Icon */}
          <div className="pt-8 flex justify-center">
            <AlertCircle className="h-16 w-16 text-red-500 animate-bounce" />
          </div>

          {/* Text Content */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-gray-900">
              Access Denied
            </h1>
            <div className="space-y-2">
              <p className="text-xl text-red-500 font-semibold">
                401 Unauthorized
              </p>
              <p className="text-gray-600">
                Oops! It seems you don't have the necessary permissions to access this page.
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-white text-sm text-gray-500">
                Please verify your credentials
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <button
              onClick={handleNavigateHome}
              className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transform transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <HomeIcon className="h-5 w-5" />
              <span>Return to Home</span>
            </button>
            
            <button
              onClick={() => console.log('Contact support')}
              className="w-full bg-gray-50 text-gray-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
            >
              Contact Support
            </button>
          </div>

          {/* Error Details */}
          <div className="text-center text-sm text-gray-500">
            <p>Error Code: UAC_401</p>
            <p>Session ID: {Math.random().toString(36).substr(2, 9)}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>
            If you believe this is a mistake, please contact your system administrator
          </p>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;