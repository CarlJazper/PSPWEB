import React from 'react';
import { Box, Card, CardMedia, CardContent, Typography, Link } from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import VideocamIcon from '@mui/icons-material/Videocam';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';

const Services = () => {
  const services = [
    { title: 'Fitness Equipment', image: '/images/service-img-1.jpg', icon: <FitnessCenterIcon sx={{ fontSize: 40, color: '#CF9717' }} />, description: 'Top-of-the-line gym equipment designed for all fitness levels.' },
    { title: 'Personal Trainer', image: '/images/service-img-2.jpg', icon: <SelfImprovementIcon sx={{ fontSize: 40, color: 'white' }} />, description: 'Expert trainers to guide you towards your fitness goals.' },
    { title: 'Online Classes', image: '/images/service-img-3.jpg', icon: <VideocamIcon sx={{ fontSize: 40, color: 'red' }} />, description: 'Access live and on-demand fitness classes from the comfort of home.' },
    { title: 'Health Assessment', image: '/images/service-img-4.jpg', icon: <HealthAndSafetyIcon sx={{ fontSize: 40, color: 'green' }} />, description: 'Comprehensive assessments to track your health and progress.' },
  ];

  return (
    <Box className="services-page" sx={{ color: '#fff', py: 3 }}>
      <Typography variant="h4" component="h2" sx={{ textAlign: 'center', mb: 4, fontWeight: 'bold' }}>
        Our Services
      </Typography>

      <Box
        className="services-container"
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 3,
          px: 2,
        }}
      >
        {services.map((service, index) => (
          <Card
            key={index}
            className="service-card"
            sx={{
              width: 250,
              textAlign: 'center',
              bgcolor: 'rgba(0, 0, 0, 0.6)',
              borderRadius: 3,
              p: 3,
              boxShadow: 4,
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: 12,
              },
            }}
          >
            <CardMedia
              component="img"
              image={service.image}
              alt={service.title}
              sx={{
                width: '100%',
                aspectRatio: '3 / 3',
                borderRadius: 2,
                mb: 2,
                objectFit: 'cover',
              }}
            />
            <CardContent>
              {service.icon}
              <Typography variant="h6" component="h3" sx={{ fontSize: 18, mb: 1, fontWeight: 600, color: '#fff' }}>
                {service.title}
              </Typography>
              <Typography variant="body2" sx={{ color: '#ddd', mb: 2 }}>
                {service.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Box
        className="membership-section"
        sx={{ textAlign: 'center', mt: 5, width: '100%' }}
      >
        <Link
          href="/memberships"
          className="membership-link"
          sx={{
            fontSize: 22,
            fontWeight: 'bold',
            color: '#f0a500',
            textDecoration: 'none',
            transition: 'color 0.3s ease',
            '&:hover': { color: '#fff', textDecoration: 'underline' },
          }}
        >
          Become a Member Now &raquo;
        </Link>
      </Box>
    </Box>
  );
};

export default Services;