import React, { useContext } from 'react';
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer
} from '@mui/material';
import { motion } from 'framer-motion';
import { ThemeContext } from '../../../context/ThemeContext';

const users = [
  {
    id: 1,
    name: "Aarav Sharma",
    email: "aarav@example.com",
    photo: "https://randomuser.me/api/portraits/men/75.jpg",
    status: "verified",
  },
  {
    id: 2,
    name: "Neha Kapoor",
    email: "neha@example.com",
    photo: "https://randomuser.me/api/portraits/women/65.jpg",
    status: "pending",
  },
  {
    id: 3,
    name: "Rohit Mehta",
    email: "rohit@example.com",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    status: "verified",
  },
];

const UserList = () => {
  const { colors } = useContext(ThemeContext);

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, x: -30 }}
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
        User List 📋
      </Typography>

      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: colors.card,
          borderRadius: 3,
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', color: colors.text }}>Avatar</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: colors.text }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: colors.text }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: colors.text }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Avatar src={user.photo} alt={user.name} />
                </TableCell>
                <TableCell sx={{ color: colors.text }}>{user.name}</TableCell>
                <TableCell sx={{ color: colors.text }}>{user.email}</TableCell>
                <TableCell
                  sx={{
                    color:
                      user.status === "verified"
                        ? colors.success
                        : colors.warning,
                    fontWeight: 600,
                  }}
                >
                  {user.status.toUpperCase()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserList;
