import React from 'react';
import DataRow from './DataRow';
import AuthService from '../../../handlers/ca/AuthService';
import FetchApi from '../../../utils/FetchAPI';
import '../src/css/Leaderboard.css';
export default class LeaderboardIndex extends React.Component {
    constructor(){
        super();
        this.state = {
            users: null,
            isExpandable:true,
            hide:true
        }
        this.Auth = new AuthService();
    }
    componentDidMount(){
        const authtoken = this.Auth.getToken()
        FetchApi('GET', '/api/ca/leaderboard', null, authtoken)
            .then(r => {
                console.log(r)
                if (r && r.data && r.data.length > 0) {
                    this.setState({users: r.data})
                } else {
                    console.log(r)
                }
            })
            .catch(e => console.log(e));
    }

    render(){
        // const { users } = this.state;
        return (
            <div className="indexMain">
                <br/>
                <br/>
                <br/>
            {/* {users ? users.map( (post, index) => {
                    if(post.link) {
                        return <Card key={'CA-Home-Posts'+index} data={post} sharePost={this.sharePost} />
                    }
                    return null;
                }) : null} */}
                <div className="maintable">
                    <table> 
                        <tbody>
                            <tr className="heading">
                                <th>Rank</th>
                                <th>Name</th> 
                                <th>Institute</th>
                                <th className="mobile">Likes</th>
                                <th className="mobile">Shares</th>
                                <th className="mobile">Scores</th>
                            </tr>
                        </tbody>
                        <tbody>
                            {this.state.users ? this.state.users.map((user, index) => {
                                return <DataRow key={`leader${index}`} data={user} index={index} />
                            }) : null}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
