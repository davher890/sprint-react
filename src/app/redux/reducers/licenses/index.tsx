import * as ACTION_TYPES from "../../constants/action_types";

const initialState = {
    licenses: []
};

function rootReducer(state = initialState, action: { type: string, payload: any }) {
    if (action.type === ACTION_TYPES.UPLOAD_LICENSES) {
        return {
            ...state,
            licenses: action.payload
        };
    }
    else return state;
};

export default rootReducer;