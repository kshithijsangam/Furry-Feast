import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
  Typography,
  Snackbar,
  Alert,
  Paper,
  IconButton,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const ManageRescue = () => {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [rescueDetails, setRescueDetails] = useState({
    name: '',
    location: '',
    urgency: '',
    description: '',
  });
  const [errors, setErrors] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setRescueDetails({ name: '', location: '', urgency: '', description: '' });
    setErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRescueDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!rescueDetails.name.trim()) newErrors.name = 'Rescue name is required.';
    if (!rescueDetails.location.trim()) newErrors.location = 'Location is required.';
    if (!rescueDetails.urgency.trim()) newErrors.urgency = 'Urgency level is required.';
    if (!rescueDetails.description.trim()) newErrors.description = 'Description is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRescueSubmit = () => {
    if (validateForm()) {
      setSnackbarMessage('Rescue operation details submitted successfully!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      handleDialogClose();
    } else {
      setSnackbarMessage('Please fill in all the required fields.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleBack = () => {
    navigate('/AdminDashboard');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, #4facfe, #00f2fe)',
        padding: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Paper
        elevation={6}
        style={{
          maxWidth: '600px',
          padding: '20px',
          borderRadius: '15px',
          background: '#ffffff',
        }}
      >
        <Grid container justifyContent="space-between" alignItems="center" style={{ marginBottom: '20px' }}>
          <IconButton onClick={handleBack} style={{ color: '#4facfe' }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography
            variant="h4"
            style={{ textAlign: 'center', fontWeight: 'bold', color: '#4facfe', flex: 1 }}
          >
            Rescue Management
          </Typography>
        </Grid>

        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={handleDialogOpen}
              style={{
                background: 'linear-gradient(to right, #4facfe, #00f2fe)',
                color: '#fff',
                padding: '10px 20px',
                fontWeight: 'bold',
              }}
            >
              New Rescue Operation
            </Button>
          </Grid>
        </Grid>

        {/* Dialog for capturing rescue operation details */}
        <Dialog open={openDialog} onClose={handleDialogClose} fullWidth maxWidth="sm">
          <DialogTitle style={{ background: '#4facfe', color: '#fff' }}>New Rescue Operation</DialogTitle>
          <DialogContent style={{ background: '#f9f9f9' }}>
            <TextField
              name="name"
              label="Rescue Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={rescueDetails.name}
              onChange={handleInputChange}
              error={!!errors.name}
              helperText={errors.name}
            />
            <TextField
              name="location"
              label="Location"
              variant="outlined"
              fullWidth
              margin="normal"
              value={rescueDetails.location}
              onChange={handleInputChange}
              error={!!errors.location}
              helperText={errors.location}
            />
            <TextField
              name="urgency"
              label="Urgency Level"
              variant="outlined"
              fullWidth
              margin="normal"
              value={rescueDetails.urgency}
              onChange={handleInputChange}
              error={!!errors.urgency}
              helperText={errors.urgency}
            />
            <TextField
              name="description"
              label="Description"
              variant="outlined"
              fullWidth
              multiline
              rows={3}
              margin="normal"
              value={rescueDetails.description}
              onChange={handleInputChange}
              error={!!errors.description}
              helperText={errors.description}
            />
          </DialogContent>
          <DialogActions style={{ background: '#f9f9f9' }}>
            <Button onClick={handleDialogClose} color="secondary">
              Cancel
            </Button>
            <Button
              onClick={handleRescueSubmit}
              style={{
                background: 'linear-gradient(to right, #4facfe, #00f2fe)',
                color: '#fff',
                fontWeight: 'bold',
              }}
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar for feedback messages */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={snackbarSeverity}
            sx={{ width: '100%', backgroundColor: snackbarSeverity === 'success' ? '#4caf50' : '#f44336' }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Paper>
    </div>
  );
};

export default ManageRescue;
