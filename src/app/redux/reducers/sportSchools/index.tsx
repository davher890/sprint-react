import { ADD_SPORTSCHOOL, GET_SPORTSCHOOL, GET_SPORTSCHOOL_FEE_TYPES, LOAD_SPORTSCHOOLS } from "../../constants/action_types";

const initialState = {
    sport_schools: [],
    sport_school: {},
    fee_types: []
};

function rootReducer(state = initialState, action: { type: string, payload: any }) {
    if (action.type === ADD_SPORTSCHOOL || action.type === GET_SPORTSCHOOL) {
        return {
            ...state,
            sport_school: action.payload
        };
    }
    else if (action.type === LOAD_SPORTSCHOOLS) {
        return {
            ...state,
            sport_schools: action.payload
        };
    }
    else if (action.type === GET_SPORTSCHOOL_FEE_TYPES) {
        return {
            ...state,
            fee_types: action.payload
        };
    }
    else return state;
};

export default rootReducer;