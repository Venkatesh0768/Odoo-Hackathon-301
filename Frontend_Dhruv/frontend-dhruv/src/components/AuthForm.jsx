// components/AuthForm.jsx - UPDATE with OTP integration
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import OTPVerification from './OTPVerification';

const AuthForm = ({ mode = 'login' }) => {
  const [isLogin, setIsLogin] = useState(mode === 'login');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    role: 'USER'
  });
  
  const { 
    login, 
    signup, 
    loading, 
    error, 
    showOTPVerification, 
    pendingEmail,
    verifyOTPAndAuthenticate,
    closeOTPVerification 
  } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let result;
    if (isLogin) {
      result = await login({
        email: formData.email,
        password: formData.password
      });
      
      // Don't redirect here - wait for OTP verification
      if (result.success && !result.requiresOTP) {
        // Direct login without OTP (shouldn't happen in your flow)
        redirectUser(formData.role);
      }
    } else {
      result = await signup(formData);
      
      if (result.success && result.shouldRedirectToLogin) {
        // Redirect to login after successful registration
        setIsLogin(true);
        setFormData(prev => ({ ...prev, password: '' })); // Clear password
      }
    }
  };

  const handleOTPVerificationSuccess = async (otpData) => {
    const result = await verifyOTPAndAuthenticate(otpData);
    
    if (result.success) {
      // Redirect based on user role from token
      const userRole = otpData.user?.role || formData.role;
      redirectUser(userRole);
    }
  };

  const redirectUser = (userRole) => {
    if (userRole === 'OWNER') {
      navigate('/owner/dashboard');
    } else {
      navigate('/');
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
              <span className="text-green-500">QuickCourt</span>
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              {isLogin ? 'Sign in to your account' : 'Create your account'}
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8">
            {error && (
              <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      required
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Account Type
                    </label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="USER">User (Book Venues)</option>
                      <option value="OWNER">Facility Owner</option>
                      <option value="ADMIN">Admin</option>
                    </select>
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  minLength={6}
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white font-medium py-3 px-4 rounded-lg transition-colors"
              >
                {loading ? 'Loading...' : (isLogin ? 'Sign In' : 'Create Account')}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-green-500 hover:text-green-600 text-sm"
              >
                {isLogin 
                  ? "Don't have an account? Sign up" 
                  : "Already have an account? Sign in"
                }
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* OTP Verification Modal */}
      {showOTPVerification && (
        <OTPVerification
          email={pendingEmail}
          onVerificationSuccess={handleOTPVerificationSuccess}
          onClose={closeOTPVerification}
        />
      )}
    </>
  );
};

export default AuthForm;
