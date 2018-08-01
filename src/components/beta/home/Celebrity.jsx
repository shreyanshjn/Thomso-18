import React, { Component } from 'react';
import nucleya from './src/img/nucleya-01.jpg';
import farhan  from './src/img/farhan-01.jpg';
import sunidhi from './src/img/sunidhi-01.jpg';
import './src/css/Celebrity.css';
class Celebrity extends Component {
    constructor(props)
    {
        super(props);
        this.state=
        {
            farhan:true,
            nucleya:false,
            sunidhi:false
        }
    }
    render() {
        return (
            <div className="celebrityMain">
                <div className="hoverEffect">
                    <img src={farhan} alt="farhan" className="celebImage"/>
                    <p className="farhan">FARHAN AKHTAR</p>
                    <div className="middle">
                        <div className="text">"I have done a lot of shows.This is one of those that  I'd remember for a lifetime."</div>
                    </div>
                </div>
                <div className="hoverEffect">
                    <img src={nucleya} alt="nucleya" className="celebImage"/>
                    <p className="nucleya">NUCLEYA</p>
                    <div className="middle">
                            <div className="text">"The energy of the crowd kept me charged. Loved the electrifying atmosphere of IIT roorkee"</div>
                    </div>

                </div> 
                <div className="hoverEffect"> 
                    <img src={sunidhi} alt="sunidhi" className="celebImage"/>
                    <p className="sunidhi">Sunidhi Chauhan</p>
                    <div className="middle">
                            <div className="text">"It was a lovely experience.The crowd was great."</div>
                    </div>


                </div> 
            </div>
        );
    }
}

export default Celebrity;
