// users.js
import { useState } from "react";
import { getAPI, postAPI } from "../../Services/apis";

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import {
  hasSpecialCharacter,
  isDropdownSelected,
  isNotEmpty,
  isValidEmail,
  isValidPhoneNumber,
} from "../../Helpers/utility";
import { useParams } from "react-router-dom";

import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

import { useLocation } from "react-router-dom";
const defaultTheme = createTheme();

const EditUser = () => {
  const [userLocation, setUserLocation] = useState(null);

  const getUserLocation = () => {
    // if geolocation is supported by the users browser
    if (navigator.geolocation) {
      // get the current users location
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // save the geolocation coordinates in two variables
          const { latitude, longitude } = position.coords;
          // update the value of userlocation variable
          setUserLocation({ latitude, longitude });
        },
        // if there was an error getting the users location
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    }
    // if geolocation is not supported by the users browser
    else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const location = useLocation();
  const navigate = useNavigate();

  const [userData, setUsersData] = useState([]);
  const [formData, setFormData] = useState(location?.state?.project || {});
  const [errors, setErrors] = useState({});
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [avatar] = useState(null);

  const { id } = useParams();

  React.useEffect(() => {
    getUser(id);
  }, []);

  const getUser = async (id) => {
    try {
      const response = await getAPI(`user/get-user/${id}`);
      if (response.statusCode === 200) {
        setUsersData(response.data);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
        console.log(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
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

  const handleFileChanges = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const updateUser = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const data = new FormData();

      data.append("userId", formData.userId);
      data.append("firstName", formData.firstName);
      data.append("lastName", formData.lastName);
      data.append("userName", formData.userName);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("profile", file);
      data.append("role", formData?.role);
      data.append("city", formData.city);
      data.append("about", formData?.about);
      data.append("latitude", "18.6289");
      data.append("longitude", "73.8038");

      const response = await postAPI("user/update-user", data);
      if (response.statusCode === 200) {
        toast.success(response.message);
        navigate("/users");
      } else {
        toast.error(response.message);
      }
    }
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
            <Typography component="h1" variant="h5">
              Update User
            </Typography>
            <div>
              <h1>Geolocation App</h1>
              {/* create a button that is mapped to the function which retrieves the users location */}
              <button onClick={getUserLocation}>Get User Location</button>
              {/* if the user location variable has a value, print the users location */}
              {userLocation && (
                <div>
                  <h2>User Location</h2>
                  <p>Latitude: {userLocation.latitude}</p>
                  <p>Longitude: {userLocation.longitude}</p>
                </div>
              )}
            </div>
            <Box sx={{ py: 4, borderTop: 1, borderColor: "#E9E9E9" }}>
              <Box
                className="flexColumnRespo"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Box
                  sx={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {previewUrl ? (
                    <Avatar
                      alt="Profile Picture"
                      src={previewUrl}
                      sx={{
                        width: 120,
                        height: 120,
                        border: 1,
                        borderColor: "#ccc",
                      }}
                    />
                  ) : (
                    <Avatar
                      alt="Profile Picture"
                      src={userData?.profileImageUrl}
                      sx={{
                        width: 120,
                        height: 120,
                        border: 1,
                        borderColor: "#ccc",
                      }}
                    />
                  )}
                  {avatar && (
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        fontSize: 20,
                        borderRadius: 2,
                        padding: 0.4,
                        marginLeft: 10,
                      }}
                    >
                      <EditIcon
                        color="secondary"
                        sx={{
                          backgroundColor: "#0B3013",
                          fontSize: 20,
                          padding: 0.4,
                          borderRadius: 2,
                          color: "#fff",
                        }}
                        onClick={() =>
                          document.getElementById("avatar-upload").click()
                        }
                      />
                    </Box>
                  )}
                  {!avatar && (
                    <label
                      htmlFor="avatar-upload"
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 86,
                        right: 0,
                        cursor: "pointer",
                      }}
                    >
                      <EditIcon
                        color="secondary"
                        sx={{
                          backgroundColor: "#0B3013",
                          fontSize: 20,
                          padding: 0.4,
                          borderRadius: 2,
                          color: "#fff",
                        }}
                      />
                    </label>
                  )}
                  <input
                    accept="image/*"
                    id="avatar-upload"
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleFileChanges}
                  />
                </Box>
              </Box>
            </Box>
            <Box
              component="form"
              noValidate
              onSubmit={updateUser}
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
                Update User
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default EditUser;
