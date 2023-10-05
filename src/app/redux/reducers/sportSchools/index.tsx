import * as ACTION_TYPES from "../../constants/action_types";

const initialState = {
    sport_schools: [],
    sport_school: {},
    sport_school_fee: {},
    fee_types: [],
    collections: [],
    athletes_by_date: {}
};

function rootReducer(state = initialState, action: { type: string, payload: any }) {
    if (action.type === ACTION_TYPES.ADD_SPORTSCHOOL || action.type === ACTION_TYPES.GET_SPORTSCHOOL) {
        return {
            ...state,
            sport_school: action.payload
        };
    }
    else if (action.type === ACTION_TYPES.LOAD_SPORTSCHOOLS) {
        return {
            ...state,
            sport_schools: action.payload
        };
    }
    else if (action.type === ACTION_TYPES.GET_SPORTSCHOOL_FEE_TYPES) {
        return {
            ...state,
            fee_types: action.payload
        };
    }
    else if (action.type === ACTION_TYPES.GET_SPORTSCHOOL_COLLECTIONS) {
        return {
            ...state,
            collections: action.payload
        };
    }
    else if (action.type === ACTION_TYPES.GET_SPORT_SCHOOL_ATHLETES_BY_DATE) {
        return {
            ...state,
            athletes_by_date: action.payload
        };
    }
    else if (action.type === ACTION_TYPES.GET_SPORT_SCHOOL_FEE){
        return {
            ...state,
            sport_school_fee: action.payload
        };
    }
    else return state;
};

export default rootReducer;