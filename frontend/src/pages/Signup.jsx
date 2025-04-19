import React, { useState, useEffect } from "react";
import FaceDetector from "./components/FaceDetector";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import axiosClient from "../utils/axiosClient";
import OtpVerify from "./components/OtpVerify";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    fatherName: "",
    dob: "",
    mobile: "",
    email: "",
    pan: "",
    password: "",
    confirmPassword: "",
    addressLine: "",
    city: "",
    pincode: "",
    createdLocation: {},
    country: "India",
  });

  const [userFace, setUserFace] = useState(null);
  const [mobileAndEmailVerified, setMobileAndEmailVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpTarget, setOtpTarget] = useState({});
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isImageCaptured, setIsImageCaptured] = useState(true);
  const [dobError, setDobError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setFormData((prev) => ({
          ...prev,
          createdLocation: {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          },
        }));
      },
      (err) => console.error("Location Error:", err)
    );
  }, []);

  useEffect(() => {
    if (
      formData.password &&
      formData.confirmPassword &&
      formData.password !== formData.confirmPassword
    ) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
  }, [formData.password, formData.confirmPassword]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "pincode") {
      if (!/^\d{0,6}$/.test(value)) return;
    }
    if (name === "mobile") {
      if (!/^\d{0,10}$/.test(value)) return;
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateDOB = (dob) => {
    if (!dob) return setDobError("DOB is required"), false;
    const birthDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    if (age < 18)
      return setDobError("You must be at least 18 years old"), false;
    setDobError("");
    return true;
  };

  const handleVerify = (field) => {
    if (mobileAndEmailVerified) return;
    if (field != "") setShowOtpModal(true);
    setOtpTarget(field);
  };
  if (showOtpModal && otpTarget) {
    return (
      <OtpVerify
        sendTo={otpTarget}
        setMobileAndEmailVerified={setMobileAndEmailVerified}
        onClose={() => setShowOtpModal(false)}
      />
    );
  }

  const handleSubmit = async () => {
    if (!validateDOB(formData.dob)) return;

    const form = new FormData();

    for (const key in formData) {
      if (typeof formData[key] === "object") {
        form.append(key, JSON.stringify(formData[key]));
      } else {
        form.append(key, formData[key]);
      }
    }
    if (userFace) {
      form.append("image", userFace);
    }
    if(mobileAndEmailVerified) {
      form.append("isEmailAndMobileVerified", "true");
    }

    try {
      const response = await axiosClient.post("/user/registration", form);
      console.log("✅ Server Response:", response.data);
    } catch (error) {
      console.error("❌ Upload Error:", error);
    }
  };

  const isFormValid =
    Object.values(formData).every((val) => val !== "") &&
    userFace &&
    mobileAndEmailVerified &&
    !dobError &&
    !passwordError;

  if (!isImageCaptured) {
    return (
      <FaceDetector
        setUserFace={setUserFace}
        isImageCaptured={isImageCaptured}
        setIsImageCaptured={setIsImageCaptured}
      />
    );
  }

  return (
    <div className="min-h-screen w-full bg-gray-100 text-gray-800 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-xl"
      >
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-700">
          FinFlow Registration
        </h2>

        {/* Personal Info */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Personal Info</h3>
          <div className="grid md:grid-cols-1 gap-6">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className="input"
            />
            <input
              type="text"
              name="fatherName"
              placeholder="Father's Name"
              value={formData.fatherName}
              onChange={handleChange}
              className="input"
            />
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              min="1945-04-15"
              max="2007-04-15"
              className={`input ${dobError ? "border-red-500 bg-red-50" : ""}`}
            />
            {dobError && <p className="text-sm text-red-500">{dobError}</p>}
            <input
              type="text"
              name="pan"
              placeholder="PAN Number"
              value={formData.pan}
              onChange={handleChange}
              className="input input"
            />
          </div>
        </div>

        {/* Address Info */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Address</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              name="addressLine"
              placeholder="Address Line"
              value={formData.addressLine}
              onChange={handleChange}
              className="input"
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className="input"
            />
            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={formData.pincode}
              onChange={handleChange}
              className="input"
            />
            <input
              name="country"
              value="India"
              disabled
              className="input bg-gray-200 cursor-not-allowed"
            />
          </div>
        </div>

        {/* Contact Info */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Contact Info</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex gap-2">
              <input
                type="text"
                name="mobile"
                placeholder="Mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="input"
              />
            </div>
            <div className="flex gap-2">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="input"
              />
              <button
                onClick={() =>
                  handleVerify({
                    email: formData.email,
                    mobile: formData.mobile,
                  })
                }
                disabled={!formData.email || !formData.mobile}
                className={`text-white btn  ${
                  mobileAndEmailVerified
                    ? "bg-green-500 opacity-50 cursor-not-allowed"
                    : "bg-blue-500"
                } ${
                  !formData.email || !formData.mobile
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                {mobileAndEmailVerified ? "Verified" : "Verify"}
              </button>
            </div>
          </div>
        </div>

        {/* Password Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Create Password</h3>
          <div className="grid md:grid-cols-2 gap-4 relative">
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="input pr-12"
              />
              <div
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            <div className="relative w-full">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="input pr-12"
              />
              <div
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>
          {passwordError && (
            <p className="text-sm text-red-500 mt-1">{passwordError}</p>
          )}
        </div>

        {/* Face Verification */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Face Verification</h3>
          <div className="flex items-center gap-4">
            <div className="w-32 h-32 bg-black rounded-lg overflow-hidden">
              {userFace && (
                <img
                  src={URL.createObjectURL(userFace)}
                  alt="face"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <button
              onClick={() => setIsImageCaptured(false)}
              className={`btn text-white ${
                userFace ? "bg-green-500" : "bg-blue-500"
              }`}
            >
              {userFace ? "Retake Face" : "Verify Face"}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-10 text-center">
          <button
            onClick={handleSubmit}
            disabled={!isFormValid}
            className={`btn  ${
              !isFormValid
                ? "opacity-50 cursor-not-allowed text-black"
                : "bg-blue-500 text-white"
            }`}
          >
            Create Account
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
