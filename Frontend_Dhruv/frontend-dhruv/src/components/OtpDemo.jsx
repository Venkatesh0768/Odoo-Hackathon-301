import React, { useState } from "react";
import { otpService } from "../services/otpService";

const OtpDemo = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    if (!email) {
      setMessage("Please enter an email address");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      await otpService.sendOtp(email);
      setMessage("OTP sent successfully! Check your email.");
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!email || !otp) {
      setMessage("Please enter both email and OTP");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const result = await otpService.verifyOtp(email, otp);
      setMessage(`OTP verified successfully! Result: ${JSON.stringify(result)}`);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleValidateToken = async () => {
    const token = prompt("Enter token to validate:");
    if (!token) return;

    setLoading(true);
    setMessage("");

    try {
      const result = await otpService.validateToken(token);
      setMessage(`Token validated successfully! Result: ${JSON.stringify(result)}`);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleGetUsers = async () => {
    const token = prompt("Enter admin token:");
    if (!token) return;

    setLoading(true);
    setMessage("");

    try {
      const result = await otpService.getUsers(token);
      setMessage(`Users fetched successfully! Result: ${JSON.stringify(result)}`);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          OTP Service Demo
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Test OTP Functionality</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Send OTP Section */}
            <div className="space-y-4">
              <h3 className="font-medium text-gray-700">Send OTP</h3>
              <input
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <button
                onClick={handleSendOtp}
                disabled={loading}
                className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
              >
                {loading ? "Sending..." : "Send OTP"}
              </button>
            </div>

            {/* Verify OTP Section */}
            <div className="space-y-4">
              <h3 className="font-medium text-gray-700">Verify OTP</h3>
              <input
                type="text"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <button
                onClick={handleVerifyOtp}
                disabled={loading}
                className="w-full py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </div>
          </div>
        </div>

        {/* Additional API Tests */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Additional API Tests</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={handleValidateToken}
              className="py-2 px-4 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              Validate Token
            </button>
            
            <button
              onClick={handleGetUsers}
              className="py-2 px-4 bg-orange-600 text-white rounded hover:bg-orange-700"
            >
              Get Users (Admin)
            </button>
          </div>
        </div>

        {/* Message Display */}
        {message && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Response</h2>
            <div className="bg-gray-100 p-4 rounded">
              <pre className="whitespace-pre-wrap text-sm">{message}</pre>
            </div>
          </div>
        )}

        {/* API Documentation */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">API Endpoints</h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-center space-x-2">
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-mono">POST</span>
              <span className="font-mono">/api/v1/auth/otp/send</span>
              <span className="text-gray-600">- Request OTP for email</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-mono">POST</span>
              <span className="font-mono">/api/v1/auth/otp/verify</span>
              <span className="text-gray-600">- Verify OTP and authenticate</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-mono">POST</span>
              <span className="font-mono">/api/v1/auth/signup</span>
              <span className="text-gray-600">- User registration with validation</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-mono">POST</span>
              <span className="font-mono">/api/v1/auth/login</span>
              <span className="text-gray-600">- Traditional password login</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-mono">GET</span>
              <span className="font-mono">/api/v1/auth/validate</span>
              <span className="text-gray-600">- Token validation</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-mono">GET</span>
              <span className="font-mono">/api/v1/auth/users</span>
              <span className="text-gray-600">- Get all users (protected)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpDemo;
