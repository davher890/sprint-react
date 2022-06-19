import * as ACTION_TYPES from "../../constants/action_types";

import { deleteById, addData } from "../../../services/SportDataService"

export function addSportdata(data: any) {
    return function (dispatch: any) {
        return addData(data).then(json => {
            if (!json.errorMessage) {
                json.successMessage = "Datos deportivos guardados!"
            }
            dispatch({ type: ACTION_TYPES.ADD_ATHLETE_SPORTDATA, payload: json });
        });
    }
}
export function deleteSportdata(id: number) {
    return function (dispatch: any) {
        return deleteById(id).then(json => {
            dispatch({ type: ACTION_TYPES.DELETE_SPORTDATA, payload: json });
        });
    }
}
