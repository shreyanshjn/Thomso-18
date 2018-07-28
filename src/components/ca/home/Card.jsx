import React from 'react';
import './card.css';
import logoshare from '../img/share-01.png';
export default class Card extends React.Component{
    constructor(){
        super();
        this.state = {
            isExpanded: false,
            shown: true,
            button:true,
        };

        }
          toggle() {
      		this.setState({
      			shown: !this.state.shown, button:!this.state.button
      		});
      	}
    render(){
          var button=this.state.button?"more":"less";
          var shown = {
			         display: this.state.shown ? "block" : "none"
		           };

		      var hidden = {
			         display: this.state.shown ? "none" : "block", lineHeight: '0.8em'
		           }

        return (
          <div className="maindiv">
            <div style={{width:'356px'}}></div>
            <div className="innerdiv">
                  <div style={{height:'auto',width:'100%'}}>
                      {this.props.data.full_picture ? <img src={this.props.data.full_picture} style={{height:'auto',width:'100%',maxHeight:'400px'}} alt={this.props.data.id} /> : null}
                  </div>
                  <div>
                      <p style={{fontWeight:'bold'}}>posted on {this.props.data.created_time} </p>
                  </div>
                    {this.props.data.message ?
                        <div>
                          <div id="blockwithtext" style={shown}><p>{this.props.data.message}</p></div>
                          <div style={hidden}><p>{this.props.data.message}</p></div>
                          <p style={{margin:'0px'}} onClick={this.toggle.bind(this)}>{button}</p>
                        </div>
                        :null
                    }
                  <div className="viewpost">
                    <div style={{width:'50%'}}>{this.props.data.link ? <a href={this.props.data.link} style={{textDecoration:'none'}} target="_blank" >
                      <p> View Post </p> </a> : null}
                    </div>
                    <div className="logo" onClick={() => this.props.sharePost(this.props.data.id)}>
                      <img src={logoshare} />
                      <p>Share</p></div>
                  </div>

            </div>
          </div>

        )
    }
}
