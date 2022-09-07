import * as ACTION_TYPES from "../../constants/action_types";

const initialState = {
    loading: false
};

function rootReducer(state = initialState, action: { type: string, payload: any }) {
    if (action.type === ACTION_TYPES.DOWNLOAD_GROUP_ATTENDANCE 
        || action.type === ACTION_TYPES.DOWNLOAD_ATHLETES
        || action.type === ACTION_TYPES.DOWNLOAD_GROUP_ATHLETES
        || action.type === ACTION_TYPES.DOWNLOAD_HISTORIC
        || action.type === ACTION_TYPES.DOWNLOAD_SPORTSCHOOLS
        || action.type === ACTION_TYPES.DOWNLOAD_TRAINERS
        || action.type === ACTION_TYPES.LOAD_ATHLETE_TABLE
        || action.type === ACTION_TYPES.LOAD_PAYMENT_ATHLETE_TABLE
        || action.type === ACTION_TYPES.LOAD_GROUP_TABLE
        || action.type === ACTION_TYPES.LOAD_SPORTSCHOOL_TABLE
        || action.type === ACTION_TYPES.LOAD_GROUP_ATHLETES_TABLE
        || action.type === ACTION_TYPES.LOAD_USER_TABLE
        || action.type === ACTION_TYPES.LOAD_TRAINER_TABLE
        || action.type === ACTION_TYPES.LOAD_DUPLICATED_ATHLETES_TABLE
        || action.type === ACTION_TYPES.LOAD_ATHLETE_SPORTDATA_TABLE
        || action.type === ACTION_TYPES.LOAD_SCHEDULE_TABLE
        || action.type === ACTION_TYPES.LOAD_HISTORIC_TABLE
        || action.type === ACTION_TYPES.LOAD_FAMILY_TABLE) {
        return {
            ...state,
            loading: false
        };
    }
    if (action.type === ACTION_TYPES.API_CALL) {
        return {
            ...state,
            loading: true
        };
    }
    else {
        return state;
    }
};

export default rootReducer;