import React, { useContext } from 'react';
import Sidebar from './components/Sidebar';
import { ThemeContext } from '../context/ThemeContext';

import EmployeeDashboard from './components/employee/EmployeeDashboard.jsx';
import VerifyUsers from './components/employee/VerifyUsers';
import UserList from './components/employee/UserList';

const Employee = () => {
  const { colors, selectedOption } = useContext(ThemeContext);

  return (
    <div
      className="flex h-screen w-full"
      style={{
        backgroundColor: colors.background,
        color: colors.text,
      }}
    >
      {/* Sidebar */}
      <div className="w-64 fixed top-0 left-0 bottom-0 z-10">
        <Sidebar role="employee" />23
      </div>

      {/* Main Content */}
      <div className="ml-64 w-full overflow-y-auto">
        {selectedOption === 0 && <EmployeeDashboard />}
        {selectedOption === 1 && <VerifyUsers />}
        {selectedOption === 2 && <UserList />}
      </div>
    </div>
  );
};

export default Employee;
