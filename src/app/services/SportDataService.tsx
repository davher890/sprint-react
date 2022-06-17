import { deleteRequest } from "./ApiService"

export const deleteById = (id: number) => {
    return deleteRequest("/sportdata/" + id)
}