import React from 'react';
import Wisca from '../../ca/login/Wisca.jsx';
import Roles from '../../ca/login/Roles.jsx';
import Contact from '../../ca/login/Contact.jsx';
import { Link } from 'react-router-dom' ;
import CalandingNavbar from "../../ca/login/CaLanding";
import { SectionsContainer, Section } from 'react-fullpage';
import arrow from '../../ca/login/src/img/arrow.svg';
import '../../ca/login/src/css/Main.css';
export default class CampusIndex extends React.Component {
    render() {
        let options = {
            sectionClassName: 'section',
            anchors: ['home', 'Wisca', 'Roles', 'Contact'],
            delay: 1000,
            scrollBar: false,
            navigation: false,
            verticalAlign: false,
            sectionaddingTop: '0px',
            slidesNavPosition: 'bottom',
            arrowNavigation: true,
        };
        return (
            <div className="ca-opening-middlesection">
                <CalandingNavbar className={(window.location.hash === "#Wisca" || window.location.hash === "#Roles" || window.location.hash === "#Contact") ? 'ca-landing-heading ca-landing-heading-dark' : 'ca-landing-heading'} />
                <SectionsContainer {...options}>
                    <div className="ca-opening-child-middle">
                        <Section>
                            <div className="ca-opening-button-parent">
                                <Link to="/CampusAmbassador/register">
                                    <button className="ca-opening-button">Register</button>
                                </Link>
                                <div>
                                    <a href="#Wisca" address="true">
                                        <img src={arrow} className="ca-opening-downarrow" alt=
                                            "a" />
                                    </a>
                                </div>
                            </div>
                        </Section>
                    </div>
                    <div className="Ca-login-Section-Parent">
                        <Section>
                            <Wisca />
                        </Section>
                    </div>
                    <div className="Ca-login-Section-Parent">
                        <Section>
                            <Roles />
                        </Section>
                    </div>
                    <div className="Ca-login-Section-Parent">
                        <Section>
                            <Contact />
                        </Section>
                    </div>
                </SectionsContainer>
            </div>
        );
    }
}
