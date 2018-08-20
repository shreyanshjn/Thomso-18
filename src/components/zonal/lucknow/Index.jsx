import React, { Component } from 'react';
import LucknowOpening from './LucknowOpening.jsx';
import SectionSecond2 from '../common/SectionSecond2';
import Footer from '../common/Footer';
import ZonalsFormLucknow from '../common/ZonalsFormLucknow';

export default class LucknowIndex extends Component {
    render() {
        return (
            <div>
                <div style={{overflow:'hidden'}}>
                    <LucknowOpening />
                </div>
                <SectionSecond2 city='lucknow'/> 
                <ZonalsFormLucknow />
                <Footer city='lucknow' />
            </div>
        );
    }
}
