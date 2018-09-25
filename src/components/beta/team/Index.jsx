import React from 'react';
import './cards.css';
import logo from './anushka.jpg';
import fblogo from './img/fbicon.png';
import inlogo from './img/igicon.png';
export default class TeamIndex extends React.Component{
    render(){
        return (
            <div>
            <div className="card-maindiv">
                <div className="wrapper">
                    <div className="card-inner">
                        <img src={logo} alt="aaa"/>
                        <div className="text">Anushka Sharma</div>
                        <div className="overlay">
                            <div className="info">email<br/>aaaaaaaaaa<br/>Contact<br/>8888888888</div>
                            <div className="card-footer-mainIcons">
                            <div className="card-footer-fbdiv">  <a href="https://www.facebook.com/thomsoiitroorkee/" target="_blank" rel="noopener noreferrer"> <img src={fblogo} className="card-footer-iconsImage" alt="fblogo" /></a></div>
                            <div className="card-footer-instadiv"><a href="https://www.instagram.com/thomso.IITR/" target="_blank" rel="noopener noreferrer"><img src={inlogo} className="card-footer-iconsImage" alt="inlogo" /></a></div>
                       
                    </div> 
                        </div>
                    </div>


                    <div className="card-inner">
                    </div>
                    <div className="card-inner">
                    </div>
                </div>
                <div className="wrapper">
                    <div className="card-inner">
                    </div>
                    <div className="card-inner">
                    </div>
                    <div className="card-inner">
                    </div>
                </div>
                <div className="wrapper">
                    <div className="card-inner">
                    </div>
                    <div className="card-inner">
                    </div>
                    <div className="card-inner">
                    </div>
                </div>
            </div>
            </div>
        )
    }
}
