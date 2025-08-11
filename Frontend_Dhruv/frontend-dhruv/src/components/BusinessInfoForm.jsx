// components/BusinessInfoForm.jsx
import React, { useState } from 'react';

const BusinessInfoForm = ({ user, isEditing, onSave }) => {
  const [formData, setFormData] = useState({
    businessName: user?.businessName || 'Elite Sports Complex',
    businessType: user?.businessType || 'Sports Facility',
    taxId: user?.taxId || 'XX-XXXXXXX',
    businessLicense: user?.businessLicense || 'BL-2023-001'
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSave(formData);
    } catch (error) {
      console.error('Error saving business info:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
      <h3 className="text-lg font-bold mb-4">Business Information</h3>
      
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Business Type</label>
              <select
                name="businessType"
                value={formData.businessType}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="Sports Facility">Sports Facility</option>
                <option value="Fitness Center">Fitness Center</option>
                <option value="Recreation Center">Recreation Center</option>
                <option value="Sports Club">Sports Club</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tax ID</label>
              <input
                type="text"
                name="taxId"
                value={formData.taxId}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="XX-XXXXXXX"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Business License</label>
              <input
                type="text"
                name="businessLicense"
                value={formData.businessLicense}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="BL-2023-001"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Business Name</p>
              <p className="font-medium">{formData.businessName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Business Type</p>
              <p className="font-medium">{formData.businessType}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Tax ID</p>
              <p className="font-medium">{formData.taxId}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Business License</p>
              <p className="font-medium">{formData.businessLicense}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessInfoForm;
