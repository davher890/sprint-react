import * as ACTION_TYPES from "../../constants/action_types";
import getTableItems from "../../../utils/Conversors"

const initialState = {
    table_data : [],
    page: 0,
    size: 10,
    total: 0
};

function rootReducer(state = initialState, action: { type: string, payload: any }) {
    
    if (action.type === ACTION_TYPES.LOAD_SPORTSCHOOL_TABLE || 
        action.type === ACTION_TYPES.LOAD_GROUP_TABLE || 
        action.type === ACTION_TYPES.LOAD_ATHLETE_TABLE || 
        action.type === ACTION_TYPES.LOAD_HISTORIC_TABLE || 
        action.type === ACTION_TYPES.LOAD_FAMILY_TABLE ||
        action.type === ACTION_TYPES.LOAD_SCHEDULE_TABLE ||
        action.type === ACTION_TYPES.LOAD_TRAINER_TABLE ||
        action.type === ACTION_TYPES.LOAD_USER_TABLE ||
        action.type === ACTION_TYPES.LOAD_GROUP_ATHLETES_TABLE ||
        action.type === ACTION_TYPES.LOAD_ATHLETE_SPORTDATA_TABLE || 
        action.type === ACTION_TYPES.LOAD_DUPLICATED_ATHLETES_TABLE ||
        action.type === ACTION_TYPES.LOAD_INCIDENCE_TABLE ||
        action.type === ACTION_TYPES.LOAD_RECEIPT_ATHLETE_TABLE || 
        action.type === ACTION_TYPES.LOAD_RETURNED_RECEIPT_REGISTERED_ATHLETE_TABLE || 
        action.type === ACTION_TYPES.LOAD_RETURNED_RECEIPT_UNREGISTERED_ATHLETE_TABLE || 
        action.type === ACTION_TYPES.LOAD_NOT_PAID_RECEIPT_REGISTERED_ATHLETE_TABLE || 
        action.type === ACTION_TYPES.LOAD_NOT_PAID_RECEIPT_UNREGISTERED_ATHLETE_TABLE || 
        action.type === ACTION_TYPES.LOAD_RECEIPT_TABLE) {
            
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