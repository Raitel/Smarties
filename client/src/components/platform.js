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
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Popover from '@material-ui/core/Popover';

const useStyles = makeStyles((theme) => ({
    subcontainer:{
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
    bannerTest:{
        width:'100%'
    },
    coverTest:{
        width:'100%',
        height: '420px',
        border: '1px solid #000',
        margin: '10px 0',
        objectFit:'cover',
        objectPosition: 'center 30%'
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 500,
        height: 450,
    },
    game:{
        width: "250px"
    },
}));

export default function Platform() {
    const classes = useStyles();
    const history = useHistory();
    const { id } = useParams();
    const [platformData,setPlatformData] = useState(null);
    const [imageURL, setimageURL] = useState(null)
    const [searchInput, setsearchInput] = useState('') 
    const access_key = 'JJwuG0hMuTaes4G5QEwMyWZWxhCdr2udfk_QFR0DJq0';
    const secret_key = 'ZXRZlY5kOzfMdbvt9Iy2E7Q63Q7ICl_28Qopl4x3SJY';
    const [imageResult, setimageResult] = useState([])
    const [bannerURL, setbannerURL] = useState('')
    const [bannerOffset, setbannerOffset] = useState(50)
    const [anchorEl, setAnchorEl] = React.useState(null);

    useEffect(() => {
        getPlatform();
    }, []);
    const getPlatform = () => {
        axios.get("/platforms/" + id).then( data => {
            setPlatformData(data);
        });
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const popup_id = open ? 'simple-popover' : undefined;

    
    const handleGame = (id) => {
        history.push("/game/"+id);
    };
    
    const setPhoto = (id, fullURL) => {
        console.log(id, fullURL)
        setbannerURL(fullURL)
        handleClose()
    }

    function adjustBanner(props){
        console.log('adjustBanner')
    }
    function removeBanner(props){
        setbannerURL('')
        handleClose()
    }

    function DisplayCard(props){
        const game = props.game;
        return (
            <Card className={classes.game} style={{
                marginTop:'25px',
                marginBottom:'25px',
                marginLeft:'25px',
                marginRight:'25px',
                }}>
                <CardActionArea onClick={() => handleGame(game._id)}>
                    <CardHeader
                     title={game.title}
                    />
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {game.description ? game.description :"No description"}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                    {/* <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                        align="right"
                    >
                        {game.nestedStages.length == 0 ? "No Stage": "Total Stages: " + game.nestedStages.length}
                    </Typography> */}
                    </CardActions>
                </CardActionArea>
            </Card>
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
          <DisplayCard game={game} />
        );
        return (
            <Grid
            container
            direction="row"
            justify="flex-start"
          >
            {listGames}
          </Grid>
        );
    }

    function fetchUnsplash(e){
        e.preventDefault();
        console.log('search with query: ' + searchInput)
        axios.get('https://api.unsplash.com/search/photos/?client_id=' + access_key + '&query=' + searchInput)
            .then(res =>{
                console.log(res.data.results)
                setimageResult([])
                res.data.results.forEach(photo => {
                    setimageResult(oldArray => [...oldArray, 
                        <GridListTile key={photo.id} cols={1} onClick={() => setPhoto(photo.id, photo.urls.full)}>
                            <img src={photo.urls.thumb} alt={'alt pic'} />
                        </GridListTile>
                    ])
                });
                console.log(imageResult)
            }) 
    } 
    
    if(platformData != null){
        return(
        <div style={{display:'flex', marginTop:"64px"}}>
            <LeftPanel/>
            <div>
                <div className={classes.bannerTest}>
                    {bannerURL ? <img className={classes.coverTest} src={bannerURL} alt="Banner image"/> : null }
                </div>
                
                {!bannerURL ? 
                <div>
                    <Button aria-describedby={popup_id} variant="contained" color="primary" onClick={handleClick}>Add Cover</Button>
                    <Popover
                        popup_id={popup_id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                        }}
                        transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                        }}
                    >
                        <Container style={{display:'flex'}}>
                            <TextField
                                onChange={(e) => setsearchInput(e.target.value)}
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                label="searchInput"
                                type="searchInput"
                                id="searchInput"
                            />
                            <Button onClick={fetchUnsplash} variant="contained" color="primary">Search me</Button>
                        </Container>
                        <div className={classes.root}>
                            <GridList cellHeight={160} className={classes.gridList} cols={3}>
                                {imageResult}
                            </GridList>
                        </div>
                    </Popover>
                </div>
                : 
                <div>
                    <Button variant="contained" onClick={adjustBanner} >
                        Adjust Image
                    </Button>
                    <Button variant="contained" aria-describedby={popup_id} onClick={handleClick}>
                        Change Cover    
                    </Button>
                    <Popover
                        popup_id={popup_id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                        }}
                        transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                        }}
                    >
                        <Container style={{display:'flex'}}>
                            <TextField
                                onChange={(e) => setsearchInput(e.target.value)}
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                label="searchInput"
                                type="searchInput"
                                id="searchInput"
                            />
                            <Button onClick={fetchUnsplash} variant="contained" color="primary">Search me</Button>
                        </Container>
                        <div className={classes.root}>
                            <GridList cellHeight={160} className={classes.gridList} cols={3}>
                                {imageResult}
                            </GridList>
                        </div>
                    </Popover>
                    <Button variant="contained" onClick={removeBanner} >
                        Remove Banner
                    </Button>
                </div>
                }
                <Container className = {classes.subcontainer}>
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
                <Container style={{
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