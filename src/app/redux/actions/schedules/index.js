import { LOAD_SCHEDULE_TABLE, LOAD_SCHEDULES, GET_SCHEDULE, ADD_SCHEDULE } from "../../constants/action_types";

import { findScheduleDataPagination } from "../../../services/TableService"
import { findAll, findById, addData } from "../../../services/ScheduleService"


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

export function getSchedule(id) {
    return function (dispatch) {
        return findById(id).then(json => {
            dispatch({ type: GET_SCHEDULE, payload: json });
        });
    }
}

export function addSchedule(data) {
    return function (dispatch) {
        return addData(data).then(json => {
            dispatch({ type: ADD_SCHEDULE, payload: json });
        });
    }
}