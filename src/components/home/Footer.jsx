import React from 'react';
import './footer.css';



export default class Footer extends React.Component{
    render(){
        return(

	<div class = "footerBody">
        	<div className="row footerRow">
		        <div className="col-sm-3">
			  <h3>CONTACT</h3>
			  <ul class="FooterRow-Contact">
                    		<li>IIT ROORKEE UTTARAKHAND (257667)</li>
				<li>xyz@thomso.com</li>
			  </ul>
                	</div>
			<div className="col-sm-3">
						
			</div>
 	     	        <div className="col-sm-6">
                        <div class="flip-3d">
		  <figure>
		    <img src='src/img/stevejobs.jpeg' />
 		  <figcaption>
		    <span className = "captionSocial">Steve Jobs</span> <br />
		  <div class="wrapper">
  		    <i class="fa fa-5x fa-facebook-square"></i>
  		    <i class="fa fa-5x fa-twitter-square"></i>
		  </div>
		  </figcaption>
		  </figure>
		</div>
  
		<div class="flip-3d" >
  		  <figure>
   		    <img src='src/img/billgates.jpeg' />
   		  <figcaption>
		    <span className = "captionSocial">Bill Gates</span> <br />
    		  <div class="wrapper">
  		    <i class="fa fa-5x fa-facebook-square"></i>
  		    <i class="fa fa-5x fa-twitter-square"></i>
		  </div>
		  </figcaption>
  		  </figure>
  		</div>
	
                	</div>
		</div>
                <div className="row">
                
                </div>
          </div>

        )
    }
}
