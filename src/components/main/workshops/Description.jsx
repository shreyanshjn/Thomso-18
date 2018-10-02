import React, { Component } from 'react'
import cross from './src/img/cross.png'
import './src/css/WorkshopsIndex.css'

class Description extends Component {

    render() {
        return (
            <div className="workshops-description-one">
                <div className="workshops-description-child">
                    <img src={cross} alt="close" onClick={this.props.closeDescription}/>
                    <p>{this.props.description}</p>
                    <button className="paynow-button-workshops"> PAY NOW </button>
                </div>
            </div>
        )
    }
}

export default Description
