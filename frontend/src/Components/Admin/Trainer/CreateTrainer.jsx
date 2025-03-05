import React, { useState, useEffect } from "react";
import {TextField,Button,MenuItem,Select,FormControl,InputLabel,Grid,Typography,Container,Paper,Box,IconButton,useTheme,alpha,CircularProgress,Alert,Snackbar,Divider,Chip,} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// Import Icons
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import WorkIcon from "@mui/icons-material/Work";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

import baseURL from "../../../utils/baseUrl";


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
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${baseURL}/users/get-all-users`);
      setUsers(Array.isArray(res.data.users) ? res.data.users : []);
    } catch (err) {
      console.error("Error fetching users:", err);
      setUsers([]);
      setSnackbar({
        open: true,
        message: "Error fetching users. Please try again.",
        severity: "error",
      });
    }
  };

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
    setLoading(true);

    try {
      await axios.post(`${baseURL}/availTrainer/create-trainer`, formData);
      setSnackbar({
        open: true,
        message: "Trainer created successfully!",
        severity: "success",
      });
      setTimeout(() => navigate("/admin/trainers"), 2000);
    } catch (error) {
      console.error("Error creating trainer:", error);
      setSnackbar({
        open: true,
        message: "Failed to create trainer. Please try again.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
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
          <PersonAddIcon sx={{ fontSize: 28, color: theme.palette.primary.main }} />
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Create New Trainer
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                <PersonIcon sx={{ color: "text.secondary", mt: 2 }} />
                <FormControl fullWidth>
                  <InputLabel>Select User</InputLabel>
                  <Select
                    name="userId"
                    value={formData.userId}
                    onChange={handleChange}
                    sx={{ "& .MuiSelect-select": { display: "flex", alignItems: "center", gap: 1 } }}
                  >
                    <MenuItem value="">
                      <em>Select a user</em>
                    </MenuItem>
                    {users.map((user) => (
                      <MenuItem key={user._id} value={user._id}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <PersonIcon sx={{ fontSize: 20 }} />
                          {user.name} - {user.email}
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Grid>

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
                  type="date"
                  label="Birthdate"
                  name="birthdate"
                  InputLabelProps={{ shrink: true }}
                  value={formData.birthdate}
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
                <Chip label="Contact Information" color="primary" />
              </Divider>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                <PhoneIcon sx={{ color: "text.secondary", mt: 2 }} />
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
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
                  required
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                <HomeIcon sx={{ color: "text.secondary", mt: 2 }} />
                <TextField
                  fullWidth
                  label="Home Phone"
                  name="homePhone"
                  value={formData.homePhone}
                  onChange={handleChange}
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                <WorkIcon sx={{ color: "text.secondary", mt: 2 }} />
                <TextField
                  fullWidth
                  label="Work Phone"
                  name="workPhone"
                  value={formData.workPhone}
                  onChange={handleChange}
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
                  type="number"
                  label="Sessions"
                  name="sessions"
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
                  type="number"
                  label="Session Rate"
                  name="sessionRate"
                  value={formData.sessionRate}
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
                  label="Total"
                  name="total"
                  value={formData.total}
                  InputProps={{
                    readOnly: true,
                    startAdornment: <Box component="span" sx={{ color: 'text.secondary', mr: 1 }}>$</Box>,
                  }}
                />
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                <LocalOfferIcon sx={{ color: "text.secondary", mt: 2 }} />
                <TextField
                  fullWidth
                  label="Package"
                  name="package"
                  value={formData.package}
                  onChange={handleChange}
                  required
                />
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
                  fullWidth
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
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
                  {loading ? "Creating Trainer..." : "Create Trainer"}
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
    </Container>
  );
};

export default CreateTrainer;
