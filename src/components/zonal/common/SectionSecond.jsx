import React, { Component } from 'react';
import SectionComp2 from './SectionComp2';
import SectionComp from './SectionComp';
import '../src/css/SecondSection.css';
export default class SectionSecond extends Component {
    constructor()
    {
        super();
        {
        this.state={
            activeState:"tgt-dance"
        } 
        }
        this.setActive=this.setActive.bind(this);
    }
    setActive(state)
        {
           this.setState({
             activeState:state
           }) 
        }
    render() {
        return (
            <div className="zonal-common-section2"> 
                <div className={(this.state.activeState === "tgt-dance") ?null: "zonals-comp-tgt-dance"}>
                    <SectionComp heading="tgt-dance" content="ok"/>
                </div>
                <div className={(this.state.activeState === "tgt-sing") ? null: "zonals-comp-tgt-sing"}>
                    <SectionComp heading="tgt-sing" content="ojkdjakk"/>
                </div>
                <div className={(this.state.activeState === "tgt-mic") ?null: "zonals-comp-tgt-mic"}>
                    <SectionComp heading="tgt-mic" content="odllkdfjakjk:jkakk"/>
                </div>
                <div className={(this.state.activeState === "tgt-natak") ?null: "zonals-comp-tgt-natak"}>
                    <SectionComp heading="tgt-natak" content="o"/>
                </div>

                <div className="zonals-common-sectioncomp2">
                    <div className={(this.state.activeState === "tgt-dance") ?"zonals-comp-border": null} style={{cursor:"pointer"}}
                            onClick={()=>{
                               this.setActive("tgt-dance")}} >
                        <SectionComp2 dataOptions="TGT DANCING"/>
                    </div>

                    <div  className={(this.state.activeState === "tgt-dance") ?"zonals-comp-border": null} style={{cursor:"pointer"}}
                            onClick={()=>{
                               this.setActive("tgt-sing")}} >
                        <SectionComp2 dataOptions="TGT SINGING"/>
                    </div>

                    <div  className={(this.state.activeState === "tgt-dance") ?"zonals-comp-border": null} style={{cursor:"pointer"}}
                            onClick={()=>{
                               this.setActive("tgt-mic")}} >
                        <SectionComp2  dataOptions="TGT OPEN MIC"/>
                    </div>

                    <div  className={(this.state.activeState === "tgt-dance") ?"zonals-comp-border": null} style={{cursor:"pointer"}}
                            onClick={()=>{
                               this.setActive("tgt-natak")}} >
                        <SectionComp2  dataOptions="NUKKAD NATAK"/>
                    </div>

                </div>
            </div>
        );
    }
}

