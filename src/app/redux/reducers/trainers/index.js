import { LOAD_TRAINERS } from "../../constants/action_types";

const initialState = {
    trainers: []
};

function rootReducer(state = initialState, action) {
    if (action.type === LOAD_TRAINERS) {
        return {
            ...state,
            trainers: action.payload
        };
    }
    else return state;
};

export default rootReducer;