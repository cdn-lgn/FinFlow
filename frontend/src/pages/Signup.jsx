// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   TextField,
//   Grid,
//   Button,
//   Paper,
//   Divider,
//   InputLabel,
//   OutlinedInput,
//   InputAdornment,
//   IconButton,
// } from "@mui/material";
// import FaceDetector from "./components/FaceDetector";
// import { Visibility, VisibilityOff } from "@mui/icons-material";

// const Signup = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     fatherName: "",
//     dob: "",
//     mobile: "",
//     email: "",
//     pan: "",
//     password: "",
//     confirmPassword: "",
//     addressLine: "",
//     city: "",
//     pincode: "",
//     country: "",
//     longitude: "",
//     latitude: "",
//   });

//   const [userFace, setUserFace] = useState(null);
//   const [mobileVerified, setMobileVerified] = useState(false);
//   const [emailVerified, setEmailVerified] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [isImageCaptured, setIsImageCaptured] = useState(true);

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleVerify = (field) => {
//     if (field === "mobile") setMobileVerified(true);
//     else if (field === "email") setEmailVerified(true);
//   };

//   const handleSubmit = () => {
//     const finalData = {
//       fullName: formData.name,
//       fatherName: formData.fatherName,
//       dob: formData.dob,
//       phoneNumber: formData.mobile,
//       email: formData.email,
//       pan: formData.pan,
//       password: formData.password,
//       photoUrl: userFace,
//       address: {
//         addressLine: formData.addressLine,
//         city: formData.city,
//         pincode: formData.pincode,
//         country: formData.country,
//       },
//       createdLocation: {
//         longitude: parseFloat(formData.longitude),
//         latitude: parseFloat(formData.latitude),
//       },
//     };

//     console.log("User Submitted Data 👉", finalData);
//     alert("Account Created Successfully!");
//   };

//   const handleClickShowPassword = () => setShowPassword((prev) => !prev);
//   const handleClickShowConfirmPassword = () =>
//     setShowConfirmPassword((prev) => !prev);

//   if (!isImageCaptured) {
//     return (
//       <FaceDetector
//         setUserFace={setUserFace}
//         isImageCaptured={isImageCaptured}
//         setIsImageCaptured={setIsImageCaptured}
//       />
//     );
//   }

//   return (
//     <Box
//       sx={{
//         backgroundColor: "#f4f6f8",
//         minHeight: "100vh",
//         py: 5,
//         px: 2,
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <Paper
//         elevation={6}
//         sx={{
//           width: "100%",
//           maxWidth: 1100,
//           p: 5,
//           borderRadius: 4,
//           backgroundColor: "#fff",
//         }}
//       >
//         <Typography
//           variant="h4"
//           textAlign="center"
//           gutterBottom
//           fontWeight={600}
//         >
//           Create Your FinFlow Account
//         </Typography>

//         <Divider sx={{ my: 3 }} />

//         <Grid container spacing={3}>
//           {/* Left Column */}
//           <Grid item xs={12} md={6}>
//             <Typography variant="h6" mb={2}>
//               Personal Details
//             </Typography>
//             <TextField
//               fullWidth
//               label="Full Name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               margin="normal"
//               size="small"
//             />
//             <TextField
//               fullWidth
//               label="Father's Name"
//               name="fatherName"
//               value={formData.fatherName}
//               onChange={handleChange}
//               margin="normal"
//               size="small"
//             />
//             <TextField
//               fullWidth
//               label="Date of Birth"
//               name="dob"
//               type="date"
//               value={formData.dob}
//               onChange={handleChange}
//               margin="normal"
//               size="small"
//             />
//             <TextField
//               fullWidth
//               label="PAN Card Number"
//               name="pan"
//               value={formData.pan}
//               onChange={handleChange}
//               margin="normal"
//               size="small"
//             />

//             <Typography variant="h6" mt={3} mb={2}>
//               Address
//             </Typography>
//             <TextField
//               fullWidth
//               label="Address Line"
//               name="addressLine"
//               value={formData.addressLine}
//               onChange={handleChange}
//               margin="normal"
//               size="small"
//             />
//             <TextField
//               fullWidth
//               label="City"
//               name="city"
//               value={formData.city}
//               onChange={handleChange}
//               margin="normal"
//               size="small"
//             />
//             <TextField
//               fullWidth
//               label="Pincode"
//               name="pincode"
//               value={formData.pincode}
//               onChange={handleChange}
//               margin="normal"
//               size="small"
//             />
//             <TextField
//               fullWidth
//               label="Country"
//               name="country"
//               value={formData.country}
//               onChange={handleChange}
//               margin="normal"
//               size="small"
//             />
//           </Grid>

//           {/* Right Column */}
//           <Grid item xs={12} md={6}>
//             <Typography variant="h6" mb={2}>
//               Contact & Security
//             </Typography>
//             <Grid container spacing={2}>
//               <Grid item xs={8}>
//                 <TextField
//                   fullWidth
//                   label="Mobile Number"
//                   name="mobile"
//                   value={formData.mobile}
//                   onChange={handleChange}
//                   size="small"
//                 />
//               </Grid>
//               <Grid item xs={4}>
//                 <Button
//                   variant="contained"
//                   fullWidth
//                   onClick={() => handleVerify("mobile")}
//                   sx={{
//                     backgroundColor: mobileVerified ? "#28a745" : "#007BFF",
//                   }}
//                   size="small"
//                 >
//                   {mobileVerified ? "Verified" : "Verify"}
//                 </Button>
//               </Grid>

//               <Grid item xs={8}>
//                 <TextField
//                   fullWidth
//                   label="Email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   size="small"
//                 />
//               </Grid>
//               <Grid item xs={4}>
//                 <Button
//                   variant="contained"
//                   fullWidth
//                   onClick={() => handleVerify("email")}
//                   sx={{
//                     backgroundColor: emailVerified ? "#28a745" : "#007BFF",
//                   }}
//                   size="small"
//                 >
//                   {emailVerified ? "Verified" : "Verify"}
//                 </Button>
//               </Grid>
//             </Grid>

//             <Typography variant="h6" mt={4}>
//               Location Info
//             </Typography>
//             <TextField
//               fullWidth
//               label="Longitude"
//               name="longitude"
//               value={formData.longitude}
//               onChange={handleChange}
//               margin="normal"
//               size="small"
//             />
//             <TextField
//               fullWidth
//               label="Latitude"
//               name="latitude"
//               value={formData.latitude}
//               onChange={handleChange}
//               margin="normal"
//               size="small"
//             />

//             <Typography variant="h6" mt={4}>
//               Set Password
//             </Typography>
//             <Grid container spacing={2}>
//               <Grid item xs={6}>
//                 <OutlinedInput
//                   fullWidth
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   placeholder="Password"
//                   onChange={handleChange}
//                   size="small"
//                   endAdornment={
//                     <InputAdornment position="end">
//                       <IconButton onClick={handleClickShowPassword}>
//                         {showPassword ? <VisibilityOff /> : <Visibility />}
//                       </IconButton>
//                     </InputAdornment>
//                   }
//                 />
//               </Grid>
//               <Grid item xs={6}>
//                 <OutlinedInput
//                   fullWidth
//                   type={showConfirmPassword ? "text" : "password"}
//                   name="confirmPassword"
//                   placeholder="Confirm Password"
//                   onChange={handleChange}
//                   size="small"
//                   endAdornment={
//                     <InputAdornment position="end">
//                       <IconButton onClick={handleClickShowConfirmPassword}>
//                         {showConfirmPassword ? (
//                           <VisibilityOff />
//                         ) : (
//                           <Visibility />
//                         )}
//                       </IconButton>
//                     </InputAdornment>
//                   }
//                 />
//               </Grid>
//             </Grid>

//             <Box mt={4}>
//               <Typography variant="h6" mb={1}>
//                 Face Verification
//               </Typography>
//               <Box display="flex" alignItems="center" gap={2}>
//                 <Box
//                   component="img"
//                   sx={{
//                     height: 150,
//                     width: 150,
//                     borderRadius: 5,
//                     backgroundColor: "black",
//                   }}
//                   src={userFace}
//                 />
//                 <Button
//                   variant="outlined"
//                   onClick={() => setIsImageCaptured(false)}
//                   sx={{
//                     px: 4,
//                     py: 1,
//                     fontWeight: 600,
//                     borderColor: userFace ? "green" : "#007BFF",
//                     color: userFace ? "green" : "#007BFF",
//                     "&:hover": {
//                       backgroundColor: userFace ? "green" : "#007BFF",
//                       color: "#fff",
//                     },
//                   }}
//                 >
//                   Verify Face
//                 </Button>
//               </Box>
//             </Box>
//           </Grid>

//           {/* Submit */}
//           <Grid item xs={12}>
//             <Box textAlign="center" mt={4}>
//               <Button
//                 variant="contained"
//                 size="large"
//                 onClick={handleSubmit}
//                 disabled={!userFace || !mobileVerified || !emailVerified}
//                 sx={{
//                   backgroundColor: "#007BFF",
//                   px: 6,
//                   py: 1.5,
//                   fontSize: "16px",
//                   fontWeight: "bold",
//                 }}
//               >
//                 Create Account
//               </Button>
//             </Box>
//           </Grid>
//         </Grid>
//       </Paper>
//     </Box>
//   );
// };

// export default Signup;

import { Box, Divider, Grid, TextField, Typography } from "@mui/material";
import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const Signup = () => {
  const { colors } = useContext(ThemeContext);
  return (
    <Box
      sx={{
        width: "100vw",
        minHeight: "100dvh",
        bgcolor: colors.background,
        color: colors.text,
        display: "flex",
        flexDirection: "column",
        alignItems: "left",
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
      <Box sx={{ width: "100%", color: colors.text }}>
        <Grid container spacing={2}>
          <Grid>
            <Box>
              <Typography fontWeight="medium" variant="h5">
                Personal Information
              </Typography>
            </Box>
            <Grid sx={{ p: 4, width: "100%", spacing: 2 }}>
              <TextField
                required
                sx={{ input: { color: colors.text }, bgcolor: colors.card }}
                variant="outlined"
                label="Full Name"
                size="small"
              />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Signup;
