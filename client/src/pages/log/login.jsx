import React, { useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { FaGithub, FaEye, FaEyeSlash } from "react-icons/fa"; // Icons
import logo from "../../../../client/public/aigiri logo.png"; // Replace with your actual logo path
import dot from "./images/dots.png";
import img from "./images/img.png"; // Your image
import "./login.css"; // Updated CSS

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSwitchAuthMode = () => {
    setIsLogin(!isLogin);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || (!isLogin && !userName)) {
      setError("Please fill all required fields.");
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const userData = { email, password };
    if (!isLogin) userData.userName = userName;

    setLoading(true);
    try {
      let response;
      if (isLogin) {
        response = await axiosInstance.post("/auth/login", userData);
      } else {
        response = await axiosInstance.post("/students/", userData);
      }

      if (response.data.success) {
        if (rememberMe) {
          localStorage.setItem("accessToken", response.data.accessToken);
        } else {
          sessionStorage.setItem("accessToken", response.data.accessToken);
        }

        const role = response.data.userData.role;
        navigate(
          role === "student"
            ? "/user-dashboard"
            : role === "teacher"
            ? "/teacher-dashboard"
            : "/admin-dashboard"
        );

        alert(isLogin ? "Login successful!" : "Registration successful!");
      }
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  // GitHub Login Handler
  const handleGitHubLogin = () => {
    window.location.href = "http://localhost:5000/auth/github"; // Backend API for GitHub OAuth
  };

  return (
    <div className="auth-page-container">
      <header className="auth-header">
  <img src={logo} alt="AIGIRI Logo" className="auth-logo" />
  <h1 className="auth-name">AIGIRI</h1>
</header>

      {/* Left Side - Login/Signup Box */}
      <div className="auth-container">
        <div className="auth-box">
          <h2 className="auth-title">
            {isLogin ? "Login to Your Account" : "Create an Account"}
          </h2>

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="input-group">
                <input
                  id="name"
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
                <label htmlFor="name">Full Name</label>
              </div>
            )}

            <div className="input-group">
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="email">Email</label>
            </div>

            <div className="input-group password-group">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label htmlFor="password">Password</label>
              <span
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {!isLogin && (
              <div className="input-group">
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <label htmlFor="confirmPassword">Confirm Password</label>
              </div>
              
            )}

            {isLogin && (
              <div className="remember-me">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <label htmlFor="rememberMe">Remember Me</label>
              </div>
            )}

            {error && <p className="error-message">{error}</p>}

            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? "Loading..." : isLogin ? "Login" : "Create Account"}
            </button>
          </form>

          {loading && <div className="loading-spinner"></div>}
          <div class="or-divider">or</div>


          <button className="github-login" onClick={handleGitHubLogin}>
            <FaGithub className="github-icon" /> Login with GitHub
          </button>

          <div className="switch-auth">
            {isLogin ? (
              <span>
                Don't have an account?{" "}
                <button onClick={handleSwitchAuthMode}>Create one</button>
              </span>
            ) : (
              <span>
                Already have an account?{" "}
                <button onClick={handleSwitchAuthMode}>Login here</button>
              </span>
              
            )}
            {isLogin && (
            <div className="forgot-password">
              <a href="/forgot-password">Forgot Password?</a>
            </div>
          )}
          </div>
        </div>
      </div>

      {/* Right-Side Image Section */}
      <div className="image-section">
        <img src={img} alt="Auth Illustration" />
      </div>
    </div>
  );
}

export default AuthPage;
