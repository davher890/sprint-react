import { ADD_USER, GET_USER, CURRENT_USER_ID, GET_USER_STATISTICS } from "../../constants/action_types";

const initialState = {
    users: [],
    user: {},
    current_user_id: 0
};

function rootReducer(state = initialState, action: { type: string, payload: any }) {
    if (action.type === ADD_USER || action.type === GET_USER) {
        return {
            ...state,
            user: action.payload
        };
    }
    if (action.type === GET_USER_STATISTICS) {
        return {
            ...state,
            user_statistics: action.payload
        };
    }
    else if (action.type === CURRENT_USER_ID) {
        return {
            ...state,
            current_user_id: action.payload
        };
    }
    else return state;
};

export default rootReducer;