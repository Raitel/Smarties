import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import LeftPanel from "./leftNavigationPanel";
import Grid from '@material-ui/core/Grid';
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Button from '@material-ui/core/Button';
import Avatar from "@material-ui/core/Avatar";
import Divider from '@material-ui/core/Divider';
import Typography from "@material-ui/core/Typography";

import Container from '@material-ui/core/Container';
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function FormPropsTextFields() {
    const classes = useStyles();
  
        return(
            <Grid>
            <LeftPanel/>
            <Container component="main" maxWidth="md">
                <Card>
                    <CardHeader title={"Account Settings:"} style={{color:'#212197', fontWeight: 'Bold'}}/>
                    <CardContent>
                        <Typography style={{color:'#212197', fontWeight: 'Bold'}}>
                        Email:
                        </Typography>
                        <TextField
                            disabled
                            id="outlined-disabled"
                            
                            defaultValue="Hello World"
                            variant="outlined"
                            />
                        <Divider />
                        <Typography style={{color:'#212197', fontWeight: 'Bold'}}>
                        Username:
                        </Typography>
                        <TextField
                            disabled
                            id="outlined-disabled"
                            
                            defaultValue="Hello World"
                            variant="outlined"
                            />
                        <Button variant="contained" color="primary" >
                            Change Username
                        </Button>
                        <Divider />
                        <Typography style={{color:'#212197', fontWeight: 'Bold'}}>
                        Password:
                        </Typography>
        
                        <Button variant="contained" color="primary">
                            Change Password
                        </Button>                       
                     </CardContent>
                </Card>
            </Container>
        </Grid>
        )
    }
