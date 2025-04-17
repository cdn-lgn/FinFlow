import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import axiosClient from "../../utils/axiosClient";

const OtpVerify = ({ sendTo, setMobileAndEmailVerified, onClose }) => {
  const [responseId, setResponseId] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  async function sendOtp() {
    try {
      const response = await axiosClient.post("/verify/send-otp", { sendTo });
      if (response.data.success) {
        setOtpSent(true);
        setResponseId(response.data.id);
        setMessage("OTP sent successfully. Valid for 5 minutes. ⏳");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setError("Failed to send OTP. Please try again later.");
    }
  }

  async function handleOtpVerification() {
    setError(""); // Clear old error

    if (!/^\d{6}$/.test(otp)) {
      setError("Please enter a valid 6-digit OTP 🔒");
      return;
    }

    try {
      const response = await axiosClient.post("/verify/verify-otp", {
        otp: Number(otp),
        id: responseId,
      });

      if (response.data.success) {
        setMobileAndEmailVerified(true);
        setMessage("OTP verified successfully ✅");
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setError("Verification failed. Please try again.");
    }
  }

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,6}$/.test(value)) {
      setOtp(value);
      setError("");
    } else {
      setError("Only numbers allowed, and max 6 digits.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-sm p-6">
        {/* Close Icon */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <IoMdClose size={20} />
        </button>

        <h1 className="text-xl font-semibold mb-2 text-center">
          OTP Verification
        </h1>

        {message && (
          <p className="text-sm text-green-600 text-center mb-2">{message}</p>
        )}

        {!otpSent ? (
          <>
            <button
              onClick={sendOtp}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md"
            >
              Send OTP
            </button>
          </>
        ) : (
          <>
            <p className="text-sm text-gray-600 text-center mb-2">
              We have sent a one-time password (OTP) to your mobile and email
            </p>
            <p className="text-sm text-gray-600 text-center mb-4">
              Please enter the OTP below to verify your account.
            </p>

            <input
              type="text"
              value={otp}
              onChange={handleInputChange}
              placeholder="Enter 6-digit OTP"
              className={`w-full px-4 py-2 border ${
                error ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-1`}
            />
            {error && (
              <p className="text-sm text-red-600 mb-2">{error}</p>
            )}

            <button
              onClick={handleOtpVerification}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md"
            >
              Verify OTP
            </button>

            <p className="text-sm text-center mt-4">
              Didn't receive the OTP?{" "}
              <span
                onClick={sendOtp}
                className="text-blue-600 hover:underline cursor-pointer"
              >
                Resend it
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default OtpVerify;
