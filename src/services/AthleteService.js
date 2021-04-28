const headers = { 'Content-Type': 'application/json' }

export const postAthlete = (body) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    }
    return fetch(process.env.REACT_APP_SERVER_URL + "/athletes", requestOptions)
        .then(res => res.json())
}

export const getAthleteById = (id) => {
    return fetch(process.env.REACT_APP_SERVER_URL + "/athletes/" + id, { headers })
        .then(res => res.json())
}

export const getAthletesFee = (body) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    }
    return fetch(process.env.REACT_APP_SERVER_URL + "/athletes/fee", requestOptions)
        .then(res => res.json())
}