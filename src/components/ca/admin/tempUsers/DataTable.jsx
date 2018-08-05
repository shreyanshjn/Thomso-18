import React from 'react';
import $ from 'jquery'

import AuthService from '../../../../handlers/ca/admin/AuthService';
import FetchApi from '../../../../utils/FetchAPI';
import Row from './Row';

export default class DataTable extends React.Component {

    constructor() {
        super();
        this.state = {
            participants: [],
            message: '',
        };
        this.Auth = new AuthService();
    }

    componentDidMount() {
        const authtoken = this.Auth.getToken();
        FetchApi('GET','/api/ca/admin/tempUsers', null, authtoken)
            .then((result) => {
                console.log(result, 'Participant List')
                if (result && result.data) {
                    this.setState({ participants: result.data });
                }
            })
            .catch(error => {
                if(error.response && error.response.status === 401) {
                    this.setState({ message: 'Token Expired' });
                    this.props.history.push('/ca/admin/logout');
                } else {
                    this.setState({ message: 'Unable to connect to the server' });
                }
            });
    }

    handleFilter(e){
        e.preventDefault();
        $("#myInput").on("keyup", function() {
            var value = $(this).val().toLowerCase();
            $("#myTable tr").filter(function() {
                return $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        });
    }
    

    render() {
      let data  = this.state.participants;
      console.log(data);
      return (
        <div>
            {this.state.message}
            <div>
                <input id="myInput" type="text" onChange={(e) => this.handleFilter(e)} placeholder="Type here to search..." />
            </div>
            <table>
                <thead>
                    <tr>
                        <th style={{width:"10vw"}}>Name</th>
                        <th style={{width:"5vw"}}>Gender</th>
                        <th style={{width:"13vw"}}>Email</th>
                        <th style={{width:"5vw"}}>Mobile</th>
                        <th style={{width:"10vw"}}>Branch</th>
                        <th style={{width:"12vw"}}>College</th>
                        <th style={{width:"8vw"}}>State</th>
                        <th style={{width:"17vw"}}>Address</th>
                        <th style={{width:"15vw"}}>Why?</th>
                    </tr>
                </thead>
                <tbody id="myTable">
                    {data.map((data,i)=> <Row key={i} data={data} />)}
                </tbody>
            </table>
        </div>
      );
    }
  }
  
