import * as ACTION_TYPES from "../../constants/action_types";

const initialState = {
    athletes_by_phone: [],
    athletes_by_surnames: [],
    athlete: {},
    athlete_fee: {},
    athlete_observations: [],
    athlete_historic: [],
    athlete_sportdata: {}
};

function rootReducer(state = initialState, action: { type: string, payload: any }) {
    if (action.type === ACTION_TYPES.ADD_ATHLETE || action.type === ACTION_TYPES.GET_ATHLETE || action.type === ACTION_TYPES.REGISTER_ATHLETE || action.type === ACTION_TYPES.UNREGISTER_ATHLETE) {
        return {
            ...state,
            athlete: action.payload
        }
    }
    else if (action.type === ACTION_TYPES.GET_ATHLETES_BY_PHONE) {
        return {
            ...state,
            athletes_by_phone: action.payload
        };
    }
    else if (action.type === ACTION_TYPES.GET_ATHLETES_BY_SURNAMES) {
        return {
            ...state,
            athletes_by_surnames: action.payload
        };
    }
    else if (action.type === ACTION_TYPES.GET_ATHLETE_FEE) {
        return {
            ...state,
            athlete_fee: action.payload
        };
    }
    else if (action.type === ACTION_TYPES.GET_ATHLETE_OBSERVATIONS) {
        return {
            ...state,
            athlete_observations: action.payload
        };
    }
    else if (action.type === ACTION_TYPES.GET_ATHLETE_HISTORIC) {
        return {
            ...state,
            athlete_historic: action.payload
        };
    }
    else if (action.type === ACTION_TYPES.ADD_ATHLETE_SPORTDATA) {
        return {
            ...state,
            athlete_sportdata: action.payload
        };
    }
    return state;
};

export default rootReducer;