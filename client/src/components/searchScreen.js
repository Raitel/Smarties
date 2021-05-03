import { Box, Container, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import React, { Component, useState, useEffect, useReducer} from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";
import Avatar from "@material-ui/core/Avatar";
import LeftPanel from "./leftNavigationPanel";
import Button from "@material-ui/core/Button";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { red } from "@material-ui/core/colors";
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useParams } from 'react-router-dom';
import SearchFunction from "./searchFunction.js";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345
    },
    avatar: {
        backgroundColor: red[500]
    },
    subtitle:{
        color:'#212197', 
        fontSize:'24px',
        marginBottom:'40px',
        fontWeight: 'Bold'
    },
    card:{
        width: "250px"
    },
    section:{
        width:'1250px',
        height:'800px',
        marginTop:'64px',
        marginLeft:'64px',
        display:'flex',
        //alignItems:'center',
        flexDirection:'column',
        //border: '1px solid black'
    }
  }));



export default function Search(){
    const classes = useStyles();
    const { keywords } = useParams();
    const [page, setPage] = useState(0);
    const [keywordState, setKeywordState] = useState(keywords);
    const [platformData, setPlatformData] = useState(null);
    if(keywords != keywordState){
        setKeywordState(keywords);
    }
    
    useEffect(() => {
        setPlatformData(null);
        getPlatform();
    },[page]);
    useEffect(() => {
        setPage(0);
        setPlatformData(null);
        getPlatform();
    },[keywordState]);  
    const getPlatform = () => {
        axios.get("/platforms/getPlatformsByKeyword/" + page + "/" + keywords).then( data => {
            setPlatformData(data);
        });
    }
    const handlePrevious = () => {
        var previousPage = parseInt(page) - 1;
        setPage(previousPage);
      };
    const handleNext = () => {
        var nextPage = parseInt(page) + 1;
        setPage(nextPage);
    };

        return(
            <div style={{display:'flex', marginTop:"64px"}}>
                
                <LeftPanel/>
        
                    <Container className={classes.section}>
                    <Typography fontWeight="fontWeightBold" className={classes.subtitle}>Search Results:</Typography>
                    
                    <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                    style={{width:'1250px', marginBottom:'40px'}}
                    >

                        <Button style={{
                        marginLeft:'50px',
                        marginRight:'50px',
                        textTransform: 'none',
                        //visibility: "hidden"
                        //background: 'linear-gradient(45deg, #71c1e9 30%, #71c1e9 90%)'
                        }}
                            disabled={page===0}
                            color="primary"
                            variant="contained" onClick={() => handlePrevious()}>{"Previous Page"}
                        </Button>

                        
                        <Button  style={{
                        marginLeft:'50px',
                        marginRight:'50px',
                        textTransform: 'none',
                        //background: 'linear-gradient(45deg, #71c1e9 30%, #71c1e9 90%)'
                        }}
                        disabled={((platformData != null) && (platformData.data.length === 0 || (platformData.data.length < 12)))}
                        color="primary"
                        variant="contained" onClick={() => handleNext()} >{"Next Page"}</Button>
                        
                        
                    </Grid>
        
                        <SearchFunction platformData={platformData} page={page} keywords={keywords} />
        
                    </Container>
        
                
            </div>
            )


}