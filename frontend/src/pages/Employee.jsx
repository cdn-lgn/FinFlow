import React, { useContext } from 'react';
import { Box } from '@mui/material';
import Sidebar from './components/Sidebar';
import { ThemeContext } from '../context/ThemeContext';

// Import employee-specific components
import EmployeeDashboard from './components/employee/EmployeeDashboard.jsx';
import VerifyUsers from './components/employee/VerifyUsers';
import UserList from './components/employee/UserList';

const Employee = () => {
  const { colors, selectedOption } = useContext(ThemeContext);

  return (
    <Box
      sx={{
        bgcolor: colors.background,
        color: colors.text,
        display: 'flex',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
      }}
    >
      <Sidebar role="employee" />
      {selectedOption === 0 && <EmployeeDashboard />}
      {selectedOption === 1 && <VerifyUsers />}
      {selectedOption === 2 && <UserList />}
    </Box>
  );
};

export default Employee;
