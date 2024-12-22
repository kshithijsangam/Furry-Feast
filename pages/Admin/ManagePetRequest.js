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

const ManagePetRequest = () => {
  const navigate = useNavigate();
  const [petRequests, setPetRequests] = useState([]);
  const [form, setForm] = useState({
    petName: '',
    ownerName: '',
    requestDetails: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setPetRequests([...petRequests, form]);
    setForm({ petName: '', ownerName: '', requestDetails: '' });
  };

  const handleBackClick = () => {
    navigate('/AdminDashboard'); // Adjust the path as per your application's routing.
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
        Manage Pet Requests
      </Typography>
      <form onSubmit={handleSubmit} style={{ marginBottom: 3 }}>
        <TextField
          label="Pet Name"
          name="petName"
          value={form.petName}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Owner Name"
          name="ownerName"
          value={form.ownerName}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Request Details"
          name="requestDetails"
          value={form.requestDetails}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
          multiline
          rows={3}
        />
        <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
          Add Request
        </Button>
      </form>

      {petRequests.length > 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Pet Name</TableCell>
                <TableCell>Owner Name</TableCell>
                <TableCell>Request Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {petRequests.map((request, index) => (
                <TableRow key={index}>
                  <TableCell>{request.petName}</TableCell>
                  <TableCell>{request.ownerName}</TableCell>
                  <TableCell>{request.requestDetails}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default ManagePetRequest;
