import { LOGIN, SIGNUP } from "../../constants/action_types";

const initialState = {
    is_authenticated: false,
    login: {},
    signup: {}
};

function rootReducer(state = initialState, action: { type: string, payload: any }) {
    if (action.type === LOGIN) {
        return {
            ...state,
            login: action.payload
        }
    }
    else if (action.type === SIGNUP) {
        return {
            ...state,
            signup: action.payload
        }
    }
    return state;
}

export default rootReducer;