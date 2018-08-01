import React from 'react';
import './WISCA.css'
import img4 from './img/social media-01.png';
import img5 from './img/friends-01.png';
import img6 from './img/handshake-01.png';
import DivComponent1 from './component1.jsx';


export default class ROLES extends React.Component{
  render(){
    const a="Social Media Presence";
    const e="An effective Social Media marketing is the key to successful promotions. Hence, make sure we are heard. Follow us on social media and promote us extensively on online platforms";
    const b="Ground Publicity";
    const f="Participants are the lifelines for any fest. Hunt the talented folks in your college and encourage them to participate in Thomso. Also spread our word in your college by putting up posters";
    const c="Activities";
    const g="If Thomso reaches out to your college for any online or offline promotional activity, you are expected to assist us in our endeavours and ensure smooth-functioning of that event";

    return(
    <div>
      <div className="fullpage">
        <div className="MAINDIV">
          <div className="Heading">
            ROLES
          </div>
          <div className="main">
            <div className="innermain1">
                <DivComponent1 data={a} image={img4} heading={e} />
            </div>
          </div>
          <div className="main2">
            <div className="innermain1">
                <DivComponent1 data={b} image={img5} heading={f} />
            </div>
          </div>
          <div className="main2">
            <div className="innermain1">
                <DivComponent1 data={c} image={img6} heading={g} />
            </div>
          </div>
      </div>
      </div>
    </div>
  );
  }
}
