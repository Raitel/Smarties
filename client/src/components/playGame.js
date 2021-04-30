
import React, { useState, useEffect} from 'react';
import LeftGamePanel from "./leftGamePanel";
import { makeStyles } from "@material-ui/core/styles";

import { useParams } from 'react-router-dom';

import PlayGameStages from './playGameStages';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345
    },
  }));

export default function PlayGame() {
    const { id } = useParams();
    const[gameData,setGameData] = useState(null);
    useEffect(() => {
        getGame();
    }, []);
    const[platformData,setPlatformData] = useState(null);
    useEffect(() => {
        getPlatform();
    }, []);

    const getGame = () => {
        axios.get("/games/" + id).then( data => {
            setGameData(data);
        });
    }
    const getPlatform = () => {
        axios.get("/platforms/getPlatformByGameId/" + id).then( data => {
            setPlatformData(data);
            console.log(data.data);
        });
    }
    if(gameData != null && platformData != null){
        return(
        <div style={{display:'flex', marginTop:"64px"}}>
            
            { <LeftGamePanel value={gameData.data} platformId={platformData.data._id}/> }
            { <PlayGameStages value={gameData.data.nestedStages}/>}

        </div>
        )
    }
    else{
        return(
            <div style={{display:'flex', marginTop:"64px"}}>
                <CircularProgress />
            </div>
            )        
    }
}