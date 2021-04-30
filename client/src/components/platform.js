import { Component } from 'react';
import React, { useState, useEffect } from 'react';
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
import { useParams } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    banner:{
        //backgroundImage: `url(${Background})`,
        width:'1200px',
        height:'200px',
        marginTop:'64px',
        marginLeft:'64px',
        display:'flex',
        alignItems:'center',
        flexDirection:'column',
        border: '1px solid black'
    },
    container:{
        width:'1200px',
        height:'600px',
        marginLeft:'64px',
        display:'flex',
        alignItems:'center',
        flexDirection:'column',
        border: '1px solid black'
    },
}));

export default function Platform() {
    const classes = useStyles();
    const history = useHistory();
    
    const { id } = useParams();
    const[platformData,setPlatformData] = useState(null);
    useEffect(() => {
        getPlatform();
    }, []);
    const getPlatform = () => {
        axios.get("/platforms/" + id).then( data => {
            setPlatformData(data);
        });
    }

    const handleGame = (id) => {
        history.push("/game/"+id);
      };

    function DisplayCard(props){
        const game = props.game;
        return (
          <Box p={1}>
            <Card className={classes.game}>
                <CardActionArea onClick={() => handleGame(game)}>
                    <CardHeader
                    // title={game.title}
                    title={game}
                    />
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {/* {game.description ? game.description :"No description"} */}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                        align="right"
                    >
                        {/* {game.nestedStages.length == 0 ? "No Stage": "Total Stages: " + game.nestedStages.length} */}
                    </Typography>
                    </CardActions>
                </CardActionArea>
            </Card>
          </Box>
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

    function Populate(props){
        const games = props.games;
        const listGames = games.map((game) => 
          <DisplayCard game={game} key={game._id} item/>
        );
        return (
          <Grid
            container
            direction="row"
            justify="flex-start"
            spacing={5}
          >
            {listGames}
          </Grid>
        );
    }

    if(platformData != null){
        return(
        <div style={{display:'flex', marginTop:"64px"}}>
            <LeftPanel/>
            <div>
                <Container className = {classes.banner}>
                    <Typography>
                        Title: {platformData.data.title}
                    </Typography>
                    <Typography>
                        Description: {platformData.data.description}
                    </Typography>
                    <Typography>
                        Upvotes: {platformData.data.upvotes}
                    </Typography>
                    <Typography>
                        Downvotes: {platformData.data.downvotes}
                    </Typography>
                    <PopulateTags tags={platformData.data.tags}/>
                </Container>

                <Container className = {classes.container}>
                    <Populate games={platformData.data.games} />
                </Container>
            </div>
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

    return(
    <div style={{display:'flex', marginTop:"64px"}}>
        <LeftPanel/>
        <div className={classes.container}>
            <Container className = {classes.banner}>
                <PopulateTags tags={platformData.data.tags}/>
                {/* <Populate games_ids={platform.games}/> */}
            </Container>
            <Container className = {classes.container}>
                <Populate games={platformData.data.games} />
            </Container>
        </div>
    </div>

    )
}