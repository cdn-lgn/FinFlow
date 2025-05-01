import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../../../context/ThemeContext';
import axiosClient from '../../../utils/axiosClient';
import { FaUserTie, FaUserCog, FaEye, FaTrash, FaTimes } from 'react-icons/fa';
import AddEmployeeModal from './AddEmployeeModal';
import LoadingButton from '../LoadingButton';

const EmployeeList = () => {
  const { colors } = useContext(ThemeContext);
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setIsLoading(true);
        const response = await axiosClient.get('/admin/employees');
        setEmployees(response.data.employees);
      } catch (error) {
        console.error('Error fetching employees:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const handleAddEmployee = () => {
    setShowAddModal(true);
  };

  const handleViewDetails = async (employeeId) => {
    try {
      const response = await axiosClient.get(`/admin/employees/${employeeId}`);
      if (response.data.success) {
        setSelectedEmployee(response.data.employee);
      }
    } catch (error) {
      console.error('Error fetching employee details:', error);
    }
  };

  const handleRemoveClick = (employeeId) => {
    setSelectedEmployeeId(employeeId);
    setShowConfirmModal(true);
  };

  const handleRemoveEmployee = async () => {
    try {
      setIsDeleting(true);
      const response = await axiosClient.delete(`/admin/employees/${selectedEmployeeId}`);

      if (response.data.success) {
        setEmployees(prev => prev.filter(emp => emp._id !== selectedEmployeeId));
        setShowConfirmModal(false);
        setSelectedEmployeeId(null);
      }
    } catch (error) {
      console.error('Error removing employee:', error);
      // Show error message
      alert(error.response?.data?.error || 'Failed to remove employee');
    } finally {
      setIsDeleting(false);
    }
  };

  const LoadingSkeleton = () => (
    <div className="w-full space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="animate-pulse p-4 rounded-lg border" style={{ backgroundColor: colors.card }}>
          <div className="flex items-center space-x-6">
            <div className="w-12 h-12 rounded-lg bg-gray-300"></div>
            <div className="flex-1 space-y-3">
              <div className="h-4 bg-gray-300 rounded w-1/4"></div>
              <div className="h-3 bg-gray-300 rounded w-1/3"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full h-[calc(100vh-4rem)] overflow-auto"
    >
      <div className="w-full max-w-[1400px] mx-auto p-4 lg:p-6">
        <header className="mb-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold" style={{ color: colors.primaryDark }}>
              Employee Management
            </h2>
            <button
              onClick={handleAddEmployee}
              className="px-4 py-2 rounded-lg flex items-center gap-2"
              style={{ backgroundColor: colors.primary, color: 'white' }}
            >
              <FaUserTie />
              Add Employee
            </button>
          </div>
        </header>

        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <div className="space-y-4">
            {employees.map((employee) => (
              <motion.div
                key={employee._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-lg border"
                style={{ backgroundColor: colors.card, borderColor: colors.border }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg" style={{ backgroundColor: colors.warning + '20' }}>
                      <FaUserCog size={24} style={{ color: colors.warning }} />
                    </div>
                    <div>
                      <h3 className="font-medium" style={{ color: colors.text }}>
                        {employee.fullName}
                      </h3>
                      <p className="text-sm" style={{ color: colors.text + '80' }}>
                        {employee.email}
                      </p>
                      <p className="text-xs opacity-60">
                        Verifications: {employee.verificationCount || 0}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleViewDetails(employee._id)}
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: colors.primary + '20', color: colors.primary }}
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => handleRemoveClick(employee._id)}
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: colors.danger + '20', color: colors.danger }}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <AddEmployeeModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={() => {
          setShowAddModal(false);
          // Refresh employee list
          fetchEmployees();
        }}
      />

      {/* Updated Employee Details Modal */}
      {selectedEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-2xl p-6 rounded-xl relative"
            style={{ backgroundColor: colors.card }}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedEmployee(null)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-opacity-10"
              style={{
                backgroundColor: colors.danger + '10',
                color: colors.danger
              }}
            >
              <FaTimes />
            </button>

            {/* Header */}
            <h3 className="text-xl font-semibold mb-6" style={{ color: colors.primaryDark }}>
              Employee Details
            </h3>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-3 rounded-lg" style={{ backgroundColor: colors.background }}>
                <p className="text-sm" style={{ color: colors.text + '80' }}>Name</p>
                <p className="font-medium" style={{ color: colors.text }}>
                  {selectedEmployee.fullName}
                </p>
              </div>
              <div className="p-3 rounded-lg" style={{ backgroundColor: colors.background }}>
                <p className="text-sm" style={{ color: colors.text + '80' }}>Email</p>
                <p className="font-medium" style={{ color: colors.text }}>
                  {selectedEmployee.email}
                </p>
              </div>
              <div className="p-3 rounded-lg" style={{ backgroundColor: colors.background }}>
                <p className="text-sm" style={{ color: colors.text + '80' }}>Phone</p>
                <p className="font-medium" style={{ color: colors.text }}>
                  {selectedEmployee.phoneNumber}
                </p>
              </div>
              <div className="p-3 rounded-lg" style={{ backgroundColor: colors.background }}>
                <p className="text-sm" style={{ color: colors.text + '80' }}>Total Verifications</p>
                <p className="font-medium" style={{ color: colors.success }}>
                  {selectedEmployee.stats?.totalVerifications || 0}
                </p>
              </div>
            </div>

            {/* Recent Verifications Section */}
            <div>
              <h4 className="font-medium mb-3" style={{ color: colors.primaryDark }}>
                Recent Verifications
              </h4>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {selectedEmployee.stats?.recentVerifications?.length > 0 ? (
                  selectedEmployee.stats.recentVerifications.map((verification) => (
                    <div
                      key={verification._id}
                      className="p-3 rounded-lg flex justify-between items-center"
                      style={{ backgroundColor: colors.background }}
                    >
                      <div>
                        <p className="font-medium" style={{ color: colors.text }}>
                          {verification.fullName}
                        </p>
                        <p className="text-sm" style={{ color: colors.text + '80' }}>
                          {verification.email}
                        </p>
                      </div>
                      <span className="text-xs px-2 py-1 rounded-full"
                        style={{
                          backgroundColor: colors.success + '20',
                          color: colors.success
                        }}>
                        Verified
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-center py-4" style={{ color: colors.text + '60' }}>
                    No recent verifications
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-md p-6 rounded-xl relative"
            style={{ backgroundColor: colors.card }}
          >
            <h3 className="text-xl font-semibold mb-4" style={{ color: colors.primaryDark }}>
              Remove Employee
            </h3>
            <p style={{ color: colors.text }}>
              Are you sure you want to remove this employee? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setShowConfirmModal(false)}
                disabled={isDeleting}
                className="px-4 py-2 rounded-lg"
                style={{
                  backgroundColor: colors.background,
                  color: colors.text,
                  opacity: isDeleting ? 0.7 : 1
                }}
              >
                Cancel
              </button>
              <LoadingButton
                onClick={() => handleRemoveEmployee(selectedEmployeeId)}
                isLoading={isDeleting}
                className="px-4 py-2 rounded-lg text-white"
                style={{
                  backgroundColor: colors.danger,
                  opacity: isDeleting ? 0.7 : 1
                }}
                loadingText="Removing..."
              >
                Remove
              </LoadingButton>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default EmployeeList;
