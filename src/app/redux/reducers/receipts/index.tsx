import * as ACTION_TYPES from "../../constants/action_types";

const initialState = {
    receipt: {},
};

function rootReducer(state = initialState, action: { type: string, payload: any }) {
    if (action.type === ACTION_TYPES.ADD_RECEIPT || action.type === ACTION_TYPES.GET_RECEIPT) {
        return {
            ...state,
            receipt: action.payload
        }
    }
    return state;
};

export default rootReducer;