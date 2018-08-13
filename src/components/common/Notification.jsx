import React from 'react';
import './Notification.css';


export default class Notification extends React.Component{
  render(){
    return(
    <div>
      <div className="Notification-div-O">
            <div className="Notification-div-S"><img src="" alt="hello"/></div>
            <div className="Notification-div-C">
              <div className="Notification-div-T">
                <h1>Notification</h1><p> Press 'Allow' to continue </p>
              </div>
              <div className="Notification-div-A">
                <button type="button" className="Notification-div-B1">Deny</button>
                <button type="button" className="Notification-div-B2">Allow</button>
              </div>
            </div>
      </div>
    </div>
  );
  }
}
