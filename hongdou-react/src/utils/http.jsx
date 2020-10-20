import qs from 'querystring';

const getHeaders = (isToken) => {
    const headers = {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/x-www-form-urlencoded'
    };

    if (isToken && localStorage.getItem('jwtToken')) {
        headers.jwtToken = localStorage.getItem('jwtToken');
    }
    return headers;
}

export const getData = (url, isToken = false) => fetch(url, {
    method: 'get',
    headers: getHeaders(isToken)
}).then(res => res.json());

export const postData = (url, data, isToken = false) => fetch(url, {
    method: 'post',
    headers: getHeaders(isToken),
    body: qs.stringify(data)
}).then(res => res.json());