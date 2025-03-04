import React from 'react';
import { Box, Card, CardMedia, CardContent, Typography, Link, Container, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import VideocamIcon from '@mui/icons-material/Videocam';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Services = () => {
  const services = [
    {
      title: 'Fitness Equipment',
      image: '/images/service-img-1.jpg',
      icon: <FitnessCenterIcon sx={{ fontSize: 35, color: '#fff' }} />,
      description: 'Top-of-the-line gym equipment designed for all fitness levels.',
      gradient: 'linear-gradient(135deg, #FF6B6B, #FF8E53)',
    },
    {
      title: 'Personal Trainer',
      image: '/images/service-img-2.jpg',
      icon: <SelfImprovementIcon sx={{ fontSize: 35, color: '#fff' }} />,
      description: 'Expert trainers to guide you towards your fitness goals.',
      gradient: 'linear-gradient(135deg, #4ECDC4, #45B7AF)',
    },
    {
      title: 'Online Classes',
      image: '/images/service-img-3.jpg',
      icon: <VideocamIcon sx={{ fontSize: 35, color: '#fff' }} />,
      description: 'Access live and on-demand fitness classes from the comfort of home.',
      gradient: 'linear-gradient(135deg, #A66CFF, #9C55FF)',
    },
    {
      title: 'Health Assessment',
      image: '/images/service-img-4.jpg',
      icon: <HealthAndSafetyIcon sx={{ fontSize: 35, color: '#fff' }} />,
      description: 'Comprehensive assessments to track your health and progress.',
      gradient: 'linear-gradient(135deg, #3EECAC, #3BE9AA)',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <Box
      sx={{
        color: '#fff',
        py: 8,
        minHeight: '100vh',
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h2"
            sx={{
              textAlign: 'center',
              mb: 6,
              fontWeight: 800,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Our Services
          </Typography>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Grid container spacing={4} justifyContent="center">
            {services.map((service, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div variants={cardVariants} style={{ height: '100%' }}>
                  <Card
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                      background: 'rgba(255, 255, 255, 0.05)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: 4,
                      overflow: 'visible',
                      position: 'relative',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-10px)',
                        '& .service-overlay': {
                          opacity: 0.7,
                        },
                      },
                    }}
                  >
                    <Box sx={{ position: 'relative', height: 200 }}>
                      <CardMedia
                        component="img"
                        image={service.image}
                        alt={service.title}
                        sx={{
                          height: '100%',
                          width: '100%',
                          objectFit: 'cover',
                        }}
                      />
                      <Box
                        className="service-overlay"
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: service.gradient,
                          opacity: 0,
                          transition: 'opacity 0.3s ease',
                        }}
                      />
                    </Box>

                    <Box
                      sx={{
                        position: 'absolute',
                        top: 160,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: service.gradient,
                        width: 70,
                        height: 70,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                        border: '3px solid rgba(255, 255, 255, 0.1)',
                        zIndex: 2,
                      }}
                    >
                      {service.icon}
                    </Box>

                    <CardContent
                      sx={{
                        flexGrow: 1,
                        textAlign: 'center',
                        p: 3,
                        mt: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                      }}
                    >
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 600,
                          mb: 2,
                          color: '#fff',
                          fontSize: '1.25rem',
                        }}
                      >
                        {service.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: 'rgba(255,255,255,0.8)',
                          lineHeight: 1.6,
                          fontSize: '0.95rem',
                        }}
                      >
                        {service.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <Box
            sx={{
              textAlign: 'center',
              mt: 8,
            }}
          >
            <Link
              href="/memberships"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                background: 'linear-gradient(45deg, #FF6B6B, #FF8E53)',
                color: '#fff',
                py: 2,
                px: 4,
                borderRadius: 2,
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '1.2rem',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 10px 20px rgba(255,107,107,0.3)',
                },
              }}
            >
              Become a Member Now
              <ArrowForwardIcon sx={{ ml: 1 }} />
            </Link>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Services;
