import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../../../context/ThemeContext';
import { FaUserCircle } from 'react-icons/fa';

const users = [
  {
    id: 1,
    name: "Aarav Sharma",
    email: "aarav@example.com",
    photo: "https://randomuser.me/api/portraits/men/75.jpg",
    status: "verified",
  },
  {
    id: 2,
    name: "Neha Kapoor",
    email: "neha@example.com",
    photo: "https://randomuser.me/api/portraits/women/65.jpg",
    status: "pending",
  },
  {
    id: 3,
    name: "Rohit Mehta",
    email: "rohit@example.com",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    status: "verified",
  },
];

const UserList = () => {
  const { colors } = useContext(ThemeContext);

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="flex-grow p-4 w-full overflow-y-auto"
    >
      <h2 className="text-3xl font-semibold mb-4 text-gray-800">
        User List 📋
      </h2>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left font-bold text-gray-800">Avatar</th>
              <th className="px-4 py-2 text-left font-bold text-gray-800">Name</th>
              <th className="px-4 py-2 text-left font-bold text-gray-800">Email</th>
              <th className="px-4 py-2 text-left font-bold text-gray-800">Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-4 py-2">
                  <img
                    src={user.photo}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>
                <td className="px-4 py-2 text-gray-800">{user.name}</td>
                <td className="px-4 py-2 text-gray-800">{user.email}</td>
                <td
                  className={`px-4 py-2 font-semibold ${
                    user.status === 'verified'
                      ? `text-green-500`
                      : `text-yellow-500`
                  }`}
                >
                  {user.status.toUpperCase()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default UserList;
