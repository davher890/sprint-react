import * as ACTION_TYPES from "../../constants/action_types";

const initialState = {
    schedules: [],
    schedule: {}
};

function rootReducer(state = initialState, action: { type: string, payload: any }) {
    if (action.type === ACTION_TYPES.ADD_SCHEDULE || action.type === ACTION_TYPES.GET_SCHEDULE) {
        return {
            ...state,
            schedule: action.payload
        };
    }
    else if (action.type === ACTION_TYPES.LOAD_SCHEDULES) {
        return {
            ...state,
            schedules: action.payload
        };
    }
    else return state;
};

export default rootReducer;