import React from 'react';
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
import { Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
    zIndex: theme.zIndex = theme.zIndex.drawer + 1,
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
    padding:2
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function PrimarySearchAppBar() {
  const history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMyProfile = () => {
    history.push("/profile")
    setAnchorEl(null);
  };
  
  const handleAccountSetting = () => {
    history.push("/settings")
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    setAnchorEl(null);
  };

  const handleHome = () => {
    history.push("/")
  };
  const handleExplore = () => {
    history.push("/explore")
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
    >
      <MenuItem onClick={handleMyProfile} >My Profile</MenuItem>
      <MenuItem onClick={handleAccountSetting} >Settings</MenuItem>
      <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
    </MenuList>
  );

  return (
    <div className={classes.grow}>
      <AppBar  className={classes.appBar} style={{backgroundColor:'#212197', maxHeight: 64, position: "fixed"}}> 
        <Toolbar variant="dense">
          <Button disableRipple disableFocusRipple style={{textTransform: 'none', color: 'white', fontSize: 24}} className={classes.margin} onClick={handleHome}>
          <img src={logo} alt="logo"></img>
            Smarties
          </Button>
          <Button style={{textTransform: 'none', color: 'white', fontSize: 16}} onClick={handleHome}>
            Home
          </Button>
          <Button style={{textTransform: 'none', color: 'white', fontSize: 16}}>
            Create a Platform
          </Button>
          <Button style={{textTransform: 'none', color: 'white', fontSize: 16}} onClick={handleExplore}>
            Explore Platforms
          </Button>
          <Box>
          <div className={classes.search} >
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
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
              <AccountCircle/>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
}