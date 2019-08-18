import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../src/components/home/Home.js';

function App() {
  return (
    <BrowserRouter>
    <Switch>
        {/* <Route exact path="/login" name="Login Page" component={LoginPage} />
        <Route exact path="/403" name="Page 403" component={Page403} />
        <Route exact path="/500" name="Page 500" component={Page500} /> */}
        <Route path="/" name="Home" component={Home} />
    </Switch>
  </BrowserRouter>
  );
}

export default App;
