import React, { Component } from 'react';
import DelhiOpening from './DelhiOpening.jsx';
import SectionSecond from '../common/SectionSecond';
import Footer from '../common/Footer';
import ZonalsForm from '../common/ZonalsForm';

export default class DelhiIndex extends Component {
    render() {
        return (
            <div id="scroll">
                <div className="page" id="one-section" style={{overflow:'hidden'}}>
                    <DelhiOpening />
                </div>
                <div className="page"  id="two-section">
                    <SectionSecond /> 
                </div>
                <div  className="page" id="three-section">
                    <ZonalsForm />
                </div>
                <Footer />
            </div>
        );
    }
}
