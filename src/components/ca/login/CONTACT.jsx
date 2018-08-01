import React from 'react';
import './WISCA.css'
import DivComponent from './divcomponent.jsx';
export default class CONTACT extends React.Component{
  render(){

    return(
      <div>
        <div className="MAINDIV">
      <div className="Heading">
        CONTACT US
      </div>
      <div className="contactMain">

          <div className="ca-login-contactus">
              <h2 className="top">CONTACTS</h2>
              <table>
                  <tbody>
                      <tr>
                          <td>Suyash Singh </td>
                          <td>: +91-8417954805</td>
                      </tr>
                      <tr >
                          <td>(Convener)  </td>
                          <td>suyash.thomso@gmail.com</td>
                      </tr>

                      <tr>
                          <td>Abhishek Kumar  </td>
                          <td>: +91-7409247817 </td>
                      </tr>
                      <tr>
                          <td>(Co-Convener)   </td>
                          <td>abhishek98.thomso@gmail.com</td>
                      </tr>

                      <tr>
                          <td>Samarth Gubrele </td>
                          <td>: +91-8349146260 </td>
                      </tr>
                      <tr>
                          <td>(Co-Convener)   </td>
                          <td>samarth.thomso@gmail.com</td>
                      </tr>

                      <tr>
                          <td>Shubham Jaiswal </td>
                          <td>: +91-9693482762 </td>
                      </tr>
                      <tr>
                          <td>(Public Relations)</td>
                          <td>shubham.thomso@gmail.com</td>
                      </tr>
                  </tbody>
              </table>
          </div>
          <div className="address">
              <h2 className="top">ADDRESS</h2>
              Thomso Office<br/>
              Multi Activity trueCenter,<br/>
              Indian Institute of Technology, Roorkee<br/>
            <div className="email"> <h2>EMAIL </h2>
              thomso@iitr.ac.in
          </div>
          </div>
      </div>
    </div>
    </div>
      );
  }
}
