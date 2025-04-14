import React, { useContext } from 'react';
import Sidebar from './components/Sidebar';
import { ThemeContext } from '../context/ThemeContext';
import UserDashboard from './components/user/UserDashboard';
import Transactions from './components/user/Transactions';
import Profile from './components/user/Profile';

const User = () => {
  const { colors, selectedOption, setSelectedOption } = useContext(ThemeContext);

  return (
    <div className={`bg-${colors.background} text-${colors.text} flex h-screen w-full overflow-hidden`}>
      {/* Sidebar */}
      <Sidebar role="user" />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {selectedOption === 0 && <UserDashboard />}
        {selectedOption === 1 && <Transactions />}
        {selectedOption === 2 && <Profile />}
      </div>
    </div>
  );
};

export default User;
