import { ADD_TRAINER, GET_TRAINER, LOAD_TRAINERS } from "../../constants/action_types";

const initialState = {
    trainers: [],
    trainer: {}
};

function rootReducer(state = initialState, action: { type: string, payload: any }) {
    if (action.type === ADD_TRAINER || action.type === GET_TRAINER) {
        return {
            ...state,
            trainer: action.payload
        };
    }
    else if (action.type === LOAD_TRAINERS) {
        return {
            ...state,
            trainers: action.payload
        };
    }
    else return state;
};

export default rootReducer;