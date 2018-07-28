import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';

const HomeIndex = Loadable({
    loader: () => import('./components/beta/home/Index'),
  loading: () => <div>Loading HomeIndex</div>,
});

const CAIndex = Loadable({
  loader: () => import('./components/ca/Index'),
  loading: () => <div>Loading CAIndex</div>,
});

const VerifyCerti = Loadable({
  loader: () => import('./components/verifyCerti/Index'),
  loading: () => <div>Loading Certificate Verification</div>,
});

const Sponsor = Loadable({
  loader: () => import('./components/Sponsor/Sponsors'),
  loading: () => <div>Loading Sponsor</div>,
});

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomeIndex} />
          <Route path="/ca/" component={CAIndex} />
          <Route path="/verifyCerti/" component={VerifyCerti} />
          <Route path="/sponsor/" component={Sponsor} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
