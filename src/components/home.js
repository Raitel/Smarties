import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//import LeftPanel from "./leftpanel";
import LeftPanel from "./leftNavigationPanel";

function Populate(props){
    const items = props.items;
    const listItems = items.map((item) => 
        <div>{item.title}</div>
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
                    "description": "",
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
                    "description": "",
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