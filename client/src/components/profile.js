import React, { useEffect, useState } from 'react';
import LeftPanel from "./leftNavigationPanel";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useHistory, useParams } from "react-router-dom";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { red } from "@material-ui/core/colors";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Box from "@material-ui/core/Box";
import axios from 'axios';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    subtitle: {
        color: '#212197',
        fontSize: '24px',
        marginBottom: '40px',
        fontWeight: 'Bold'
    },
    subtitle2: {
        color: '#212197',
        fontWeight: 'Bold'
    },
    text: {
        color: '#212197',
        fontWeight: 'Bold'
    },
    subcontainer_profile: {
        width: "400px",
        border: '1px solid grey',
        borderRadius: '10px'
    },
    subcontainer_game: {
        width: "1000px",
        border: '1px solid grey',
        borderRadius: '10px'
    },
    avatar: {
        backgroundColor: red[500]
    },
    card: {
        width: "250px"
    },
}));

export default function Profile() {
    const classes = useStyles();
    const history = useHistory();
    const { username } = useParams();
    const [userData, setUserData] = useState(null);
    const [owned, setOwned] = useState([])
    const [currentUserData, setCurrentUserData] = useState(null);
    const [favoritedPlatformIds, setFavoritedPlatformIds] = useState(null);
    const [token, setToken] = useState('');

    useEffect(() => {
        setToken(localStorage.getItem('token'));
      }, []);    

    useEffect(() => {
        getProfile();
    }, []);

    const getProfile = () => {
        axios.get("/users/getProfile/" + username)
            .then(res => {
                setUserData(res.data)
                console.log(res.data)
            })
    }

    useEffect(() => {
        if(userData != null){
            setOwned(userData.ownedPlatforms);
        }
    }, [userData]);

    useEffect(() => {
        if (token != '') {
          const options = {
            headers: { 'X-Auth-Token': token }
          };
          axios.get('/users/auth/user', options).then(data => {
            setCurrentUserData(data);
          });
        }
      }, [token]);
    
      useEffect(() => {
        if (currentUserData != null) {
            var favorites = [];

            currentUserData.data.favorites.map((platform) =>
                favorites.push(platform._id.toString())
                //setFavoritedPlatformIds([...favoritedPlatformIds, platform._id.toString()])
            );
            setFavoritedPlatformIds(favorites);
        }

    }, [currentUserData]);  

    const handlePlatform = (id) => {
        history.push("/platform/" + id);
    };
    
    function DisplayCard(props) {
        const platform = props.platform;
        if(platform.description.length > 50){
            platform.description = platform.description.slice(0,50);
            platform.description = platform.description + '...';
        }
        return (
            <Box p={1}>
                <Card className={classes.card}>
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
                                {platform.description ? platform.description : "No description"}
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
                                {platform.games.length == 0 ? "No Games" : "Total Games: " + platform.games.length}
                            </Typography>
                        </CardActions>
                    </CardActionArea>
                </Card>
            </Box>
        )
    }
    function BlankCard(props) {
        return (
            <Container style={{
                background: '#ffffff',
                height: '170px',
                width: '250px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                marginTop: '10px',
                marginBottom: '10px',
                marginLeft: '10px',
                marginRight: '10px',
                borderRadius: '5px',
                border: '1px solid grey'
            }}>
                <Typography style={{ textAlign: "center" }}>
                    No platforms here, check back soon!
                </Typography>
            </Container>
        )
    }
    function Populate(props) {
        const platforms = props.platforms;
        const listPlatforms = platforms.map((platform) =>
            <DisplayCard platform={platform} key={platform._id} item />
        );
        return (
            //replace this with a singular card
            <Grid
                container
                direction="row"
                justify="flex-start"
                spacing={5}
            >
                {listPlatforms.length == 0 ? <BlankCard /> : listPlatforms}
            </Grid>
        );
    }
    if (userData != null && currentUserData != null) {
        return (
            <div style={{ display: 'flex', marginTop: "64px" }}>
                <LeftPanel />
                <div>
                    <Container style={{ paddingLeft: '64px', marginTop: "64px" }} maxWidth="xl">
                        <Typography fontWeight="fontWeightBold" className={classes.subtitle}>
                            User Profile:
                        </Typography>
                        <Grid container spacing={3}
                            direction="row"
                            justify="space-between"
                            alignItems="flex-start">
                            <Grid item>
                                <Container>
                                    <Container className={classes.subcontainer_profile} style={{ marginBottom: '10px', marginTop: "10px" }}>
                                        <Container style={{ marginBottom: '10px', marginTop: "10px" }}>
                                            <Grid container spacing={3}
                                                justify="space-around"
                                                alignItems="center">
                                                <Grid item>
                                                    <Avatar className={classes.avatar}>
                                                        {userData.username[0].toUpperCase()}
                                                    </Avatar>
                                                </Grid>
                                                <Grid item>
                                                    <Typography className={classes.text}>
                                                        {userData.username}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Container>
                                    </Container>
                                    <Container className={classes.subcontainer_profile} style={{ marginBottom: '10px', marginTop: "10px" }}>
                                        <Container style={{ marginBottom: '10px', marginTop: "10px" }}>
                                            <Grid container spacing={3}
                                                justify="space-between"
                                                alignItems="center">
                                                <Grid item>
                                                    <Typography className={classes.text}>
                                                        Total Upvotes:
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography className={classes.text}>
                                                        {userData.upvoted.length}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Container>
                                        <Container style={{ marginBottom: '10px', marginTop: "10px" }}>
                                            <Grid container spacing={3}
                                                justify="space-between"
                                                alignItems="center">
                                                <Grid item>
                                                    <Typography className={classes.text}>
                                                        Total Downvotes:
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography className={classes.text}>
                                                        {userData.downvoted.length}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Container>
                                        <Divider />
                                        <Container style={{ marginBottom: '10px', marginTop: "10px" }}>
                                            <Grid container spacing={3}
                                                justify="space-between"
                                                alignItems="center">
                                                <Grid item>
                                                    <Typography className={classes.text}>
                                                        Completed Games:
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography className={classes.text}>
                                                        {userData.completedGames.length}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Container>
                                        <Container style={{ marginBottom: '10px', marginTop: "10px" }}>
                                            <Grid container spacing={3}
                                                justify="space-between"
                                                alignItems="center">
                                                <Grid item>
                                                    <Typography className={classes.text}>
                                                        Total Earned Points:
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography className={classes.text}>
                                                        {userData.coin}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Container>
                                    </Container>
                                </Container>
                            </Grid>
                            <Grid item>
                                <Container className={classes.subcontainer_game} style={{ marginBottom: '10px', marginTop: "10px" }}>
                                    <Container style={{ marginBottom: '10px', marginTop: "10px" }}>
                                        <Container>
                                            <Typography fontWeight="fontWeightBold" className={classes.subtitle2} style={{ marginBottom: '40px', marginTop: "20px" }}>
                                                User Owned Platforms:
                                            </Typography>
                                        </Container>
                                        <Container style={{ marginBottom: '40px', marginTop: "20px" }}>
                                            <Populate platforms={owned} />
                                        </Container>
                                    </Container>
                                </Container>
                            </Grid>
                        </Grid>
                    </Container>
                </div>
            </div>
        )
    } else {
        return (
            <div>loading</div>
        )
    }

}
