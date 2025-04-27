import React, { useContext } from 'react';
import Sidebar from './components/Sidebar';
import { ThemeContext } from '../context/ThemeContext';
import AdminDashboard from './components/admin/AdminDashboard';
import ManageUsers from './components/admin/ManageUsers';
import Settings from './components/admin/Settings';

const Admin = () => {
  const { colors, selectedOption } = useContext(ThemeContext);

  return (
    <div className="flex h-screen w-full" style={{ backgroundColor: colors.background }}>
      <div className="w-64 fixed top-0 left-0 bottom-0 z-10">
        <Sidebar role="admin" />
      </div>

      <div className="ml-64 w-full overflow-y-auto">
        {selectedOption === 0 && <AdminDashboard />}
        {selectedOption === 1 && <ManageUsers />}
        {selectedOption === 2 && <Settings />}
      </div>
    </div>
  );
};

export default Admin;
