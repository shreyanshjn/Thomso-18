import React from 'react';

export default class Card extends React.Component{
    constructor(){
        super();
        this.state = {
            isExpanded: false,
        };
    }

    render(){
        return (
            <div style={{width: '100%'}}>
                <div style={{width: '50%', margin: '50px 25%'}} >
                    {this.props.data.full_picture ? <img src={this.props.data.full_picture} style={{height: '150px'}} alt={this.props.data.id} /> : null}
                    <div> Created Time: {this.props.data.created_time} </div>
                    <div> Message: {this.props.data.message} </div>
                    <div> Link: {this.props.data.link ? <a href={this.props.data.link}> Visit Page </a> : null} </div>
                    <div onClick={() => this.props.sharePost(this.props.data.id)}>Share</div>
                </div>
            </div>
        )
    }
}
