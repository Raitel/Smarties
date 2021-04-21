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

import Stage from '../assets/game_assets/stage.png'
import Question from '../assets/game_assets/questioncard600.png'
import Answer from '../assets/game_assets/answercard400.png'
import Tip from '../assets/game_assets/tipcard.png'
import ConstructBox from '../assets/game_assets/constructionBox.png'
import Background from '../assets/game_assets/background.png'
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345
    },
    container:{
        backgroundImage: `url(${Background})`,
        width:'1200px',
        height:'800px',
        marginTop:'100px',
        display:'flex',
        alignItems:'center',
        flexDirection:'column',
        border: '1px solid black'
    },
    questionPaper:{
        backgroundImage: `url(${Question})`,
        width:'600px',
        height:'130px',
        display:'flex',
        textAlign:'center',
        alignItems:'center',
        justifyContent:'center',
        color:'white',
        marginBottom:'30px'
    },
    tipCard1:{
        backgroundImage: `url(${Tip})`,
        width:'92px',
        height:'135px',
        display:'flex',
        textAlign:'center',
        alignItems:'center',
        justifyContent:'center',
    },
    tipCard2:{
        backgroundImage: `url(${Tip})`,
        width:'93px',
        height:'135px',
        display:'flex',
        textAlign:'center',
        alignItems:'center',
        justifyContent:'center',
    },
    stagePaper:{
        backgroundImage: `url(${Stage})`,
        width:'633px',
        height:'118px',
        display:'flex',
        textAlign:'center',
        alignItems:'center',
        justifyContent:'center',
        marginBottom:'30px'
    },
    stageHeader:{
        color:'white',
        position:'relative',
        top:'-15px'
    },
    constructPaper:{
        backgroundImage: `url(${Answer})`,
        width:'400px',
        height:'130px',
        display:'flex',
        textAlign:'center',
        alignItems:'center',
        justifyContent:'center',
        color:'white'
    },
    letterRow:{
        display:'flex'
    },
    letterPaper:{
        backgroundImage: `url(${ConstructBox})`,
        width:'92px',
        height:'96px',
        display:'flex',
        textAlign:'center',
        alignItems:'center',
        justifyContent:'center',
        fontSize:'24px',
        color:'white'
    },
    rowFormat:{
        display:'flex'
    },
    answerPaper:{
        backgroundImage: `url(${Answer})`,
        width:'400px',
        height:'100px',
        display:'flex',
        textAlign:'center',
        alignItems:'center',
        justifyContent:'center',
        color:'white'
    },
  }));

