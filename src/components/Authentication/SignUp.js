// users.js
import { useState } from "react";
import { postAPI } from "../../Services/apis";

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import {
  Copyright,
  hasSpecialCharacter,
  isDropdownSelected,
  isNotEmpty,
  isValidEmail,
  isValidPhoneNumber,
  LoaderHide,
  LoaderShow,
} from "../../Helpers/utility";

import { toast } from "react-toastify";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

const Users = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    userName: "",
    phone: "",
    city: "",
    role: "",
    about: "",
    allowExtraEmails: false,
    latitude: "18.5808",
    longitude: "73.9787",
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

    if (!isNotEmpty(formData.firstName) || formData.firstName.length < 3) {
      errors.firstName = "First Name should be at least 3 characters long";
      isValid = false;
    }

    if (!isNotEmpty(formData.lastName) || formData.lastName.length < 3) {
      errors.lastName = "Last Name should be at least 3 characters long";
      isValid = false;
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!isValidEmail(formData.email)) {
      errors.email = "Invalid email format";
      isValid = false;
    }

    if (!formData.password.trim()) {
      errors.password = "Password is required";
      isValid = false;
    } else if (
      formData.password.length < 8 ||
      !hasSpecialCharacter(formData.password)
    ) {
      errors.password =
        "Password must be at least 8 characters long and include one capital letter. one small letter and one special character";
      isValid = false;
    }

    if (!isNotEmpty(formData.userName) || formData.userName.length < 3) {
      errors.userName = "User Name should be at least 3 characters long";
      isValid = false;
    }

    if (!formData.phone) {
      errors.phone = "Please enter phone number";
      isValid = false;
    } else if (!isValidPhoneNumber(formData.phone)) {
      errors.phone = "Please enter valid phone number";
      isValid = false;
    }

    if (!isNotEmpty(formData.city)) {
      errors.city = "Please enter city";
      isValid = false;
    }

    if (!isDropdownSelected(formData.role)) {
      errors.role = "Please select role";
      isValid = false;
    }

    if (!isNotEmpty(formData.about) || formData.about.length < 25) {
      errors.about = "About me should be at least 25 characters long";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      LoaderShow();

      const data = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        userName: formData.userName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        role: formData.role,
        about: formData.about,
        city: formData.city,
        latitude: formData.latitude,
        longitude: formData.longitude,
      };

      const response = await postAPI("user/register-user", data);
      if (response.statusCode === 200) {
        toast.success(response.message);
        navigate("/signin");
        setFormData({
          firstName: "",
          lastName: "",
          userName: "",
          email: "",
          password: "",
          phone: "",
          role: "",
          about: "",
          city: "",
        });
        setShowPassword(false);
        LoaderHide();
      } else {
        LoaderHide();
        toast.error(response.message);
      }
    }
  };

  const goToSiginIn = () => {
    navigate("/signin");
  };

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{ color: "#000", fontWeight: 600, pb: 2, px: 0 }}
            >
              Profile
            </Typography>

            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    value={formData.firstName}
                    onChange={handleChange}
                    error={Boolean(errors.firstName)}
                    helperText={errors.firstName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    value={formData.lastName}
                    onChange={handleChange}
                    error={Boolean(errors.lastName)}
                    helperText={errors.lastName}
                  />
                </Grid>
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
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="userName"
                    label="User Name"
                    id="userName"
                    autoComplete="userName"
                    value={formData.userName}
                    onChange={handleChange}
                    error={Boolean(errors.userName)}
                    helperText={errors.userName}
                  />
                </Grid>
                <Grid item xs={12}>
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
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="phone"
                    label="Phone"
                    type="number"
                    id="phone"
                    autoComplete="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    error={Boolean(errors.phone)}
                    helperText={errors.phone}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="city"
                    required
                    fullWidth
                    id="city"
                    label="City"
                    value={formData.city}
                    onChange={handleChange}
                    error={Boolean(errors.city)}
                    helperText={errors.city}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={Boolean(errors.role)}>
                    <InputLabel id="role-label">Role</InputLabel>
                    <Select
                      labelId="role-label"
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      label="Role"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="customer">Customer</MenuItem>
                      <MenuItem value="individual">Individual</MenuItem>
                      <MenuItem value="company">Company</MenuItem>
                    </Select>
                    {errors.role && (
                      <Typography variant="caption" color="error">
                        {errors.role}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    multiline
                    rows={4} // Adjust the number of rows as needed
                    id="about"
                    label="About Me"
                    name="about"
                    autoComplete="about"
                    value={formData.about}
                    onChange={handleChange}
                    error={Boolean(errors.about)}
                    helperText={errors.about}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <button
                    onClick={goToSiginIn}
                    style={{
                      border: "none",
                      background: "none",
                      color: "blue",
                      cursor: "pointer",
                    }}
                  >
                    Already have an account? Sign in
                  </button>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    </>
  );
};

export default Users;
