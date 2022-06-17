import * as ACTION_TYPES from "../../constants/action_types";

import { deleteById } from "../../../services/SportDataService"

export function deleteSportdata(id: number) {
    return function (dispatch: any) {
        return deleteById(id).then(json => {
            dispatch({ type: ACTION_TYPES.DELETE_SPORTDATA, payload: json });
        });
    }
}
