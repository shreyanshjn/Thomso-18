import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import SponsorIndex from './Containers/Index.jsx';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={SponsorIndex} />
          <Route exact path="/sponsor" component={SponsorIndex} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;