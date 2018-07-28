import React, { Component } from 'react';
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
                    <p className="farhan">FARHAN AKHTAR</p>
                </div> 
                <div className="box">
                    <p className="nucleya">NUCLEYA</p>
                </div> 
                <div className="box">
                    <p className="sunidhi">SUNIDHI CHAUHAN</p>
                </div> 
            </div>
        );
    }
}

export default Celebrity;

