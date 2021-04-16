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

import Divider from '@material-ui/core/Divider';
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
      },
    card:{
        width: "800px" 
    },
}));

export default function FormPropsTextFields() {
    const classes = useStyles();
  
        return(
            <div style={{display:'flex', marginTop:"64px"}}>
                <LeftPanel/>
                <div>
                    <Box p={3}>    
                        <Card className={classes.card}>
                            <Box p={2}>
                            <CardHeader title={"Account Settings:"} style={{color:'#212197', fontWeight: 'Bold'}}/>
                            </Box>
                            <CardContent>
                            <Box p={2}>
                            <Grid container
                            direction="column"
                            justify="space-around"
                            alignItems="flex-start"
                            spacing={3}>
                                <Grid item>
                                <Typography style={{color:'#212197', fontWeight: 'Bold'}}>
                                Email:
                                </Typography>
                                </Grid>
                                <Grid item>
                                <TextField
                                    disabled
                                    id="outlined-disabled"
                                    
                                    defaultValue="Test@smarties.com"
                                    variant="outlined"
                                    />
                                </Grid>

                                <Grid item>
                                    <Divider />
                                </Grid>

                                <Grid item>
                                <Typography style={{color:'#212197', fontWeight: 'Bold'}}>
                                Username:
                                </Typography>
                                </Grid>

                                
                                <Grid item
                                container
                                direction="row"
                                justify="space-between"
                                alignItems="center"
                                spacing={3}>
                                    <Grid item>
                                        <TextField
                                        disabled
                                        id="outlined-disabled"
                                        defaultValue="ThisIsATempUsername"
                                        variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Button variant="contained" color="primary" style={{textTransform: 'none'}} >
                                            Change Username
                                        </Button>
                                    </Grid>
                                </Grid>
                                

                                <Grid item>
                                    <Divider />
                                </Grid>
                                <Grid item>
                                    <Typography style={{color:'#212197', fontWeight: 'Bold'}}>
                                        Password:
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" color="primary" style={{textTransform: 'none'}}>
                                        Change Password
                                    </Button> 
                                </Grid>
                            </Grid>  
                            </Box>               
                        </CardContent>
                    </Card>
                </Box>

        
                    
             </div>
        </div> 
    )
}
