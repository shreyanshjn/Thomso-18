import React, { Component } from 'react';
import DelhiOpening from './DelhiOpening.jsx';
import SectionSecond2 from '../common/SectionSecond2';
import Footer from '../common/Footer';
import ZonalsFormDelhi from '../common/ZonalsFormDelhi';

export default class DelhiIndex extends Component {
    render() {
        return (
            <div>
                <div style={{overflow:'hidden'}}>
                    <DelhiOpening />
                </div>
                <SectionSecond2 city='delhi' /> 
                <ZonalsFormDelhi />
                <Footer city='delhi' />
            </div>
        );
    }
}
