import React from 'react';
import AuthService from "../../../../handlers/main/admin/AuthService";
import FetchApi from "../../../../utils/FetchAPI";
import downloadCSV from '../../../../utils/JSONtoCSV';
import DataTable from './DataTable';
export default class HomeIndex extends React.Component {
    constructor() {
        super();
        this.state = {
            userData:[],
            currentPage: 0,
            totalPages: 0,
            limit: 0,
            errors:'',
            isAuthenticated:false
        };
        this.Auth = new AuthService();
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() { 
        let currentPage = 1;
        if (this.props.match && this.props.match.params && this.props.match.params.page) {
            currentPage = parseInt(this.props.match.params.page, 10);
        }
        const token = this.Auth.getToken()
        FetchApi('GET', `/api/main/admin/user/${currentPage}`, null, token)
            .then(r => {
                if (r && r.data) {
                    if (r.data.body && r.data.pages && r.data.limit) {
                        this.setState({ userData:r.data.body, totalPages: r.data.pages, limit: r.data.limit, currentPage });
                    } else {
                        this.setState({ errors:"Unable To Fetch" })
                    }
                }
            })
            .catch(e => {
                if(e & e.response && e.response.data && e.response.data.msg) this.setState({errors:e.response.data.msg})
                else this.setState({errors:'Something Went Wrong'})
            });
    }

    handleClick(event) {
        if (event.target && event.target.id) {
            this.props.history.push(`/main/admin/${event.target.id}`);
            const currentPage = event.target.id;
            const token = this.Auth.getToken()
            FetchApi('GET', `/api/main/admin/user/${currentPage}`, null, token)
                .then(r => {
                    if (r && r.data) {
                        if (r.data.body && r.data.pages && r.data.limit) {
                            this.setState({ userData:r.data.body, totalPages: r.data.pages, limit: r.data.limit, currentPage });
                        } else {
                            this.setState({ errors:"Unable To Fetch" })
                        }
                    }
                })
                .catch(e => {
                    if(e & e.response && e.response.data && e.response.data.msg) this.setState({errors:e.response.data.msg})
                    else this.setState({errors:'Something Went Wrong'})
                });
        }
    }

    download = () => {
        const token = this.Auth.getToken()
        FetchApi('GET', `/api/main/admin/user/all`, null, token)
            .then(r => {
                if (r && r.data) {
                    if (r.data.body) {
                        downloadCSV({data: r.data.body, filename: 'participant_registrations.csv'});
                    } else {
                        this.setState({ errors:"Unable To Fetch" })
                    }
                }
            })
            .catch(e => {
                if(e & e.response && e.response.data && e.response.data.msg) this.setState({errors:e.response.data.msg})
                else this.setState({errors:'Something Went Wrong'})
            });
    }

    render(){
        const {userData, currentPage, totalPages, limit, errors} = this.state;

        let renderPageNumbers;
        const pageNumbers = [];
        if (totalPages) {
            for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
            }

            renderPageNumbers = pageNumbers.map(number => {
                return (
                <li
                    key={number}
                    id={number}
                    onClick={this.handleClick}
                    style={{marginRight: '0.3em', color: 'green', userSelect: 'none', cursor: 'pointer'}}
                >
                    {number}
                </li>
                );
            });
        }

        return (
            <div>
                {errors ?
                    <div style={{textAlign: 'center', color: 'red', fontWeight: '600'}}>
                        {errors}
                    </div>
                : null}
                <button onClick={this.download}> Download </button>

                {totalPages ? 
                    <ul style={{listStyle: 'none', display: 'flex'}}>
                        {renderPageNumbers}
                    </ul>
                    : null
                }
                {(userData && userData.length) ? <DataTable participants={userData} currentPage={currentPage} limit={limit} /> : "No Data"}
                {totalPages ? 
                    <ul style={{listStyle: 'none', display: 'flex'}}>
                        {renderPageNumbers}
                    </ul>
                    : null
                }
            </div>
        )
    }
}
