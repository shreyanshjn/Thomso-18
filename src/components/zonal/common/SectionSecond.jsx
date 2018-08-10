import React, { Component } from 'react';
import SectionComp2 from './SectionComp2';
import SectionComp from './SectionComp';
import Fade from './Fade';
import '../src/css/SecondSection.css';
export default class SectionSecond extends Component {
    constructor()
    {
        super();
        {
        this.state={
            activeState:"tgt-dance",
        } 
        }
   
    }
    onClick(state)
    {
        this.setState({
            activeState:state,
        });
    }
    render() {
        let headcontent="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sed convallis ex. Sed in tempus turpis, sit amet tincidunt neque. Maecenas porta aliquet consectetur. Aenean nisi nisi, imperdiet non neque eu, ultricies finibus velit. Vestibulum vestibulum tincidunt augue. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla volutpat metus nec velit cursus tristique. Nulla ornare eros odio, non consectetur erat lacinia sed. Duis vehicula vulputate suscipit. Etiam id ante ut est interdum finibus a a justo. Suspendisse dapibus dignissim congue. Donec turpis nibh, aliquet at molestie at, gravida nec erat. Vestibulum pellentesque magna ac lacus imperdiet cjonvallis.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sed convallis ex. Sed in tempus turpis, sit amet tincidunt neque. Maecenas porta aliquet consectetur. Aenean nisi nisi, imperdiet non neque eu, ultricies finibus velit. Vestibulum vestibulum tincidunt augue. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per incept"
        return (
            <div className="zonal-common-section2"> 
                <div style={{position:'relative'}}>
                    <Fade style={{height:'100vh'}}in={this.state.activeState === "tgt-dance"}> <SectionComp Name="zonals-comp-dance-transform" heading="heading" content={headcontent}/></Fade>
                    <Fade in={this.state.activeState === "tgt-sing"}> <SectionComp Name="zonals-comp-dance-transform"  heading="tgt-sing" content={headcontent}/></Fade>
                    <Fade in={this.state.activeState === "tgt-mic"}> <SectionComp Name="zonals-comp-dance-transform" heading="tgt-mic" content={headcontent}/></Fade>
                    <Fade in={this.state.activeState === "tgt-natak"}> <SectionComp Name="zonals-comp-dance-transform" heading="tgt-natak" content={headcontent}/></Fade>
                </div>

                <div className="zonals-common-sectioncomp2">
                    <div onClick={()=>{
                        this.onClick("tgt-dance")}} >
                        <SectionComp2 dataOptions="TGT DANCING" nameofclass={(this.state.activeState === "tgt-dance") ?"zonals-comp-border": null} style={{cursor:"pointer"}}/>
                    </div>

                    <div style={{cursor:"pointer"}}
                        onClick={()=>{
                            this.onClick("tgt-sing")}} >
                            <SectionComp2 dataOptions="TGT SINGING" nameofclass={(this.state.activeState === "tgt-sing") ?"zonals-comp-border": null} />
                    </div>
                   <div  style={{cursor:"pointer"}}
                            onClick={()=>{
                                this.onClick("tgt-mic")}} >
                                <SectionComp2  dataOptions="TGT OPEN MIC" nameofclass={(this.state.activeState === "tgt-mic") ?"zonals-comp-border": null}/>
                   </div>

                            <div style={{cursor:"pointer"}}
                                onClick={()=>{
                                    this.onClick("tgt-natak")}} >
                                    <SectionComp2  dataOptions="NUKKAD NATAK" nameofclass={(this.state.activeState === "tgt-natak") ?"zonals-comp-border": null}/>
                                </div>

                            </div>
                        </div>
        );
    }
}

