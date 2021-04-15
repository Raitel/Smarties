import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import SportsEsportsOutlinedIcon from '@material-ui/icons/SportsEsportsOutlined';
import StyleOutlinedIcon from '@material-ui/icons/StyleOutlined';
import StorefrontOutlinedIcon from '@material-ui/icons/StorefrontOutlined';

import { useHistory } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  itemText:{
      //fontWeight: "bold"
  }
}));


export default function PermanentDrawerLeft() {
  const classes = useStyles();
  const history = useHistory();
  const handleHome = () => {
    history.push("/")
  };
  const handleMyGames = () => {
    history.push("/myGames")
  };
  const handleFavorites = () => {
    history.push("/favorites")
  };
  const handleInventory = () => {
    history.push("/inventory")
  };
  const handleShop = () => {
    history.push("/shop")
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <Divider />

        <List>
        <ListItem button onClick={handleHome}>
          <ListItemIcon>
            <HomeOutlinedIcon/>
          </ListItemIcon>
          <ListItemText primary="Home" classes={{ primary: classes.itemText}} />
        </ListItem>
        </List>

        <Divider />
        
        <List>
        <ListItem button onClick={handleFavorites}>
          <ListItemIcon>
            <FavoriteBorderOutlinedIcon/>
          </ListItemIcon>
          <ListItemText primary="Favorites" classes={{ primary: classes.itemText}}/>
        </ListItem>
        <ListItem button onClick={handleMyGames}>
          <ListItemIcon>
            <SportsEsportsOutlinedIcon/>
          </ListItemIcon>
          <ListItemText primary="My Games" classes={{ primary: classes.itemText}} />
        </ListItem>
        </List>

        <Divider />

        <List>
        <ListItem button onClick={handleShop}>
          <ListItemIcon>
            <StorefrontOutlinedIcon/>
          </ListItemIcon>
          <ListItemText primary="Shop" classes={{ primary: classes.itemText}} />
        </ListItem>
        <ListItem button onClick={handleInventory}>
          <ListItemIcon>
            <StyleOutlinedIcon/>
          </ListItemIcon>
          <ListItemText primary="Inventory" classes={{ primary: classes.itemText}} />
        </ListItem>
        </List>

        <Divider />
        
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        
      </main>
    </div>
  );
}
