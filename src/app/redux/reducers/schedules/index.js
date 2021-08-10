import { LOAD_SCHEDULES } from "../../constants/action_types";

const initialState = {
    schedules: []
};

function rootReducer(state = initialState, action) {
    if (action.type === LOAD_SCHEDULES) {
        return {
            ...state,
            schedules: action.payload
        };
    }
    else return state;
};

export default rootReducer;