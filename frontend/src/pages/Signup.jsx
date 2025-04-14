import React, { useState, useEffect } from "react";
import FaceDetector from "./components/FaceDetector";

const colors = {
  primary: "#007BFF",
  primaryDark: "#0056b3",
  success: "#28A745",
  warning: "#FFC107",
  danger: "#DC3545",
  background: "#F8F9FA",
  card: "#FFFFFF",
  text: "#212529",
  gradient: "linear-gradient(90deg, #007BFF 0%, #3399FF 100%)",
};

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
    addressLine: "",
    city: "",
    pincode: "",
    longitude: "",
    latitude: "",
    country: "India", // Default to India
  });

  const [userFace, setUserFace] = useState(null);
  const [mobileVerified, setMobileVerified] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isImageCaptured, setIsImageCaptured] = useState(true);
  const [dobError, setDobError] = useState("");

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "pincode" && value.length > 6) {
      return; // Prevent entering more than 6 digits
    }

    setFormData({ ...formData, [name]: value });
  };

  // Handle mobile/email verification
  const handleVerify = (field) => {
    if (field === "mobile") setMobileVerified(true);
    else if (field === "email") setEmailVerified(true);
  };

  // Auto fetch location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData((prev) => ({
          ...prev,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }));
      },
      (err) => {
        console.error("Location Error:", err);
      }
    );
  }, []);

  //DOB Validation
  const validateDOB = (dob) => {
    if (!dob) {
      setDobError("Date of Birth is required");
      return false;
    }

    const birthDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();

    if (age < 18) {
      setDobError("You must be at least 18 years old");
      return false;
    }

    setDobError("");
    return true;
  };

  const handleSubmit = () => {
    if (!validateDOB(formData.dob)) {
      return;
    }

    const finalData = {
      fullName: formData.name,
      fatherName: formData.fatherName,
      dob: formData.dob,
      phoneNumber: formData.mobile,
      email: formData.email,
      pan: formData.pan,
      password: formData.password,
      photoUrl: userFace,
      address: {
        addressLine: formData.addressLine,
        city: formData.city,
        pincode: formData.pincode,
        country: formData.country,
      },
      createdLocation: {
        longitude: parseFloat(formData.longitude),
        latitude: parseFloat(formData.latitude),
      },
    };
    console.log("User Submitted Data 👉", finalData);
    alert("Account Created Successfully!");
  };

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((prev) => !prev);

  const isFormValid =
    formData.name &&
    formData.fatherName &&
    formData.dob &&
    formData.mobile &&
    formData.email &&
    formData.pan &&
    formData.password &&
    formData.confirmPassword &&
    formData.addressLine &&
    formData.city &&
    formData.pincode &&
    userFace &&
    mobileVerified &&
    emailVerified &&
    !dobError;

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
    <Box
      sx={{
        width: "100vw",
        minHeight: "100dvh",
        bgcolor: colors.background,
        color: colors.text,
        display: "flex",
        flexDirection: "column",
        alignItems: "center", // Center horizontally
        paddingY: 4,
        paddingX: 4,
      }}
    >
      <Typography align="center" variant="h4">
        <b style={{ color: colors.primaryDark }}>FinFlow </b>Registration
      </Typography>
      <Box
        sx={{
          width: "100%",
          maxWidth: 800, // Added maximum width for better readability
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingY: 3,
        }}
      >
        <Divider
          variant="middle"
          orientation="horizontal"
          sx={{ width: "90%", bgcolor: colors.text }}
        ></Divider>
      </Box>

      <Grid container spacing={4} maxWidth={800}>
        {/* Left */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6">Personal Info</Typography>
          <TextField
            fullWidth
            required
            name="name"
            label="Full Name"
            size="small"
            value={formData.name}
            onChange={handleChange}
            sx={{ mt: 2, bgcolor: colors.card, input: { color: colors.text } }}
          />
          <TextField
            fullWidth
            name="fatherName"
            label="Father's Name"
            size="small"
            value={formData.fatherName}
            onChange={handleChange}
            sx={{ mt: 2, bgcolor: colors.card, input: { color: colors.text } }}
          />
          <TextField
            fullWidth
            name="dob"
            label="Date of Birth"
            type="date"
            size="small"
            value={formData.dob}
            onChange={handleChange}
            error={!!dobError}
            helperText={dobError}
            sx={{
              mt: 2,
              bgcolor: colors.card,
              input: { color: colors.text },
              "& .MuiInputLabel-root": { top: "-8px" },
            }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            name="pan"
            label="PAN Number"
            size="small"
            value={formData.pan}
            onChange={handleChange}
            sx={{ mt: 2, bgcolor: colors.card, input: { color: colors.text } }}
          />

          <Typography variant="h6" sx={{ mt: 4 }}>
            Address Info
          </Typography>
          <TextField
            fullWidth
            name="addressLine"
            label="Address Line"
            size="small"
            value={formData.addressLine}
            onChange={handleChange}
            sx={{ mt: 2, bgcolor: colors.card, input: { color: colors.text } }}
          />
          <TextField
            fullWidth
            name="city"
            label="City"
            size="small"
            value={formData.city}
            onChange={handleChange}
            sx={{ mt: 2, bgcolor: colors.card, input: { color: colors.text } }}
          />
          <TextField
            fullWidth
            name="pincode"
            label="Pincode"
            size="small"
            value={formData.pincode}
            onChange={handleChange}
            inputProps={{ maxLength: 6, inputMode: "numeric", pattern: "[0-9]*" }} // Limit to 6 digits and numeric input
            sx={{ mt: 2, bgcolor: colors.card, input: { color: colors.text } }}
          />
        </Grid>

        {/* Right */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6">Contact Info</Typography>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={8}>
              <TextField
                fullWidth
                name="mobile"
                label="Mobile Number"
                size="small"
                value={formData.mobile}
                onChange={handleChange}
                sx={{ bgcolor: colors.card, input: { color: colors.text } }}
              />
            </Grid>
            <Grid item xs={4}>
              <Button
                fullWidth
                size="small"
                variant="contained"
                onClick={() => handleVerify("mobile")}
                sx={{
                  bgcolor: mobileVerified ? colors.success : colors.primary,
                }}
              >
                {mobileVerified ? "Verified" : "Verify"}
              </Button>
            </Grid>

            <Grid item xs={8}>
              <TextField
                fullWidth
                name="email"
                label="Email"
                size="small"
                value={formData.email}
                onChange={handleChange}
                sx={{ bgcolor: colors.card, input: { color: colors.text } }}
              />
            </Grid>
            <Grid item xs={4}>
              <Button
                fullWidth
                size="small"
                variant="contained"
                onClick={() => handleVerify("email")}
                sx={{
                  bgcolor: emailVerified ? colors.success : colors.primary,
                }}
              >
                {emailVerified ? "Verified" : "Verify"}
              </Button>
            </Grid>
          </Grid>

          <Typography variant="h6" mt={4}>
            Set Password
          </Typography>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={6}>
              <OutlinedInput
                fullWidth
                name="password"
                placeholder="Password"
                size="small"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                sx={{ bgcolor: colors.card, color: colors.text }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </Grid>
            <Grid item xs={6}>
              <OutlinedInput
                fullWidth
                name="confirmPassword"
                placeholder="Confirm Password"
                size="small"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                sx={{ bgcolor: colors.card, color: colors.text }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowConfirmPassword}>
                      {showConfirmPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </Grid>
          </Grid>

          <Box mt={4}>
            <Typography variant="h6" mb={1}>
              Face Verification
            </Typography>
            <Box display="flex" alignItems="center" gap={2}>
              <Box
                component="img"
                sx={{
                  height: 150,
                  width: 150,
                  borderRadius: 5,
                  backgroundColor: "black",
                }}
                src={userFace}
              />
              <Button
                variant="outlined"
                onClick={() => setIsImageCaptured(false)}
                sx={{
                  px: 4,
                  py: 1,
                  fontWeight: 600,
                  borderColor: userFace ? "green" : colors.primary,
                  color: userFace ? "green" : colors.primary,
                  "&:hover": {
                    backgroundColor: userFace ? "green" : colors.primary,
                    color: "#fff",
                  },
                }}
              >
                Verify Face
              </Button>
            </Box>
          </Box>
        </Grid>

        {/* Submit */}
        <Grid item xs={12}>
          <Box textAlign="center" mt={4}>
            <Button
              variant="contained"
              size="large"
              onClick={handleSubmit}
              disabled={!isFormValid}
              sx={{
                backgroundColor: colors.primary,
                px: 6,
                py: 1.5,
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              Create Account
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Signup;
