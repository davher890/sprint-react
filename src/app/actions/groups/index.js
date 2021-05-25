import { SPECIALIZATION_GROUPS, NO_SPECIALIZATION_GROUPS, GROUP_SCHEDULES } from "../../constants/action_types";

import { findSpecializationGroups, findNotSpecializationGroups, findGroupSchedules } from "../../../services/GroupService"

export function getGroups(specialization) {
    return function (dispatch) {
        return specialization ?
            findSpecializationGroups().then(json => { dispatch({ type: SPECIALIZATION_GROUPS, payload: json }); })
            : findNotSpecializationGroups().then(json => { dispatch({ type: NO_SPECIALIZATION_GROUPS, payload: json }); });
    }
}

export function getGroupSchedules(id) {
    return function (dispatch) {
        return findGroupSchedules(id).then(json => { dispatch({ type: GROUP_SCHEDULES, payload: json }); });
    }
}