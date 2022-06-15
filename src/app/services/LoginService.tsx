import { loginRequest } from "./ApiService"


export const isAuthenticated = (): boolean => {
    return sessionStorage.getItem('token') != null
}

export const isAdmin = (): boolean => {
    return sessionStorage.getItem('is_admin') === 'true'
}

export const getUserId = (): number => {
    return +(sessionStorage.getItem('user_id') || 0 )
}

export const signup = (email: string, password: string) => {
    return loginRequest("/login", { email: email, password: password}).then((res: any) => {

        const lastUrl = sessionStorage.getItem('last_url')
        if (lastUrl){
            window.open(lastUrl, "_self");
        } else {
            window.open("/athletes/list", "_self");
        }
    })
}
