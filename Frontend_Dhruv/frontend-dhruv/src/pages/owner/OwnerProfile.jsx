// pages/owner/OwnerProfile.jsx
import React, { useState, useEffect } from 'react';
import OwnerSidebar from '../../components/OwnerSidebar';
import ProfileHeader from '../../components/ProfileHeader';
import PersonalInfoForm from '../../components/PersonalInfoForm';
import BusinessInfoForm from '../../components/BusinessInfoForm';
import ContactInfoDisplay from '../../components/ContactInfoDisplay';
import AccountStats from '../../components/AccountStats';
import { profileAPI } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';

const OwnerProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const { user, login } = useAuth(); // Use login to update auth context with new user data

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setError('');
    setSuccess('');
  };

  const handlePersonalInfoSave = async (personalData) => {
    try {
      setLoading(true);
      setError('');
      
      // Update personal information via API
      const updatedUser = await profileAPI.updatePersonalInfo(user?.id || user?._id, personalData);
      
      // Update auth context with new user data
      await login({ email: personalData.email, skipPasswordCheck: true });
      
      setSuccess('Personal information updated successfully!');
      setIsEditing(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
      
      console.log('Personal info updated:', updatedUser);
    } catch (error) {
      console.error('Error updating personal info:', error);
      setError('Failed to update personal information');
    } finally {
      setLoading(false);
    }
  };

  const handleBusinessInfoSave = async (businessData) => {
    try {
      setLoading(true);
      setError('');
      
      // Update business information via API
      const updatedUser = await profileAPI.updateBusinessInfo(user?.id || user?._id, businessData);
      
      setSuccess('Business information updated successfully!');
      setIsEditing(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
      
      console.log('Business info updated:', updatedUser);
    } catch (error) {
      console.error('Error updating business info:', error);
      setError('Failed to update business information');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <OwnerSidebar />
      <div className="flex-1 ml-64 p-6">
        <ProfileHeader 
          user={user}
          onEditToggle={handleEditToggle}
          isEditing={isEditing}
        />
        
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}
        
        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg">
            {success}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            <PersonalInfoForm 
              user={user}
              isEditing={isEditing}
              onSave={handlePersonalInfoSave}
            />
            
            <BusinessInfoForm 
              user={user}
              isEditing={isEditing}
              onSave={handleBusinessInfoSave}
            />
          </div>
          
          {/* Sidebar Content - 1/3 width */}
          <div className="space-y-6">
            <ContactInfoDisplay user={user} />
            <AccountStats />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerProfile;
