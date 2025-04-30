import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "../../../context/ThemeContext";
import axiosClient from "../../../utils/axiosClient";
import ShowUserDetails from "./ShowUserDetails";

const UserList = () => {
  const { colors } = useContext(ThemeContext);
  const [users, setUsers] = useState([]);
  const [userPopup, setUserPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await axiosClient.get("/users/userList");
        setUsers(response.data.users);
        console.log(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleView = async (user) => {
    try {
      const response = await axiosClient.get(`/users/details/${user.email}`);
      setSelectedUser({
        ...response.data.user,
        accountDetails: response.data.accountDetails
      });
      setUserPopup(true);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleStatusChange = async (accountNumber, newStatus) => {
    try {
      setIsUpdating(true);
      const response = await axiosClient.put('/users/account-status', {
        accountNumber,
        status: newStatus
      });

      if (response.data.success) {
        setUsers(prevUsers =>
          prevUsers.map(user =>
            user.accountNumber === accountNumber
              ? { ...user, accountStatus: newStatus }
              : user
          )
        );
      }
    } catch (error) {
      console.error('Error updating account status:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.accountNumber.includes(searchQuery) ||
                         user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.accountStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
        <header className="mb-6 sticky top-0 z-10 backdrop-blur-sm">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold" style={{ color: colors.primaryDark }}>
              Registered Users
            </h2>
            <div className="px-4 py-2 rounded-lg"
              style={{
                backgroundColor: colors.primary + '15',
                color: colors.primary
              }}>
              {users?.length || 0} Total Users
            </div>
          </div>
          <div className="mt-2 text-sm" style={{ color: colors.text + '80' }}>
            View and manage registered user accounts
          </div>
        </header>

        {/* Search and Filter Section */}
        <div className="mb-6 flex flex-wrap gap-4">
          <input
            type="text"
            placeholder="Search by Account Number, Name or Email"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 p-2 rounded-lg"
            style={{ backgroundColor: colors.background, color: colors.text }}
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="p-2 rounded-lg"
            style={{ backgroundColor: colors.background, color: colors.text }}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>

        {userPopup && <ShowUserDetails
          setUserPopup={setUserPopup}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />}

        {isLoading ? (
          <LoadingSkeleton />
        ) : !users?.length ? (
          <div className="w-full h-[60vh] flex items-center justify-center rounded-lg shadow-sm"
               style={{ backgroundColor: colors.card }}>
            <p className="text-lg font-medium" style={{ color: colors.primaryDark }}>
              No registered users found
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredUsers.map((user) => (
              <motion.div
                key={user.email}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full p-4 rounded-lg border flex items-start justify-between gap-4"
                style={{
                  backgroundColor: colors.card,
                  borderColor: colors.border
                }}
              >
                <div className="flex items-start space-x-4 flex-grow">
                  <div className="relative">
                    <img
                      src={user.photoUrl || 'https://via.placeholder.com/150'}
                      alt=""
                      className="w-12 h-12 rounded-lg object-cover border"
                      style={{ borderColor: colors.border }}
                    />
                    <div className="absolute -top-1.5 -right-1.5 w-3 h-3 rounded-full border-2"
                      style={{
                        backgroundColor: user.isVerified ? colors.success : colors.warning,
                        borderColor: colors.card
                      }}
                    />
                  </div>

                  <div className="flex-grow">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-medium" style={{ color: colors.text }}>
                        {user.fullName}
                      </h3>
                      <span className="text-sm px-3 py-1 rounded-full"
                        style={{
                          backgroundColor: colors.primary + '15',
                          color: colors.primary
                        }}>
                        Acc: {user.accountNumber}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-sm" style={{ color: colors.text }}>
                        <span className="font-medium">Email: </span>
                        {user.email}
                      </div>
                      <div className="text-sm" style={{ color: colors.text }}>
                        <span className="font-medium">Phone: </span>
                        {user.phoneNumber}
                      </div>
                      <div className="text-sm" style={{ color: colors.text }}>
                        <span className="font-medium">Balance: </span>
                        ₹{user.accountBalance.toLocaleString()}
                      </div>
                      <div className="text-sm" style={{ color: colors.text }}>
                        <span className="font-medium">Status: </span>
                        <span style={{ color: user.accountStatus === 'active' ? colors.success : colors.warning }}>
                          {user.accountStatus}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <select
                    value={user.accountStatus}
                    onChange={(e) => handleStatusChange(user.accountNumber, e.target.value)}
                    disabled={isUpdating}
                    className="p-2 rounded-lg text-sm"
                    style={{
                      backgroundColor: colors.background,
                      color: user.accountStatus === 'active' ? colors.success : colors.warning
                    }}
                  >
                    <option value="active">Active</option>
                    <option value="suspended">Suspended</option>
                  </select>
                  <button
                    onClick={() => handleView(user)}
                    className="px-3 py-1.5 rounded text-sm font-medium"
                    style={{ background: colors.gradient, color: "#fff" }}
                  >
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default UserList;
