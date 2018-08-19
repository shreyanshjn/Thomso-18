import React from 'react';

import { firebaseInit } from '../../utils/firebasePush';

import './Notification.css';


export default class FakeNotification extends React.Component{
  constructor() {
    super();
    this.state = {
      show: false
    };
  }

  componentWillMount() {
    if (!("Notification" in window)) {
      console.log("This browser does not support system notifications");
    } else if (Notification.permission === "granted") {
      firebaseInit();
    } else if (Notification.permission === "default") {
      this.setState({show: true})
    }
  }

  render(){
    return(
      <div>
        {this.state.show ?
          <div className="notification-div-O">
            <div className="notification-div-S"><img src="" alt="hello"/></div>
            <div className="notification-div-C">
              <div className="notification-div-T">
                <h1>Notification</h1><p> Press 'Allow' to continue </p>
              </div>
              <div className="notification-div-A">
                <button type="button" className="notification-div-B1" onClick={() => this.setState({show: false})}>Deny</button>
                <button type="button" className="notification-div-B2" onClick={() => {
                  this.setState({show: false})
                  firebaseInit()
                  }}>Allow</button>
              </div>
            </div>
        </div>
        : null
      }
    </div>
  );
  }
}
