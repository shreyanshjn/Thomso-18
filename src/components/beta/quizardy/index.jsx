import React from 'react';

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

    render(){

        return(
            <div>
                <div className="quizardy-mobile">
                    <Navbar />
                </div>
                        <div className="quizardy-parent">
                        <Navbar />
                            <div className="quizardy-child">
                                    <div className="quizardy-flexcenter">
                                        <a href="https://dare2compete.com/o/quizardry-thomso-iit-roorkee-indian-institute-of-technology-iit-roorkee-64347" target="_blank" rel="noopener noreferrer"><button className="quizardy-button quizardy-opening-button">Dare2Complete</button></a>
                                    </div>
                            </div>
                        </div>
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

            </div>
        );
    }
}
