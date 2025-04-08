import React, { useContext } from "react";
import { Typography, Box, Grid, Paper } from "@mui/material";
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LockIcon from '@mui/icons-material/Lock';
import BoltIcon from '@mui/icons-material/Bolt';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { ThemeContext } from "../../context/ThemeContext";

export default function FeaturesSection() {
  const { colors } = useContext(ThemeContext);

  
  const iconProps = {
    fontSize: "large",
    sx: { color: colors.primary },
  };

  const features = [
    {
      icon: <CreditCardIcon {...iconProps} />,
      title: "Virtual Banking",
      desc: "No physical cards, 100% online experience.",
    },
    {
      icon: <LockIcon {...iconProps} />,
      title: "Encrypted & Secure",
      desc: "Your data is safe & sound, just like your secrets 😉",
    },
    {
      icon: <BoltIcon {...iconProps} />,
      title: "Instant Transfers",
      desc: "Lightning fast money moves ⚡",
    },
    {
      icon: <QueryStatsIcon {...iconProps} />,
      title: "Real-time Analytics",
      desc: "Keep track of your finances live.",
    },
    {
      icon: <VerifiedUserIcon {...iconProps} />,
      title: "Employee Verification",
      desc: "Verified support when you need it.",
    },
  ];

  return (
    <Box
      sx={{
        py: 10,
        bgcolor: colors.background,
        color: colors.text,
        minHeight: "100vh",
      }}
    >
      <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
        Why Choose <span style={{ color: colors.primary }}>FinFlow</span>?
      </Typography>

      <Grid container spacing={4} justifyContent="center" sx={{ px: 4, mt: 4 }}>
        {features.map((item, index) => (
          <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                textAlign: "center",
                borderRadius: 4,
                bgcolor: colors.card,
                color: colors.text,
                transition: "0.3s",
                "&:hover": {
                  boxShadow: `0 0 15px ${colors.primary}`,
                  transform: "scale(1.05)",
                },
              }}
            >
              <Box mb={3}>{item.icon}</Box>
              <Typography variant="h6" fontWeight="600">
                {item.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: colors.text, mt: 2 }}
              >
                {item.desc}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
