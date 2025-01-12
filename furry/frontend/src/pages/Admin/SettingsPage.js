import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Divider,
    IconButton,
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SettingsPage = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch user data from the backend
        axios
            .get('http://localhost:5000/api/users')
            .then((response) => {
                setUsers(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
                setLoading(false);
            });
    }, []);

    const handleBack = () => {
        navigate(-1); // Navigate to the previous page
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                backgroundImage: 'url(https://images.pexels.com/photos/18164468/pexels-photo-18164468/free-photo-of-a-bird-is-perched-on-a-branch-in-front-of-a-sunset.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Box
                sx={{
                    padding: 4,
                    backgroundColor: 'rgba(255, 255, 255, 0.85)', // Semi-transparent background
                    borderRadius: 3,
                    boxShadow: 3,
                    maxWidth: 900,
                    width: '100%',
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
                <Typography
                    variant="h4"
                    fontWeight="bold"
                    gutterBottom
                    textAlign="center"
                    sx={{ color: 'text.primary' }}
                >
                    User Directory
                </Typography>
                <Divider sx={{ marginBottom: 3 }} />

                {/* Content */}
                {loading ? (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '200px',
                        }}
                    >
                        <CircularProgress />
                    </Box>
                ) : (
                    <TableContainer
                        component={Paper}
                        sx={{
                            marginTop: 3,
                            border: '1px solid',
                            borderColor: 'divider',
                            borderRadius: 2,
                        }}
                    >
                        <Table>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: 'primary.light' }}>
                                    <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Username</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((user) => (
                                    <TableRow
                                        key={user.id}
                                        sx={{
                                            '&:hover': { backgroundColor: 'action.hover' },
                                        }}
                                    >
                                        <TableCell>{user.id}</TableCell>
                                        <TableCell>{user.username}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Box>
        </Box>
    );
};

export default SettingsPage;
