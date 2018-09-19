import React from 'react';
import AuthService from '../../../handlers/ca/temp/AuthService';
import FetchApi from '../../../utils/FetchAPI';

export default class ProfileIndex extends React.Component {
    constructor() {
        super();
        this.state = {
            profileData: null
        }
        this.Auth = new AuthService()
    }
    componentDidMount() {
        const authtoken = this.Auth.getToken()
        FetchApi('GET', '/api/ca/temp/profile', null, authtoken)
            .then(r => {
                if (r && r.data && r.data.success && r.data.body) {
                    this.setState({ profileData: r.data.body })
                }
            })
            .catch(e => console.log(e));
    }

    render() {
        return (
            <React.Fragment>
                {
                    (this.state.profileData && this.props.userData) ?
                        <div style={{width: '50%', float: 'right', border: 'dashed chartreuse', padding: '2vw'}}>
                            <div style={{display: 'flex', justifyContent: 'space-around', border: 'dashed chartreuse', padding: '1vw'}}>
                                <div style={{width: '50%', textAlign: 'left'}}> CA ID </div>
                                <div style={{width: '50%', textAlign: 'center'}}> {this.props.userData.ca_id} </div>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'space-around', padding: '1vw'}}>
                                <div style={{width: '50%', textAlign: 'left', border: 'dashed chartreuse'}}> Name </div>
                                <div style={{width: '50%', textAlign: 'center', border: 'dashed chartreuse'}}> {this.props.userData.name} </div>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'space-around', border: 'dashed chartreuse', padding: '1vw'}}>
                                <div style={{width: '50%', textAlign: 'left'}}> College </div>
                                <div style={{width: '50%', textAlign: 'center'}}> {this.props.userData.college} </div>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'space-around', padding: '1vw'}}>
                                <div style={{width: '50%', textAlign: 'left', border: 'dashed chartreuse'}}> Likes </div>
                                <div style={{width: '50%', textAlign: 'center', border: 'dashed chartreuse'}}> {this.state.profileData.fb_likes} </div>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'space-around', border: 'dashed chartreuse', padding: '1vw'}}>
                                <div style={{width: '50%', textAlign: 'left'}}> Shares </div>
                                <div style={{width: '50%', textAlign: 'center'}}> {this.state.profileData.fb_shares} </div>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'space-around', padding: '1vw'}}>
                                <div style={{width: '50%', textAlign: 'left', border: 'dashed chartreuse'}}> Facebook Score </div>
                                <div style={{width: '50%', textAlign: 'center', border: 'dashed chartreuse'}}> {this.state.profileData.score} </div>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'space-around', border: 'dashed chartreuse', padding: '1vw'}}>
                                <div style={{width: '50%', textAlign: 'left'}}> Referrals </div>
                                <div style={{width: '50%', textAlign: 'center'}}> {this.state.profileData.referrals} </div>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'space-around', padding: '1vw'}}>
                                <div style={{width: '50%', textAlign: 'left', border: 'dashed chartreuse'}}> Ideas </div>
                                <div style={{width: '50%', textAlign: 'center', border: 'dashed chartreuse'}}> {this.state.profileData.ideas ? this.state.profileData.ideas.length : 0} </div>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'space-around', border: 'dashed chartreuse', padding: '1vw'}}>
                                <div style={{width: '50%', textAlign: 'left'}}> Bonus </div>
                                <div style={{width: '50%', textAlign: 'center'}}> {this.state.profileData.bonus} </div>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'space-around', padding: '1vw'}}>
                                <div style={{width: '50%', textAlign: 'left', border: 'dashed chartreuse'}}> Total Score </div>
                                <div style={{width: '50%', textAlign: 'center', border: 'dashed chartreuse'}}> {this.state.profileData.score} </div>
                            </div>
                        </div>
                    : null
                }
            </React.Fragment>
        );
    }
}
