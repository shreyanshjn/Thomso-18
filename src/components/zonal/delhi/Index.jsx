import React, { Component } from 'react';
import DelhiOpening from './DelhiOpening.jsx';
import SectionSecond from '../common/SectionSecond';
import { SectionsContainer, Section } from 'react-fullpage';
import ZonalsFooter from '../common/zonalsregistration';
export default class DelhiIndex extends Component {
    constructor()
    {
        super();
    }
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
                </Section>
                <Section>
                    <SectionSecond /> 
                </Section>
            </SectionsContainer>
        );
    }
}
