import React, { Component } from 'react';

import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import LeftPanel from "./leftNavigationPanel";
import Grid from '@material-ui/core/Grid';
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

import Divider from '@material-ui/core/Divider';
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import { spacing } from '@material-ui/system';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
      },
    card:{
        width: "800px" 
    },
    subcontainer:{
        width: "1200px",
        height: "800px",
        border: '1px solid grey',
        borderRadius:'10px'
    },
    section:{
        paddingBottom:"50px"
    },
    textField:{
        width:"450px"
    },
    buttonStyle:{
        width:"300px"
    },
    subtitle:{
        color:'#212197',
        fontWeight: 'Bold',
        marginBottom:'20px'
    }
}));

export default function FormPropsTextFields() {
    const classes = useStyles();
    const history = useHistory();
    const handleChangePassword = () => {
      history.push("/changePassword")
    };
    const handleChangeUsername = () => {
      history.push("/changeUsername")
    };
    return(
        <div style={{display:'flex', marginTop:"64px"}}>
            <LeftPanel/>
            <Container>
                <Box style={{paddingTop:'80px'}}>
                    <Container className={classes.subcontainer}>
                        <Typography variant="h4" gutterBottom style={{color:'#212197',fontWeight: 'Bold',marginBottom:"50px", marginTop:"30px"}}>Settings</Typography>
                        <Container className={classes.section}>
                            <Typography variant="h5" className={classes.subtitle}>Log in email:</Typography>
                            <TextField
                                variant="outlined"
                                label="Email"
                                className={classes.textField}
                            />
                        </Container>
                        <Container className={classes.section}>
                            <Typography variant="h5" className={classes.subtitle}>Username:</Typography>
                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <TextField 
                                        variant="outlined"
                                        label="User Name"
                                        className={classes.textField}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Button className={classes.buttonStyle} variant="contained" color="primary">Change Username</Button>
                                </Grid>
                            </Grid>
                        </Container>
                        <Divider/>
                        <Container style={{marginTop:'50px'}}>
                            <Typography variant="h5" className={classes.subtitle}>Password</Typography>
                            <Button className={classes.buttonStyle} variant="contained" color="primary">Change Password</Button>
                        </Container>
                    </Container>
                </Box>
            </Container>
    </div> 
    )
}
