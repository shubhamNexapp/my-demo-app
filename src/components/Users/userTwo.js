import { Box, Button, Grid, TextField } from "@mui/material";
import { React, useState } from "react"

export const UserTwo = (props) => {

    const [formData, setFormData] = useState({
        email: '',
        userName: '',
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

        const dataToSendNextPage = {
            email: formData.email,
            userName: formData.userName,
        };
        props.SetEmployerUserDataObject(
            "userTwo",
            dataToSendNextPage
        );
    }

    return (
        <>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        id="userName"
                        label="User Name"
                        name="userName"
                        autoComplete="userName"
                        value={formData.userName}
                        onChange={handleChange} />
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    User Two Submit
                </Button>
            </Box>
        </>
    )
}

export default UserTwo