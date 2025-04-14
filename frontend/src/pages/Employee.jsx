import React, { useContext } from 'react';
import Sidebar from './components/Sidebar';
import { ThemeContext } from '../context/ThemeContext';

// Import employee-specific components
import EmployeeDashboard from './components/employee/EmployeeDashboard.jsx';
import VerifyUsers from './components/employee/VerifyUsers';
import UserList from './components/employee/UserList';

const Employee = () => {
  const { colors, selectedOption } = useContext(ThemeContext);

  return (
    <div className={`bg-${colors.background} text-${colors.text} flex h-screen w-full overflow-hidden`}>
      <Sidebar role="employee" />

      <div className="flex-1 p-4">
        {selectedOption === 0 && <EmployeeDashboard />}
        {selectedOption === 1 && <VerifyUsers />}
        {selectedOption === 2 && <UserList />}
      </div>
    </div>
  );
};

export default Employee;
