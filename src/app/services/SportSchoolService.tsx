import { getRequest, postRequest } from "./ApiService"

export const findAll = () => {
    return getRequest("/sport_schools/all")
}

export const addData = (body: any) => {
    return postRequest("/sport_schools", body)
}

export const findById = (id: number) => {
    return getRequest("/sport_schools/" + id)
}

export const downloadExcel = (columns: any) => {
    return fetch(process.env.REACT_APP_SERVER_URL + "/sport_schools/excel", columns)
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