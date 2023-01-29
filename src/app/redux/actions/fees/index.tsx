import * as ACTION_TYPES from "../../constants/action_types";

import { addData } from "../../../services/FeeService"

export function addFee(data: any) {
    return function (dispatch: any)  {
        return addData(data).then(json => {
            dispatch({ type: ACTION_TYPES.ADD_FEE, payload: json });
        });
    }
}
