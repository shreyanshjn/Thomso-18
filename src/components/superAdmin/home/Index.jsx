import React from 'react';

import AuthService from '../../../handlers/superAdmin/AuthService';

export default class HomeIndex extends React.Component {
    constructor() {
        super();
        this.state = {
        };
        this.Auth = new AuthService();
    }

    render() {
      return (
        <div>
        </div>
      );
    }
  }
  
