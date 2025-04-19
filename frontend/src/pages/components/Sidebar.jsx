import React, { useContext } from 'react';
import {
  FaTachometerAlt,
  FaUserFriends,
  FaUserCircle,
  FaCogs,
} from 'react-icons/fa';
import { ThemeContext } from '../../context/ThemeContext';

const Sidebar = ({ role = 'user' }) => {
  const { colors, selectedOption, setSelectedOption } = useContext(ThemeContext);

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

  return (
    <div
      className="h-full pt-4 w-60 border-r"
      style={{
        backgroundColor: colors.card,
        color: colors.text,
        borderColor: `${colors.primaryDark}40`, // subtle border
      }}
    >
      <ul className="space-y-2">
        {items[role]?.map((item, index) => {
          const isSelected = selectedOption === index;

          return (
            <li
              key={index}
              onClick={(e) => handleSelectedItem(e, index)}
              className="flex items-center px-4 py-3 cursor-pointer transition-all duration-200 rounded-r-full"
              style={{
                backgroundColor: isSelected ? colors.primary : 'transparent',
                color: isSelected ? '#ffffff' : colors.text,
              }}
            >
              <span
                className="text-lg mr-3"
                style={{ color: isSelected ? '#ffffff' : colors.text }}
              >
                {item.icon}
              </span>
              <span className="text-sm font-medium">{item.text}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
