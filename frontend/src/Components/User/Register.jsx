import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {Box,Typography,TextField,Button,Grid,Paper,CircularProgress,} from '@mui/material';
import MetaData from '../Layout/MetaData';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const schema = yup.object().shape({
    name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
    email: yup.string().email('Invalid email address').required('Email is required'),
    password: yup
        .string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters'),
});

const Register = () => {
    const [avatar, setAvatar] = useState('');
    const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.jpg');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Hook Form setup
    const {
        handleSubmit,
        control,
        setError,
        clearErrors,
        watch,
        setValue,
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
    });

    const registerUser = async (data) => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.set('name', data.name);
            formData.set('email', data.email);
            formData.set('password', data.password);
            formData.set('avatar', avatar);

            const config = {
                headers: { 'Content-Type': 'multipart/form-data' },
            };

            const response = await axios.post('http://localhost:4001/api/v1/register', formData, config);
            toast.success('You have successfully registered!', { position: 'bottom-right' });
            navigate('/login');
        } catch (err) {
            setError('server', { type: 'manual', message: err.response.data.message });
        } finally {
            setLoading(false);
        }
    };

    const onSubmit = (data) => {
        registerUser(data);
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <MetaData title={'Register User'} />
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                    background: 'transparent',
                }}
            >
                <Grid container justifyContent="center" spacing={2}>
                    <Grid item xs={12} sm={10} md={8} lg={6}>
                        <Paper sx={{ p: 3, borderRadius: 2, backgroundColor: '#fff' }}>
                            <Typography variant="h4" align="center" sx={{ mb: 3, fontWeight: 600, color: '#333' }}>
                                Register
                            </Typography>
                            <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                                <Controller
                                    name="name"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <TextField
                                            {...field}
                                            label="Name"
                                            fullWidth
                                            variant="outlined"
                                            sx={{ mb: 2 }}
                                            error={!!fieldState.error}
                                            helperText={fieldState.error?.message}
                                        />
                                    )}
                                />
                                <Controller
                                    name="email"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <TextField
                                            {...field}
                                            label="Email"
                                            type="email"
                                            fullWidth
                                            variant="outlined"
                                            sx={{ mb: 2 }}
                                            error={!!fieldState.error}
                                            helperText={fieldState.error?.message}
                                        />
                                    )}
                                />
                                <Controller
                                    name="password"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <TextField
                                            {...field}
                                            label="Password"
                                            type="password"
                                            fullWidth
                                            variant="outlined"
                                            sx={{ mb: 2 }}
                                            error={!!fieldState.error}
                                            helperText={fieldState.error?.message}
                                        />
                                    )}
                                />
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <Box
                                        sx={{
                                            width: 50,
                                            height: 50,
                                            borderRadius: '50%',
                                            overflow: 'hidden',
                                            mr: 2,
                                        }}
                                    >
                                        <img src={avatarPreview} alt="Avatar Preview" width="100%" height="100%" />
                                    </Box>
                                    <Button variant="outlined" component="label" color="primary" size="small">
                                        Choose Avatar
                                        <input type="file" name="avatar" accept="image/*" onChange={handleAvatarChange} hidden />
                                    </Button>
                                </Box>
                                {loading ? (
                                    <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                                        <CircularProgress />
                                    </Box>
                                ) : (
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        sx={{ py: 2, mb: 2, fontSize: '16px', fontWeight: 600 }}
                                    >
                                        Register
                                    </Button>
                                )}
                            </form>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default Register;
