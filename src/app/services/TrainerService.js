import { getRequest, postRequest } from "./ApiService"


export const findAll = () => {
    return getRequest( "/trainers/all")
}

export const addData = (body) => {
    return postRequest("/trainers", body)
}

export const findById = (id) => {
    return getRequest("/trainers/" + id)
}
