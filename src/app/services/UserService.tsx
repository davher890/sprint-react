import { getRequest, postRequest } from "./ApiService"

export const addData = (body: any) => {
    return postRequest("/users", body)
}

export const changePassword = (body: any) => {
    return postRequest("/users/password", body)
}

export const findById = (id: number) => {
    return getRequest("/users/" + id)
}

export const findCurrentUserId = () => {
    return sessionStorage.getItem('user_id')
} 