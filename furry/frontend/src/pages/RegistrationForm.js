import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { TextField, Button, Box, Paper, Typography } from "@mui/material";
import { styled } from "@mui/system";
import axios from 'axios';

const GradientButton = styled(Button)({
  background: "linear-gradient(145deg,rgb(184, 31, 20),rgb(69, 64, 171))",
  boxShadow: "5px 5px 15px #4b47a4, -5px -5px 15px #847dff",
  color: "#fff",
  textTransform: "none",
  fontWeight: "bold",
  transition: "0.3s",
  "&:hover": {
    background: "linear-gradient(145deg,rgb(135, 13, 2),rgb(85, 77, 235))",
    boxShadow: "5px 5px 15px #847dff, -5px -5px 15pxrgb(55, 51, 145)",
  },
});

const RegistrationForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Validation
  const validateForm = () => {
    if (!username || username.length < 3) {
      setError("Username must be at least 3 characters long.");
      return false;
    }
    if (!email) {
      setError("Email is required.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }

    setError(""); // Clear any previous errors
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form default submission behavior

    if (!validateForm()) return;

    // Send data to the backend API
    try {
      const response = await axios.post("http://localhost:5000/auth/register", {
        username,
        email,
        password,
      });

      if (response.status === 200) {
        alert("Registration Successful!");
        navigate("/login");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error registering user:", error);
      setError("Server error. Please try again later.");
    }
  };

  return (
    <Box className="background-video-container">
      <video autoPlay loop muted className="background-video">
        <source src="Rig-img.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <Paper
        elevation={12}
        sx={{
          padding: "2rem",
          borderRadius: "20px",
          maxWidth: 400,
          background: "rgba(266, 266, 255, 0.3)",
          backdropFilter: "blur(5px)",
          boxShadow:
            "20px 20px 50px rgba(0, 0, 0, 0.3), -20px -20px 50px rgba(255, 255, 255, 0.5)",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          Register
        </Typography>

        {error && <Typography color="error" align="center">{error}</Typography>}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "15px",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ccc",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#6c63ff",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#6c63ff",
              },
            }}
          />

          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "15px",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ccc",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#6c63ff",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#6c63ff",
              },
            }}
          />

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "15px",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ccc",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#6c63ff",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#6c63ff",
              },
            }}
          />

          <TextField
            label="Confirm Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "15px",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ccc",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#6c63ff",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#6c63ff",
              },
            }}
          />

          <GradientButton
            type="submit"
            fullWidth
            sx={{ mt: 2 }}
          >
            Register
          </GradientButton>
        </form>

        <Typography align="center" sx={{ mt: 2, fontWeight: "bold" }}>
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              textDecoration: "underline",
              color: "#740d02",
              fontWeight: "bold",
            }}
          >
            Login here
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default RegistrationForm;
