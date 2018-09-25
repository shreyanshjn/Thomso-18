import React, { Component } from 'react';
import "./src/whythomso.css";
import Navbar from "../beta/home/Navbar.jsx";
// import Arrow from "./src/svg/arrow"
import { Link } from "react-router-dom"
// import LeftArr from "./src/svg/leftarr"
import "./src/arrow.css"
import { ArtistDetails, More_artists } from "./src/artists"


export default class WhyThomso extends Component {
    constructor() {
        super();
        this.state = {
            videos: ["https://www.youtube.com/embed/kD8ZvzmgVlo", "https://www.youtube.com/embed/89xE9rcwtIo"],
            slideindex: 0,
            artistdetails: ArtistDetails,
            moreartists: More_artists,
            viewmore: false,
        }
    }
    handlePrevious = () => {
        // if (this.state.slideindex >= 0) {
        //     this.setState({
        //         slideindex: this.state.slideindex - 1
        //     })
        //     console.log(this.state.slideindex, "slideindex")

        //     document.getElementById(`i${this.state.slideindex - 1}`).classList = "translate-left"
        //     document.getElementById(`i${this.state.slideindex}`).classList = "translate-left"
        // }
    }
    handleNext = () => {
        // if (this.state.slideindex <= this.state.videos.length - 1) {
        //     this.setState({
        //         slideindex: this.state.slideindex + 1
        //     })
        //     if (this.state.slideindex !== 1) {
        //         document.getElementById(`i${this.state.slideindex}`).classList.add("translate-right")
        //         document.getElementById(`i${this.state.slideindex + 1}`).classList.add("translate-right")
        //         document.getElementById(`i${this.state.slideindex + 2}`).classList.add("translate-right")
        //     }
        //     if (this.state.slideindex === 1) {
        //         document.getElementById(`i2`).classList.remove("translate-right")
        //         document.getElementById(`i2`).classList.add("translate-right")
        //     }


        // }
    }
    componentDidMount() {
        this.setState({
            artistdetails: ArtistDetails
        })
    }
    render() {
        return (
            <div className="whythomso-parent">
                <Navbar background="true" />
                <div className="whythomso-child">
                    <div className="whythomso-child-whythomso">
                        <h3>WHY VISIT THOMSO ?</h3>
                    </div>
                </div>
                <div className="whythomso-text">
                    <p>Thomso is the largest cultural festivals of North India attracting a crowd of over 30000 people. With over 150+ events in line,
                        Thomso is a three day cultural extravaganza playing host to eminent celebrities and talented scholars.</p>
                </div>
                <div id="attractions" className="whythomso-second-child">
                    <div className="whythomso-second-child-top">
                        <div className="whythomso-second-child-attractions">
                            <h3>Attractions</h3>
                        </div>
                    </div>
                    <div className="whythomso-second-child-middle">
                        <div className="whythomso-second-child-the-institute">
                            <div className="whythomso-second-child-the-institute-image">
                                <iframe src="https://www.youtube.com/embed/6T_T07hglvk" title="IITR Drone View" height="150px" width="100%" frameBorder="0" allowFullScreen>
                                </iframe>
                            </div>
                            <div className="whythomso-second-child-the-institute-content">
                                <div className="whythomso-second-child-the-institute-content-heading">
                                    <h3>The Institute</h3>
                                </div>
                                <div className="whythomso-second-child-the-institute-content-content">
                                    <p>Amidst the foothills of Himalayas,fastering the spirit of adventure and excitement is located IIT Roorkee</p>
                                </div>
                            </div>
                        </div>
                        <div className="whythomso-second-child-the-legacy">
                            <div className="whythomso-second-child-the-legacy-image">
                            </div>
                            <div className="whythomso-second-child-the-legacy-content">
                                <div className="whythomso-second-child-the-legacy-content-heading">
                                    <h3>The Legacy</h3>
                                </div>
                                <div className="whythomso-second-child-the-legacy-content-content">
                                    <p>The 170 years old legacy of IIT Roorkee and 35+ successful years of Thomso are itself a testimony to the fest's grandeur</p>
                                </div>
                            </div>
                        </div>
                        <div className="whythomso-second-child-the-nightmare">
                            <div className="whythomso-second-child-the-nightmare-image">
                            </div>
                            <div className="whythomso-second-child-the-nightmare-content">
                                <div className="whythomso-second-child-the-nightmare-content-heading">
                                    <h3>The Prosperity</h3>
                                </div>
                                <div className="whythomso-second-child-the-nightmare-content-content">
                                    <p>With 150+ events and prizes woth more than 30 lakhs, Thomso attracts a crowd of over 50k people</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="review" className="whythomso-third-child">
                    <div className="whythomso-third-child-top">
                        <div className="whythomso-third-child-review">
                            <h3>Review Media</h3>
                        </div>
                    </div>
                    <div className="whythomso-third-child-middle">
                        <div className="whythomso-third-child-sliderwrapper">
                            <div className="whythomso-third-child-slider">
                                {/* <button className="whythomso-slider-leftarrow" onClick={this.handlePrevious} disabled={this.state.slideindex === 0}>
                                    <span className="whythomso-previous-arrow"><LeftArr /></span>PREV
                                </button> */}
                                <div className="cards-slider-wrapper">
                                    {
                                        this.state.videos.map((video, i) => (
                                            <div key={i} className={`ii${i}`} id={`i${i}`}>
                                                <iframe key={i} title={video} src={video} height="300" width="500" frameBorder="0" allowFullScreen>
                                                </iframe>
                                            </div>
                                        ))
                                    }
                                </div>
                                {/* <button className="whythomso-slider-rightarrow" onClick={this.handleNext} disabled={this.state.slideindex === this.state.videos.length - 1}>
                                    NEXT<span className="whythomso-next-arrow"><Arrow /></span>
                                </button> */}
                            </div>
                            {/* <div className="whythomso-third-child-iit-content">
                                <div className="whythomso-third-child-iit-content-heading">
                                    <h3>IIT Roorkee</h3>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
                <div id="blogs" className="whythomso-fourth-child">
                    <div className="whythomso-fourth-child-top">
                        <div className="whythomso-fourth-child-blogs">
                            <h3>Blogs</h3>
                        </div>
                    </div>
                    <div className="whythomso-fourth-child-recent-heading">
                        <h3><i>Recents</i></h3>
                    </div>
                    <div className="whythomso-fourth-child-middle">
                        <div className="whythomso-fourth-child-the-nightmare">
                            <Link to="/blog/Behind_the_scenes">
                                <div className="whythomso-fourth-child-the-nightmare-image">
                                </div>
                            </Link>
                            <div className="whythomso-fourth-child-the-nightmare-content">
                                <div className="whythomso-fourth-child-the-nightmare-content-heading">
                                    <Link to="/blog/Behind_the_scenes">
                                        <h3>Behind The Scenes</h3>
                                    </Link>
                                </div>
                                <div className="whythomso-fourth-child-the-nightmare-date">
                                    <h3>01.09.18</h3>
                                </div>
                                <div className="whythomso-fourth-child-the-nightmare-content-content">
                                    <p>“Rome wasn’t built in a day”, neither is Thomso. Be it a magnificent city or a magnificent fest, you have to lay bricks every hour to make things happen.</p>
                                </div>
                            </div>
                        </div>
                        <div className="whythomso-fourth-child-the-daymare">
                            <Link to="/blog/litfest">
                                <div className="whythomso-fourth-child-the-daymare-image">
                                </div>
                            </Link>
                            <div className="whythomso-fourth-child-the-daymare-content">
                                <div className="whythomso-fourth-child-the-daymare-content-heading">
                                    <Link to="/blog/litfest">
                                        <h3>Litfest</h3>
                                    </Link>
                                </div>
                                <div className="whythomso-fourth-child-the-daymare-date">
                                    <h3>23.09.18</h3>
                                </div>
                                <div className="whythomso-fourth-child-the-daymare-content-content">
                                    <p>Literature is the thread that we use the array of words with the power of expressions.It is the symphony of creative thoughts and orchestration of platitudes.</p>
                                </div>
                            </div>
                        </div>
                        {/* <div className="whythomso-fourth-child-the-evemare">
                            <div className="whythomso-fourth-child-the-evemare-image">
                            </div>
                            <div className="whythomso-fourth-child-the-evemare-content">
                                <div className="whythomso-fourth-child-the-evemare-content-heading">
                                    <h3>The Evemare</h3>
                                </div>
                                <div className="whythomso-fourth-child-the-evemare-date">
                                    <h3>06.09.2069</h3>
                                </div>
                                <div className="whythomso-fourth-child-the-evemare-content-content">
                                    <p>With 150+ events and prizes woth more than 30 lakhs, Thomso attracts a crowd of over 30000 people</p>
                                </div>
                            </div>
                        </div> */}
                    </div>
                    {/* <div className="whythomso-fourth-child-viewall">
                        <Link to="">View all<span><Arrow /></span></Link>
                    </div> */}
                </div>
                <div id="previous" className="whythomso-fifth-child">
                    <div className="whythomso-fifth-child-top">
                        <div className="whythomso-fifth-child-previous">
                            <h3>Associated Celebrities</h3>
                        </div>
                    </div>
                    <div className="whythomso-fifth-child-middle-parent">
                        <div className="whythomso-fifth-child-middle">
                            {this.state.artistdetails.map(e =>
                                <div className="whythomso-fifth-child-artist">
                                    <div className={`whythomso-fifth-child-image`}
                                        style={{
                                            backgroundImage: `url(/img/main/whythomso/${e.image})`,
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                            backgroundRepeat: "no-repeat"
                                        }}>
                                    </div>
                                    <div key={e.id} className="whythomso-fifth-child-name">
                                        {e.name}
                                    </div>
                                </div>

                            )}

                            {
                                this.state.viewmore && this.state.moreartists.map(e =>
                                    <div className="whythomso-fifth-child-artist">
                                        <div className={`whythomso-fifth-child-image`}
                                            style={{
                                                backgroundImage: `url(/img/main/whythomso/${e.image})`,
                                                backgroundSize: "cover",
                                                backgroundPosition: "center",
                                                backgroundRepeat: "no-repeat"
                                            }}>
                                        </div>
                                        <div key={e.id} className="whythomso-fifth-child-name">
                                            {e.name}
                                        </div>
                                    </div>
                                )}
                            <div className="whythomso-fifth-child-view-more-less">
                                {!this.state.viewmore ?
                                    <p onClick={() => this.setState({
                                        viewmore: !this.state.viewmore
                                    })}>View More...</p>
                                    : <p onClick={() => this.setState({
                                        viewmore: !this.state.viewmore
                                    })}>View Less.....</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}
