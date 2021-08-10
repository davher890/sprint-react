const headers = { 'Content-Type': 'application/json' }

export const findAll = () => {
    return fetch(process.env.REACT_APP_SERVER_URL + "/trainers/all", { headers })
        .then(res => res.json())
}

export const addData = (body) => {
    const requestOptions = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body)
    }
    return fetch(process.env.REACT_APP_SERVER_URL + "/trainers", requestOptions)
        .then(res => res.json())
}

export const findById = (id) => {
    return fetch(process.env.REACT_APP_SERVER_URL + "/trainers/" + id, { headers })
        .then(res => res.json())
}
