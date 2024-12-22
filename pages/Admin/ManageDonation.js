import React, { useState } from 'react';
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
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const ManageDonation = () => {
  const navigate = useNavigate();
  const [donations, setDonations] = useState([]);
  const [form, setForm] = useState({
    donorName: '',
    amount: '',
    message: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setDonations([...donations, form]);
    setForm({ donorName: '', amount: '', message: '' });
  };

  const handleBackClick = () => {
    navigate('/AdminDashboard'); // Adjust the path to match your routing configuration.
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
      <Typography variant="h4" sx={{ marginBottom: 3, textAlign: 'center' }}>
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
        <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
          Add Donation
        </Button>
      </form>

      {donations.length > 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Donor Name</TableCell>
                <TableCell>Donation Amount</TableCell>
                <TableCell>Message</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {donations.map((donation, index) => (
                <TableRow key={index}>
                  <TableCell>{donation.donorName}</TableCell>
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
