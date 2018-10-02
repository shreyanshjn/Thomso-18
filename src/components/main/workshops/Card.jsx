import React, { Component } from 'react'
import './src/css/WorkshopsIndex.css'

class CardIndex extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="workshops-parent-child" onClick={this.props.showDescription}>
                    <div className="workshops-main-child-one">
                        <img src="https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&h=350" alt="Avatar"/>
                        <div className="workshops-container-one">
                            <h4><b>{this.props.heading}</b></h4> 
                            <p>Description</p> 
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default CardIndex
