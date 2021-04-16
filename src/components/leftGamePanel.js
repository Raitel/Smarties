import React, { useState } from 'react';
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
import Chip from '@material-ui/core/Chip';
import Link from '@material-ui/core/Link';
import Icon from '@material-ui/core/Icon';

import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import SportsEsportsOutlinedIcon from '@material-ui/icons/SportsEsportsOutlined';
import StyleOutlinedIcon from '@material-ui/icons/StyleOutlined';
import StorefrontOutlinedIcon from '@material-ui/icons/StorefrontOutlined';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useHistory } from "react-router-dom";
import { Typography } from '@material-ui/core';

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


export default function LeftGamePanel() {
  const classes = useStyles();
  const history = useHistory();
  const [game, setGame] = useState(
      {
        "description": "",
        "tags": ['best', 'game', 'class', 'school', 'study', 'college'],
        "stages": [],
        "questionCard": "606e7b59bee1d0599ca713b7",
        "tipCard": "606e7b59bee1d0599ca713b7",
        "answerCard": "606e7b59bee1d0599ca713b7",
        "_id": "60708e459ca18d2708a34203",
        "title": "first game update",
        "nestedStages": [
            {
                "question": "",
                "answer": "",
                "tip1": "",
                "tip2": "",
                "choice1": "",
                "choice2": "",
                "choice3": "",
                "choice4": "",
                "choice5": "",
                "letters": [],
                "_id": "6070a325ad0c350524e78ea9",
                "type": "CN"
            },
            {
                "question": "",
                "answer": "",
                "tip1": "",
                "tip2": "",
                "choice1": "",
                "choice2": "",
                "choice3": "",
                "choice4": "",
                "choice5": "",
                "letters": [],
                "_id": "6070aa21c2617208fc247dbe",
                "type": "TX"
            }
        ],
        "createdAt": "2021-04-09T17:26:29.533Z",
        "updatedAt": "2021-04-09T19:25:21.806Z",
        "__v": 4
      }
  )
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
            <ListItemText primary="Game Name" className={classes.subtitle}/>
            <ListItemText primary="Best Game Ever 5000"/>
          </ListItem>
          <ListItem className={classes.drawerSection}>
            <ListItemText primary="Game Description" className={classes.subtitle}/>
            <ListItemText primary="This is the best game ever created for the purpose of being great"/>
          </ListItem>
          <ListItem className={classes.drawerSection}>
            <ListItemText primary="Tags:" className={classes.subtitle}/>
            <Populate tags={game.tags}/>
          </ListItem>
        </List>
        <Divider />
        <Container className={classes.subfooter}>
            <ExitToAppIcon/>
            <Link href="#" onClick={handleQuit} variant="body2">
                <Typography>
                    Quit Game
                </Typography>
            </Link>
            
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
