const headers = { 'Content-Type': 'application/json' }

export const addData = (body) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    }
    return fetch(process.env.REACT_APP_SERVER_URL + "/athletes", requestOptions)
        .then(res => res.json())
}

export const findById = (id) => {
    return fetch(process.env.REACT_APP_SERVER_URL + "/athletes/" + id, { headers })
        .then(res => res.json())
}

export const findAthletesFee = (body) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    }
    return fetch(process.env.REACT_APP_SERVER_URL + "/athletes/fee", requestOptions)
        .then(res => res.json())
}

export const downloadExcel = (columns) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(columns)
    }

    return fetch(process.env.REACT_APP_SERVER_URL + "/athletes/excel", requestOptions)
        .then(response => {
            response.blob().then(blob => {
                let url = window.URL.createObjectURL(blob);
                let a = document.createElement('a');
                a.href = url;
                a.download = 'athletes.xlsx';
                a.click();
            })
        })
        .catch(function () {
            console.log("error");
        });
}