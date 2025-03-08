import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import LogCharts from './LogCharts';
import UserLog from './UserLogs';
import MembershipSales from './MembershipSales';
import GymMonitoring from './GymMonitoring';

const Report = () => {
    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom align="center">
                Combined Reports
            </Typography>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Log Charts
                </Typography>
                <LogCharts />
            </Box>
            <Box>
                <Typography variant="h5" gutterBottom>
                    Gym Monitoring
                </Typography>
                <GymMonitoring />
            </Box>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h5" gutterBottom>
                    User Logs
                </Typography>
                <UserLog />
            </Box>
            <Box>
                <Typography variant="h5" gutterBottom>
                    Membership Sales
                </Typography>
                <MembershipSales />
            </Box>
        </Container>
    );
};

export default Report;
