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

const AdminIndex = Loadable({
    loader: () => import('./admin/Index'),
    loading: Loading,
});

const LogoutIndex = Loadable({
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

const LeaderboardIndex = Loadable({
    loader: () => import('./leaderboard/Index'),
    loading: Loading,
});

const IdeasIndex = Loadable({
    loader: () => import('./ideas/Index'),
    loading: Loading,
});

const LoginIndex = Loadable({
    loader: () => import('./login/Index'),
    loading: Loading,
});

export default class CAIndex extends React.Component{
    constructor() {
        super();
        this.state = {
            userData: '',
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
    
    handleUpdate = isAuthenticated => {
        console.log(isAuthenticated, 'isAuthenticated')
        this.setState({isAuthenticated})
    }


    // Bug: This makes all the routes re-render
    // Use redux to prevent re-render
    setUserData = data => {
        this.setState({
            userData: data
        })
    }

    render(){
        return(
            <div>
                <Route path="/ca/admin" component={AdminIndex}/>
                {this.state.isAuthenticated ? 
                    <div>
                        <Route exact path="/ca/logout" render={ props => <LogoutIndex {...props} updateRoutes={this.handleUpdate}/> } />
                        <Route exact path="/ca/leaderboard" component={LeaderboardIndex} />
                        <Route exact path="/ca/idea" component={IdeasIndex} />
                        <Route exact path="/ca/register" render={ props => <RegisterIndex {...props} updateRoutes={this.handleUpdate} setUserData={this.setUserData} userData={this.state.userData} /> } />
                        <Route exact path="/ca/" component={HomeIndex} />
                    </div>

                :
                    <div>
                        <Route exact path="/ca/register" render={ props => <RegisterIndex {...props} updateRoutes={this.handleUpdate} setUserData={this.setUserData} userData={this.state.userData} /> } />
                        <Route exact path="/ca/" render={ props => <LoginIndex {...props} updateRoutes={this.handleUpdate} setUserData={this.setUserData} userData={this.state.userData}/> } />
                    </div>
                }
            </div>
        )
    }
}
