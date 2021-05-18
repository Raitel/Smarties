import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';

import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';

import ListItemText from '@material-ui/core/ListItemText';
import Container from '@material-ui/core/Container';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useHistory } from "react-router-dom";
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import Grid from '@material-ui/core/Grid';

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
    //display:'center',
    paddingTop:'30px',
    justifyContent:'center'
  },
  titleTextField:{
  },
  descriptionTextField:{
  },
  tagsTextField:{
  },
  button:{
    height: '30px',
    width: '200px'
  },
}));


export default function LeftEditPanel(props) {

  const classes = useStyles();
  const history = useHistory();
  const gameData = props.value;
  const platformId = props.platformId;
  const [title, setTitle] = useState(gameData.title);
  const [description, setDescription] = useState(gameData.description);
  const [tags, setTags] = useState(gameData.tags.join(" "));
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleQuit = (e) => {
    e.preventDefault()
    history.push("/platform/"+platformId);
  };

  const handleSaveChanges = () => {
    axios.patch('/games/update/' + gameData._id, {title: title, description: description, tags: tags.split(" ")})
    .then(res => {
      console.log(res)
      if (res.status === 200){
        enqueueSnackbar('Success!!', {variant:'success'});
      }else if (res.status === 400){
        enqueueSnackbar('400 error', {variant:'warning'});
      }else{
        enqueueSnackbar('Hm, something is not right', {variant:'error'});
      }
    })
    .catch(() => {
      enqueueSnackbar('Hm, something is not right', {variant:'error'});
    })
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
          <ListItem className={classes.drawerSection}>
            <ListItemText className={classes.subtitle} primary="Game Information"/>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem className={classes.drawerSection}>
            <ListItemText primary="Game Name:" className={classes.subtitle}/>
            <TextField
            onChange={(e) => setTitle(e.target.value)}
            variant="outlined"
            required
            placeholder="Title"
            value={title}
            className={classes.titleTextField}
            multiline
            rows={2}
            rowsMax={2}
            inputProps={{style: { fontSize: 16, verticalAlign: "middle"}}}
            />
          </ListItem>
          <ListItem className={classes.drawerSection}>
            <ListItemText primary="Game Description:" className={classes.subtitle}/>
            <TextField
            onChange={(e) => setDescription(e.target.value)}
            variant="outlined"
            placeholder="Description"
            value={description}
            className={classes.descriptionTextField}
            multiline
            rows={5}
            rowsMax={5}
            inputProps={{style: { fontSize: 16, verticalAlign: "middle"}}}
            />
          </ListItem>
          <ListItem className={classes.drawerSection}>
            <ListItemText primary="Tags:" className={classes.subtitle}/>
            <Typography style={{fontSize: 12, fontStyle:"italic", textAlign: "center",  verticalAlign: "middle", color: '#666666'}}>*Please separate tags by a space*</Typography>
            <TextField
            onChange={(e) => setTags(e.target.value)}
            variant="outlined"
            placeholder="Tags"
            value={tags}
            className={classes.tagsTextField}
            multiline
            rows={3}
            rowsMax={3}
            inputProps={{style: { fontSize: 16, verticalAlign: "middle"}}}
            />
          </ListItem>
        </List>
        <Divider />
        <Container className={classes.subfooter}>
          <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          >
          <Button className={classes.button} onClick={handleSaveChanges} startIcon={<SaveOutlinedIcon />} style={{textTransform: 'none'}}>
            Save Changes
          </Button>

          <Button className={classes.button} onClick={handleQuit} startIcon={<ExitToAppIcon />} style={{textTransform: 'none'}}>
            Quit Editing
          </Button>
          </Grid>
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
