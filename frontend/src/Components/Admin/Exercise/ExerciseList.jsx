import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Box,
  Avatar,
  Button,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ExerciseList = () => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchExercises();
  }, []);

  const fetchExercises = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/api/v1/exercises/get-exercise");
      setExercises(response.data.exercises);
    } catch (error) {
      console.error("Error fetching exercises", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this exercise?")) {
      try {
        await axios.delete(`http://localhost:8000/api/v1/exercises/delete-exercise/${id}`);
        setExercises(exercises.filter((exercise) => exercise._id !== id));
      } catch (error) {
        console.error("Error deleting exercise", error);
      }
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">Exercise List</Typography>
        <Button variant="contained" color="primary" component={Link} to="/admin/create-exercises">
          Create Exercise
        </Button>
      </Box>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" sx={{ py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell sx={{ fontWeight: "bold" }}>Image</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Type</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Target Muscle</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Difficulty</TableCell>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {exercises.length > 0 ? (
                exercises.map((exercise) => (
                  <TableRow key={exercise._id} hover>
                    <TableCell>
                      <Avatar
                        src={exercise.image.length > 0 ? exercise.image[0].url : ""}
                        alt={exercise.name}
                        variant="rounded"
                        sx={{ width: 56, height: 56 }}
                      />
                    </TableCell>
                    <TableCell>{exercise.name}</TableCell>
                    <TableCell>{exercise.type}</TableCell>
                    <TableCell>{exercise.targetMuscle}</TableCell>
                    <TableCell>{exercise.difficulty}</TableCell>
                    <TableCell align="center">
                      <IconButton component={Link} to={`/admin/update-exercise/${exercise._id}`} color="primary">
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(exercise._id)} color="error">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 3, fontStyle: "italic", color: "gray" }}>
                    No exercises found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
};

export default ExerciseList;
