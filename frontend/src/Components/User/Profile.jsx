import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../Layout/Loader';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getToken } from '../../utils/helpers';
import { Box, Avatar, Typography, Button, Paper, Grid, Divider, Stack } from '@mui/material';

const Profile = () => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState('');

    const getProfile = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        };
        try {
            const { data } = await axios.get(`http://localhost:8080/api/v1/me`, config);
            setUser(data.user);
            setLoading(false);
        } catch (error) {
            console.log(error);
            toast.error('Invalid user or password', {
                position: 'bottom-center',
            });
        }
    };

    useEffect(() => {
        getProfile();
    }, []);

    if (loading) {
        return <Loader />;
    }

    return (
        <>
            <Box sx={{ padding: 3 }}>
                <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                    My Profile
                </Typography>

                <Paper elevation={3} sx={{ padding: 4, borderRadius: 3, backgroundColor: '#f9f9f9' }}>
                    <Grid container spacing={4} alignItems="center">
                        {/* Avatar and Edit Profile Button */}
                        <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
                            <Avatar
                                src={user.avatar ? user.avatar.url : ''}
                                alt={user.name}
                                sx={{
                                    width: 150,
                                    height: 150,
                                    margin: '0 auto',
                                }}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{ marginTop: 3 }}
                                component={Link}
                                to="/me/update"
                            >
                                Edit Profile
                            </Button>
                        </Grid>

                        {/* User Details */}
                        <Grid item xs={12} md={8}>
                            <Stack spacing={2}>
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                        Full Name
                                    </Typography>
                                    <Typography>{user.name}</Typography>
                                </Box>
                                <Divider />
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                        Email Address
                                    </Typography>
                                    <Typography>{user.email}</Typography>
                                </Box>
                                <Divider />
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                        Joined On
                                    </Typography>
                                    <Typography>
                                        {user.createdAt
                                            ? String(user.createdAt).substring(0, 10)
                                            : 'N/A'}
                                    </Typography>
                                </Box>
                            </Stack>

                            {/* Buttons */}
                            <Stack direction="row" spacing={2} sx={{ marginTop: 4 }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    component={Link}
                                    to="/password/update"
                                >
                                    Change Password
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        </>
    );
};

export default Profile;
