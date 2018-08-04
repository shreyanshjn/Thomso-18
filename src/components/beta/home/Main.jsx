import React , { Component } from 'react';
import { SectionsContainer, Section } from 'react-fullpage';
import logo from './src/img/thomsomain.png';
import arrow from './src/img/arrow.svg';
import './src/css/Main.css';
import Footer from './Footer';
import Navbar from './Navbar';
import About from './About';
import Footfall from './Footfall';
import Celebrity from './Celebrity';
import Contact from './Contact';
import Particles from 'react-particles-js';

export default class Main extends Component {
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
        const particleStyle = {
            position:"absolute"
        };
        return (
            <div className="middlesection">
                <Navbar />
                <Particles
                    style={particleStyle}
                    params={{
                        "particles": {
                        "number": {
                            "value": 200,
                            "density": {
                            "enable": true,
                            "value_area": 800
                            }
                        },
                        "color": {
                            "value": "#a2e7f0"
                        },
                        "shape": {
                            "type": "circle",
                            "stroke": {
                            "width": 0,
                            "color": "#000000"
                            },
                            "polygon": {
                            "nb_sides": 5
                            },
                            "image": {
                            "src": "svg/github.svg",
                            "width": 1,
                            "height": 1
                            }
                        },
                        "opacity": {
                            "value": 0.5,
                            "random": false,
                            "anim": {
                            "enable": false,
                            "speed": 1,
                            "opacity_min": 0.1,
                            "sync": false
                            }
                        },
                        "size": {
                            "value": 2.4 ,
                            "random": true,
                            "anim": {
                            "enable": false,
                            "speed": 40,
                            "size_min": 0.1,
                            "sync": false
                            }
                        },
                        "line_linked": {
                            "enable": false,
                            "distance": 150,
                            "color": "#ffffff",
                            "opacity": 0.4,
                            "width": 1
                        },
                        "move": {
                            "enable": true,
                            "speed": 1.3,
                            "direction": "none",
                            "random": true,
                            "straight": false,
                            "out_mode": "bounce",
                            "bounce": false,
                            "attract": {
                            "enable": false,
                            "rotateX": 600,
                            "rotateY": 1200
                            }
                        }
                        },
                        "interactivity": {
                            "detect_on": "window",
                            "events": {
                                "onhover": {
                                "enable": true,
                                "mode": "bubble"
                                },
                                "onclick": {
                                "enable": true,
                                "mode": "push"
                                },
                                "resize": true
                            },
                            "modes": {
                                "grab": {
                                "distance": 400,
                                "line_linked": {
                                    "opacity": 1
                                }
                                },
                                "bubble": {
                                "distance": 15,
                                "size": 2,
                                "duration": 2,
                                "opacity": 8,
                                "speed": 3
                                },
                                "repulse": {
                                "distance": 56.84540486109416,
                                "duration": 0.4
                                },
                                "push": {
                                "particles_nb": 8
                                },
                                "remove": {
                                "particles_nb": 2
                                }
                            }
                        },
                        "retina_detect": true
                    }}
                />
                <SectionsContainer {...options}>
                    <Section>
                        <div className="body">
                            <div className="imagelogo" align="center">
                                <img src={logo} alt="logo" className="mainlogo" height="200px" />
                                <div className="arrowmove">
                                    <a href="#aboutUs" address="true">
                                        <img src={arrow} className="downarrow bounce" alt=
                                            "a" />
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
                    <Contact />
                    <Section>
                    </Section>
                </SectionsContainer>
                <Footer />
            </div>
        );
    }
}
