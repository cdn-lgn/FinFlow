import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "../../../context/ThemeContext";
import { FaUserCircle } from "react-icons/fa";
import axiosClient from "../../../utils/axiosClient";
import ShowUserDetails from "./ShowUserDetails";

const UserList = () => {
  const { colors } = useContext(ThemeContext);
  const [users, setUsers] = useState([]);
  const [userPopup, setUserPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosClient.get("/users/userList");
        setUsers(response.data.users);
        console.log(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleView = (user) => {
    console.log("View details for user:", user);
    setUserPopup(true);
    setSelectedUser(user);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="flex-grow p-6 w-full overflow-y-auto"
      style={{ backgroundColor: colors.background }}
    >
      <h2
        className="text-3xl font-semibold mb-6"
        style={{ color: colors.text }}
      >
        User List
      </h2>

      {userPopup && (
        <ShowUserDetails
          setUserPopup={setUserPopup}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
      )}

      <div className="space-y-4">
        {users?.map((user) => (
          <div
            key={user.email}
            className="p-5 rounded-lg shadow-md flex flex-col md:flex-row items-center md:items-start justify-between gap-4"
            style={{ backgroundColor: colors.card }}
          >
            <div className="flex items-center gap-4 w-full md:w-2/3">
              <img
                src={user.photoUrl || "https://via.placeholder.com/150"}
                alt={user.fullName}
                className="w-16 h-16 rounded-full object-cover border-2"
                style={{ borderColor: colors.primary }}
              />
              <div>
                <h3
                  className="text-xl font-semibold"
                  style={{ color: colors.text }}
                >
                  {user.fullName}
                </h3>
                <p className="text-sm" style={{ color: colors.text }}>
                  <span
                    className="font-medium"
                    style={{ color: colors.warning }}
                  >
                    Email:
                  </span>{" "}
                  {user.email}
                </p>
                {user.status && (
                  <p className="text-sm" style={{ color: colors.text }}>
                    <span
                      className="font-medium"
                      style={{ color: colors.success }}
                    >
                      Status:
                    </span>{" "}
                    {user.status}
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-3 w-full md:w-auto justify-end">
              <button
                onClick={() => handleView(user)}
                className="px-4 py-2 rounded-lg font-medium"
                style={{
                  backgroundColor: colors.warning,
                  color: "#fff",
                }}
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default UserList;
