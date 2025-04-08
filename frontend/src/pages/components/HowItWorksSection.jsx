import React, { useContext } from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import { motion } from "framer-motion";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { ThemeContext } from "../../context/ThemeContext";

const steps = [
  {
    icon: <PersonAddAltIcon fontSize="large" />,
    title: "Create Account",
    desc: "Sign up with your email & secure password.",
  },
  {
    icon: <VerifiedUserIcon fontSize="large" />,
    title: "Employee Verification",
    desc: "Our staff verifies your identity manually.",
  },
  {
    icon: <AccountBalanceIcon fontSize="large" />,
    title: "Start Banking",
    desc: "Send, receive & manage funds securely.",
  },
];

export default function HowItWorksSection() {
  const { colors } = useContext(ThemeContext);

  return (
    <Box sx={{ py: 10, px: 4, bgcolor: colors.background, color: colors.text }}>
      <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
        How <span style={{ color: colors.primary }}>FinFlow</span> Works
      </Typography>

      <Grid container spacing={4} justifyContent="center" sx={{ mt: 4 }}>
        {steps.map((step, index) => (
          <Grid key={index} item xs={12} sm={6} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Paper
                elevation={4}
                sx={{
                  p: 4,
                  textAlign: "center",
                  borderRadius: 4,
                  bgcolor: colors.card,
                  color: colors.text,
                  transition: "0.3s",
                  "&:hover": {
                    boxShadow: `0 0 12px ${colors.primary}`,
                    transform: "scale(1.03)",
                  },
                }}
              >
                <Box mb={2} sx={{ color: colors.primary }}>
                  {step.icon}
                </Box>
                <Typography variant="h6" fontWeight="600">{step.title}</Typography>
                <Typography variant="body2" mt={2}>{step.desc}</Typography>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
