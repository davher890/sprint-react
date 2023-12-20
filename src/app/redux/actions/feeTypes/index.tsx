
import * as ACTION_TYPES from "../../constants/action_types";

import { findAll, addData } from "../../../services/FeeTypeService"

export function getFeeTypes() {
    return function (dispatch: any)  {
        return findAll().then(json => { dispatch({ type: ACTION_TYPES.LOAD_FEE_TYPES, payload: json }); });
    }
}

export function addFeeType(data: any) {
    return function (dispatch: any)  {
        return addData(data).then(json => {
            if (!json.errorMessage) {
                json.successMessage = "Datos guardados!"
            }
            dispatch({ type: ACTION_TYPES.ADD_FEE_TYPE, payload: json });
        });
    }
}