import { postRequest, deleteRequest } from "./ApiService"

export const addData = (body: any) => {
    return postRequest("/observations", body)
}

export const deleteObservation = (id: number) => {
    return deleteRequest("/observations/" + id)
}