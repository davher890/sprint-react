import { ADD_SPORTSCHOOL, GET_SPORTSCHOOL, LOAD_SPORTSCHOOLS } from "../../constants/action_types";

const initialState = {
    sport_schools: [],
    sport_school: {},
};

function rootReducer(state = initialState, action) {
    console.log(action.type, action.payload, state)
    if (action.type === ADD_SPORTSCHOOL || action.type === GET_SPORTSCHOOL) {
        return {
            ...state,
            sport_school: action.payload
        };
    }
    if (action.type === LOAD_SPORTSCHOOLS) {
        return {
            ...state,
            sport_schools: state.sport_schools.concat(action.payload)
        };
    }
    return state;
};

export default rootReducer;