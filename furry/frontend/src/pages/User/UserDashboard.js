import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box, Grid, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  // Fetch username from the backend
  const fetchUsername = async () => {
    try {
        // Assuming `id` is stored in localStorage after login
        const userId = localStorage.getItem('userId');
        if (!userId) {
            console.error('No userId found in localStorage.');
            return;
        }

        const response = await fetch(`http://localhost:5000/api/get-username/${userId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setUsername(data.username);
    } catch (error) {
        console.error('Failed to fetch username:', error);
    }
};

useEffect(() => {
    fetchUsername();
}, []);


  // Handle logout and navigate to the login page
  const handleLogout = () => {
    navigate("/login");
  };

  // Menu items for navigation
  const menuItems = [
    { label: "View Work", path: "user/view-work" },
    { label: "Add Rescue", path: "user/add-rescue" },
    { label: "View Gallery", path: "user/view-gallery" },
    { label: "Add Donation", path: "user/add-donation" },
    { label: "View Adopt Pet", path: "user/view-adopt-pet" },
    { label: "Manage Pet Request", path: "user/manage-pet-request" },
    { label: "View Vaccination", path: "user/view-vaccination" },
    { label: "View Veterinary", path: "user/view-veterinary" },
    { label: "Settings", path: "user/settings" },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e0eafc, #cfdef3)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <AppBar
        position="static"
        sx={{
          background: "#5d34ac",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              fontWeight: "bold",
              textTransform: "uppercase",
              letterSpacing: "2px",
            }}
          >
            User Dashboard
          </Typography>
          <Button
            color="inherit"
            onClick={handleLogout}
            sx={{
              fontWeight: "bold",
              textTransform: "none",
              "&:hover": { color: "#f1f1f1" },
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Box
        component={Paper}
        elevation={10}
        sx={{
          padding: "3rem",
          maxWidth: "900px",
          margin: "3rem auto",
          borderRadius: "20px",
          background: "linear-gradient(135deg, #ffffff, #f8f9fa)",
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "#444",
            textTransform: "uppercase",
          }}
        >
          Welcome to Your Dashboard
        </Typography>
        <Typography
          variant="h6"
          align="center"
          gutterBottom
          sx={{ color: "#666", marginBottom: "2rem" }}
        >
          Hello, {username ? username : "User"}!
        </Typography>
        <Typography
          variant="body1"
          align="center"
          gutterBottom
          sx={{ color: "#666", marginBottom: "2rem" }}
        >
          Navigate through the menu below to manage your activities effectively.
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {menuItems.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Button
                variant="contained"
                fullWidth
                onClick={() => navigate(item.path)}
                sx={{
                  textTransform: "none",
                  background: "linear-gradient(145deg, #5d34ac, #9e54ff)",
                  color: "#fff",
                  padding: "1.2rem",
                  borderRadius: "10px",
                  fontWeight: "bold",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                  transition: "transform 0.3s, box-shadow 0.3s, background 0.3s ease-in-out",
                  "&:hover": {
                    background: "linear-gradient(145deg, #5d34ac, #7438f5)",
                    transform: "translateY(-5px)",
                    boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.3)",
                  },
                }}
              >
                {item.label}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default UserDashboard;
