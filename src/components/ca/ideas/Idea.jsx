import React from 'react';
import AuthService from '../../../handlers/ca/AuthService';
import FetchApi from '../../../utils/FetchAPI';

import "./css/idea.css";

let timeout;
export default class IdeasIndex extends React.Component {
    constructor() {
        super();
        this.state = {
            title: '',
            body: '',
            comment: '',
            errors: '',
            isDisabled: false,
            isVisible: false,
            isEditing: false
        }
        this.Auth = new AuthService()
    }

    componentDidMount() {
        if (this.props.data) {
            if (this.props.data.comment) {
                this.setState({
                    title: this.props.data.title,
                    body: this.props.data.body,
                    comment: this.props.data.comment
                })
            } else {
                this.setState({
                    title: this.props.data.title,
                    body: this.props.data.body
                })
            }
        }
    }

    onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });
    }

    toggleEdit() {
        if (!this.state.isDisabled) {
            if (this.state.isEditing) {
                this.componentDidMount();
            }
            this.setState({ isEditing: !this.state.isEditing })
        }
    }

    componentWillUnmount() {
        clearTimeout(timeout)
    }

    onSubmit = (e) => {
        e.preventDefault();
        let { title, body } = this.state
        title = title.trim()
        body = body.trim()
        const data = { title, body }
        console.log(data)
        if (title && body && this.props.data && this.props.data._id) {
            this.setState({ isDisabled: true })
            const authtoken = this.Auth.getToken()
            FetchApi('PUT', `/api/ca/idea/${this.props.data._id}`, data, authtoken)
                .then(r => {
                    console.log(r)
                    if (r && r.data && r.data.success && r.data.body) {
                        this.props.updateIdea(this.props.index, r.data.body)
                        this.setState({ isDisabled: false, isEditing: false })
                    } else {
                        this.setState({ isVisible: true, errors: 'Server Failed to Update' })
                        timeout = setTimeout(() => this.setState({ isVisible: false, isDisabled: false }), 3000)
                    }
                })
                .catch(e => {
                    console.log(e);
                    this.setState({ isVisible: true, errors: 'Something Went Wrong' })
                    timeout = setTimeout(() => this.setState({ isVisible: false, isDisabled: false }), 3000)
                });
        } else {
            this.setState({ errors: 'Fields cannot be empty' })
            timeout = setTimeout(() => this.setState({ isVisible: false }), 3000)
        }
    }

    deleteIdea() {
        console.log('here', this.state.isDisabled)
        if (!this.state.isDisabled && this.props.data && this.props.data._id) {
            this.setState({ isDisabled: true })
            const authtoken = this.Auth.getToken()
            FetchApi('DELETE', `/api/ca/idea/${this.props.data._id}`, null, authtoken)
                .then(r => {
                    console.log(r)
                    if (r && r.data && r.data.success) {
                        this.setState({ isDeleted: true })
                        this.props.deleteIdea(this.props.index)
                    } else {
                        this.setState({ isVisible: true, errors: 'Server Failed to Update' })
                        timeout = setTimeout(() => this.setState({ isVisible: false, isDisabled: false }), 3000)
                    }
                })
                .catch(e => {
                    console.log(e);
                    this.setState({ isVisible: true, errors: 'Something Went Wrong' })
                    timeout = setTimeout(() => this.setState({ isVisible: false, isDisabled: false }), 3000)
                });
        }
    }

    render() {
        const { title, body, errors, isVisible, isEditing, comment } = this.state;
        return (
            <React.Fragment>
                {(!this.props.data || this.state.isDeleted) ?
                    null :
                    <form className="form-idea" onSubmit={this.onSubmit} novalidate>
                        {isVisible ? errors : null}
                        <div className="ideasubject">
                            <span className="dot ideasub"></span>
                            <input
                                id="inputSubject"
                                type="text"
                                name="title"
                                value={title}
                                autoCorrect="off"
                                autoComplete="off"
                                autoCapitalize="on"
                                disabled={!isEditing}
                                onChange={this.onChange}
                                required
                            />
                        </div>
                        <div className="details_idea">
                            <textarea
                                id="inputIdea"
                                rows="1"
                                name="body"
                                value={body}
                                autoCorrect="off"
                                autoComplete="off"
                                autoCapitalize="on"
                                disabled={!isEditing}
                                onChange={this.onChange}
                                required
                            />
                        </div>
                        <div className="comment">
                            <p>{comment}</p>
                        </div>
                        <div className="edit-cancel-submit">
                            <div className="edit-cancel">
                                <div onClick={() => this.toggleEdit()} >{this.state.isEditing ? 'Cancel' : 'Edit'}</div>
                            </div>
                            {this.state.isEditing ?
                                <div className="submit">
                                    <button type="submit" disabled={this.state.isDisabled}>Submit</button>
                                </div>
                                :
                                <div className="delete">
                                    <div onClick={() => this.deleteIdea()} disabled={this.state.isDisabled}>Delete</div>
                                </div>
                            }
                        </div>
                    </form>
                }
            </React.Fragment>
        );
    }
}
