import * as ACTION_TYPES from "../../constants/action_types";

import { Order } from '../../../types/order'

import { findAllGroups, findSpecializationGroups, findNotSpecializationGroups, findGroupSchedules, downloadGroupSchedulesExcel, addData, findById, findGroupAttendance, deleteGroup, findGroupAthletes, swapGroupsAthletes, swapGroupAthletes } from "../../../services/GroupService"
import { findGroupDataPagination, findGroupAthletesDataPagination } from "../../../services/TableService"

export function getGroupTable(page: number, size: number, filters: any, sort: string, sortDirection: Order) {
    return function (dispatch: any) {
        return findGroupDataPagination(page, size, filters, sort, sortDirection).then(json => {
            dispatch({ type: ACTION_TYPES.LOAD_GROUP_TABLE, payload: json });
        });
    }
}

export function getGroupAthleteTable(groupId: number, scheduleIds: number[], page: number, size: number, filters: any, sort: string, sortDirection: Order) {
    return function (dispatch: any) {
        return findGroupAthletesDataPagination(groupId, scheduleIds, page, size, filters, sort, sortDirection).then(json => {
            dispatch({ type: ACTION_TYPES.LOAD_GROUP_ATHLETES_TABLE, payload: json });
        });
    }
}

export function downloadGroupSchedulesAthletes(groupId: number, scheduleIds: number[], columns: any, filters:any) {
    return function (dispatch: any) {
        return downloadGroupSchedulesExcel(groupId, scheduleIds, columns, filters).then(json => {
            dispatch({ type: ACTION_TYPES.DOWNLOAD_GROUP_ATHLETES, payload: json });
        });
    }
}


export function downloadGroupAttendance(groupId: number, month: number) {
    return function (dispatch: any)  {
        return findGroupAttendance(groupId, month).then(json => {
            dispatch({ type: ACTION_TYPES.DOWNLOAD_GROUP_ATTENDANCE, payload: json });
        });
    }
}


export function getAllGroups() {
    return function (dispatch: any)  {
        return findAllGroups().then(json => { dispatch({ type: ACTION_TYPES.LOAD_GROUPS, payload: json }); });
    }
}

export function getGroups(specialization: boolean) {
    return function (dispatch: any)  {
        return specialization ?
            findSpecializationGroups().then(json => { dispatch({ type: ACTION_TYPES.SPECIALIZATION_GROUPS, payload: json }); })
            : findNotSpecializationGroups().then(json => { dispatch({ type: ACTION_TYPES.NOT_SPECIALIZATION_GROUPS, payload: json }); });
    }
}

export function getGroupSchedules(id: number) {
    return function (dispatch: any)  {
        return findGroupSchedules(id).then(json => { dispatch({ type: ACTION_TYPES.GROUP_SCHEDULES, payload: json }); });
    }
}

export function getGroupAthletes(id: number) {
    return function (dispatch: any)  {
        return findGroupAthletes(id).then(json => { dispatch({ type: ACTION_TYPES.GROUP_ATHLETES, payload: json }); });
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
