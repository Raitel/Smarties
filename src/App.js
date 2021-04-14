import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Button } from '@material-ui/core';

import Navbar from "./components/navigationBar";
import Home from "./components/home";
import Shop from "./components/shop";
import Settings from "./components/settings";
import Profile from "./components/profile";
import Favorites from "./components/favorites";
import Mygames from "./components/mygames";
import Inventory from "./components/inventory";

function App() {
  return (
    <Router>
      <Navbar />
      <Route path="/" exact component={Home} />
      <Route path="/shop" exact component={Shop} />
      <Route path="/settings" exact component={Settings} />
      <Route path="/profile" exact component={Profile} />
      <Route path="/favorites" exact component={Favorites} />
      <Route path="/mygames" exact component={Mygames} />
      <Route path="/inventory" exact component={Inventory} />

    </Router>
  );
}

export default App;
