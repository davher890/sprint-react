import { ADD_ATHLETE, GET_ATHLETE, GET_ATHLETES_FEE } from "../../constants/action_types";

const initialState = {
    athletes: [],
    athlete: {},
};

function rootReducer(state = initialState, action) {
    console.log(action.type, action.payload, state)
    if (action.type === ADD_ATHLETE || action.type === GET_ATHLETE) {
        return {
            ...state,
            athlete: action.payload
        }
    }
    if (action.type === GET_ATHLETES_FEE) {
        return {
            ...state,
            athletes_fee: action.payload
        };
    }
    return state;
};

export default rootReducer;