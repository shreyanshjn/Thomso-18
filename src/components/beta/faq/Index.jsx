import React from 'react';
import "./faq.css";
import Navbar from '../home/Navbar';
export default class FAQIndex extends React.Component{
    render(){
        return (
          
            <div className="faqindexcontainer">
            <div className="faqnavbarstyle">
            <Navbar/>
            </div>
           <div className="faqcontent-main-div"> 
                <h1 className="faqindexcontainerh1">Frequently Asked Questions</h1>
                <div className="faqcontent">
                    <dl className="faqcontentdl">
                        <dt>Are there any EXTRA CHANGES for pronites?</dt>
                        <dd> <p><strong>NO</strong>, Registration fee is inclusive of pronites passes..</p></dd>

                        <dt>Where to REGISTER for Thomso’18?</dt>
                        <dd> <p>You can register at <a href="www.thomso.in">www.thomso.in</a></p></dd>

                        <dt>What is the LAST DATE for registration?</dt>
                        <dd> <p> As such there is no last date for registration but there are limited entries, so register as soon as possible.</p></dd>

                        <dt>How to reach IIT Roorkee?</dt>
                        <dd> <p> Visit<a href="https://www.iitr.ac.in/institute/pages/How_to_reach_IIT_Roorkee.html"> https://www.iitr.ac.in/institute/pages/How_to_reach_IIT_Roorkee.html for complete details.</a></p></dd>

                        <dt>What is the REGISTRATION FEE for Thomso’18?</dt>
                        <dd> <p> Registration fee with accommodation is Rs. 2000 and Rs. 1500 without accommodation. Once paid, fee is non-refundable.</p></dd>

                        <dt>What is the DATE of Thomso’18?</dt>
                        <dd> <p> Thomso is from 26th to 28th October.</p></dd>

                        <dt> From where we can get information for events for Thomso’18?</dt>
                        <dd> <p> <a href="www.thomso.in/events"> Visit www.thomso.in/events for details of all the events and their registration.</a></p></dd>

                         <dt>What is the THEME of Thomso’18?</dt>
                        <dd> <p> Theme of Thomso’18 is “Seized By Stardust”.</p></dd>
                        
                        <dt>From where I can get the latest updates related to Thomso’18?</dt>
                        <dd> <p> You can get latest updates from our Facebook page <a href="www.facebook.com/thomsoiitroorkee/">www.facebook.com/thomsoiitroorkee/</a> .</p></dd>
                        
                        <dt>Are there extra charges for workshops?</dt>
                        <dd> <p> Yes. Visit <a href="http://thomso.in/workshop">http://thomso.in/workshop </a>for more details.</p></dd>

                        <dt>What’s the climate like? Do I need to bring some winter clothes now?</dt>
                        <dd> <p>The climate during the last week of October is usually chilly with some rainfall likely to
                                occur. Hence some winter clothes will be required.
                        </p></dd>

                        <dt>How do I get to Roorkee?</dt> 
                        <dd> <p>
                            By Airways<br/><br/>
                            The nearest airport to Roorkee is situated in Dehradun, around 70km away, so one
                            could easily take a taxi or bus to reach Roorkee.<br/><br/>
                            By Railways<br/><br/>
                            Trains are one of the easiest ways through which we could reach Roorkee, especially
                            for a long distance journey.<br/><br/>
                            By Bus<br/><br/>
                            Buses can be obtained either from I.S.B.T. Kashmiri Gate, Delhi or from I.S.B.T.
                            Anand Vihar Ghaziabad. A taxi is also an option of course, but you should be warned
                            that the road isnt exactly an expressway.
                        </p></dd>
                                                       
                        <dt>How to reach IIT Roorkee?</dt> 
                        <dd> <p>Once you reached Roorkee, you can easily take an E-rickshaw, the bus station is
                                just 1 km away whereas railway station is just 3 km away from the main gate of IIT
                                Roorkee.
                        </p></dd>
                        
                        <dt>Is personal vehicle allowed inside the campus?</dt>
                        <dd>No, personal vehicles are not allowed inside the campus</dd>

                         <dt>Will there be accommodation facility for me?</dt>
                           <dd> There are many Hostels which would be available for the accommodation, the
                            registration for allotment would be done on Thomso website.
                            </dd>

                    </dl>    
                   </div>     
                </div>
            </div>
        )
    }
}
