import React, { useState, useEffect } from 'react';
import axios from 'axios';

import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import LeftPanel from "./leftNavigationPanel";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';

import Divider from '@material-ui/core/Divider';
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    loading: {
        marginTop: "300px",
        display: 'flex',
        alignItems: 'center',
        justifyContent: "center",
    },
    root: {
        flexGrow: 1,
    },
    card: {
        width: "800px"
    },
    subcontainer: {
        width: "1200px",
        border: '1px solid grey',
        borderRadius: '10px'
    },
    section: {
        paddingBottom: "50px"
    },
    textField: {
        width: "450px"
    },
    buttonStyle: {
        width: "300px"
    },
    subtitle: {
        color: '#212197',
        fontWeight: 'Bold',
        marginBottom: '20px'
    }
}));

export default function FormPropsTextFields() {
    const classes = useStyles();
    const history = useHistory();
    const [token, setToken] = useState('');
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        setToken(localStorage.getItem('token'));
    }, []);

    useEffect(() => {
        if (token != '') {
            const options = {
                headers: { 'X-Auth-Token': token }
            };
            axios.get('/users/auth/user', options)
                .then(response => {
                    setUserData(response.data);
                });
        }
    }, [token]);

    const handleChangePassword = () => {
        history.push("/changePassword")
    };
    const handleChangeUsername = () => {
        history.push("/changeUsername")
    };
    if (userData == null) {
        return (
            <Container className={classes.loading}>
                <CircularProgress />
            </Container>
        )
    } else {
        return (
            <div style={{ display: 'flex', marginTop: "64px" }}>
                <LeftPanel />
                <Container>
                    <Box style={{ paddingTop: '80px' }}>
                        <Container className={classes.subcontainer}>
                            <Typography variant="h4" gutterBottom style={{ color: '#212197', fontWeight: 'Bold', marginBottom: "50px", marginTop: "30px" }}>Settings:</Typography>
                            <Container className={classes.section}>
                                <Typography variant="h5" className={classes.subtitle}>Log in Email:</Typography>
                                <TextField
                                    disabled
                                    variant="outlined"
                                    label="Email"
                                    defaultValue={userData.email}
                                    className={classes.textField}
                                />
                            </Container>
                            <Container className={classes.section}>
                                <Typography variant="h5" className={classes.subtitle}>Username:</Typography>
                                <Grid container spacing={3}
                                    justify="space-between"
                                    alignItems="center">
                                    <Grid item xs={6}>
                                        <TextField
                                            disabled
                                            variant="outlined"
                                            label="Username"
                                            defaultValue={userData.username}
                                            className={classes.textField}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button className={classes.buttonStyle} variant="contained" color="primary" onClick={handleChangeUsername} >Change Username</Button>
                                    </Grid>
                                </Grid>
                            </Container>
                            <Divider />
                            <Container style={{ marginTop: '50px', marginBottom: '50px' }}>
                                <Typography variant="h5" className={classes.subtitle}>Password:</Typography>
                                <Button className={classes.buttonStyle} variant="contained" color="primary" onClick={handleChangePassword}>Change Password</Button>
                            </Container>
                        </Container>
                    </Box>
                </Container>
            </div>
        )
    }
}
