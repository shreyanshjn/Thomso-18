import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import HomeIndex from './components/home/Index';

import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomeIndex} />
          <Route path="/test" component={HomeIndex} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
