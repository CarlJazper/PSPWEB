import React, { useState } from "react";
import { TextField, Button, Typography, Grid, Paper } from "@mui/material";
import axios from "axios";

const CreateBranch = ({ onBranchCreated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    place: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/v1/branch/create-branch", formData);
      setFormData({ name: "", email: "", contact: "", place: "" });
      onBranchCreated(); // Notify parent to refresh list
    } catch (error) {
      console.error("Error creating branch", error);
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 3 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Create Branch
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField fullWidth label="Branch Name" name="name" value={formData.name} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Email" type="email" name="email" value={formData.email} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Contact" name="contact" value={formData.contact} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Location" name="place" value={formData.place} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Create Branch
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default CreateBranch;
