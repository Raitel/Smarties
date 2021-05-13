import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Redirect } from 'react-router';
import axios from 'axios';
import Navbar from "./components/navigationBar";
import Home from "./components/home";
import Shop from "./components/shop";
import Settings from "./components/settings";
import Profile from "./components/profile";
import Favorites from "./components/favorites";
import MyPlatforms from "./components/myPlatforms";
import Inventory from "./components/inventory";
import ContactUs from "./components/contact.js";
import Login from "./components/login.js";
import Register from "./components/register.js";
import ForgotPassword from "./components/forgotPassword.js";
import ChangePassword from "./components/changePassword.js";
import ChangeUsername from "./components/changeUsername.js";
import PlayGame from "./components/playGame.js";
import ExplorePlatforms from "./components/explore.js";
import Platform from "./components/platform.js";
import Search from "./components/searchScreen.js";
import { SnackbarProvider } from 'notistack';
import EditGame from "./components/editGame.js";

const jwt = require('jsonwebtoken')

function App() {
  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      console.log('Token does not exist, unauthorized')
      setIsAuth(false)
    } else {
      try {
        var decoded = jwt.verify(token, 'smarties_key')
        console.log('Token exists and is valid, authorized')
        setIsAuth(true)
      } catch (err) {
        console.log('Token invalid, unauthorized')
        localStorage.removeItem('token')
        setIsAuth(false)
      }
    }
  })

  function Verifytoken() {
    console.log('Verifytoken')
    const token = localStorage.getItem('token')
    if (!token) {
      console.log('Token does not exist, unauthorized')
      setIsAuth(false)
    } else {
      try {
        var decoded = jwt.verify(token, 'smarties_key')
        console.log('Token exists and is valid, authorized')
        setIsAuth(true)
      } catch (err) {
        console.log('Token invalid, unauthorized')
        localStorage.removeItem('token')
        setIsAuth(false)
      }
    }
  }

  const ForgotPasswordContainer = () => (
    <div>
      <Route exact path="/" render={() => <Redirect to="/forgotPassword" />} />
      <Route path="/forgotPassword" component={ForgotPassword} />
    </div>
  )

  const DefaultContainer = (props) => (
    <div>
      <Navbar isAuth={props.isAuth} setIsAuth={props.setIsAuth} />
      <Route path="/home" exact component={Home} />
      <Route path="/shop" exact component={Shop} />
      <Route path="/settings" exact component={Settings} />
      <Route path="/profile/:username">
        <Profile />
      </Route>
      <Route path="/test">
        <div>hi</div>
      </Route>
      <Route path="/favorites" exact component={Favorites} />
      <Route path="/myPlatforms" exact component={MyPlatforms} />
      <Route path="/inventory" exact component={Inventory} />
      <Route path="/contactus" exact component={ContactUs} />
      <Route path="/changePassword" exact component={ChangePassword} />
      <Route path="/changeUsername" exact component={ChangeUsername} />
      <Route path="/explore" exact component={ExplorePlatforms} />
      <Route path="/platform" exact component={Platform} />
      <Route path="/platform/:id">
        <Platform />
      </Route>
      <Route path="/game/:id">
        <PlayGame />
      </Route>
      <Route path="/search/:keywords">
        <Search />
      </Route>
      <Route path="/editGame/:id">
        <EditGame />
      </Route>
 
    </div>
  )

  function PublicLoginRoutes({ component: Component, isAuth, setIsAuth }) {
    return (
      <Route
        render={(props) => isAuth === false
          ? <Login isAuth={isAuth} setIsAuth={setIsAuth} />
          : <Redirect to={{ pathname: '/home', state: { from: props.location } }} />}
      />
    )
  }

  function PublicRegisterRoutes({ component: Component, isAuth, ...rest }) {
    return (
      <Route
        {...rest}
        render={(props) => isAuth === false
          ? <Component {...props} />
          : <Redirect to={{ pathname: '/home', state: { from: props.location } }} />}
      />
    )
  }

  function ProtectedRoutes({ component: Component, isAuth, setIsAuth }) {
    return (
      <Route
        render={(props) => isAuth === true
          ? <Component isAuth={isAuth} setIsAuth={setIsAuth} />
          : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
      />
    )
  }

  return (
    <div>
      <SnackbarProvider maxSnack={20}>
        <Router>
          <Switch>
            <PublicLoginRoutes exact path='/login' isAuth={isAuth} setIsAuth={setIsAuth} component={Login} />
            <PublicRegisterRoutes exact path="/(register)" isAuth={isAuth} component={Register} />
            <Route exact path="/(forgotPassword)" component={ForgotPasswordContainer} />
            <ProtectedRoutes isAuth={isAuth} setIsAuth={setIsAuth} component={DefaultContainer} />
          </Switch>
        </Router>
      </SnackbarProvider>
    </div>
  );
}

export default App;
