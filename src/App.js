import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
import Platform from "./components/platform.js";
import AuthApi from "./utils/AuthApi";
import { SnackbarProvider } from 'notistack';

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
    <Route path="/home" exact component={Home} />
    <Route path="/shop" exact component={Shop} />
    <Route path="/settings" exact component={Settings} />
    <Route path="/profile" exact component={Profile} />
    <Route path="/favorites" exact component={Favorites} />
    <Route path="/mygames" exact component={Mygames} />
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
  </div>
)

const RouteGuest = ({ component: Component, ...rest}) => {
  const authApi = React.useContext(AuthApi);
  return <Route 
            {...rest} 
            render = {props =>
              !authApi.auth ? <Component {...props} /> : <Redirect to="/home" /> 
            }
          />
}

const RouteUser = ({ component: Component, ...rest}) => {
  const authApi = React.useContext(AuthApi);
  return <Route 
          {...rest} 
          render={props => 
            authApi.auth ? <Component {...props}/> : <Redirect to="/login" />} 
          />;
}

function App() {
  const [auth, setAuth] = useState(false);

  return (
    <div>
      <SnackbarProvider maxSnack={1}>
        <AuthApi.Provider value={{ auth, setAuth }}>
          <Router>
            <Switch>
              <RouteGuest exact path="/(login)" component={LoginContainer}/>
              <RouteGuest exact path="/(register)" component={RegisterContainer}/>
              <RouteGuest exact path="/(forgotPassword)" component={ForgotPasswordContainer}/>
              <RouteUser component={DefaultContainer}/>

            </Switch>
          </Router>
        </AuthApi.Provider>
      </SnackbarProvider> 
    </div>
  );
}

export default App;
