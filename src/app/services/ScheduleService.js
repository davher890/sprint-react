import { getRequest } from "./ApiService"

export const findAll = () => {
    return getRequest("/schedules/all")
}