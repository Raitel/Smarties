import { Component } from 'react';
import React, { useState } from 'react';
import axios from 'axios';
import LeftPanel from "./leftNavigationPanel";
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
import Chip from '@material-ui/core/Chip';

import Dogs from '../assets/ball-park-brand-Lntnns1YBEY-unsplash.jpg'
import Upvote from '../assets/upvote_colored.png'
import Downvote from '../assets/downvote_colored.png'

const useStyles = makeStyles((theme) => ({
    container:{
        width:'100%',
        marginTop:'100px',
        display:'flex',
        alignItems:'center',
        flexDirection:'column',
    },
    banner:{
        width:'100%',
        height:'auto'
        
    },
    upvote:{
        width:'140px',
        height:'60px',
        border:'1px solid black',
        borderRadius:'10px',
        backgroundColor:'#FDFFA8',
    },
    downvote:{
        width:'140px',
        height:'60px',
        border:'1px solid black',
        borderRadius:'10px',
        backgroundColor:'#C4C4C4',
        display:'flex'
    }
}));

export default function Platform() {
    const classes = useStyles();
    const history = useHistory();
    const [platform, setPlatform] = useState(
        {
            "description": "",
            "isPublic": true,
            "upvotes": 0,
            "downvotes": 0,
            "tags": ['best', 'game', 'class', 'school', 'study', 'college'],
            "games": [
                "60809d32bff87a333869f083",
                "60809d64bff87a333869f084",
                "60809d77bff87a333869f085",
                "60809d85bff87a333869f086",
                "60809d94bff87a333869f087",
                "60809da2bff87a333869f088"
            ],
            "_id": "606ea28cf3b2dc0d08e40adc",
            "ownerid": "606542da7084a516a96bc8f1",
            "title": "NASA Platform",
            "createdAt": "2021-04-08T06:28:28.237Z",
            "updatedAt": "2021-04-09T21:42:49.920Z",
            "__v": 2
        }
    )

    function DisplayCard(props){
        console.log(props)
        const game = props.game;
        console.log(props.game)
        return (
          <Container p={1}>hi
          </Container>
        )
    }

    function PopulateTags(props){
        const tags = props.tags;
        const counter = 0
        const listTags = []
        for (var i = 0; i < tags.length; i++){
            listTags.push(
                <Chip size="small" label={tags[i]} key={i}/>
            )
        }
        return(
            <Container>
                <Typography variant="h6">Tags:</Typography>
                <Grid
                    container
                >
                    {listTags}
                </Grid>
            </Container>
        )
    }

    function PopulateGames(props){
        var games_ids = props.games_ids;
        var listGames = games_ids.map(function (game_id){
            axios.get('http://localhost:5000/games/'+game_id)
            .then(function(response){
                console.log(response.data)
                return <DisplayCard game={response.data} key={game_id._id} item/>
            })
        });
        console.log(listGames)
        return(
            <Container>
                <Typography variant="h6">Games:</Typography>
                <Grid
                    container
                >
                    {listGames}
                </Grid>
            </Container>
        );
    }
    return(
    <div style={{display:'flex', marginTop:"64px"}}>
        <LeftPanel/>
        <div className={classes.container}>
            <div className={classes.banner}>
                Banner
            </div>
            <Container>
                <Grid container alignItems="center" style={{marginBottom:'30px'}}>
                    <Grid item xs={9}><Typography variant="h3">{platform.title}</Typography></Grid>
                    <Grid container spacing={2} xs={3}>
                        <Grid container className={classes.upvote} justify="space-evenly" alignItems="center">
                            <Grid item><img src={Upvote} alt='upvote'style={{width:'40px',height:'40px'}}/></Grid>
                            <Grid item><Typography variant="h6">132</Typography></Grid>
                        </Grid>
                        <Grid item className={classes.downvote}>
                            <img src={Downvote} alt='downvote'style={{width:'40px',height:'40px'}}/>
                            <Typography variant="h6">20</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container spacing={10} style={{marginBottom:'30px'}}>
                    <Grid item xs={9}><Typography variant="body1">{platform.description}</Typography></Grid>
                    <Grid item xs={3}><Typography variant="body1">Visibility</Typography></Grid>
                </Grid>
                <PopulateTags tags={platform.tags}/>
                <PopulateGames games_ids={platform.games}/>
            </Container>
        </div>
    </div>

    )
}