import React, { useState } from "react";
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PetRequest = () => {
  const [requests, setRequests] = useState([]);
  const [email, setEmail] = useState(""); // To store user email
  const [openEmailDialog, setOpenEmailDialog] = useState(true); // Email dialog is open initially
  const [emailError, setEmailError] = useState(""); // Error message for invalid email
  const navigate = useNavigate();

  const fetchRequests = async (email) => {
    try {
      const response = await axios.get("http://localhost:5000/api/adoption-requests", {
        params: { email },
      });
  
      if (response.data.length === 0) {
        alert("No records found for the provided email.");
        setRequests([]); // Clear requests if no data is found
      } else {
        setRequests(response.data); // Set the data returned by the backend
      }
    } catch (error) {
      console.error("Error fetching requests:", error);
      alert("An error occurred while fetching the requests.");
    }
  };
  

  const handleEmailSubmit = () => {
    if (email.trim() === "") {
      setEmailError("Please enter a valid email");
      return;
    }
    fetchRequests(email.trim()); // Fetch data for the entered email
    setOpenEmailDialog(false);
    setEmailError(""); // Clear any previous errors
  };

  const handleLogout = () => {
    setRequests([]); // Clear requests on logout
    setEmail(""); // Clear email on logout
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

      {/* Email Dialog */}
      <Dialog open={openEmailDialog}>
        <DialogTitle>Enter Your Email</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!emailError}
            helperText={emailError}
            sx={{ boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)", borderRadius: "8px" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEmailDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEmailSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

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

        <Grid container spacing={3}>
          {requests.length > 0 ? (
            requests.map((request) => (
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
