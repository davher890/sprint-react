import { postRequest, deleteRequest } from "./ApiService"

export const addData = (body: any) => {
    return postRequest("/receipt_athlete_observations", body)
}

export const deleteObservation = (id: number) => {
    return deleteRequest("/receipt_athlete_observations/" + id)
}