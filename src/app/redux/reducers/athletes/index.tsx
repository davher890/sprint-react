import { ADD_ATHLETE, ADD_ATHLETE_SPORTDATA, GET_ATHLETE, GET_ATHLETES_BY_PHONE, GET_ATHLETES_BY_SURNAMES, GET_ATHLETE_FEE, REGISTER_ATHLETE, UNREGISTER_ATHLETE } from "../../constants/action_types";

const initialState = {
    athletes_by_phone: [],
    athletes_by_surnames: [],
    athlete: {},
    athlete_fee: {},
    athlete_sportdata: {}
};

function rootReducer(state = initialState, action: { type: string, payload: any }) {
    if (action.type === ADD_ATHLETE || action.type === GET_ATHLETE || action.type === REGISTER_ATHLETE || action.type === UNREGISTER_ATHLETE) {
        return {
            ...state,
            athlete: action.payload
        }
    }
    else if (action.type === GET_ATHLETES_BY_PHONE) {
        return {
            ...state,
            athletes_by_phone: action.payload
        };
    }
    else if (action.type === GET_ATHLETES_BY_SURNAMES) {
        return {
            ...state,
            athletes_by_surnames: action.payload
        };
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