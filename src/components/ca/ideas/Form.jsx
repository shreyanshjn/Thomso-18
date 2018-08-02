import React from 'react';
import AuthService from '../../../handlers/ca/AuthService';
import FetchApi from '../../../utils/FetchAPI';

import "./css/idea.css";

let timeout;
export default class Form extends React.Component {
    constructor() {
        super()
        this.state = {
            title: '',
            body: '',
            errors: '',
            isDisabled: false,
            isIncrease: false,
            isVisible: false
        }
        this.Auth = new AuthService()
    }

    onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });
    }
    onSubmit = (e) => {
        e.preventDefault();
        const { title, body } = this.state;
        const data = { title, body }
        if (title && title.trim() && body && body.trim()) {
            const authtoken = this.Auth.getToken()
            this.setState({ isDisabled: true })
            FetchApi('POST', '/api/ca/idea', data, authtoken)
                .then(r => {
                    console.log(r)
                    if (r && r.data) {
                        if (r.data.success && r.data.body) {
                            this.props.addIdea(r.data.body);
                            this.setState({ isDisabled: false })
                        } else {
                            this.setState({ isVisible: true, errors: 'Cannot add Idea' })
                            timeout = setTimeout(() => this.setState({ isVisible: false, isDisabled: false }), 3000)
                        }
                    } else {
                        this.setState({ isVisible: true, errors: 'Server did not respond' })
                        timeout = setTimeout(() => this.setState({ isVisible: false, isDisabled: false }), 3000)
                    }
                })
                .catch(e => {
                    console.log(e);
                    this.setState({ isVisible: true, errors: 'Error adding idea' })
                    timeout = setTimeout(() => this.setState({ isVisible: false, isDisabled: false }), 3000)
                });
        } else {
            this.setState({ errors: 'Fields cannot be empty' })
            timeout = setTimeout(() => this.setState({ isVisible: false }), 3000)
        }
    }

    componentWillUnmount() {
        clearTimeout(timeout)
    }

    handleEvent = event => {
        if (event.key == 'Enter') {
            console.log('enter press here! ')

        }
    }
    render() {
        const { title, body, errors, isVisible } = this.state;
        return (
            <form className="form-idea" onSubmit={this.onSubmit} noValidate>
                {isVisible ? errors : null}
                <div className="heading">
                    <h2>Share your ideas</h2>
                </div>
                <div className="ideasubject">
                    <span className="dot ideasub"></span>
                    <input
                        id="inputSubject"
                        type="text"
                        placeholder="Your Idea"
                        name="title"
                        value={title}
                        autoCorrect="off"
                        autoComplete="off"
                        autoCapitalize="on"
                        onChange={this.onChange}
                        required
                    />
                </div>
                <div className="details_idea">
                    <textarea
                        id="inputIdea"
                        placeholder="More details about your idea"
                        name="body"
                        rows="1"
                        value={body}
                        autoCorrect="off"
                        autoComplete="off"
                        autoCapitalize="on"
                        onChange={this.onChange}
                        onKeyPress={() => this.handleEvent}
                        required
                    />
                </div>
                <div className="submit">
                    <button type="submit" disabled={this.state.isDisabled} >Submit</button>
                </div>
            </form>)
    }
}
