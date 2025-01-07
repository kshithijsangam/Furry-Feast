import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Paper, Typography } from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GradientButton = styled(Button)({
  background: "linear-gradient(145deg, rgb(184, 31, 20), rgb(69, 64, 171))",
  boxShadow: "5px 5px 15px #4b47a4, -5px -5px 15px #847dff",
  color: "#fff",
  textTransform: "none",
  fontWeight: "bold",
  transition: "0.3s",
  "&:hover": {
    background: "linear-gradient(145deg, rgb(135, 13, 2), rgb(85, 77, 235))",
    boxShadow: "5px 5px 15px #847dff, -5px -5px 15px rgb(55, 51, 145)",
  },
});

const SettingsPage = () => {
  const [newData, setNewData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      const userSession = JSON.parse(localStorage.getItem("userSession"));
      if (!userSession || !userSession.id) {
        throw new Error("Invalid session");
      }

      const { id } = userSession;
      const response = await axios.get(`http://localhost:5000/auth/user/${id}`);
      if (response.status === 200) {
        setNewData({
          username: response.data.username || "",
          email: response.data.email || "",
          password: "",
          confirmPassword: "",
        });
        const updatedSession = { ...userSession, ...response.data };
        localStorage.setItem("userSession", JSON.stringify(updatedSession)); // Update local storage
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []); // Run only once on mount

  const handleChange = (e) => {
    setNewData({ ...newData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!newData.username || !newData.email || !newData.password || !newData.confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (!validateEmail(newData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (newData.password !== newData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const userSession = JSON.parse(localStorage.getItem("userSession"));
      const response = await axios.put("http://localhost:5000/auth/update", {
        userId: userSession.id,
        username: newData.username,
        email: newData.email,
        password: newData.password,
      });

      if (response.status === 200) {
        setSuccess(response.data.message || "Details updated successfully!");
        fetchUserData(); // Refresh data after successful update
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error updating details. Please try again.");
    }
  };

  const handleBack = () => {
    navigate("/user-dashboard");
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
      <Paper
        elevation={12}
        sx={{
          padding: "2rem",
          borderRadius: "20px",
          maxWidth: 400,
          background: "rgba(255, 255, 255, 0.3)",
          backdropFilter: "blur(5px)",
          boxShadow: "20px 20px 50px rgba(0, 0, 0, 0.3), -20px -20px 50px rgba(255, 255, 255, 0.5)",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: "bold" }}>
          Update Your Information
        </Typography>

        {error && <Typography color="error" align="center">{error}</Typography>}
        {success && <Typography color="primary" align="center">{success}</Typography>}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={newData.username}
            onChange={handleChange}
            name="username"
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={newData.email}
            onChange={handleChange}
            name="email"
          />
          <TextField
            label="New Password"
            type="password" // Changed to plain text
            variant="outlined"
            fullWidth
            margin="normal"
            value={newData.password}
            onChange={handleChange}
            name="password"
          />
          <TextField
            label="Confirm Password"
            type="password" // Changed to plain text
            variant="outlined"
            fullWidth
            margin="normal"
            value={newData.confirmPassword}
            onChange={handleChange}
            name="confirmPassword"
          />
          <GradientButton type="submit" fullWidth sx={{ mt: 2 }}>
            Update
          </GradientButton>
        </form>

        <Button onClick={handleBack} sx={{ mt: 2, color: "rgb(69, 64, 171)", fontWeight: "bold" }}>
          Back to User Dashboard
        </Button>
      </Paper>
    </Box>
  );
};

export default SettingsPage;
