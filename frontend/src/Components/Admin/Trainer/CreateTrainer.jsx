import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
  Typography,
  Container,
} from "@mui/material";
import axios from "axios";

const CreateTrainer = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    userId: "",
    name: "",
    birthdate: "",
    address: "",
    phone: "",
    email: "",
    homePhone: "",
    workPhone: "",
    sessions: 1,
    sessionRate: "",
    total: 0,
    package: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/users/get-all-users")
      .then((res) => {
        setUsers(Array.isArray(res.data.users) ? res.data.users : []);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setUsers([]);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "userId") {
      const selectedUser = users.find((user) => user._id === value);
      if (selectedUser) {
        setFormData((prev) => ({
          ...prev,
          userId: selectedUser._id,
          name: selectedUser.name || "",
          birthdate: selectedUser.birthDate ? selectedUser.birthDate.split("T")[0] : "",
          address: selectedUser.address || "",
          phone: selectedUser.phone || "",
          email: selectedUser.email || "",
          homePhone: selectedUser.homePhone || "",
          workPhone: selectedUser.workPhone || "",
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));

      if (name === "sessions" || name === "sessionRate") {
        const sessions = name === "sessions" ? parseInt(value, 10) || 1 : formData.sessions;
        const rate = name === "sessionRate" ? parseFloat(value) || 0 : formData.sessionRate;
        setFormData((prev) => ({ ...prev, total: sessions * rate }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/availTrainer/create-trainer",
        formData
      );
      alert("Trainer created successfully!");
      console.log("Trainer Created:", response.data);
    } catch (error) {
      console.error("Error creating trainer:", error);
      alert("Failed to create trainer.");
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h5" sx={{ mb: 3 }}>
        Create Trainer
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>User</InputLabel>
              <Select name="userId" value={formData.userId} onChange={handleChange}>
                <MenuItem value="">Select User</MenuItem>
                {users.map((user) => (
                  <MenuItem key={user._id} value={user._id}>
                    {user.name} ({user.email})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Full Name" name="name" value={formData.name} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth type="date" label="Birthdate" name="birthdate" InputLabelProps={{ shrink: true }} value={formData.birthdate} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Address" name="address" value={formData.address} onChange={handleChange} required />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Phone" name="phone" value={formData.phone} onChange={handleChange} required />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Email" name="email" value={formData.email} onChange={handleChange} required />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Home Phone" name="homePhone" value={formData.homePhone} onChange={handleChange} />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Work Phone" name="workPhone" value={formData.workPhone} onChange={handleChange} />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth type="number" label="Sessions" name="sessions" value={formData.sessions} onChange={handleChange} required />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth type="number" label="Session Rate" name="sessionRate" value={formData.sessionRate} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Total" name="total" value={formData.total} disabled />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Package" name="package" value={formData.package} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Create Trainer
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default CreateTrainer;
