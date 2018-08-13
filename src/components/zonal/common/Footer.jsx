import React from 'react';
import '../src/css/Footer.css';
import fblogo from '../src/img/fbicon.png';
import inlogo from '../src/img/igicon.png';
import ytlogo from '../src/img/yticon.png';
import iglogo from '../src/img/inicon.png';
export default class Footer extends React.Component {
    render() {
        return (
            <div className="zonals-footer-main-div">
                <div className="zonals-footer-address">
                    ADDRESS<br />
                    THOMSO OFFICE <br />
            MULTI ACTIVITY CENTER, <br />
            INDIAN INSTITUTE OF TECHNOLOGY, ROORKEE
            </div>
            <div className="zonals-footer-follow zonals-footer-desktop-view">
                <div className="zonals-footer-text-p">
                    FOLLOW US
                </div>
                    <div className="zonals-footer-mainIcons">
                        <div className="zonals-footer-fbdiv">  <a href="https://www.facebook.com/thomsoiitroorkee/" target="_blank" rel="noopener noreferrer"> <img src={fblogo} className="zonals-footer-iconsImage" alt="fblogo" /></a></div>
                        <div className="zonals-footer-instadiv"><a href="https://www.instagram.com/thomso.IITR/" target="_blank" rel="noopener noreferrer"><img src={inlogo} className="zonals-footer-iconsImage" alt="inlogo" /></a></div>
                        <div className="zonals-footer-ytdiv"><a href="https://www.youtube.com/user/iitrthomso" target="_blank" rel="noopener noreferrer"><img src={ytlogo} className="zonals-footer-iconsImage" alt="ytlogo" /></a></div>
                        <div className="zonals-footer-linkediv"><a href="https://www.linkedin.com/company/thomso-iit-roorkee-official" target="_blank" rel="noopener noreferrer"> <img src={iglogo} className="zonals-footer-iconsImage" alt="lilogo" /></a></div>
                    </div> 
                </div>
            <div className="zonals-footer-contact">
                CONTACT
            </div>
            </div>
        );
    }
}

