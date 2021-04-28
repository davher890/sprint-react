const headers = { 'Content-Type': 'application/json' }

export const getSpecializationGroups = () => {
    return fetch(process.env.REACT_APP_SERVER_URL + "/groups/all?specialization=true", { headers })
        .then(res => res.json())
}

export const getNotSpecializationGroups = () => {
    return fetch(process.env.REACT_APP_SERVER_URL + "/groups/all?specialization=false", { headers })
        .then(res => res.json())
}

export const getGroupSchedules = (id) => {
    return fetch(process.env.REACT_APP_SERVER_URL + "/groups/" + id + "/schedules", { headers })
        .then(res => res.json())
}