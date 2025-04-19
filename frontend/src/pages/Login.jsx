import React, { useContext, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { ThemeContext } from '../context/ThemeContext';
import axiosClient from '../utils/axiosClient';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const { colors } = useContext(ThemeContext);
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleRoleChange = (e) => setRole(e.target.value);

  const handleLogin = async () => {
    setError('');
    try {
      const res = await axiosClient.post(
        '/user/login',
        { email, password, role }
      );
      console.log('✅ Logged in:', res.data);
      if(res.data?.userData?.fullName) {
        dispatch(setUser(res.data.userData));
        navigate(`/${role}`);
      }
    } catch (err) {
      console.error('❌ Login error:', err);
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };


  return (
    <div className={`h-screen w-screen flex items-center justify-center bg-${colors.background} text-${colors.text}`}>
      <div className={`p-8 rounded-3xl w-full max-w-sm bg-${colors.card}`}>
        {/* Logo */}
        <div className="text-center mb-8">
          <h5 className="font-bold text-xl">
            Login to <span className={`text-${colors.primary}`}>FinFlow</span>
          </h5>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm mb-1">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full p-3 rounded-md border bg-transparent border-${colors.primaryDark} text-${colors.text}`}
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm mb-1">Password</label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-3 rounded-md border bg-transparent border-${colors.primaryDark} text-${colors.text}`}
            />
            <div
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={handleClickShowPassword}
            >
              {showPassword ? (
                <FaEyeSlash size={20} className={`text-${colors.text}`} />
              ) : (
                <FaEye size={20} className={`text-${colors.text}`} />
              )}
            </div>
          </div>
        </div>

        {/* Role Selector */}
        <div className="mb-4">
          <label htmlFor="role" className="block text-sm mb-1">Select Role</label>
          <select
            id="role"
            value={role}
            onChange={handleRoleChange}
            className={`w-full p-3 rounded-md border bg-transparent border-${colors.primaryDark} text-${colors.text}`}
          >
            <option value="user">User</option>
            <option value="employee">Employee</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 rounded-md bg-red-500 text-white text-sm">
            {error}
          </div>
        )}

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className={`w-full py-3 rounded-md hover:opacity-100 hover:text-white opacity-95 transition duration-200 ease-in-out font-semibold`}
          style={{ backgroundColor: colors.primary }}
        >
          Login as {role.charAt(0).toUpperCase() + role.slice(1)}
        </button>

        {/* Footer Actions */}
        <div className={`mt-4 flex justify-between text-sm text-${colors.text}`}>
          <span className="cursor-pointer">Forgot Password?</span>
          <span className="cursor-pointer" onClick={()=>navigate("/register")}>Create Account</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
