import React from 'react';
import "./ideas.css"



export default class Ideas extends React.Component {
    
state={
textfieldStatus:false,
textsave: null,
confirmation:false,
defval:true,
editShow:true,
button_save_and_cancel_disabled_Status:false,
defvalue:this.props.passValue,
}
enableHandler=() => {
 let transform= this.state.textfieldStatus;
this.setState({textfieldStatus:!transform})
}

getTextfieldvalue= (event)=>{
  this.setState({textsave:event.target.value})  ;
}

textfieldHandler= () => {
    console.log(this.state.textsave);
    
}

enableconfirmHandler=()=>{
    let transformConfirmation = this.state.confirmation;
    this.setState({confirmation:!transformConfirmation});
}
defvalHandler=()=>{
    let transformdefval=this.state.defval;
    this.setState({defval:!transformdefval});
}
oneditShowerHandler=()=>{
let transformEditShow=this.state.editShow;
this.setState({
    editShow:!transformEditShow
});
}
button_save_and_cancel_disabled_StatusHandler=()=>{
    let transforButtonsave_And_cancel=this.state.button_save_and_cancel_disabled_Status;
    this.setState({
        button_save_and_cancel_disabled_Status:!transforButtonsave_And_cancel
    });
}
enableHandler_and_defvalHandler_and_oneditShowerHandler=()=>{
    this.enableHandler();
    this.defvalHandler();
    this.oneditShowerHandler();
}
enableconfirmHandler_and_defvalHandler_and_button_save_and_cancel_disabled_StatusHandler=()=>{
    this.enableconfirmHandler();
    this.defvalHandler();
    this.button_save_and_cancel_disabled_StatusHandler();
}
enableHandler_and_oneditShowerHandler_and_defvalHandler=() =>{
    this.enableHandler();
    this.oneditShowerHandler();
    this.defvalHandler();
}

textfieldHandler_and_enableconfirmHandler_and_oneditShowerHandler_and_enableHandler_and_button_save_and_cancel_disabled_StatusHandler_and_defvalHandler=()=>{
    this.enableconfirmHandler();
    this.textfieldHandler();
    this.oneditShowerHandler();
    this.enableHandler();
    this.button_save_and_cancel_disabled_StatusHandler();
}
button_save_and_cancel_disabled_StatusHandler_and_enableconfirmHandler_and_defvalHandler=()=>{
    this.button_save_and_cancel_disabled_StatusHandler();
    this.enableconfirmHandler();
    this.defvalHandler();
} 

render(){
    return(
            <div className="cardmain"><div className="ideas-content"><h3>HelloHelloHelloHelloHelloHelloHel
                loHelloHelloHelloHelloHelllloHell
                oHelloHelloH</h3></div>
                
            <div className="cardfunctionality">
            {this.state.editShow?
            <button onClick={this.enableHandler_and_defvalHandler_and_oneditShowerHandler}> On edit</button>
            :null
            }
            <textarea onChange={this.getTextfieldvalue} placeholder={this.state.defValue} disabled ={this.state.defval} />

            {this.state.textfieldStatus?
            <div>
            
            
                     
            <button onClick={this.enableconfirmHandler_and_defvalHandler_and_button_save_and_cancel_disabled_StatusHandler } disabled={this.state.button_save_and_cancel_disabled_Status}>Save </button>
            
            <button onClick={this.enableHandler_and_oneditShowerHandler_and_defvalHandler} disabled={this.state.button_save_and_cancel_disabled_Status} >Cancel</button>
            </div>
            :null
            }
            {this.state.confirmation?
            <div>
                <h1>Are you sure </h1>
                <button onClick={this.textfieldHandler_and_enableconfirmHandler_and_oneditShowerHandler_and_enableHandler_and_button_save_and_cancel_disabled_StatusHandler_and_defvalHandler}>click to save  </button>
                 <button onClick={this.button_save_and_cancel_disabled_StatusHandler_and_enableconfirmHandler_and_defvalHandler}>click to cancel</button>       
            </div>:null
            }
            
            </div>    
            </div>
    )
}

}