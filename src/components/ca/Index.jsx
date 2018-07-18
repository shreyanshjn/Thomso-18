import React from 'react'
import { Route } from 'react-router-dom';
import Loadable from 'react-loadable';

import AuthService from '../../handlers/ca/AuthService';

// import LoginIndex from './login/Index';

const Loading = ({ error }) => {
    if (error) {
      return console.log(error);
    } else {
      return <h3>Loading...</h3>;
    }
}

const LoginIndex = Loadable({
    loader: () => import('./login/Index'),
    loading: Loading,
});

const LogutIndex = Loadable({
    loader: () => import('./logout/Index'),
    loading: Loading,
});

const RegisterIndex = Loadable({
    loader: () => import('./register/Index'),
    loading: Loading,
});

const HomeIndex = Loadable({
    loader: () => import('./home/Index'),
    loading: Loading,
});

export default class CAIndex extends React.Component{
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

    render(){
        return(
            <div>
                {this.state.isAuthenticated ? 
                    <div>
                        <Route path="/ca/" component={HomeIndex} />
                        <Route exact path="/ca/logout" render={ () => <LogutIndex updateRoutes={this.handleUpdate}/> } />
                    </div>

                :
                    <div>
                        <Route exact path="/ca/register" component={RegisterIndex} />
                        <Route exact path="/ca/" render={ () => <LoginIndex updateRoutes={this.handleUpdate}/> } />
                    </div>
                }
            </div>
        )
    }
}
