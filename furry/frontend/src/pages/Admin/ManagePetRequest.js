import React, { useEffect, useState } from "react";
import { Box, Grid, Card, CardContent, Typography, Divider, Button } from "@mui/material";
import axios from "axios";

const ManagePetRequest = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/adoption-requests");
        if (response.status === 200) {
          setRequests(response.data); // Set fetched data to state
        }
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };
  
    fetchRequests();
  }, []);

  const handleAction = async (id, action) => {
    try {
      const endpoint =
        action === "approve"
          ? `http://localhost:5000/api/adoption-requests/${id}/approve`
          : `http://localhost:5000/api/adoption-requests/${id}/reject`;

      const response = await axios.put(endpoint);

      if (response.status === 200) {
        // Update local state to reflect the changes
        setRequests((prevRequests) =>
          prevRequests.map((request) =>
            request.id === id ? { ...request, status: action === "approve" ? "Approved" : "Rejected" } : request
          )
        );
        alert(`Request ${action === "approve" ? "approved" : "rejected"} successfully!`);
      }
    } catch (error) {
      console.error(`Error processing request action:`, error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #e6e9f0, #eef1f5)",
        padding: "2rem",
      }}
    >
      <Typography
        variant="h5"
        align="center"
        gutterBottom
        sx={{ color: "#555", marginBottom: "2rem" }}
      >
        Pet Adoption Requests
      </Typography>

      <Grid container spacing={3}>
        {requests.length > 0 ? (
          requests.map((request) => (
            <Grid item xs={12} sm={6} md={4} key={request.id}>
              <Card
                sx={{
                  background: "#fff",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                  borderRadius: "10px",
                }}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Request Details
                  </Typography>
                  <Divider sx={{ marginY: 1 }} />
                  <Typography variant="body2">
                    <strong>Pet Name:</strong> {request.petName || "N/A"}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Pet Breed:</strong> {request.petBreed || "N/A"}
                  </Typography>
                  <Typography variant="body2">
                    <strong>User Name:</strong> {request.userName || "N/A"}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Email:</strong> {request.email || "N/A"}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Phone:</strong> {request.phone || "N/A"}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Status:</strong> {request.status || "Pending"}
                  </Typography>
                </CardContent>
                <Box sx={{ padding: "1rem" }}>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleAction(request.id, "approve")}
                    disabled={request.status === "Approved" || request.status === "Rejected"}
                    sx={{ marginRight: "1rem" }}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleAction(request.id, "reject")}
                    disabled={request.status === "Approved" || request.status === "Rejected"}
                  >
                    Decline
                  </Button>
                </Box>
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
  );
};

export default ManagePetRequest;
