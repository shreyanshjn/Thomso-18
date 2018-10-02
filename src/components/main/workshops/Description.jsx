import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import cross from './src/img/cross.png'
import './src/css/WorkshopsIndex.css'

class Description extends Component {

    render() {
        return (
            <div className="workshops-description-one">
                <div className="workshops-description-child">
                    <img src={cross} alt="close" onClick={this.props.closeDescription}/>
                    <p className="description-workshops">{this.props.description}</p>
                    <Link to="/payment" className="paynow-button-workshops">
                        PAY NOW
                    </Link>
                </div>
            </div>
        )
    }
}

export default Description
