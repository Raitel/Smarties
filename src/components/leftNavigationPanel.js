import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Container from '@material-ui/core/Container';

import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import SportsEsportsOutlinedIcon from '@material-ui/icons/SportsEsportsOutlined';
import StyleOutlinedIcon from '@material-ui/icons/StyleOutlined';
import StorefrontOutlinedIcon from '@material-ui/icons/StorefrontOutlined';

import { useHistory } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));


export default function ClippedDrawer() {
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
    <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
    >
      <Toolbar />
      <div className={classes.drawerContainer}>
        <List>
          <ListItem button onClick={handleHome}>
            <ListItemIcon>
              <HomeOutlinedIcon/>
            </ListItemIcon>
            <ListItemText primary="Home"/>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button onClick={handleFavorites}>
            <ListItemIcon>
              <FavoriteBorderOutlinedIcon/>
            </ListItemIcon>
            <ListItemText primary="Favorites"/>
          </ListItem>
          <ListItem button onClick={handleMyGames}>
            <ListItemIcon>
              <SportsEsportsOutlinedIcon/>
            </ListItemIcon>
            <ListItemText primary="My Games"/>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button onClick={handleShop}>
            <ListItemIcon>
              <StorefrontOutlinedIcon/>
            </ListItemIcon>
            <ListItemText primary="Shop"/>
          </ListItem>
          <ListItem button onClick={handleInventory}>
            <ListItemIcon>
              <StyleOutlinedIcon/>
            </ListItemIcon>
            <ListItemText primary="Inventory"/>
          </ListItem>
        </List>
      </div>
    </Drawer>
    
  );
}
