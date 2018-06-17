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
            email:' ',
            contact:'',
            message:'',
            disabled:false,
            error:false,
            result: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
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

    ComponentWillRecieveProps(nextProps){
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
                                <select className="selectpicker form-control" value={this.state.sponsorType} onChange={(e) => this.setState({sponsorType: e.target.value})}>
                                    <option value="Sponsor">Sponsors</option>
                                    <option value="Media">Media</option>
                                    <option value="Partner">Partner</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="Email">Email</label>
                                <input className="form-control" type="text" name="Email" placeholder="Email" autoComplete="email"
                                value={this.state.email} onChange={(e) => this.setState({email: e.target.email})} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="Contact">Contact</label>
                                <input className="form-control" type="text" name="Contact" placeholder="Contact"
                                value={this.state.contact} onChange={(e) => this.setState({contact: e.target.value})} required/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="Message">Message</label>
                                <textarea className="form-control" type="text" name="Message" placeholder="Message"
                                value={this.state.message} onChange={(e) => this.setState({message: e.target.value})}></textarea> 
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
SponsorForm.propTypes = {
    isAdditionSuccess  : PropTypes.any.Required,
    isAdditionPending  : PropTypes.bool.Required,
    AdditionError  : PropTypes.any,
}

var mapStateToProps = state => {
    return {
        isAdditionSuccess : state.Sponsor.storeSuccess,
        isAdditionPending : state.Sponsor.storePending,
        AdditionError : state.Sponsor.storeError
    }
}

var mapDispatchToProps = dispatch => {
    return {
        addSponsors : (data) => dispatch(AddSponsor(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SponsorForm);