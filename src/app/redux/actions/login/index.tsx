import { SIGNUP } from "../../constants/action_types";

import { signup } from "../../../services/LoginService"

export function signUp(username: string, password: string) {
    return function (dispatch: any) {
        return signup(username, password).then(json => {
            dispatch({ type: SIGNUP, payload: json });
        });
    }
}
