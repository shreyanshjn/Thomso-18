import React from 'react';
import $ from 'jquery';
import About from './About';
import FrontView from './FrontView';
import PrevThomso from './PrevThomso';
import ButSuggestion from './ButSuggestion';
import Footer from './Footer';
import './style.css';
import './footer.css';

export default class HomeIndex extends React.Component{
    render(){
        return(
        	<div className="container-fluid">
		        <FrontView />
                <About />
                <PrevThomso />
                <ButSuggestion />
                <Footer />
            </div>
        )
    }
}
