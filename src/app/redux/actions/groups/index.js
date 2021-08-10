import { SPECIALIZATION_GROUPS, NOT_SPECIALIZATION_GROUPS, GROUP_SCHEDULES, LOAD_GROUP_TABLE, ADD_GROUP, GET_GROUP, LOAD_GROUPS, LOAD_GROUP_ATHLETES_TABLE } from "../../constants/action_types";

import { findAllGroups, findSpecializationGroups, findNotSpecializationGroups, findGroupSchedules, addData, findById } from "../../../services/GroupService"
import { findGroupDataPagination, findGroupAthletesDataPagination } from "../../../services/TableService"

export function getGroupTable(page, size, filters) {
    return function (dispatch) {
        return findGroupDataPagination(page, size, filters).then(json => {
            dispatch({ type: LOAD_GROUP_TABLE, payload: json });
        });
    }
}

export function getGroupAthleteTable(groupId, scheduleIds, page, size, filters) {
    return function (dispatch) {
        return findGroupAthletesDataPagination(groupId, scheduleIds, page, size, filters).then(json => {
            dispatch({ type: LOAD_GROUP_ATHLETES_TABLE, payload: json });
        });
    }
}

export function getAllGroups(specialization) {
    return function (dispatch) {
        return findAllGroups().then(json => { dispatch({ type: LOAD_GROUPS, payload: json }); });
    }
}

export function getGroups(specialization) {
    return function (dispatch) {
        return specialization ?
            findSpecializationGroups().then(json => { dispatch({ type: SPECIALIZATION_GROUPS, payload: json }); })
            : findNotSpecializationGroups().then(json => { dispatch({ type: NOT_SPECIALIZATION_GROUPS, payload: json }); });
    }
}

export function getGroupSchedules(id) {
    return function (dispatch) {
        return findGroupSchedules(id).then(json => { dispatch({ type: GROUP_SCHEDULES, payload: json }); });
    }
}

export function getGroup(id) {
    console.log(id)
    return function (dispatch) {
        return findById(id).then(json => {
            dispatch({ type: GET_GROUP, payload: json });
        });
    }
}

export function addGroup(data) {
    return function (dispatch) {
        return addData(data).then(json => {
            dispatch({ type: ADD_GROUP, payload: json });
        });
    }
}
