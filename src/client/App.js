import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Sponsor from './Containers/Index.jsx';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Sponsor} />
          <Route exact path="/sponsor" component={Sponsor} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;