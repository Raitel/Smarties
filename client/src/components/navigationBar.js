import React, { useState, useEffect } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import logo from '../assets/logo.png';
import { useHistory } from "react-router-dom";
import { Box, Container } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Typography from "@material-ui/core/Typography";
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
    zIndex: 10000,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  subtitle: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    marginLeft: '60px',
    marginRight: '60px'
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  iconButton: {
    padding: 2
  },
  margin: {
    margin: theme.spacing(1),
  },
  subcontainer: {
    width: "600px",
  },
}));

export default function PrimarySearchAppBar(props) {
  const history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [token, setToken] = useState('');
  const isMenuOpen = Boolean(anchorEl);
  const [open, setOpen] = React.useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  })
  useEffect(() => {
    if (token != '') {
      const options = {
        headers: { 'X-Auth-Token': token }
      };
      axios.get('/users/auth/user', options).then(res => {
        setUserData(res.data);
      });
    }
  }, [token]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMyProfile = () => {
    console.log(userData)
    history.push("/profile/" + userData.username)
    setAnchorEl(null);
  };

  const handleAccountSetting = () => {
    history.push("/settings")
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    setAnchorEl(null);
    props.setIsAuth(false)
    localStorage.removeItem('token')
  };

  const handleHome = () => {
    history.push("/home")
  };
  const handleExplore = () => {
    history.push("/explore")
  };
  const handleSearch = (e) => {
    console.log((e.target.value));
    if (e.key === 'Enter' || e.keyCode === 13) {
      const url = (e.target.value).split(' ').join('&');
      history.push("/search/" + url);
    }

  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <MenuList
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      style={{ zIndex: 10001 }}
    >
      <MenuItem onClick={handleMyProfile} >My Profile</MenuItem>
      <MenuItem onClick={handleAccountSetting} >Settings</MenuItem>
      <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
    </MenuList>
  );

  return (
    <div className={classes.grow}>
      <AppBar className={classes.appBar} style={{ backgroundColor: '#212197', maxHeight: 64, position: "fixed" }}>
        <Toolbar variant="dense">
          <Button disableRipple disableFocusRipple style={{ textTransform: 'none', color: 'white', fontSize: 24 }} className={classes.margin} onClick={handleHome}>
            <img src={logo} alt="logo"></img>
            Smarties
          </Button>
          <Button style={{ textTransform: 'none', color: 'white', fontSize: 16 }} onClick={handleHome}>
            Home
          </Button>
          <Button style={{ textTransform: 'none', color: 'white', fontSize: 16 }} onClick={handleClickOpen}>
            Create a Platform
          </Button>
          <Button style={{ textTransform: 'none', color: 'white', fontSize: 16 }} onClick={handleExplore}>
            Explore Platforms
          </Button>
          <Box>
            <div className={classes.search} >
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                onKeyPress={(e) => handleSearch(e)}
                placeholder="Search Platforms…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
          </Box>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>

            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="600px">
        <DialogTitle>
          <Typography variant="h5" gutterBottom style={{ color: '#212197', fontWeight: 'Bold' }}>Create a New Platform:</Typography>
        </DialogTitle>
        <DialogContent>

          <Container className={classes.subcontainer}>
            <Typography variant="h6" style={{ color: '#212197', fontWeight: 'Bold' }}>Title:</Typography>
            <TextField
              autoFocus
              margin="dense"
              id="platform title"
              label="Title"
              type="title"
              variant="outlined"
              fullWidth
            />
          </Container>
          <Container className={classes.subcontainer}>
            <Typography variant="h6" style={{ color: '#212197', fontWeight: 'Bold' }}>Description:</Typography>
            <TextField
              autoFocus
              margin="dense"
              id="platform description"
              label="Description"
              type="description"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
            />
          </Container>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}