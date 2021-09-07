import { ADD_SCHEDULE, GET_SCHEDULE, LOAD_SCHEDULES } from "../../constants/action_types";

const initialState = {
    schedules: [],
    schedule: {}
};

function rootReducer(state = initialState, action: { type: string, payload: any }) {
    if (action.type === ADD_SCHEDULE || action.type === GET_SCHEDULE) {
        return {
            ...state,
            schedule: action.payload
        };
    }
    else if (action.type === LOAD_SCHEDULES) {
        return {
            ...state,
            schedules: action.payload
        };
    }
    else return state;
};

export default rootReducer;