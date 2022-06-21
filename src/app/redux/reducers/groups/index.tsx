import * as ACTION_TYPES from "../../constants/action_types";

const initialState = {
    specialization_groups: [],
    not_specialization_groups: [],
    group_schedules: [],
    group_athletes: [],
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
    else if (action.type === ACTION_TYPES.LOAD_GROUPS){
        return {
            ...state,
            groups: action.payload
        }
    }
    else if (action.type === ACTION_TYPES.GET_SPORT_SCHOOL_GROUPS) {
        let sportSchoolGroups:any = state.sport_schools_groups
        sportSchoolGroups["sport_school_" + action.sport_school_id] = action.payload
        return {
            ...state,
            groups: action.payload,
            sport_schools_groups: sportSchoolGroups
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