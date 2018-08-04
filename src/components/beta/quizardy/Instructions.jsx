import React from 'react';

import './Instructions.css';


export default class Instructions extends React.Component{
  render(){
    return(
    <div>

          <div className="instructions-child">
            <div className="instructions-heading">
              INSTRUCTIONS
            </div>
            <br />1. The link of Quiz will be posted on this page at 10:00pm pm on Saturday.
            <br />2. As soon as you click on the link the quiz will start. You must enter your correct name, email id, mobile number, college, branch and year. It may just take 1 minute. Incorrect details may lead to disqualification.
            <br />3. Click on continue button and it will be followed by 40 questions of the given topic. The time limit is 10 minutes.
            <br />4. Each question will have only 1 answer.
            <br />5. There is no negative marking.
            <br />6. Each week winner will be declared on official Thomso Facebook Page.
            <br />7. You have to submit the quiz by yourself before 10:10 pm.
            <br />8. Late submission may lead to rejection.
            <br />9. In case of same marks, the person submitting in lesser time will be considered better than the other.
            <br />10. Link will be disabled after 10 minutes so make sure you have submitted your quiz on time.
          </div>
        </div>
    
  );
  }
}
