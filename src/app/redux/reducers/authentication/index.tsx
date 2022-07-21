const initialState = {
    is_authenticated: false,
    login: {}
};

function rootReducer(state = initialState, action: { type: string, payload: any }) {
    return {
        ...state,
        login: action.payload
    }
}

export default rootReducer;