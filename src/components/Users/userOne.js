import { Box, Button, Grid, TextField } from "@mui/material";
import { React, useState } from "react"

export const UserOne = (props) => {

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });

    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData)

        const dataToSendNextPage = {
            firstName: formData.firstName,
            lastName: formData.lastName,
        };
        props.SetEmployerUserDataObject(
            "userOne",
            dataToSendNextPage
        );
    }

    return (
        <>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        name="firstName"
                        autoComplete="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="lastName"
                        value={formData.lastName}
                        onChange={handleChange} />
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    User One Submit
                </Button>
            </Box>
        </>
    )
}

export default UserOne