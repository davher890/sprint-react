import { getRequest, postRequest } from "./ApiService"

export const addData = (body) => {
    return postRequest("/groups", body)
}

export const findById = (id) => {
    return getRequest("/groups/" + id)
}

export const findAllGroups = () => {
    return getRequest("/groups/all")
}

export const findSpecializationGroups = () => {
    return getRequest("/groups/all?specialization=true")
}

export const findNotSpecializationGroups = () => {
    return getRequest("/groups/all?specialization=false")
}

export const findGroupSchedules = (id) => {
    return getRequest("/groups/" + id + "/schedules")
}

export const downloadGroupSchedulesExcel = (groupId, scheduleIds, columns) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(columns)
    }
    return fetch(process.env.REACT_APP_SERVER_URL + "/groups/" + groupId + "/schedules/" + scheduleIds.join("_") + "/athletes/excel", requestOptions)
        .then(response => {
            response.blob().then(blob => {
                let url = window.URL.createObjectURL(blob);
                let a = document.createElement('a');
                a.href = url;
                a.download = 'athletes.xlsx';
                a.click();
            })
        })
        .catch(function (e) {
            console.log("error", e);
        });
}

export const findGroupAttendance = (groupId, month) => {
    return fetch(process.env.REACT_APP_SERVER_URL + "/groups/" + groupId + "/attendance?month=" + month)
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