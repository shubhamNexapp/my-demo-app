// users.js
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { useState, useEffect } from "react";
import { deleteAPI, getAPI } from "../../Services/apis";
import { Button, IconButton } from '@mui/material';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import moment from 'moment';


import close from "../../Assests/Images/cancel-circle-half-dot.png"

const Users = () => {
   
    const [userData, setUsersData] = useState([])
    const [open, setOpen] = React.useState(false);
    const [particularUserId, setParticularUserId] = useState("")
    const handleOpen = (userId) => {
        setParticularUserId(userId)

        setOpen(true);
    }
    const handleClose = () => setOpen(false);
    const navigate = useNavigate();

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        try {
            const response = await getAPI("user/get-user-details",);
            if (response.statusCode === 200) {
                setUsersData(response.data)
            } else {
                toast.error(response.message)
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                toast.error(error.response.data.message)
                console.log(error.response.data.message)
            } else {
                toast.error("An unexpected error occurred")
            }
        }
    };

    const editUser = (user) => {
        navigate(`/edit-user/${user.userId}`, {
            state: {
                project: user
            }
        })
    }

    const deleteUser = async () => {
        try {
            const data = { userId: particularUserId }
            const response = await deleteAPI("user/delete-user", data);
            if (response.statusCode === 200) {
                getUsers()
                toast.success(response.message)
                handleClose()
            } else {
                toast.error(response.message)
                handleClose()
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                toast.error(error.response.data.message)
                handleClose()
            } else {
                toast.error("An unexpected error occurred")
                handleClose()
            }
        }
    }

    const goToParticularUser = (id) => {
        navigate(`/user/${id}`)
    }

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="logout-modal"
                aria-describedby="logout-modal-description"
            >
                <Box
                    sx={{
                        position: "absolute",
                        width: "75%",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 4,
                    }}
                >
                    <IconButton
                        sx={{
                            position: "absolute",
                            top: 10,
                            right: 10,
                        }}
                        onClick={handleClose}
                    >
                        <img src={close} alt="db" />
                    </IconButton>
                    <Box>
                        <Box
                            sx={{
                                display: "flex",
                                margin: "auto",
                                justifyContent: "center",
                                py: 1,
                            }}
                        >
                        </Box>
                        <Typography
                            id="logout-modal-description"
                            className="employeeHead1"
                            variant="h5"
                            sx={{
                                fontWeight: 700,
                                fontSize: 32,
                                textAlign: "center",
                                py: 2,
                                pb: 1,
                            }}
                            gutterBottom
                        >
                            Are you sure
                        </Typography>
                        <Typography
                            id="logout-modal-description"
                            className="employeeHead"
                            variant="p"
                            sx={{ fontSize: 18, textAlign: "center", display: "block" }}
                            gutterBottom
                        >
                            You want to delete user?
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-around", mt: 4 }}>
                        <Button
                            onClick={handleClose}
                            variant="contained"
                            sx={{
                                backgroundColor: "#0B3013!important",
                                fontSize: 16,
                                borderRadius: 20,
                                textTransform: "capitalize",
                                px: 4,
                                py: 1,
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={deleteUser}
                            sx={{
                                backgroundColor: "#0B3013!important",
                                fontSize: 16,
                                borderRadius: 20,
                                textTransform: "capitalize",
                                px: 6,
                                py: 1,
                            }}
                            variant="contained"
                        >
                            Yes
                        </Button>
                    </Box>
                </Box>
            </Modal>
            <div>
                <h1>Users Page</h1>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">City</TableCell>
                            <TableCell align="right">Role</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userData?.map((user, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell style={{ cursor: "pointer" }} onClick={() => goToParticularUser(user?.userId)} align="right">{user.firstName}</TableCell>
                                <TableCell style={{ cursor: "pointer" }} onClick={() => goToParticularUser(user?.userId)} align="right">{user.email}</TableCell>
                                <TableCell style={{ cursor: "pointer" }} onClick={() => goToParticularUser(user?.userId)} align="right">{user.city}</TableCell>
                                <TableCell style={{ cursor: "pointer" }} onClick={() => goToParticularUser(user?.userId)} align="right">{user.role}</TableCell>
                                <TableCell align="right">
                                    <button onClick={() => editUser(user)} >Edit</button>
                                    <button onClick={() => handleOpen(user.userId)} >Delete</button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default Users;
