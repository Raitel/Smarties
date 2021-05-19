import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Container } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import GroupIcon from '@material-ui/icons/Group';
import SettingsIcon from '@material-ui/icons/Settings';
import MessageIcon from '@material-ui/icons/Message';
import SearchIcon from '@material-ui/icons/Search';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    header: {
        width: '100%',
        height: '1080px',
        backgroundImage: `url(https://images.unsplash.com/photo-1580063665762-762002ea39d7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)`,
    },
    layer: {
        backgroundColor: 'rgba(248, 247, 216, 0.7)',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        textAlign: 'center',
    },
    features: {
        marginTop: '50px',
        height: '400px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    about: {
        marginTop: '50px',
        height: '450px',
    },
    category: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    title: {
        color: '#212197'
    },
    subtitle: {
        color: '#212197'
    },
    paper: {
        width: '600px',
        height: '400px',
        backgroundImage: `url(https://images.unsplash.com/photo-1600195077909-46e573870d99?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)`,
        objectFit: 'cover'
    }
}));

export default function ButtonAppBar() {
    const classes = useStyles();
    const history = useHistory();

    const handleLogin = () => {
        history.push("/login/");
    }

    const handleRegister = () => {
        history.push("/register/");
    }

    function Copyright() {
        return (
            <Typography variant="body2" color="textSecondary" align="center">
                {'Copyright © '}
                <Link color="inherit">
                    Smarties
            </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        );
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Button color="inherit" onClick={() => handleLogin()}>Login</Button>
                    <Button color="inherit" onClick={() => handleRegister()}>Register</Button>
                </Toolbar>
            </AppBar>
            <div className={classes.header}>
                <div className={classes.layer}>
                    <Typography variant="h1" className={classes.title}>We are Smarties</Typography>
                    <Typography variant="h6" className={classes.subtitle}>We make learning unstoppable. Learn anything from anyone at anytime</Typography>
                </div>
            </div>
            <Container className={classes.features}>
                <Typography variant="h3">Features</Typography>
                <Grid container spacing={3} style={{ marginTop: '50px' }}>
                    <Grid item xs={3} className={classes.category}>
                        <MessageIcon style={{ fontSize: 50 }} color="primary" />
                        <br />
                        <Typography variant="h5">Inclusive</Typography>
                        <br />
                        <Typography>We give everyone a voice. Upvote your favorite games or downvote games you dislike. Everyone has a say</Typography>
                    </Grid>
                    <Grid item xs={3} className={classes.category}>
                        <SearchIcon style={{ fontSize: 50 }} color="primary" />
                        <br />
                        <Typography variant="h5">Rich</Typography>
                        <br />
                        <Typography>With the ability to tag games, search for games, and exploring random games, the opportunities are endless!</Typography>
                    </Grid>
                    <Grid item xs={3} className={classes.category}>
                        <GroupIcon style={{ fontSize: 50 }} color="primary" />
                        <br />
                        <Typography variant="h5">Collaborative</Typography>
                        <br />
                        <Typography>Compete in friendly games with your friends, or challenge them to complete your platforms!</Typography>
                    </Grid>
                    <Grid item xs={3} className={classes.category}>
                        <SettingsIcon style={{ fontSize: 50 }} color="primary" />
                        <br />
                        <Typography variant="h5">Customizable</Typography>
                        <br />
                        <Typography>Make your platforms yours by adding rich and colorful banner images, setting custom cards, and your own theme</Typography>
                    </Grid>
                </Grid>
            </Container>
            <Container className={classes.about}>
                <Grid container spacing={10}>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>
                            <img style={{ width: '100%', objectFit: 'cover' }} src={"https://images.unsplash.com/photo-1600195077909-46e573870d99?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"} alt="About Us image" />
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h4">About us</Typography>
                        <br />
                        <Typography variant="body">
                            Here at Smarties, we are passionate about learning. So much so, we created Smarties for the sole purpose of sharing knowledge
                            in a fun, playful and rewarding way. We hope you enjoy using Smarties as much as we did creating it and we can't wait to see your awesome games and platforms!
                            </Typography>
                    </Grid>
                </Grid>

            </Container>
            <Box mt={8}>
                <Copyright />
            </Box>
        </div>
    );
}