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
            dance:"Are you passionate about dancing? Do you have tingling sensations run down your feet when you hear music? Then come let yourself loose and dance to express. Come get lost amid the likes of yourself and prove that you aren’t a cent less than anyone. Let the flair of your dance moves hypnotize the eyes and let your expressions win the hearts. For those who believe that dance is a poem of which each movement is a word, come, exhibit your skills here" ,
            sing:"Can your melodious voices silence even the biggest gossipers under the roof? Can your music goes straight from ears to the heart? If you can, we pave way for all the crooning voices to shine bright in the music genres of their own choices. Sing out prayers, open up souls and make the spirits dance. Own the stage, compete with the elites and win accolades from the crowd to show that you are the best.",
            mic:"With a chance to be a free voice on the mic than being an echo of thoughts, Open mic welcomes performers from all styles and genres, be it poetry, storytelling, shayari or stand up comedy to grab the mic and show off their skills in front of an engaging audience. Do come to express, enrapture and entertain as nobody gets between you and your microphone. Grab the mic and the stage is all yours to steal show.",
            natak:"You don't need a stage when your skills can catch the eyes of the passersby from the streets. Nukkad Natak is a street play competition of Dramatics which effectively combines the live performances of the artists with the live audiences. Not only it offers avenues for wholesome entertainment but also outlines captivating issues which are socially relevant. The main endeavor is to convey a social message in an entertaining environment by the means of chants, drums and catchy slogans. Come and be a part of the Street Play Saga",
            abhivyakti:"Acting is not about dressing up, it's about stripping bare. The whole essence of learning lines is to forget them while portraying a character. Abhivyakti is a stage drama competition to put up a show with perfect acting skills, mind blowing expressions and stellar dialogue delivery. We have this event planned to cater to all those patrons of direction, acting and screenplay. With such quality in the performances, be an absolute gem in this contest of stage drama."
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
        return (
            <div className="zonal-common-section2"> 
                <div style={{position:'relative'}}>
                    <Fade in={this.state.activeState === "tgt-dance"}> <SectionComp Name="zonals-comp-dance-transform" heading="TGT-DANCE" content={this.state.dance} downloadPdf="DanceRule.pdf" /></Fade>
                    <Fade in={this.state.activeState === "tgt-sing"}> <SectionComp Name="zonals-comp-dance-transform"  heading="TGT-SING" content={this.state.sing} downloadPdf="SingRule.pdf" /></Fade>
                    <Fade in={this.state.activeState === "tgt-mic"}> <SectionComp Name="zonals-comp-dance-transform" heading="TGT-MIC" content={this.state.mic} downloadPdf="MicRule.pdf" /></Fade>
                    <Fade in={this.state.activeState === "tgt-natak"}> <SectionComp Name="zonals-comp-dance-transform" heading="TGT-NATAK" content={this.state.natak} downloadPdf="NatakRule.pdf" /></Fade>
                    <Fade in={this.state.activeState === "abhivyakti"}> <SectionComp Name="zonals-comp-dance-transform" heading="ABHIVYAKTI" content={this.state.abhivyakti} downloadPdf="Anhivyakti.pdf"/></Fade>
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
                   <div  style={{cursor:"pointer"}}
                            onClick={()=>{
                                this.onClick("abhivyakti")}} >
                                <SectionComp2  dataOptions="ABHIVYAKTI" nameofclass={(this.state.activeState === "abhivyakti") ?"zonals-comp-border": null}/>
                   </div>

                            </div>
                        </div>
        );
    }
}

