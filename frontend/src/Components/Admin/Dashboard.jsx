import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  useTheme,
  alpha,
  Container
} from '@mui/material';
import { Group, Store, FitnessCenter, Person } from '@mui/icons-material';
import axios from 'axios';
import { getToken } from '../../utils/helpers';
import baseURL from '../../utils/baseURL';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [allUsers, setAllUsers] = useState([]);
  const [branchesCount, setBranchesCount] = useState(0);
  const [exercisesCount, setExercisesCount] = useState(0);
  const [trainersCount, setTrainersCount] = useState(0);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${getToken()}` } };

        const [usersRes, branchesRes, exercisesRes, trainersRes] = await Promise.all([
          axios.get(`${baseURL}/users/get-all-users`, config),
          axios.get(`${baseURL}/branch/get-all-branches`),
          axios.get(`${baseURL}/exercises/get-all-exercise`),
          axios.get(`${baseURL}/availTrainer/get-all-trainers`)
        ]);

        setAllUsers(usersRes.data.users);
        setBranchesCount(branchesRes.data.branch.length);
        setExercisesCount(exercisesRes.data.exercises.length);
        setTrainersCount(trainersRes.data.length);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  const cards = [
    {
      title: 'Users',
      value: allUsers.length,
      icon: Group,
      color: '#007AFF',
      link: '/admin/users'
    },
    {
      title: 'Branches',
      value: branchesCount,
      icon: Store,
      color: '#FF9500',
      link: '/admin/branches'
    },
    {
      title: 'Exercises',
      value: exercisesCount,
      icon: FitnessCenter,
      color: '#34C759',
      link: '/admin/exercises'
    },
    {
      title: 'Trainers',
      value: trainersCount,
      icon: Person,
      color: '#AF52DE',
      link: '/admin/trainers'
    }
  ];

  const renderStatCard = ({ title, value, icon: Icon, color, link }, index) => (
    <Grid item xs={12} sm={6} md={3} key={title}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
      >
        <Card
          sx={{
            background: theme.palette.mode === 'dark'
              ? alpha(color, 0.2)
              : '#ffffff',
            backdropFilter: 'blur(20px)',
            border: `1px solid ${alpha(color, 0.1)}`,
            borderRadius: '24px',
            overflow: 'hidden',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              transform: 'translateY(-8px)',
              boxShadow: `0 20px 40px ${alpha(color, 0.2)}`
            }
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Box
              sx={{
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: theme.palette.mode === 'dark' ? '#ffffff' : '#1D1D1F'
                }}
              >
                {title}
              </Typography>
              <Box
                sx={{
                  p: 1,
                  borderRadius: '12px',
                  backgroundColor: alpha(color, 0.1)
                }}
              >
                <Icon sx={{ color, fontSize: 24 }} />
              </Box>
            </Box>
            <Typography
              variant="h3"
              sx={{
                mb: 3,
                fontWeight: 700,
                color
              }}
            >
              {value}
            </Typography>
            <Button
              component={Link}
              to={link}
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: color,
                color: '#ffffff',
                py: 1.5,
                borderRadius: '12px',
                textTransform: 'none',
                fontSize: '0.9rem',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: alpha(color, 0.8)
                }
              }}
            >
              View Details
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </Grid>
  );

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          py: 5,
          minHeight: '100vh',
          backgroundColor: theme.palette.mode === 'dark' ? '#000000' : 'transparent'
        }}
      >
        <Typography
          variant="h3"
          sx={{
            mb: 5,
            fontWeight: 700,
            textAlign: 'center',
            color: '#ffffff',
            fontSize: { xs: '2rem', md: '2.5rem' }
          }}
        >
          Overview
        </Typography>

        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ height: '50vh' }}
          >
            <CircularProgress
              size={60}
              thickness={4}
              sx={{ color: theme.palette.mode === 'dark' ? '#ffffff' : '#FF9500' }}
            />
          </Box>
        ) : (
          <Grid container spacing={4}>
            {cards.map((card, index) => renderStatCard(card, index))}
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default Dashboard;
