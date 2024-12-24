import React from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();

  const menuItems = [
    { label: "View Work", path: "/view-work" },
    { label: "Add Rescue", path: "/add-rescue" },
    { label: "View Gallery", path: "/view-gallery" },
    { label: "Add Donation", path: "/add-donation" },
    { label: "View Adopt Pet", path: "/view-adopt-pet" },
    { label: "Manage Pet Request", path: "/manage-pet-request" },
    { label: "View Vaccination", path: "/view-vaccination" },
    { label: "View Veterinary", path: "/view-veterinary" },
    { label: "Settings", path: "/settings" },
  ];

  return (
    <Box sx={{ padding: "2rem" }}>
      <Typography variant="h4" align="center" gutterBottom>
        User Dashboard
      </Typography>
      <Grid container spacing={3} sx={{ marginTop: "1rem" }}>
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
                padding: "1rem",
                borderRadius: "10px",
                fontWeight: "bold",
                "&:hover": {
                  background: "linear-gradient(145deg, #5d34ac, #7438f5)",
                },
              }}
            >
              {item.label}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default UserDashboard;
