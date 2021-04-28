const headers = { 'Content-Type': 'application/json' }

export const getSportSchools = () => {
    return fetch(process.env.REACT_APP_SERVER_URL + "/sport_schools/all", { headers })
        .then(res => res.json())
}