import React  from 'react';
import '../src/css/ZonalsForm.css';
import astro from "../../beta/home/src/img/astro.png"

class ZonalsForm extends React.Component {
    constructor()
    {
       super();
       this.state={
           name:"",
           email:"",
           contact:"",
           college:"",
           branch:"",
       }
    }
    handleChange(event) {
        this.setState({value: event.target.value});
      } 
    render() {
        return (
            <div className="zonalsForm-main-div">
                <div className="astro-image-zonals-div">
                    <div>
                        <img src={astro} alt="astro" className="astro-image-zonals" />
                    </div>
                </div>
                <div className="register-zonals-form-div">
                    <form className="register-zonals-form">
                        <input type="name" value={this.state.name} placeholder="Name"/><br />
                        <input type="name" value={this.state.email} placeholder="Email" /><br />
                        <input type="name" value={this.state.contact} placeholder="Contact Number" /><br />
                        <input type="name" value={this.state.college} placeholder="College Name" /><br />
                        <input type="name" value={this.state.branch} placeholder="Branch Name and year" /><br />
                        <input type="submit" value="SUBMIT" className="zonals-submit-form" />
                    </form>
                </div>
            </div>
        );
    }
}

export default ZonalsForm;
