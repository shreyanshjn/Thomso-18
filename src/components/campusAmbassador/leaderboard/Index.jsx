import React from 'react';

import './Leaderboard.css';
export default class LeaderboardIndex extends React.Component {
    render() {
        return (
            <div className="campusAmb-leader-indexMain">
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
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
