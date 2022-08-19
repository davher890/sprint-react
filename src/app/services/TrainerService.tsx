import { getRequest, postRequest, deleteRequest } from "./ApiService"


export const findAll = () => {
    return getRequest( "/trainers/all")
}

export const addData = (body: any) => {
    return postRequest("/trainers", body)
}

export const findById = (id: number) => {
    return getRequest("/trainers/" + id)
}

export const deleteTrainer = (id: number) => {
    return deleteRequest("/trainers/" + id)
}
export const downloadExcel = (columns: any) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(columns)
    }
    return fetch(process.env.REACT_APP_SERVER_URL + "/trainers/excel", requestOptions)
        .then(response => {
            response.blob().then(blob => {
                let url = window.URL.createObjectURL(blob);
                let a = document.createElement('a');
                a.href = url;
                a.download = 'trainers.xlsx';
                a.click();
            })
        })
        .catch(function () {
            console.log("error");
        });
}
