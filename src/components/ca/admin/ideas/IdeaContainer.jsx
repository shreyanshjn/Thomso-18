import React from 'react';

import AuthService from '../../../../handlers/ca/admin/AuthService';
import FetchApi from '../../../../utils/FetchAPI';

export default class IdeaContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            message: '',
            comment: '',
            commentDisabled: true,
            deleteDisabled: false
        };
        this.Auth = new AuthService();
    }

    componentDidMount() {
        if (this.props.data && this.props.data.comment) {
            this.setState({comment: this.props.data.comment})
        }
    }

    onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
    }

    deletePost = () => {
        if (!this.state.deleteDisabled) {
            if (this.props.data && this.props.data._id) {
                // const authtoken = this.Auth.getToken();
                // FetchApi('GET',`/api/ca/admin/idea${this.props.data._id}`, {comment}, authtoken)
                //     .then((result) => {
                //         console.log(result)
                //     })
                //     .catch(error => {
                //         console.log(error)
                //     });
            }
        }
    }

    submitComment = () => {
        if (this.state.commentDisabled) {
            if (this.state.comment) {
                const comment = this.state.comment.trim();
                if (this.props.data && this.props.data._id && comment) {
                    const authtoken = this.Auth.getToken();
                    FetchApi('PUT',`/api/ca/admin/idea/${this.props.data._id}`, {comment}, authtoken)
                        .then((result) => {
                            console.log(result)
                        })
                        .catch(error => {
                            console.log(error)
                        });
                }
            }
        } else {
            // this.setState()
        }
    }

    render(){
        return(
            
            <React.Fragment>
                {this.props.data ?
                    <React.Fragment>
                        {(this.props.hidden && this.props.data.deleted) ?
                            null
                            :
                            <div style={this.props.data.deleted ? {background: 'Red'} : {background: 'Grey'} }>
                                {this.state.message}
                                {this.props.data.user ? 
                                    <div>
                                        {this.props.data.user.image ?
                                            <div>
                                                <img style={{height: 'auto', width: '25px'}} src={this.props.data.user.image} alt={this.props.data.user.ca_id} />
                                            </div>
                                            : 
                                            <div>
                                                No Image Found
                                            </div>
                                        }
                                        {this.props.data.user.name ?
                                            <div>
                                                {this.props.data.user.name}
                                            </div>
                                            : 
                                            <div>
                                                Name
                                            </div>
                                        }
                                        {this.props.data.user.ca_id ?
                                            <div>
                                                {this.props.data.user.ca_id}
                                            </div>
                                            : 
                                            <div>
                                                CA-ID
                                            </div>
                                        }
                                    </div> : null
                                }
                                {
                                    this.props.data.title ? 
                                        <div>{this.props.data.title}</div> : null
                                }
                                {
                                    this.props.data.body ? 
                                        <div>{this.props.data.body}</div> : null
                                }
                                <input disabled={this.state.commentDisabled} value={this.state.comment} name='comment' onChange={this.onChange} />
                                <button onClick={() => this.submitComment()}> { this.state.commentDisabled ? 'Edit' : 'Submit' } </button>
                                <button onClick={() => this.deletePost()}> Delete </button>
                            </div>
                        }
                    </React.Fragment>
                    : null
                }
            </React.Fragment>
        )
    }
}