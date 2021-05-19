import { Box, Container, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import React, { Component, useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";
import Avatar from "@material-ui/core/Avatar";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { red } from "@material-ui/core/colors";
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';

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
        width:'1000px'
    }
  }));

  
export default function SearchFunction(prop){
    const classes = useStyles();
    const history = useHistory();
    const platformData = prop.platformData

    const [token, setToken] = useState('');
    const [userData, setUserData] = useState(null);
    const [favoritedPlatformIds, setFavoritedPlatformIds] = useState(null);

    
    useEffect(() => {
        setToken(localStorage.getItem('token'));
    },[]);

    useEffect(() => {
        if(token != ''){
            const options = {
            headers: {'X-Auth-Token': token}
            };
        axios.get('/users/auth/user', options).then( data => {
            setUserData(data);
        });
        }
    },[token]);

    useEffect(() => {
        if(userData != null){
            var favorites = [];
            userData.data.favorites.map((platform) =>
                favorites.push(platform._id.toString())
            );
        setFavoritedPlatformIds(favorites);
        };
    },[userData]);

    const handlePlatform = (id) => {
        history.push("/platform/" + id);
    };

    function DisplayCard(props){
        const platform = props.platform;
        if(platform.description.length > 50){
            platform.description = platform.description.slice(0,50);
            platform.description = platform.description + '...';
        }

        return (
            <Card className={classes.card}
            style={{
            marginTop:'25px',
            marginBottom:'25px',
            marginLeft:'25px',
            marginRight:'25px',
            }}
            >
                <CardActionArea onClick={() => handlePlatform(platform._id)}>
                    <CardHeader
                        avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            {platform.title[0]}
                        </Avatar>
                        }
                        title={platform.title}
                    />
                    <CardContent>
                        <Typography noWrap variant="body2" color="textSecondary" component="p">

                        {platform.description ? platform.description :"No description"}

                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        {favoritedPlatformIds != null && favoritedPlatformIds.includes(platform._id.toString()) ? <FavoriteIcon style={{ margin: '10px'}}/> : <FavoriteBorderOutlinedIcon style={{ margin: '10px'}}/>}

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
        )
    }

    function Populate(props){
        const platforms = props.platforms;
        const listPlatforms = platforms.map((platform) => 
          <DisplayCard platform={platform}/>
        );
        return (
          <Grid
            container
            direction="row"
            justify="flex-start"
          >
            {listPlatforms}
          </Grid>
        );
    }

    if(platformData != null){
        return(
            <Container style={{
                width:'1250px',
                //border: '1px solid black'
            }}>
                {platformData.data.length===0
                &&
                <Container tyle={{
                    width:'1250px',
                    height:'700px',
                    display:'flex',
                    alignItems:'center',
                    justifyContent: "center",
                    flexDirection:'column',
                }}>
                    <Typography>
                        No More Platforms!
                    </Typography>
                </Container>
                }
                <Populate platforms={platformData.data} />
            </Container>

        )
    }
    else{
        return(
            <Container tyle={{
                width:'1250px',
                height:'700px',
                display:'flex',
                alignItems:'center',
                justifyContent: "center",
                flexDirection:'column',
            }}>
                <CircularProgress />
            </Container>
            )        
    }
}