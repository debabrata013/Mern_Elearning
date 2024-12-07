// import React, { useState } from 'react';

// function AuthPage() {
//   const [isLogin, setIsLogin] = useState(true); // To toggle between login and signup
//   const handleSwitchAuthMode = () => setIsLogin(!isLogin);

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4"
//     style={{
//       backgroundImage: "url('https://i.pinimg.com/736x/18/f2/8a/18f28a899a0d384e14f8e8099a86d96a.jpg')",
//       backgroundSize: 'cover',
//       backgroundPosition: 'center',
//     }}>
//       {/* Form container */}
//       <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg">
//         {/* Title */}
//         <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
//           {isLogin ? 'Login to Your Account' : 'Create an Account'}
//         </h2>

//         {/* Auth form */}
//         <form>
//           {!isLogin && (
//             <div className="mb-4">
//               <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
//               <input
//                 id="name"
//                 type="text"
//                 placeholder="Enter your full name"
//                 className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//           )}
//           <div className="mb-4">
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
//             <input
//               id="email"
//               type="email"
//               placeholder="Enter your email"
//               className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
//             <input
//               id="password"
//               type="password"
//               placeholder="Enter your password"
//               className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           {!isLogin && (
//             <div className="mb-4">
//               <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
//               <input
//                 id="confirmPassword"
//                 type="password"
//                 placeholder="Confirm your password"
//                 className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//           )}
//           <div className="flex items-center mb-6">
//             <input
//               id="rememberMe"
//               type="checkbox"
//               className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
//             />
//             <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-600">
//               Remember Me
//             </label>
//           </div>
//           <button
//             type="submit"
//             className="w-full py-3 px-4 bg-orange-500 text-white font-semibold rounded-md focus:outline-none hover:bg-blue-700 transition-colors"
//           >
//             {isLogin ? 'Login' : 'Create Account'}
//           </button>
//         </form>

//         {/* Forgot password */}
//         {isLogin && (
//           <div className="text-center mt-4">
//             <a href="logf" className="text-sm text-blue-600 hover:underline">
//               Forgot Password?
//             </a>
//           </div>
//         )}

//         {/* Social Login */}
//         <div className="mt-6 text-center space-y-4">
//           <p className="text-sm text-gray-600">Or continue with</p>
//           <div className="flex justify-center space-x-4">
//             <button className="w-1/2 py-2 px-4 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700">
//               Google
//             </button>
//             <button className="w-1/2 py-2 px-4 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-900">
//               GitHub
//             </button>
//           </div>
//         </div>

//         {/* Switch between Login and Sign-up */}
//         <div className="mt-6 text-center">
//           <p className="text-sm text-gray-600">
//             {isLogin ? (
//               <span>
//                 Don't have an account?{' '}
//                 <button
//                   onClick={handleSwitchAuthMode}
//                   className="text-blue-600 hover:underline"
//                 >
//                   Create one
//                 </button>
//               </span>
//             ) : (
//               <span>
//                 Already have an account?{' '}
//                 <button
//                   onClick={handleSwitchAuthMode}
//                   className="text-blue-600 hover:underline"
//                 >
//                   Login here
//                 </button>
//               </span>
//             )}
//           </p>
//         </div>
//       </div>

//       {/* Side section with abstract tech illustration */}
//       <div className="hidden lg:block lg:w-1/3 bg-blue-50 p-10 rounded-lg shadow-xl">
//         <div className="flex justify-center items-center space-x-4">
//           <span className="text-5xl text-blue-600">💻</span>
//           <span className="text-xl text-blue-800">Tech Hub</span>
//         </div>
//         <div className="mt-10">
//           <p className="text-gray-700 text-sm">
//             An easy way to access and manage your account. Your personal space to grow, innovate, and succeed.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AuthPage;

import React from 'react';

function AuthPage() {
  const [isLogin, setIsLogin] = React.useState(true); // To toggle between login and signup

  const handleSwitchAuthMode = () => setIsLogin(!isLogin);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4"
      style={{
        backgroundImage: "url('https://i.pinimg.com/736x/18/f2/8a/18f28a899a0d384e14f8e8099a86d96a.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          {isLogin ? 'Login to Your Account' : 'Create an Account'}
        </h2>

        <form>
          {!isLogin && (
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter your full name"
                className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {!isLogin && (
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-orange-500 text-white font-semibold rounded-md focus:outline-none hover:bg-blue-700 transition-colors"
          >
            {isLogin ? 'Login' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center space-y-4">
          <p className="text-sm text-gray-600">Or continue with</p>
          <div className="flex justify-center space-x-4">
            <a href="http://localhost:5000/auth/google" className="w-1/2 py-2 px-4 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700">
              Google
            </a>
            <a href="http://localhost:5000/auth/github" className="w-1/2 py-2 px-4 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-900">
              GitHub
            </a>
          </div>
        </div>

        {/* Switch between Login and Sign-up */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {isLogin ? (
              <span>
                Don't have an account?{' '}
                <button
                  onClick={handleSwitchAuthMode}
                  className="text-blue-600 hover:underline"
                >
                  Create one
                </button>
              </span>
            ) : (
              <span>
                Already have an account?{' '}
                <button
                  onClick={handleSwitchAuthMode}
                  className="text-blue-600 hover:underline"
                >
                  Login here
                </button>
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;

