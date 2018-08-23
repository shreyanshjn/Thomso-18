import React, { Component } from 'react';
import DelhiOpening from './DelhiOpening.jsx';
import SectionSecond2 from '../common/SectionSecond2';
import Footer from '../common/Footer';
import ZonalsFormDelhi from '../common/ZonalsFormDelhi';
import Popup from '../../common/popup/Index';

export default class DelhiIndex extends Component {
    render() {
        return (
            <div>
                <Popup {...this.props} onRef={ref => (this.popup = ref)} />
                <div style={{ overflow: 'hidden' }}>
                    <DelhiOpening />
                </div>
                <SectionSecond2 city='delhi' />
                <ZonalsFormDelhi showModal={() => this.popup.show(['Congratulations!', `You have been successfully registered for Thomso18 Karwan.`, `Confirmation email has been sent to your inbox`])} />
                <Footer city='delhi' />
            </div>
        );
    }
}
