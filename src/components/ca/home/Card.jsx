import React from 'react';
import './updatedcard.css';
import logoshare from '../img/icons8-share-50 (1).png';
export default class Card extends React.Component {
  constructor() {
    super();
    this.state = {
      isExpanded: false,
      shown: true,
      button: true,
    };

  }

  /*  toggle() {
    this.setState({
      shown: !this.state.shown, button:!this.state.button
    });
  }*/
  render() {
    /*  var button=this.state.button?"more":"less";
      var shown = {
           display: this.state.shown ? "block" : "none"
           };

      var hidden = {
           display: this.state.shown ? "none" : "block", lineHeight: '0.8em'
           }*/

    return (
      <div className="maindiv">
        <div className="innerdiv">
          <div className="wrapper">
            <div className="card">
              <div className="card__image">
                <img src={this.props.data.full_picture} alt="fullpicture" className="border-tlr-radius" />
              </div>
              <div className="card__content card__padding">
                <div className="card__share">
                  <div className="share-toggle share-icon" onClick={() => this.props.sharePost(this.props.data.id)}> <a><img src={logoshare} alt="fblogo" /></a></div>
                </div>
                <div className="card__share2">
                  <div className="share-toggle share-icon">{this.props.data.link ? <a href={this.props.data.link} style={{ textDecoration: 'none' }} target="_blank" >
                    <img src={logoshare} alt="fblogo" /> </a> : null}
                  </div>
                </div>
                <div className="card__meta">
                  <p>posted on {this.props.data.created_time} </p>
                </div>
                <div className="card__article">
                  <p>{this.props.data.message}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}



