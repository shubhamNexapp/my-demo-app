import { useState } from "react";

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Copyright, hasSpecialCharacter, isValidEmail } from "../../Helpers/utility";
import { postAPI } from "../../Services/apis";

import { toast } from 'react-toastify';
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

export default function SignIn({ setIsLoggedIn }) {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const validateForm = () => {
        const errors = {};
        let isValid = true;

        if (!formData.email.trim()) {
            errors.email = 'Email is required';
            isValid = false;
        } else if (!isValidEmail(formData.email)) {
            errors.email = 'Invalid email format';
            isValid = false;
        }

        if (!formData.password.trim()) {
            errors.password = "Password is required"
            isValid = false;
        } else if (formData.password.length < 8 || !hasSpecialCharacter(formData.password)) {
            errors.password = "Password must be at least 8 characters long and include one capital letter. one small letter and one special character"
            isValid = false;
        }

        setErrors(errors);
        return isValid;

    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });

        setErrors({
            ...errors,
            [name]: ''
        });

    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateForm()) {

            const data = {
                email: formData.email,
                password: formData.password,
            }

            const response = await postAPI("user/login-user", data);
            if (response.statusCode === 200) {
                toast.success(response.message)
                navigate("/users");
                var loginDetails = response.data;
                var objLoginData = {
                    userId: loginDetails._id,
                    firstName: loginDetails.firstName,
                    token: response.token,
                    role: loginDetails.role,
                    profileImageUrl : loginDetails.profileImageUrl
                };
                localStorage.setItem("loginData", JSON.stringify(objLoginData));
                setIsLoggedIn(true);
                setFormData({
                    email: "",
                    password: "",
                })
                setShowPassword(false)
            } else {
                toast.error(response.message)
            }

        }
    };

    const goToSignup = () => {
        navigate("/");
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={formData.email}
                                onChange={handleChange}
                                error={Boolean(errors.email)}
                                helperText={errors.email}
                            />
                        </Grid>
                        <Grid item xs={12} mt={4}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                id="password"
                                type={showPassword ? "text" : "password"}
                                autoComplete="password"
                                value={formData.password}
                                onChange={handleChange}
                                error={Boolean(errors.password)}
                                helperText={errors.password}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={handleTogglePasswordVisibility}
                                                edge="end"
                                            >
                                                {showPassword ? (
                                                    <Visibility />
                                                ) : (
                                                    <VisibilityOff />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item>
                                <button onClick={goToSignup} style={{ border: 'none', background: 'none', color: 'blue', cursor: 'pointer' }}>
                                    Don't have an account? Sign Up
                                </button>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}