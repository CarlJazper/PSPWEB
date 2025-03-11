import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, CircularProgress, Alert } from '@mui/material';
import baseURL from "../../../utils/baseURL";

const ActiveCoaches = () => {
    const [coaches, setCoaches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchActiveCoaches = async () => {
            try {
                const response = await axios.get(`${baseURL}/availTrainer/get-all-trainers`);
                const activeCoaches = response.data.filter(coach => coach.status === 'active');
                setCoaches(activeCoaches);
            } catch (err) {
                setError('Error fetching active coaches');
            } finally {
                setLoading(false);
            }
        };
        fetchActiveCoaches();
    }, []);

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <div>
            <Typography variant="h5" gutterBottom>Active Coaches</Typography>
            {coaches.length > 0 ? (
                coaches.map(coach => (
                    <Card key={coach._id} sx={{ marginBottom: 2 }}>
                        <CardContent>
                            <Typography variant="h6">{coach.name}</Typography>
                            <Typography>Email: {coach.email}</Typography>
                            <Typography>Phone: {coach.phone}</Typography>
                            <Typography>Status: {coach.status}</Typography>
                        </CardContent>
                    </Card>
                ))
            ) : (
                <Typography>No active coaches available.</Typography>
            )}
        </div>
    );
};

export default ActiveCoaches;
