import { LOGIN, SIGNUP } from "../../constants/action_types";

import { login, signup } from "../../../services/LoginService"

export function logIn(username: string, password: string) {
    return function (dispatch: any) {
        return login(username, password).then(json => {
            dispatch({ type: LOGIN, payload: json });
        });
    }
}

export function signUp(data: any) {
    return function(dispatch: any) {
        return signup(data).then(json => {
            dispatch({ type: SIGNUP, payload: json });
        });
    }
}