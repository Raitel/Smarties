import React, { useState, useEffect }  from 'react';
import LeftPanel from "./leftNavigationPanel";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
import CachedOutlinedIcon from '@material-ui/icons/CachedOutlined';
import SearchFunction from "./searchFunction.js";
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345
    },
    subtitle:{
        color:'#212197', 
        fontSize:'24px',
        //marginBottom:'40px',
        fontWeight: 'Bold'
    },
    card:{
        width: "250px",
    },
    section:{
        width:'1270px',
        height:'800px',
        marginTop:'64px',
        marginLeft:'64px',
        display:'flex',
        //alignItems:'center',
        flexDirection:'column',
        //border: '1px solid black'
    },
    subcontainer:{
        border: '1px solid grey',
        display:'flex',
        alignItems:'space-evenly',
        flexDirection:'column',
        width:'1270px',
        height:'800px',
        borderRadius:'10px'
    },
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
            <Typography>{children}</Typography>
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
    
    const [recent, setRecent] = useState(null);
    const [upvoted, setUpvoted] = useState(null);
    const [random, setRandom] = useState(null);
    const [refresh, setRefresh] = useState(0);

    const handleRefresh = () => {
        setRefresh(refresh+1);
    };

    useEffect(() => {
        getRecent();
    },[refresh]);
    useEffect(() => {
        getUpvoted();
    },[refresh]);
    useEffect(() => {
        getRandom();
    },[refresh]);
    const getRecent = () => {
        axios.get("/platforms/getRecentlyUpdatedPlatforms/").then( data => {
            setRecent(data);
        });
    }
    const getUpvoted = () => {
        axios.get("/platforms/getMostUpvotedPlatforms/").then( data => {
            setUpvoted(data);
        });
    }
    const getRandom = () => {
        axios.get("/platforms/getRandomPlatforms/").then( data => {
            setRandom(data);
        });
    }

    return(
        <div style={{display:'flex', marginTop:"64px"}}>
            <LeftPanel/>
            <div>

                    <Container className={classes.section}>
                        <Typography fontWeight="fontWeightBold" className={classes.subtitle}>Explore Platforms:</Typography>
                        <Container style={{marginTop:'0px', marginBottom:'20px', width:'1270px'}}>
                                <Grid item
                                container
                                direction="row"
                                justify="flex-end"
                                alignItems="center">
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
                                <Tab label="Recently Updated" style={{textTransform: 'none'}}/>
                                <Tab label="Most Upvoted" style={{textTransform: 'none'}}/>
                                <Tab label="Random" style={{textTransform: 'none'}}/>
                            </Tabs>
                            <TabPanel value={value} index={0}
                            style={{
                            display:'flex',
                            alignItems:'center',
                            flexDirection:'column'}}
                            >
                                <SearchFunction platformData={recent}/>
                                {/* <Populate platforms={recent} /> */}
                            </TabPanel>
                            <TabPanel value={value} index={1}
                            style={{
                                display:'flex',
                                alignItems:'center',
                                flexDirection:'column'}}>
                                <SearchFunction platformData={upvoted}/>
                                {/* <Populate platforms={upvoted} /> */}
                            </TabPanel>
                            <TabPanel value={value} index={2}
                            style={{
                                display:'flex',
                                alignItems:'center',
                                flexDirection:'column'}}>
                                <SearchFunction platformData={random}/>
                                {/* <Populate platforms={random} /> */}
                            </TabPanel>
                        </Container>
                    </Container>

            </div>
        </div> 
    )
    
}