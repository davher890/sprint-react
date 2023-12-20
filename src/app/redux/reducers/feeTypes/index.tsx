import * as ACTION_TYPES from "../../constants/action_types";

const initialState = {
    fee_types: [],
    fee_type: {}
};

function rootReducer(state = initialState, action: { type: string, payload: any }) {
    if (action.type === ACTION_TYPES.ADD_FEE_TYPE) {
        return {
            ...state,
            fee_type: action.payload
        };
    }
    else if (action.type === ACTION_TYPES.LOAD_FEE_TYPES) {
        return {
            ...state,
            fee_types: action.payload
        };
    }
    else return state;
};

export default rootReducer;