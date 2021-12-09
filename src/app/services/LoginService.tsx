import { loginRequest } from "./ApiService"

export const signup = (username: string, password: string) => {
    return loginRequest("/login", { username: username, password: password})
}
