/**
 * 生成默认的Web请求Header
 * @param {*} method 请求方式：Get/Post等。默认GET
 * @returns 
 */
const getDefaultHeaders = (method = 'GET') => {
    const headers = new Headers();
    headers.append('Accept', 'application/json, text/plain, */*');
    headers.append('Content-Type', 'application/json; charset=utf-8',);
    headers.append('jwtToken', localStorage.getItem('jwtToken'));
    return headers;
}

/**
 * 以GET的方式调用Fetch
 * @param {*} url 
 * @param {*} options 
 * @returns 
 */
export const getData = (url, options = {}) => {
    options.headers = getDefaultHeaders();
    options.method = 'GET';
    return commonFetch(url, options);
}

/**
 * 以POST的方式嗲用Fetch
 * @param {*} url 
 * @param {*} data 
 * @param {*} options 
 * @returns 
 */
export const postData = (url, data, options = {}) => {
    options.headers = getDefaultHeaders('POST');
    options.method = 'POST';
    options.body = JSON.stringify(data);
    return commonFetch(url, options);
}

/**
 * Fetch的请求操作
 * @param {*} url 
 * @param {*} options 
 * @returns 
 */
const commonFetch = (url, options) => {
    return new Promise((resolve, reject) => {
        let timeout = false;
        // 判断请求是否超时
        let abortId = setTimeout(() => {
            timeout = true;
            reject(new Error('The url request timeout.'));
        }, options.timeout || 6000);
        fetch(url, { ...options })
            .then(res => { // 超时的情况
                if (timeout) {
                    throw new Error('The url request timeout.');
                }
                return res;
            })
            .then(checkStatus) // 判断登陆权限
            .then((res) => {
                clearTimeout(abortId);
                const result = res.json();
                result.then(data => {
                    if (data.isRefreshClientToken) { // 判断Token是否刷新，刷新后重新写Token
                        localStorage.setItem('jwtToken', data.jwtRefreshToken);
                    }
                });
                resolve(result);
            })
            .catch(e => {
                clearTimeout(abortId);
                reject(e);
            })
    });
}

/**
 * 判断是否有权限，权限不足时跳转到登陆页面
 * @param {*} response 
 * @returns 
 */
const checkStatus = (response) => {
    const { status } = response;
    if (status >= 200 && status <= 300) {
        return response;
    }

    // 权限不足，跳转到登陆页面
    if (status === 401 || status === 402) {
        // browserHistory.push('/signin');
        // window ? (widnow.location = '/signin') : null;
        const error = new Error(`${response.statusText}`);
        error.resposne = response;
        throw error;
    }
}