import React from 'react';
import "./css/idea.css";
import AuthService from '../../../handlers/ca/AuthService';
import FetchApi from '../../../utils/FetchAPI';

export default class IdeasIndex extends React.Component {
    constructor() {
        super();
        this.state = {
            title: '',
            body: '',
            errors: ''
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
        if (title && body) {
            const authtoken = this.Auth.getToken()
            FetchApi('POST', '/api/ca/idea', data, authtoken)
                .then(r => {
                    console.log(r)
                    // if (r && r.data ) {

                    // }
                })
                .catch(e => console.log(e));
        } else {
            this.setState({ errors: 'Fields cannot be empty' })
        }
    }

    render() {
        const { title, body, errors } = this.state;
        return (
            <div className="side-nav-parent">
                <form onSubmit={this.onSubmit}>
                    {errors ?
                        <div>
                            {errors}
                        </div>
                        : null
                    }
                    <div className="heading">
                        <span className="dot"></span><h2>Share your ideas</h2>
                    </div>
                    <div className="ideasubject">
                        <span className="dot ideasub"></span>
                        <input
                            id="inputSubject"
                            type="text"
                            placeholder="Your Idea"
                            name="title"
                            value={title}
                            onChange={this.onChange}
                            required
                        />
                    </div>
                    <div className="details_idea">
                        <textarea
                            id="inputIdea"
                            placeholder="More details about your idea"
                            rows="1"
                            name="body"
                            value={body}
                            onChange={this.onChange}
                            required
                        />
                    </div>
                    <div className="submit">
                        <button type="submit">Submit</button>
                    </div>
                </form>
                <div className="aideas">
                    <div className="asubideas">
                        <div>
                            <div className="asubject">
                                <span className="dot"></span><h2>Make a fish pot</h2>
                            </div>
                            <div className="adetails">
                                <p>Fishes are Fishes</p>
                            </div>
                            <div className="submit subdel">
                                <button className="delete">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}
