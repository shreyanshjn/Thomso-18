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
                                <th style={{width:"15%"}}>Rank</th>
                                <th style={{width:"20%"}}>Name</th>
                                <th style={{width:"50%"}}>Institute</th>
                                <th style={{width:"15%"}}>Scores</th>
                            </tr>
                            <tr className="campusAmb-leader-heading">
                                <td>1</td>
                                <td>Rahul jain</td>
                                <td>TMIMT moradabad</td>
                                <td>274</td>
                            </tr>
                            <tr className="campusAmb-leader-heading">
                                <td>2</td>
                                <td>Rishabh Verma</td>
                                <td>SHIV NADAR UNIVERSITY</td>
                                <td>269</td>
                            </tr>
                            <tr className="campusAmb-leader-heading">
                                <td>3</td>
                                <td>Sneha sharma</td>
                                <td>kanoria college</td>
                                <td>220</td>
                            </tr>
                            <tr className="campusAmb-leader-heading">
                                <td>4</td>
                                <td>Rezin Singh</td>
                                <td>teerthanker mahaveer institute of management and technology</td>
                                <td>201</td>
                            </tr>
                            <tr className="campusAmb-leader-heading">
                                <td>5</td>
                                <td>paras jain</td>
                                <td>Graphic Era (Deemed to be University)</td>
                                <td>174</td>
                            </tr>
                            <tr className="campusAmb-leader-heading">
                                <td>6</td>
                                <td>Mohammad Wasiuddin</td>
                                <td>IMSEC, Ghaziabad</td>
                                <td>110</td>
                            </tr>
                            <tr className="campusAmb-leader-heading">
                                <td>7</td>
                                <td>Kavisha Saxena</td>
                                <td>Moradabad Institute of technology</td>
                                <td>102</td>
                            </tr>
                            <tr className="campusAmb-leader-heading">
                                <td>8</td>
                                <td>Chanchal</td>
                                <td>galgotias university</td>
                                <td>93</td>
                            </tr>
                            <tr className="campusAmb-leader-heading">
                                <td>9</td>
                                <td>Shivang Shukla</td>
                                <td>AJAY KUAMR GARG ENGINEERING COLLEGE GZB</td>
                                <td>91</td>
                            </tr>
                            <tr className="campusAmb-leader-heading">
                                <td>10</td>
                                <td>Harshita</td>
                                <td>RAYAT BAHRA UNIVERSITY, MOHALI</td>
                                <td>86</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
