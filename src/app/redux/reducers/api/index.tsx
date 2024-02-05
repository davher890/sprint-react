import * as ACTION_TYPES from "../../constants/action_types";

const initialState = {
    loading: false,
    go_to_page: null,
    job_result_log: {}
};

function rootReducer(state = initialState, action: { type: string, payload: any }) {
    if (action.type === ACTION_TYPES.DOWNLOAD_GROUP_ATTENDANCE 
        || action.type === ACTION_TYPES.DOWNLOAD_ATHLETES
        || action.type === ACTION_TYPES.DOWNLOAD_RECEIPT_ATHLETES
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
        || action.type === ACTION_TYPES.LOAD_FAMILY_TABLE
        || action.type === ACTION_TYPES.LOAD_INCIDENCE_TABLE
        || action.type === ACTION_TYPES.LOAD_RECEIPT_TABLE
        || action.type === ACTION_TYPES.LOAD_RECEIPT_ATHLETE_TABLE
        || action.type === ACTION_TYPES.SWAP_GROUPS_ATHLETES
        || action.type === ACTION_TYPES.ADD_ATHLETE
        || action.type === ACTION_TYPES.ADD_GROUP) {
        return {
            ...state,
            loading: false,
            go_to_page: null
        };
    }
    else if (action.type === ACTION_TYPES.API_CALL) {
        return {
            ...state,
            loading: true,
            go_to_page: null
        };
    }
    else if (action.type === ACTION_TYPES.ADD_RECEIPT) {
        return {
            ...state,
            loading: true,
            go_to_page: "/receipts/" + action.payload.id
        }
    }
    else if (action.type === ACTION_TYPES.UPLOAD_LICENSES) {
        return {
            ...state,
            job_result_log: action.payload
        }   
    }
    else {
        return state;
    }
};

export default rootReducer;