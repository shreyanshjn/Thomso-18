import axios from 'axios';

const ApiRequest = (method, url, params) => {
    return new Promise((resolve, reject) => {
        resolve(
                axios({
                method: method,
                url: url,
                data: params,
                responseType: 'json'
            }))
    });
}

export default ApiRequest;