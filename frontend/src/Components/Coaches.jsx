import React, { useState, useEffect } from 'react';
import { Box, Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import { getUser } from '../utils/helpers';

const Coaches = () => {
  const [user, setUser] = useState(getUser());

  useEffect(() => {
    const interval = setInterval(() => {
      setUser(getUser());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const coaches = [
    { title: 'Richard Picar', image: '/images/coach-1.jpg' },
    { title: 'Emilie Reyes', image: '/images/coach-2.jpg' },
    { title: 'Joshua Pascaldo', image: '/images/coach-3.jpg' },
    { title: 'Brian Mendez', image: '/images/coach-4.jpg' },
  ];

  return (
    <Box className="coaches-page" sx={{ color: '#fff', py: 3 }}>
      <Box
        className="coaches-container"
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
          gap: 2,
          px: 2,
        }}
      >
        {coaches.map((coach, index) => (
          <Card
            key={index}
            className="coach-card"
            sx={{
              width: 250,
              textAlign: 'center',
              bgcolor: 'rgba(0, 0, 0, 0.6)',
              borderRadius: 2,
              p: 2,
              boxShadow: 3,
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: 8,
              },
            }}
          >
            <CardMedia
              component="img"
              image={coach.image}
              alt={coach.title}
              sx={{
                width: '100%',
                aspectRatio: '3 / 3',
                borderRadius: 2,
                objectFit: 'fill',
              }}
            />
            <CardContent>
              <Typography variant="h6" component="h3" sx={{ fontSize: 16, mb: 1, color: '#fff' }}>
                {coach.title}
              </Typography>
              {user && (
                <Button
                  variant="contained"
                  sx={{
                    mt: 2,
                    backgroundColor: '#FF2525',
                    color: '#fff',
                    fontWeight: 'bold',
                    '&:hover': { backgroundColor: '#e53935' },
                  }}
                >
                  Apply Now
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Quote Section */}
      <Box className="quote-section" sx={{ display: 'flex', mt: 3 }}>
        <Typography
          variant="h6"
          component="h2"
          sx={{
            textAlign: 'center',
            fontWeight: 'light',
            fontSize: 20,
            mt: 2,
            pr: 12,
          }}
        >
          “If you want something you've never had, you must be willing to do something
          you've never done.”
        </Typography>
      </Box>
    </Box>
  );
};

export default Coaches;
