import React, { useState } from 'react';
import axiosInstance from "../../api/axiosInstance"; // Assuming axiosInstance is set up to make requests
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';


function AuthPage() {
  const [isLogin, setIsLogin] = useState(true); // To toggle between login and signup
  const [email, setEmail] = useState(""); // Email input state
  const [password, setPassword] = useState(""); // Password input state
  const [userName, setUserName] = useState(""); // Full name (for registration)
  const [confirmPassword, setConfirmPassword] = useState(""); // Confirm password input state (for registration)
  const [error, setError] = useState(""); // To display error messages
  const [loading, setLoading] = useState(false); // To show loader during API call
  const { login } = useAuth();
  const navigate = useNavigate(); // Hook to programmatically navigate

  // Function to toggle between login and register forms
  const handleSwitchAuthMode = () => setIsLogin(!isLogin);

  // Handle form submission (login or register)
  const handleSubmit = async (e) => {
    e.preventDefault();
    // login({ username: userName, role: "student" });

    const userData = { email: email, password };
    login(userData);

    // For registration, add user name and confirm password
    if (!isLogin) {
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
      userData.userName = userName;
    }

    setLoading(true); // Start loading

    try {
      let response;
      if (isLogin) {
        // Login request
        response = await axiosInstance.post("/auth/login", userData);
      } else {
        // Register request
        response = await axiosInstance.post("/students/", userData);
      }
      console.log(response.data);

      // Handle successful response
      if (response.data.success) {
        // Store access token in sessionStorage
        sessionStorage.setItem("accessToken", JSON.stringify(response.data.accessToken));

        // Redirect based on role
        const role = response.data.userData.role;
        if (role === "student") {
          navigate("/user-dashboard");
        } else if (role === "teacher") {
          navigate("/teacher-dashboard");
        } else if (role === "admin") {
          navigate("/admin-dashboard");
        }

        alert(isLogin ? "Login successful!" : "Registration successful!");
      }

    } catch (error) {
      console.error("Authentication error", error);
      setError(error.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4"
      style={{
        backgroundImage: "url('https://i.pinimg.com/736x/18/f2/8a/18f28a899a0d384e14f8e8099a86d96a.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
      {/* Form container */}
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg">
        {/* Title */}
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          {isLogin ? 'Login to Your Account' : 'Create an Account'}
        </h2>

        {/* Auth form */}
        <form onSubmit={handleSubmit}>
          {/* Full Name (for registration) */}
          {!isLogin && (
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                id="name"
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your full name"
                className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Confirm Password (for registration) */}
          {!isLogin && (
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          {/* Display error if any */}
          {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

          {/* Submit button */}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-orange-500 text-white font-semibold rounded-md focus:outline-none hover:bg-blue-700 transition-colors"
            disabled={loading}
          >
            {loading ? 'Loading...' : (isLogin ? 'Login' : 'Create Account')}
          </button>
        </form>

        {/* Loading spinner (displayed when API call is in progress) */}
        {loading && (
          <div className="flex justify-center mt-4">
            <div className="w-8 h-8 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
          </div>
        )}

        {/* Forgot Password Link */}
        {isLogin && (
          <div className="text-center mt-4">
            <a href="/forgot-password" className="text-sm text-blue-600 hover:underline">
              Forgot Password?
            </a>
          </div>
        )}

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
