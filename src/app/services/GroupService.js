const headers = { 'Content-Type': 'application/json' }

export const addData = (body) => {
    const requestOptions = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body)
    }
    return fetch(process.env.REACT_APP_SERVER_URL + "/groups", requestOptions)
        .then(res => res.json())
}

export const findById = (id) => {
    return fetch(process.env.REACT_APP_SERVER_URL + "/groups/" + id, { headers })
        .then(res => res.json())
}

export const findAllGroups = () => {
    return fetch(process.env.REACT_APP_SERVER_URL + "/groups/all", { headers })
        .then(res => res.json())
}

export const findSpecializationGroups = () => {
    return fetch(process.env.REACT_APP_SERVER_URL + "/groups/all?specialization=true", { headers })
        .then(res => res.json())
}

export const findNotSpecializationGroups = () => {
    return fetch(process.env.REACT_APP_SERVER_URL + "/groups/all?specialization=false", { headers })
        .then(res => res.json())
}

export const findGroupSchedules = (id) => {
    return fetch(process.env.REACT_APP_SERVER_URL + "/groups/" + id + "/schedules", { headers })
        .then(res => res.json())
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
}