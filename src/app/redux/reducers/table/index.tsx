import { LOAD_SPORTSCHOOL_TABLE, LOAD_GROUP_TABLE, 
    LOAD_ATHLETE_TABLE, LOAD_FAMILY_TABLE, LOAD_HISTORIC_TABLE, 
    LOAD_SCHEDULE_TABLE, LOAD_TRAINER_TABLE, 
    LOAD_GROUP_ATHLETES_TABLE, LOAD_ATHLETE_SPORTDATA_TABLE,
    LOAD_DUPLICATED_ATHLETES_TABLE, 
    LOAD_USER_TABLE} from "../../constants/action_types";

import getTableItems from "../conversors"

const initialState = {
    table_data : [],
    page: 0,
    size: 10,
    total: 0
};

function rootReducer(state = initialState, action: { type: string, payload: any }) {
    
    if (action.type === LOAD_SPORTSCHOOL_TABLE || 
        action.type === LOAD_GROUP_TABLE || 
        action.type === LOAD_ATHLETE_TABLE || 
        action.type === LOAD_HISTORIC_TABLE || 
        action.type === LOAD_FAMILY_TABLE ||
        action.type === LOAD_SCHEDULE_TABLE ||
        action.type === LOAD_TRAINER_TABLE ||
        action.type === LOAD_USER_TABLE ||
        action.type === LOAD_GROUP_ATHLETES_TABLE ||
        action.type === LOAD_ATHLETE_SPORTDATA_TABLE || 
        action.type === LOAD_DUPLICATED_ATHLETES_TABLE) {
            
        let items = getTableItems(action)

        return {
            ...state,
            table_data : items,
            page: action.payload.number,
            size: action.payload.size,
            total: action.payload.totalElements
        };
    }
    else return state;
};

export default rootReducer;