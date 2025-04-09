// File: src/pages/Login.jsx

import React, { useContext, useState } from 'react';
import {
  Box, TextField, Button, Typography, InputAdornment,
  IconButton, Paper, MenuItem, Select, FormControl, InputLabel
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
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
    <Box
      className="h-screen w-screen flex items-center justify-center"
      sx={{ bgcolor: colors.background, color: colors.text }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 4,
          borderRadius: 3,
          width: '90%',
          maxWidth: 400,
          bgcolor: colors.card,
        }}
      >
        {/* Logo */}
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <img
            src={logoPath}
            alt="FinFlow Logo"
            style={{ width: '100px', marginBottom: 8 }}
          />
          <Typography variant="h5" fontWeight="bold">
            Login to <span style={{ color: colors.primary }}>FinFlow</span>
          </Typography>
        </Box>

        {/* Email */}
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          InputLabelProps={{ style: { color: colors.text } }}
          InputProps={{
            style: { color: colors.text },
          }}
        />

        {/* Password */}
        <TextField
          label="Password"
          type={showPassword ? 'text' : 'password'}
          variant="outlined"
          fullWidth
          margin="normal"
          InputLabelProps={{ style: { color: colors.text } }}
          InputProps={{
            style: { color: colors.text },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* Role Selector */}
        <FormControl fullWidth margin="normal">
          <InputLabel sx={{ color: colors.text }}>Select Role</InputLabel>
          <Select
            value={role}
            onChange={handleRoleChange}
            label="Select Role"
            sx={{
              color: colors.text,
              '.MuiOutlinedInput-notchedOutline': { borderColor: colors.primaryDark },
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: colors.primary },
              '.MuiSvgIcon-root ': { fill: colors.text }
            }}
          >
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="employee">Employee</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </Select>
        </FormControl>

        {/* Login Button */}
        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            bgcolor: colors.primary,
            color: "#fff",
            '&:hover': { bgcolor: colors.primaryDark }
          }}
        >
          Login as {role.charAt(0).toUpperCase() + role.slice(1)}
        </Button>

        {/* Footer Actions */}
        <Box mt={2} display="flex" justifyContent="space-between">
          <Typography variant="body2" sx={{ color: colors.text, cursor: 'pointer' }}>
            Forgot Password?
          </Typography>
          <Typography variant="body2" sx={{ color: colors.text, cursor: 'pointer' }}>
            Create Account
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
