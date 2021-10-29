const headers = { 
    'Content-Type': 'application/json',
    'Accept': 'application/json'
}
export const getRequest = (endpoint: string) => {
    return fetch((process.env.REACT_APP_SERVER_URL || '') + endpoint, { headers }).then(res => res.json())
}

export const deleteRequest = (endpoint: string) => {
    const requestOptions = {
        method: 'DELETE',
        headers: headers
    }
    return fetch((process.env.REACT_APP_SERVER_URL || '') + endpoint, requestOptions).then(res => res.json())
}

export const postRequest = (endpoint: string, body: Object) => {
    const requestOptions = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body)
    }
    return fetch((process.env.REACT_APP_SERVER_URL || '') + endpoint, requestOptions).then(res => res.json())
}

export const postExcelRequest = (endpoint: string, body: Object, excelName: string) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    }
    return fetch((process.env.REACT_APP_SERVER_URL || '') + endpoint, requestOptions)
        .then(response => {
            response.blob().then(blob => {
                let url = window.URL.createObjectURL(blob);
                let a = document.createElement('a');
                a.href = url;
                a.download = excelName;
                a.click();
            })
        })
        .catch(function () {
            console.log("error");
        });
}