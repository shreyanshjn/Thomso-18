import React , { Component } from 'react';
import {SectionsContainer, Section} from 'react-fullpage';
import logo from './src/img/thomso main-01.png';
import arrow from './src/img/arrow.svg';
import './src/css/Main.css';
import Footer from './Footer';
import Navbar from  './Navbar';

export default class Main extends Component{
  render(){
    let options = {
      sectionClassName:     'section',
      anchors:              ['sectionOne', 'sectionTwo', 'sectionThree'],
      scrollBar:            false,
      navigation:           false,
      verticalAlign:        false,
      sectionPaddingTop:    '0px',
      sectionPaddingBottom: '50px',
      slidesNavPosition: 'bottom',
      arrowNavigation:      true
    };
    return(
      <div className="middlesection">
              <Navbar />
          <SectionsContainer {...options}>
          <Section>
                <div className="body">
                    <div className="imagelogo" align="center">
                  <img src={logo} height="200px"/>
                 <div class="arrowmove">
                  <a href="#sectionTwo" address="true">
                      <img src={arrow} className="downarrow bounce" alt=
                      "a"/>
                  </a>
                 </div>
              </div>
                </div>
          </Section>
          
          <Section>
                <div id="arrow">
                page2
                <img src={logo} height="250px"/>
                </div>
          </Section>
          <Section>Page 3</Section>
      </SectionsContainer>
                <Footer />
      </div>
  );
  }
}
