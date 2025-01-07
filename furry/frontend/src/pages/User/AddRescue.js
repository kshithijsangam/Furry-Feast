import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  TextField,
  Paper,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const AddRescue = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
    contact: "",
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/api/rescues", { 
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Submission failed");
        return response.json();
      })
      .then(() => {
        setSuccess(true);
        setFormData({ name: "", location: "", description: "", contact: "" });
      })
      .catch(() => setError(true));
  };

  const handleLogout = () => {
    localStorage.removeItem("userSession");
    navigate("/login");
  };

  const handleBackToDashboard = () => {
    navigate("/user-dashboard");
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <AppBar position="static" sx={{ background: "#5d34ac" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Add Rescue
          </Typography>
          <Button onClick={handleBackToDashboard} sx={{ color: "white", fontWeight: "bold", textTransform: "none", marginRight: "1rem" }}>Back to Dashboard</Button>
          <Button onClick={handleLogout} sx={{ color: "white", fontWeight: "bold", textTransform: "none" }}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flex: 1 }}>
        <Paper elevation={10} sx={{ padding: "2rem", borderRadius: "15px", maxWidth: "600px" }}>
          <Typography variant="h4" align="center" gutterBottom>
            Add Rescue Details
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="Name"
                  name="name"
                  variant="outlined"
                  fullWidth
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Location"
                  name="location"
                  variant="outlined"
                  fullWidth
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  name="description"
                  variant="outlined"
                  multiline
                  rows={4}
                  fullWidth
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Contact"
                  name="contact"
                  variant="outlined"
                  fullWidth
                  value={formData.contact}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" fullWidth>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
      {/* Snackbar for success/error */}
      <Snackbar open={success} autoHideDuration={4000} onClose={() => setSuccess(false)}>
        <Alert onClose={() => setSuccess(false)} severity="success">
          Rescue data successfully submitted!
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={4000} onClose={() => setError(false)}>
        <Alert onClose={() => setError(false)} severity="error">
          Failed to submit rescue data.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddRescue;
