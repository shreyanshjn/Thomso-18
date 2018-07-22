import React from 'react';

import AuthService from '../../../handlers/ca/AuthService';
import FetchApi from '../../../utils/FetchAPI';

export default class IdeasIndex extends React.Component {
    constructor(){
        super();
        this.state = {
            title : '',
            body: '',
            errors: ''
        }
        this.Auth = new AuthService()
    }

    onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
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
            this.setState({errors: 'Fields cannot be empty'})
        }
    }

    render(){
        const { title, body, errors } = this.state;
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    {errors ?
                        <div>
                            {errors}
                        </div>
                        : null
                    }
                    <h2>Submit Your Ideas</h2>
                    <label htmlFor="inputSubject">What's it about?</label>
                    <input 
                        id="inputSubject" 
                        type="text" 
                        placeholder="Idea Subject" 
                        name="title" 
                        value={title} 
                        onChange={this.onChange} 
                        required
                    />
                    <label htmlFor="inputIdea">Why should we choose you?</label>
                    <textarea 
                        id="inputIdea" 
                        placeholder="Idea Body" 
                        rows="5" 
                        name="body" 
                        value={body} 
                        onChange={this.onChange} 
                        required
                    />
                    <button type="submit">Register</button>
                </form>
            </div>
        );
    }
}
