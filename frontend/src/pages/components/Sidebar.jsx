import React, { useContext } from 'react';
import { FaTachometerAlt, FaUserFriends, FaUserCircle, FaCogs } from 'react-icons/fa';
import { ThemeContext } from '../../context/ThemeContext';

const Sidebar = ({ role = "user" }) => {
  const { colors, selectedOption, setSelectedOption } = useContext(ThemeContext);

  const items = {
    user: [
      { icon: <FaTachometerAlt />, text: "Dashboard" },
      { icon: <FaUserFriends />, text: "Transactions" },
      { icon: <FaUserCircle />, text: "Profile" },
    ],
    employee: [
      { icon: <FaTachometerAlt />, text: "Dashboard" },
      { icon: <FaUserFriends />, text: "Verify Users" },
      { icon: <FaUserCircle />, text: "User List" },
    ],
    admin: [
      { icon: <FaTachometerAlt />, text: "Dashboard" },
      { icon: <FaUserFriends />, text: "Manage Users" },
      { icon: <FaCogs />, text: "Settings" },
    ],
  };

  const handleSelectedItem = (e, index) => {
    setSelectedOption(index);
  };

  return (
    <div className={`h-full w-60 bg-white dark:bg-gray-800 border-r border-gray-300 dark:border-gray-700 text-${colors.text}`}>
      <ul className="mt-4 space-y-2">
        {items[role]?.map((item, index) => (
          <li
            key={index}
            onClick={(e) => handleSelectedItem(e, index)}
            className={`flex items-center px-4 py-3 cursor-pointer transition-all duration-200 rounded-r-full
              ${
                selectedOption === index
                  ? `bg-[${colors.primary}] text-white`
                  : 'hover:bg-blue-100 dark:hover:bg-gray-700'
              }`}
          >
            <span className="text-lg mr-3">
              {item.icon}
            </span>
            <span className="text-sm font-medium">{item.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
