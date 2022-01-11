import * as ACTION_TYPES from "../../constants/action_types";

const initialState = {
    trainers: [],
    trainer: {}
};

function rootReducer(state = initialState, action: { type: string, payload: any }) {
    if (action.type === ACTION_TYPES.ADD_TRAINER || action.type === ACTION_TYPES.GET_TRAINER) {
        return {
            ...state,
            trainer: action.payload
        };
    }
    else if (action.type === ACTION_TYPES.LOAD_TRAINERS) {
        return {
            ...state,
            trainers: action.payload
        };
    }
    else return state;
};

export default rootReducer;