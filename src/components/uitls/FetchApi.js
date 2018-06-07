import axios from 'axios';

const FetchApi = (method, url, params, TokenValue) => {
    return new Promise((resolve, reject) => {
        resolve(
                axios({
                method: method,
                url: url,
                data: params,
                headers: {
                    'Authorisation': TokenValue()
                },
                responseType: 'json'
            }))
    });
}

export default FetchApi;