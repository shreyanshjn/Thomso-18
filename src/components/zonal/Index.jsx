import React from 'react';
import DelhiZone from './delhi/DelhiZone';
import './src/css/Index.css';
export default class ZonalsIndex extends React.Component{
    render(){
        return (
            <div className="zonals-indexmain">
                <DelhiZone />
                <div>first layer</div>
            </div>
        )
    }
}

