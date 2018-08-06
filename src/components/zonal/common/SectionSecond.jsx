import React, { Component } from 'react';
import SectionComp2 from './SectionComp2';
import SectionComp from './SectionComp';
import '../src/css/SecondSection.css';
export default class SectionSecond extends Component {
    render() {
        return (
            <div className="zonal-common-section2"> 
                <div>
                    <SectionComp />

                </div>
                <div className="zonals-common-sectioncomp2">
                    <div>
                        <SectionComp2 dataOptions="TGT DANCING"/>
                    </div>
                    <div>
                        <SectionComp2 dataOptions="TGT SINGING"/>
                    </div>
                    <div>
                        <SectionComp2  dataOptions="TGT OPEN MIC"/>
                    </div>
                    <div>
                        <SectionComp2  dataOptions="NUKKAD NATAK"/>
                    </div>
                </div>
            </div>
        );
    }
}

