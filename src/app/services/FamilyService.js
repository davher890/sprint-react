import { getRequest, postRequest } from "./ApiService"

export const addData = (body) => {
    return postRequest("/families", body)
}

export const findById = (id) => {
    return getRequest("/families/" + id)
}