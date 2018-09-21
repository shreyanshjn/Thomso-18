import React, { Component } from 'react'
import Navbar from '../../beta/home/Navbar.jsx'
import './src/css/mrmissIndex.css'
import mrmiss from './src/img/mrmissthomso.jpg'

class MemeIndex extends Component {
    render() {
        return (
            <div>
                <Navbar background="true"/>
                <div className="mrmiss-image">
                    <div>
                        <img className="mrmiss-image-child" src={mrmiss} alt="Mr and Miss thomso poster" />
                    </div>
                </div>
            </div>
        )
    }
}

export default MemeIndex
