import axios from 'axios';

const FetchApi = (method, url, params, TokenValue) => {
    return new Promise((resolve, reject) => {
        axios({
            method: method,
            url: url,
            data: params,
            headers: {
                'Authorization': TokenValue
            },
            responseType: 'json'
        })
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
}

export default FetchApi;