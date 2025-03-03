import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Container,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import axios from "axios";

const UpdateExercise = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exercise, setExercise] = useState({
    name: "",
    type: "",
    targetMuscle: "",
    equipmentUsed: "",
    difficulty: "",
    instructions: "",
    images: [], // Store existing images
  });
  const [newImages, setNewImages] = useState([]); // Stores new image files

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/v1/exercises/get-exercise/${id}`)
      .then((res) => {
        const data = res.data.exercise;
        setExercise({
          ...data,
          difficulty: Number(data.difficulty), // Ensure difficulty is a number
          images: data.image || [], // Store existing images as an array
        });
      })
      .catch((err) => console.error("Error fetching exercise:", err));
  }, [id]);

  const handleChange = (e) => {
    setExercise({
      ...exercise,
      [e.target.name]: e.target.name === "difficulty" ? Number(e.target.value) : e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setNewImages([...e.target.files]); // Store multiple files
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", exercise.name);
    formData.append("type", exercise.type);
    formData.append("targetMuscle", exercise.targetMuscle);
    formData.append("equipmentUsed", exercise.equipmentUsed);
    formData.append("difficulty", exercise.difficulty);
    formData.append("instructions", exercise.instructions);

    if (newImages.length > 0) {
      for (const image of newImages) {
        formData.append("images", image); // Append multiple images
      }
    }

    try {
      await axios.put(
        `http://localhost:8000/api/v1/exercises/update-exercise/${id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      alert("Exercise updated successfully");
      navigate("/admin/exercises");
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" sx={{ mb: 3 }}>
        Update Exercise
      </Typography>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <TextField fullWidth label="Name" name="name" value={exercise.name} onChange={handleChange} margin="normal" required />

        <FormControl fullWidth margin="normal" required>
          <InputLabel>Type</InputLabel>
          <Select name="type" value={exercise.type} onChange={handleChange}>
            <MenuItem value="Strength">Strength</MenuItem>
            <MenuItem value="Cardio">Cardio</MenuItem>
            <MenuItem value="Flexibility">Flexibility</MenuItem>
          </Select>
        </FormControl>

        <TextField fullWidth label="Target Muscle" name="targetMuscle" value={exercise.targetMuscle} onChange={handleChange} margin="normal" required />
        <TextField fullWidth label="Equipment Used" name="equipmentUsed" value={exercise.equipmentUsed} onChange={handleChange} margin="normal" />

        <FormControl fullWidth margin="normal" required>
          <InputLabel>Difficulty</InputLabel>
          <Select name="difficulty" value={exercise.difficulty} onChange={handleChange}>
            <MenuItem value={1}>Easy</MenuItem>
            <MenuItem value={2}>Medium</MenuItem>
            <MenuItem value={3}>Hard</MenuItem>
          </Select>
        </FormControl>

        <TextField fullWidth label="Instructions" name="instructions" value={exercise.instructions} onChange={handleChange} margin="normal" multiline rows={4} required />

        {/* Display Existing Images */}
        {exercise.images.length > 0 && (
          <div style={{ marginBottom: "1rem" }}>
            <Typography variant="subtitle1">Current Images:</Typography>
            {exercise.images.map((img, index) => (
              <img key={index} src={img.url} alt="Exercise" style={{ width: "100px", height: "100px", objectFit: "cover", marginRight: "8px" }} />
            ))}
          </div>
        )}

        {/* Upload New Images */}
        <Button variant="contained" component="label" sx={{ mb: 2 }}>
          Upload New Images
          <input type="file" hidden accept="image/*" multiple onChange={handleImageChange} />
        </Button>

        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Update Exercise
        </Button>
      </form>
    </Container>
  );
};

export default UpdateExercise;
