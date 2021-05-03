import { Component } from 'react';
import React, { useState } from 'react';
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
import Button from '@material-ui/core/Button';

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
      height:'200px',
      marginTop: '50px',
      marginBottom: '50px',
    }
  }));

export default function Home() {
  const classes = useStyles();
  const history = useHistory();
  const [recentlyUsed, setRecentlyUsed] = useState([
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
    }
  ])
  const [myGames, setMyGames] = useState([
    {
        "description": "",
        "isPublic": true,
        "upvotes": 0,
        "downvotes": 0,
        "tags": [],
        "games": [],
        "_id": "6070d323d68135428c1d54f3",
        "ownerId": "6070d302d68135428c1d54f2",
        "title": "replica platform",
        "createdAt": "2021-04-09T22:20:19.225Z",
        "updatedAt": "2021-04-09T22:20:19.225Z",
        "__v": 0
    }
  ])
  const [spacing, setSpacing] = useState(2);

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

            <FavoriteIcon />

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

  // Constraint: only have 5 items in recently,favs or my games
  function Populate(props){
      const platforms = props.platforms;
      const listPlatforms = platforms.map((platform) => 
        <DisplayCard platform={platform} key={platform._id} item/>
      );
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

  const handle2 = () => {
    history.push("/search/Universe");
  };

  return(
    <div style={{display:'flex', marginTop:"64px"}}>
      <LeftPanel/>

        <Container>
          <Button  style={{textTransform: 'none', fontSize: 24}} className={classes.margin} onClick={handle2}>TEST PLATFORM BUTTON</Button>

            <Container className={classes.section}>
                <Typography fontWeight="fontWeightBold" className={classes.subtitle}>Recently Used:</Typography>
                <Populate platforms={recentlyUsed} />
            </Container>

            <Container className={classes.section}>
                <Typography fontWeight="fontWeightBold" className={classes.subtitle}>Favorites:</Typography>
                <Populate platforms={favorites} />
            </Container>

            <Container className={classes.section}>
                <Typography fontWeight="fontWeightBold" className={classes.subtitle}>My Games:</Typography>
                <Populate platforms={myGames} />
            </Container>

        </Container>

    </div>

  )
}