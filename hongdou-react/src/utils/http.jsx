
const getHeaders = (isToken) => {
    const headers = {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json; charset=utf-8'
    };

    if (isToken && localStorage.getItem('jwtToken')) {
        headers.jwtToken = localStorage.getItem('jwtToken');
    }
    return headers;
}

export const getData = (url, isToken = true) => fetch(url, {
    method: 'get',
    headers: getHeaders(isToken)
}).then(res => res.json());

export const postData = (url, data, isToken = true) => fetch(url, {
    method: 'post',
    headers: getHeaders(isToken),
    body: JSON.stringify(data)
}).then(res => res.json());