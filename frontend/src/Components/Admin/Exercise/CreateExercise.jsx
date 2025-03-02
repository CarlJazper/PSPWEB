import React, { useState } from "react";
import {
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
  Avatar,
  Grid,
} from "@mui/material";
import axios from "axios";

const CreateExercise = ({ onExerciseCreated }) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    targetMuscle: "",
    equipmentUsed: "",
    difficulty: "",
    instructions: "",
    images: [],
  });

  const [loading, setLoading] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]); // For displaying selected images

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "difficulty" ? Number(value) : value, // Convert difficulty to Number
    });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: files });

    // Generate image previews
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "images") {
        formData.images.forEach((file) => {
          data.append("images", file);
        });
      } else {
        data.append(key, formData[key]);
      }
    });

    try {
      await axios.post("http://localhost:8000/api/v1/exercises/create-exercise", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onExerciseCreated(); // Refresh exercise list

      // Reset form and previews
      setFormData({
        name: "",
        type: "",
        targetMuscle: "",
        equipmentUsed: "",
        difficulty: "",
        instructions: "",
        images: [],
      });
      setImagePreviews([]);
    } catch (error) {
      console.error("Error creating exercise", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Create New Exercise
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Exercise Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          margin="normal"
          required
        />
        <FormControl fullWidth margin="normal" required>
          <InputLabel>Type</InputLabel>
          <Select name="type" value={formData.type} onChange={handleChange}>
            <MenuItem value="Strength">Strength</MenuItem>
            <MenuItem value="Cardio">Cardio</MenuItem>
            <MenuItem value="Flexibility">Flexibility</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="Target Muscle"
          name="targetMuscle"
          value={formData.targetMuscle}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Equipment Used"
          name="equipmentUsed"
          value={formData.equipmentUsed}
          onChange={handleChange}
          margin="normal"
        />
        <FormControl fullWidth margin="normal" required>
          <InputLabel>Difficulty</InputLabel>
          <Select name="difficulty" value={formData.difficulty} onChange={handleChange}>
            <MenuItem value={1}>Easy</MenuItem>
            <MenuItem value={2}>Medium</MenuItem>
            <MenuItem value={3}>Hard</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="Instructions"
          name="instructions"
          value={formData.instructions}
          onChange={handleChange}
          margin="normal"
          multiline
          rows={3}
          required
        />

        {/* Image Upload Button */}
        <Box mt={2}>
          <Button variant="contained" component="label">
            Upload Images
            <input type="file" name="images" multiple hidden onChange={handleFileChange} />
          </Button>
        </Box>

        {/* Image Preview */}
        {imagePreviews.length > 0 && (
          <Grid container spacing={2} mt={2}>
            {imagePreviews.map((src, index) => (
              <Grid item key={index}>
                <Avatar
                  src={src}
                  variant="rounded"
                  sx={{ width: 100, height: 100, borderRadius: 2 }}
                />
              </Grid>
            ))}
          </Grid>
        )}

        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
            {loading ? "Creating..." : "Create Exercise"}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default CreateExercise;
