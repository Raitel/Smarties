import React, { Component } from 'react';
import LeftPanel from "./leftNavigationPanel";


export default class Home extends Component{
    render(){
        return(
        <div style={{display:'flex', marginTop:"64px"}}>
        <LeftPanel/>
        <div>Inventory
        </div>
    </div>
      ) 
    }
}