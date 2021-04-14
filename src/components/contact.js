import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import logo from '../assets/logo.png';

export default class ContactUs extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            subject: '',
            message: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event){
        event.preventDefault();
        console.log(this.state.email)
        console.log(this.state.subject)
        console.log(this.state.message)
    }

    render(){
        return(
            <div style={{height:'100%', width:'100%', display:'flex', justifyContent:'center', paddingTop:'180px'}}>
                <div style={{height:'550px', width:'700px', borderRadius:'25px',border:'2px solid grey', display:'flex', flexDirection:'column', alignItems:'center'}}>
                    <div style={{marginBottom:'10px', marginTop:'15px', display:'flex', alignItems:'center'}}>
                        <img src={logo} alt="logo" style={{width:'90px', height:'60px'}}/>
                        <b style={{color:'#212197', fontSize:'30px', marginLeft:'-15px'}}>Contact Us</b>
                    </div>
                    <div style={{color:'#212197', fontSize:'16px', marginBottom:'15px'}}>Let us <span style={{color:'#56CCF2'}}>know your thoughts</span></div>
                    <input type="text" name='email' value={this.state.email} onChange={this.handleChange} placeholder='Email' style={{width:'550px', height:'40px', marginBottom:'18px',borderRadius:'10px',border:'1px solid grey', fontFamily:'arial'}}/>
                    <input type="text" name='subject' value={this.state.subject} onChange={this.handleChange} placeholder='Subject' style={{width:'550px', height:'40px', marginBottom:'18px',borderRadius:'10px',border:'1px solid grey', fontFamily:'arial'}}/>
                    <textarea type="text" name='message' value={this.state.message} onChange={this.handleChange} placeholder='Message' style={{width:'550px', height:'200px', marginBottom:'18px',borderRadius:'10px',border:'1px solid grey', fontFamily:'arial'}}/>
                    <Button variant="contained" color="primary" onClick={this.handleSubmit}>Send</Button>
                </div>
            </div>
        )
    }
}