import { SPECIALIZATION_GROUPS, NOT_SPECIALIZATION_GROUPS, 
    GROUP_SCHEDULES, LOAD_GROUP_TABLE, ADD_GROUP, GET_GROUP, 
    LOAD_GROUPS, LOAD_GROUP_ATHLETES_TABLE,
    DOWNLOAD_GROUP_ATHLETES, DOWNLOAD_GROUP_ATTENDANCE } from "../../constants/action_types";

import { findAllGroups, findSpecializationGroups, findNotSpecializationGroups, findGroupSchedules, downloadGroupSchedulesExcel, addData, findById, findGroupAttendance } from "../../../services/GroupService"
import { findGroupDataPagination, findGroupAthletesDataPagination } from "../../../services/TableService"

export function getGroupTable(page: number, size: number, filters: any) {
    return function (dispatch: any) {
        return findGroupDataPagination(page, size, filters).then(json => {
            dispatch({ type: LOAD_GROUP_TABLE, payload: json });
        });
    }
}

export function getGroupAthleteTable(groupId: number, scheduleIds: number[], page: number, size: number, filters: any) {
    return function (dispatch: any) {
        return findGroupAthletesDataPagination(groupId, scheduleIds, page, size, filters).then(json => {
            dispatch({ type: LOAD_GROUP_ATHLETES_TABLE, payload: json });
        });
    }
}

export function downloadGroupSchedulesAthletes(groupId: number, scheduleIds: number[], columns: any) {
    return function (dispatch: any) {
        return downloadGroupSchedulesExcel(groupId, scheduleIds, columns).then(json => {
            dispatch({ type: DOWNLOAD_GROUP_ATHLETES, payload: json });
        });
    }
}


export function downloadGroupAttendance(groupId: number, month: number) {
    return function (dispatch: any)  {
        return findGroupAttendance(groupId, month).then(json => {
            dispatch({ type: DOWNLOAD_GROUP_ATTENDANCE, payload: json });
        });
    }
}


export function getAllGroups() {
    return function (dispatch: any)  {
        return findAllGroups().then(json => { dispatch({ type: LOAD_GROUPS, payload: json }); });
    }
}

export function getGroups(specialization: boolean) {
    return function (dispatch: any)  {
        return specialization ?
            findSpecializationGroups().then(json => { dispatch({ type: SPECIALIZATION_GROUPS, payload: json }); })
            : findNotSpecializationGroups().then(json => { dispatch({ type: NOT_SPECIALIZATION_GROUPS, payload: json }); });
    }
}

export function getGroupSchedules(id: number) {
    return function (dispatch: any)  {
        return findGroupSchedules(id).then(json => { dispatch({ type: GROUP_SCHEDULES, payload: json }); });
    }
}

export function getGroup(id: number) {
    console.log(id)
    return function (dispatch: any)  {
        return findById(id).then(json => {
            dispatch({ type: GET_GROUP, payload: json });
        });
    }
}

export function addGroup(data: any) {
    return function (dispatch: any)  {
        return addData(data).then(json => {
            dispatch({ type: ADD_GROUP, payload: json });
        });
    }
}
