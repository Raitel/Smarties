import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//import LeftPanel from "./leftpanel";
import LeftPanel from "./leftNavigationPanel";

export default class Home extends Component{
    render(){
        return(
            <div style={{display:'flex'}}>
                <LeftPanel></LeftPanel>
                <div>
                    favorites
                </div>
            </div>
        )
    }
}