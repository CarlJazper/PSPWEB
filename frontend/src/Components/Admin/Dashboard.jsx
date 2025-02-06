import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Grid, Card, CardContent, Typography, Button, CircularProgress, Divider } from '@mui/material';
import { Group } from '@mui/icons-material';

import MetaData from '../Layout/MetaData';
import { getToken } from '../../utils/helpers';
import axios from 'axios';

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [allUsers, setAllUsers] = useState([]);

    const adminUsers = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${getToken()}` } };
            const { data } = await axios.get(`https://pspmobile.onrender.com/api/v1/users/get-all-users`, config);
            setAllUsers(data.users);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        adminUsers();
    }, []);

    const renderStatCard = (title, value, icon, gradient, link) => (
        <Grid item xs={12} sm={6} md={3}>
            <Card
                sx={{
                    background: gradient,
                    color: '#fff',
                    borderRadius: 2,
                    boxShadow: 5,
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': { transform: 'scale(1.05)' },
                }}
            >
                <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Typography variant="h6">{title}</Typography>
                        {icon}
                    </Box>
                    <Divider sx={{ background: 'rgba(255,255,255,0.3)', mb: 2 }} />
                    <Typography variant="h4" align="center">
                        {value}
                    </Typography>
                </CardContent>
                {link && (
                    <Button
                        component={Link}
                        to={link}
                        sx={{ justifyContent: 'center', width: '100%', color: '#fff', textTransform: 'none' }}
                        variant="text"
                    >
                        View Details
                    </Button>
                )}
            </Card>
        </Grid>
    );

    return (
        <Box display="flex">
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <MetaData title="Admin Dashboard" />
                <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
                    Dashboard
                </Typography>
                {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: '50vh' }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <Grid container spacing={3}>
                        {renderStatCard(
                            'Users',
                            allUsers.length, // ✅ Correctly displays user count
                            <Group sx={{ fontSize: 40 }} />,
                            'linear-gradient(to right, #2196f3, #64b5f6)',
                            '/admin/users'
                        )}
                    </Grid>
                )}
            </Box>
        </Box>
    );
};

export default Dashboard;
