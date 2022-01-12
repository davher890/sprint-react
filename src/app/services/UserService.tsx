import { getRequest, postRequest } from "./ApiService"

export const addData = (body: any) => {
    return postRequest("/users", body)
}

export const findById = (id: number) => {
    return getRequest("/users/" + id)
}