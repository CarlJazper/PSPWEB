import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const TrainerList = () => {
  const [trainers, setTrainers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/availTrainer/get-all-trainers")
      .then((response) => setTrainers(response.data))
      .catch((error) => console.error("Error fetching trainers:", error));
  }, []);

  const handleEdit = (id) => {
    navigate(`/admin/update-trainer/${id}`);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8000/api/v1/availTrainer/delete-trainer/${id}`)
      .then(() => setTrainers(trainers.filter((trainer) => trainer._id !== id)))
      .catch((error) => console.error("Error deleting trainer:", error));
  };

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4" gutterBottom>
          Trainer List
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => navigate("/admin/create-trainer")}
        >
          Create Trainer
        </Button>
      </Box>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Sessions</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trainers.map((trainer) => (
              <TableRow key={trainer._id}>
                <TableCell>{trainer.name}</TableCell>
                <TableCell>{trainer.email}</TableCell>
                <TableCell>{trainer.phone}</TableCell>
                <TableCell>{trainer.sessions}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(trainer._id)}>Edit</Button>
                  <Button color="error" onClick={() => handleDelete(trainer._id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default TrainerList;
