import { Container } from '@material-ui/core';
import React, { Component } from 'react';
import LeftPanel from "./leftNavigationPanel";

export default class Home extends Component{
    render(){
        return(
            <div style={{display:'flex'}}>
                <LeftPanel></LeftPanel>
                <div>Favorites</div>
            </div> 
        )
    }
}