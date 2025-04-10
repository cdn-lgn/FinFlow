import React, { useContext } from "react";
import { Box, Typography, Avatar, Grid, Button, Paper } from "@mui/material";
import { motion } from "framer-motion";
import { ThemeContext } from "../../../context/ThemeContext";

const Profile = () => {
  const { colors } = useContext(ThemeContext);

  // Dummy user data
  const user = {
    name: "Logan Raj",
    email: "logan@example.com",
    phone: "+91 9876543210",
    pan: "ABCDE1234F",
    dob: "1998-05-15",
    photo: "https://i.pravatar.cc/150?img=32",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box p={4} width="100%">
        <Typography variant="h4" fontWeight={600} color={colors.primaryDark} mb={2}>
          Profile 💁‍♂️
        </Typography>

        <Paper
          elevation={4}
          sx={{
            bgcolor: colors.card,
            color: colors.text,
            p: 4,
            borderRadius: 3,
          }}
        >
          <Grid container spacing={4}>
            <Grid item xs={12} md={4} textAlign="center">
              <Avatar
                src={user.photo}
                alt={user.name}
                sx={{
                  width: 120,
                  height: 120,
                  margin: "0 auto",
                  border: `3px solid ${colors.primary}`,
                }}
              />
              <Typography mt={2} fontWeight={600} fontSize={18}>
                {user.name}
              </Typography>
              <Button
                variant="contained"
                sx={{ mt: 2, bgcolor: colors.primary }}
              >
                Edit Profile
              </Button>
            </Grid>

            <Grid item xs={12} md={8}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Email
                  </Typography>
                  <Typography>{user.email}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Phone
                  </Typography>
                  <Typography>{user.phone}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" fontWeight={600}>
                    PAN Card
                  </Typography>
                  <Typography>{user.pan}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Date of Birth
                  </Typography>
                  <Typography>{user.dob}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </motion.div>
  );
};

export default Profile;
