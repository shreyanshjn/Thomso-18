import React from 'react';
import $ from 'jquery'

import AuthService from '../../../../handlers/ca/admin/AuthService';
import FetchApi from '../../../../utils/FetchAPI';
import Row from './Row';
// import FetchDb from '../../../../utils/FetchDb';
// var fs = require('fs');
// var csv_export=require('csv-export');
// var csv2json = require('csv2json');




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
        this.handleDownload = this.handleDownload.bind(this);
    }

    componentDidMount() {
        const authtoken = this.Auth.getToken();
        FetchApi('GET','/api/ca/admin/participants', null, authtoken)
            .then((result) => {
                console.log(result, 'Participant List')
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

    // convertAndDownloadCsv = function (data) {
    //     if (data && data.length > 0) {
    //         var csvData = csv2json.csvProcessor({
    //             data: data,
    //             quotes: '',
    //             del: ';'
    //         });
    //         var filename = "participants.csv";
    //         var blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    //         if (navigator.msSaveBlob) {
    //             navigator.msSaveBlob(blob, filename);
    //         } else {
    //             var link = document.createElement("a");
    //             if (link.download !== undefined) {
    //                 var url = URL.createObjectURL(blob);
    //                 link.setAttribute("href", url);
    //                 link.setAttribute("download", filename);
    //                 link.style.visibility = 'hidden';
    //                 document.body.appendChild(link);
    //                 link.click();
    //                 document.body.removeChild(link);
    //             }
    //         }
    //     }
    // }

    // handleDownload(){
    //     const authtoken = this.Auth.getToken();
    //     FetchApi('GET','/api/ca/admin/exportToCSV', null, authtoken)
    //         .then((result) => {
    //             console.log(result.data.data, 'export');
    //             var fetchedData  = result.data.data;
    //             // console.log(fetchedData);
    //             // console.log(typeof this.convertAndDownloadCsv);
    //             this.convertAndDownloadCsv(fetchedData);

    //             // csv_export.export(result.data.data,function(buffer){
    //             //     fs.writeFileSync('./data.csv',buffer);
    //             //   });
    //         })
    //         .catch(error => {
    //             if(error){
    //                 console.log(error, 'export error');
    //             }
    //         }
    //     );
    // }

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
      var data  = this.state.participants;
      console.log(data);
      return (
        <div>
            <div>
                <input id="myInput" type="text" onChange={(e) => this.handleFilter(e)} placeholder="Type here to search..." />
            </div>
            {/* <button onClick={()=>this.handleDownload()} >Download Users</button> */}
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
                    {data.map((data,i)=> <Row key={i} data={data} />)}
                </tbody>
            </table>
        </div>
      );
    }
  }
  
