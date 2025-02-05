import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';

const Home = () => {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeIn(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Box
      sx={{
        color: '#fff',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 3,
        py: { xs: 5, md: 7 },
        opacity: fadeIn ? 1 : 0,
        transition: 'opacity 1s ease-in-out',
      }}
    >
      <Grid container spacing={5} sx={{ maxWidth: '1200px', mx: 'auto' }}>
        {/* Section 1 */}
        <Grid item xs={12} md={6} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2rem', md: '3rem' },
              fontWeight: 'bold',
              lineHeight: 1.3,
              pt: { xs: 2, md: 8 },
              whiteSpace: 'nowrap',
            }}
          >
            ACHIEVE YOUR FITNESS
            <br />
            GOALS WITH US
          </Typography>
        </Grid>

        <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box
            component="img"
            src="/images/home-img-1.jpeg"
            alt="Achieve your fitness goals"
            sx={{
              width: { xs: '80%', md: '400px' },
              height: { xs: 'auto', md: '350px' },
              borderRadius: '41% 59% 51% 49% / 66% 59% 41% 34%',
              objectFit: 'fill',
              boxShadow: 3,
            }}
          />
        </Grid>

        {/* Section 2 */}
        <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box
            component="img"
            src="/images/home-img-2.jpg"
            alt="Exercise benefits"
            sx={{
              width: { xs: '80%', md: '400px' },
              height: { xs: 'auto', md: '350px' },
              borderRadius: '61% 39% 41% 59% / 58% 58% 42% 42%',
              objectFit: 'fill',
              boxShadow: 3,
            }}
          />
        </Grid>

        <Grid item xs={12} md={6} sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '1.3rem', md: '1.4rem' },
              lineHeight: 1.4,
              pt: { xs: 2, md: 17 },
              whiteSpace: 'nowrap',
              display: 'inline-block',
            }}
          >
            Exercise not only changes your body, it changes your mind, attitude,
            <br />
            and your mood.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
