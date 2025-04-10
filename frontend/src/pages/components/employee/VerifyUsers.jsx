import React, { useContext, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Avatar,
  Grid,
} from '@mui/material';
import { motion } from 'framer-motion';
import { ThemeContext } from '../../../context/ThemeContext';

const dummyUsers = [
  {
    id: 1,
    name: "Aarav Sharma",
    email: "aarav@example.com",
    photo: "https://randomuser.me/api/portraits/men/75.jpg",
    status: "pending",
  },
  {
    id: 2,
    name: "Neha Kapoor",
    email: "neha@example.com",
    photo: "https://randomuser.me/api/portraits/women/65.jpg",
    status: "pending",
  },
];

const VerifyUsers = () => {
  const { colors } = useContext(ThemeContext);
  const [users, setUsers] = useState(dummyUsers);

  const handleVerify = (id) => {
    const updated = users.map(user =>
      user.id === id ? { ...user, status: "verified" } : user
    );
    setUsers(updated);
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      sx={{
        flexGrow: 1,
        p: 4,
        width: '100%',
        overflowY: 'auto',
      }}
    >
      <Typography variant="h4" fontWeight={600} mb={4}>
        Verify Users ✅
      </Typography>

      <Grid container spacing={3}>
        {users.map((user) => (
          <Grid item xs={12} md={6} key={user.id}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                borderRadius: 3,
                backgroundColor: colors.card,
                color: colors.text,
              }}
              component={motion.div}
              whileHover={{ scale: 1.02 }}
            >
              <Avatar
                src={user.photo}
                alt={user.name}
                sx={{ width: 56, height: 56 }}
              />
              <Box flexGrow={1}>
                <Typography variant="h6">{user.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {user.email}
                </Typography>
              </Box>
              {user.status === "pending" ? (
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: colors.primary,
                    "&:hover": {
                      backgroundColor: colors.primaryDark,
                    },
                  }}
                  onClick={() => handleVerify(user.id)}
                >
                  Verify
                </Button>
              ) : (
                <Typography
                  variant="body2"
                  sx={{ color: colors.success, fontWeight: 600 }}
                >
                  Verified
                </Typography>
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default VerifyUsers;
