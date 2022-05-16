import { loginRequest } from "./ApiService"

export const signup = (email: string, password: string) => {
    return loginRequest("/login", { email: email, password: password})
}
