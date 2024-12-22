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

const ManagePetDog = () => {
  const navigate = useNavigate();
  const [petDogs, setPetDogs] = useState([]);
  const [form, setForm] = useState({
    dogName: '',
    breed: '',
    age: '',
    ownerName: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setPetDogs([...petDogs, form]);
    setForm({ dogName: '', breed: '', age: '', ownerName: '' });
  };

  const handleBackClick = () => {
    navigate('/AdminDashboard'); // Adjust the path as per your routing configuration.
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
        Manage Pet Dogs
      </Typography>
      <form onSubmit={handleSubmit} style={{ marginBottom: 3 }}>
        <TextField
          label="Dog Name"
          name="dogName"
          value={form.dogName}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Breed"
          name="breed"
          value={form.breed}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Age (in years)"
          name="age"
          value={form.age}
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
        <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
          Add Dog
        </Button>
      </form>

      {petDogs.length > 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Dog Name</TableCell>
                <TableCell>Breed</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Owner Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {petDogs.map((dog, index) => (
                <TableRow key={index}>
                  <TableCell>{dog.dogName}</TableCell>
                  <TableCell>{dog.breed}</TableCell>
                  <TableCell>{dog.age}</TableCell>
                  <TableCell>{dog.ownerName}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default ManagePetDog;
