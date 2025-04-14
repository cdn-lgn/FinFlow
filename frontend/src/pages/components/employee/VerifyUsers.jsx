import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../../../context/ThemeContext';
import { FaUserCircle } from 'react-icons/fa';

const dummyUsers = [
  {
    id: 1,
    name: "Aarav Sharma",
    email: "aarav@example.com",
    photo: "https://randomuser.me/api/portraits/men/75.jpg",
    status: "pending",
  },
  {
    id: 2,
    name: "Neha Kapoor",
    email: "neha@example.com",
    photo: "https://randomuser.me/api/portraits/women/65.jpg",
    status: "pending",
  },
];

const VerifyUsers = () => {
  const { colors } = useContext(ThemeContext);
  const [users, setUsers] = useState(dummyUsers);

  const handleVerify = (id) => {
    const updated = users.map((user) =>
      user.id === id ? { ...user, status: 'verified' } : user
    );
    setUsers(updated);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex-grow p-4 w-full overflow-y-auto"
    >
      <h2 className="text-3xl font-semibold mb-4 text-gray-800">Verify Users ✅</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {users.map((user) => (
          <div key={user.id} className="p-4 bg-white rounded-lg shadow-md hover:scale-102">
            <div className="flex items-center gap-4">
              <img
                src={user.photo}
                alt={user.name}
                className="w-14 h-14 rounded-full object-cover"
              />
              <div className="flex-grow">
                <h3 className="text-xl font-semibold text-gray-800">{user.name}</h3>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              {user.status === 'pending' ? (
                <button
                  onClick={() => handleVerify(user.id)}
                  className={`bg-${colors.primary} hover:bg-${colors.primaryDark} text-white px-4 py-2 rounded-lg`}
                >
                  Verify
                </button>
              ) : (
                <span
                  className="text-green-500 font-semibold"
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
