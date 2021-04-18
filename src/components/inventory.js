import React, { useState }  from 'react';
import LeftPanel from "./leftNavigationPanel";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";
import Grid from "@material-ui/core/Grid";
import { CardMedia, StylesProvider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345
    },
    subtitle:{
        color:'#212197', 
        fontSize:'24px',
        marginBottom:'40px',
        fontWeight: 'Bold'
    },
    card:{
        width: "250px",
        height: "200px"
    },
    section:{
        width:'1300px'
    },
    subcontainer:{
        border: '1px solid grey',
        borderRadius:'10px'
    },
    media: {
        width: "200px",
        height: "130px"
      }
  }));

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };


export default function Inventory(){
  const [value, setValue] = React.useState(2);
  const handleChange = (event, newValue) => {
      setValue(newValue);
  };
  const classes = useStyles();
  const history = useHistory();
  const [questionCards, setQuestionCards] = useState([
      {
          "type": "question",
          "price": 1,
          "path": "https://z3.ax1x.com/2021/04/18/c5qgb9.png",
          "createdAt": "2021-04-08T23:21:10.994Z",
          "updatedAt": "2021-04-08T23:21:10.994Z",
          "__v": 0
      },
      {
          "type": "question",
          "price": 2,
          "path": "../assets/game_assets/questioncard600.png",
          "createdAt": "2021-04-08T23:21:10.994Z",
          "updatedAt": "2021-04-08T23:21:10.994Z",
          "__v": 0
      },
      {
          "type": "question",
          "price": 3,
          "path": "../assets/game_assets/questioncard600.png",
          "createdAt": "2021-04-08T23:21:10.994Z",
          "updatedAt": "2021-04-08T23:21:10.994Z",
          "__v": 0
      },
      {
          "type": "question",
          "price": 4,
          "path": "../assets/game_assets/questioncard600.png",
          "createdAt": "2021-04-08T23:21:10.994Z",
          "updatedAt": "2021-04-08T23:21:10.994Z",
          "__v": 0
      },
      {
          "type": "question",
          "price": 5,
          "path": "../assets/game_assets/questioncard600.png",
          "createdAt": "2021-04-08T23:21:10.994Z",
          "updatedAt": "2021-04-08T23:21:10.994Z",
          "__v": 0
      },
      {
          "type": "question",
          "price": 6,
          "path": "../assets/game_assets/questioncard600.png",
          "createdAt": "2021-04-08T23:21:10.994Z",
          "updatedAt": "2021-04-08T23:21:10.994Z",
          "__v": 0
      },
  ])
  const [tipCards, setTipCards] = useState([
      {
          "type": "tip",
          "price": 4444,
          "path": "https://z3.ax1x.com/2021/04/18/c5q58K.png",
          "createdAt": "2021-04-08T23:21:10.994Z",
          "updatedAt": "2021-04-08T23:21:10.994Z",
          "__v": 0
      },
      {
          "type": "question",
          "price": 2,
          "path": "../assets/game_assets/questioncard600.png",
          "createdAt": "2021-04-08T23:21:10.994Z",
          "updatedAt": "2021-04-08T23:21:10.994Z",
          "__v": 0
      },
      {
          "type": "question",
          "price": 3,
          "path": "../assets/game_assets/questioncard600.png",
          "createdAt": "2021-04-08T23:21:10.994Z",
          "updatedAt": "2021-04-08T23:21:10.994Z",
          "__v": 0
      },
      {
          "type": "question",
          "price": 4,
          "path": "../assets/game_assets/questioncard600.png",
          "createdAt": "2021-04-08T23:21:10.994Z",
          "updatedAt": "2021-04-08T23:21:10.994Z",
          "__v": 0
      },
      {
          "type": "question",
          "price": 5,
          "path": "../assets/game_assets/questioncard600.png",
          "createdAt": "2021-04-08T23:21:10.994Z",
          "updatedAt": "2021-04-08T23:21:10.994Z",
          "__v": 0
      },
      {
          "type": "question",
          "price": 6,
          "path": "../assets/game_assets/questioncard600.png",
          "createdAt": "2021-04-08T23:21:10.994Z",
          "updatedAt": "2021-04-08T23:21:10.994Z",
          "__v": 0
      },
  ])
  const [answerCards, setAnswerCards] = useState([
      {
          "type": "answer",
          "price": 3333,
          "path": "https://z3.ax1x.com/2021/04/18/c5q4C6.png",
          "createdAt": "2021-04-08T23:21:10.994Z",
          "updatedAt": "2021-04-08T23:21:10.994Z",
          "__v": 0
      },
      {
          "type": "question",
          "price": 2,
          "path": "../assets/game_assets/questioncard600.png",
          "createdAt": "2021-04-08T23:21:10.994Z",
          "updatedAt": "2021-04-08T23:21:10.994Z",
          "__v": 0
      },
      {
          "type": "question",
          "price": 3,
          "path": "../assets/game_assets/questioncard600.png",
          "createdAt": "2021-04-08T23:21:10.994Z",
          "updatedAt": "2021-04-08T23:21:10.994Z",
          "__v": 0
      },
      {
          "type": "question",
          "price": 4,
          "path": "../assets/game_assets/questioncard600.png",
          "createdAt": "2021-04-08T23:21:10.994Z",
          "updatedAt": "2021-04-08T23:21:10.994Z",
          "__v": 0
      },
      {
          "type": "question",
          "price": 5,
          "path": "../assets/game_assets/questioncard600.png",
          "createdAt": "2021-04-08T23:21:10.994Z",
          "updatedAt": "2021-04-08T23:21:10.994Z",
          "__v": 0
      },
      {
          "type": "question",
          "price": 6,
          "path": "../assets/game_assets/questioncard600.png",
          "createdAt": "2021-04-08T23:21:10.994Z",
          "updatedAt": "2021-04-08T23:21:10.994Z",
          "__v": 0
      },
  ])
  function DisplayCard(props){
      const card = props.card;
      return (
          <Box p={1}>
          <Card className={classes.card}>
          <CardActionArea>
          <CardContent>
              {//<CardMedia image={card.path} title='card' className={classes.media}/>
              }
              <Container className={classes.media}>
                  <img src={card.path} style={{maxWidth: "250px", maxHeight: "100px"}}alt="card" />
              </Container>
          </CardContent>
          <CardActions disableSpacing>
              <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              align="right"
              >
              {"Price: "+card.price}
              </Typography>
          </CardActions>
          </CardActionArea>
          </Card>
          </Box>
      )
  }

  function Populate(props){
      const cards = props.cards;
      const listCards = cards.map((card) => 
        <DisplayCard card={card} key={card._id} item/>
      );
      return (
        //replace this with a singular card
        <Grid
          container
          direction="row"
          justify="flex-start"
          spacing={5}
        >
          {listCards}
        </Grid>
      );
  }
  return(
    <div style={{display:'flex', marginTop:"64px"}}>
        <LeftPanel/>
        <div>
            <Container style={{paddingLeft:'64px', marginTop:"64px"}}maxWidth="xl">
              <Container className={classes.section}>
                  <Typography fontWeight="fontWeightBold" className={classes.subtitle}>Inventory:</Typography>
                  <Container className={classes.subcontainer}>
                      <Tabs
                      value={value}
                      indicatorColor="primary"
                      textColor="primary"
                      onChange={handleChange}
                      variant="fullWidth"
                      aria-label="disabled tabs example"
                      >
                        <Tab label="Question Cards" style={{textTransform: 'none'}}/>
                        <Tab label="Tip Cards" style={{textTransform: 'none'}}/>
                        <Tab label="Answer Cards" style={{textTransform: 'none'}}/>
                      </Tabs>
                      <TabPanel value={value} index={0}>
                        <Populate cards={questionCards} />
                      </TabPanel>
                      <TabPanel value={value} index={1}>
                        <Populate cards={tipCards} />
                      </TabPanel>
                      <TabPanel value={value} index={2}>
                        <Populate cards={answerCards} />
                      </TabPanel>
                  </Container>
              </Container>
          </Container>
        </div>
    </div> 
  )
  
}