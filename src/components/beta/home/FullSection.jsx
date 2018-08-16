import React , { Component } from 'react';
import { SectionsContainer, Section } from 'react-fullpage';
import logo from './src/img/thomsomain.png';
import arrow from './src/img/arrow.svg';
import './src/css/Main.css';
import About from './About';
import Footfall from './Footfall';
import Celebrity from './Celebrity';
import Contact from './Contact';

export default class FullSection extends Component {
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
                    <div className="body">
                        <div className="imagelogo" align="center">
                            <img src={logo} alt="logo" className="mainlogo" height="200px" />
                            <div className="arrowmove">
                                <a href="#aboutUs" address="true">
                                    <img src={arrow} className="betahomedownarrow bounce" alt="a" />
                                </a>
                            </div>
                        </div>
                    </div>
                </Section>

                <Section>
                    <About />
                </Section>

                <Section>
                    <Footfall />
                </Section>

                <Section>
                    <Celebrity />
                </Section>

                <Section>
                    <Contact />
                </Section>

            </SectionsContainer>
        );
    }
}
