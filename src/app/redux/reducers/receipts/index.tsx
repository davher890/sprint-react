import * as ACTION_TYPES from "../../constants/action_types";

const initialState = {
    receipts: [],
    receipt: {},
    receipt_athlete: {}
};

function rootReducer(state = initialState, action: { type: string, payload: any }) {
    if (action.type === ACTION_TYPES.GET_RECEIPT || action.type === ACTION_TYPES.VALIDATE_RECEIPT) {
        return {
            ...state,
            receipt: action.payload
        }
    }
    if (action.type === ACTION_TYPES.ADD_RECEIPT) {
        window.open("/receipts/" + action.payload.id, "_self");
    }
    else if (action.type === ACTION_TYPES.ADD_RECEIPT_ATHLETE) {
        return {
            ...state,
            receipt_athlete: action.payload
        }
    }
    else if (action.type === ACTION_TYPES.LOAD_RECEIPTS) {
        return {
            ...state,
            receipts: action.payload
        };
    }
    else if (action.type === ACTION_TYPES.GET_RECEIPT_ATHLETE) {
        return {
            ...state,
            receipt_athlete: action.payload
        };
    }
    
    return state;
};

export default rootReducer;