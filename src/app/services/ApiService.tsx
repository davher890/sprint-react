
import jwt_decode from 'jwt-decode';

const serverUrl = process.env.REACT_APP_SERVER_URL

const headers: any = { 
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': sessionStorage.getItem('token')
}

const getPostRequestOptions = (body: any) => {
    return {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body)
    }
}

export const getRequest = (endpoint: string) => {

    return fetch((serverUrl || '') + endpoint, { headers } )
    .then(res => {
        if (res.status === 403){
            saveLastUrl(window.location.href)
            window.open("/login", "_self");
        }
        saveToken(res.headers)
        return res.json()
    })
}

export const deleteRequest = (endpoint: string) => {
    const requestOptions = {
        method: 'DELETE',
        headers: headers
    }
    return fetch((serverUrl || '') + endpoint, requestOptions).then(res => {
        if (res.status === 403){
            saveLastUrl(window.location.href)
            window.open("/login", "_self");
        }
        saveToken(res.headers)
        return res.json()
    })
}

export const postRequest = (endpoint: string, body: Object) => {
    return fetch((serverUrl || '') + endpoint, getPostRequestOptions(body))
    .then(res => {
        if (res.status === 403){
            saveLastUrl(window.location.href)
            window.open("/login", "_self");
        }
        saveToken(res.headers)
        return res.json()
    })
}


export const getExcelRequest = (endpoint: string, excelName: string) => {
    return fetch((serverUrl || '') + endpoint, { headers })
    .then(res => {
        if (res.status === 403){
            saveLastUrl(window.location.href)
            window.open("/login", "_self");
        }
        else {
            res.blob().then(blob => {
                let url = window.URL.createObjectURL(blob);
                let a = document.createElement('a');
                a.href = url;
                a.download = excelName;
                a.click();
            })
        }
    })
    .catch(function () {
        console.log("error");
    });
}

export const postExcelRequest = (endpoint: string, body: Object, excelName: string) => {
    return fetch((serverUrl || '') + endpoint, getPostRequestOptions(body))
    .then(res => {
        if (res.status === 403){
            saveLastUrl(window.location.href)
            window.open("/login", "_self");
        }
        else {
            res.blob().then(blob => {
                let url = window.URL.createObjectURL(blob);
                let a = document.createElement('a');
                a.href = url;
                a.download = excelName;
                a.click();
            })
        }
    })
    .catch(function () {
        console.log("error");
    });
}

export const loginRequest = (endpoint: string, body: Object) => {
    return fetch((serverUrl || '') + endpoint, getPostRequestOptions(body))
    .then(res => {
        saveToken(res.headers)
        const lastUrl = sessionStorage.getItem('last_url')
        if (lastUrl){
            window.open(lastUrl, "_self");
        } else {
            window.open("/athletes", "_self");
        }
    })
}

const saveLastUrl = (url: string) => {
    sessionStorage.setItem('last_url', url || '');
}

const saveToken = (headers: Headers) => {
    const token = headers.get('authorization') || ''

    let decoded: any = jwt_decode(token);
    sessionStorage.setItem('token', token || '');
    sessionStorage.setItem('user_id', decoded.user_id || 0)
}