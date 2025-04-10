import React, { useContext } from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { ThemeContext } from '../../../context/ThemeContext';
import DashboardIcon from '@mui/icons-material/Dashboard';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import PeopleIcon from '@mui/icons-material/People';

const EmployeeDashboard = () => {
  const { colors } = useContext(ThemeContext);

  const cards = [
    {
      title: "Total Users",
      value: 128,
      icon: <PeopleIcon fontSize="large" />,
    },
    {
      title: "Pending Verifications",
      value: 12,
      icon: <VerifiedUserIcon fontSize="large" />,
    },
    {
      title: "Total Tasks",
      value: 34,
      icon: <DashboardIcon fontSize="large" />,
    },
  ];

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      sx={{
        flexGrow: 1,
        p: 4,
        width: '100%',
        overflowY: 'auto',
      }}
    >
      <Typography variant="h4" fontWeight={600} mb={4}>
        Welcome, Employee 💼
      </Typography>

      <Grid container spacing={3}>
        {cards.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper
              elevation={4}
              sx={{
                p: 3,
                borderRadius: 3,
                backgroundColor: colors.card,
                color: colors.text,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: 2,
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.03)',
                  boxShadow: `0px 4px 20px ${colors.primary}`,
                },
              }}
              component={motion.div}
              whileHover={{ scale: 1.05 }}
            >
              <Box sx={{ color: colors.primary }}>{card.icon}</Box>
              <Typography variant="h6" fontWeight={600}>
                {card.title}
              </Typography>
              <Typography variant="h4" fontWeight={700}>
                {card.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default EmployeeDashboard;
