import React from 'react';
import Row from './Row';
import $ from 'jquery'

export default class DataTable extends React.Component {
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
      return (
        <div>
            <div style={{marginTop:"25px", marginLeft:"50px"}}>
                <input id="myInput" type="text" onChange={(e) => this.handleFilter(e)} placeholder="Type here to search..." 
                style={{padding:"7px", borderRadius:"3px"}} />
            </div>
            <table style={{borderCollapse: 'collapse',marginTop:"15px"}}>
                <thead>
                    <tr>
                        <th style={{width:"10vw"}}>Enrollment Number</th>
                        <th style={{width:"10vw"}}>Name</th>
                        <th style={{width:"10vw"}}>Email</th>
                        <th style={{width:"15vw"}}>Gender</th>
                        <th style={{width:"7vw"}}>Contact</th>
                        <th style={{width:"10vw"}}>Bhawan</th>
                        <th style={{width:"15vw"}}>Branch</th>
                        <th style={{width:"10vw"}}>Year</th>
                    </tr>
                </thead>
                {(this.props.participants && this.props.participants.length > 0) ?
                    <tbody id="myTable">
                        {this.props.participants.map((data,i)=> <Row key={i} index={i} data={data} />)}
                    </tbody>
                    : null
                }
            </table>
        </div>
      );
    }
  }
  
