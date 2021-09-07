import { getRequest, postRequest } from "./ApiService"


export const findAll = () => {
    return getRequest( "/trainers/all")
}

export const addData = (body: any) => {
    return postRequest("/trainers", body)
}

export const findById = (id: number) => {
    return getRequest("/trainers/" + id)
}
