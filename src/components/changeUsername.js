import React, { Component } from 'react';

import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import LeftPanel from "./leftNavigationPanel";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

import Divider from '@material-ui/core/Divider';
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
      },
    card:{
        width: "800px" 
    },
    subcontainer:{
        width: "1200px",
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
    const handleBack = () => {
        history.push("/settings")
      };
      const handleSubmit = () => {
      };
  
    return(
        <div style={{display:'flex', marginTop:"64px"}}>
            <LeftPanel/>
            <Container>
                <Box style={{paddingTop:'80px'}}>
                    <Container className={classes.subcontainer}>
                        <Typography variant="h4" gutterBottom style={{color:'#212197',fontWeight: 'Bold',marginBottom:"50px", marginTop:"30px"}}>Change Username:</Typography>
                        <Container className={classes.section}>
                            <Typography variant="h5" className={classes.subtitle}>Current Username:</Typography>
                            <TextField
                                disabled
                                variant="outlined"
                                label="Username"
                                defaultValue="Dummy Current Username"
                                className={classes.textField}
                            />
                        </Container>
                        <Container className={classes.section}>
                            <Typography variant="h5" className={classes.subtitle}>New Username:</Typography>
                                <TextField 
                                    variant="outlined"
                                    label="New Username"
                                    className={classes.textField}
                                />
                        </Container>
                        <Container style={{marginTop:'50px', marginBottom:'50px'}}>
                            <Grid item
                            container
                            direction="row"
                            justify="flex-end"
                            alignItems="center"
                            spacing={3}>
                                <Grid item>
                                    <Button variant="contained" style={{textTransform: 'none'}}  onClick={handleBack}>
                                        Back
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" color="primary" style={{textTransform: 'none'}} onClick={handleSubmit} >
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
