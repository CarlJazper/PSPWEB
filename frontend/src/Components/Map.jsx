import React from "react";
import { Box, Grid, Typography, Card } from "@mui/material";

const LocationSection = () => {
  const googleMapsEmbedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3012.6666383407123!2d121.05067047376188!3d14.504710579419877!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397cf39abfb4025%3A0x722dd534b9375291!2s138%20Ballecer%20St%2C%20Taguig%2C%201630%20Metro%20Manila!5e1!3m2!1sen!2sph!4v1738224446432!5m2!1sen!2sph";

  return (
    <Box sx={{ padding: { xs: 2, md: 4 } }}>
      <Grid container spacing={3} alignItems="center" justifyContent="center">
        
        {/* Left Side - Image Gallery */}
        <Grid item xs={12} md={4}>
          <Grid container spacing={0.5}>
            {[
              "/images/map-page-1.jpg",
              "/images/map-page-2.jpg",
              "/images/map-page-3.jpg",
            ].map((image, index) => (
              <Grid item xs={12} key={index}>
                <Card
                  sx={{
                    height: { xs: "15rem", md: "20rem" },
                    overflow: "hidden",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  <img
                    src={image}
                    alt={`Map ${index + 1}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Right Side - Map */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              borderRadius: "15px",
              overflow: "hidden",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
              height: { xs: "20rem", md: "40rem" },
            }}
          >
            <iframe
              src={googleMapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Google Map - Gym Location"
            ></iframe>
          </Card>
        </Grid>
      </Grid>

      {/* Location Text */}
      <Typography
        variant="h6"
        sx={{
          color: "#fff",
          textAlign: "center",
          fontWeight: "bold",
          marginTop: "2rem",
          padding: { xs: 1, md: 2 },
        }}
      >
        LOCATION:{" "}
        <span style={{ color: "#CB981B" }}>
          4/F 138 Balcacer St (Green Building beside Jollibee Triumph)
        </span>
      </Typography>
    </Box>
  );
};

export default LocationSection;