export default function PlayGame() {
    const classes = useStyles();
    const history = useHistory();
    const [game, setGame] = useState(
        {
          "description": "",
          "tags": ['best', 'game', 'class', 'school', 'study', 'college'],
          "stages": [],
          "questionCard": "606e7b59bee1d0599ca713b7",
          "tipCard": "606e7b59bee1d0599ca713b7",
          "answerCard": "606e7b59bee1d0599ca713b7",
          "_id": "60708e459ca18d2708a34203",
          "title": "first game update",
          "nestedStages": [
              {
                  "question": "",
                  "answer": "",
                  "tip1": "",
                  "tip2": "",
                  "choice1": "",
                  "choice2": "",
                  "choice3": "",
                  "choice4": "",
                  "choice5": "",
                  "letters": ['a','N','Q','R','h','W','o','K','J','U','V','B','M','j'],
                  "_id": "6070a325ad0c350524e78ea9",
                  "type": "CN"
              },
              {
                  "question": "",
                  "answer": "",
                  "tip1": "",
                  "tip2": "",
                  "choice1": "",
                  "choice2": "",
                  "choice3": "",
                  "choice4": "",
                  "choice5": "",
                  "letters": [],
                  "_id": "6070aa21c2617208fc247dbe",
                  "type": "TX"
              }
          ],
          "createdAt": "2021-04-09T17:26:29.533Z",
          "updatedAt": "2021-04-09T19:25:21.806Z",
          "__v": 4
        }
    )

    function GenerateRow(props){
        var counter;
        if (props.row == 1){
            counter = 0
        }else{
            counter = 7
        }
        var rowItems = []
        var limit = counter + 7
        while(counter < limit){
            rowItems.push(
                <Container className={classes.letterPaper}>{game.nestedStages[0].letters[counter]}</Container>
            )
            counter++;
        }

        return (
            [rowItems]
        )
    }

    function Construction(props){
        return(
            <Container>
                <Container className={classes.container}>

                    <Container className={classes.stagePaper}>
                        <Typography className={classes.stageHeader}>
                            Stage Paper
                        </Typography>
                    </Container>

                    <Container className={classes.questionPaper}>
                        Question Paper
                    </Container>

                    <Grid container direction="row" justify="center" alignItems="center" spacing={10}>
                        <Grid item>
                            <Container className={classes.tipCard1}>
                                Tip Card 1
                            </Container>
                        </Grid>
                        <Grid item>
                            <Container className={classes.tipCard2}>
                                Tip Card 2
                            </Container>
                        </Grid>
                    </Grid>

                    <Container className={classes.constructPaper}>
                        Construct Paper
                    </Container>

                    <Container className={classes.letterRow}>
                        <GenerateRow row={1}/>
                    </Container>
                    <Container className={classes.letterRow}>
                        <GenerateRow row={2}/>
                    </Container>
                    
                </Container>
            </Container>
        )
    }
    function Multiple(props){
        return(
            <Container>
                <Container className={classes.container}>

                    <Container className={classes.stagePaper}>
                        <Typography className={classes.stageHeader}>
                            Stage Paper
                        </Typography>
                    </Container>

                    <Container className={classes.questionPaper}>
                        Question Paper
                    </Container>

                    <Grid container direction="column" justify="center" alignItems="center" >
                        <Grid container style={{marginBottom:'20px'}}>
                            <Container className={classes.constructPaper}>
                                Construct Paper
                            </Container>
                            <Grid item>
                                <Container className={classes.tipCard1}>
                                    Tip Card 1
                                </Container>
                            </Grid>
                            <Container className={classes.constructPaper}>
                                Construct Paper
                            </Container>
                        </Grid>
                        <Grid container style={{marginBottom:'20px'}}>
                            <Container className={classes.constructPaper}>
                                Construct Paper
                            </Container>
                        </Grid>
                        <Grid container style={{marginBottom:'20px'}}>
                            <Container className={classes.constructPaper}>
                                Construct Paper
                            </Container>
                            <Grid item>
                                <Container className={classes.tipCard1}>
                                    Tip Card 1
                                </Container>
                            </Grid>
                            <Container className={classes.constructPaper}>
                                Construct Paper
                            </Container>
                        </Grid>
                    </Grid>
                    
                </Container>
            </Container>
        )
    }
    function Text(props){
        return(
            <Container>
                <Container className={classes.container}>

                    <Container className={classes.stagePaper}>
                        <Typography className={classes.stageHeader}>
                            Stage Paper
                        </Typography>
                    </Container>

                    <Container className={classes.questionPaper}>
                        Question Paper
                    </Container>

                    <Grid container direction="column" justify="center" alignItems="center" spacing={2} style={{marginBottom:'15px'}}>
                        <Grid item>
                            <Container className={classes.tipCard1}>
                                Tip Card 1
                            </Container>
                        </Grid>
                        <Grid item>
                            <Container className={classes.tipCard2}>
                                Tip Card 2
                            </Container>
                        </Grid>
                    </Grid>

                    <Container className={classes.constructPaper}>
                        Construct Paper
                    </Container>
                    
                </Container>
            </Container>
        )
    }
    return(
    <div style={{display:'flex', marginTop:"64px"}}>
        <LeftGamePanel/>
        <Multiple/>
    </div>

    )
}