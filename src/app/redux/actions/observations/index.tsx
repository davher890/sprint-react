import * as ACTION_TYPES from "../../constants/action_types";

import { addData } from "../../../services/ObservationService"

export function addObservations(data: any) {
    return function (dispatch: any)  {
        return addData(data).then(json => {
            dispatch({ type: ACTION_TYPES.ADD_OBSERVATIONS, payload: json });
        });
    }
}