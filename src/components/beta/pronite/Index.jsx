import React from 'react';
import procarousel from './procarousel';
import './pronites1.css';
import logo1 from '../pronite/img/image1.jpg';
import logo2 from '../pronite/img/image2.jpg';
import logo3 from '../pronite/img/image3.jpg';
import logo4 from '../pronite/img/image4.jpg';
export default class PronitesIndex extends React.Component {
    componentDidMount() {
        procarousel();
    }

    render(){
        return(


            <div>
               
        
           <div id="wrapper">
                <div id="carousel-left">
                    <img src={logo4} width="450" height="325" />
                    <img src={logo1} width="450" height="325" />
                    <img src={logo2} width="450" height="325" />
                    <img src={logo3} width="450" height="325" />
                </div>
                <div id="carousel-center">
                    <img src={logo1} width="550" height="400" />
                    <img src={logo2} width="550" height="400" />
                    <img src={logo3} width="550" height="400" />
                    <img src={logo4} width="550" height="400" />
                </div>
                <div id="carousel-right">
                    <img src={logo2} width="450" height="325" />
                    <img src={logo3} width="450" height="325" />
                    <img src={logo4} width="450" height="325" />
                    <img src={logo1} width="450" height="325" />
                </div>
                <a id="prev" href="#">&lsaquo;</a>
                <a id="next" href="#">&rsaquo;</a>
            </div>
            </div>
        )
    }
}