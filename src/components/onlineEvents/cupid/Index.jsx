import React, { Component } from 'react'
import Navbar from '../../beta/home/Navbar.jsx'
import './src/css/CupidIndex.css'
import cupid from './src/img/cupid.jpg'

class CupidIndex extends Component {
    render() {
        return (
            <div>
                <Navbar background="true"/>
                <div className="cupid-image">
                    <div>
                        <img className="cupid-image-child" src={cupid} alt="cupid-poster" />
                    </div>
                </div>
            </div>
        )
    }
}

export default CupidIndex
