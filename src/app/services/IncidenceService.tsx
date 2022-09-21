import { getRequest, postRequest } from "./ApiService"

export const addData = (body: any) => {
    return postRequest("/incidences", body)
}

export const findById = (id: number) => {
    return getRequest("/incidences/" + id)
}

export const findIncidenceComments = (id: number) => {
    return getRequest("/incidences/" + id + "/comments")
}

