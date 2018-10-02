import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import './src/css/WorkshopsIndex.css'
import Description from './Description'
import CardIndex from './Card'
import { Workshops } from './Workshops'

class WorskhopsIndex extends Component {
    constructor(props) {
        super(props)
        this.state = {
            description: null
        }
    }
    render() {

        return (
            <div className="workshops-main-parent-div">
                {this.state.description ? <Description description={this.state.description} closeDescription={() => this.setState({ description: null })} /> : null}
                <h1 className="workshops-heading-main">WORKSHOPS</h1>
                <div className="workshops-cards-display">
                    {
                        Workshops.map(workshop => <CardIndex showDescription={() => this.setState({ description: workshop.description })} heading={workshop.name} price={workshop.price} workshopImage={workshop.image} />)
                    }
                </div>
            </div>
        )
    }
}

export default WorskhopsIndex
