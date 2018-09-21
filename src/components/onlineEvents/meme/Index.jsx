import React, { Component } from 'react'
import Navbar from '../../beta/home/Navbar.jsx'
import './src/css/MemeIndex.css'
import meme from './src/img/meme.jpg'

class MemeIndex extends Component {
    render() {
        return (
            <div>
                <Navbar background="true"/>
                <div className="meme-image">
                    <div>
                        <img className="meme-image-child" src={meme} alt="meme-poster" />
                    </div>
                </div>
            </div>
        )
    }
}

export default MemeIndex
