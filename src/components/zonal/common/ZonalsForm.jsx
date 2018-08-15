import React from 'react';
import '../src/css/ZonalsForm.css';
import astro from "../../beta/home/src/img/astro.png"
import DelhiEvents from "./ZonalsForm/delhievents"
import PersonalDetails from "./ZonalsForm/personaldetails"

class ZonalsForm extends React.Component {
    constructor() {
        super();
        this.isHidden = React.createRef();
        this.state = {
            name: "",
            email: "",
            contact: "",
            college: "",
            branch: "",
            events: [],
            variable: true,
        }
    }
    handleChange(event) {
        this.setState({ value: event.target.value });
    }
    changeForm() {
        this.setState({ variable: !this.state.variable })
    }
    changeState = () => {
        this.setState({ variable: !this.state.variable })
    }
    stateValues = (value) => {
        this.setState(value)
    }
    selected = events => {
        this.setState({ events: events })
    }
    render() {
        return (
            <div className="zonalsForm-main-div">
                    <div className="zonalsform-main-child">
                        <div className="astro-image-zonals-div">
                            <div>
                                <img src={astro} alt="astro" className="astro-image-zonals astro-bounce" />
                            </div>
                        </div>
                        <div className="register-zonals-form-div">
                            <PersonalDetails statevalues={this.stateValues} function={this.changeState} var={this.state.variable} />
                            <DelhiEvents ref={this.isHidden} selectedevents={this.selected} function={this.changeState} var={this.state.variable} hiding={this.state.isHidden} />
                        </div>
                    </div>
                </div>
        );
    }
}

export default ZonalsForm;
