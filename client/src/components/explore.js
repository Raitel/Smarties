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
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import CardHeader from "@material-ui/core/CardHeader";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Button from '@material-ui/core/Button';
import CachedOutlinedIcon from '@material-ui/icons/CachedOutlined';

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
    },
    section:{
        width:'1300px'
    },
    subcontainer:{
        border: '1px solid grey',
        borderRadius:'10px'
    },
  }));
const handleRefresh = (e) => {
};
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


export default function Shop(){
    const [value, setValue] = React.useState(2);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const classes = useStyles();
    const history = useHistory();
    const [recent, setRecent] = useState([
        {
            "description": "dumb platform",
            "isPublic": true,
            "upvotes": 0,
            "downvotes": 0,
            "tags": [],
            "games": [
                "606542da7084a516a96bc8f1",
                "606542da7084a516a96bc8f2"
            ],
            "_id": "606ea28cf3b2dc0d08e40adc",
            "ownerid": "606542da7084a516a96bc8f1",
            "title": "dummyTest",
            "createdAt": "2021-04-08T06:28:28.237Z",
            "updatedAt": "2021-04-09T21:42:49.920Z",
            "__v": 2
        },
        {
            "description": "Best platform",
            "isPublic": true,
            "upvotes": 0,
            "downvotes": 0,
            "tags": [],
            "games": [],
            "_id": "606f8d1d7195479521336568",
            "ownerid": "606f8bc2ea8d56647dfaaeff",
            "title": "Louis' Second Platform",
            "createdAt": "2021-04-08T23:09:17.243Z",
            "updatedAt": "2021-04-08T23:09:17.243Z",
            "__v": 0
        },{
            "description": "dumb platform",
            "isPublic": true,
            "upvotes": 0,
            "downvotes": 0,
            "tags": [],
            "games": [
                "606542da7084a516a96bc8f1",
                "606542da7084a516a96bc8f2"
            ],
            "_id": "606ea28cf3b2dc0d08e40adc",
            "ownerid": "606542da7084a516a96bc8f1",
            "title": "dummyTest",
            "createdAt": "2021-04-08T06:28:28.237Z",
            "updatedAt": "2021-04-09T21:42:49.920Z",
            "__v": 2
        },
        {
            "description": "Best platform",
            "isPublic": true,
            "upvotes": 0,
            "downvotes": 0,
            "tags": [],
            "games": [],
            "_id": "606f8d1d7195479521336568",
            "ownerid": "606f8bc2ea8d56647dfaaeff",
            "title": "Louis' Second Platform",
            "createdAt": "2021-04-08T23:09:17.243Z",
            "updatedAt": "2021-04-08T23:09:17.243Z",
            "__v": 0
        },
        {
            "description": "dumb platform",
            "isPublic": true,
            "upvotes": 0,
            "downvotes": 0,
            "tags": [],
            "games": [
                "606542da7084a516a96bc8f1",
                "606542da7084a516a96bc8f2"
            ],
            "_id": "606ea28cf3b2dc0d08e40adc",
            "ownerid": "606542da7084a516a96bc8f1",
            "title": "dummyTest",
            "createdAt": "2021-04-08T06:28:28.237Z",
            "updatedAt": "2021-04-09T21:42:49.920Z",
            "__v": 2
        },
        {
            "description": "Best platform",
            "isPublic": true,
            "upvotes": 0,
            "downvotes": 0,
            "tags": [],
            "games": [],
            "_id": "606f8d1d7195479521336568",
            "ownerid": "606f8bc2ea8d56647dfaaeff",
            "title": "Louis' Second Platform",
            "createdAt": "2021-04-08T23:09:17.243Z",
            "updatedAt": "2021-04-08T23:09:17.243Z",
            "__v": 0
        },
        {
            "description": "aaalatform",
            "isPublic": true,
            "upvotes": 0,
            "downvotes": 0,
            "tags": [],
            "games": [],
            "_id": "606f8d1d7195479521336568",
            "ownerid": "606f8bc2ea8d56647dfaaeff",
            "title": "asdasdsa form",
            "createdAt": "2021-04-08T23:09:17.243Z",
            "updatedAt": "2021-04-08T23:09:17.243Z",
            "__v": 0
        },
        {
            "description": "aaalatform",
            "isPublic": true,
            "upvotes": 0,
            "downvotes": 0,
            "tags": [],
            "games": [],
            "_id": "606f8d1d7195479521336568",
            "ownerid": "606f8bc2ea8d56647dfaaeff",
            "title": "asdasdsa form",
            "createdAt": "2021-04-08T23:09:17.243Z",
            "updatedAt": "2021-04-08T23:09:17.243Z",
            "__v": 0
        },
        {
            "description": "aaalatform",
            "isPublic": true,
            "upvotes": 0,
            "downvotes": 0,
            "tags": [],
            "games": [],
            "_id": "606f8d1d7195479521336568",
            "ownerid": "606f8bc2ea8d56647dfaaeff",
            "title": "asdasdsa form",
            "createdAt": "2021-04-08T23:09:17.243Z",
            "updatedAt": "2021-04-08T23:09:17.243Z",
            "__v": 0
        }
    ])
    const [upvoted, setUpvoted] = useState([
        {
            "description": "dumb platform",
            "isPublic": true,
            "upvotes": 0,
            "downvotes": 0,
            "tags": [],
            "games": [
                "606542da7084a516a96bc8f1",
                "606542da7084a516a96bc8f2"
            ],
            "_id": "606ea28cf3b2dc0d08e40adc",
            "ownerid": "606542da7084a516a96bc8f1",
            "title": "dummyTest",
            "createdAt": "2021-04-08T06:28:28.237Z",
            "updatedAt": "2021-04-09T21:42:49.920Z",
            "__v": 2
        },
        {
            "description": "Best platform",
            "isPublic": true,
            "upvotes": 0,
            "downvotes": 0,
            "tags": [],
            "games": [],
            "_id": "606f8d1d7195479521336568",
            "ownerid": "606f8bc2ea8d56647dfaaeff",
            "title": "Louis' Second Platform",
            "createdAt": "2021-04-08T23:09:17.243Z",
            "updatedAt": "2021-04-08T23:09:17.243Z",
            "__v": 0
        },
        {
            "description": "dumb platform",
            "isPublic": true,
            "upvotes": 0,
            "downvotes": 0,
            "tags": [],
            "games": [
                "606542da7084a516a96bc8f1",
                "606542da7084a516a96bc8f2"
            ],
            "_id": "606ea28cf3b2dc0d08e40adc",
            "ownerid": "606542da7084a516a96bc8f1",
            "title": "dummyTest",
            "createdAt": "2021-04-08T06:28:28.237Z",
            "updatedAt": "2021-04-09T21:42:49.920Z",
            "__v": 2
        },
        {
            "description": "Best platform",
            "isPublic": true,
            "upvotes": 0,
            "downvotes": 0,
            "tags": [],
            "games": [],
            "_id": "606f8d1d7195479521336568",
            "ownerid": "606f8bc2ea8d56647dfaaeff",
            "title": "Louis' Second Platform",
            "createdAt": "2021-04-08T23:09:17.243Z",
            "updatedAt": "2021-04-08T23:09:17.243Z",
            "__v": 0
        },
        {
            "description": "aaalatform",
            "isPublic": true,
            "upvotes": 0,
            "downvotes": 0,
            "tags": [],
            "games": [],
            "_id": "606f8d1d7195479521336568",
            "ownerid": "606f8bc2ea8d56647dfaaeff",
            "title": "asdasdsa form",
            "createdAt": "2021-04-08T23:09:17.243Z",
            "updatedAt": "2021-04-08T23:09:17.243Z",
            "__v": 0
        },
        {
            "description": "aaalatform",
            "isPublic": true,
            "upvotes": 0,
            "downvotes": 0,
            "tags": [],
            "games": [],
            "_id": "606f8d1d7195479521336568",
            "ownerid": "606f8bc2ea8d56647dfaaeff",
            "title": "asdasdsa form",
            "createdAt": "2021-04-08T23:09:17.243Z",
            "updatedAt": "2021-04-08T23:09:17.243Z",
            "__v": 0
        },
        {
            "description": "aaalatform",
            "isPublic": true,
            "upvotes": 0,
            "downvotes": 0,
            "tags": [],
            "games": [],
            "_id": "606f8d1d7195479521336568",
            "ownerid": "606f8bc2ea8d56647dfaaeff",
            "title": "asdasdsa form",
            "createdAt": "2021-04-08T23:09:17.243Z",
            "updatedAt": "2021-04-08T23:09:17.243Z",
            "__v": 0
        }
    ])
    const [random, setRandom] = useState([
        {
            "description": "dumb platform",
            "isPublic": true,
            "upvotes": 0,
            "downvotes": 0,
            "tags": [],
            "games": [
                "606542da7084a516a96bc8f1",
                "606542da7084a516a96bc8f2"
            ],
            "_id": "606ea28cf3b2dc0d08e40adc",
            "ownerid": "606542da7084a516a96bc8f1",
            "title": "dummyTest",
            "createdAt": "2021-04-08T06:28:28.237Z",
            "updatedAt": "2021-04-09T21:42:49.920Z",
            "__v": 2
        },
        {
            "description": "Best platform",
            "isPublic": true,
            "upvotes": 0,
            "downvotes": 0,
            "tags": [],
            "games": [],
            "_id": "606f8d1d7195479521336568",
            "ownerid": "606f8bc2ea8d56647dfaaeff",
            "title": "Louis' Second Platform",
            "createdAt": "2021-04-08T23:09:17.243Z",
            "updatedAt": "2021-04-08T23:09:17.243Z",
            "__v": 0
        },
        {
            "description": "dumb platform",
            "isPublic": true,
            "upvotes": 0,
            "downvotes": 0,
            "tags": [],
            "games": [
                "606542da7084a516a96bc8f1",
                "606542da7084a516a96bc8f2"
            ],
            "_id": "606ea28cf3b2dc0d08e40adc",
            "ownerid": "606542da7084a516a96bc8f1",
            "title": "dummyTest",
            "createdAt": "2021-04-08T06:28:28.237Z",
            "updatedAt": "2021-04-09T21:42:49.920Z",
            "__v": 2
        },
        {
            "description": "Best platform",
            "isPublic": true,
            "upvotes": 0,
            "downvotes": 0,
            "tags": [],
            "games": [],
            "_id": "606f8d1d7195479521336568",
            "ownerid": "606f8bc2ea8d56647dfaaeff",
            "title": "Louis' Second Platform",
            "createdAt": "2021-04-08T23:09:17.243Z",
            "updatedAt": "2021-04-08T23:09:17.243Z",
            "__v": 0
        },
        {
            "description": "aaalatform",
            "isPublic": true,
            "upvotes": 0,
            "downvotes": 0,
            "tags": [],
            "games": [],
            "_id": "606f8d1d7195479521336568",
            "ownerid": "606f8bc2ea8d56647dfaaeff",
            "title": "asdasdsa form",
            "createdAt": "2021-04-08T23:09:17.243Z",
            "updatedAt": "2021-04-08T23:09:17.243Z",
            "__v": 0
        },
        {
            "description": "aaalatform",
            "isPublic": true,
            "upvotes": 0,
            "downvotes": 0,
            "tags": [],
            "games": [],
            "_id": "606f8d1d7195479521336568",
            "ownerid": "606f8bc2ea8d56647dfaaeff",
            "title": "asdasdsa form",
            "createdAt": "2021-04-08T23:09:17.243Z",
            "updatedAt": "2021-04-08T23:09:17.243Z",
            "__v": 0
        },
        {
            "description": "aaalatform",
            "isPublic": true,
            "upvotes": 0,
            "downvotes": 0,
            "tags": [],
            "games": [],
            "_id": "606f8d1d7195479521336568",
            "ownerid": "606f8bc2ea8d56647dfaaeff",
            "title": "asdasdsa form",
            "createdAt": "2021-04-08T23:09:17.243Z",
            "updatedAt": "2021-04-08T23:09:17.243Z",
            "__v": 0
        },
        {
            "description": "aaalatform",
            "isPublic": true,
            "upvotes": 0,
            "downvotes": 0,
            "tags": [],
            "games": [],
            "_id": "606f8d1d7195479521336568",
            "ownerid": "606f8bc2ea8d56647dfaaeff",
            "title": "asdasdsa form",
            "createdAt": "2021-04-08T23:09:17.243Z",
            "updatedAt": "2021-04-08T23:09:17.243Z",
            "__v": 0
        },
        {
            "description": "aaalatform",
            "isPublic": true,
            "upvotes": 0,
            "downvotes": 0,
            "tags": [],
            "games": [],
            "_id": "606f8d1d7195479521336568",
            "ownerid": "606f8bc2ea8d56647dfaaeff",
            "title": "asdasdsa form",
            "createdAt": "2021-04-08T23:09:17.243Z",
            "updatedAt": "2021-04-08T23:09:17.243Z",
            "__v": 0
        }
    ])
    function DisplayCard(props){
        const platform = props.platform;
        return (
          <Box p={1}>
          <Card className={classes.card}>
            <CardActionArea>
            <CardHeader
              avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                  {platform.title[0]}
                </Avatar>
              }
              title={platform.title}
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                {platform.description ? platform.description :"No description"}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                align="right"
              >
                {platform.games.length == 0 ? "No Games": "Total Games: "+platform.games.length}
              </Typography>
            </CardActions>
            </CardActionArea>
          </Card>
          </Box>
        )
    }

    function Populate(props){
        const platforms = props.platforms;
        const listPlatforms = platforms.map((platform) => 
          <DisplayCard platform={platform} key={platform._id} item/>
        );
        return (
          <Grid
            container
            direction="row"
            justify="flex-start"
            spacing={5}
          >
            {listPlatforms}
          </Grid>
        );
    }


    return(
        <div style={{display:'flex', marginTop:"64px"}}>
            <LeftPanel/>
            <div>
                <Container style={{paddingLeft:'64px', marginTop:"64px"}}maxWidth="xl">
                    <Container className={classes.section}>
                        <Typography fontWeight="fontWeightBold" className={classes.subtitle}>Explore Platforms:</Typography>
                        <Container style={{marginTop:'0px', marginBottom:'20px'}}>
                                <Grid item
                                container
                                direction="row"
                                justify="flex-end"
                                alignItems="center"
                                spacing={3}>
                                    <Button onClick={handleRefresh} variant="contained" color="primary" startIcon={<CachedOutlinedIcon />} style={{textTransform: 'none'}}>
                                        Refresh
                                    </Button>
                                </Grid>
                            </Container>
                        <Container className={classes.subcontainer}>
                            <Tabs
                            value={value}
                            indicatorColor="primary"
                            textColor="primary"
                            onChange={handleChange}
                            variant="fullWidth"
                            aria-label="disabled tabs example"
                            >
                                <Tab label="Most Recent" style={{textTransform: 'none'}}/>
                                <Tab label="Most Upvoted" style={{textTransform: 'none'}}/>
                                <Tab label="Random" style={{textTransform: 'none'}}/>
                            </Tabs>
                            <TabPanel value={value} index={0}>
                                <Populate platforms={recent} />
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                <Populate platforms={upvoted} />
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                                <Populate platforms={random} />
                            </TabPanel>
                        </Container>
                    </Container>
                </Container>
            </div>
        </div> 
    )
    
}