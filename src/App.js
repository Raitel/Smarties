import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Button } from '@material-ui/core';
import { Redirect } from 'react-router';

import Navbar from "./components/navigationBar";
import Home from "./components/home";
import Shop from "./components/shop";
import Settings from "./components/settings";
import Profile from "./components/profile";
import Favorites from "./components/favorites";
import Mygames from "./components/mygames";
import Inventory from "./components/inventory";
import ContactUs from "./components/contact.js";
import Login from "./components/login.js";
import Register from "./components/register.js";
import ForgotPassword from "./components/forgotPassword.js";
import ChangePassword from "./components/changePassword.js";
import ChangeUsername from "./components/changeUsername.js";
import PlayGame from "./components/playGame.js";
import ExplorePlatforms from "./components/explore.js";

const LoginContainer = () => (
  <div>
    <Route exact path="/" render={() => <Redirect to="/login" />} />
    <Route path="/login" component={Login} />
  </div>
)

const RegisterContainer = () => (
  <div>
    <Route exact path="/" render={() => <Redirect to="/register" />} />
    <Route path="/register" component={Register} />
  </div>
)

const ForgotPasswordContainer = () => (
  <div>
    <Route exact path="/" render={() => <Redirect to="/forgotPassword" />} />
    <Route path="/forgotPassword" component={ForgotPassword} />
  </div>
)

const DefaultContainer = () => (
  <div>
    <Navbar />
    <Route path="/" exact component={Home} />
    <Route path="/shop" exact component={Shop} />
    <Route path="/settings" exact component={Settings} />
    <Route path="/profile" exact component={Profile} />
    <Route path="/favorites" exact component={Favorites} />
    <Route path="/mygames" exact component={Mygames} />
    <Route path="/inventory" exact component={Inventory} />
    <Route path="/contactus" exact component={ContactUs} />
    <Route path="/changePassword" exact component={ChangePassword} />
    <Route path="/changeUsername" exact component={ChangeUsername} />
    <Route path="/play" exact component={PlayGame} />
    <Route path="/explore" exact component={ExplorePlatforms} />
  </div>
)

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/(login)" component={LoginContainer}/>
        <Route exact path="/(register)" component={RegisterContainer}/>
        <Route exact path="/(forgotPassword)" component={ForgotPasswordContainer}/>
        <Route component={DefaultContainer}/>

      </Switch>
    </Router>
  );
}

export default App;
