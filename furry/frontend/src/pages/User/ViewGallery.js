import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ViewGallery = () => {
  const [images, setImages] = useState([]); // State to store images
  const navigate = useNavigate();

  // Fetch images from the database when the component loads
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/images"); // Replace with your backend endpoint
        setImages(response.data); // Update state with fetched images
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userSession");
    navigate("/login");
  };

  const handleBack = () => {
    navigate("/user-dashboard");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #e6e9f0, #eef1f5)",
      }}
    >
      {/* Navigation Bar */}
      <AppBar position="static" sx={{ background: "#5d34ac" }}>
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, fontWeight: "bold", textTransform: "uppercase" }}
          >
            View Gallery
          </Typography>
          <Button
            color="inherit"
            onClick={handleLogout}
            sx={{ fontWeight: "bold", textTransform: "none" }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Back Button */}
      <Box
        sx={{
          padding: "1rem",
          display: "flex",
          justifyContent: "flex-start",
          marginTop: "1rem",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleBack}
          sx={{
            fontWeight: "bold",
            textTransform: "none",
            background: "#5d34ac",
            "&:hover": { background: "#4b278d" },
          }}
        >
          Back to Dashboard
        </Button>
      </Box>

      {/* Gallery Content */}
      <Box sx={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold", marginBottom: "2rem" }}
        >
          Explore Our Gallery
        </Typography>
        <Grid container spacing={4}>
          {images.map((image) => (
            <Grid item xs={12} sm={6} md={4} key={image.id}>
              <Card
                sx={{
                  borderRadius: "15px",
                  boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "translateY(-10px)",
                    boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.3)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={image.url}
                  alt={image.title}
                  sx={{ borderRadius: "15px 15px 0 0" }}
                />
                <CardContent>
                  <Typography
                    variant="h6"
                    align="center"
                    sx={{ fontWeight: "bold", color: "#333" }}
                  >
                    {image.title || "Untitled"} {/* Fallback title */}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default ViewGallery;
