import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from "../../api/axiosInstance";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import logo from "../../../../client/public/aigiri logo.png";
import "./login.css";

function ForgotPasswordPage() {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    axiosInstance.post('/auth/forget-password', { email })
    .then((res) => {
      setStep(2);
      setMessage(res.data.message);
      setIsSubmitting(false);
    })
    .catch((err) => {
      setIsError(true);
      setMessage(err.response?.data.error|| 'An error occurred. Please try again.');
      setIsSubmitting(false);
    });
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    axiosInstance.post('/auth/check-otp', { email, otp, newPassword })
    .then((res) => {
      setStep(2);
      setMessage(res.data.message);
      setIsSubmitting(false);
    })
    .catch((err) => {
      setIsError(true);
      setMessage(err.response?.data.error|| 'An error occurred. Please try again.');
      setIsSubmitting(false);
    });
  };

  return (
    <div className="auth-page-container">
      <header className="auth-header">
              <img className="h-11 w-auto" src={logo} alt="logo" onClick={() => navigate("/")} style={{ cursor: "pointer" }} />
                    <span className="text-4xl font-bold tracking-wide text-[#7670AC] relative top-[1px] font-poppins">
                      IGIRI
                    </span>
            </header>

      <div className="auth-container">
        <div className="auth-box">
          <h2 className="auth-title">{step === 1 ? 'Reset Your Password' : 'Verify OTP'}</h2>

          {message && <p className={`message ${isError ? 'error-message' : 'success-message'}`}>{message}</p>}

          {step === 1 && (
            <form onSubmit={handleSendOtp} className="auth-form">
              <div className="input-group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <label>Email</label>
              </div>

              <button type="submit" className="auth-button" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send OTP"}
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleVerifyOtp} className="auth-form">
              <div className="input-group">
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
                <label>OTP</label>
              </div>

              <div className="input-group password-group">
                <input
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <label>New Password</label>
                <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <button type="submit" className="auth-button" disabled={isSubmitting}>
                {isSubmitting ? "Verifying..." : "Verify OTP & Reset"}
              </button>
            </form>
          )}

          <div className="switch-auth">
            <span>
              Remember your password? <button onClick={() => navigate('/login')}>Login here</button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;