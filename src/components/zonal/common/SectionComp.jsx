import React from 'react';
import '../src/css/SectionComp.css';
export default class SectionComp extends React.Component {
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
                        <div className="zonal-common-comp1-register-child1">
                            <div>
                                <button className="zonal-comp1-button">REGISTER</button>
                            </div>
                        </div>
                        <div className="zonal-common-comp1-register-child2">
                            <div>
                                <a href={`/pdf/zonals/${this.props.downloadPdf}`}> <abbr title="Click to download"><button className="zonal-comp1-button-rulebook">RULEBOOK</button></abbr></a>
                            </div>
                        </div>
                    </div>
            </div>
        );
    }
}


