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

  const LoadingSkeleton = () => (
    <div className="w-full space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="animate-pulse p-4 rounded-lg border" style={{ backgroundColor: colors.card }}>
          <div className="flex items-center space-x-6">
            <div className="w-12 h-12 rounded-lg bg-gray-300"></div>
            <div className="flex-1 space-y-3">
              <div className="h-4 bg-gray-300 rounded w-1/4"></div>
              <div className="h-3 bg-gray-300 rounded w-1/3"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full h-[calc(100vh-4rem)] overflow-auto"
    >
      <div className="w-full max-w-[1400px] mx-auto p-4 lg:p-6">
        <header className="mb-6 sticky top-0 z-10 backdrop-blur-sm">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold" style={{ color: colors.primaryDark }}>
              User Verification Queue
            </h2>
            <div className="px-4 py-2 rounded-lg"
              style={{
                backgroundColor: colors.warning + '15',
                color: colors.warning
              }}>
              {usersForVerification?.length || 0} Pending Requests
            </div>
          </div>
          <div className="mt-2 text-sm" style={{ color: colors.text + '80' }}>
            Review and verify user registration requests
          </div>
        </header>

        {userPopup && <ShowUserDetails
          setUserPopup={setUserPopup}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />}

        {!usersForVerification ? (
          <LoadingSkeleton />
        ) : usersForVerification.length === 0 ? (
          <div className="w-full h-[60vh] flex items-center justify-center rounded-lg shadow-sm"
               style={{ backgroundColor: colors.card }}>
            <p className="text-lg font-medium" style={{ color: colors.primaryDark }}>
              All verification requests have been processed
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {usersForVerification.map((user) => (
              <motion.div
                key={user.phoneNumber}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full p-4 rounded-lg border flex items-start justify-between gap-4"
                style={{
                  backgroundColor: colors.card,
                  borderColor: colors.border
                }}
              >
                <div className="flex items-start space-x-4 flex-grow">
                  <div className="relative">
                    <img
                      src={user.photoUrl || 'https://via.placeholder.com/150'}
                      alt=""
                      className="w-12 h-12 rounded-lg object-cover border"
                      style={{ borderColor: colors.border }}
                    />
                    <div className="absolute -top-1.5 -right-1.5 w-3 h-3 rounded-full border-2"
                      style={{
                        backgroundColor: user.isVerified ? colors.success : colors.warning,
                        borderColor: colors.card
                      }}
                    />
                  </div>

                  <div className="flex-grow">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-medium" style={{ color: colors.text }}>
                        {user.fullName}
                      </h3>
                      <span className="text-sm px-3 py-1 rounded-full"
                        style={{
                          backgroundColor: user.isVerified ? colors.success + '15' : colors.warning + '15',
                          color: user.isVerified ? colors.success : colors.warning
                        }}>
                        {user.isVerified ? 'Verified' : 'Pending'}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-sm" style={{ color: colors.text }}>
                        <span className="font-medium">Email: </span>
                        {user.email}
                      </div>
                      <div className="text-sm" style={{ color: colors.text }}>
                        <span className="font-medium">Phone: </span>
                        {user.phoneNumber}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleView(user)}
                    className="px-3 py-1.5 rounded border text-sm font-medium transition-colors"
                    style={{
                      borderColor: colors.border,
                      color: colors.text
                    }}
                  >
                    Review Details
                  </button>

                  {!user.isVerified && (
                    <button
                      onClick={() => handleVerify(user)}
                      className="px-3 py-1.5 rounded text-sm font-medium transition-colors"
                      style={{
                        backgroundColor: colors.primary,
                        color: "#fff",
                      }}
                    >
                      Approve
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default VerifyUsers;
