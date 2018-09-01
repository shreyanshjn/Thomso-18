import React from 'react';
import Navbar from '../home/Navbar';
import { Link } from 'react-router-dom';
import './faq.css';
export default class FAQIndex extends React.Component {
    render() {
        return (
            <div className="faq-index-container">
                <div className="faq-navbar-style">
                    <Navbar />
                </div>
                <div className="faq-content-main-div">
                    <div className="faq-content-main-div-heading">
                        <h1>Frequently Asked Questions</h1>
                    </div>
                    <div className="faq-content">
                        <div className="faq-content-child">
                            <div className="question"><div className="dot"></div>Are there any EXTRA CHANGES for pronites?</div>
                            <div> <p><strong>NO</strong>, Registration fee is inclusive of pronites passes..</p></div>

                            <div className="question"><div className="dot"></div>Where to REGISTER for Thomso’18?</div>
                            <div>
                                <p>You can register at
                                    <div>
                                        <Link to="/main/">www.thomso.in</Link>
                                    </div>
                                </p>
                            </div>

                            <div className="question"><div className="dot"></div>What is the LAST DATE for registration?</div>
                            <div> <p> As such there is no last date for registration but there are limited entries, so register as soon as possible.</p></div>

                            <div className="question"><div className="dot"></div>How to reach IIT Roorkee?</div>
                            <div>
                                <p>
                                    Visit
                                    <div className="faq-anchor">
                                        <a href="https://www.iitr.ac.in/institute/pages/How_to_reach_IIT_Roorkee.html"> https://www.iitr.ac.in/institute/pages/How_to_reach_IIT_Roorkee.html for complete details.
                                      </a>
                                    </div>
                                </p>
                            </div>

                            <div className="question"><div className="dot"></div>What is the REGISTRATION FEE for Thomso’18?</div>
                            <div> <p> Registration fee with accommodation is Rs. 2000 and Rs. 1500 without accommodation. Once paid, fee is non-refundable.</p></div>

                            <div className="question"><div className="dot"></div>What is the DATE of Thomso’18?</div>
                            <div> <p> Thomso is from 26th to 28th October.</p></div>

                            <div className="question"><div className="dot"></div> From where we can get information for events for Thomso’18?</div>
                            <div>
                                <p>
                                    <div className="faq-anchor">
                                        <a href="www.thomso.in/events"> Visit www.thomso.in/events for details of all the events and their registration.
                                    </a>
                                    </div>
                                </p>
                            </div>

                            <div className="question"><div className="dot"></div>What is the THEME of Thomso’18?</div>
                            <div> <p> Theme of Thomso’18 is “Seized By Stardust”.</p></div>

                            <div className="question"><div className="dot"></div>From where I can get the latest updates related to Thomso’18?</div>
                            <div> <p> You can get latest updates from our Facebook page
                                <div className="faq-anchor">
                                    <a href="www.facebook.com/thomsoiitroorkee/">www.facebook.com/thomsoiitroorkee/</a> .
                                </div>
                            </p></div>

                            <div className="question"><div className="dot"></div>Are there extra charges for workshops?</div>
                            <div>
                                <p> Yes. Visit
                                    <div className="faq-anchor">
                                        <a href="http://thomso.in/workshop">http://thomso.in/workshop </a>for more details.
                                    </div>
                                </p>
                            </div>

                            <div className="question"><div className="dot"></div>What’s the climate like? Do I need to bring some winter clothes now?</div>
                            <div> <p>The climate during the last week of October is usually chilly with some rainfall likely to
                                    occur. Hence some winter clothes will be required.
                        </p></div>

                            <div className="question"><div className="dot"></div>How do I get to Roorkee?</div>
                            <div> <p>
                                By Airways<br /><br />
                                The nearest airport to Roorkee is situated in Dehradun, around 70km away, so one
                            could easily take a taxi or bus to reach Roorkee.<br /><br />
                                By Railways<br /><br />
                                Trains are one of the easiest ways through which we could reach Roorkee, especially
                            for a long distance journey.<br /><br />
                                By Bus<br /><br />
                                Buses can be obtained either from I.S.B.T. Kashmiri Gate, Delhi or from I.S.B.T.
                                Anand Vihar Ghaziabad. A taxi is also an option of course, but you should be warned
                                that the road isnt exactly an expressway.
                        </p></div>

                            <div className="question"><div className="dot"></div>How to reach IIT Roorkee?</div>
                            <div> <p>Once you reached Roorkee, you can easily take an E-rickshaw, the bus station is
                                    just 1 km away whereas railway station is just 3 km away from the main gate of IIT
                                    Roorkee.
                        </p></div>

                            <div className="question"><div className="dot"></div>Is personal vehicle allowed inside the campus?</div>
                            <div>No, personal vehicles are not allowed inside the campus</div>

                            <div className="question"><div className="dot"></div>Will there be accommodation facility for me?</div>
                            <div> There are many Hostels which would be available for the accommodation, the
                             registration for allotment would be done on Thomso website.
                            </div>

                        </div>
                    </div>
                </div>
            </div >
        )
    }
}
