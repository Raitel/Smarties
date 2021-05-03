
import React, { useState, useEffect } from 'react';
import LeftPanel from "./leftNavigationPanel";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";

import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CardActionArea from "@material-ui/core/CardActionArea";
import Container from '@material-ui/core/Container';

import { useHistory } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';

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
      marginBottom:'20px',
      fontWeight: 'Bold'
    },
    card:{
      width: "250px"
      
    },
    section:{
      height:'300px',
      // marginTop: '50px',
      // marginBottom: '50px',
      //border: '1px solid black'
    },
    container:{
      width:'1250px',
      height:'800px',
      marginTop:'64px',
      marginLeft:'64px',
      display:'flex',
      //alignItems:'center',
      flexDirection:'column',
      //border: '1px solid black'
    }
  }));

export default function Home() {
  const classes = useStyles();
  const history = useHistory();
  const [recentlyUsed, setRecentlyUsed] = useState([]);
  
  const [token, setToken] = useState('');
  const [userData, setUserData] = useState(null);
  const [ownedPlatforms, setOwnedPlatforms] = useState(null);
  const [favorites, setFavorites] = useState(null);
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
      setOwnedPlatforms(userData.data.ownedPlatforms.slice(0,3));
      setFavorites(userData.data.favorites.slice(0,3))
  };
},[userData]);

  const handlePlatform = (id) => {
    history.push("/platform/" + id);
};

function DisplayCard(props){
    const platform = props.platform;
    return (
        <Card className={classes.card}
        style={{
        marginTop:'0px',
        marginBottom:'10px',
        marginLeft:'10px',
        marginRight:'10px',
        }}
        >
            <CardActionArea onClick={() => handlePlatform(platform._id)}>
                <CardHeader
                    avatar={
                    <Avatar className={classes.avatar}>
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

  if(ownedPlatforms!=null && favorites!= null){
  return(
    <div style={{display:'flex', marginTop:"64px"}}>
      <LeftPanel/>
        <Container className={classes.container}>
            <Container className={classes.section}>
                <Typography fontWeight="fontWeightBold" className={classes.subtitle}>Recently Used:</Typography>
                {recentlyUsed.length === 0
                &&
                <Container style={{
                  background: '#ffffff',
                  height:'170px',
                  width: '250px',
                  display:'flex',
                  justifyContent: 'center',
                  alignItems:'center',
                  flexDirection:'column',
                  marginTop:'10px',
                  marginBottom:'10px',
                  marginLeft:'10px',
                  marginRight:'10px',
                  borderRadius: '5px',
                  border: '1px solid grey'
              }}>
                  <Typography style={{textAlign: "center"}}>
                  No Recently Used Platform. 
                  </Typography>
                </Container>
                }
                <Populate platforms={recentlyUsed} />
            </Container>

            <Container className={classes.section}>
                <Typography fontWeight="fontWeightBold" className={classes.subtitle}>Favorites:</Typography>
                {favorites.length === 0
                &&
                <Container style={{
                  background: '#ffffff',
                  height:'170px',
                  width: '250px',
                  display:'flex',
                  justifyContent: 'center',
                  alignItems:'center',
                  flexDirection:'column',
                  marginTop:'10px',
                  marginBottom:'10px',
                  marginLeft:'10px',
                  marginRight:'10px',
                  borderRadius: '5px',
                  border: '1px solid grey'
              }}>
                  <Typography style={{textAlign: "center"}}>
                  You have not favorited any platform. 
                  </Typography>
                </Container>
                }
                <Populate platforms={favorites} />
            </Container>

            <Container className={classes.section}>

                <Typography fontWeight="fontWeightBold" className={classes.subtitle}>My Games:</Typography>
                {ownedPlatforms.length === 0
                &&
                <Container style={{
                  background: '#ffffff',
                  height:'170px',
                  width: '250px',
                  display:'flex',
                  justifyContent: 'center',
                  alignItems:'center',
                  flexDirection:'column',
                  marginTop:'10px',
                  marginBottom:'10px',
                  marginLeft:'10px',
                  marginRight:'10px',
                  borderRadius: '5px',
                  border: '1px solid grey'
              }}>
                  <Typography style={{textAlign: "center"}}>
                  You do not have any platform.
                  </Typography>
              </Container>
                }
                <Populate platforms={ownedPlatforms} />
            </Container>

        </Container>

    </div>

  )}
  else{
    return(
      <div>
      <LeftPanel/>
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
      </div>
    )
  }
}
