import { getRequest, postRequest } from "./ApiService"

export const findAll = () => {
    return getRequest("/schedules/all")
}

export const addData = (body) => {
    return postRequest("/schedules", body)
}

export const findById = (id) => {
    return getRequest("/schedules/" + id)
}