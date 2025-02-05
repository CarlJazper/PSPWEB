import React from "react";
import { Box, Card, CardContent, Typography, Button, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";

const benefits = [
  "UNLIMITED USE OF GYM",
  "FREE GROUP CLASSES (Circuit training, Zumba, Tabata, Yoga)",
  "ACCESS TO ALL PROVIDER BRANCHES NATIONWIDE",
  "FREE 2 SESSION OF PERSONAL TRAINING",
  "FREE 3 MONTHS FREEZING OF CONTRACT",
  "FREE 5 GUEST PASSES",
  "FREE WIFI",
  "FREE LOCKERS",
  "FREE DRINKING MINERAL WATER",
  "ALL MAJOR CREDIT CARDS ARE ACCEPTED",
];

const Membership = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "center",
        alignItems: "center",
        gap: 4,
        padding: 5,
        minHeight: "100vh",
      }}
    >
      {/* Card Section */}
      <Card
        sx={{
          width: { xs: "100%", md: "40%" },
          color: "#fff",
          background: "rgba(0, 0, 0, 0.1)",
          border: "5px solid #fff",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <CardContent>
          <Typography variant="h5" align="center" sx={{ fontWeight: "bold", mb: 2 }}>
            SIGN UP NOW AND START YOUR FITNESS JOURNEY WITH US 💪
          </Typography>
          <Typography variant="h6" sx={{ mb: 2 }}>MEMBERSHIP INCLUDES:</Typography>
          <List>
            {benefits.map((text, index) => (
              <ListItem key={index} sx={{ pl: 0 }}>
                <ListItemIcon>
                  <CheckCircleIcon sx={{ color: "#4caf50" }} />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Typography variant="body2" sx={{ textAlign: "center", mt: 2, fontWeight: "bold", fontStyle: "italic", color: "#FF2525" }}>
            STRICTLY NO APPOINTMENT, NO DISCOUNT!!
          </Typography>
          <Typography align="center" sx={{ mt: 2 }}>
            MESSAGE US FOR MORE DETAILS <EmojiEmotionsIcon sx={{ color: "#ff9800" }} />
          </Typography>
        </CardContent>
      </Card>

      {/* Image and Call-to-Action Section */}
      <Box
        sx={{
          width: { xs: "100%", md: "50%" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          px: 3,
        }}
      >
        <Box sx={{ mb: 3 }}>
          <img
            src="./images/home-img-1.jpeg"
            alt="Gym Logo"
            style={{
              width: "350px",
              height: "280px",
              objectFit: "cover",
              borderRadius: "41% 59% 51% 49% / 66% 59% 41% 34%",
            }}
          />
        </Box>
        <Typography variant="h5" sx={{ fontStyle: "italic", fontWeight: "bold", mb: 4 }}>
          "If you don't invest in it, if you don't put in the work, you won't get the results."
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#FF2525",
            color: "#fff",
            padding: "10px 25px",
            fontSize: { xs: "1rem", md: "1.2rem" },
            fontWeight: "bold",
            borderRadius: "20px",
            '&:hover': { backgroundColor: "rgba(211, 137, 0, 0.96)" },
          }}
          endIcon={
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: 28,
                height: 28,
                borderRadius: "50%",
                backgroundColor: "#fff",
                color: "#FF2525",
              }}
            >
              <ArrowForwardIosIcon sx={{ fontSize: 18 }} />
            </Box>
          }
        >
          Apply Now!!
        </Button>
      </Box>
    </Box>
  );
};

export default Membership;