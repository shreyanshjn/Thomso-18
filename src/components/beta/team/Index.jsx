import React from 'react';
import './cards.css';
import fblogo from './img/fbicon.png';
import inlogo from './img/igicon.png';
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
            <div className="card-maindiv">
                <div className="wrapper">
                {this.state.memberdetails.map(t=>
                    <div className="card-inner">
                            <div className="card-innerdiv">
                                <img src={`/img/main/team/${t.image}`} alt="aaa" className="card-inner-img"/>
                                <div className="text glow">{t.first_name}<br/>&nbsp; &nbsp; &nbsp; &nbsp;{t.last_name}</div>
                                
                                <div className="overlay-email">
                                    <div className="info">email<br/>{t.email}<br/><br/>mobile no<br/>{t.mobile}</div>
                                </div>
                                <div className="overlay">
                                    <div className="card-footer-icons">
                                        <div style={{
                                            zIndex:"200000"
                                        }} className="card-footer-mainIcons">
                                        <a href="https://www.facebook.com/thomsoiitroorkee/" target="_blank" rel="noopener noreferrer"> <div className="card-footer-fbdiv">  <img src={fblogo} className="card-footer-iconsImage" alt="fblogo" /></div></a>
                                            <div className="card-footer-instadiv"><a href="https://www.instagram.com/thomso.IITR/" target="_blank" rel="noopener noreferrer"><img src={inlogo} className="card-footer-iconsImage" alt="inlogo" /></a></div>
                              
                                        </div> 
                                    </div>
                                </div>
                            </div>
                            <div className="card-inner-bottom">
                                <div className="card-position">ACTOR</div>
                            </div>
                    </div>
                )}
                
                </div> 
            </div>
        </div>
        )
    }
}
