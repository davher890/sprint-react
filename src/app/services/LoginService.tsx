import { loginRequest, postRequest } from "./ApiService"
import session from "../utils/Session";

export const isAuthenticated = (): boolean => {
    return sessionStorage.getItem('token') != null
}

export const isAdmin = (): boolean => {
    return sessionStorage.getItem('is_admin') === 'true'
}

export const isManager = (): boolean => {
    return sessionStorage.getItem('is_manager') === 'true'
}

export const getUserId = (): number => {
    return +(sessionStorage.getItem('user_id') || 0 )
}

export const login = (email: string, password: string) => {
    return loginRequest("/login", { email: email, password: password}).then((res: any) => {

        let json:any = {}
        if (res.status !== 200){
            json.errorMessage = "Email o contraseña incorrectos"
        }
        else {
            session.saveToken(res.headers)
            const lastUrl = sessionStorage.getItem('last_url')
            if (lastUrl){
                window.open(lastUrl, "_self");
            } else {
                window.open("/athletes/list", "_self");
            }
        }
        return json
    })
}

// export const signup = (data: any) => {
//     return postRequest("/signup", data).then((res: any) => {
//         window.open("/login", "_self");
//     })
// }
