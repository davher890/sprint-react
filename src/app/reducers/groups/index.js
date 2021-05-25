import { SPECIALIZATION_GROUPS, NO_SPECIALIZATION_GROUPS, GROUP_SCHEDULES } from "../../constants/action_types";

const initialState = {
    specialization_groups: [],
    no_specialization_groups: [],
    group_schedules: []
};

function rootReducer(state = initialState, action) {
    console.log(action.type, action.payload, state)
    if (action.type === SPECIALIZATION_GROUPS) {
        return {
            ...state,
            specialization_groups: action.payload
        };
    }
    if (action.type === NO_SPECIALIZATION_GROUPS) {
        return {
            ...state,
            no_specialization_groups: action.payload
        };
    }
    if (action.type === GROUP_SCHEDULES) {
        return {
            ...state,
            group_schedules: action.payload
        };
    }
    return state;
};

export default rootReducer;