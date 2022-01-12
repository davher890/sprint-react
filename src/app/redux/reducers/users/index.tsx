import { ADD_USER, GET_USER } from "../../constants/action_types";

const initialState = {
    users: [],
    user: {}
};

function rootReducer(state = initialState, action: { type: string, payload: any }) {
    if (action.type === ADD_USER || action.type === GET_USER) {
        return {
            ...state,
            user: action.payload
        };
    }
    else return state;
};

export default rootReducer;