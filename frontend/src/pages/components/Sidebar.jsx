import React, { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaUserFriends,
  FaUserCircle,
  FaCogs,
  FaSignOutAlt
} from 'react-icons/fa';
import { ThemeContext } from '../../context/ThemeContext';
import { removeUser } from '../../redux/userSlice';
import LogoutConfirmModal from './LogoutConfirmModal';

const Sidebar = ({ role = 'user' }) => {
  const { colors, selectedOption, setSelectedOption } = useContext(ThemeContext);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const items = {
    user: [
      { icon: <FaTachometerAlt />, text: 'Dashboard' },
      { icon: <FaUserFriends />, text: 'Transactions' },
      { icon: <FaUserCircle />, text: 'Profile' },
    ],
    employee: [
      { icon: <FaTachometerAlt />, text: 'Dashboard' },
      { icon: <FaUserFriends />, text: 'Verify Users' },
      { icon: <FaUserCircle />, text: 'User List' },
    ],
    admin: [
      { icon: <FaTachometerAlt />, text: 'Dashboard' },
      { icon: <FaUserFriends />, text: 'Manage Users' },
      { icon: <FaCogs />, text: 'Settings' },
    ],
  };

  const handleSelectedItem = (e, index) => {
    setSelectedOption(index);
  };

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    dispatch(removeUser());
    navigate('/login');
  };

  return (
    <div
      className="h-full w-60 flex flex-col border-r"
      style={{
        backgroundColor: colors.card,
        borderColor: `${colors.border}`,
      }}
    >
      {/* Logo/Header */}
      <div className="p-4 border-b" style={{ borderColor: colors.border }}>
        <h1 className="text-xl font-bold" style={{ color: colors.primaryDark }}>
          Fin<span style={{ color: colors.primary }}>Flow</span>
        </h1>
        <p className="text-xs mt-1" style={{ color: colors.text + '80' }}>
          {role.charAt(0).toUpperCase() + role.slice(1)} Dashboard
        </p>
      </div>

      {/* Menu Items */}
      <div className="flex-1 py-4 px-2">
        <ul className="space-y-1">
          {items[role]?.map((item, index) => {
            const isSelected = selectedOption === index;

            return (
              <li
                key={index}
                onClick={(e) => handleSelectedItem(e, index)}
                className="flex items-center px-3 py-2.5 cursor-pointer transition-all duration-200 rounded-lg relative"
                style={{
                  backgroundColor: isSelected ? colors.primary + '15' : 'transparent',
                  color: isSelected ? colors.primary : colors.text,
                }}
              >
                <span className="text-lg w-8">
                  {item.icon}
                </span>
                <span className="text-sm font-medium ml-2">{item.text}</span>
                {isSelected && (
                  <div
                    className="absolute top-0 right-0 h-full w-1"
                    style={{
                      backgroundColor: colors.primary,
                      borderRadius: '4px 0 0 4px'
                    }}
                  />
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Logout Button */}
      <div className="p-2 border-t" style={{ borderColor: colors.border }}>
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-3 py-2.5 rounded-lg transition-all duration-200"
          style={{
            backgroundColor: colors.danger + '10',
            color: colors.danger,
          }}
        >
          <FaSignOutAlt className="text-lg w-8" />
          <span className="text-sm font-medium ml-2">Logout</span>
        </button>
      </div>

      {showLogoutModal && (
        <LogoutConfirmModal
          onConfirm={confirmLogout}
          onCancel={() => setShowLogoutModal(false)}
        />
      )}
    </div>
  );
};

export default Sidebar;
