// import * as ACTION_TYPES from "../../constants/action_types";

import { contactMail } from "../../../services/ContactService"

export function contact(from: string, subject: string, message: string) {
    // return function (dispatch: any) {
        return contactMail(from, subject, message)//.then(json => {
            // dispatch({ type: ACTION_TYPES.ADD_FAMILY, payload: json });
        // });
    // }
}
