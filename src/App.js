import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Button } from '@material-ui/core';

import Navbar from "./components/navbar";
import Home from "./components/home";

function App() {
  return (
    <Router>
      <Navbar />
      <br></br>
      <Route path="/" exact component={Home} />

    </Router>
  );
}

export default App;
