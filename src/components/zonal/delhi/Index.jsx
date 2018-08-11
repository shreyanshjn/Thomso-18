import React, { Component } from 'react';
import DelhiOpening from './DelhiOpening.jsx';
import SectionSecond from '../common/SectionSecond';
import { SectionsContainer, Section } from 'react-fullpage';
import ZonalsFooter from '../common/zonalsregistration';
import Footer from '../common/Footer';
export default class DelhiIndex extends Component {
    render() {
        let options = {
            sectionClassName: 'section',
            anchors: ['home', 'about', 'register'],
            scrollBar: false,
            navigation: false,
            verticalAlign: false,
            sectionPaddingTop: '0px',
            slidesNavPosition: 'bottom',
            arrowNavigation: true
        };
        return (
            <SectionsContainer {...options}>
                <Section>
                    <div style={{overflow:'hidden'}}>
                        <DelhiOpening />
                    </div>
                </Section>
                <Section>
                    <SectionSecond /> 
                </Section>
                <Section>
                    <ZonalsFooter />
                    <Footer />
                </Section>
        </SectionsContainer>
        );
    }
}
