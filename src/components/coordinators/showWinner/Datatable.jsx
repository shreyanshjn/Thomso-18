import React from 'react';
import Row from './Row';

export default class DataTable extends React.Component {

    render() {
      return (
        <div>
            <table style={{borderCollapse: 'collapse'}}>
                <thead>
                    <tr>
                        <th style={{width:"7vw"}}>THomso ID</th>
                        <th style={{width:"10vw"}}>Name</th>
                        <th style={{width:"15vw"}}>College</th>
                        <th style={{width:"10vw"}}>Email</th>
                        <th style={{width:"7vw"}}>Gender</th>
                        <th style={{width:"7vw"}}>Event Name</th>
                        <th style={{width:"10vw"}}>Position</th>
                        <th style={{width:"15vw"}}>Account Number</th>
                        <th style={{width:"10vw"}}>IFSC Code</th>
                        <th style={{width:"10vw"}}>Bank Name</th>
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
  
