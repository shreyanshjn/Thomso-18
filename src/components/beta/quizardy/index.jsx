import React from 'react';
import { SectionsContainer, Section } from 'react-fullpage';
import './quizardy.css';
import arrow from '../home/src/img/arrow.svg';
import Instructions from './Instructions';
import Footer from './Footer';
export default class QuizardyIndex extends React.Component{
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



          <SectionsContainer {...options}>
              <Section>
                  <div className="quizardy-parent">
                  <div className="quizardy-child">
                              <div className="body">
                                      <div className="arrowmove">
                                          <a href="#aboutUs" address="true">
                                              <img src={arrow} className="quizardy-opening-downarrow" alt=
                                                  "a" />
                                          </a>
                                      </div>
                                      <a href="https://dare2compete.com/o/quizardry-thomso-iit-roorkee-indian-institute-of-technology-iit-roorkee-64347" target="_blank"><button className="quizardy-button quizardy-opening-button">REGISTER</button></a>
                              </div>
                  </div>
                </div>
              </Section>

              <Section>
                <div className="quizardy-parent-body">
                  <Instructions />
                  <Footer />
                </div>
              </Section>
          </SectionsContainer>


    </div>
  );
  }
}
