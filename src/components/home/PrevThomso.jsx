import React from 'react';
import PrevThomsoCards from './PrevThomsoCards';

export default class PrevThomso extends React.Component{
    render(){
        return(
        	<div className="row">
		        <div className="col-sm-12 ">
                    <div className="row">
                        <div className="col-sm-4 col-sm-offset-1 "> {/* may be design cn be changed , can alter the the offset values if you need*/}
                            <PrevThomsoCards />
                        </div>
                        <div className="col-sm-4 col-sm-offset-2 ">
                            <PrevThomsoCards />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4 col-sm-offset-1 ">
                            <PrevThomsoCards />
                        </div>
                        <div className="col-sm-4 col-sm-offset-2 ">
                            <PrevThomsoCards />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}