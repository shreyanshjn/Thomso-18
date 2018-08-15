import React from 'react';
import '../src/css/SectionComp.css';
export default class SectionComp extends React.Component {
    scrollToRegister = () => {
        const height = window.innerHeight
        const push = 2*height
        window.scroll({top: push, behavior: "smooth"});
    }

    render() {
        return (
            <div className={`zonals-common-comp1 ${this.props.Name}`}>
                    <div className="zonal-common-comp1-heading">
                        <div>
                            {this.props.heading}
                        </div>
                    </div>
                    <div className="zonal-common-comp1-content">
                        {this.props.content}
                    </div>
                    <div className="zonal-common-comp1-register">
                        <div className="zonal-common-comp1-register-child1" style={!this.props.downloadPdf ? {width: 'auto'} : null}>
                            <div>
                                <button className="zonal-comp1-button" onClick={() => this.scrollToRegister()}>REGISTER</button>
                            </div>
                        </div>
                        {this.props.downloadPdf ?
                            <div className="zonal-common-comp1-register-child2">
                                <div>
                                    <a href={`/pdf/zonals/${this.props.downloadPdf}`}> <abbr title="Click to download"><button className="zonal-comp1-button">RULEBOOK</button></abbr></a>
                                </div>
                            </div>
                            : null}
                    </div>
            </div>
        );
    }
}


