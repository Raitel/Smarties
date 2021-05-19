
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LeftPanel from "./leftNavigationPanel";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";

import Typography from "@material-ui/core/Typography";

import CardActionArea from "@material-ui/core/CardActionArea";
import Container from '@material-ui/core/Container';
import { useHistory } from "react-router-dom";
import Grid from '@material-ui/core/Grid';

import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import { useParams } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Popover from '@material-ui/core/Popover';
import { useSnackbar } from 'notistack';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import ThumbDownAltOutlinedIcon from '@material-ui/icons/ThumbDownAltOutlined';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
    subcontainer: {
        //backgroundImage: `url(${Background})`,
        background: 'linear-gradient(45deg, #7c98b3 30%, #e99ba6 90%)',
        width: '1200px',
        //height: '300px',
        marginTop: '64px',
        marginLeft: '64px',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        border: '1px solid black'
    },
    container: {
        background: 'linear-gradient(45deg, #8b939a 30%, #caccd1 90%)',
        width: '1200px',
        minHeight: '65px',
        //height:'600px',
        marginLeft: '64px',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        border: '1px solid black'
    },
    bannerTest: {
        width: '100%'
    },
    coverTest: {
        width: '100%',
        height: '420px',
        border: '1px solid #000',
        margin: '10px 0',
        objectFit: 'cover',
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
    game: {
        background: 'linear-gradient(45deg, #b8d3fe 30%, #f6f2f2 90%)',
        width: "250px",
        minHeight: "175px"
    },
    editGame: {
        background: 'linear-gradient(45deg, #f9aba4 30%, #e99ba6 90%)',
        width: "250px",
        minHeight: "175px"
    },
    titleContainer: {
        marginTop: '50px',
        //height: '75px',
        //border: '1px solid #000',
    },
    descriptionContainer: {
        marginTop: '25px',
        //height: '75px',
        //border: '1px solid #000',
    },
    subBannerContainer: {
        marginTop: '25px',
        //height: '75px',
        //border: '1px solid #000',
    },
    titleTextField: {
        width: '600px'
    },
    descriptionTextField: {
        width: '600px'
    },
    tagsTextField: {
        width: '600px'
    },
    button: {
        //height:'30px',
        //width: '200px',
        marginTop: '10px',
        marginBottom: '10px',
        marginLeft: '10px',
        marginRight: '10px',
    },
    creatorContainer: {
        marginTop: '25px',
        marginBottom: '25px',
        //height: '75px',
    }

}));

