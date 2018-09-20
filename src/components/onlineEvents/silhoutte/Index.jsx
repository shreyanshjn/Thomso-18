import React, { Component } from "react";
import Navbar from "../../beta/home/Navbar.jsx";
import "./src/css/Silhoutte.css";
import silhoutte from "./src/img/silhoutte.jpg";

class Silhoutte extends Component {
    render() {
        return (
            <div>
                <Navbar background="true" />
                <div className="silhoutte-campus-image">
                    <div>
                        <img className="silhoutte-campus-image-child" src={silhoutte} alt="silhoutte" />
                    </div>
                </div>
            </div>
        );
    }
}

export default Silhoutte;
