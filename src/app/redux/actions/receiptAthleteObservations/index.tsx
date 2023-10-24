import * as ACTION_TYPES from "../../constants/action_types";

import { addData, deleteObservation } from "../../../services/ReceiptAthleteObservationService"

export function addObservations(data: any) {
    return function (dispatch: any)  {
        return addData(data).then(json => {
            dispatch({ type: ACTION_TYPES.ADD_RECEIPT_ATHLETE_OBSERVATIONS, payload: json });
        });
    }
}

export function removeObservation(id: number) {
    return function (dispatch: any)  {
        return deleteObservation(id).then(json => {
            dispatch({ type: ACTION_TYPES.DELETE_RECEIPT_ATHLETE_OBSERVATION, payload: json });
        });
    }
}
