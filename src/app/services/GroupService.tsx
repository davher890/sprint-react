import utils from '../utils/TableUtils'
import { deleteRequest, getRequest, postRequest, postExcelRequest } from "./ApiService"

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
    return fetch(process.env.REACT_APP_SERVER_URL + "/groups/" + groupId + "/attendance?month=" + month)
        .then(response => {
            response.blob().then(blob => {
                let url = window.URL.createObjectURL(blob);
                let a = document.createElement('a');
                a.href = url;
                a.download = 'listado_asistencia_' + groupId + '.xlsx';
                a.click();
            })
        })
        .catch(function () {
            console.log("error");
        });
}