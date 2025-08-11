// components/OTPVerification.jsx - NEW component
import React, { useState, useEffect } from 'react';
import { authAPI } from '../utils/api';

const OTPVerification = ({ email, onVerificationSuccess, onClose }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleOTPChange = (index, value) => {
    if (value.length > 1) return; // Only allow single digit
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleVerifyOTP = async () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      setError('Please enter complete 6-digit OTP');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await authAPI.verifyOTP(email, otpString);
      
      if (result.success) {
        // OTP verified successfully
        onVerificationSuccess(result.data);
      } else {
        setError(result.error || 'Invalid OTP. Please try again.');
      }
    } catch (error) {
      setError('Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setLoading(true);
    setError('');

    try {
      const result = await authAPI.sendOTP(email);
      
      if (result.success) {
        setTimer(60);
        setCanResend(false);
        setOtp(['', '', '', '', '', '']);
      } else {
        setError(result.error || 'Failed to resend OTP');
      }
    } catch (error) {
      setError('Failed to resend OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📧</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Verify Your Email</h2>
          <p className="text-gray-600 text-sm">
            We've sent a 6-digit verification code to
          </p>
          <p className="font-medium text-green-600">{email}</p>
        </div>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* OTP Input Fields */}
        <div className="flex justify-center gap-3 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleOTPChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
              disabled={loading}
            />
          ))}
        </div>

        {/* Verify Button */}
        <button
          onClick={handleVerifyOTP}
          disabled={loading || otp.join('').length !== 6}
          className="w-full bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white font-medium py-3 px-4 rounded-lg transition-colors mb-4"
        >
          {loading ? 'Verifying...' : 'Verify OTP'}
        </button>

        {/* Resend OTP */}
        <div className="text-center">
          {canResend ? (
            <button
              onClick={handleResendOTP}
              disabled={loading}
              className="text-green-500 hover:text-green-600 text-sm font-medium"
            >
              Resend OTP
            </button>
          ) : (
            <p className="text-gray-500 text-sm">
              Resend OTP in {timer} seconds
            </p>
          )}
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default OTPVerification;
