import React, { useContext } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box
} from '@mui/material';

import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SettingsIcon from '@mui/icons-material/Settings';
import { ThemeContext } from '../../context/ThemeContext';

const Sidebar = ({ role = "user" }) => {
  const { colors } = useContext(ThemeContext);

  const items = {
    user: [
      { icon: <DashboardIcon />, text: "Dashboard" },
      { icon: <PeopleIcon />, text: "Transactions" },
      { icon: <AccountBoxIcon />, text: "Profile" },
    ],
    employee: [
      { icon: <DashboardIcon />, text: "Dashboard" },
      { icon: <PeopleIcon />, text: "Verify Users" },
      { icon: <AccountBoxIcon />, text: "User List" },
    ],
    admin: [
      { icon: <DashboardIcon />, text: "Dashboard" },
      { icon: <PeopleIcon />, text: "Manage Users" },
      { icon: <SettingsIcon />, text: "Settings" },
    ]
  };

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        '& .MuiDrawer-paper': {
          bgcolor: colors.card,
          color: colors.text,
          width: 240,
          borderRight: `1px solid ${colors.primaryDark}`,
        }
      }}
    >
      <Box sx={{ mt: 2 }}>
        <List>
          {items[role]?.map((item, index) => (
            <ListItem
              button
              key={index}
              sx={{
                '&:hover': {
                  bgcolor: colors.primary,
                  color: "#fff",
                  '& .MuiListItemIcon-root': {
                    color: "#fff"
                  }
                }
              }}
            >
              <ListItemIcon sx={{ color: colors.primary }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
