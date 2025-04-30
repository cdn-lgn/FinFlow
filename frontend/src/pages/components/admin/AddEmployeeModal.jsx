import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../../../context/ThemeContext';
import { FaTimes, FaCamera } from 'react-icons/fa';
import axiosClient from '../../../utils/axiosClient';
import LoadingButton from '../../../components/LoadingButton';

const AddEmployeeModal = ({ isOpen, onClose, onSuccess }) => {
  const { colors } = useContext(ThemeContext);
  const initialFormState = {
    fullName: '',
    fatherName: '',
    email: '',
    mobile: '',
    password: '',
    dob: '',
    pan: '',
    addressLine: '',
    city: '',
    pincode: '',
    country: 'India'
  };

  const [formData, setFormData] = useState(initialFormState);
  const [userFace, setUserFace] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCapture = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserFace(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    setError('');
    setIsLoading(true);

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });

      if (userFace) {
        formDataToSend.append('image', userFace);
      }

      const response = await axiosClient.post('/admin/employees/add', formDataToSend);
      if (response.data.success) {
        // Reset form
        setFormData(initialFormState);
        setUserFace(null);
        setPreviewUrl(null);
        onSuccess?.();
        onClose();
      }
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to add employee');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-3xl p-6 rounded-xl relative max-h-[90vh] overflow-y-auto"
        style={{ backgroundColor: colors.card }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2"
          style={{ color: colors.text }}
        >
          <FaTimes />
        </button>

        <h3 className="text-xl font-semibold mb-6" style={{ color: colors.primaryDark }}>
          Add New Employee
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Photo Upload */}
          <div className="md:col-span-2 flex items-center gap-4">
            <div className="w-32 h-32 rounded-lg overflow-hidden relative"
                 style={{ backgroundColor: colors.background }}>
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <FaCamera size={24} style={{ color: colors.text + '80' }} />
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleCapture}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
            <div className="text-sm" style={{ color: colors.text + '80' }}>
              Click to upload employee photo
            </div>
          </div>

          {/* Personal Info */}
          <input
            placeholder="Full Name"
            value={formData.fullName}
            onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
            className="p-3 rounded-lg"
            style={{ backgroundColor: colors.background, color: colors.text }}
          />
          <input
            placeholder="Father's Name"
            value={formData.fatherName}
            onChange={(e) => setFormData(prev => ({ ...prev, fatherName: e.target.value }))}
            className="p-3 rounded-lg"
            style={{ backgroundColor: colors.background, color: colors.text }}
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className="p-3 rounded-lg"
            style={{ backgroundColor: colors.background, color: colors.text }}
          />
          <input
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={(e) => setFormData(prev => ({ ...prev, mobile: e.target.value.replace(/\D/g, '').slice(0, 10) }))}
            className="p-3 rounded-lg"
            style={{ backgroundColor: colors.background, color: colors.text }}
          />
          <input
            type="date"
            value={formData.dob}
            onChange={(e) => setFormData(prev => ({ ...prev, dob: e.target.value }))}
            className="p-3 rounded-lg"
            style={{ backgroundColor: colors.background, color: colors.text }}
          />
          <input
            placeholder="PAN Number"
            value={formData.pan}
            onChange={(e) => setFormData(prev => ({ ...prev, pan: e.target.value }))}
            className="p-3 rounded-lg"
            style={{ backgroundColor: colors.background, color: colors.text }}
          />
          <input
            placeholder="Password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
            className="p-3 rounded-lg"
            style={{ backgroundColor: colors.background, color: colors.text }}
          />

          {/* Address */}
          <input
            placeholder="Address Line"
            value={formData.addressLine}
            onChange={(e) => setFormData(prev => ({ ...prev, addressLine: e.target.value }))}
            className="p-3 rounded-lg"
            style={{ backgroundColor: colors.background, color: colors.text }}
          />
          <input
            placeholder="City"
            value={formData.city}
            onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
            className="p-3 rounded-lg"
            style={{ backgroundColor: colors.background, color: colors.text }}
          />
          <input
            placeholder="Pincode"
            value={formData.pincode}
            onChange={(e) => setFormData(prev => ({ ...prev, pincode: e.target.value.replace(/\D/g, '').slice(0, 6) }))}
            className="p-3 rounded-lg"
            style={{ backgroundColor: colors.background, color: colors.text }}
          />
          <input
            value="India"
            disabled
            className="p-3 rounded-lg opacity-50"
            style={{ backgroundColor: colors.background, color: colors.text }}
          />
        </div>

        {error && (
          <p className="mt-4 text-sm" style={{ color: colors.danger }}>{error}</p>
        )}

        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg"
            style={{ backgroundColor: colors.danger + '20', color: colors.danger }}
          >
            Cancel
          </button>
          <LoadingButton
            onClick={handleSubmit}
            isLoading={isLoading}
            className="px-4 py-2 rounded-lg text-white"
            style={{ backgroundColor: colors.primary }}
          >
            Add Employee
          </LoadingButton>
        </div>
      </motion.div>
    </div>
  );
};

export default AddEmployeeModal;
