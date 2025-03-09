import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardMedia, Typography, Grid, CircularProgress, Box } from "@mui/material";
import baseURL from "../utils/baseUrl";

const Exercise = () => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get(`${baseURL}/exercises/get-all-exercise`);
        setExercises(response.data.exercises);
      } catch (error) {
        console.error("Error fetching exercises:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
        Exercise List
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {exercises.map((exercise) => (
            <Grid item xs={12} sm={6} md={4} key={exercise._id}>
              <Card sx={{ maxWidth: 345, borderRadius: 2, boxShadow: 3 }}>
                {exercise.image.length > 0 && (
                  <CardMedia
                    component="img"
                    height="200"
                    image={exercise.image[0].url}
                    alt={exercise.name}
                  />
                )}
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {exercise.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Type:</strong> {exercise.type}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Target Muscle:</strong> {exercise.targetMuscle}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Equipment Used:</strong> {exercise.equipmentUsed}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Difficulty:</strong> {exercise.difficulty} / 5
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {exercise.instructions}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Exercise;
