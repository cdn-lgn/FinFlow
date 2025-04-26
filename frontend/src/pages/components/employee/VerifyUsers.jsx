import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../../../context/ThemeContext';
import axiosClient from '../../../utils/axiosClient';
import ShowUserDetails from './ShowUserDetails';

const VerifyUsers = () => {
  const { colors } = useContext(ThemeContext);
  const [usersForVerification, setUsersForVerification] = useState([]);
  const [userPopup, setUserPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState();

  const handleVerify = async (user) => {
    try {
      const response = await axiosClient.put("/user/verify", { email: user.email });
      console.log(response);
      if (response.status === 200 && response.data.isVerified) {
        setUsersForVerification((prevUsers) =>
          prevUsers.filter((u) => u.email !== response.data.email)
        );
        console.log('User verified and removed from pending list:', response.data);
      }
    } catch (error) {
      console.error('Verification error:', error);
    }
  };

  const handleView = (user) => {
    console.log('View details for user:', user);
    setUserPopup(true);
    setSelectedUser(user);
  };

  useEffect(() => {
    const fetchUsersForVerification = async () => {
      try {
        const response = await axiosClient.get('/users/verification');
        setUsersForVerification(response.data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsersForVerification();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex-grow p-6 w-full overflow-y-auto"
      style={{ backgroundColor: colors.background }}
    >
      <h2
        className="text-3xl font-semibold mb-6"
        style={{ color: colors.text }}
      >
        Verify Users
      </h2>

      {userPopup && (
        <ShowUserDetails
          setUserPopup={setUserPopup}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
      )}

      <div className="space-y-4">
        {usersForVerification?.map((user) => (
          <div
            key={user.phoneNumber}
            className="p-5 rounded-lg shadow-md flex flex-col md:flex-row items-center md:items-start justify-between gap-4"
            style={{ backgroundColor: colors.card }}
          >
            <div className="flex items-center gap-4 w-full md:w-2/3">
              <img
                src={user.photoUrl || 'https://via.placeholder.com/150'}
                alt={user.fullName}
                className="w-16 h-16 rounded-full object-cover border-2"
                style={{ borderColor: colors.primary }}
              />
              <div>
                <h3 className="text-xl font-semibold" style={{ color: colors.text }}>
                  {user.fullName}
                </h3>
                <p className="text-sm" style={{ color: colors.text }}>
                  <span style={{ color: colors.primaryDark, fontWeight: '500' }}>Email:</span> {user.email}
                </p>
                <p className="text-sm" style={{ color: colors.text }}>
                  <span style={{ color: colors.primaryDark, fontWeight: '500' }}>Phone:</span> {user.phoneNumber}
                </p>
              </div>
            </div>

            <div className="flex gap-3 w-full md:w-auto justify-end">
              <button
                onClick={() => handleView(user)}
                className="px-4 py-2 rounded-lg font-medium"
                style={{
                  backgroundColor: colors.warning,
                  color: colors.text,
                }}
              >
                View
              </button>

              {!user.isVerified ? (
                <button
                  onClick={() => handleVerify(user)}
                  className="px-4 py-2 rounded-lg font-medium"
                  style={{
                    backgroundColor: colors.primary,
                    color: "#fff",
                  }}
                >
                  Verify
                </button>
              ) : (
                <span
                  className="px-4 py-2 rounded-lg font-semibold"
                  style={{
                    color: colors.success,
                    border: `1px solid ${colors.success}`,
                    backgroundColor: "transparent",
                  }}
                >
                  Verified
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default VerifyUsers;
