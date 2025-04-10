import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Grid,
  Button,
  Paper,
  Divider,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormControl,
} from "@mui/material";
import FaceDetector from "./components/FaceDetector";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    dob: "",
    mobile: "",
    email: "",
    pan: "",
    password: "",
    confirmPassword: "",
  });

  const [userFace, setUserFace] = useState(null);
  const [mobileVerified, setMobileVerified] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isImageCaptured, setIsImageCaptured] = useState(true); // for controlling popup
  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleVerify = (field) => {
    if (field === "mobile") setMobileVerified(true);
    else if (field === "email") setEmailVerified(true);
  };

  const handleSubmit = () => {
    console.log({ ...formData, userFace });
    alert("Account Created Successfully!");
  };

  if ( !isImageCaptured) {
    return (
      <FaceDetector
        setUserFace={setUserFace}
        isImageCaptured={isImageCaptured}
        setIsImageCaptured={setIsImageCaptured}
      />
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: "#f4f6f8",
        minHeight: "100vh",
        py: 5,
        px: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: "100%",
          maxWidth: 1000,
          p: 5,
          borderRadius: 4,
          backgroundColor: "#fff",
        }}
      >
        <Typography
          variant="h4"
          textAlign="center"
          gutterBottom
          fontWeight={600}
        >
          Create Your FinFlow Account
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Grid container spacing={3}>
          {/* Left Side */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" mb={2}>
              Personal Information
            </Typography>
            <TextField
              fullWidth
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              margin="normal"
              size="small"
            />
            <TextField
              fullWidth
              label="Father's Name"
              name="fatherName"
              value={formData.fatherName}
              onChange={handleChange}
              margin="normal"
              size="small"
            />
            <TextField
              fullWidth
              label="Date of Birth"
              name="dob"
              type="date"
              value={formData.dob}
              onChange={handleChange}
              margin="normal"
              size="small"
            />
            <TextField
              fullWidth
              label="PAN Card Number"
              name="pan"
              value={formData.pan}
              onChange={handleChange}
              margin="normal"
              size="small"
            />
          </Grid>

          {/* Right Side */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" mb={2}>
              Contact & Verification
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  label="Mobile Number"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  size="small"
                />
              </Grid>
              <Grid item xs={4}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => handleVerify("mobile")}
                  sx={{
                    backgroundColor: mobileVerified ? "#28a745" : "#007BFF",
                  }}
                  size="small"
                >
                  {mobileVerified ? "Verified" : "Verify"}
                </Button>
              </Grid>

              <Grid item xs={8}>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  size="small"
                />
              </Grid>
              <Grid item xs={4}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => handleVerify("email")}
                  sx={{
                    backgroundColor: emailVerified ? "#28a745" : "#007BFF",
                  }}
                  size="small"
                >
                  {emailVerified ? "Verified" : "Verify"}
                </Button>
              </Grid>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", lg: "row" },
                  gap: 2,
                  mt: 2,
                }}
              >
                {/* Password Field */}
                <Box sx={{ width: { xs: "100%", lg: "50%" } }}>
                  <Typography fontSize={14} fontWeight={600} mb={0.5}>
                    Password
                  </Typography>
                  <OutlinedInput
                    fullWidth
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter Password"
                    onChange={handleChange}
                    size="small"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          edge="end"
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    sx={{
                      borderRadius: 1,
                      border: "1px solid #ccc",
                      px: 1,
                    }}
                  />
                </Box>

                {/* Confirm Password Field */}
                <Box sx={{ width: { xs: "100%", lg: "50%" } }}>
                  <Typography fontSize={14} fontWeight={600} mb={0.5}>
                    Confirm Password
                  </Typography>
                  <OutlinedInput
                    fullWidth
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    onChange={handleChange}
                    size="small"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowConfirmPassword}
                          edge="end"
                          aria-label={
                            showConfirmPassword
                              ? "Hide Confirm Password"
                              : "Show Confirm Password"
                          }
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    sx={{
                      borderRadius: 1,
                      border: "1px solid #ccc",
                      px: 1,
                    }}
                  />
                </Box>
              </Box>
            </Grid>

            {/* Face Verification Section */}
            <Box mt={4}>
              <Typography variant="h6" mb={1}>
                Photo
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Box
                  component="img"
                  sx={{
                    height: 150,
                    width: 150,
                    maxHeight: { xs: 150, md: 150 },
                    maxWidth: { xs: 150, md: 150 },
                    borderRadius: 5,
                    backgroundColor: "black",
                  }}
                  src={userFace}
                />
                <Box textAlign="center" mt={2}>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setIsImageCaptured(false);
                    }}
                    sx={{
                      px: 4,
                      py: 1,
                      fontWeight: 600,
                      borderColor: userFace ? "green" : "#007BFF",
                      color: userFace ? "green" : "#007BFF",
                      "&:hover": {
                        backgroundColor: userFace ? "green" : "#007BFF",
                        color: "#fff",
                      },
                    }}
                  >
                    Verify Face
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Box textAlign="center" mt={4}>
              <Button
                variant="contained"
                size="large"
                onClick={handleSubmit}
                disabled={!userFace || !mobileVerified || !emailVerified}
                sx={{
                  backgroundColor: "#007BFF",
                  color: "#fff",
                  px: 6,
                  py: 1.5,
                  fontSize: "16px",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#0056b3",
                  },
                }}
              >
                Create Account
              </Button>

              <Typography
                textAlign="center"
                mt={2}
                fontStyle="italic"
                color="gray"
              ></Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Signup;
