import { postRequest, deleteRequest } from "./ApiService"

// Sportdata
export const addData = (body: any) => {
    return postRequest("/sportdata", body)
}
export const deleteById = (id: number) => {
    return deleteRequest("/sportdata/" + id)
}