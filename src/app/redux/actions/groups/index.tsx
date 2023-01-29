import * as ACTION_TYPES from "../../constants/action_types";

import { Order } from '../../../types/order'

import { findGroupSchedules, downloadGroupSchedulesExcel, addData, findById, findGroupAttendance, deleteGroup, findGroupAthletes, swapGroupsAthletes, swapGroupAthletes } from "../../../services/GroupService"
import { findGroupDataPagination, findGroupAthletesDataPagination } from "../../../services/TableService"

export function getGroupTable(page: number, size: number, filters: any, sort: string, sortDirection: Order) {
    return function (dispatch: any) {
        dispatch({ type: ACTION_TYPES.API_CALL})
        return findGroupDataPagination(page, size, filters, sort, sortDirection).then(json => {
            dispatch({ type: ACTION_TYPES.LOAD_GROUP_TABLE, payload: json });
        });
    }
}

export function getGroupAthleteTable(groupId: number, scheduleIds: number[], page: number, size: number, filters: any, sort: string, sortDirection: Order) {
    return function (dispatch: any) {
        dispatch({ type: ACTION_TYPES.API_CALL})
        return findGroupAthletesDataPagination(groupId, scheduleIds, page, size, filters, sort, sortDirection).then(json => {
            dispatch({ type: ACTION_TYPES.LOAD_GROUP_ATHLETES_TABLE, payload: json });
        });
    }
}

export function downloadGroupSchedulesAthletes(groupId: number, scheduleIds: number[], columns: any, filters:any) {
    return function (dispatch: any) {
        dispatch({ type: ACTION_TYPES.API_CALL})
        return downloadGroupSchedulesExcel(groupId, scheduleIds, columns, filters).then(json => {
            dispatch({ type: ACTION_TYPES.DOWNLOAD_GROUP_ATHLETES, payload: json });
        });
    }
}


export function downloadGroupAttendance(groupId: number, month: number, sportSchoolId: number) {
    return function (dispatch: any)  {
        dispatch({ type: ACTION_TYPES.API_CALL})
        return findGroupAttendance(groupId, month, sportSchoolId).then(json => {
            dispatch({ type: ACTION_TYPES.DOWNLOAD_GROUP_ATTENDANCE, payload: json });
        });
    }
}

export function getGroupSchedules(id: number) {
    return function (dispatch: any)  {
        return findGroupSchedules(id).then(json => { dispatch({ type: ACTION_TYPES.GROUP_SCHEDULES, payload: json }); });
    }
}

export function getGroupAAthletes(id: number) {
    return getGroupAthletes(id, ACTION_TYPES.GROUP_A_ATHLETES)
}
export function getGroupBAthletes(id: number) {
    return getGroupAthletes(id, ACTION_TYPES.GROUP_B_ATHLETES)
}
export function getGroupAthletes(id: number, type=ACTION_TYPES.GROUP_ATHLETES) {
    return function (dispatch: any)  {
        return findGroupAthletes(id).then(json => { dispatch({ type: type, payload: json }); });
    }
}

export function getGroup(id: number) {
    return function (dispatch: any)  {
        return findById(id).then(json => {
            dispatch({ type: ACTION_TYPES.GET_GROUP, payload: json });
        });
    }
}

export function removeGroup(id: number) {
    return function (dispatch: any)  {
        return deleteGroup(id).then(json => {
            dispatch({ type: ACTION_TYPES.DELETE_GROUP, payload: json });
        });
    }
}

export function addGroup(data: any) {
    return function (dispatch: any)  {
        return addData(data).then(json => {
            if (!json.errorMessage) {
                json.successMessage = "Datos guardados!"
            }
            dispatch({ type: ACTION_TYPES.ADD_GROUP, payload: json });
        });
    }
}

export function swapGroups(idA: number, idB: number, groupAAthletes: number[], groupBAthletes: number[]) {
    return function (dispatch: any)  {
        return swapGroupsAthletes(idA, idB, groupAAthletes, groupBAthletes).then((json: any) => {
            dispatch({ type: ACTION_TYPES.SWAP_GROUPS_ATHLETES, payload: json });
        });
    }
}

export function swapGroup(id: number, athletesIds: number[]) {
    return function (dispatch: any)  {
        return swapGroupAthletes(id, athletesIds).then((json: any) => {
            dispatch({ type: ACTION_TYPES.SWAP_GROUP_ATHLETES, payload: json });
        });
    }
}
