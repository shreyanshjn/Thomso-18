import React, { Component } from 'react';
import DelhiOpening from './DelhiOpening.jsx';
import SectionSecond from '../common/SectionSecond';
import Footer from '../common/Footer';
import ZonalsForm from '../common/ZonalsForm';
export default class DelhiIndex extends Component {
		render() {
		return (
                    <div>
                        <div style={{overflow:'hidden'}}>
                            <DelhiOpening />
                </div>
                <SectionSecond /> 
                <ZonalsForm />
                <Footer />
            </div>
        );
    }
}
