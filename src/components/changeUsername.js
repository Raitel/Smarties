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
                <div>
                    <Box p={3}>    
                        <Card className={classes.card}>
                            <Box p={2}>
                            <CardHeader title={"Change Username:"} style={{color:'#212197', fontWeight: 'Bold'}}/>
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
                                Current Username:
                                </Typography>
                                </Grid>
                                <Grid item>
                                <TextField
                                    disabled
                                    id="outlined-disabled"
                                    
                                    defaultValue="ThisIsATempUsername"
                                    variant="outlined"
                                    />
                                </Grid>

                                <Grid item>
                                    <Divider />
                                </Grid>

                                <Grid item>
                                <Typography style={{color:'#212197', fontWeight: 'Bold'}}>
                                New Username:
                                </Typography>
                                </Grid>
                                <Grid item>
                                        <TextField
                                        id="outlined-basic"
                                        variant="outlined"
                                        />
                                    </Grid>

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
                                </Grid>
                             
                            </Box>               
                        </CardContent>
                    </Card>
                </Box>

        
                    
             </div>
        </div> 
    )
}
