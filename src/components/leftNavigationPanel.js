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

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
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
        <ListItem button>
          <ListItemIcon>
            <HomeOutlinedIcon/>
          </ListItemIcon>
          <ListItemText primary="Home" classes={{ primary: classes.itemText}} />
        </ListItem>
        </List>

        <Divider />
        
        <List>
        <ListItem button>
          <ListItemIcon>
            <FavoriteBorderOutlinedIcon/>
          </ListItemIcon>
          <ListItemText primary="Favorite" classes={{ primary: classes.itemText}}/>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <SportsEsportsOutlinedIcon/>
          </ListItemIcon>
          <ListItemText primary="My Games" classes={{ primary: classes.itemText}} />
        </ListItem>
        </List>

        <Divider />

        <List>
        <ListItem button>
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
