import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, CardMedia, Button, Modal, TextField } from '@mui/material';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const ViewAdoptPet = () => {
  const [pets, setPets] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  // Generate a random userId for simulation (in real apps, this would come from the user's session or auth system)
  const userId = localStorage.getItem('userId') || Date.now();
  localStorage.setItem('userId', userId);

  // Define validation schema
  const schema = Yup.object().shape({
    userName: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
      .required('Phone number is required'),
  });

  // Use React Hook Form with validation schema
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Fetch pets on component mount
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/pets');
        const fetchedPets = response.data;

        // Retrieve adoption state from localStorage for the current user
        const adoptedPets = JSON.parse(localStorage.getItem(`adoptedPets_${userId}`)) || [];

        // Update each pet with its adoption state for the current user
        const updatedPets = fetchedPets.map(pet => ({
          ...pet,
          adopted: adoptedPets.includes(pet.id),
        }));

        setPets(updatedPets);
      } catch (error) {
        console.error('Error fetching pets:', error);
      } finally {
        setIsLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchPets();
  }, [userId]);

  const handleAdoptClick = async (petId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/pet/${petId}`);
      setSelectedPet(response.data);
      setOpen(true);
      setValue('petName', response.data.name);
      setValue('petBreed', response.data.breed);
      setValue('petId', response.data.id);
    } catch (error) {
      console.error('Error fetching pet details:', error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    reset(); // Reset the form on close
  };

  const handleFormSubmit = async (data) => {
    try {
      await axios.post('http://localhost:5000/api/adopt', {
        ...data,
        petId: selectedPet.id,
        petName: selectedPet.name,
        petBreed: selectedPet.breed,
      });

      // Persist adopted pet's ID in localStorage for the current user
      const adoptedPets = JSON.parse(localStorage.getItem(`adoptedPets_${userId}`)) || [];
      if (!adoptedPets.includes(selectedPet.id)) {
        adoptedPets.push(selectedPet.id);
        localStorage.setItem(`adoptedPets_${userId}`, JSON.stringify(adoptedPets));
      }

      alert('Adoption request submitted successfully!');
      handleAdoptSuccess(selectedPet.id); // Update adoption status
      handleClose();
    } catch (error) {
      console.error('Error submitting adoption request:', error);
      alert('There was an issue submitting your request.');
    }
  };

  const handleAdoptSuccess = (petId) => {
    // Update pet's adoption status in the state
    setPets(pets.map(pet =>
      pet.id === petId ? { ...pet, adopted: true } : pet
    ));
  };

  const handleBackClick = () => {
    // Navigate back (you can adjust this to your route)
    window.history.back();
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: '#f0f4f8' }}>
      {/* Back Button */}
      <Button 
        variant="outlined" 
        color="primary" 
        onClick={handleBackClick}
        sx={{
          marginBottom: 3,
          padding: '8px 16px',
          borderRadius: '8px',
          boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.1)',
          '&:hover': {
            backgroundColor: '#1976d2',
            color: '#fff',
          }
        }}
      >
        Back
      </Button>

      <Typography 
        variant="h4" 
        sx={{ 
          marginBottom: 3, 
          textAlign: 'center', 
          color: '#1976d2', 
          fontWeight: 'bold',
        }}
      >
        Pets Available for Adoption
      </Typography>

      {/* Loading State */}
      {isLoading ? (
        <Typography>Loading pets...</Typography> // Show loading message
      ) : (
        <Grid container spacing={3}>
          {pets.map((pet) => (
            <Grid item xs={12} sm={6} md={4} key={pet.id}>
              <Card 
                sx={{ 
                  backgroundColor: 'white', 
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="auto" // Set to auto to display in real size
                  image={pet.image}
                  alt={pet.name}
                  onError={(e) => (e.target.src = 'https://via.placeholder.com/150')}
                  sx={{
                    borderTopLeftRadius: '8px',
                    borderTopRightRadius: '8px',
                  }}
                />
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{pet.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Breed: {pet.breed}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Age: {pet.age} years
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Description: {pet.description}
                  </Typography>
                  
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleAdoptClick(pet.id)}
                      sx={{
                        marginTop: 2,
                        '&:hover': {
                          backgroundColor: '#115293',
                        },
                      }}
                    >
                      Adopt
                    </Button>
                  
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Modal Form */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #1976d2',
            boxShadow: 24,
            padding: 4,
            borderRadius: '8px',
          }}
        >
          <Typography variant="h6" sx={{ textAlign: 'center', marginBottom: 2 }}>
            Adopt {selectedPet?.name}
          </Typography>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              {...register('userName')}
              error={!!errors.userName}
              helperText={errors.userName?.message}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              fullWidth
              label="Phone"
              variant="outlined"
              {...register('phone')}
              error={!!errors.phone}
              helperText={errors.phone?.message}
              sx={{ marginBottom: 2 }}
            />
            <input type="hidden" {...register('petName')} />
            <input type="hidden" {...register('petBreed')} />
            <input type="hidden" {...register('petId')} />
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Submit Adoption Request
            </Button>
          </form>
        </Box>
      </Modal>
    </Box>
  );
};

export default ViewAdoptPet;
