import React from 'react'; 

import { Switch, Route } from "react-router-dom";

import "./App.css"

import Home from './Home'
import Dashboard from "./Dashboard";

// Your web app's Firebase configuration

function App() {
  return (
    <Switch>
      <Route path="/dashboard">
        <Dashboard />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  );
};

export default App;