export default function Platform() {
    const classes = useStyles();
    const history = useHistory();
    const { id } = useParams();
    const [platformData, setPlatformData] = useState(null);
    const [searchInput, setsearchInput] = useState('')
    const access_key = 'JJwuG0hMuTaes4G5QEwMyWZWxhCdr2udfk_QFR0DJq0';
    const secret_key = 'ZXRZlY5kOzfMdbvt9Iy2E7Q63Q7ICl_28Qopl4x3SJY';
    const [imageResult, setimageResult] = useState([])
    const [bannerURL, setbannerURL] = useState('')
    const [bannerOffset, setbannerOffset] = useState(50)
    const [anchorEl, setAnchorEl] = React.useState(null);

    const [enableEditMode, setEnableEditMode] = useState(false);
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);
    const [tags, setTags] = useState([]);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const [token, setToken] = useState('');
    const [userData, setUserData] = useState(null);
    const [completedGameIds, setCompletedGameIds] = useState([]);
    const [favoritedPlatformIds, setFavoritedPlatformIds] = useState([]);
    const [upvotedPlatformIds, setUpvotedPlatformIds] = useState([]);
    const [downvotedPlatformIds, setDownvotedPlatformIds] = useState([]);
    const [isPublic, setIsPublic] = useState(false);
    const [newGameTitle, setNewGameTitle] = useState('');
    const [newGameDescription, setNewGameDescription] = useState('');
    const [newGameTitleError, setNewGameTitleError] = useState(false);
    const [newGameDescriptionError, setNewGameDescriptionError] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [voting, setVoting] = useState(false);
    const [favoritedTrigger, setFavoritedTrigger] = useState(false);
    const [platformOwnerUsername, setPlatformOwnerUsername] = useState('');
    const [bannerTrigger, setBannerTrigger] = useState(false);

    useEffect(() => {
        setToken(localStorage.getItem('token'));
        getPlatform();
        handleRecent();
    }, []);

    useEffect(() => {
        if (token != '') {
            const options = {
                headers: { 'X-Auth-Token': token }
            };
            axios.get('/users/auth/user', options).then(data => {
                setUserData(data);
            });
        }
    }, [token]);

    useEffect(() => {
        if (userData != null) {
            var completed = [];
            var favorites = [];
            var upvoted = [];
            var downvoted = [];

            userData.data.completedGames.map((id) =>
                completed.push(id.toString())
                //setCompletedGameIds([...completedGameIds, id.toString()])
            );

            userData.data.favorites.map((platform) =>
                favorites.push(platform._id.toString())
                //setFavoritedPlatformIds([...favoritedPlatformIds, platform._id.toString()])
            );
            userData.data.upvoted.map((id) =>
                upvoted.push(id.toString())
            );
            userData.data.downvoted.map((id) =>
                downvoted.push(id.toString())
            );
            setCompletedGameIds(completed);
            setFavoritedPlatformIds(favorites);
            setUpvotedPlatformIds(upvoted);
            setDownvotedPlatformIds(downvoted);

            // console.log(completedGameIds)
            // console.log(favoritedPlatformIds)

        }

    }, [userData]);

    useEffect(() => {
        //console.log(platformData)
        if (platformData != null) {
            handleRecent();
            setTitle(platformData.data.title);
            setDescription(platformData.data.description);
            setTags(platformData.data.tags.join(" "));
            setIsPublic(platformData.data.isPublic);
            getUsername();
        }

    }, [platformData]);

    useEffect(() => {
        if (enableEditMode === false) {
            getPlatform();
        }

    }, [enableEditMode]);

    useEffect(() => {
        if (token != '') {
            const options = {
                headers: { 'X-Auth-Token': token }
            };
            axios.get('/users/auth/user', options).then(data => {
                setUserData(data);
            });
            getPlatform();
        }

    }, [voting, favoritedTrigger, bannerTrigger]);

    const getPlatform = () => {
        axios.get("/platforms/" + id).then(data => {
            setPlatformData(data);
        });
    }
    const getUsername = () => {
        axios.get("/users/getUsernameById/" + platformData.data.ownerId).then(data => {
            setPlatformOwnerUsername(data.data.username);
        });
    }

    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    const handleDeletePlatform = () => {

    };
    const handleUpvote = () => {
        console.log('upvote')
        setVoting(true)
        const data = {
            platform: platformData.data._id,
            upvoted: upvotedPlatformIds.includes(platformData.data._id.toString()),
            downvoted: downvotedPlatformIds.includes(platformData.data._id.toString()),
            upvoteTarget: true,
            downvoteTarget: false
        }
        const config = {
            headers: { 'X-Auth-Token': token },
        }
        axios.patch("/platforms/vote", data, config)
            .then(res => {
                console.log(res)
                if (data.upvoted) { enqueueSnackbar('Withdrew Upvote', { variant: 'success' }) }
                else { enqueueSnackbar('Upvoted!', { variant: 'success' }) }
                setVoting(false)
            })
            .catch(err => {
                enqueueSnackbar('Something bad happend', { variant: 'error' })
                setVoting(false)
            })
    };
    const handleDownvote = () => {
        console.log('downvote')
        setVoting(true)
        const data = {
            platform: platformData.data._id,
            upvoted: upvotedPlatformIds.includes(platformData.data._id.toString()),
            downvoted: downvotedPlatformIds.includes(platformData.data._id.toString()),
            upvoteTarget: false,
            downvoteTarget: true
        }
        const config = {
            headers: { 'X-Auth-Token': token },
        }
        axios.patch("/platforms/vote", data, config)
            .then(res => {
                console.log(res)
                if (data.downvoted) { enqueueSnackbar('Withdrew Downvote', { variant: 'success' }) }
                else { enqueueSnackbar('Downvoted!', { variant: 'success' }) }
                setVoting(false)
            })
            .catch(err => {
                enqueueSnackbar('Something bad happend', { variant: 'error' })
                setVoting(false)
            })
    };
    const handleFavorites = () => {
        //add to favorites
        setFavoritedTrigger(true);
        const data = {
            platformId: platformData.data._id,
            favorited: favoritedPlatformIds.includes(platformData.data._id.toString()),
        }
        const config = {
            headers: { 'X-Auth-Token': token },
        }
        //console.log(favoritedPlatformIds.includes(platformData.data._id.toString()))
        axios.put('/platforms/favorite', data, config)
            .then(res => {
                console.log(res.data)
                setFavoritedTrigger(false);
                if (favoritedPlatformIds.includes(platformData.data._id.toString())) {
                    enqueueSnackbar('Unfavorited!', { variant: 'success' })
                }
                else {
                    enqueueSnackbar('Favorited!', { variant: 'success' })
                }
            })
            .catch(err => {
                enqueueSnackbar('Something bad happend', { variant: 'error' });
            })
    };

    const handleRecent = () => {
        if (token != '' && platformData != null) {
            const data = {
                platformId: platformData.data._id,
            }

            const config = {
                headers: { 'X-Auth-Token': token },
            }

            axios.put('/users/updateRecent', data, config)
                .then(res => {
                })
                .catch(err => {
                    //enqueueSnackbar('Something bad happend', { variant: 'error' });
                })

        }
    };


    const handleCreate = async (e) => {
        e.preventDefault()
        setNewGameTitleError(false)
        setNewGameDescriptionError(false)
        if (newGameTitle == '') {
            setNewGameTitleError(true)
        }
        if (newGameDescription == '') {
            setNewGameDescriptionError(true)
        }
        if (newGameTitle && newGameDescription) {
            console.log(newGameTitle, newGameDescription)
            const data = {
                platform_id: id,
                title: newGameTitle,
                description: newGameDescription
            }
            const config = {
                headers: { 'X-Auth-Token': token },
            }
            axios.put('/games/push', data, config)
                .then(res => {
                    console.log(res.data)
                    // history.push("/platform/" + res.data.platform_id)
                    getPlatform()
                    handleCloseDialog()
                })
                .catch(err => {
                    enqueueSnackbar('Something bad happend', { variant: 'error' });
                })
        }
    };
    const setPhoto = (e, image_id, fullURL) => {
        e.preventDefault()
        setBannerTrigger(true)
        console.log(image_id, fullURL)
        console.log(id)
        axios.patch("/platforms/set_banner/" + id, { bannerURL: fullURL })
            .then(res => {
                console.log(res.data)
                platformData.data.bannerURL = res.data
                handleClose()
                setBannerTrigger(false)
            })
            .catch(err => {
                enqueueSnackbar('Something bad happend', { variant: 'error' });
                setBannerTrigger(false)
            })
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
        history.push("/game/" + id);
    };

    const handleEditGame = (id) => {
        history.push("/editGame/" + id);
    };

    const handleProfile = (username) => {
        history.push("/profile/" + username);
    };

    function adjustBanner(props) {
        console.log('adjustBanner')
    }
    function removeBanner(props) {
        console.log('removeBanner')
        setBannerTrigger(true)
        axios.patch("/platforms/remove_banner/" + id)
            .then(res => {
                console.log(res.data)
                platformData.data.bannerURL = ''
                handleClose()
                enqueueSnackbar('Banner removed', { variant: 'success' });
                setBannerTrigger(false)
            })
            .catch(err => {
                handleClose()
                enqueueSnackbar('Something bad happend', { variant: 'error' });
                setBannerTrigger(false)
            })

    }
    const handleSaveChanges = () => {
        axios.patch('/platforms/update/' + platformData.data._id, { title: title, description: description, tags: tags.split(" "), isPublic: isPublic })
            .then(res => {
                console.log(res)
                if (res.status === 200) {
                    enqueueSnackbar('Success!!', { variant: 'success' });
                    setEnableEditMode(false);
                } else if (res.status === 400) {
                    enqueueSnackbar('400 error', { variant: 'warning' });
                } else {
                    enqueueSnackbar('Hm, something is not right', { variant: 'error' });
                }
            })
            .catch(() => {
                enqueueSnackbar('Hm, something is not right', { variant: 'error' });
            })
    };


    function DisplayCard(props) {
        const game = props.game;
        return (
            <Card className={classes.game} style={{
                marginTop: '15px',
                marginBottom: '15px',
                marginLeft: '15px',
                marginRight: '15px',
            }}>
                <CardActionArea onClick={() => handleGame(game._id)}>
                    <CardHeader
                        title={game.title}
                    />
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {game.description ? game.description : "No description"}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        {completedGameIds.includes(game._id.toString())
                            &&
                            <CheckCircleOutlineOutlinedIcon style={{ color: 'green', margin: '10px' }} />
                        }
                    </CardActions>
                </CardActionArea>
            </Card>
        )
    }

    function DisplayEditGameCard(props) {
        const game = props.game;
        return (
            <Card className={classes.editGame} style={{
                marginTop: '15px',
                marginBottom: '15px',
                marginLeft: '15px',
                marginRight: '15px',
            }}>
                <CardActionArea onClick={() => handleEditGame(game._id)}>
                    <CardHeader
                        title={"Edit: " + game.title}
                    />
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {game.description ? game.description : "No description"}
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
    function PopulateTags(props) {
        const tags = props.tags;
        const counter = 0
        const listTags = []
        for (var i = 0; i < tags.length; i++) {
            listTags.push(
                <Chip size="small" style={{ marginRight: '15px' }} label={tags[i]} key={i} />
            )
        }
        return (

            <Grid
                container
            >
                {listTags}
            </Grid>
        )
    }

    function Populate(props) {
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

    function PopulateEditGames(props) {
        const games = props.games;
        const listGames = games.map((game) =>
            <DisplayEditGameCard game={game} />
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

    function fetchUnsplash(e) {
        e.preventDefault();
        console.log('search with query: ' + searchInput)
        axios.get('https://api.unsplash.com/search/photos/?client_id=' + access_key + '&query=' + searchInput)
            .then(res => {
                console.log(res.data.results)
                setimageResult([])
                res.data.results.forEach(photo => {
                    setimageResult(oldArray => [...oldArray,
                    <GridListTile key={photo.id} cols={1} onClick={(e) => setPhoto(e, photo.id, photo.urls.full)}>
                        <img src={photo.urls.thumb} alt={'alt pic'} />
                    </GridListTile>
                    ])
                });
                console.log(imageResult)
            })
    }

    if (platformData != null && userData != null) {
        return (
            <div style={{ display: 'flex', marginTop: "64px" }}>
                <LeftPanel />
                <div>
                    <div className={classes.bannerTest}>
                        {platformData.data.bannerURL ? <img className={classes.coverTest} src={platformData.data.bannerURL} alt="Banner image" /> : null}
                    </div>

                    {!platformData.data.bannerURL ?
                        <div>
                            {userData.data._id.toString() === platformData.data.ownerId.toString() && enableEditMode === true
                                &&
                                <Button className={classes.button} style={{ textTransform: 'none' }} aria-describedby={popup_id} variant="contained" color="primary" onClick={handleClick}>Add a Banner</Button>
                            }
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
                                <Container style={{ display: 'flex' }}>
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
                            {/* <Button className={classes.button} style={{ textTransform: 'none' }} variant="contained" onClick={adjustBanner} >
                                Adjust Image
                            </Button> */}
                            {userData.data._id.toString() === platformData.data.ownerId.toString() && enableEditMode === true
                                &&
                                <Button className={classes.button} style={{ textTransform: 'none' }} variant="contained" color="primary" aria-describedby={popup_id} onClick={handleClick}>
                                    Change the Banner
                                </Button>
                            }
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
                                <Container style={{ display: 'flex' }}>
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
                            {userData.data._id.toString() === platformData.data.ownerId.toString() && enableEditMode === true
                                &&
                                <Button className={classes.button} style={{ textTransform: 'none' }} color="primary" variant="contained" onClick={removeBanner} >
                                    Remove Banner
                                </Button>
                            }
                        </div>
                    }
                    <Container className={classes.subcontainer}>
                        <Grid
                            container
                            direction="row"
                            justify="space-between"
                            alignItems="center"
                            container
                        >
                            <Grid item>
                                <Container className={classes.titleContainer}>
                                    {!enableEditMode
                                        &&
                                        <Typography variant="subtitle2" style={{ color: '#FFFFFF' }}>
                                            Title:
                                    </Typography>
                                    }
                                    {!enableEditMode
                                        &&
                                        <Typography variant="h5" style={{ color: '#FFFFFF' }}>
                                            {platformData.data.title}
                                        </Typography>
                                    }
                                    {enableEditMode
                                        &&
                                        <TextField
                                            onChange={(e) => setTitle(e.target.value)}
                                            variant="outlined"
                                            required
                                            placeholder="Title"
                                            label='Title'
                                            value={title}
                                            className={classes.titleTextField}
                                            rowsMax={1}
                                            inputProps={{ style: { color: '#FFFFFF', fontSize: 18, fontWeight: 'Bold', verticalAlign: "middle" } }}
                                        />
                                    }
                                </Container>
                                <Container className={classes.descriptionContainer}>
                                    {!enableEditMode
                                        &&
                                        <Typography variant="subtitle2" style={{ color: '#FFFFFF' }}>
                                            Description:
                                    </Typography>
                                    }
                                    {!enableEditMode
                                        &&
                                        <Typography style={{ color: '#FFFFFF' }}>
                                            {platformData.data.description}
                                        </Typography>
                                    }
                                    {enableEditMode
                                        &&
                                        <TextField
                                            onChange={(e) => setDescription(e.target.value)}
                                            variant="outlined"
                                            label='Description'
                                            placeholder="Description"
                                            value={description}
                                            className={classes.descriptionTextField}
                                            multiline
                                            rows={3}
                                            rowsMax={3}
                                            inputProps={{ style: { color: '#FFFFFF', fontSize: 16, verticalAlign: "middle" } }}
                                        />
                                    }

                                </Container>
                                <Container className={classes.subBannerContainer}>
                                    {!enableEditMode
                                        &&
                                        <Typography variant="subtitle2" style={{ color: '#FFFFFF' }}>Tags:</Typography>
                                    }
                                    {!enableEditMode
                                        &&
                                        <PopulateTags tags={platformData.data.tags} />
                                    }
                                    {enableEditMode
                                        &&
                                        <TextField
                                            onChange={(e) => setTags(e.target.value)}
                                            variant="outlined"
                                            required
                                            placeholder="Tags"
                                            value={tags}
                                            className={classes.tagsTextField}
                                            multiline
                                            rows={1}
                                            rowsMax={1}
                                            inputProps={{ style: { color: '#FFFFFF', fontSize: 16, verticalAlign: "middle" } }}
                                        />
                                    }
                                </Container>
                                <Container className={classes.creatorContainer}>
                                    {!enableEditMode
                                        &&
                                        <Typography variant="subtitle2" style={{ color: '#FFFFFF' }}>Platform Creator:</Typography>
                                    }
                                    {!enableEditMode && platformOwnerUsername != ''
                                        &&
                                        <Link onClick={() => handleProfile(platformOwnerUsername)}>
                                            {
                                                platformOwnerUsername
                                            }
                                        </Link>
                                    }
                                </Container>
                            </Grid>
                            <Grid item>
                                <Container>
                                    {userData.data._id.toString() === platformData.data.ownerId.toString() && enableEditMode === true
                                        &&
                                        <FormControlLabel
                                            style={{
                                                marginLeft: '10px',
                                                marginRight: '10px',
                                            }}
                                            control={<Switch checked={isPublic} onChange={e => (setIsPublic(e.target.checked))} name="setPublic" />}
                                            label="Set Public"
                                        />
                                    }
                                    <Grid
                                        container
                                        direction="row"
                                        justify="space-evenly"
                                        alignItems="center"
                                        container
                                    >
                                        {
                                            //upvote and downvote   
                                        }
                                        {
                                            enableEditMode ? null :
                                                <Button
                                                    disabled={voting}
                                                    className={classes.button}
                                                    variant="contained"
                                                    color="secondary"
                                                    onClick={handleUpvote}
                                                    startIcon={upvotedPlatformIds.includes(platformData.data._id.toString()) ? <ThumbUpIcon /> : <ThumbUpAltOutlinedIcon />}
                                                    style={{ textTransform: 'none' }}
                                                >
                                                    {platformData.data.upvotes}
                                                </Button>
                                        }
                                        {
                                            enableEditMode ? null :
                                                <Button
                                                    disabled={voting}
                                                    className={classes.button}
                                                    variant="contained"
                                                    color="secondary"
                                                    onClick={handleDownvote}
                                                    startIcon={downvotedPlatformIds.includes(platformData.data._id.toString()) ? <ThumbDownIcon /> : <ThumbDownAltOutlinedIcon />}
                                                    style={{ textTransform: 'none' }}
                                                >
                                                    {platformData.data.downvotes}
                                                </Button>
                                        }

                                        {
                                            //favorites
                                        }
                                        {enableEditMode === false && !favoritedPlatformIds.includes(platformData.data._id.toString())
                                            &&
                                            <Button disabled={favoritedTrigger} className={classes.button} variant="contained" color="secondary" onClick={handleFavorites} startIcon={<FavoriteBorderOutlinedIcon />} style={{ textTransform: 'none' }}>Add to Favorites</Button>
                                        }
                                        {enableEditMode === false && favoritedPlatformIds.includes(platformData.data._id.toString())
                                            &&
                                            <Button disabled={favoritedTrigger} className={classes.button} variant="contained" color="secondary" onClick={handleFavorites} startIcon={<FavoriteOutlinedIcon />} style={{ textTransform: 'none' }}>Favorited</Button>
                                        }

                                        {userData.data._id.toString() === platformData.data.ownerId.toString() && enableEditMode === true
                                            &&
                                            <Button className={classes.button} variant="contained" color="secondary" onClick={handleSaveChanges} startIcon={<SaveOutlinedIcon />} style={{ textTransform: 'none' }}>
                                                Save Changes
                                            </Button>
                                        }
                                        {userData.data._id.toString() === platformData.data.ownerId.toString() && enableEditMode === true
                                            &&
                                            <Button className={classes.button} variant="contained" color="secondary" onClick={handleDeletePlatform} startIcon={<HighlightOffOutlinedIcon />} style={{ textTransform: 'none' }}>
                                                Delete the Platform
                                            </Button>
                                        }

                                    </Grid>
                                    {userData.data._id.toString() === platformData.data.ownerId.toString() && enableEditMode === true
                                        &&
                                        <Button className={classes.button} variant="contained" color="secondary" onClick={() => setEnableEditMode(false)} startIcon={<ExitToAppIcon />} style={{ textTransform: 'none' }}>Exit Edit Mode</Button>
                                    }
                                    {userData.data._id.toString() === platformData.data.ownerId.toString() && enableEditMode === false
                                        &&
                                        <Button className={classes.button} variant="contained" color="primary" onClick={() => setEnableEditMode(true)} startIcon={<EditOutlinedIcon />} style={{ textTransform: 'none' }}>Enable Edit Mode</Button>
                                    }
                                </Container>
                            </Grid>
                        </Grid>
                    </Container>


                    <Container className={classes.container}>
                        <div style={{ width: '100%', marginTop: '15px', display: 'flex', justifyContent: 'flex-end' }}>

                            {userData.data._id.toString() === platformData.data.ownerId.toString() && enableEditMode === true
                                &&
                                <Button variant="contained" color="secondary" onClick={handleClickOpen} startIcon={<AddCircleOutlineOutlinedIcon />} style={{ textTransform: 'none' }} >Add a game</Button>
                            }

                            <Dialog open={openDialog} onClose={handleCloseDialog} aria-labelledby="form-dialog-title">
                                <DialogTitle id="form-dialog-title">New Game:</DialogTitle>
                                <DialogContent>
                                    <TextField
                                        onChange={(e) => setNewGameTitle(e.target.value)}
                                        autoFocus
                                        variant="outlined"
                                        margin="dense"
                                        id="title"
                                        label="Game Title"
                                        type="title"
                                        fullWidth
                                        multiline
                                        error={newGameTitleError}
                                    />
                                    <TextField
                                        onChange={(e) => setNewGameDescription(e.target.value)}
                                        autoFocus
                                        variant="outlined"
                                        margin="dense"
                                        id="description"
                                        label="Game Description"
                                        type="description"
                                        fullWidth
                                        multiline
                                        rows={5}
                                        error={newGameDescriptionError}
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleCloseDialog} color="primary">
                                        Cancel
                                    </Button>
                                    <Button onClick={handleCreate} color="primary">
                                        Create
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                        {enableEditMode ? <PopulateEditGames games={platformData.data.games} /> : <Populate games={platformData.data.games} />}
                        {platformData.data.games.length === 0
                            &&
                            <Grid
                                container
                                direction="row"
                                justify="flex-start"
                            >
                                <Container style={{
                                    background: '#ffffff',
                                    height: '175px',
                                    width: '250px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'column',
                                    marginTop: '15px',
                                    marginBottom: '15px',
                                    marginLeft: '15px',
                                    marginRight: '15px',
                                    borderRadius: '5px',
                                    border: '1px solid grey'
                                }}>
                                    <Typography style={{ textAlign: "center" }}>
                                        There exists no game in the platform.
                                    </Typography>
                                </Container>
                            </Grid>
                        }
                    </Container>
                </div>
            </div>
        )
    }
    else {
        return (
            <div style={{ display: 'flex', marginTop: "64px" }}>
                <Container style={{
                    width: '1250px',
                    height: '700px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: "center",
                    flexDirection: 'column',
                }}>
                    <CircularProgress />

                </Container>
            </div>
        )
    }

}