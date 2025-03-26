import React, { useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { FaGithub, FaEye, FaEyeSlash } from "react-icons/fa"; 
import logo from "../../../../client/public/aigiri logo.png"; 
import img from "./images/img.png";
import "./login.css"; 

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSwitchAuthMode = () => setIsLogin(!isLogin);

  const handleGitHubLogin = () => {
    console.log("GitHub login clicked");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password || (!isLogin && !userName)) {
      setError("Please fill all required fields.");
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const userData = { email, password, userName };
    setLoading(true);

    try {
      let response;
      if (isLogin) {
        response = await axiosInstance.post("/auth/login", userData);
      } else {
        response = await axiosInstance.post("/auth/signup", userData);
      }

      if (response.data.success) {
        sessionStorage.setItem("accessToken", JSON.stringify(response.data.accessToken));
        login(response.data.userData);
        console.log(response.data.userData);

        switch (response.data.userData.role) {
          case "student":
            navigate("/user-dashboard");
            break;
          case "teacher":
            navigate("/teacher-dashboard");
            break;
          case "admin":
            navigate("/admin-dashboard");
            break;
          default:
            navigate("/");
        }
      }
    } catch (error) {
      console.error("Authentication error", error);
      setError(error.response?.data?.error || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-container">
      <header className="auth-header">
        <img src={logo} alt="AIGIRI Logo" className="auth-logo" onClick={() => navigate("/")} style={{ cursor: "pointer" }} />
        <h1 className="auth-name" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>AIGIRI</h1>
      </header>

      <div className="auth-container">
        <div className="auth-box">
          <h2 className="auth-title">{isLogin ? "Login to Your Account" : "Create an Account"}</h2>

          <form onSubmit={handleSubmit} autoComplete="on">
            {!isLogin && (
              <div className="input-group">
                <input id="name" type="text" value={userName} onChange={(e) => setUserName(e.target.value)} required />
                <label htmlFor="name">Full Name</label>
              </div>
            )}

            <div className="input-group">
              <input id="email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
              <label htmlFor="email">Email</label>
            </div>

            <div className="input-group password-group">
              <input id="password" name="password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" />
              <label htmlFor="password">Password</label>
              <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {!isLogin && (
              <div className="input-group">
                <input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                <label htmlFor="confirmPassword">Confirm Password</label>
              </div>
            )}

            {error && <p className="error-message">{error}</p>}

            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? "Loading..." : isLogin ? "Login" : "Create Account"}
            </button>
          </form>

          {loading && <div className="loading-spinner"></div>}

          <div className="or-divider">or</div>

          <button className="github-login" onClick={handleGitHubLogin}>
            <FaGithub className="github-icon" /> Login with GitHub
          </button>

          <div className="switch-auth">
            {isLogin ? (
              <span>
                Don't have an account? <button onClick={handleSwitchAuthMode}>Create one</button>
              </span>
            ) : (
              <span>
                Already have an account? <button onClick={handleSwitchAuthMode}>Login here</button>
              </span>
            )}
            {isLogin && <div className="forgot-password"><a href="/forget">Forgot Password?</a></div>}
          </div>
        </div>
      </div>
      <div className="image-section">
        <img src={img} alt="Auth Illustration" />
      </div>
    </div>
  );
}

export default AuthPage;