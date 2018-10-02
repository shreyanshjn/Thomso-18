import React from 'react';
import Navbar from '../../beta/home/Navbar.jsx'
 
import './cards.css';

import {MemberDetails} from "./info";
import Vertical from './Vertical';
export default class TeamIndex extends React.Component{
    constructor() {
        super();
        this.state = {
            memberdetails:MemberDetails,
        }
    }
    componentDidMount() {
        this.setState({
            memberdetails:MemberDetails
        })
    }
    render(){
        return (
        <div>
            <Navbar/>
            <div className="main-team-card-maindiv">
                <div className="main-team-wrapper">
                {this.state.memberdetails.map((post, index)=>
                    
                    <Vertical post={post} key={index}/>
                )}
                
                </div> 
            </div>
        </div>
        )
    }
}
