import React from 'react';

import AuthService from '../../../handlers/ca/AuthService';
import FetchApi from '../../../utils/FetchAPI';

export default class LeaderboardIndex extends React.Component {
    constructor(){
        super();
        this.state = {
            users: null,
        }
        this.Auth = new AuthService();
    }

    componentDidMount(){
        const authtoken = this.Auth.getToken()
        FetchApi('GET', '/api/ca/leaderboard', null, authtoken)
            .then(r => {
                console.log(r)
                // if (r && r.data && r.data.body) {
                //     if (r.data.body.created) {
                //         // Set isAuthenticated
                //         this.Auth.setToken(r.data.token)
                //         this.props.updateRoutes(true)
                //         this.props.setUserData(r.data.body)
                //     } else {
                //         // Pass data to parent
                //         this.Auth.setTempToken(r.data.token)
                //         this.props.setUserData(r.data.body)
                //         this.props.history.push('/ca/register')
                //     }
                // }
            })
            .catch(e => console.log(e));
    }

    render(){
        // const { users } = this.state;
        return (
            <div>
                <h2>Leaderboard</h2>
                {/* {users ? users.map( (post, index) => {
                    if(post.link) {
                        return <Card key={'CA-Home-Posts'+index} data={post} sharePost={this.sharePost} />
                    }
                    return null;
                }) : null} */}
            </div>
        )
    }
}
