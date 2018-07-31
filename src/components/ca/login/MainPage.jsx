import React from 'react';
import RegisterNavbar from './RegisterNavbar';
import {SectionsContainer, Section} from 'react-fullpage';
export default class MainPage extends React.Component{
    render(){
        let options = {
            sectionClassName:     'section',
            anchors:              ['home', 'aboutUs', 'footfall','celebrity','contactUs'],
            scrollBar:            false,
            navigation:           false,
            verticalAlign:        false,
            sectionPaddingTop:    '0px',
            slidesNavPosition: 'bottom',
            arrowNavigation:      true
        };
        return(
            <div className="middlesection">
                <RegisterNavbar />
                <SectionsContainer {...options}>
                    <Section>
                    </Section>
                    <Section>
                    </Section>
                    <Section> 
                    </Section>
                    <Section>
                    </Section>
                    <Section>
                    </Section>
                </SectionsContainer>
            </div>
        );
    }
}
