import React, { useEffect } from "react";
import { IoMdClose } from "react-icons/io"; // for the close icon
import axiosClient from "../../utils/axiosClient";

const OtpVerify = ({
  sendTo,
  setMobileVerified,
  setEmailVerified,
  onClose,
}) => {
  console.log("verify tab opened");
  console.log(typeof sendTo);
  async function sendOtpToMobile() {
    try {
      const response = await axiosClient.post("/send-otp", { mobile: sendTo });
      console.log(response.data);
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  }
  async function sendOtpToEmail() {
    try {
      const response = await axiosClient.post("/send-otp", { email: sendTo });
      console.log(response.data);
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  }
  async function handleOtpVerification() {
    // Logic to verify OTP
    setMobileVerified(true);
    setEmailVerified(true);
  }

  useEffect(() => {
    if (sendTo.includes("@")) {
      sendOtpToEmail();
    } else {
      sendOtpToMobile();
    }
  }, [sendTo]);

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

        {/* Content */}
        <h1 className="text-xl font-semibold mb-2 text-center">
          OTP Verification
        </h1>
        <p className="text-sm text-gray-600 text-center mb-4">
          We have sent a one-time password (OTP) to{" "}
          <span className="font-medium">{sendTo}</span>
        </p>
        <p className="text-sm text-gray-600 text-center mb-4">
          Please enter the OTP below to verify your account.
        </p>

        <input
          type="text"
          placeholder="Enter OTP"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />

        <button
          onClick={() => {
            // Logic to verify OTP
            setMobileVerified(true);
            setEmailVerified(true);
          }}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md"
        >
          Verify OTP
        </button>

        <p className="text-sm text-center mt-4">
          Didn't receive the OTP?{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Resend it
          </a>
        </p>
      </div>
    </div>
  );
};

export default OtpVerify;
