import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import home from '../assets/home_icon.png';
import favorites from '../assets/favorites_icon.png';
import mygames from '../assets/mygames_icon.png';
import inventory from '../assets/inventory_icon.png';

export default class Home extends Component{
    render(){
        return(
            <div style={{minWidth:'250px', height:'100%', backgroundColor: '#f8f8ff'}}>
                <div style={{paddingTop:'20px', paddingBottom:'20px', display:'flex', alignItems:'center', justifyContent:'center', borderBottom:'1px solid black'}}>
                    <div style={{height:'40px', width:'250px', display:'flex', alignItems:'center'}}>
                        <img src={home} alt="home" style={{width: '25px',height: '25px', marginLeft:'30px', marginRight:'30px'}}/>
                        <div style={{textAlign:'center', verticalAlign:'middle', lineHeight:'40px', fontSize:'18px'}}>Home</div>
                    </div>
                </div>
                <div style={{paddingTop:'20px', paddingBottom:'20px', alignItems:'center', justifyContent:'center', borderBottom:'1px solid black'}}>
                    <div style={{height:'40px', width:'250px', display:'flex', alignItems:'center'}}>
                        <img src={favorites} alt="favorites" style={{width: '25px',height: '25px', marginLeft:'30px', marginRight:'30px'}}/>
                        <div style={{textAlign:'center', verticalAlign:'middle', lineHeight:'40px', fontSize:'18px'}}>Favorites</div>
                    </div>
                    <div style={{height:'40px', width:'250px', display:'flex', alignItems:'center'}}>
                        <img src={mygames} alt="mygames" style={{width: '25px',height: '25px', marginLeft:'30px', marginRight:'30px'}}/>
                        <div style={{textAlign:'center', verticalAlign:'middle', lineHeight:'40px', fontSize:'18px'}}>My Games</div>
                    </div>
                </div>
                <div style={{paddingTop:'20px', paddingBottom:'20px', display:'flex', alignItems:'center', justifyContent:'center', borderBottom:'1px solid black'}}>
                    <div style={{height:'40px', width:'250px', display:'flex', alignItems:'center'}}>
                        <img src={inventory} alt="inventory" style={{width: '25px',height: '25px', marginLeft:'30px', marginRight:'30px'}}/>
                        <div style={{textAlign:'center', verticalAlign:'middle', lineHeight:'40px', fontSize:'18px'}}>Inventory</div>
                    </div>
                </div>
                <div style={{paddingTop:'20px', textAlign:'center', color:'#56CCF2'}}>
                    <div>Contact Us</div>
                </div>
            </div>
        )
    }
}