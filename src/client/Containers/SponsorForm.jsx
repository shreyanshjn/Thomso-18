import React from 'react';
import style from '../src/css/style.css'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {AddSponsor} from '../actions/AddSponsors';

class SponsorForm extends React.Component{

    constructor(){
        super();
        this.state = {
            sponsorType:'Sponsor',
            email:'Email',
            contact:'',
            message:'',
            disabled:false,
            error:false,
            result: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    handleInput(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
    }

    handleSubmit(e){
        e.preventDefault();
        this.setState({disabled:true,error:'Please wait ... '});
        let {sponsorType, email, contact, message} = this.state;
        if(sponsorType == null){
                this.setState({error: 'Please select sponsor type', disabled: false})
        }
        else if(contact == null || contact.length != 10){
                this.setState({error: 'Invalid Contact no.', disabled: false})
        }
        else{
            let data = {sponsorType, email, contact, message};
            this.props.addSponsors(data);
        }
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps);
        if(nextProps.isAdditionSuccess.isAdded === true){
            this.setState({result: 'Contact Added', error:false, disabled : false})
        }
        else{
            this.setState({
                error: nextProps.isAdditionSuccess.result, disabled:false
            })
        }
    }

    render(){
        return(
            <div className="container-fluid">
                <div id="galaxy"></div>
                <canvas id='fire' style={{height: "0%", width: "0%",position:"absolute"}} ></canvas>
                <div className="row container signup__container">
                    <div className="container__child signup__form col-md-12 col-xs-12">
                        <form action="/register" onSubmit={e => this.handleSubmit(e)}>
                            <div className="form-group">
                                <label htmlFor="username">Connect as</label>
                                <select name="sponsorType" className="selectpicker form-control" value={this.state.sponsorType} onChange={e => this.handleInput(e)}>
                                    <option value="Sponsor">Sponsors</option>
                                    <option value="Media">Media</option>
                                    <option value="Partner">Partner</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="Email">Email</label>
                                <input className="form-control" type="email" name="email" placeholder="Email" 
                                autoCorrect="off" autoCapitalize="off" value={this.state.email} onChange={e => this.handleInput(e)} autoComplete="email" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="Contact">Contact</label>
                                <input className="form-control" type="text" name="contact" placeholder="Contact"
                                value={this.state.contact} onChange={e => this.handleInput(e)} required/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="Message">Message</label>
                                <textarea className="form-control" type="text" name="message" placeholder="Message"
                                value={this.state.message} onChange={e => this.handleInput(e)}></textarea> 
                            </div>
                            <div style={{marginTop: "15px", color: "red"}}>{this.state.error}</div> 
                            <div style={{marginTop: "15px", color: "green"}}>{this.state.result}</div> 
                            <div style={{marginTop: "15px", color: "red"}}>{this.props.additionError}</div>
                            <div className="m-t-lg">
                                <ul className="list-inline">
                                    <li>
                                        <input className="btn btn--form" type="submit" value="Submit" />
                                    </li>
                                </ul>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
SponsorForm.proptypes = {
    isAdditionSuccess  : PropTypes.any.Required,
    isAdditionPending  : PropTypes.bool.Required,
    additionError  : PropTypes.any,
}

var mapStateToProps = state => {
    return {
        isAdditionSuccess : state.StoreSponsor.storeSuccess,
        isAdditionPending : state.StoreSponsor.storePending,
        additionError : state.StoreSponsor.storeError
    }
}

var mapDispatchToProps = dispatch => {
    return {
        addSponsors : (data) => dispatch(AddSponsor(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SponsorForm);