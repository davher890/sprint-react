import * as ACTION_TYPES from "../../constants/action_types";

const initialState = {
    specialization_groups: [],
    not_specialization_groups: [],
    group_schedules: [],
    group_athletes: [],
    group_a_athletes: [],
    group_b_athletes: [],
    group: {},
    groups: [],
    swap_groups: [],
    sport_schools_groups: {}
};

function rootReducer(state = initialState, action: { type: string, payload: any, sport_school_id: number }) {
    if (action.type === ACTION_TYPES.ADD_GROUP || action.type === ACTION_TYPES.GET_GROUP || action.type === ACTION_TYPES.DELETE_GROUP) {
        return {
            ...state,
            group: action.payload
        }
    }
    else if (action.type === ACTION_TYPES.GROUP_A_ATHLETES) {
        console.log(action.type)
        return {
            ...state,
            group_a_athletes: action.payload
        };
    }
    else if (action.type === ACTION_TYPES.GROUP_B_ATHLETES) {
        return {
            ...state,
            group_b_athletes: action.payload
        };
    }
    else if (action.type === ACTION_TYPES.LOAD_GROUPS){
        return {
            ...state,
            groups: action.payload
        }
    }
    else if (action.type === ACTION_TYPES.GET_SPORT_SCHOOL_GROUPS) {
        return {
            ...state,
            groups: action.payload
        }
    }
    else if (action.type === ACTION_TYPES.GET_SPORT_SCHOOLS_GROUPS) {
        return {
            ...state,
            sport_schools_groups: action.payload
        }
    }
    else if (action.type === ACTION_TYPES.GROUP_SCHEDULES) {
        return {
            ...state,
            group_schedules: action.payload
        };
    }
    else if (action.type === ACTION_TYPES.GROUP_ATHLETES) {
        return {
            ...state,
            group_athletes: action.payload
        };
    }
    else if (action.type === ACTION_TYPES.SWAP_GROUPS_ATHLETES) {
        return {
            ...state,
            group_athletes: action.payload
        };
    }
    else if (action.type === ACTION_TYPES.SWAP_GROUP_ATHLETES) {
        return {
            ...state,
            group: action.payload
        };
    }
    return state;
};

export default rootReducer;