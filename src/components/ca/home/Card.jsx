import React from 'react';
import './updatedcard.css';
import logoshare from '../img/icons8-share-50 (1).png';
import logo from '../img/eye.png';
export default class Card extends React.Component {
  constructor() {
    super();
    this.state = {
      isExpanded: false,
      shown: true,
      button: true,
      date: '',
      month:'',
      year:''
    };
  }

  render() {
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
                    <img src={logo} alt="fblogo" /> </a> : null}
                  </div>
                </div>
                <div className="card__meta">
                  <p>{`Posted on ${this.state.date}/${this.state.month}/${this.state.year}`}</p>
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
