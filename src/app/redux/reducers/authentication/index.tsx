import * as ACTION_TYPES from "../../constants/action_types";

const initialState = {
    is_authenticated: false
};

function rootReducer(state = initialState, action: { type: string, payload: any }) {
    return state
}

export default rootReducer;