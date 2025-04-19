import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { ThemeContext } from "../../context/ThemeContext";
import { motion } from "framer-motion";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const DashboardProfile = () => {
  const { colors } = useContext(ThemeContext);
  const user = useSelector((state) => state.user.user);

  if (!user) return <p style={{ color: colors.text }}>Loading...</p>;

  const {
    fullName,
    fatherName,
    email,
    phoneNumber,
    dob,
    photoUrl,
    isVerified,
  } = user;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full mx-auto mt-6"
      style={{
        backgroundColor: colors.card,
        color: colors.text,
        padding: "1.5rem",
        borderRadius: "12px",
        boxShadow: `0 4px 20px ${colors.primary}40`,
      }}
    >
      <div className="flex flex-col md:flex-row justify-top items-top gap-6">
        {/* Left Column */}
        <div className="flex-1 space-y-2 w-full">
          <p className="text-lg font-semibold">
            <span style={{ color: colors.primary }}>Name:</span> {fullName}
          </p>
          <p className="text-lg font-semibold">
            <span style={{ color: colors.primary }}>Father's Name:</span> {fatherName}
          </p>
          <p className="text-lg font-semibold">
            <span style={{ color: colors.primary }}>DOB:</span>{" "}
            {new Date(dob).toLocaleDateString()}
          </p>

          <p className="text-lg font-semibold">
            <span style={{ color: colors.primary }}>Email:</span> {email}
          </p>
          <p className="text-lg font-semibold">
            <span style={{ color: colors.primary }}>Phone:</span> {phoneNumber}
          </p>

        </div>

        {/* Right Column: Profile Picture + Badge */}
        <div className="flex flex-col items-center">
          <img
            src={photoUrl}
            alt="User"
            className="w-36 h-36 object-cover rounded-lg shadow-lg border-2"
            style={{ borderColor: isVerified ? colors.success : colors.danger }}
          />
          <div className="mt-3">
            {isVerified ? (
              <div className="flex items-center gap-2 font-semibold">
                <FaCheckCircle
                  size={20}
                  style={{ color: colors.success }}
                  title="Verified User"
                />
                <span style={{ color: colors.success }}>Verified</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 font-semibold">
                <FaTimesCircle
                  size={20}
                  style={{ color: colors.danger }}
                  title="Not Verified"
                />
                <span style={{ color: colors.danger }}>Not Verified</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardProfile;
