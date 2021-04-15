import React, { Component } from 'react';
import LeftPanel from "./leftNavigationPanel";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CardActionArea from "@material-ui/core/CardActionArea";

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345
    },
    media: {
      height: 0,
      paddingTop: "56.25%" // 16:9
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest
      })
    },
    expandOpen: {
      transform: "rotate(180deg)"
    },
    avatar: {
      backgroundColor: red[500]
    }
  }));


function Populate(props){
    const items = props.items;
    const classes = useStyles();
    const listItems = items.map((item) => 
        <div>{<Card className={classes.root}>
        <CardActionArea>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                RA
              </Avatar>
            }
            title={item.title}
          />
  
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {item.description}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <Typography
              variant="body3"
              color="textSecondary"
              component="p"
              align="right"
            >
              Total Games: {item.games.length}
            </Typography>
          </CardActions>
        </CardActionArea>
      </Card>}</div>
    );
    return (
        <div>{listItems}</div>
    );
}

export default class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {
            recentlyUsed: [
                {
                    "description": "DESCRIPTIONDESCRIPTIONDESCRIPTIONDESCRIPTION",
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
                    "description": "DESCRIPT22IONDES22CRIPTI2DES22CRIPTION22",
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
                }
            ],
            facorites: [],
            myGames: []
        };
      }
    
    render(){
        return(
            <div style={{display:'flex'}}>
                <LeftPanel></LeftPanel>
                <div style={{paddingTop:'110px', paddingLeft: '75px'}}>
                    <div style={{height:'200px'}}>
                        <b style={{color:'#212197', fontSize:'24px', }}>Recently Used:</b>
                        <Populate items={this.state.recentlyUsed} />
                    </div>
                    <div style={{height:'200px'}}>
                        <b style={{color:'#212197', fontSize:'24px', }}>Favorites:</b>
                        <div></div>
                    </div>
                    <div style={{height:'200px'}}>
                        <b style={{color:'#212197', fontSize:'24px', }}>My Games:</b>
                        <div></div>
                    </div>
                </div>
            </div>
        )
    }
}