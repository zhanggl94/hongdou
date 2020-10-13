import qs from 'querystring';

export const getData = url => fetch(url).then(res => res.json());

export const postData = (url, data) => fetch(url, {
    method: 'post',
    headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: qs.stringify(data)
}).then(res => res.json());