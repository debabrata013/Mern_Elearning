import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import axiosInstance from "../../api/axiosInstance";
function ForgotPasswordPage() {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(false);
  const [loging,setLoging] = useState(false);

  const handleSendOtp = (e) => {
    e.preventDefault();
    setLoging(true);
    setIsSubmitting(true);
    axiosInstance.post('/auth/forget-password', { email })
    .then((res) => {
      setStep(2);
      setMessage(res.data.message);
      setIsSubmitting(false);
      setLoging(false);
    })
    .catch((err) => {
      setIsError(true);
      setMessage(err.response?.data.error|| 'An error occurred. Please try again.');
      setIsSubmitting(false);
      setLoging(false);
    });
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setLoging(true);
    setIsSubmitting(true);
    axiosInstance.post('/auth/check-otp', { email, otp, newPassword })
    .then((res) => {
      setStep(2);
      setMessage(res.data.message);
      setIsSubmitting(false);
      setLoging(false);
    })
    .catch((err) => {
      setIsError(true);
      setMessage(err.response?.data.error|| 'An error occurred. Please try again.');
      setIsSubmitting(false);
      setLoging(false);
    });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      {loging && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      )}
      <Card className="w-full max-w-md p-6 shadow-lg">
        <CardContent>
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
            {step === 1 ? 'Reset Your Password' : 'Verify OTP'}
          </h2>

          {message && <p className="text-center text-green-600 mb-4">{message}</p>}

          {step === 1 && (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="animate-spin" /> : 'Send OTP'}
              </Button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <Input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                required
              />
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                required
              />
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="animate-spin" /> : 'Verify OTP & Reset'}
              </Button>
            </form>
          )}

          <p className="text-sm text-center mt-4">
            Remember your password?{' '}
            <a href="/login" className="text-blue-600 hover:underline">
              Login here
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default ForgotPasswordPage;