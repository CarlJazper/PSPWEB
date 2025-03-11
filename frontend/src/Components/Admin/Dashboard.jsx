import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Grid, Card, CardContent, Typography, Button, CircularProgress, Divider } from '@mui/material';
import { Group, Store, FitnessCenter, Person } from '@mui/icons-material'; // Added Person icon for trainers
import { getToken } from '../../utils/helpers';
import axios from 'axios';
import baseURL from "../../utils/baseURL";

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [allUsers, setAllUsers] = useState([]);
    const [branchesCount, setBranchesCount] = useState(0);
    const [exercisesCount, setExercisesCount] = useState(0);
    const [trainersCount, setTrainersCount] = useState(0);

    const fetchAdminData = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${getToken()}` } };

            // Fetch users count
            const { data: usersData } = await axios.get(`${baseURL}/users/get-all-users`, config);
            setAllUsers(usersData.users);

            // Fetch branches count
            const { data: branchesData } = await axios.get(`${baseURL}/branch/get-all-branches`);
            setBranchesCount(branchesData.branch.length);

            // Fetch exercises count
            const { data: exercisesData } = await axios.get(`${baseURL}/exercises/get-all-exercise`);
            setExercisesCount(exercisesData.exercises.length);

            // Fetch trainers count
            const { data: trainersData } = await axios.get(`${baseURL}/availTrainer/get-all-trainers`);
            setTrainersCount(trainersData.length);

            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAdminData();
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
                            allUsers.length,
                            <Group sx={{ fontSize: 40 }} />,
                            'linear-gradient(to right, #2196f3, #64b5f6)',
                            '/admin/users'
                        )}
                        {renderStatCard(
                            'Branches',
                            branchesCount,
                            <Store sx={{ fontSize: 40 }} />,
                            'linear-gradient(to right, #ff9800, #ffb74d)',
                            '/admin/branches'
                        )}
                        {renderStatCard(
                            'Exercises',
                            exercisesCount,
                            <FitnessCenter sx={{ fontSize: 40 }} />,
                            'linear-gradient(to right, #4caf50, #81c784)',
                            '/admin/exercises'
                        )}
                        {renderStatCard(
                            'Trainers',
                            trainersCount,
                            <Person sx={{ fontSize: 40 }} />, // 👤 Person icon for trainers
                            'linear-gradient(to right, #9c27b0, #ba68c8)',
                            '/admin/trainers' // Navigates to Trainers List page
                        )}
                    </Grid>
                )}
            </Box>
        </Box>
    );
};

export default Dashboard;
