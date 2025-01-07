import React, { useEffect, useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const ManageDonation = () => {
  const navigate = useNavigate();
  const [donations, setDonations] = useState([]);
  const [form, setForm] = useState({
    donorName: "",
    email: "",
    amount: "",
    message: "",
  });

  // Fetch donations from the backend
  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/donations");
        if (response.ok) {
          const data = await response.json();
          setDonations(data);
        } else {
          console.error("Failed to fetch donations");
        }
      } catch (error) {
        console.error("Error fetching donations:", error);
      }
    };

    fetchDonations();
  }, []);

  // Handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  // Submit a new donation to the backend
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/add-donation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        alert("Donation added successfully");
        setForm({ donorName: "", email: "", amount: "", message: "" });

        // Refresh the donations list
        const updatedDonations = await fetch("http://localhost:5000/api/donations");
        setDonations(await updatedDonations.json());
      } else {
        alert("Failed to add donation");
      }
    } catch (error) {
      console.error("Error adding donation:", error);
    }
  };

  // Handle navigation back to the dashboard
  const handleBackClick = () => {
    navigate("/AdminDashboard");
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        variant="outlined"
        color="primary"
        sx={{ marginBottom: 2 }}
        onClick={handleBackClick}
      >
        Back
      </Button>
      <Typography variant="h4" sx={{ marginBottom: 3, textAlign: "center" }}>
        Manage Donations
      </Typography>
      <form onSubmit={handleSubmit} style={{ marginBottom: 3 }}>
        <TextField
          label="Donor Name"
          name="donorName"
          value={form.donorName}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Donation Amount"
          name="amount"
          type="number"
          value={form.amount}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Message"
          name="message"
          value={form.message}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          multiline
          rows={3}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
        >
          Add Donation
        </Button>
      </form>

      {donations.length > 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Donor Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Donation Amount</TableCell>
                <TableCell>Message</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {donations.map((donation) => (
                <TableRow key={donation.id}>
                  <TableCell>{donation.id}</TableCell>
                  <TableCell>{donation.donorName}</TableCell>
                  <TableCell>{donation.email}</TableCell>
                  <TableCell>{donation.amount}</TableCell>
                  <TableCell>{donation.message}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default ManageDonation;
