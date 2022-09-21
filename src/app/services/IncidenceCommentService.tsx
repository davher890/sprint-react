import { postRequest } from "./ApiService"

export const addData = (body: any) => {
    return postRequest("/incidence_comments", body)
}