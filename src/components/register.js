import React, { useState } from 'react';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useHistory } from "react-router-dom";
import LinearProgress from '@material-ui/core/LinearProgress';
import { useSnackbar } from 'notistack';
import SelectInput from '@material-ui/core/Select/SelectInput';
import { SettingsInputAntennaTwoTone } from '@material-ui/icons';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Smarties
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
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
  progressBar: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  progressBar_disabled:{
    display:'none'
  }
}));

export default function SignUp() {
  const classes = useStyles();
  const history = useHistory();
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [email, setEmail] = useState('')
  const [usernameError, setUsernameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [confirmPasswordError, setPasswordConfirmError] = useState(false)
  const [reveal, setReveal] = useState(false)
  const [loading, setLoading] = useState(false)
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  
  const handleSubmit = async (e) => {
    // Set loading to true
    e.preventDefault()
    setUsernameError(false)
    setEmailError(false)
    setPasswordError(false)
    setPasswordConfirmError(false)
    var missing = false;
    if(username == ''){
        setUsernameError(true)
        missing = true
    }
    if(email == ''){
        setEmailError(true)
        missing = true
    }
    if(password == ''){
        setPasswordError(true)
        missing = true
    }
    if(confirmPassword == ''){
        setPasswordConfirmError(true)
        missing = true
    }
    if ((password && confirmPassword) && (password !== confirmPassword)){
      setPasswordError(true)
      setPasswordConfirmError(true)
      enqueueSnackbar('Password Mismatch', {variant:'warning'});
    }
    if (missing){
      enqueueSnackbar('Missing Fields', {variant:'error'});
    }
    if(username && email && password === confirmPassword){
        console.log('send req: ' + username, email, password, confirmPassword)
        axios.post('http://localhost:5000/users/add', {username: username, email: email, password: password})
          .then(res => {
            console.log(res)
            if (res.status === 200){
              enqueueSnackbar('Succes! Redirecting...', {variant:'success'});
              // Redirect to where we want
              history.push("/login")
            }else if(res.status === 204){
              setEmailError(true)
              enqueueSnackbar('Email in use', {variant:'warning'});
            }else if(res.status === 205){
              setUsernameError(true)
              enqueueSnackbar('Username in use', {variant:'warning'});
            }else if (res.status === 404){
              enqueueSnackbar('Something Broke! 404', {variant:'error'});
            }else{
              enqueueSnackbar('Hm, something is not right', {variant:'error'});
            }
          })
          .catch(() => {
            enqueueSnackbar('Hm, something is not right', {variant:'error'});
          })
    }else{
        console.log('do not send req')
    }
    // Set loading to false
    setLoading(false)
    console.log('end')
  }
  
  const handleLogin = (e) => {
    e.preventDefault()
    history.push("/login")
  };

  const handleClickShowPassword = () => {
    setReveal(!reveal)
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <LinearProgress className={loading ? classes.progressBar : classes.progressBar_disabled}/>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  onChange={(e) => setUsername(e.target.value)}
                  error={usernameError}
                  autoComplete="username"
                  name="username"
                  variant="outlined"
                  required
                  fullWidth
                  id="userName"
                  label="User Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={(e) => setEmail(e.target.value)}
                  error={emailError}
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={(e) => setPassword(e.target.value)}
                  type={reveal ? 'text' : 'password'}
                  error={passwordError}
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  id="password"
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
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type={reveal ? 'text' : 'password'}
                  error={confirmPasswordError}
                  variant="outlined"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  id="confirmPassword"
                  autoComplete="confirm-password"
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
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Typography>
                  <Link href="#" onClick={handleLogin} variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </div >
  );
}