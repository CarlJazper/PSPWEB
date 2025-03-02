import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Container } from "@mui/material";
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
    });

    useEffect(() => {
        axios.get(`http://localhost:8000/api/v1/exercises/get-exercise/${id}`)
            .then((res) => setExercise(res.data.exercise))
            .catch((err) => console.error("Error fetching exercise:", err));
    }, [id]);

    const handleChange = (e) => {
        setExercise({ ...exercise, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/v1/exercises/update-exercise/${id}`, exercise)
            .then(() => {
                alert("Exercise updated successfully");
                navigate("/exercises");
            })
            .catch((err) => console.error("Update error:", err));
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" sx={{ mb: 3 }}>Update Exercise</Typography>
            <form onSubmit={handleSubmit}>
                <TextField fullWidth label="Name" name="name" value={exercise.name} onChange={handleChange} margin="normal" required />
                <TextField fullWidth label="Type" name="type" value={exercise.type} onChange={handleChange} margin="normal" required />
                <TextField fullWidth label="Target Muscle" name="targetMuscle" value={exercise.targetMuscle} onChange={handleChange} margin="normal" required />
                <TextField fullWidth label="Equipment Used" name="equipmentUsed" value={exercise.equipmentUsed} onChange={handleChange} margin="normal" />
                <TextField fullWidth label="Difficulty" name="difficulty" value={exercise.difficulty} onChange={handleChange} margin="normal" required />
                <TextField fullWidth label="Instructions" name="instructions" value={exercise.instructions} onChange={handleChange} margin="normal" multiline rows={4} />

                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>Update Exercise</Button>
            </form>
        </Container>
    );
};

export default UpdateExercise;
