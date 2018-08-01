import React from 'react';
import WISCA from './WISCA.jsx';
import ROLES from './ROLES.jsx';
import CONTACT from './CONTACT.jsx';
import AuthService from '../../../handlers/ca/AuthService';
import FetchApi from '../../../utils/FetchAPI';
import LoginPage from './LoginPage';
import RegisterNavbar from './RegisterNavbar';
import {SectionsContainer, Section} from 'react-fullpage';
import arrow from './src/img/arrow.svg';
import './src/css/Main.css';
export default class LoginIndex extends React.Component {
    constructor(){
        super();
        this.state = {
            facebook: true,
        }
        this.Auth = new AuthService();
        this.facebookLogin = this.facebookLogin.bind(this);
    }

    componentDidMount(){
        window.FB.init({
            appId : process.env.REACT_APP_FB_ID,
            status: true,
            xfbml: true
        });
    }

    facebookLogin(){
        // let props = this.props;
        window.FB.login(response => {
            window.FB.api('/me?fields=id, name, email, gender, picture.type(large), link', res => {
                let accessToken = response.authResponse.accessToken;
                let {id, name, email, gender, link} = res;
                let image = res.picture.data.url;
                let data = {id, name, email, gender, image, accessToken, link};
                this.updateCheckUser(data)
            })
        }, {scope: 'email, user_likes ,user_posts ,user_gender, user_link' });
    }

    updateCheckUser(data) {
        FetchApi('POST', '/api/ca/auth/fblogin', data)
            .then(r => {
                console.log(r)
                if (r && r.data && r.data.body) {
                    if (r.data.body.created) {
                        // Set isAuthenticated
                        this.Auth.setToken(r.data.token)
                        this.props.updateRoutes(true)
                        this.props.setUserData(r.data.body)
                    } else {
                        // Pass data to parent
                        this.Auth.setTempToken(r.data.token)
                        this.props.setUserData(r.data.body)
                        this.props.history.push('/ca/register')
                    }
                }
            })
            .catch(e => console.log(e));
    }
render(){
        let options = {
            sectionClassName:     'section',
            anchors:              ['home', 'WISCA', 'ROLES','contactUs'],
            scrollBar:            false,
            navigation:           false,
            verticalAlign:        false,
            sectionaddingTop:    '0px',
            slidesNavPosition: 'bottom',
            arrowNavigation:      true
        };
        return(
            <div className="middlesection">
                <RegisterNavbar />
                <SectionsContainer {...options}>
                    <Section>
                        <div>
                            <button className="buttonca" onClick={() => this.facebookLogin()}>Login/Register</button>
                            <div className="arrowmove">
                                <a href="#aboutUs" address="true">
                                    <img src={arrow} className="downarrow bounce" alt=
                                        "a"/>
                                </a>
                            </div>
                        </div>
                    </Section>
                    <Section>
                      <WISCA />
                    </Section>
                    <Section>
                    <ROLES />
                    </Section>
                    <Section>
                      <CONTACT />
                    </Section>
                </SectionsContainer>
            </div>
        );
    }
}
