import React from 'react';
import DataRow from './DataRow';
import AuthService from '../../../handlers/ca/AuthService';
import FetchApi from '../../../utils/FetchAPI';

import './Leaderboard.css';
export default class LeaderboardIndex extends React.Component {
    constructor() {
        super();
        this.state = {
            users: null,
            isExpandable:true,
            hide:true,
            rank: '-'
        }
        this.Auth = new AuthService();
    }

    componentDidMount() {
        const authtoken = this.Auth.getToken()
        FetchApi('GET', '/api/ca/leaderboard', null, authtoken)
            .then(r => {
                if (r && r.data && r.data.length > 0) {
                    this.setState({ users: r.data })
                } else {
                    console.log(r)
                }
            })
            .catch(e => console.log(e));
        FetchApi('GET', '/api/ca/rank', null, authtoken)
            .then(r => {
                if (r && r.data && r.data.success === true ) {
                    this.setState({ rank: r.data.rank })
                } else {
                    console.log(r)
                }
            })
            .catch(e => console.log(e));
    }

    render() {
        // const { users } = this.state;
        return (
            <div className="campusAmb-leader-indexMain">
                {/* {users ? users.map( (post, index) => {
                    if(post.link) {
                        return <Card key={'CA-Home-Posts'+index} data={post} sharePost={this.sharePost} />
                    }
                    return null;
                }) : null} */}
                <div className="campusAmb-leader-maintable">
                    <table className="campusAmb-leaderboard-table"> 
                        <tbody>
                            <tr className="campusAmb-leader-heading">
                                <th>Rank</th>
                                <th>Name</th> 
                                <th>Institute</th>
                                <th className="campusAmb-leader-mobile">Likes</th>
                                <th className="campusAmb-leader-mobile">Shares</th>
                                <th className="campusAmb-leader-mobile">Scores</th>
                            </tr>
                            {this.state.users ? this.state.users.map((user, index) => {
                                return <DataRow key={`leader${index}`} data={user} index={index} />
                            }) : null}

                            {this.props.userData ?
                            <tr className="campusAmb-leader-rank">
                                <th>{this.props.userData.blocked ? 'Blocked' : this.state.rank}</th>
                                <th>{this.props.userData.name ? this.props.userData.name : null}</th> 
                                <th className="campusAmb-leader-downarrows" onClick={() => this.setState({isExpanded: !this.state.isExpanded})}>{this.props.userData.college ? this.props.userData.college : null}</th>
                                <th className="campusAmb-leader-mobile">{this.props.userData.likes ? this.props.userData.likes : 0}</th>
                                <th className="campusAmb-leader-mobile">{this.props.userData.shares ? this.props.userData.shares : 0}</th>
                                <th className="campusAmb-leader-mobile">{this.props.userData.score ? this.props.userData.score : 0}</th>
                            </tr> : null}
                            {this.state.isExpanded ?
                                    <tr className="campusAmb-leader-rank-mobile">
                                    <td className="campusAmb-leader-desktop">{this.props.userData.likes ? `Likes ${this.props.userData.likes}` :`Likes 0`}</td>
                                    <td className="campusAmb-leader-desktop">{this.props.userData.shares ? `Shares ${this.props.userData.shares}` :`Shares 0`}</td>
                                    <td className="campusAmb-leader-desktop">{this.props.userData.score ? `Score ${this.props.userData.score}` :`Score 0` }</td>
                                </tr>
                            : null}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
