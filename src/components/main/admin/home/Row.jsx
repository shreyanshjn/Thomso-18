import React from 'react';
export default class Row extends React.Component {
    render(){
        return (
            <React.Fragment>
                {this.props.data ? 
                    <tr style={{border: 'solid 1px black'}}>
                        <td style={{textAlign: 'center'}}>{(this.props.index !== undefined) ? (this.props.index + 1) : '--'}</td>
                        <td style={{textAlign: 'center'}}>{this.props.data.thomso_id ? this.props.data.thomso_id : '--'}</td>
                        <td style={{textAlign: 'center'}}>{this.props.data.name ? this.props.data.name : '--'}</td>
                        <td style={{textAlign: 'center'}}>{this.props.data.college ? this.props.data.college : '--'}</td>
                        <td style={{textAlign: 'center'}}>{this.props.data.email ? this.props.data.email : '--'}</td>
                        <td style={{textAlign: 'center'}}>{this.props.data.branch ? this.props.data.branch : '--'}</td>
                        <td style={{textAlign: 'center'}}>{this.props.data.contact ? this.props.data.contact : '--'}</td>
                        <td style={{textAlign: 'center'}}>{(this.props.data.primary_event && this.props.data.primary_event.length !== 0) ? this.props.data.primary_event.map( (primary_event,i) => {
                            return (<div key={i}>{primary_event._id}<br /></div> )
                        }) : '--'}</td>
                        <td style={{textAlign: 'center'}}>{(this.props.data.event && this.props.data.event.length !== 0) ? this.props.data.event.map( (event,i) => {
                            return (<div key={i}>{event._id}<br /></div> )
                        }) : '--'}</td>
                        
                    </tr>
                    : null
                }
            </React.Fragment>
        )
    }
}
