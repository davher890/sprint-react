import utils from '../utils/TableUtils'
import { deleteRequest, getRequest, postRequest, postExcelRequest, getExcelRequest } from "./ApiService"

export const addData = (body: any) => {
    return postRequest("/groups", body)
}

export const findById = (id: number) => {
    return getRequest("/groups/" + id)
}

export const findAllGroups = () => {
    return getRequest("/groups/all")
}

export const findSpecializationGroups = () => {
    return getRequest("/groups/all?specialization=true")
}

export const findNotSpecializationGroups = () => {
    return getRequest("/groups/all?specialization=false")
}

export const findGroupSchedules = (id: number) => {
    return getRequest("/groups/" + id + "/schedules")
}

export const findGroupAthletes = (id: number) => {
    return getRequest("/groups/" + id + "/athletes")
}

export const swapGroupsAthletes = (idA: number, idB: number, groupAAthletes: number[], groupBAthletes: number[]) => {
    return getRequest("/groups/" + idA + "/swap/" + idB + "?groupAAthletes=" + groupAAthletes + "&groupBAthletes=" + groupBAthletes)
}

export const deleteGroup = (id: number) => {
    return deleteRequest("/groups/" + id)
}

export const downloadGroupSchedulesExcel = (groupId: number, scheduleIds: number[], columns: any, filters:any) => {
    let endpoint = "/groups/" + groupId + "/schedules/" + scheduleIds.join("_") + "/athletes/excel"
    let filtersParams = '';
    if (filters && Object.keys(filters).length > 0){
        filtersParams = "?filters=" + utils.getFilterParams(filters)
    }
    return postExcelRequest(endpoint + filtersParams, columns, 'atletas_grupo_' + groupId + '.xlsx')
}

export const findGroupAttendance = (groupId: number, month: number) => {
    return getExcelRequest("/groups/" + groupId + "/attendance?month=" + month, 'atletas_grupo_' + groupId + '.xlsx')
}