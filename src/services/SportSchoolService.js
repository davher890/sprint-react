const headers = { 'Content-Type': 'application/json' }

export const findDataPagination = () => {
    return fetch(process.env.REACT_APP_SERVER_URL + "/sport_schools", { headers })
        .then(res => res.json())
}

export const findAll = () => {
    return fetch(process.env.REACT_APP_SERVER_URL + "/sport_schools/all", { headers })
        .then(res => res.json())
}

export const addData = (body) => {
    const requestOptions = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body)
    }
    return fetch(process.env.REACT_APP_SERVER_URL + "/sport_schools", requestOptions)
        .then(res => res.json())
}

export const findById = (id) => {
    return fetch(process.env.REACT_APP_SERVER_URL + "/sport_schools/" + id, { headers })
        .then(res => res.json())
}

export const downloadExcel = (columns) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(columns)
    }

    return fetch(process.env.REACT_APP_SERVER_URL + "/sport_schools/excel", requestOptions)
        .then(response => {
            response.blob().then(blob => {
                let url = window.URL.createObjectURL(blob);
                let a = document.createElement('a');
                a.href = url;
                a.download = 'sport_schools.xlsx';
                a.click();
            })
        })
        .catch(function () {
            console.log("error");
        });
}