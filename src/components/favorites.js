import { Box, Container, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import React, { Component, useState } from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";
import Avatar from "@material-ui/core/Avatar";
import LeftPanel from "./leftNavigationPanel";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345
    },
    avatar: {
        backgroundColor: red[500]
    },
    subtitle:{
        color:'#212197', 
        fontSize:'24px',
        marginBottom:'40px',
        fontWeight: 'Bold'
    },
    card:{
        width: "250px"
    },
    section:{
        width:'1300px'
    }
  }));

  
export default function Favorites(){
    const classes = useStyles();
    const history = useHistory();
    const [favorites, setFavorites] = useState([
        {
            "description": "",
            "isPublic": true,
            "upvotes": 0,
            "downvotes": 0,
            "tags": [],
            "games": [],
            "_id": "606f8fe643d37799b9b6cfbc",
            "ownerid": "606f8bc2ea8d56647dfaaeff",
            "title": "Louis' Third Platform",
            "createdAt": "2021-04-08T23:21:10.994Z",
            "updatedAt": "2021-04-08T23:21:10.994Z",
            "__v": 0
        },
        {
            "description": "",
            "isPublic": true,
            "upvotes": 0,
            "downvotes": 0,
            "tags": [],
            "games": [],
            "_id": "6070ce5351991d8040298806",
            "ownerId": "606542da7084a516a96bc8f3",
            "title": "Platform XX",
            "createdAt": "2021-04-09T21:59:47.992Z",
            "updatedAt": "2021-04-09T21:59:47.992Z",
            "__v": 0
        },
        {
            "description": "",
            "isPublic": true,
            "upvotes": 0,
            "downvotes": 0,
            "tags": [],
            "games": [],
            "_id": "6070ce7851991d8040298807",
            "ownerId": "606542da7084a516a96bc8f3",
            "title": "Platform XXX",
            "createdAt": "2021-04-09T22:00:24.417Z",
            "updatedAt": "2021-04-09T22:00:24.417Z",
            "__v": 0
        },
        {
            "description": "dumb platform",
            "isPublic": true,
            "upvotes": 0,
            "downvotes": 0,
            "tags": [],
            "games": [
                "606542da7084a516a96bc8f1",
                "606542da7084a516a96bc8f2"
            ],
            "_id": "606ea28cf3b2dc0d08e40adc",
            "ownerid": "606542da7084a516a96bc8f1",
            "title": "dummyTest",
            "createdAt": "2021-04-08T06:28:28.237Z",
            "updatedAt": "2021-04-09T21:42:49.920Z",
            "__v": 2
        },
        {
            "description": "Best platform",
            "isPublic": true,
            "upvotes": 0,
            "downvotes": 0,
            "tags": [],
            "games": [],
            "_id": "606f8d1d7195479521336568",
            "ownerid": "606f8bc2ea8d56647dfaaeff",
            "title": "Louis' Second Platform",
            "createdAt": "2021-04-08T23:09:17.243Z",
            "updatedAt": "2021-04-08T23:09:17.243Z",
            "__v": 0
        },
        {
            "description": "",
            "isPublic": true,
            "upvotes": 0,
            "downvotes": 0,
            "tags": [],
            "games": [],
            "_id": "606f8fe643d37799b9b6cfbc",
            "ownerid": "606f8bc2ea8d56647dfaaeff",
            "title": "Louis' Third Platform",
            "createdAt": "2021-04-08T23:21:10.994Z",
            "updatedAt": "2021-04-08T23:21:10.994Z",
            "__v": 0
        },
        {
            "description": "",
            "isPublic": true,
            "upvotes": 0,
            "downvotes": 0,
            "tags": [],
            "games": [],
            "_id": "6070ce5351991d8040298806",
            "ownerId": "606542da7084a516a96bc8f3",
            "title": "Platform XX",
            "createdAt": "2021-04-09T21:59:47.992Z",
            "updatedAt": "2021-04-09T21:59:47.992Z",
            "__v": 0
        },
        {
            "description": "",
            "isPublic": true,
            "upvotes": 0,
            "downvotes": 0,
            "tags": [],
            "games": [],
            "_id": "6070ce7851991d8040298807",
            "ownerId": "606542da7084a516a96bc8f3",
            "title": "Platform XXX",
            "createdAt": "2021-04-09T22:00:24.417Z",
            "updatedAt": "2021-04-09T22:00:24.417Z",
            "__v": 0
        },
        {
            "description": "dumb platform",
            "isPublic": true,
            "upvotes": 0,
            "downvotes": 0,
            "tags": [],
            "games": [
                "606542da7084a516a96bc8f1",
                "606542da7084a516a96bc8f2"
            ],
            "_id": "606ea28cf3b2dc0d08e40adc",
            "ownerid": "606542da7084a516a96bc8f1",
            "title": "dummyTest",
            "createdAt": "2021-04-08T06:28:28.237Z",
            "updatedAt": "2021-04-09T21:42:49.920Z",
            "__v": 2
        },
        {
            "description": "Best platform",
            "isPublic": true,
            "upvotes": 0,
            "downvotes": 0,
            "tags": [],
            "games": [],
            "_id": "606f8d1d7195479521336568",
            "ownerid": "606f8bc2ea8d56647dfaaeff",
            "title": "Louis' Second Platform",
            "createdAt": "2021-04-08T23:09:17.243Z",
            "updatedAt": "2021-04-08T23:09:17.243Z",
            "__v": 0
        }
      ])
    
    function DisplayCard(props){
        const platform = props.platform;
        return (
            <Box p={1}>
            <Card className={classes.card}>
            <CardActionArea>
            <CardHeader
                avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                    {platform.title[0]}
                </Avatar>
                }
                title={platform.title}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                {platform.description ? platform.description :"No description"}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                <FavoriteIcon />
                </IconButton>
                <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                align="right"
                >
                {platform.games.length == 0 ? "No Games": "Total Games: "+platform.games.length}
                </Typography>
            </CardActions>
            </CardActionArea>
            </Card>
            </Box>
        )
    }

    function Populate(props){
        const platforms = props.platforms;
        //Test many platforms
        var i;
        const listPlatforms =[]
        for (i=0;i<15;i++){
            listPlatforms.push(
                <DisplayCard 
                key={i} 
                item
                platform={
                    {
                        "description": "Description "+i,
                        "isPublic": true,
                        "upvotes": 0,
                        "downvotes": 0,
                        "tags": [],
                        "games": [],
                        "_id": "606f8d1d7195479521336568",
                        "ownerid": "606f8bc2ea8d56647dfaaeff",
                        "title": "Platform " + i,
                        "createdAt": "2021-04-08T23:09:17.243Z",
                        "updatedAt": "2021-04-08T23:09:17.243Z",
                        "__v": 0
                    }
                } />
            )
        }
        // Production Code
        // const listPlatforms = platforms.map((platform) => 
        //     <DisplayCard platform={platform} key={platform._id} item/>
        // );
        return (
        //replace this with a singular card
        <Grid
            container
            direction="row"
            justify="flex-start"
            spacing={5}
        >
            {listPlatforms}
        </Grid>
        );
    }

    return(
        <div style={{display:'flex', marginTop:"64px"}}>
            <LeftPanel/>
            <Container style={{paddingLeft:'64px', marginTop:"64px"}}maxWidth="xl">
                <Container className={classes.section}>
                    <Typography fontWeight="fontWeightBold" className={classes.subtitle}>Favorites:</Typography>
                    <Populate platforms={favorites} />
                </Container>
            </Container>
        </div> 
    )
}