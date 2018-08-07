import React from 'react';
import { SectionsContainer, Section } from 'react-fullpage';
import './quizardy.css';
import arrow from '../home/src/img/arrow.svg';
import Instructions from './Instructions';
import Footer from './Footer';
import Navbar from '../home/Navbar';
import './Index.css';
export default class QuizardyIndex extends React.Component{
    constructor() {
        super();
        this.state={
            isNavbar:true

        }
    }
    componentWillMount() {
        window.location.hash = "#home";
    }
    render(){
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
        return(
            <div>
                <div className="quizardy-mobile">
                    <Navbar />
                </div>
                <SectionsContainer {...options}>
                    <Section>
                        <div className="quizardy-parent">
                            <div className="quizardy-child">
                                <div className="body">
                                    <div className="quizardy-flexcenter">
                                        <a href="https://dare2compete.com/o/quizardry-thomso-iit-roorkee-indian-institute-of-technology-iit-roorkee-64347" target="_blank" rel="noopener noreferrer"><button className="quizardy-button quizardy-opening-button">Dare2Complete</button></a>
                                        <a href="#aboutUs" address="true">
                                            <img src={arrow} className="quizardy-opening-downarrow" alt="a" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Section>

                    <Section>
                        <div>
                        <div className='quizardy-desktop'>
                            <Navbar />
                        </div>
                        <div className="quizardy-parent-body">
                          <div className="quizardy-parent-innerbody">
                            <Instructions />
                            <Footer />
                          </div>
                        </div>
                        </div>
                    </Section>
                </SectionsContainer>
            </div>
        );
    }
}
