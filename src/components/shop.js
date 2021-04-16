import React, { Component } from 'react';
import LeftPanel from "./leftNavigationPanel";
export default class Shop extends Component{
    render(){
        return(
            <div style={{display:'flex', marginTop:"64px"}}>
                <LeftPanel/>
                <div>Shop


                </div>
            </div> 
        )
    }
}