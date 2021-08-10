import { LOAD_SPORTSCHOOL_TABLE, LOAD_GROUP_TABLE, 
    LOAD_ATHLETE_TABLE, LOAD_FAMILY_TABLE, LOAD_HISTORIC_TABLE, 
    LOAD_SCHEDULE_TABLE, LOAD_TRAINER_TABLE, 
    LOAD_GROUP_ATHLETES_TABLE, LOAD_ATHLETE_SPORTDATA_TABLE } from "../../constants/action_types";

import getTableItems from "../utils"

const initialState = {
    table_data : [],
    page: 1,
    size: 10,
    total: 0
};

function rootReducer(state = initialState, action) {
    if (action.type === LOAD_SPORTSCHOOL_TABLE || 
        action.type === LOAD_GROUP_TABLE || 
        action.type === LOAD_ATHLETE_TABLE || 
        action.type === LOAD_HISTORIC_TABLE || 
        action.type === LOAD_FAMILY_TABLE ||
        action.type === LOAD_SCHEDULE_TABLE ||
        action.type === LOAD_TRAINER_TABLE ||
        action.type === LOAD_GROUP_ATHLETES_TABLE ||
        action.type === LOAD_ATHLETE_SPORTDATA_TABLE) {
        
        let items = getTableItems(action)
        return {
            ...state,
            table_data : items,
            page: action.payload.number + 1,
            size: action.payload.size,
            total: action.payload.totalElements,
        };
    }
    else return state;
};

export default rootReducer;