import React from 'react';
import $ from 'jquery'
import AuthService from '../../../../handlers/ca/admin/AuthService';
import FetchApi from '../../../../utils/FetchAPI';

export default class DataTable extends React.Component {
    //  blockHandler=element=>{
    //    if (element.fb_id) {
    //     // console.log(element.fb_id);
    //     // If response
    //    }
    // }

    constructor() {
        super();
        this.state = {
            participants: [],
            message: '',
        };
        this.Auth = new AuthService();
        this.handleFilter = this.handleFilter.bind(this);
    }

    componentDidMount() {
        const authtoken = this.Auth.getToken();
        FetchApi('GET','/api/ca/admin/participants', null, authtoken)
            .then((result) => {
                console.log(result.data[0].name, 'Participant List')
                this.setState({ participants: result.data });
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
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        });
    }
    

    render() {
      var data  = this.state.participants;
      return (
        <div>
            <div>
                <input id="myInput" type="text" onChange={(e) => this.handleFilter(e)} placeholder="Search Projects.." />
            </div>
            <table>
                <thead>
                    <tr>
                        <th style={{width:"14vw"}}>Name</th>
                        <th style={{width:"14vw"}}>College</th>
                        <th style={{width:"14vw"}}>Email</th>
                        <th style={{width:"14vw"}}>Branch</th>
                        <th style={{width:"14vw"}}>Block</th>
                        <th style={{width:"14vw"}}>FB ID</th>
                        <th style={{width:"14vw"}}>Gender</th>
                    </tr>
                </thead>
                <tbody id="myTable">
                    {data.map((data,i)=> {
                        return(
                            <tr key="i">
                                <td>{data.name}</td>
                                <td>{data.college}</td>
                                <td>{data.email}</td>
                                <td>{data.branch}</td>
                                <td>{data.blocked}</td>
                                <td>{data.fb_id}</td>
                                <td>{data.gender}</td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>
        </div>
      );
    }
  }
  