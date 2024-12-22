import React, { useState } from 'react';
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
} from '@mui/material';
import { Delete, Edit, ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const ManageVeterinary = () => {
  const navigate = useNavigate();

  // State for veterinary records
  const [veterinaryRecords, setVeterinaryRecords] = useState([]);
  const [newVeterinary, setNewVeterinary] = useState({ name: '', contact: '', specialization: '' });
  const [editIndex, setEditIndex] = useState(null);

  // Handle form inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVeterinary({ ...newVeterinary, [name]: value });
  };

  // Add or update a record
  const handleSave = () => {
    if (editIndex !== null) {
      const updatedRecords = [...veterinaryRecords];
      updatedRecords[editIndex] = newVeterinary;
      setVeterinaryRecords(updatedRecords);
    } else {
      setVeterinaryRecords([...veterinaryRecords, newVeterinary]);
    }
    setNewVeterinary({ name: '', contact: '', specialization: '' });
    setEditIndex(null);
  };

  // Edit a record
  const handleEdit = (index) => {
    setNewVeterinary(veterinaryRecords[index]);
    setEditIndex(index);
  };

  // Delete a record
  const handleDelete = (index) => {
    const updatedRecords = veterinaryRecords.filter((_, i) => i !== index);
    setVeterinaryRecords(updatedRecords);
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
              <TableRow key={index}>
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
