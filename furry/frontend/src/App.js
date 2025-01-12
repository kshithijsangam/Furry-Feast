import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Box, Button, } from '@mui/material';
import './App.css';
import Login from './pages/Login';
import AdminDashboard from './pages/Admin/AdminDashboard';
import SettingsPage from './pages/Admin/SettingsPage';
import ManageVeterinary from './pages/Admin/ManageVeterinary';
import ManageVaccination from './pages/Admin/ManageVaccination';
import ManagePetRequest from './pages/Admin/ManagePetRequest';
import ManagePetDog from './pages/Admin/ManagePetDog';
import ManageDonation from './pages/Admin/ManageDonation';
import Managework from './pages/Admin/Managework';
import ManageVolunteer from './pages/Admin/ManageVolunteer';
import ManageRescue from './pages/Admin/ManageRescue';
import ManageGallery from './pages/Admin/ManageGallery';
import RegistrationForm from './pages/RegistrationForm';
import UserDashboard from './pages/User/UserDashboard';
import ViewWork from './pages/User/ViewWork';
import ViewVaccination from './pages/User/ViewVaccination';
import ViewGallery from './pages/User/ViewGallery';
import ViewAdoptPet from './pages/User/ViewAdoptPet';
import ViewVeterinary from './pages/User/View Veterinary';
import UserSettings from './pages/User/Settings';
import PetRequest from './pages/User/ManagePetRequest';
import AddRescue from './pages/User/AddRescue';
import AddDonation from './pages/User/AddDonation';

function Home() {
  const navigate = useNavigate();

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box>
      {/* Navbar */}
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Ferry Feast
          </Typography>
          <Button color="inherit" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Home
          </Button>
          <Button color="inherit" onClick={() => scrollToSection('about')}>
            About
          </Button>
          <Button color="inherit" onClick={() => scrollToSection('contact')}>
            Contact
          </Button>
          <Button color="inherit" onClick={() => navigate('/Login')}>
            Login
          </Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <img
          src="cuteeee.jpg"
          alt="Hero Section"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: -1,
          }}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0, 0, 0, 0.5)',
            padding: '20px',
            borderRadius: '10px',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: '#fff',
              marginBottom: '16px',
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            Welcome to Ferry Feast
          </Typography>
          <Button
            onClick={() => navigate('/Login')}
            sx={{
              padding: '10px 20px',
              background: 'transparent',
              color: '#fff',
              fontWeight: 'bold',
              fontSize: '16px',
              border: '2px solid #fff',
              '&:hover': {
                background: 'transparent',
                borderColor: '#7438f5',
              },
            }}
          >
            Adopt Me
          </Button>
        </Box>
      </Box>

      {/* About Section */}
      <Box
        id="about"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '40px',
          backgroundColor: '#f9f9f9',
        }}
      >
        <Box
          sx={{
            flex: 1,
            maxWidth: '50%',
            paddingRight: '20px',
          }}
        >
          <img
            src="dog.avif"
            alt="About Ferry Feast"
            style={{
              width: '100%',
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            }}
          />
        </Box>
        <Box
          sx={{
            flex: 1,
            paddingLeft: '20px',
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '20px' }}>
            About Ferry Feast
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: '1.8' }}>
            Ferry Feast is a dedicated platform for pet enthusiasts and animal lovers. 
            Our goal is to connect people with the best resources for adopting, rescuing, 
            and caring for animals. From finding trustworthy veterinarians to managing 
            pet adoption requests, Ferry Feast ensures a seamless experience for users. 
            Join us to make a difference in the lives of our furry friends!
          </Typography>
        </Box>
      </Box>

      {/* Contact Section */}
      <Box
        id="contact"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '40px',
          backgroundColor: '#f0f0f0',
        }}
      >
        <Box
          sx={{
            flex: 1,
            paddingRight: '20px',
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '16px' }}>
            Contact Us
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: '8px' }}>
            Name: Admin
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: '8px' }}>
            Email: furryfeast@gmail.com
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: '8px' }}>
            Phone: 9482833472
          </Typography>
        </Box>
        <Box
          sx={{
            flex: 1,
          }}
        >
          <img
            src="https://images.pexels.com/photos/2954458/pexels-photo-2954458.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Contact Us"
            style={{
              width: '100%',
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

// Main App Component
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/register" element={<RegistrationForm />} />
        {/* Admin Routes */}
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/admin/user-data" element={<SettingsPage />} />
        <Route path="/admin/manage-veterinary" element={<ManageVeterinary />} />
        <Route path="/admin/manage-vaccination" element={<ManageVaccination />} />
        <Route path="/admin/manage-pet-request" element={<ManagePetRequest />} />
        <Route path="/admin/manage-pet-dog" element={<ManagePetDog />} />
        <Route path="/admin/manage-donation" element={<ManageDonation />} />
        <Route path="/admin/manage-work" element={<Managework />} />
        <Route path="/admin/manage-volunteer" element={<ManageVolunteer />} />
        <Route path="/admin/manage-rescue" element={<ManageRescue />} />
        <Route path="/admin/manage-gallery" element={<ManageGallery />} />
        {/* User Routes */}
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/user-dashboard/user/view-work" element={<ViewWork />} />
        <Route path="/user-dashboard/user/view-vaccination" element={<ViewVaccination />} />
        <Route path="/user-dashboard/user/view-gallery" element={<ViewGallery />} />
        <Route path="/user-dashboard/user/view-adopt-pet" element={<ViewAdoptPet />} />
        <Route path="/user-dashboard/user/view-veterinary" element={<ViewVeterinary />} />
        <Route path="/user-dashboard/user/settings" element={<UserSettings />} />
        <Route path="/user-dashboard/user/manage-pet-request" element={<PetRequest />} />
        <Route path="/user-dashboard/user/add-rescue" element={<AddRescue />} />
        <Route path="/user-dashboard/user/add-donation" element={<AddDonation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
