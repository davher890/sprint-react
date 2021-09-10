import { SPECIALIZATION_GROUPS, NOT_SPECIALIZATION_GROUPS, GROUP_SCHEDULES, GET_GROUP, ADD_GROUP, LOAD_GROUPS } from "../../constants/action_types";

const initialState = {
    specialization_groups: [],
    not_specialization_groups: [],
    group_schedules: [],
    group: {},
    groups: []
};

function rootReducer(state = initialState, action: { type: string, payload: any }) {
    if (action.type === ADD_GROUP || action.type === GET_GROUP) {
        return {
            ...state,
            group: action.payload
        }
    }
    else if (action.type === LOAD_GROUPS) {
        return {
            ...state,
            groups: action.payload
        }
    }
    else if (action.type === SPECIALIZATION_GROUPS) {
        return {
            ...state,
            specialization_groups: action.payload
        };
    }
    else if (action.type === NOT_SPECIALIZATION_GROUPS) {
        return {
            ...state,
            not_specialization_groups: action.payload
        };
    }
    else if (action.type === GROUP_SCHEDULES) {
        return {
            ...state,
            group_schedules: action.payload
        };
    }
    return state;
};

export default rootReducer;