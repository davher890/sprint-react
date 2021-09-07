import { getRequest, postRequest } from "./ApiService"

export const findAll = () => {
    return getRequest("/schedules/all")
}

export const addData = (body: any) => {
    return postRequest("/schedules", body)
}

export const findById = (id: number) => {
    return getRequest("/schedules/" + id)
}