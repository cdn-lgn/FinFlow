import React, { useContext } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "../../../context/ThemeContext";
import { FaEdit } from "react-icons/fa";

const Profile = () => {
  const { colors } = useContext(ThemeContext);

  // Dummy user data
  const user = {
    name: "Logan Raj",
    email: "logan@example.com",
    phone: "+91 9876543210",
    pan: "ABCDE1234F",
    dob: "1998-05-15",
    photo: "https://i.pravatar.cc/150?img=32",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 w-full"
    >
      <h2 className="text-3xl font-semibold text-primary-dark mb-4">Profile 💁‍♂️</h2>

      <div
        className="bg-white p-4 rounded-3xl shadow-lg"
        style={{
          backgroundColor: colors.card,
          color: colors.text,
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Left side: Profile picture and Edit Button */}
          <div className="text-center">
            <img
              src={user.photo}
              alt={user.name}
              className="w-30 h-30 rounded-full mx-auto border-4 border-primary mb-2"
              style={{ borderColor: colors.primary }}
            />
            <h3 className="text-xl font-semibold mt-2">{user.name}</h3>
            <button
              className="mt-4 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark"
              style={{
                backgroundColor: colors.primary,
                hover: { backgroundColor: colors.primaryDark },
              }}
            >
              <FaEdit className="inline mr-2" /> Edit Profile
            </button>
          </div>

          {/* Right side: User Info */}
          <div className="col-span-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-semibold">Email</p>
                <p>{user.email}</p>
              </div>
              <div>
                <p className="text-sm font-semibold">Phone</p>
                <p>{user.phone}</p>
              </div>
              <div>
                <p className="text-sm font-semibold">PAN Card</p>
                <p>{user.pan}</p>
              </div>
              <div>
                <p className="text-sm font-semibold">Date of Birth</p>
                <p>{user.dob}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;
