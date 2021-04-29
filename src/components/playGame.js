import { Component } from 'react';
import React, { useState } from 'react';
import LeftGamePanel from "./leftGamePanel";
import MultipleChoice from "./playGameStages";
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
import PlayGameStages from './playGameStages';


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
    const testQuestions = [
        {
            "question": "question0",
            "answer": "d1",
            "tip1": "tip1",
            "tip2": "tip2",
            "choice1": "d1",
            "choice2": "Bd2",
            "choice3": "Bd3",
            "choice4": "Bd4",
            "choice5": "Bd5",
            "letters": [],
            "_id": "",
            "type": "MultipleChoice"
        },
        {
            "question": "question1",
            "answer": "ABC",
            "tip1": "",
            "tip2": "",
            "choice1": "",
            "choice2": "",
            "choice3": "",
            "choice4": "",
            "choice5": "",
            "letters": ['A','N','Q','R','H','W','O','K','J','U','V','B','C','J'],
            "_id": "6070a325ad0c350524e78ea9",
            "type": "Construction"
        },
        {
            "question": "question2",
            "answer": "B1",
            "tip1": "tip1",
            "tip2": "tip2",
            "choice1": "B1",
            "choice2": "B2",
            "choice3": "B3",
            "choice4": "B4",
            "choice5": "B5",
            "letters": [],
            "_id": "",
            "type": "MultipleChoice"
        },
        {
            "question": "question3",
            "answer": "ASD",
            "tip1": "tip1",
            "tip2": "tip2",
            "choice1": "",
            "choice2": "",
            "choice3": "",
            "choice4": "",
            "choice5": "",
            "letters": ['B'],
            "_id": "6070a325ad0c350524e78ea9",
            "type": "Textbox"
        },
        {
            "question": "question4",
            "answer": "MJ",
            "tip1": "",
            "tip2": "",
            "choice1": "",
            "choice2": "",
            "choice3": "",
            "choice4": "",
            "choice5": "",
            "letters": ['A','N','Q','R','H','W','O','K','J','U','V','B','M','J'],
            "_id": "6070a325ad0c350524e78ea9",
            "type": "Construction"
        },
        {
            "question": "question5",
            "answer": "c1",
            "tip1": "tip1",
            "tip2": "tip2",
            "choice1": "c1",
            "choice2": "c2",
            "choice3": "c3",
            "choice4": "c4",
            "choice5": "c5",
            "letters": [],
            "_id": "",
            "type": "MultipleChoice"
        },
        {
            "question": "question6",
            "answer": "DDD",
            "tip1": "TIP1: ANSWER = DDD",
            "tip2": "TIP2: ANSWER = DDD",
            "choice1": "1",
            "choice2": "2",
            "choice3": "3",
            "choice4": "4",
            "choice5": "5",
            "letters": [],
            "_id": "6070a325ad0c350524e78ea9",
            "type": "Textbox"
        },
        {
            "question": "question7",
            "answer": "WO",
            "tip1": "",
            "tip2": "",
            "choice1": "",
            "choice2": "",
            "choice3": "",
            "choice4": "",
            "choice5": "",
            "letters": ['A','N','Q','R','H','W','O','K','J','U','V','B','M','J'],
            "_id": "6070a325ad0c350524e78ea9",
            "type": "Construction"
        }
    ]
    
    return(
    <div style={{display:'flex', marginTop:"64px"}}>
        <LeftGamePanel/>
        <PlayGameStages value={testQuestions}/>

    </div>

    )
}