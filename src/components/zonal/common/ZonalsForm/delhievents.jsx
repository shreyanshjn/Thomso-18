import React from 'react';
import '../zonals.css';
import Popup from '../../../common/popup/Index';

export default class DelhiEvents extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedOptionDrama: '',
            selectedOptionTgt: '',
            check: false,
            tgt: false,
            radiocheckabhivyakti: false,
            radiochecknatak: false,
            radiochecksinging: false,
            radiocheckdancing: false,
            radiocheckopenmic: false
        }
    }
    changeState = (e) => {
        e.preventDefault()
        let events = [this.state.selectedOptionDrama, this.state.selectedOptionTgt]
        this.props.selectedevents(events)
        this.popup.show(['Thank you for registering as CA.'])
        this.props.function()
    }
    handleOptionChangeDrama = (changeEvent) => {
        this.setState({
            selectedOptionDrama: changeEvent.target.value
        });
    }
    handleOptionChangeTgt = (changeEvent) => {
        this.setState({
            selectedOptionTgt: changeEvent.target.value
        });
    }
    render() {
        return (
            <React.Fragment>
                <Popup {...this.props} onRef={ref => (this.popup = ref)} />
                <form className={this.props.var ? "register-zonals-form-events inactive" : "register-zonals-form-events active"} onSubmit={this.changeState}>
                    <div className={this.props.var ? "register-zonals-form-events-parent inactive" : "register-zonals-form-events-parent"}>
                        <div className="register-zonals-form-events-firstchild">
                            <div className="register-zonals-form-events-drama">
                                <span><input type="checkbox" onClick={() => this.setState({ check: !this.state.check })} name="drama" value="drama" /></span><span>Drama</span>
                            </div>
                            <div className={this.state.check ? "register-zonals-form-events-dramachild" : "register-zonals-form-events-dramachild low-opacity"}>
                                <div>
                                    <span><input onChange={this.handleOptionChangeDrama} type="radio" name="abhivyakti" value="abhivyakti" checked={this.state.selectedOptionDrama === 'abhivyakti'} disabled={!this.state.check} /></span><span>Abhivyakti</span>
                                </div>
                                <div>
                                    <span><input onChange={this.handleOptionChangeDrama} type="radio" name="natak" value="natak" checked={this.state.selectedOptionDrama === 'natak'} disabled={!this.state.check} /></span><span>Natak</span>
                                </div>
                            </div>
                        </div>
                        <div className="register-zonals-form-events-secondchild">
                            <div className="register-zonals-form-events-tgt">
                                <span><input type="checkbox" onClick={() => this.setState({ tgt: !this.state.tgt })} name="tgt" value="tgt" /></span><span>Tgt</span>
                            </div>
                            <div className={this.state.tgt ? "register-zonals-form-events-tgtchild" : "register-zonals-form-events-tgtchild low-opacity"}>
                                <div>
                                    <span><input onChange={this.handleOptionChangeTgt} type="radio" name="singing" value="singing" checked={this.state.selectedOptionTgt === 'singing'} disabled={!this.state.tgt} /></span><span>Singing</span>
                                </div>
                                <div>
                                    <span><input onChange={this.handleOptionChangeTgt} type="radio" name="dancing" value="dancing" checked={this.state.selectedOptionTgt === 'dancing'} disabled={!this.state.tgt} /></span><span>Dancing</span>
                                </div>
                                <div>
                                    <span><input onChange={this.handleOptionChangeTgt} type="radio" name="openmic" value="openmic" checked={this.state.selectedOptionTgt === 'openmic'} disabled={!this.state.tgt} /></span><span>Open mic</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={this.props.var ? "register-zonals-form-events-button inactive" : "register-zonals-form-events-button"}>
                        <button onClick={() => this.changeState()}>BACK</button>
                        <button type="submit">SUBMIT</button>
                    </div>
                </form>
            </React.Fragment >
        );
    }
}

