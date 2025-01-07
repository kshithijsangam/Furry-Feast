import React, { useState, useEffect } from 'react';
import {
  Box,
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
  IconButton,
  Alert,
} from '@mui/material';
import { Delete, Edit, ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/veterinary'; 

const ManageVeterinary = () => {
  const navigate = useNavigate();

  // State for veterinary records
  const [veterinaryRecords, setVeterinaryRecords] = useState([]);
  const [newVeterinary, setNewVeterinary] = useState({ name: '', contact: '', specialization: '' });
  const [editIndex, setEditIndex] = useState(null);
  const [error, setError] = useState('');

  // Fetch records from the database
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get(API_URL);
        setVeterinaryRecords(response.data);
      } catch (error) {
        console.error('Error fetching records:', error);
      }
    };

    fetchRecords();
  }, []);

  // Handle form inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVeterinary({ ...newVeterinary, [name]: value });
  };

  // Add or update a record
  const handleSave = async () => {
    // Validation: Ensure all fields are filled
    if (!newVeterinary.name || !newVeterinary.contact || !newVeterinary.specialization) {
      setError('All fields are required.');
      return;
    }
    setError(''); // Clear error message

    try {
      if (editIndex !== null) {
        const updatedRecord = veterinaryRecords[editIndex];
        const response = await axios.put(`${API_URL}/${updatedRecord.id}`, newVeterinary);
        const updatedRecords = [...veterinaryRecords];
        updatedRecords[editIndex] = response.data;
        setVeterinaryRecords(updatedRecords);
      } else {
        const response = await axios.post(API_URL, newVeterinary);
        setVeterinaryRecords([...veterinaryRecords, response.data]);
      }
      setNewVeterinary({ name: '', contact: '', specialization: '' });
      setEditIndex(null);
    } catch (error) {
      console.error('Error saving record:', error);
    }
  };

  // Edit a record
  const handleEdit = (index) => {
    setNewVeterinary(veterinaryRecords[index]);
    setEditIndex(index);
  };

  // Delete a record
  const handleDelete = async (index) => {
    try {
      const recordToDelete = veterinaryRecords[index];
      await axios.delete(`${API_URL}/${recordToDelete.id}`);
      const updatedRecords = veterinaryRecords.filter((_, i) => i !== index);
      setVeterinaryRecords(updatedRecords);
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };

  // Handle back button
  const handleBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <Box
      sx={{
        padding: 4,
        backgroundColor: 'background.paper',
        borderRadius: 3,
        boxShadow: 3,
        maxWidth: 900,
        margin: '40px auto',
      }}
    >
      {/* Back Button */}
      <IconButton
        onClick={handleBack}
        sx={{
          position: 'absolute',
          top: 16,
          left: 16,
          color: 'primary.main',
        }}
      >
        <ArrowBack />
      </IconButton>

      {/* Page Title */}
      <Typography variant="h4" fontWeight="bold" gutterBottom textAlign="center">
        Manage Veterinary
      </Typography>

      {/* Error Alert */}
      {error && <Alert severity="error" sx={{ marginBottom: 2 }}>{error}</Alert>}

      {/* Add/Edit Veterinary Form */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          marginBottom: 3,
          backgroundColor: '#f9f9f9',
          padding: 2,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" fontWeight="medium">
          {editIndex !== null ? 'Edit Veterinary Record' : 'Add New Veterinary Record'}
        </Typography>
        <TextField
          label="Veterinarian Name"
          name="name"
          value={newVeterinary.name}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          label="Contact"
          name="contact"
          value={newVeterinary.contact}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          label="Specialization"
          name="specialization"
          value={newVeterinary.specialization}
          onChange={handleInputChange}
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          sx={{ padding: 1, fontSize: '16px', fontWeight: 'bold' }}
        >
          {editIndex !== null ? 'Update Record' : 'Add Record'}
        </Button>
      </Box>

      {/* Veterinary Records Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Contact</strong></TableCell>
              <TableCell><strong>Specialization</strong></TableCell>
              <TableCell align="center"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {veterinaryRecords.map((record, index) => (
              <TableRow key={record.id}>
                <TableCell>{record.name}</TableCell>
                <TableCell>{record.contact}</TableCell>
                <TableCell>{record.specialization}</TableCell>
                <TableCell align="center">
                  <IconButton color="primary" onClick={() => handleEdit(index)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(index)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ManageVeterinary;
