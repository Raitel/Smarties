
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

const useStyles = makeStyles((theme) => ({
    subcontainer: {
        //backgroundImage: `url(${Background})`,
        background: 'linear-gradient(45deg, #7c98b3 30%, #e99ba6 90%)',
        width: '1200px',
        height: '300px',
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
        width: "250px"
    },
    editGame: {
        background: 'linear-gradient(45deg, #f9aba4 30%, #e99ba6 90%)',
        width: "250px"
    },
    titleContainer: {
        marginTop: '50px',
        height: '75px',
        //border: '1px solid #000',
    },
    descriptionContainer: {
        //marginTop:'0px',
        height: '75px',
        //border: '1px solid #000',
    },
    subBannerContainer: {
        marginTop: '25px',
        height: '75px',
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

}));

export default function Platform() {
    const classes = useStyles();
    const history = useHistory();
    const { id } = useParams();
    const [platformData, setPlatformData] = useState(null);
    const [imageURL, setimageURL] = useState(null)
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
    const [isPublic, setIsPublic] = useState(false);
    const [newGameTitle, setNewGameTitle] = useState('');
    const [newGameDescription, setNewGameDescription] = useState('');
    const [newGameTitleError, setNewGameTitleError] = useState(false);
    const [newGameDescriptionError, setNewGameDescriptionError] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        setToken(localStorage.getItem('token'));
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
        getPlatform();
    }, []);

    const getPlatform = () => {
        axios.get("/platforms/" + id).then(data => {
            setPlatformData(data);
        });
    }

    useEffect(() => {
        if (userData != null) {
            userData.data.completedGames.map((id) =>
                setCompletedGameIds([...completedGameIds, id.toString()])
            )
        }

    }, [userData]);

    useEffect(() => {
        if (platformData != null) {
            setTitle(platformData.data.title);
            setDescription(platformData.data.description);
            setTags(platformData.data.tags.join(" "));
            setIsPublic(platformData.data.isPublic);
        }

    }, [platformData]);

    useEffect(() => {
        if (enableEditMode === false) {
            getPlatform();
        }

    }, [enableEditMode]);

    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
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
            axios.put('http://localhost:5000/games/push', data, config)
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

    const setPhoto = (id, fullURL) => {
        console.log(id, fullURL)
        setbannerURL(fullURL)
        handleClose()
    }

    function adjustBanner(props) {
        console.log('adjustBanner')
    }
    function removeBanner(props) {
        setbannerURL('')
        handleClose()
    }
    const handleSaveChanges = () => {
        axios.patch('/platforms/update/' + platformData.data._id, { title: title, description: description, tags: tags.split(" "), isPublic: isPublic })
            .then(res => {
                console.log(res)
                if (res.status === 200) {
                    enqueueSnackbar('Success!!', { variant: 'success' });
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
                marginTop: '25px',
                marginBottom: '25px',
                marginLeft: '25px',
                marginRight: '25px',
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
                            <CheckCircleOutlineOutlinedIcon style={{ color: 'green' }} />
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
                marginTop: '25px',
                marginBottom: '25px',
                marginLeft: '25px',
                marginRight: '25px',
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
                    <GridListTile key={photo.id} cols={1} onClick={() => setPhoto(photo.id, photo.urls.full)}>
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
                        {bannerURL ? <img className={classes.coverTest} src={bannerURL} alt="Banner image" /> : null}
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
                            <Button variant="contained" onClick={removeBanner} >
                                Remove Banner
                            </Button>
                        </div>
                    }
                    <Container className={classes.subcontainer}>
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
                                    inputProps={{ style: { fontSize: 18, fontWeight: 'Bold', verticalAlign: "middle" } }}
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
                                    inputProps={{ style: { fontSize: 16, verticalAlign: "middle" } }}
                                />
                            }

                        </Container>
                        <Container className={classes.subBannerContainer}>
                            <Grid
                                container
                                direction="row"
                                justify="space-between"
                                alignItems="center"
                                container
                            >
                                <Grid item>
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
                                            inputProps={{ style: { fontSize: 16, verticalAlign: "middle" } }}
                                        />
                                    }
                                </Grid>
                                <Grid item>
                                    <Container>
                                        <Grid
                                            container
                                            direction="row"
                                            justify="space-evenly"
                                            alignItems="center"
                                            container
                                        >
                                            <Typography>
                                                Upvotes: {platformData.data.upvotes} Downvotes: {platformData.data.downvotes}
                                            </Typography>
                                            {userData.data._id.toString() === platformData.data.ownerId.toString() && enableEditMode === false
                                                &&
                                                <Button variant="contained" color="primary" onClick={() => setEnableEditMode(true)} startIcon={<EditOutlinedIcon />} style={{ textTransform: 'none' }}>Enable Edit Mode</Button>
                                            }

                                            {userData.data._id.toString() === platformData.data.ownerId.toString() && enableEditMode === true
                                                &&
                                                <Button variant="contained" color="secondary" onClick={handleSaveChanges} startIcon={<SaveOutlinedIcon />} style={{ textTransform: 'none' }}>
                                                    Save Changes
                                                </Button>
                                            }

                                            {userData.data._id.toString() === platformData.data.ownerId.toString() && enableEditMode === true
                                                &&
                                                <FormControlLabel
                                                    control={<Switch checked={isPublic} onChange={e => (setIsPublic(e.target.checked))} name="setPublic" />}
                                                    label="Set Public"
                                                />
                                            }

                                            {userData.data._id.toString() === platformData.data.ownerId.toString() && enableEditMode === true
                                                &&
                                                <Button variant="contained" color="secondary" onClick={() => setEnableEditMode(false)} startIcon={<ExitToAppIcon />} style={{ textTransform: 'none' }}>Exit Edit Mode</Button>
                                            }
                                        </Grid>
                                    </Container>


                                </Grid>
                            </Grid>
                        </Container>
                    </Container>


                    <Container className={classes.container}>
                        <div style={{ marginTop: '15px' }}>
                            <Button variant="contained" onClick={handleClickOpen}>Add a game</Button>
                            <Dialog open={openDialog} onClose={handleCloseDialog} aria-labelledby="form-dialog-title">
                                <DialogTitle id="form-dialog-title">New Game</DialogTitle>
                                <DialogContent>
                                    <TextField
                                        onChange={(e) => setNewGameTitle(e.target.value)}
                                        autoFocus
                                        margin="dense"
                                        id="title"
                                        label="Game Title"
                                        type="title"
                                        fullWidth
                                        error={newGameTitleError}
                                    />
                                    <TextField
                                        onChange={(e) => setNewGameDescription(e.target.value)}
                                        autoFocus
                                        margin="dense"
                                        id="description"
                                        label="Game Description"
                                        type="description"
                                        fullWidth
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