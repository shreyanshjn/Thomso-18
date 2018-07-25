import React from 'react';

import AuthService from '../../../handlers/ca/AuthService';
import FetchApi from '../../../utils/FetchAPI';

import Card from './Card';

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

    sharePost = data => {
        let postId = data.id.split('_')[1];
        let full_picture = data.full_picture;
        let caption = data.message;
        let feedObject = {
            method: 'share',
            // name: 'Test Name',
            // message: 'test Message'
        };
        if (postId) {
            feedObject['href'] = `https://www.facebook.com/thomsoiitroorkee/posts/${postId}`;
            feedObject['link'] = `https://www.facebook.com/thomsoiitroorkee/posts/${postId}`;
        }
        if (caption) {
            // feedObject['caption'] = caption;
        }
        if (full_picture) {
            // feedObject['picture'] = full_picture;
        }
        console.log(feedObject)
        window.FB.ui(feedObject, r => {
            debugger
            console.log(r)
            if(r && !r.error_code){
                
                // const authtoken = this.Auth.getToken();
                // FetchApi('PUT',`/api/ca/posts/${postId}`, null, authtoken)
                //     .then(result => {
                //         console.log(result)
                //         if (result.data) {
                //             this.setState({isVisible: true, message: 'Post Successfully Shared'});
                //             setTimeout(() => this.setState({isVisible: false}), 3000);
                //         }
                //     })
                //     .catch(error => {
                //         if(error.response && error.response.status === 401) {
                //             this.setState({ message: 'Token Expired' });
                //             this.props.history.push('/ca/logout')
                //         } else {
                //             this.setState({ message: 'Unable to Connect to Server' });
                //         }
                //     });
            }
            else{
                this.setState({isVisible: true, message: 'Post Couldnt be shared'});
                setTimeout(() => this.setState({isVisible: false}), 3000);
            }
        })
    }

    componentDidMount() {
        window.FB.init({
            appId : process.env.REACT_APP_FB_ID,
            status: true,
            xfbml: true
        });

        const authtoken = this.Auth.getToken();
        FetchApi('GET','/api/ca/posts', null, authtoken)
            .then((result) => {
                if (result.data && result.data.posts && result.data.posts.data && result.data.posts.data.length > 0) {
                    this.setState({ posts: result.data.posts.data });
                    console.log(result, 'Posts')
                }
            })
            .catch(error => {
                if(error.response && error.response.status === 401) {
                    this.setState({ message: 'Token Expired' });
                    // this.props.history.push('/ca/logout')
                } else {
                    this.setState({ message: 'Unable to Connect to Server' });
                }
            });
    }

    render() {
        const { posts, message, isVisible } = this.state;
        return (
            <div>
                {isVisible ? message : null}
                {posts ? posts.map( (post, index) => {
                    if(post.link) {
                        return <Card key={'CA-Home-Posts'+index} data={post} sharePost={this.sharePost} />
                    }
                    return null;
                }) : null}
            </div>
        )
    }
}
