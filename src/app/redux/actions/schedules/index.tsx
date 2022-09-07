import * as ACTION_TYPES from "../../constants/action_types";

import { findScheduleDataPagination } from "../../../services/TableService"
import { findAll, findById, addData } from "../../../services/ScheduleService"

import { Order } from '../../../types/order'

export function getScheduleTable(page: number, size: number, filters: any, sort: string="dayNumber", sortDirection: Order = 'asc') {
    return function (dispatch: any)  {
        dispatch({ type: ACTION_TYPES.API_CALL})
        return findScheduleDataPagination(page, size, filters, sort, sortDirection).then(json => {
            dispatch({ type: ACTION_TYPES.LOAD_SCHEDULE_TABLE, payload: json });
        });
    }
}
export function getSchedules() {
    return function (dispatch: any)  {
        return findAll().then(json => { dispatch({ type: ACTION_TYPES.LOAD_SCHEDULES, payload: json }); });
    }
}

export function getSchedule(id: number) {
    return function (dispatch: any)  {
        return findById(id).then(json => {
            dispatch({ type: ACTION_TYPES.GET_SCHEDULE, payload: json });
        });
    }
}

export function addSchedule(data: any) {
    return function (dispatch: any)  {
        return addData(data).then(json => {
            if (!json.errorMessage) {
                json.successMessage = "Datos guardados!"
            }
            dispatch({ type: ACTION_TYPES.ADD_SCHEDULE, payload: json });
        });
    }
}