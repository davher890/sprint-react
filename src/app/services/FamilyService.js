const headers = { 'Content-Type': 'application/json' }

export const addData = (body) => {
    const requestOptions = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body)
    }
    return fetch(process.env.REACT_APP_SERVER_URL + "/families", requestOptions)
        .then(res => res.json())
}

export const findById = (id) => {
    return fetch(process.env.REACT_APP_SERVER_URL + "/families/" + id, { headers })
        .then(res => res.json())
}