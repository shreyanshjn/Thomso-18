import React from 'react';

import AuthService from '../../../handlers/ca/AuthService';
import FetchApi from '../../../utils/FetchAPI';
export default class HomeIndex extends React.Component{
    constructor(){
        super();
        this.state = {
            isVisible: true,
            posts: null,
            message:''
        };
        this.Auth = new AuthService();
    }

    // sharePost(id) {
    //     let postId = id.split('_')[1];
    //     window.FB.ui({
    //         method: 'share',
    //         href: `https://www.facebook.com/thomsoiitroorkee/posts/${postId}`
    //     }, r => {
    //         if(r && !r.error_code){
    //             FetchApi('post', CaSharePostUrl, {postId: r.post_id}, FbToken)
    //                 .then(r => {
    //                     let data = r.data;
    //                     this.setState({success: data.success});
    //                     setTimeout(() => this.setState({success: false}), 3000)
    //                 })
    //                 .catch(e => console.log(e));
    //         }
    //         else{
    //             this.setState({shareError: true});
    //             setTimeout(() => this.setState({shareError: false}), 3000);
    //         }
    //     })
    // }

    componentWillMount() {
        const authtoken = this.Auth.getToken();
        FetchApi('GET','/api/ca/posts', null, authtoken)
            .then((result) => {
                console.log(result, 'Posts')
                // this.setState({ participants: result.data });
            })
            .catch(error => {
                if(error.response && error.response.status === 401) {
                    this.setState({ message: 'Token Expired' });
                    // this.props.history.push('/ca/admin/logout')
                } else {
                    this.setState({ message: 'Unable to Connect to Server' });
                }
            });
    }

    render(){
        return (
            <div>
                CA Home
            </div>
        )
    }
}
