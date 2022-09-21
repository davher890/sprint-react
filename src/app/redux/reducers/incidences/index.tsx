import * as ACTION_TYPES from "../../constants/action_types";

const initialState = {
    incidence: {},
    incidence_comments: []
};

function rootReducer(state = initialState, action: { type: string, payload: any }) {
    if (action.type === ACTION_TYPES.ADD_INCIDENCE || action.type === ACTION_TYPES.GET_INCIDENCE) {
        return {
            ...state,
            incidence: action.payload
        };
    }
    else if (action.type === ACTION_TYPES.GET_INCIDENCE_COMMENTS) {
        return {
            ...state,
            incidence_comments: action.payload
        };
    }
    else return state;
};

export default rootReducer;