import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./css/mainzonals.css";
import Navbar from "../../beta/home/Navbar";

export default class HomeIndex extends Component {
    render() {
        return (
            <div className="zonals-mainpage-parent">
                <Navbar background="true" />
                <div className="zonals-mainpage-parent-child">
                    <div className="zonals-mainpage-cards">
                        <div className="zonals-mainpage-cards-image-delhi">
                        </div>
                        <div className="zonals-mainpage-cards-title">
                            Delhi Zonals
                        </div>
                        <div className="zonals-mainpage-cards-button">
                            <Link to="/zonals/delhi">
                                Register
                            </Link>
                        </div>
                    </div>
                    <div className="zonals-mainpage-cards">
                        <div className="zonals-mainpage-cards-image-lucknow">
                        </div>
                        <div className="zonals-mainpage-cards-title">
                            Lucknow Zonals
                        </div>
                        <div className="zonals-mainpage-cards-button">
                            <Link to="/zonals/lucknow">
                                Register
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
