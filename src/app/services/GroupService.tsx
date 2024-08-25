import utils from '../utils/TableUtils'
import { deleteRequest, getRequest, postRequest, postExcelRequest, getExcelRequest } from "./ApiService"

export const addData = (body: any) => {
    return postRequest("/groups", body)
}

export const findById = (id: number) => {
    return getRequest("/groups/" + id)
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

export const swapGroupAthletes = (id: number, athletesIds: number[], ) => {
    return getRequest("/groups/" + id + "/swap?athletesIds=" + athletesIds)
}

export const deleteGroup = (id: number) => {
    return deleteRequest("/groups/" + id)
}

export const sendGroupCommunication = (id: number, subject: string, body: string) => {
    return postRequest("/groups/" + id + "/communication", { subject, body })
}

export const downloadGroupSchedulesExcel = (groupId: number, scheduleIds: number[], columns: any, filters:any) => {
    let endpoint = "/groups/" + groupId + "/schedules/" + scheduleIds.join(",") + "/athletes/excel"
    let filtersParams = '';
    if (filters && Object.keys(filters).length > 0){
        filtersParams = "?filters=" + utils.getFilterParams(filters)
    }
    return postExcelRequest(endpoint + filtersParams, columns, 'atletas_grupo_' + groupId + '.xlsx')
}

export const findGroupAttendance = (groupId: number, month: number, sportSchoolId: number) => {
    return getExcelRequest("/groups/" + groupId + "/attendance?sport_school_id=" + sportSchoolId + "&month=" + month, 'atletas_grupo_' + groupId + '.xlsx')
}