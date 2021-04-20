import React, { useState } from 'react';

import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import LeftPanel from "./leftNavigationPanel";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

import Divider from '@material-ui/core/Divider';
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";

import Avatar from '@material-ui/core/Avatar';

import CssBaseline from '@material-ui/core/CssBaseline';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
      },
    card:{
        width: "800px" 
    },
    subcontainer:{
        width: "1200px",
        border: '1px solid grey',
        borderRadius:'10px'
    },
    section:{
        paddingBottom:"50px"
    },
    textField:{
        width:"450px"
    },
    buttonStyle:{
        width:"300px"
    },
    subtitle:{
        color:'#212197',
        fontWeight: 'Bold',
        marginBottom:'20px'
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: '#212197',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function FormPropsTextFields() {
    const classes = useStyles();
    const history = useHistory();
    const handleBack = () => {
        history.push("/settings")
      };
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')
    const [currentPasswordError, setCurrentPasswordError] = useState(false)
    const [newPasswordError, setNewPasswordError] = useState(false)
    const [confirmNewPasswordError, setConfirmNewPasswordError] = useState(false)
    const [reveal, setReveal] = useState(false)
    
    const handleSubmit = (e) => {
        e.preventDefault()
        setCurrentPasswordError(false)
        setNewPasswordError(false)
        setConfirmNewPasswordError(false)
        if(currentPassword == ''){
            setCurrentPasswordError(true)
        }
        if(newPassword == ''){
            setNewPasswordError(true)
        }
        if(confirmNewPassword == ''){
            setConfirmNewPasswordError(true)
        }
        if(currentPassword && newPassword && confirmNewPassword){
            console.log(currentPassword, newPassword, confirmNewPassword)
        }else{
            console.log(false)
        }
    }

  const handleClickShowPassword = () => {
    console.log(reveal)
    setReveal(!reveal)
  };
  
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  
    return(
        <div style={{display:'flex', marginTop:"64px"}}>
            <LeftPanel/>
            <Container>
                <Box style={{paddingTop:'80px'}}>
                    <Container className={classes.subcontainer}>
                        <Typography variant="h4" gutterBottom style={{color:'#212197',fontWeight: 'Bold',marginBottom:"50px", marginTop:"30px"}}>Change Password:</Typography>
                        <Container className={classes.section}>
                            <Typography variant="h5" className={classes.subtitle}>Current Password:</Typography>
                            <TextField
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            type={reveal ? 'text' : 'password'}
                            error={currentPasswordError}
                            variant="outlined"
                            required
                            fullWidth
                            name="currentPassword"
                            label="Current Password"
                            id="currentPassword"
                            autoComplete="current-password"
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
                            className={classes.textField}
                            />
                        </Container>
                        <Container className={classes.section}>
                            <Typography variant="h5" className={classes.subtitle}>New Password:</Typography>
                            <TextField
                            onChange={(e) => setNewPassword(e.target.value)}
                            type={reveal ? 'text' : 'password'}
                            error={newPasswordError}
                            variant="outlined"
                            required
                            fullWidth
                            name="newPassword"
                            label="New Password"
                            id="newPassword"
                            autoComplete="new-password"
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
                            className={classes.textField}
                            />
                        </Container>
                        <Container className={classes.section}>
                            <Typography variant="h5" className={classes.subtitle}>Confirm New Password:</Typography>
                            <TextField
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                            type={reveal ? 'text' : 'password'}
                            error={confirmNewPasswordError}
                            variant="outlined"
                            required
                            fullWidth
                            name="confirmNewPassword"
                            label="Confirm New Password"
                            id="confirmNewPassword"
                            autoComplete="cofirm-new-password"
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
                            className={classes.textField}
                            />
                        </Container>
                        <Container style={{marginTop:'50px', marginBottom:'50px'}}>
                            <Grid item
                            container
                            direction="row"
                            justify="flex-end"
                            alignItems="center"
                            spacing={3}>
                                <Grid item>
                                    <Button variant="contained" style={{textTransform: 'none'}}  onClick={handleBack}>
                                        Back
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" color="primary" style={{textTransform: 'none'}} onClick={handleSubmit} >
                                        Submit
                                    </Button>
                                </Grid>
                            </Grid>
                        </Container>
                    </Container>
                </Box>
            </Container>
    </div> 
    )
}
