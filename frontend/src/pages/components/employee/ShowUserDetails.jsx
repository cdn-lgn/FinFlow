import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import { ThemeContext } from '../../../context/ThemeContext';
import dayjs from 'dayjs';

const ShowUserDetails = ({ setUserPopup, selectedUser, setSelectedUser }) => {
  const { colors } = useContext(ThemeContext);

  const closePopup = () => {
    setUserPopup(false);
    setSelectedUser('');
  };

  if (!selectedUser) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: colors.backdrop }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="relative w-[95%] max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg shadow-lg p-6"
        style={{ backgroundColor: colors.card, color: colors.text }}
      >
        <button
          className="absolute top-3 right-3 hover:scale-125 transition-transform"
          onClick={closePopup}
          style={{ color: colors.icon }}
        >
          <FaTimes size={18} />
        </button>

        <h2 className="text-2xl font-semibold mb-4">
          User Details
        </h2>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0">
            <img
              src={selectedUser.photoUrl || 'https://via.placeholder.com/150'}
              alt={selectedUser.fullName}
              className="w-32 h-32 rounded-lg object-cover border-2"
              style={{ borderColor: colors.border }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm w-full">
            <Detail label="Full Name" value={selectedUser.fullName} />
            <Detail label="Father's Name" value={selectedUser.fatherName} />
            <Detail label="Email" value={selectedUser.email} />
            <Detail label="Phone" value={selectedUser.phoneNumber} />
            <Detail label="Date of Birth" value={dayjs(selectedUser.dob).format('DD MMM YYYY')} />
            <Detail label="PAN" value={selectedUser.pan} />
            <Detail label="Role" value={selectedUser.role} />
            <Detail
              label="Email & Mobile Verified"
              value={selectedUser.isEmailAndMobileVerified ? 'Yes' : 'No'}
              color={selectedUser.isEmailAndMobileVerified ? colors.success : colors.danger}
            />
            <Detail
              label="Verified"
              value={selectedUser.isVerified ? 'Yes' : 'No'}
              color={selectedUser.isVerified ? colors.success : colors.danger}
            />
            <Detail
              label="Created At"
              value={dayjs(selectedUser.createdAt).format('DD MMM YYYY, HH:mm')}
            />

            {/* Address Section */}
            <div className="col-span-full mt-4">
              <h3 className="font-semibold text-lg mb-2">
                Address
              </h3>
              <div className="space-y-1 text-sm" style={{ color: colors.subtext }}>
                <p>
                  <span style={{ color: colors.label }}>Line:</span> {selectedUser.address?.addressLine}
                </p>
                <p>
                  <span style={{ color: colors.label }}>City:</span> {selectedUser.address?.city}
                </p>
                <p>
                  <span style={{ color: colors.label }}>Pincode:</span> {selectedUser.address?.pincode}
                </p>
                <p>
                  <span style={{ color: colors.label }}>Country:</span> {selectedUser.address?.country}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Detail = ({ label, value, color }) => {
  const { colors } = useContext(ThemeContext);
  return (
    <div>
      <span style={{ color: colors.label }}>{label}:</span>
      <p className="text-base font-medium" style={{ color: color || colors.subtext }}>
        {value || 'N/A'}
      </p>
    </div>
  );
};

export default ShowUserDetails;
