import * as ACTION_TYPES from "../../constants/action_types";

import { addData } from "../../../services/IncidenceCommentService"

export function addIncidenceComments(data: any) {
    return function (dispatch: any)  {
        return addData(data).then(json => {
            dispatch({ type: ACTION_TYPES.ADD_INCIDENCE_COMMENTS, payload: json });
        });
    }
}
