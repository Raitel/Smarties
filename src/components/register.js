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
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

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
        alignItems:'center',
        paddingTop:'40px'
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

export default function Register(){
    const classes = useStyles();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [password_confirm, setPasswordConfirm] = useState('')
    const [email, setEmail] = useState('')
    const [usernameError, setUsernameError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [password_confirmError, setPasswordConfirmError] = useState(false)
    const [reveal, setReveal] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setUsernameError(false)
        setEmailError(false)
        setPasswordError(false)
        setPasswordConfirmError(false)
        if(username == ''){
            setUsernameError(true)
        }
        if(email == ''){
            setEmailError(true)
        }
        if(password == ''){
            setPasswordError(true)
        }
        if(password_confirm == ''){
            setPasswordConfirmError(true)
        }
        if(username && email && password && password_confirm){
            console.log(username, email, password, password_confirm)
        }else{
            console.log(false)
        }
    }

    const handleClickShowPassword = () => {
        setReveal(!reveal)
    };
    
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Container className={classes.container}>
            <Container className={classes.subcontainer}>
                <Grid container justify="center" spacing={0} className={classes.header}>
                    <img src={logo} alt="logo" className={classes.logo}/>
                    <Box component="b" className={classes.title}>Smarties</Box>
                </Grid>
                <Container className={classes.blurb}>Sign up with your email address</Container>
                <form noValidate autoComplete="off" onSubmit={handleSubmit} className={classes.formContents}>
                    <Textfield 
                        onChange={(e) => setUsername(e.target.value)}
                        label="Username" 
                        variant="outlined" 
                        fullWidth 
                        required 
                        className={classes.field}
                        error={usernameError}
                        InputProps={{
                            endAdornment:(
                                <InputAdornment>
                                    <AccountCircleOutlinedIcon/>
                                </InputAdornment>
                            )
                        }}
                    />
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
                        type={reveal ? 'text' : 'password'}
                        variant="outlined" 
                        fullWidth 
                        required 
                        className={classes.field}
                        error={passwordError}
                        InputProps={{
                            endAdornment:(
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    >
                                    {reveal ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                    <Textfield 
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                        label="Confirm Password" 
                        type={reveal ? 'text' : 'password'}
                        variant="outlined" 
                        fullWidth 
                        required 
                        className={classes.field}
                        error={password_confirmError}
                        InputProps={{
                            endAdornment:(
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    >
                                    {reveal ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                    <Button 
                        variant="contained" 
                        color="primary" 
                        type="submit">
                        Sign up
                    </Button>
                </form>
                
            </Container>
        </Container>
    )
}
