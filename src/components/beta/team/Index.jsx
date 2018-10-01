import React from 'react';
import Navbar from '../../beta/home/Navbar.jsx'

import './cards.css';
import fblogo from './img/fbicon.png';
import inlogo from './img/igicon.png';
import ldlogo from './img/inicon.png';
import {MemberDetails} from "./info";
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
            <div className="card-maindiv">
                <div className="wrapper">
                {this.state.memberdetails.map(post=>
                    <div className="wrapperinnerdiv">
                        {(post && post.members) ? post.members.map(member => 
                            <div className="card-inner">
                                <div className="card-innerdiv">
                                    
                                    <img src={`/img/main/team/${member.image}`} alt="aaa"  className="card-inner-img"/>
                                    
                                    <div className="text glow">{member.first_name}<br/>&nbsp; &nbsp; &nbsp; &nbsp;{member.last_name}</div>
                                    
                                    <div className="overlay-email">
                                        <div className="info">email<br/>{member.email}<br/><br/>mobile no<br/>{member.mobile}</div>
                                    </div>
                                    <div className="overlay">
                                        <div className="card-footer-icons">
                                            <div style={{
                                                zIndex:"200000"
                                            }} className="card-footer-mainIcons">
                                                {member.instalink ?  <a href="https://www.facebook.com/thomsoiitroorkee/" target="_blank" rel="noopener noreferrer"> <div className="card-footer-fbdiv">  <img src={fblogo} className="card-footer-iconsImage" alt="fblogo" /></div></a>: null}
                                                {member.instalink ? <div className="card-footer-instadiv"><a href="https://www.instagram.com/thomso.IITR/" target="_blank" rel="noopener noreferrer"><img src={inlogo} className="card-footer-iconsImage" alt="inlogo" /></a></div>
                                                : null}
                                                {member.instalink ?<div className="card-footer-linkediv"><a href="https://www.linkedin.com/company/thomso-iit-roorkee-official" target="_blank" rel="noopener noreferrer"> <img src={ldlogo} className="card-footer-iconsImage" alt="lilogo" /></a></div>: null}
                                
                                            </div> 
                                        </div>
                                    </div>
                                
                                </div>
                                <div className="card-inner-bottom">
                                    <div className="card-position">{member.position}</div>
                                </div>
                            </div>
                        ) : null}
                    </div>
                )}
                
                </div> 
            </div>
        </div>
        )
    }
}
