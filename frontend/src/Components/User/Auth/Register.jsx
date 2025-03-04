import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MetaData from "../../Layout/MetaData";

// Validation Schema
const schema = yup.object().shape({
  name: yup.string().required("Name is required").min(2, "Name must be at least 2 characters"),
  email: yup.string().email("Invalid email address").required("Email is required"),
  password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
  birthDate: yup.date().required("Birth date is required"),
  address: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
  phone: yup.string().required("Phone number is required"),
  emergencyContanctName: yup.string().required("Emergency contact name is required"),
  emergencyContanctNumber: yup.string().required("Emergency contact number is required"),
  userBranch: yup.string().required("Branch is required"),
});

const Register = () => {
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/images/default_avatar.jpg");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [branches, setBranches] = useState([]);

  // Hook Form setup
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: { userBranch: "" },
  });

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const { data } = await axios.get("http://localhost:8000/api/v1/branch/get-all-branches");
        setBranches(data.branch);
      } catch (error) {
        toast.error("Failed to load branches");
      }
    };
    fetchBranches();
  }, []);

  const registerUser = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => formData.append(key, value));
      formData.set("image", avatar);

      const config = { headers: { "Content-Type": "multipart/form-data" } };
      await axios.post("http://localhost:8000/api/v1/users/register", formData, config);

      toast.success("Registered successfully!");
      navigate("/login");
    } catch (err) {
      setError("server", { type: "manual", message: err.response.data.message });
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (data) => registerUser(data);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setAvatarPreview(reader.result);
      reader.readAsDataURL(file);
      setAvatar(file);
    }
  };

  return (
    <>
      <MetaData title={"Register User"} />
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={10} md={8} lg={6}>
            <Paper sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h4" align="center" sx={{ mb: 3, fontWeight: 600 }}>
                Register
              </Typography>
              <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                {/* Name */}
                <Controller name="name" control={control} render={({ field }) => (
                  <TextField {...field} label="Name" fullWidth sx={{ mb: 2 }} error={!!errors.name} helperText={errors.name?.message} />
                )} />

                {/* Email */}
                <Controller name="email" control={control} render={({ field }) => (
                  <TextField {...field} label="Email" type="email" fullWidth sx={{ mb: 2 }} error={!!errors.email} helperText={errors.email?.message} />
                )} />

                {/* Password */}
                <Controller name="password" control={control} render={({ field }) => (
                  <TextField {...field} label="Password" type="password" fullWidth sx={{ mb: 2 }} error={!!errors.password} helperText={errors.password?.message} />
                )} />

                {/* Birth Date */}
                <Controller name="birthDate" control={control} render={({ field }) => (
                  <TextField {...field} label="Birth Date" type="date" fullWidth sx={{ mb: 2 }} error={!!errors.birthDate} helperText={errors.birthDate?.message} InputLabelProps={{ shrink: true }} />
                )} />

                {/* Address */}
                <Controller name="address" control={control} render={({ field }) => (
                  <TextField {...field} label="Address" fullWidth sx={{ mb: 2 }} error={!!errors.address} helperText={errors.address?.message} />
                )} />

                {/* City */}
                <Controller name="city" control={control} render={({ field }) => (
                  <TextField {...field} label="City" fullWidth sx={{ mb: 2 }} error={!!errors.city} helperText={errors.city?.message} />
                )} />

                {/* Phone */}
                <Controller name="phone" control={control} render={({ field }) => (
                  <TextField {...field} label="Phone" fullWidth sx={{ mb: 2 }} error={!!errors.phone} helperText={errors.phone?.message} />
                )} />

                {/* Emergency Contact Name */}
                <Controller name="emergencyContanctName" control={control} render={({ field }) => (
                  <TextField {...field} label="Emergency Contact Name" fullWidth sx={{ mb: 2 }} error={!!errors.emergencyContanctName} helperText={errors.emergencyContanctName?.message} />
                )} />

                {/* Emergency Contact Number */}
                <Controller name="emergencyContanctNumber" control={control} render={({ field }) => (
                  <TextField {...field} label="Emergency Contact Number" fullWidth sx={{ mb: 2 }} error={!!errors.emergencyContanctNumber} helperText={errors.emergencyContanctNumber?.message} />
                )} />

                {/* Branch */}
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Branch</InputLabel>
                  <Controller name="userBranch" control={control} render={({ field }) => (
                    <Select {...field} error={!!errors.userBranch}>
                      {branches.map(branch => <MenuItem key={branch._id} value={branch._id}>{branch.name}</MenuItem>)}
                    </Select>
                  )} />
                </FormControl>

                {/* Avatar Upload */}
                <Button variant="outlined" component="label">Choose Avatar<input type="file" hidden onChange={handleAvatarChange} /></Button>

                <Button type="submit" variant="contained" fullWidth sx={{ py: 2, mt: 2 }} disabled={loading}>
                  {loading ? <CircularProgress size={24} /> : "Register"}
                </Button>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Register;
