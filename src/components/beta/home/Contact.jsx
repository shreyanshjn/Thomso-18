import React, { Component } from 'react';
import './src/css/Contact.css'; 
class Contact extends Component {
    render() {
        return (
            <div className="contactMain">
                <div className="contactus">
                    <h1 className="top">Contacts</h1>
                    <table>
                        <tbody>
                            <tr>
                                <td>Suyash Singh </td>
                                <td>: +91-8417954805</td> 
                            </tr>
                            <tr >
                                <td>(Convener)  </td>
                                <td>&nbsp;&nbsp; suyash.thomso@gmail.com</td>
                            </tr>
                            <tr><td>&nbsp;</td></tr>

                            <tr>
                                <td>Abhishek Kumar  </td>
                                <td>: +91-7979071260 </td>
                            </tr>
                            <tr>
                                <td>(Co-Convener)   </td>
                                <td>&nbsp;&nbsp; abhishek98.thomso@gmail.com</td>
                            </tr>
                            <tr><td>&nbsp;</td></tr>
                            <tr>
                                <td>Samarth Gubrele </td>
                                <td>: +91-8349146260 </td>
                            </tr>
                            <tr>
                                <td>(Co-Convener)   </td>
                                <td>&nbsp;&nbsp; samarth.thomso@gmail.com</td>
                            </tr>
                            <tr><td>&nbsp;</td></tr>
                            <tr>
                                <td>Shubham Jaiswal </td>
                                <td>: +91-9693482762 </td>
                            </tr>
                            <tr>
                                <td>(Public Relations)</td>
                                <td>&nbsp;&nbsp; shubham.thomso@gmail.com</td>
                            </tr>
                        </tbody> 
                    </table>
                </div>
                <div className="address" style={{ lineHeight: '2.5em' }}>
                    <h1 className="top">Address</h1>
                    Thomso Office<br/>
                    Multi Activity Center,<br/>
                    Indian Institute of Technology, Roorkee<br/>
                <div className="email"> <h1>Email </h1>
                    thomso@iitr.ac.in
                </div>
                </div>
            </div>
        );
    }
}

export default Contact;
