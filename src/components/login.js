import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Textfield from '@material-ui/core/Textfield';
import { makeStyles } from '@material-ui/core/styles';
import logo from '../assets/logo.png';
import { Container } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import InputAdornment from "@material-ui/core/InputAdornment";
import MailOutlineRoundedIcon from '@material-ui/icons/MailOutlineRounded';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const useStyles = makeStyles({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '100px'
    },
    subcontainer: {
        width: '400px',
        height: '600px',
        borderRadius:'25px',
        border:'2px solid grey', 
        display:'flex', 
        flexDirection:'column', 
        alignItems:'center'
    },
    header:{
        marginBottom:'10px', 
        marginTop:'15px', 
        display:'flex',
    },
    logo: {
        width:'90px', 
        height:'60px'
    },
    title:{
        color:'#212197', 
        fontSize:'30px', 
        marginLeft:'-10px',
        textAlign:'center',
        lineHeight: '60px'
    },
    blurb:{
        color:'#212197', 
        fontSize:'16px',
        marginBottom: '20px',
        textAlign:'center'
    },
    formContents:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        width:'350px'
    },
    field: {
        marginBottom: '20px'
    },
    misc:{
        marginTop:'20px',
        color:'#212197'
    },
    offset:{
        textAlign:'right'
    }
  });

export default function Login(){
    const classes = useStyles();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    
    const handleSubmit = (e) => {
        e.preventDefault()
        setEmailError(false)
        setPasswordError(false)
        if(email == ''){
            setEmailError(true)
        }
        if(password == ''){
            setPasswordError(true)
        }
        if(email && password){
            console.log(email, password)
        }
    }

    return (
        <Container className={classes.container}>
            <Container className={classes.subcontainer}>
                <Grid container justify="center" spacing={0} className={classes.header}>
                    <img src={logo} alt="logo" className={classes.logo}/>
                    <Box component="b" className={classes.title}>Smarties</Box>
                </Grid>
                <Container className={classes.blurb}>Log in with your Smarties Account</Container>
                <form noValidate autoComplete="off" onSubmit={handleSubmit} className={classes.formContents}>
                    <Textfield 
                        onChange={(e) => setEmail(e.target.value)}
                        label="Email" 
                        variant="outlined" 
                        fullWidth 
                        required 
                        className={classes.field}
                        error={emailError}
                        InputProps={{
                            endAdornment:(
                                <InputAdornment>
                                    <MailOutlineRoundedIcon/>
                                </InputAdornment>
                            )
                        }}
                    />
                    <Textfield 
                        onChange={(e) => setPassword(e.target.value)}
                        label="Password" 
                        variant="outlined" 
                        fullWidth 
                        required 
                        className={classes.field}
                        error={passwordError}
                        InputProps={{
                            endAdornment:(
                                <InputAdornment>
                                    <LockOutlinedIcon/>
                                </InputAdornment>
                            )
                        }}
                    />
                    <Button 
                        variant="contained" 
                        color="primary" 
                        type="submit">
                        Log in
                    </Button>
                </form>
                <Grid container spacing={3} className={classes.misc}>
                    <Grid item xs={6}>Forgot password?</Grid>
                    <Grid item xs={6} className={classes.offset}>Sign-up now</Grid>
                </Grid>
                
            </Container>
        </Container>
    )
}
