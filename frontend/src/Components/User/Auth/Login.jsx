import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Box, Typography, TextField, Button, Grid, Paper, CircularProgress, Link as MUILink } from '@mui/material';
import MetaData from '../../Layout/MetaData';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { authenticate, getUser } from '../../../utils/helpers';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const redirect = location.search ? new URLSearchParams(location.search).get('redirect') : '';

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
        trigger,  
        setValue,
    } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: { email: '', password: '' },
    });

    const login = async (data) => {
        const { email, password } = data;
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const response = await axios.post(`https://pspmobile.onrender.com/api/v1/users/login`, { email, password }, config);
            authenticate(response.data, (redirectPath) => navigate(redirect || redirectPath || '/'));
        } catch (error) {
            toast.error('Invalid user or password', {
                position: 'bottom-right',
            });
        }
    };

    const onChangeHandler = (name) => (e) => {
        setValue(name, e.target.value); 
        trigger(name);
    };

    const onSubmit = (data) => login(data);

    return (
        <>
            <MetaData title={'Login'} />
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
                    <Grid item xs={12} sm={8} md={6} lg={4}>
                        <Paper sx={{ p: 3, borderRadius: 2, backgroundColor: '#fff' }}>
                            <Typography variant="h4" align="center" sx={{ mb: 3, fontWeight: 600, color: '#333' }}>
                                Login
                            </Typography>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Controller
                                    name="email"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Email"
                                            type="email"
                                            fullWidth
                                            variant="outlined"
                                            error={!!errors.email}
                                            helperText={errors.email?.message}
                                            sx={{ mb: 2 }}
                                            onChange={onChangeHandler('email')}
                                        />
                                    )}
                                />
                                <Controller
                                    name="password"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Password"
                                            type="password"
                                            fullWidth
                                            variant="outlined"
                                            error={!!errors.password}
                                            helperText={errors.password?.message}
                                            sx={{ mb: 2 }}
                                            onChange={onChangeHandler('password')}
                                        />
                                    )}
                                />
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                    <MUILink href="/password/forgot" variant="body2" color="primary">
                                        Forgot Password?
                                    </MUILink>
                                </Box>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    sx={{ py: 2, mb: 2, fontSize: '16px', fontWeight: 600 }}
                                >
                                    Login
                                </Button>
                                <Box sx={{ textAlign: 'center' }}>
                                    <Typography variant="body2" color="textSecondary">
                                        New User?{' '}
                                        <Link to="/register" style={{ textDecoration: 'none', color: '#2575fc' }}>
                                            Register here
                                        </Link>
                                    </Typography>
                                </Box>
                            </form>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default Login;
