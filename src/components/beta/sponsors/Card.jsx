import React, { Component } from 'react';

export default class CardIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            batch: []
        }
    }
    componentDidMount() {
        if (this.props.info) {
            this.setState({
                batch: this.props.info
            })
        }
    }
    render() {
        return (
            <React.Fragment>
                {this.state.batch && this.state.batch.map((t, index) =>
                    <div className="sponors-image-parent" key={index}>
                        <img src={`/img/main/sponsors/${t.image}`} alt="sponsors" />
                    </div>
                )}
            </React.Fragment>
        );
    }
}
