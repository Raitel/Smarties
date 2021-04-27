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
import { useHistory } from "react-router-dom";
import { useSnackbar } from 'notistack';
import AuthApi from '../utils/AuthApi';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit">
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const classes = useStyles();
  const history = useHistory();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const authApi = React.useContext(AuthApi);

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
      const user = {
        credential: email, 
        password: password
      }
      if(email && password){
          console.log(email, password)
          axios.post('http://localhost:5000/users/login/login', user)
          .then(res => {
            console.log(res)
            if (res.status === 200){
              enqueueSnackbar('Succes! Redirecting...', {variant:'success'});
              authApi.setAuth(true);
            }else if (res.status === 204){
              setEmailError(true)
              setPasswordError(true)
              enqueueSnackbar('User not found', {variant:'error'});
            }else if (res.status === 205){
              setPasswordError(true)
              enqueueSnackbar('Invalid Password', {variant:'error'});
            }
          })
      }
  }

  const handleForgot = (e) => {
    e.preventDefault()
    history.push("/forgotPassword")
  };
  const handleRegister = (e) => {
    e.preventDefault()
    history.push("/register")
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            error={emailError}
          />
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            error={passwordError}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Typography>
                <Link href="#" onClick={handleForgot} variant="body2">
                  Forgot password?
                </Link>
              </Typography>
            </Grid>
            <Grid item>
              <Typography>
                <Link href="#" onClick={handleRegister} variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}