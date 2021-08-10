const headers = { 'Content-Type': 'application/json' }

export const findAll = () => {
    return fetch(process.env.REACT_APP_SERVER_URL + "/schedules/all", { headers })
        .then(res => res.json())
}