import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Typography,
  MenuItem,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

const UpdateTrainer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    birthdate: "",
    address: "",
    phone: "",
    email: "",
    sessions: 0,
    sessionRate: "",
    total: "",
    package: "",
    status: "active",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/v1/availTrainer/get-trainer/${id}`)
      .then((response) => {
        const trainerData = response.data;

        // Format birthdate to YYYY-MM-DD
        const formattedDate = trainerData.birthdate
          ? new Date(trainerData.birthdate).toISOString().split("T")[0]
          : "";

        setFormData({
          ...trainerData,
          birthdate: formattedDate, // Set formatted date
        });
      })
      .catch((error) => console.error("Error fetching trainer:", error));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `http://localhost:8000/api/v1/availTrainer/update-trainer/${id}`,
        formData
      )
      .then(() => navigate("/admin/trainers"))
      .catch((error) => console.error("Error updating trainer:", error));
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Update Trainer
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          fullWidth
          margin="normal"
          onChange={handleChange}
          value={formData.name}
          required
        />
        <TextField
          label="Birthdate"
          name="birthdate"
          type="date"
          fullWidth
          margin="normal"
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          value={formData.birthdate}
          required
        />
        <TextField
          label="Sessions"
          name="sessions"
          type="number"
          fullWidth
          margin="normal"
          onChange={handleChange}
          value={formData.sessions}
          required
        />
        <TextField
          select
          label="Status"
          name="status"
          fullWidth
          margin="normal"
          onChange={handleChange}
          value={formData.status}
        >
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="inactive">Inactive</MenuItem>
        </TextField>
        <Button type="submit" variant="contained" color="primary">
          Update Trainer
        </Button>
      </form>
    </Container>
  );
};

export default UpdateTrainer;
