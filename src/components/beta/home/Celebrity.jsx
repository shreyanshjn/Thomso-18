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
                <div className="box">
                    <img src={farhan} alt="farhan" className="celebImage"/>
                    <p className="farhan">FARHAN AKHTAR</p>
                </div> 
                <div className="box">
                    <img src={nucleya} alt="nucleya" className="celebImage"/>
                    <p className="nucleya">NUCLEYA</p>
                </div> 
                <div className="box">
                    <img src={sunidhi} alt="sunidhi" className="celebImage"/>
                    <p className="sunidhi">SUNIDHI CHAUHAN</p>
                </div> 
            </div>
        );
    }
}

export default Celebrity;

