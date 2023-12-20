import { getRequest, postRequest, deleteRequest } from "./ApiService"

const endpoint = 'fee_types'

export const findAll = () => {
    return getRequest(`/${endpoint}/all`)
}

export const addData = (body: any) => {
    return postRequest(`/${endpoint}`, body)
}

export const deleteGroup = (id: number) => {
    return deleteRequest(`/${endpoint}/id`)
}
