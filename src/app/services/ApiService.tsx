const headers: any = { 
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': sessionStorage.getItem('token')
}

export const getRequest = (endpoint: string) => {

    return fetch((process.env.REACT_APP_SERVER_URL || '') + endpoint, { headers } )
    .then(res => {
        if (res.status === 403){
            saveLastUrl(window.location.href)
            window.open("/login", "_self");
        }
        return res.json()
    })
}

export const postRequest = (endpoint: string, body: Object) => {
    const requestOptions = {
        method: 'POST',
        headers: { headers },
        body: JSON.stringify(body)
    }
    return fetch((process.env.REACT_APP_SERVER_URL || '') + endpoint, requestOptions).then(res => {
        if (res.status === 403){
            saveLastUrl(window.location.href)
            window.open("/login", "_self");
        }
        return res.json()
    })
}

export const loginRequest = (endpoint: string, body: Object) => {
    const requestOptions = {
        method: 'POST',
        headers: { headers },
        body: JSON.stringify(body)
    }
    return fetch((process.env.REACT_APP_SERVER_URL || '') + endpoint, requestOptions).then(res => {
        saveToken(res.headers)
        const lastUrl = sessionStorage.getItem('last_url')
        if (lastUrl){
            window.open(lastUrl, "_self");
        } else {
            window.open("/athletes", "_self");
        }
    })
}

const saveToken = (headers: Headers) => {
    sessionStorage.setItem('token', headers.get('authorization') || '');
}

const saveLastUrl = (url: string) => {
    sessionStorage.setItem('last_url', url || '');
}