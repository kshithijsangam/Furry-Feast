import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  Divider,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PetRequest = () => {
  const [requests, setRequests] = useState([]); // To store all pet adoption requests
  const [filteredRequests, setFilteredRequests] = useState([]); // To store filtered requests based on search
  const [searchQuery, setSearchQuery] = useState(""); // To store search input
  const [blurred, setBlurred] = useState(true); // For blur effect
  const navigate = useNavigate();

  // Fetch all pet adoption requests on component mount
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/adoption-requests");

        if (response.data.length === 0) {
          alert("No records found.");
          setRequests([]); // Clear requests if no data is found
          setFilteredRequests([]); // Clear filtered requests as well
        } else {
          setRequests(response.data); // Set the data returned by the backend
          setFilteredRequests(response.data); // Set the filtered requests initially to all data
        }
      } catch (error) {
        console.error("Error fetching requests:", error);
        alert("An error occurred while fetching the requests.");
      }
    };

    fetchRequests();
  }, []);

  // Handle search input and filter requests by email
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter requests based on the query (searching pet name, breed, or user email)
    const filtered = requests.filter(
      (request) =>
        request.petName.toLowerCase().includes(query) ||
        request.petBreed.toLowerCase().includes(query) ||
        request.email.toLowerCase().includes(query) // Changed to email search
    );
    setFilteredRequests(filtered);

    // Check if the search query matches the full user email exactly
    const isEmailMatched = filtered.some((request) =>
      request.email.toLowerCase() === query
    );

    // Remove blur effect only if the email matches
    setBlurred(!isEmailMatched);
  };

  const handleLogout = () => {
    setRequests([]); // Clear requests on logout
    setFilteredRequests([]); // Clear filtered requests on logout
    navigate("/login");
  };

  const handleBackToDashboard = () => {
    navigate("/user-dashboard");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #e6e9f0, #eef1f5)",
        padding: "2rem",
      }}
    >
      {/* Navigation Bar */}
      <AppBar position="static" sx={{ background: "#5d34ac", boxShadow: "none" }}>
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, fontWeight: "bold", textTransform: "uppercase", letterSpacing: "2px" }}
          >
            Manage Pet Requests
          </Typography>
          <Button
            color="inherit"
            onClick={handleBackToDashboard}
            sx={{
              fontWeight: "bold",
              textTransform: "none",
              marginRight: "1rem",
              backgroundColor: "black",
              "&:hover": { backgroundColor: "green" },
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              borderRadius: "8px",
            }}
          >
            Back to Dashboard
          </Button>
          <Button
            color="inherit"
            onClick={handleLogout}
            sx={{
              fontWeight: "bold",
              textTransform: "none",
              backgroundColor: "black",
              "&:hover": { backgroundColor: "red" },
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              borderRadius: "8px",
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Page Content */}
      <Box sx={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ color: "#333", marginBottom: "2rem", fontWeight: "600" }}
        >
          Review and Manage Pet Adoption Requests
        </Typography>

        {/* Search Bar */}
        <TextField
          label="Search Pet Requests by Email"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={handleSearch}
          sx={{
            marginBottom: "2rem",
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
          }}
        />

        <Grid container spacing={3} sx={{ position: "relative" }}>
          {/* Apply Blur Effect to Background */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backdropFilter: "blur(10px)",
              zIndex: 0,
              transition: "all 0.3s ease",
              opacity: blurred ? 1 : 0,
            }}
          ></Box>

          {filteredRequests.length > 0 ? (
            filteredRequests.map((request) => (
              <Grid item xs={12} sm={6} md={4} key={request.id}>
                <Card
                  sx={{
                    background: "#fff",
                    boxShadow: "0px 12px 20px rgba(0, 0, 0, 0.1)",
                    borderRadius: "16px",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-10px)",
                      boxShadow: "0px 18px 30px rgba(0, 0, 0, 0.15)",
                    },
                    overflow: "hidden",
                    zIndex: 1, // Ensure card is above blurred layer
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                      {request.petName || "N/A"}
                    </Typography>
                    <Divider sx={{ marginY: 1 }} />
                    <Typography variant="body2" color="textSecondary">
                      Pet Breed: {request.petBreed || "N/A"}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      User Name: {request.userName || "N/A"}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Email: {request.email || "N/A"}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Phone: {request.phone || "N/A"}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color:
                          request.status === "Pending"
                            ? "orange"
                            : request.status === "Approved"
                            ? "green"
                            : "red",
                        fontWeight: "bold",
                      }}
                    >
                      Status: {request.status}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="h6" color="textSecondary" align="center">
              No adoption requests to display.
            </Typography>
          )}
           
        </Grid>
       
      </Box>
      
    </Box>
  );
};

export default PetRequest;
