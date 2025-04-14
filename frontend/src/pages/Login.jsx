import React, { useContext, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // React Icons
import { ThemeContext } from '../context/ThemeContext';

const Login = () => {
  const { colors, mode } = useContext(ThemeContext);
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('user');

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleRoleChange = (e) => setRole(e.target.value);

  const logoPath = mode === 'dark'
    ? '/logo-grayscale-transparent.png'
    : '/logo-transparent.png';

  return (
    <div className={`h-screen w-screen flex items-center justify-center bg-${colors.background} text-${colors.text}`}>
      <div className={`p-8 rounded-3xl w-full max-w-sm bg-${colors.card}`}>
        {/* Logo */}
        <div className="text-center mb-8">
          <img src={logoPath} alt="FinFlow Logo" className="w-24 mb-4" />
          <h5 className={`font-bold text-xl`}>
            Login to <span className={`text-${colors.primary}`}>FinFlow</span>
          </h5>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className={`block text-sm mb-1 text-${colors.text}`}>Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            className={`w-full p-3 rounded-md border border-${colors.primaryDark} bg-transparent text-${colors.text}`}
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label htmlFor="password" className={`block text-sm mb-1 text-${colors.text}`}>Password</label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              className={`w-full p-3 rounded-md border border-${colors.primaryDark} bg-transparent text-${colors.text}`}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer" onClick={handleClickShowPassword}>
              {showPassword ? <FaEyeSlash size={20} className={`text-${colors.text}`} /> : <FaEye size={20} className={`text-${colors.text}`} />}
            </div>
          </div>
        </div>

        {/* Role Selector */}
        <div className="mb-4">
          <label htmlFor="role" className={`block text-sm mb-1 text-${colors.text}`}>Select Role</label>
          <select
            id="role"
            value={role}
            onChange={handleRoleChange}
            className={`w-full p-3 rounded-md border border-${colors.primaryDark} bg-transparent text-${colors.text}`}
          >
            <option value="user">User</option>
            <option value="employee">Employee</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* Login Button */}
        <button
          className={`w-full py-3 rounded-md bg-${colors.primary} text-white hover:bg-${colors.primaryDark}`}
        >
          Login as {role.charAt(0).toUpperCase() + role.slice(1)}
        </button>

        {/* Footer Actions */}
        <div className="mt-4 flex justify-between text-sm text-${colors.text}">
          <span className="cursor-pointer">Forgot Password?</span>
          <span className="cursor-pointer">Create Account</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
