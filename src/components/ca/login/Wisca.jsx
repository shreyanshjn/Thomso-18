import React from "react";
import './Wisca.css'
import LoginDivCompo from './LoginDivCompo.jsx';
import img1 from './img/certi-01.png';
import img2 from './img/ticket-01.png';
import img3 from './img/tshirt-01.png';
import img4 from './img/gift-01.png';
import img5 from './img/medal-01.png';
import img6 from './img/social media-01.png';
export default class Wisca extends React.Component{
  render(){
    let a="Certificate of Appreciation";
    let b="absolutely free entry to the pronities , center stage events and the workshops";
    let c="Grab the offical Thomso'18 Merchandise";
    let d="Receive goodies from our sponsorship partners";
    let e="Oppurtunity to get featured on our website";
    let f="Internship courses and certificates";
    return(
    <div className="Login-Wisca-fullpage">
      <div className="Login-Wisca-MAINDIV">

                <div className="Login-Wisca-Heading">
                  WHY BECOME CA?
                </div>
                <div className="Login-Wisca-main">
                  <div className="Login-Wisca-innermain1">
                      <LoginDivCompo data={a} image={img1}/>
                  </div>
                  <div className="Login-Wisca-innermain2">
                      <LoginDivCompo data={b} image={img2}/>
                  </div>

                </div>

                <div className="Login-Wisca-main2">
                  <div className="Login-Wisca-innermain1">
                      <LoginDivCompo data={c} image={img3}/>
                  </div>
                  <div className="Login-Wisca-innermain2">
                      <LoginDivCompo data={d} image={img4}/>
                  </div>
                </div>

                <div className="Login-Wisca-main2">
                  <div className="Login-Wisca-innermain1">
                      <LoginDivCompo data={e} image={img5}/>
                  </div>
                  <div className="Login-Wisca-innermain2">
                      <LoginDivCompo data={f} image={img6}/>
                  </div>
                </div>
    </div>
    </div>
  );
  }
}
