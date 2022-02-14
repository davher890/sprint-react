import * as ACTION_TYPES from "../../constants/action_types";

export function apiCall() {
    return function (dispatch: any) {
            dispatch({ type: ACTION_TYPES.API_CALL});
    }
}