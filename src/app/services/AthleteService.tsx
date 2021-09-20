import { getRequest, postRequest } from "./ApiService"

export const addData = (body: any) => {
    return postRequest("/athletes", body)
}

export const findById = (id: number) => {
    return getRequest("/athletes/" + id)
}

export const findAthleteFee = (body: any) => {
    return postRequest("/athletes/fee", body)
}

export const downloadExcel = (columns: any, endpoint: string = "/athletes/excel") => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(columns)
    }
    return fetch(process.env.REACT_APP_SERVER_URL + endpoint, requestOptions)
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

// Sportdata
export const addAthleteSportdata = (body: any) => {
    return postRequest("/sportdata", body)
}