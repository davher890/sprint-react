import utils from '../utils/TableUtils'
import { getRequest } from './ApiService'

export const findAthleteDataPagination = (page: number, size: number, filters: any) => {
    return findDataPagination("athletes", page, size, filters)
}

export const findDuplicatedAthletesDataPagination = (id: number, name: string, firstSurname: string, dni: string, page=1, size=10, filters: any) => {

    if(!filters){
        filters = {}
    }
    if (id && id > 0){
        filters.id = {
            comparator: "LIKE",
            filterType: "NUMBER",
            filterVal: {
                comparator: "!=",
                number : id
            },
        }
    }
    filters.name = {
        comparator: "LIKE",
        filterVal: name
    }
    filters.firstSurname = {
        comparator: "LIKE",
        filterVal: firstSurname
    }
    filters.dni = {
        comparator: "LIKE",
        filterVal: dni
    }
    return findDataPagination("athletes", page, size, filters)
}

export const findHistoricDataPagination = (page: number, size: number, filters: any) => {
    return findDataPagination("athletes/historic", page, size, filters)
}

export const findGroupDataPagination = (page: number, size: number, filters: any) => {
    return findDataPagination("groups", page, size, filters)
}

export const findSportSchoolDataPagination = (page: number, size: number, filters: any) => {
    return findDataPagination("sport_schools", page, size, filters)
}

export const findFamilyDataPagination = (page: number, size: number, filters: any) => {
    return findDataPagination("families", page, size, filters)
}

export const findScheduleDataPagination = (page: number, size: number, filters: any) => {
    return findDataPagination("schedules?sort=day", page, size, filters)
}

export const findTrainerDataPagination = (page: number, size: number, filters: any) => {
    return findDataPagination("trainers", page, size, filters)
}

export const findAthleteSportdataPagination = (athleteId: number, page: number, size: number, filters: any) => {
    return findDataPagination("athletes/" + athleteId + "/sportdata", page, size, filters)
}

export const findGroupAthletesDataPagination = (groupId: number, scheduleIds: number[] =[], page: number, size: number, filters: any) => {

    let endpoint = "groups/" + groupId + "/athletes"
    if (scheduleIds && scheduleIds.length > 0){
        endpoint = "groups/" + groupId + "/schedules/" + scheduleIds.join("_") + "/athletes"
    }
    return findDataPagination(endpoint, page, size, filters)
}

export const findDataPagination = (entity: string, page=0, size=10, filters: any) => {

    let paramsSeparator = entity.includes("?") ? "&" : "?"
    let pageParams = paramsSeparator + "page=" + page
    let sizeParams = "&size=" + size
    let filtersParams = '';
    if (filters && Object.keys(filters).length > 0){
        filtersParams = "&filters=" + utils.getFilterParams(filters)
    }
    let urlParams = pageParams + sizeParams + filtersParams
    return getRequest("/" + entity + urlParams)
}