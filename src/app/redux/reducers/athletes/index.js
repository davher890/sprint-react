import { ADD_ATHLETE, ADD_ATHLETE_SPORTDATA, GET_ATHLETE, GET_ATHLETE_FEE } from "../../constants/action_types";

const initialState = {
    athletes: [],
    athlete: {},
    athlete_fee: {},
    athlete_sportdata: {}
};

function rootReducer(state = initialState, action) {
    if (action.type === ADD_ATHLETE || action.type === GET_ATHLETE) {
        return {
            ...state,
            athlete: action.payload
        }
    }
    else if (action.type === GET_ATHLETE_FEE) {
        return {
            ...state,
            athlete_fee: action.payload
        };
    }
    else if (action.type === ADD_ATHLETE_SPORTDATA) {
        return {
            ...state,
            athlete_sportdata: action.payload
        };
    }
    return state;
};

export default rootReducer;