import React, { Component } from 'react';
import DelhiOpening from './DelhiOpening.jsx';
import SectionSecond from '../common/SectionSecond';
import { SectionsContainer, Section } from 'react-fullpage';
export default class DelhiIndex extends Component {
    constructor()
    {
        super();
    }
    render() {
        let options = {
            sectionClassName: 'section',
            anchors: ['home', 'aboutUs', 'footfall', 'celebrity', 'contactUs'],
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
                    <DelhiOpening />
                </Section>
                     <SectionSecond /> 
                <Section>
                </Section>

            </SectionsContainer>
        );
    }
}
