import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Grid,
  Paper,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

const ManageRescues = () => {
  const navigate = useNavigate();
  const [rescues, setRescues] = useState([]);

  useEffect(() => {
    // Fetch rescues data from the backend API
    fetch("http://localhost:5000/api/rescues")
      .then((response) => response.json())
      .then((data) => {
        setRescues(data);
      })
      .catch((error) => {
        console.error("Error fetching rescue data:", error);
        alert("Failed to fetch rescue data.");
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userSession");
    navigate("/login");
  };

  const handleBackToDashboard = () => {
    navigate("/AdminDashboard");
  };

  const handleDelete = (id) => {
    // Send a DELETE request to the backend
    fetch(`http://localhost:5000/api/rescues/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setRescues(rescues.filter((rescue) => rescue.id !== id));
        } else {
          alert("Failed to delete the rescue data.");
        }
      })
      .catch((error) => {
        console.error("Error deleting rescue:", error);
        alert("Error deleting rescue data.");
      });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #e6e9f0, #eef1f5)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <AppBar position="static" sx={{ background: "#5d34ac" }}>
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, fontWeight: "bold", textTransform: "uppercase" }}
          >
            Manage Rescues
          </Typography>
          <Button
            color="inherit"
            onClick={handleBackToDashboard}
            sx={{
              fontWeight: "bold",
              textTransform: "none",
              marginRight: "1rem",
            }}
          >
            Back to Dashboard
          </Button>
          <Button
            color="inherit"
            onClick={handleLogout}
            sx={{ fontWeight: "bold", textTransform: "none" }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          padding: "2rem",
        }}
      >
        <Paper
          elevation={10}
          sx={{
            padding: "2rem",
            borderRadius: "15px",
            maxWidth: "900px",
            width: "100%",
            boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            Rescue Details
          </Typography>

          <Grid container spacing={3}>
            {rescues.length > 0 ? (
              rescues.map((rescue) => (
                <Grid item xs={12} sm={6} md={4} key={rescue.id}>
                  <Paper
                    sx={{
                      padding: "1rem",
                      borderRadius: "10px",
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <Typography variant="h6">{rescue.name}</Typography>
                    <Typography variant="body1">Location: {rescue.location}</Typography>
                    <Typography variant="body2">Description: {rescue.description}</Typography>
                    <Typography variant="body2">Contact: {rescue.contact}</Typography>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(rescue.id)}
                      sx={{ marginTop: "1rem" }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Paper>
                </Grid>
              ))
            ) : (
              <Typography variant="h6" align="center" sx={{ width: "100%" }}>
                No rescue data available.
              </Typography>
            )}
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
};

export default ManageRescues;
