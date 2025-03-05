import React, { useEffect, useState } from "react";
import axios from "axios";
import {Container,TextField,Button,Typography,MenuItem,Box,Paper,Grid,IconButton,useTheme,alpha,CircularProgress,Alert,Snackbar,Chip,Divider,} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
// Import Icons
import PersonIcon from "@mui/icons-material/Person";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import WorkIcon from "@mui/icons-material/Work";

import baseURL from "../../../utils/baseUrl";


const UpdateTrainer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();

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
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    fetchTrainerDetails();
  }, [id]);

  const fetchTrainerDetails = async () => {
    try {
      const response = await axios.get(`${baseURL}/availTrainer/get-trainer/${id}`);
      const trainerData = response.data;
      const formattedDate = trainerData.birthdate
        ? new Date(trainerData.birthdate).toISOString().split("T")[0]
        : "";

      setFormData({
        ...trainerData,
        birthdate: formattedDate,
      });
    } catch (error) {
      console.error("Error fetching trainer:", error);
      setSnackbar({
        open: true,
        message: "Error fetching trainer details",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      await axios.put(
        `${baseURL}/availTrainer/update-trainer/${id}`,
        formData
      );
      setSnackbar({
        open: true,
        message: "Trainer updated successfully!",
        severity: "success",
      });
      setTimeout(() => navigate("/admin/trainers"), 2000);
    } catch (error) {
      console.error("Error updating trainer:", error);
      setSnackbar({
        open: true,
        message: "Error updating trainer",
        severity: "error",
      });
    } finally {
      setUpdating(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (loading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        height="60vh"
        flexDirection="column"
        gap={2}
      >
        <CircularProgress size={40} />
        <Typography variant="body1" color="text.secondary">
          Loading trainer details...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 900, margin: "0 auto", p: 2 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 3,
          background: theme.palette.background.paper,
          boxShadow: "0 4px 20px 0 rgba(0,0,0,0.05)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 4,
            gap: 1,
            borderBottom: `1px solid ${theme.palette.divider}`,
            pb: 2,
          }}
        >
          <IconButton
            onClick={() => navigate("/admin/trainers")}
            sx={{
              mr: 1,
              color: theme.palette.text.secondary,
              "&:hover": { backgroundColor: alpha(theme.palette.primary.main, 0.1) },
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <PersonIcon sx={{ fontSize: 28, color: theme.palette.primary.main }} />
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Update Trainer
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Divider>
                <Chip label="Personal Information" color="primary" />
              </Divider>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                <PersonIcon sx={{ color: "text.secondary", mt: 2 }} />
                <TextField
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                <CalendarTodayIcon sx={{ color: "text.secondary", mt: 2 }} />
                <TextField
                  fullWidth
                  label="Birthdate"
                  name="birthdate"
                  type="date"
                  value={formData.birthdate}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                <EmailIcon sx={{ color: "text.secondary", mt: 2 }} />
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  required
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                <PhoneIcon sx={{ color: "text.secondary", mt: 2 }} />
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                <LocationOnIcon sx={{ color: "text.secondary", mt: 2 }} />
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Divider>
                <Chip label="Session Details" color="primary" />
              </Divider>
            </Grid>

            <Grid item xs={12} md={4}>
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                <FitnessCenterIcon sx={{ color: "text.secondary", mt: 2 }} />
                <TextField
                  fullWidth
                  label="Sessions"
                  name="sessions"
                  type="number"
                  value={formData.sessions}
                  onChange={handleChange}
                  required
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                <AttachMoneyIcon sx={{ color: "text.secondary", mt: 2 }} />
                <TextField
                  fullWidth
                  label="Session Rate"
                  name="sessionRate"
                  type="number"
                  value={formData.sessionRate}
                  onChange={handleChange}
                  required
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                <WorkIcon sx={{ color: "text.secondary", mt: 2 }} />
                <TextField
                  select
                  fullWidth
                  label="Status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </TextField>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate("/admin/trainers")}
                  fullWidth
                  sx={{
                    py: 1.5,
                    textTransform: "none",
                    borderRadius: 2,
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={updating}
                  startIcon={updating ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    <SaveIcon />
                  )}
                  fullWidth
                  sx={{
                    py: 1.5,
                    textTransform: "none",
                    borderRadius: 2,
                    backgroundColor: theme.palette.primary.main,
                    "&:hover": {
                      backgroundColor: theme.palette.primary.dark,
                    },
                  }}
                >
                  {updating ? "Updating Trainer..." : "Update Trainer"}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UpdateTrainer;