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

const ManageVaccination = () => {
  const navigate = useNavigate();

  // State for vaccination records
  const [vaccinationRecords, setVaccinationRecords] = useState([]);
  const [newVaccination, setNewVaccination] = useState({
    petName: '',
    vaccineName: '',
    vaccinationDate: '',
  });
  const [editIndex, setEditIndex] = useState(null);

  // Handle form inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVaccination({ ...newVaccination, [name]: value });
  };

  // Add or update a record
  const handleSave = () => {
    if (editIndex !== null) {
      const updatedRecords = [...vaccinationRecords];
      updatedRecords[editIndex] = newVaccination;
      setVaccinationRecords(updatedRecords);
    } else {
      setVaccinationRecords([...vaccinationRecords, newVaccination]);
    }
    setNewVaccination({ petName: '', vaccineName: '', vaccinationDate: '' });
    setEditIndex(null);
  };

  // Edit a record
  const handleEdit = (index) => {
    setNewVaccination(vaccinationRecords[index]);
    setEditIndex(index);
  };

  // Delete a record
  const handleDelete = (index) => {
    const updatedRecords = vaccinationRecords.filter((_, i) => i !== index);
    setVaccinationRecords(updatedRecords);
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
        Manage Vaccination
      </Typography>

      {/* Add/Edit Vaccination Form */}
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
          {editIndex !== null ? 'Edit Vaccination Record' : 'Add New Vaccination Record'}
        </Typography>
        <TextField
          label="Pet Name"
          name="petName"
          value={newVaccination.petName}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          label="Vaccine Name"
          name="vaccineName"
          value={newVaccination.vaccineName}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          label="Vaccination Date"
          name="vaccinationDate"
          value={newVaccination.vaccinationDate}
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

      {/* Vaccination Records Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Pet Name</strong></TableCell>
              <TableCell><strong>Vaccine Name</strong></TableCell>
              <TableCell><strong>Vaccination Date</strong></TableCell>
              <TableCell align="center"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vaccinationRecords.map((record, index) => (
              <TableRow key={index}>
                <TableCell>{record.petName}</TableCell>
                <TableCell>{record.vaccineName}</TableCell>
                <TableCell>{record.vaccinationDate}</TableCell>
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

export default ManageVaccination;
