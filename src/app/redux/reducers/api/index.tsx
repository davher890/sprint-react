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
        || action.type === ACTION_TYPES.DOWNLOAD_TRAINERS) {
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