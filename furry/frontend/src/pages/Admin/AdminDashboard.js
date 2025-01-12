import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  CssBaseline,
  Box,
  useTheme,
  ListItemIcon,
  Divider,
} from '@mui/material';
import {
  Work as WorkIcon,
  VolunteerActivism as VolunteerIcon,
  Pets as PetsIcon,
  Settings as SettingsIcon,
  ExitToApp as LogoutIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const menuItems = [
  { text: "Manage Work", icon: <WorkIcon /> },
  { text: "Manage Volunteer", icon: <VolunteerIcon /> },
  { text: "Manage Rescue", icon: <PetsIcon /> },
  { text: "Manage Gallery", icon: <PetsIcon /> },
  { text: "Manage Donation", icon: <PetsIcon /> },
  { text: "Manage Pet Dog", icon: <PetsIcon /> },
  { text: "Manage Pet Request", icon: <PetsIcon /> },
  { text: "Manage Vaccination", icon: <PetsIcon /> },
  { text: "Manage Veterinary", icon: <PetsIcon /> },
  { text: "User Data", icon: <SettingsIcon /> },
];

const drawerWidth = 280;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleMenuItemClick = (index) => {
    setSelectedIndex(index);
    const menuItem = menuItems[index].text.toLowerCase().replace(/\s/g, '-');
    navigate(`/admin/${menuItem}`);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f4f4f9' }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#2c3e50',
            color: '#ecf0f1',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {menuItems.map((item, index) => (
              <ListItem
                button
                key={index}
                onClick={() => handleMenuItemClick(index)}
                selected={index === selectedIndex}
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: '#34495e',
                    color: '#1abc9c',
                  },
                  '&.Mui-selected:hover': {
                    backgroundColor: '#1abc9c',
                    color: '#fff',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: index === selectedIndex ? '#1abc9c' : '#ecf0f1',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
        <Divider />
        <List>
          <ListItem button onClick={handleLogout}>
            <ListItemIcon sx={{ color: '#e74c3c' }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          padding: theme.spacing(3),
          background: 'linear-gradient(135deg, #ecf0f1, #bdc3c7)',
          minHeight: '100vh',
        }}
      >
        <AppBar
          position="fixed"
          sx={{
            zIndex: theme.zIndex.drawer + 1,
            backgroundColor: '#1abc9c',
            color: '#fff',
            boxShadow: 'none',
          }}
        >
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Admin Dashboard
            </Typography>
            <Button
              color="inherit"
              onClick={handleLogout}
              sx={{
                backgroundColor: '#e74c3c',
                color: '#fff',
                '&:hover': { backgroundColor: '#c0392b' },
              }}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        <Toolbar />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 5,
          }}
        >
          <img
            src={`${process.env.PUBLIC_URL}/admin img.png`}
            alt="Admin Illustration"
            style={{
              width: '300px',
              maxWidth: '100%',
              height: 'auto',
              borderRadius: '15px',
              marginBottom: '20px',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
            }}
          />
          <Typography variant="h4" sx={{ textAlign: 'center', color: '#34495e', marginTop: 3 }}>
            Welcome to Admin Dashboard
          </Typography>
          <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 1, color: '#7f8c8d' }}>
            Select a menu item to manage your application.
          </Typography>
        </Box>
      </Box>
    </div>
  );
};

export default AdminDashboard;
