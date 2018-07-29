import React, { Component } from 'react';
import './src/css/Footer.css';
import fblogo from './src/img/fbicon-01.png';
import inlogo from './src/img/ig icon-01.png';
import ytlogo from './src/img/yt icon-01.png';
import iglogo from './src/img/in icon-01.png';
class Footer extends Component {
    constructor(props) {
        super(props);
        this.state=
            {
                days:0
            };
    }
    render() {
        let countDownDate = new Date("Oct 25, 2018 00:00:00").getTime();
        let now=new Date().getTime();
        let distance = countDownDate - now;
        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        return (
            <div className="main">
                <div className="countdown">
                    <p className="thomso">THOMSO'18 COUNTDOWN</p><br />
                    <p className="daysleft"><span className="days">{days}</span> <span className="left">DAYS LEFT</span></p>
                </div>
                <div className="icons">
                    <p className="follow">FOLLOW US </p>
                    <div className="mainIcons">
                        <div className="fbdiv">  <a href="https://www.facebook.com/thomsoiitroorkee/" target="_blank" rel="noopener noreferrer"> <img src={fblogo} className="iconsImage" alt="fblogo" /></a></div>
                        <div className="instadiv"><a href="https://www.instagram.com/thomso.IITR/" target="_blank" rel="noopener noreferrer"><img src={inlogo} className="iconsImage" alt="inlogo" /></a></div>
                        <div className="ytdiv"><a href="https://www.youtube.com/user/iitrthomso" target="_blank" rel="noopener noreferrer"><img src={ytlogo} className="iconsImage" alt="ytlogo" /></a></div>
                        <div className="linkediv"><a href="https://www.linkedin.com/company/thomso-iit-roorkee-official" target="_blank" rel="noopener noreferrer"> <img src={iglogo} className="iconsImage" alt="lilogo" /></a></div>
                        </div>
                    </div>
                </div>
        );
    }
}

export default Footer;
