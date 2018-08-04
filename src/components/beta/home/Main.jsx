import React , { Component } from 'react';

import './src/css/Main.css';
import Footer from './Footer';
import Navbar from './Navbar';
import FullSection from './FullSection';

export default class Main extends Component {
    render() {
        return (
            <div className="middlesection">
                <Navbar />
                <FullSection />
                <Footer />
            </div>
        );
    }
}
