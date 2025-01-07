import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import { styled } from "@mui/system";

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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    if (!email) {
      setError("Email is required.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }

    if (!password) {
      setError("Password is required.");
      return false;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }

    setError("");
    return true;
  };

  const handleLogin = async () => {
    // Hardcoded credentials for admin
    if (email === "admin@gmail.com" && password === "admin123") {
      navigate("/AdminDashboard");
      return;
    }

    if (!validateForm()) return;

    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });

      const { role } = response.data;
      localStorage.setItem("userSession", JSON.stringify(response.data));
    
      if (role === "admin") {
        navigate("/Admin");
      } else if (role === "customer") {
        navigate("/user-dashboard");
      }
    } catch (err) {
      setError("Invalid email or password.");
    }
  };

  return (
    <Box className="background-video-container">
      <video autoPlay loop muted className="background-video">
        <source src="log-vid.mp4" type="video/mp4" />
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
          Login
        </Typography>
        {error && <Typography color="error" align="center">{error}</Typography>}
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
        <GradientButton fullWidth onClick={handleLogin} sx={{ mt: 2 }}>
          Login
        </GradientButton>
        <Typography align="center" sx={{ mt: 2, fontWeight: "bold" }}>
          Don't have an account?{" "}
          <Link
            to="/register"
            style={{
              textDecoration: "underline",
              color: "#740d02",
              fontWeight: "bold",
            }}
          >
            Register here
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
