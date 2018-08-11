import React from 'react';
import ZonalsForm from './zonalsform';
import Slide from './Fields/effects/slide'
import astro from "../../beta/home/src/img/astro.png"
import './zonals.css'

const duration = 400

const defaultstyleone = {
    transition: `all ${duration}ms ease-in-out`,
    position: 'absolute',
    top: '100px',
    width: '50%',
    height: '392px'
};

const defaultstyletwo = {
    transition: `all ${duration}ms ease-in-out`,
    position: 'absolute',
    opacity: 0,
    top: '100px',
    width: '50%',
};
const lstyles = {
    entering: { opacity: 0, left: '190px' },
    entered: { opacity: 1, left: '400px' },
    exiting: { opacity: 1, left: '0px' },
    exited: { opacity: 0 }
}
const zonalslogo = {
    entering: { opacity: 0 },
    entered: { opacity: 1, left: '190px' },
    exiting: { opacity: 1, left: '0px' },
    exited: { opacity: 1 }
}

// const defaultstyleone = {
//     transition: `all ${duration}ms ease-in-out`,
//     position: 'absolute',
//     top: '100px',
//     width: '50%',
//     marginLeft: 'auto',
//     marginRight: 'auto',
//     height: '392px'
// };

// const defaultstyletwo = {
//     transition: `all ${duration}ms ease-in-out`,
//     position: 'absolute',
//     opacity: 0,
//     top: '100px',
//     width: '100%',
//     height: '392px'
// };
// const lstyles = {
//     entering: { opacity: 0, left: '100px' },
//     entered: { opacity: 1, left: '392px' },
//     exiting: { opacity: 1, left: '0px' },
//     exited: { opacity: 0 }
// }
// const zonalslogo = {
//     entering: { opacity: 0 },
//     entered: { opacity: 1, left: '190px' },
//     exiting: { opacity: 1, left: '0px' },
//     exited: { opacity: 1 }
// }
export default class ZonalsFooter extends React.Component {
    constructor() {
        super();
        this.state = {
            varone: true,
            vartwo: false
        }
        this.handleChange = this.handleChange.bind(this)
    };
    handleChange() {
        this.setState({ varone: !this.state.varone, vartwo: !this.state.vartwo })
    }
    render() {
        return (
            <div className="zonals-delhi-parent">
                <div className="zonals-delhi-child">
                    <Slide className="zonals-delhi-rightslide" defaultstyle={defaultstyleone} slidestyle={zonalslogo} in={this.state.varone}>
                        <div className="zonals-delhi-logo">
                            <div className="zonals-delhi-register-astro">
                                <img src={astro} alt="astro" />
                            </div>
                            <div className="zonals-delhi-register-button">
                                <button onClick={this.handleChange} type='submit'>Register</button>
                            </div>
                        </div>
                    </Slide>
                    <Slide defaultstyle={defaultstyletwo} slidestyle={lstyles} in={this.state.vartwo}>
                        <ZonalsForm />
                    </Slide>
                </div>
            </div>
        );
    }
}