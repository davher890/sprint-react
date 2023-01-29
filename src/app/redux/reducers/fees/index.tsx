import * as ACTION_TYPES from "../../constants/action_types";

const initialState = {
    fee: {}
};

function rootReducer(state = initialState, action: { type: string, payload: any, sport_school_id: number }) {
    if (action.type === ACTION_TYPES.ADD_FEE) {
        return {
            ...state,
            fee: action.payload
        }
    }
    else if (action.type === ACTION_TYPES.GET_SPORT_SCHOOL_FEE) {
        return {
            ...state,
            fee: action.payload
        }
    }
    return state;
};

export default rootReducer;