import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';

// Beta route not being used currently
// const BetaIndex = Loadable({
//   loader: () => import('./components/beta/Index'),
//   loading: () => <div>Loading BetaIndex</div>,
// });

const CAIndex = Loadable({
  loader: () => import('./components/ca/Index'),
  loading: () => <div>Loading CAIndex</div>,
});

const Sponsors = Loadable({
  loader: () => import('./components/beta/sponsors/Index'),
  loading: () => <div>Loading Sponsors</div>,
});

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          {/* <Route path="/beta" component={BetaIndex} /> */}
          <Route exact path="/" component={HomeIndex} />
          <Route path="/Sponsors/" component={Sponsors} />
          <Route path="/ca/" component={CAIndex} />

          <Route path="/verifyCerti/" component={VerifyCerti} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
