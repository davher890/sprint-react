import { getRequest, postRequest } from "./ApiService"

export const addData = (body: any) => {
    return postRequest("/families", body)
}

export const findById = (id: number) => {
    return getRequest("/families/" + id)
}