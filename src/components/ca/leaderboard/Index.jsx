import React from 'react';

import AuthService from '../../../handlers/ca/AuthService';
import FetchApi from '../../../utils/FetchAPI';
import '../src/css/Leaderboard.css';
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
            <div>
                <h2>Leaderboard</h2>
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
					<th>Likes</th>
					<th>Shares</th>
					<th>Scores</th>
				</tr>
        </tbody>
            <tbody>
                {this.state.users ? this.state.users.map((user, index) => {
                    return (<tr key={`leader${index}`} >
                    {console.log('test')}
                    <td>{index+1}</td>
                    <td>{user.name}</td>
                    <td>{user.college}</td>
                    <span className="arrow"></span>
                    <td>{user.likes}</td>
                    <td>{user.shares}</td>
                    <td>{user.score}</td>
                </tr>)
                }) : null}
                </tbody>
                <tbody>
				<tr>
					<td>Rank</td>
					<td>Name</td> 
					<td>Institute</td>
					<td>Likes</td>
					<td>Shares</td>
					<td>Scores</td>
				</tr>
        </tbody>
    </table>
            </div>
		</div>
		)
	}
}
