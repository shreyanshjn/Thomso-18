import React from 'react';
export default class Row extends React.Component {
    render(){
        return (
            <React.Fragment>
                {this.props.data ? 
                    <tr style={{border: 'solid 1px black'}}>
                        <td style={{textAlign: 'center'}}>{this.props.data.thomso_id ? this.props.data.thomso_id : '--'}</td>
                        {/* <td style={{textAlign: 'center'}}>{this.props.data.name ? this.props.data.name : '--'}</td> */}
                        {/* <td style={{textAlign: 'center'}}>{this.props.data.college ? this.props.data.college : '--'}</td> */}
                        {/* <td style={{textAlign: 'center'}}>{this.props.data.email ? this.props.data.email : '--'}</td> */}
                        {/* <td style={{textAlign: 'center'}}>{this.props.data.contact ? this.props.data.contact : '--'}</td> */}
                    </tr>
                    : null
                }
            </React.Fragment>
        )
    }
}
