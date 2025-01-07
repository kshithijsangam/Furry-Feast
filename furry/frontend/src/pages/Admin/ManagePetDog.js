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
import axios from 'axios';

const ManagePetDog = () => {
  const navigate = useNavigate();
  const [pets, setPets] = useState([]);
  const [form, setForm] = useState({
    petName: '',
    petImg: '',
    breed: '',
    age: '',
    description: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Make an API request to store the pet details in the database
      const response = await axios.post('http://localhost:5000/api/pets', form);
      if (response.status === 200) {
        setPets([...pets, form]);
        setForm({ petName: '', petImg: '', breed: '', age: '', description: '' });
      }
    } catch (error) {
      console.error('Error adding pet:', error);
    }
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
        Manage Pets for Adoption
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
          label="Pet Image URL"
          name="petImg"
          value={form.petImg}
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
          label="Description"
          name="description"
          value={form.description}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          multiline
          rows={4}
          required
        />
        <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
          Add Pet
        </Button>
      </form>

      {pets.length > 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Pet Name</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Breed</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pets.map((pet, index) => (
                <TableRow key={index}>
                  <TableCell>{pet.petName}</TableCell>
                  <TableCell>
                    <img src={pet.petImg} alt={pet.petName} style={{ width: '100px' }} />
                  </TableCell>
                  <TableCell>{pet.breed}</TableCell>
                  <TableCell>{pet.age}</TableCell>
                  <TableCell>{pet.description}</TableCell>
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