import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  CircularProgress,
  Button,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ViewVeterinary = () => {
  const [veterinaryList, setVeterinaryList] = useState([]); // Holds veterinary data
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate(); // For navigation

  // Fetch veterinary data from the backend API
  useEffect(() => {
    const fetchVeterinaryData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/veterinary");
        setVeterinaryList(response.data); // Set the fetched data to state
      } catch (error) {
        console.error("Error fetching veterinary data:", error);
      } finally {
        setLoading(false); // Stop the loading spinner
      }
    };

    fetchVeterinaryData(); // Trigger the fetch operation
  }, []);

  // Navigate back to the user dashboard
  const handleBack = () => {
    navigate("/user-dashboard");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #f3f4f6, #ffffff)",
        padding: "2rem",
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "#5d34ac",
            textTransform: "uppercase",
          }}
        >
          Veterinary Services
        </Typography>
        <Button
          variant="contained"
          onClick={handleBack}
          sx={{
            background: "#5d34ac",
            color: "#fff",
            fontWeight: "bold",
            textTransform: "none",
            borderRadius: "15px",
            padding: "0.5rem 1rem",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            transition: "transform 0.3s, box-shadow 0.3s",
            "&:hover": {
              background: "#4b278d",
              transform: "translateY(-2px)",
              boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.3)",
            },
          }}
        >
          Back
        </Button>
      </Box>

      {/* Conditional Rendering: Show Loading Spinner or Veterinary Cards */}
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "50vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : veterinaryList.length === 0 ? (
        <Typography
          align="center"
          sx={{
            color: "#888",
            fontSize: "1.2rem",
            fontStyle: "italic",
          }}
        >
          No veterinary services found.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {veterinaryList.map((vet, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                  borderRadius: "15px",
                  overflow: "hidden",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.3)",
                  },
                }}
              >
                {vet.image && (
                  <CardMedia
                    component="img"
                    height="180"
                    image={vet.image}
                    alt={vet.name}
                  />
                )}
                <CardContent
                  sx={{
                    background: "#f9f9f9",
                    padding: "1.5rem",
                    textAlign: "center",
                  }}
                >
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      fontWeight: "bold",
                      color: "#5d34ac",
                    }}
                  >
                    {vet.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "#555", marginBottom: "0.5rem" }}
                  >
                    {vet.address}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#555",
                      marginBottom: "0.5rem",
                      fontStyle: "italic",
                    }}
                  >
                    Specialization: {vet.specialization}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "#555", fontWeight: "bold" }}
                  >
                    Contact: {vet.contact}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ViewVeterinary;
