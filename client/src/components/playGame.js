import { Component } from 'react';
import React, { useState, useEffect} from 'react';
import LeftGamePanel from "./leftGamePanel";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { useParams } from 'react-router-dom';

import Stage from '../assets/game_assets/stage.png'
import Question from '../assets/game_assets/questioncard600.png'
import Answer from '../assets/game_assets/answercard400.png'
import Tip from '../assets/game_assets/tipcard.png'
import ConstructBox from '../assets/game_assets/constructionBox.png'
import Background from '../assets/game_assets/background.png'

import PlayGameStages from './playGameStages';
import axios from 'axios';


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
    const { id } = useParams();
    const[gameData,setGameData] = useState(null);
    useEffect(() => {
        getGame();
    }, []);
    const getGame = () => {
        axios.get("http://localhost:5000/games/" + id).then( data => {
            setGameData(data);
        });
    }
    if(gameData != null){
        return(
        <div style={{display:'flex', marginTop:"64px"}}>
            
            { <LeftGamePanel value={gameData.data}/> }
            { <PlayGameStages value={gameData.data.nestedStages}/>}

        </div>
        )
    }
    else{
        return(
            <div style={{display:'flex', marginTop:"64px"}}>
                Loading
            </div>
            )        
    }
}