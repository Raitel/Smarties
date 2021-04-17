import { Component } from 'react';
import React, { useState } from 'react';
import LeftGamePanel from "./leftGamePanel";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CardActionArea from "@material-ui/core/CardActionArea";
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { useHistory } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import { CardMedia, StylesProvider } from '@material-ui/core';
import Button from '@material-ui/core/Button';

import stage from '../assets/game_assets/stage.png'
import Question from '../assets/game_assets/questioncard600.png'
import tip from '../assets/game_assets/tipcard.png'
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345
    },
    container:{
        width:'1200px',
        height:'800px',
        marginTop:'100px',
        display:'flex',
        alignItems:'center',
        flexDirection:'column',
        border: '1px solid black'
    },
    overlay: {
       position: 'absolute',
       top: '20px',
       left: '20px',
       color: 'black',
       backgroundColor: 'white'
    },
    stageRoot: {
        minWidth: 600,
        border: "none", 
        boxShadow: "none" 
    },
    stageMedia:{
        width:'100%',
        height:'150px', // absolutely REQUIRED
    },
    stageOverlay:{
        position: 'relative',
        top: '-105px',
        left: '500px',
        color: 'black',
    },
    questioncontainer:{
        display:'flex',
        justifyContent:'center'
    },
    questionRoot:{
        minWidth: 600,
        height: 150,
        border: "none", 
        boxShadow: "none" 
    },
    questionMedia:{
        width:'600px',
        height:'130px', // absolutely REQUIRED
    },
    questionOverlay:{
        position: 'relative',
        color: 'black',
        top: '-105px',
        left: '500px',
    },
    paperContainerQuestion: {
        backgroundImage: `url(${Question})`,
        width:'600px',
        height:'130px',
    }
  }));

export default function PlayGame() {
    const classes = useStyles();
    const history = useHistory();

    function Construction(props){

        return(
            <Container className={classes.container}>
                <Container>
                    <Card className={classes.stageRoot}>
                        <CardMedia className={classes.stageMedia} image={stage} title='stage'/>
                        <div className={classes.stageOverlay}>
                            Stage 5/10
                        </div>
                    </Card>
                </Container>
                <Container className={classes.questioncontainer}>
                    <Card className={classes.questionRoot}>
                        <CardMedia className={classes.questionMedia} image={Question} title='question'/>
                        <div className={classes.questionOverlay}>
                            What is the best Game ever?
                        </div>
                    </Card>
                </Container>

                Testing Paper
                <Paper className={classes.paperContainerQuestion}>
                    <Container>Some text to fill the Paper Component (Only Container)</Container>
                </Paper>    
                <Paper className={classes.paperContainerQuestion}>
                    <Container>
                        <Typography>
                            Some text to fill the Paper Component (Typograph inside Container)
                        </Typography>
                    </Container>
                </Paper>
                <Paper className={classes.paperContainerQuestion}>
                    <Container>
                        <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        >
                            <Grid item>
                                <Typography>
                                    Some text to fill the Paper Component(Typography inside Grid)
                                </Typography>
                            </Grid>
                        </Grid>
                    </Container>
                </Paper>
                End of Testing Paper    

                <Grid container>
                    <Grid item image={tip} > </Grid>
                    <Grid item image={tip} > </Grid>
                </Grid>
            </Container>
            
        )
    }
    function Multiple(props){
        return(
            <Container className={classes.container}>
                <Container>Banner</Container>
                <Container>Question</Container>
                <Container>Tip Cards</Container>
                <Container>User Input</Container>
                <Container>Letters</Container>
            </Container>
        )
    }
    function Text(props){
        return(
            <Container className={classes.container}>
                <Container>Banner</Container>
                <Container>Question</Container>
                <Container>Tip Cards</Container>
                <Container>User Input</Container>
                <Container>Letters</Container>
            </Container>
        )
    }
    return(
    <div style={{display:'flex', marginTop:"64px"}}>
        <LeftGamePanel/>
        <Construction/>
    </div>

    )
}