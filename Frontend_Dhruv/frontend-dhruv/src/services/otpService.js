import React, { useState, useRef, useEffect } from "react";

// Mock API service for demonstration
const otpService = {
  sendOtp: async (email) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`OTP sent to ${email}`);
    return { success: true, message: "OTP sent successfully" };
  },
  
  verifyOtp: async (email, otp) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    // For demo, accept "123456" as valid OTP
    if (otp === "123456") {
      return { success: true, message: "OTP verified successfully" };
    }
    throw new Error("Invalid OTP. Use 123456 for demo.");
  }
};

// Password strength checker
function passwordStrength(password) {
  if (!password) return "";
  if (password.length < 6) return "Weak";
  if (password.match(/[A-Z]/) && password.match(/[0-9]/) && password.length >= 8) {
    return "Strong";
  }
  return "Medium";
}

// OTP Verification Component
const OtpVerification = ({ 
  email, 
  onVerificationSuccess, 
  onResendOtp, 
  isSignup, 
  onBack 
}) => {
  const OTP_LENGTH = 6;
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const [success, setSuccess] = useState("");
  const inputRefs = useRef([]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (e, idx) => {
    const val = e.target.value.replace(/[^0-9]/g, "");
    if (val.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[idx] = val;
    setOtp(newOtp);
    
    if (val && idx < OTP_LENGTH - 1) {
      inputRefs.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text").slice(0, OTP_LENGTH);
    if (/^\d{6}$/.test(paste)) {
      setOtp(paste.split(""));
      inputRefs.current[OTP_LENGTH - 1]?.focus();
    }
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    
    const otpCode = otp.join("");
    
    try {
      const result = await otpService.verifyOtp(email, otpCode);
      setLoading(false);
      setSuccess("OTP verified successfully!");
      setTimeout(() => onVerificationSuccess(result), 1000);
    } catch (err) {
      setLoading(false);
      setError(err.message || "OTP verification failed");
    }
  };

  const handleResend = async () => {
    setError("");
    setSuccess("");
    setLoading(true);
    
    try {
      await onResendOtp();
      setTimer(30);
      setLoading(false);
      setSuccess("OTP resent successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setLoading(false);
      setError("Failed to resend OTP");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <form 
        className="max-w-md w-full p-8 bg-white rounded-xl shadow-2xl border border-gray-100" 
        onSubmit={handleSubmit}
      >
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Verify Your Email</h2>
          <p className="text-gray-600">
            Enter the 6-digit code sent to{" "}
            <span className="font-semibold text-blue-600">{email}</span>
          </p>
        </div>

        <div className="flex justify-center gap-3 mb-6" onPaste={handlePaste}>
          {otp.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => (inputRefs.current[idx] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className="w-12 h-12 text-center text-xl font-semibold border-2 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              autoFocus={idx === 0}
              aria-label={`OTP digit ${idx + 1}`}
            />
          ))}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4">
            {success}
          </div>
        )}

        <button
          type="submit"
          disabled={loading || otp.some((d) => !d)}
          className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Verifying...
            </span>
          ) : (
            "Verify OTP"
          )}
        </button>

        <div className="flex justify-between items-center mt-6 text-sm">
          <button
            type="button"
            onClick={onBack}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            ← Back to {isSignup ? "Sign Up" : "Sign In"}
          </button>
          <button
            type="button"
            onClick={handleResend}
            disabled={timer > 0 || loading}
            className="text-blue-600 hover:text-blue-800 disabled:text-gray-400 transition-colors"
          >
            {timer > 0 ? `Resend OTP (${timer}s)` : "Resend OTP"}
          </button>
        </div>

        <div className="mt-6 text-xs text-center text-gray-500">
          <p>Demo: Use OTP "123456" for verification</p>
        </div>
      </form>
    </div>
  );
};
