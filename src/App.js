import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import AuthService from './handlers/AuthService';

import './App.css';

const LoginIndex = Loadable({
  loader: () => import('./components/ca/login/Index'),
  loading: () => <div>Loading...</div>,
});

const LogutIndex = Loadable({
  loader: () => import('./components/ca/logout/Index'),
  loading: () => <div>Loading...</div>,
});

const RegisterIndex = Loadable({
  loader: () => import('./components/ca/register/Index'),
  loading: () => <div>Loading...</div>,
});

const HomeIndex = Loadable({
  loader: () => import('./components/home/Index'),
  loading: () => <div>Loading...</div>,
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      isAuthenticated: false
    };
    this.Auth = new AuthService();
    this.handleUpdate = this.handleUpdate.bind(this)
  }
 
  componentWillMount() {
    const isAuthenticated = this.Auth.hasToken();
    console.log(isAuthenticated, 'isAuthenticated')
    this.setState({isAuthenticated});
  }

  handleUpdate(isAuthenticated) {
    this.setState({isAuthenticated})
  }

  render() {
    return (
      <BrowserRouter>
        {this.state.isAuthenticated ?
            <div>
                {/* <Navbar/> */}
                <Switch>
                  <Route exact path="/" component={HomeIndex} />
                  {/* <Route exact path="/login" render={ () => <LoginIndex updateRoutes={this.handleUpdate}/> } /> */}
                  <Route exact path="/logout" render={ () => <LogutIndex updateRoutes={this.handleUpdate}/> } />
                </Switch>
            </div>
          :
          <Switch>
            <Route exact path="/logout" render={ () => <LogutIndex updateRoutes={this.handleUpdate}/> } />
            <Route exact path="/register" component={RegisterIndex} />
            <Route path="/*" render={ () => <LoginIndex updateRoutes={this.handleUpdate}/> } />
          </Switch>
        }
      </BrowserRouter>
    );
  }
}

export default App;
