import { LOAD_SCHEDULE_TABLE, LOAD_SCHEDULES } from "../../constants/action_types";

import { findScheduleDataPagination } from "../../../services/TableService"
import { findAll } from "../../../services/ScheduleService"


export function getScheduleTable(page, size, filters) {
    return function (dispatch) {
        return findScheduleDataPagination(page, size, filters).then(json => {
            dispatch({ type: LOAD_SCHEDULE_TABLE, payload: json });
        });
    }
}
export function getSchedules() {
    return function (dispatch) {
        return findAll().then(json => { dispatch({ type: LOAD_SCHEDULES, payload: json }); });
    }
}
