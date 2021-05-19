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
import { useSnackbar } from 'notistack';


const useStyles = makeStyles((theme) => ({
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
    const [username, setUsername] = useState('')
    const [usernameError, setUsernameError] = useState(false)
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

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

    const handleBack = () => {
        history.push("/settings")
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('submit')
        setUsernameError(false)
        if (username == '' || username.trim() == '') {
            setUsernameError(true)
        } else {
            const data = {
                username: username,
            }
            const config = {
                headers: { 'X-Auth-Token': token },
            }
            axios.put("/users/updateUsername", data, config)
                .then(res => {
                    console.log(res)
                    if (res.data.user_id) {
                        enqueueSnackbar('Sucess!', { variant: 'success' })
                    }
                })
                .catch(err => enqueueSnackbar('Something bad happend', { variant: 'error' }))
        }

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
                            <Typography variant="h4" gutterBottom style={{ color: '#212197', fontWeight: 'Bold', marginBottom: "50px", marginTop: "30px" }}>Change Username:</Typography>
                            <Container className={classes.section}>
                                <Typography variant="h5" className={classes.subtitle}>Current Username:</Typography>
                                <TextField
                                    disabled
                                    variant="outlined"
                                    label="Username"
                                    defaultValue={userData.username}
                                    className={classes.textField}
                                />
                            </Container>
                            <Container className={classes.section}>
                                <Typography variant="h5" className={classes.subtitle}>New Username:</Typography>
                                <TextField
                                    onChange={(e) => setUsername(e.target.value)}
                                    variant="outlined"
                                    label="New Username"
                                    className={classes.textField}
                                    error={usernameError}
                                />
                            </Container>
                            <Container style={{ marginTop: '50px', marginBottom: '50px' }}>
                                <Grid item
                                    container
                                    direction="row"
                                    justify="flex-end"
                                    alignItems="center"
                                    spacing={3}>
                                    <Grid item>
                                        <Button variant="contained" style={{ textTransform: 'none' }} onClick={handleBack}>
                                            Back
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button variant="contained" color="primary" style={{ textTransform: 'none' }} onClick={handleSubmit} >
                                            Submit
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Container>
                        </Container>
                    </Box>
                </Container>
            </div>
        )
    }
}
