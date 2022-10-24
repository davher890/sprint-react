import * as ACTION_TYPES from "../../constants/action_types";

const initialState = {
    receipts: [],
    receipt: {}
};

function rootReducer(state = initialState, action: { type: string, payload: any }) {
    if (action.type === ACTION_TYPES.ADD_RECEIPT || action.type === ACTION_TYPES.GET_RECEIPT) {
        return {
            ...state,
            receipt: action.payload
        }
    }
    else if (action.type === ACTION_TYPES.LOAD_RECEIPTS) {
        return {
            ...state,
            receipts: action.payload
        };
    }
    
    return state;
};

export default rootReducer;