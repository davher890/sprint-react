import * as ACTION_TYPES from "../../constants/action_types";

const initialState = {
    specialization_groups: [],
    not_specialization_groups: [],
    group_schedules: [],
    group: {},
    groups: []
};

function rootReducer(state = initialState, action: { type: string, payload: any }) {
    if (action.type === ACTION_TYPES.ADD_GROUP || action.type === ACTION_TYPES.GET_GROUP || action.type === ACTION_TYPES.DELETE_GROUP) {
        return {
            ...state,
            group: action.payload
        }
    }
    else if (action.type === ACTION_TYPES.LOAD_GROUPS) {
        return {
            ...state,
            groups: action.payload
        }
    }
    else if (action.type === ACTION_TYPES.SPECIALIZATION_GROUPS) {
        return {
            ...state,
            specialization_groups: action.payload
        };
    }
    else if (action.type === ACTION_TYPES.NOT_SPECIALIZATION_GROUPS) {
        return {
            ...state,
            not_specialization_groups: action.payload
        };
    }
    else if (action.type === ACTION_TYPES.GROUP_SCHEDULES) {
        return {
            ...state,
            group_schedules: action.payload
        };
    }
    return state;
};

export default rootReducer;