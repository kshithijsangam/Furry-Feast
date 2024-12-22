import React from 'react';
import { Box, Typography, TextField, Button, Divider, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const SettingsPage = () => {
    const navigate = useNavigate();

    const handleSave = () => {
        alert('Settings saved successfully!');
    };

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
                maxWidth: 700,
                margin: '40px auto',
                position: 'relative',
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
                <ArrowBackIcon />
            </IconButton>

            {/* Page Title */}
            <Typography variant="h4" fontWeight="bold" gutterBottom textAlign="center">
                Settings
            </Typography>
            <Divider sx={{ marginBottom: 3 }} />

            {/* Profile Update Section */}
            <Typography variant="h6" fontWeight="medium" gutterBottom>
                Update Profile
            </Typography>
            <TextField
                label="Full Name"
                variant="outlined"
                fullWidth
                sx={{ marginBottom: 2 }}
            />
            <TextField
                label="Email Address"
                type="email"
                variant="outlined"
                fullWidth
                sx={{ marginBottom: 3 }}
            />

            {/* Password Change Section */}
            <Typography variant="h6" fontWeight="medium" gutterBottom>
                Change Password
            </Typography>
            <TextField
                label="Current Password"
                type="password"
                variant="outlined"
                fullWidth
                sx={{ marginBottom: 2 }}
            />
            <TextField
                label="New Password"
                type="password"
                variant="outlined"
                fullWidth
                sx={{ marginBottom: 3 }}
            />

            {/* Save Button */}
            <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSave}
                sx={{
                    padding: 1.5,
                    fontSize: '16px',
                    fontWeight: 'bold',
                    borderRadius: 2,
                }}
            >
                Save Settings
            </Button>
        </Box>
    );
};

export default SettingsPage;
