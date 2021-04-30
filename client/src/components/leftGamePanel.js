import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';

import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';

import ListItemText from '@material-ui/core/ListItemText';
import Container from '@material-ui/core/Container';
import Chip from '@material-ui/core/Chip';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useHistory } from "react-router-dom";
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';

import PropTypes from 'prop-types'

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
  drawerSection:{
    display:'flex',
    flexDirection:'column',
    alignItems:'flex-start'
  },
  title:{

  },
  subtitle:{
    color:'#212197', 
    fontWeight: 'Bold'
  },
  chipContainer:{
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  footer:{
    position: "absolute",
    bottom: 0,
    textAlign: "center",
    paddingBottom:'30px'
  },
  subfooter:{
    display:'flex',
    paddingTop:'30px',
    justifyContent:'center'
  }
}));


export default function LeftGamePanel(props) {

  LeftGamePanel.propTypes = {
    description: PropTypes.string,
    tags: PropTypes.array,
    title: PropTypes.string,
  }

  const classes = useStyles();
  const history = useHistory();
  const gameData = props.value;

  const handleQuit = (e) => {
    e.preventDefault()
    history.push("/platform/:id")
  };
  const handleRegister =(e) => {
    e.preventDefault()
    history.push("/register")
  }

  function Populate(props){
    const tags = props.tags;
    const listTags = tags.map((tag) =>
        <Chip size="small" label={tag} />
    );
    return(
        <div className={classes.chipContainer}>
            {listTags}
        </div>
    )
  }

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
          <ListItem className={classes.drawerSection}>
            <ListItemText className={classes.subtitle} primary="Game Information"/>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem className={classes.drawerSection}>
            <ListItemText primary="Game Name:" className={classes.subtitle}/>
            <ListItemText primary={gameData.title}/>
          </ListItem>
          <ListItem className={classes.drawerSection}>
            <ListItemText primary="Game Description:" className={classes.subtitle}/>
            <ListItemText primary={gameData.description}/>
          </ListItem>
          <ListItem className={classes.drawerSection}>
            <ListItemText primary="Tags:" className={classes.subtitle}/>
            {/* <Populate tags={game.tags}/> */}
            <Populate tags={gameData.tags}/>
          </ListItem>
        </List>
        <Divider />
        <Container className={classes.subfooter}>
          {/* 
            <ExitToAppIcon/>
            <Link href="#" onClick={handleQuit} variant="body2">
                <Typography>
                    Quit Game
                </Typography>
            </Link>
          */}
          <Button onClick={handleQuit} startIcon={<ExitToAppIcon />} style={{textTransform: 'none'}}>
                  Quit Game
          </Button>
            
        </Container>
        <Container className={classes.footer}>
            <Typography>
                Report Game
            </Typography>
        </Container>
      </div>
    </Drawer>
    
  );
}
