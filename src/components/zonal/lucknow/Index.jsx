import React, { Component } from 'react';
import LucknowOpening from './LucknowOpening.jsx';
import SectionSecond from '../common/SectionSecond';
import { SectionsContainer, Section } from 'react-fullpage';
import Footer from '../common/Footer';
import ZonalsForm from '../common/ZonalsForm';

export default class LucknowIndex extends Component {
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
                        <LucknowOpening />
                    </div>
                </Section>
                <Section>
                    <SectionSecond /> 
                </Section>
                <Section>
                    <ZonalsForm />
                    <Footer />
                </Section>
        </SectionsContainer>
        );
    }
}
