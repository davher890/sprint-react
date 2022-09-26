import utils from '../utils/TableUtils'
import { getRequest } from './ApiService'
import { Order } from '../types/order'

export const findPaymentAthleteDataPagination = (page: number, size: number, filters: any, sort: string, sortDirection: Order) => {
    return findDataPagination("payment_athletes", page, size, filters, sort, sortDirection)
}

export const findReceiptAthleteDataPagination = (collection: string, sportSchoolId: number, page: number, size: number, filters: any, sort: string, sortDirection: Order) => {
    return findDataPagination("receipts/athletes?collection="+collection+"&sportSchoolId="+sportSchoolId, page, size, filters, sort, sortDirection)
}

export const findReceiptIdAthleteDataPagination = (id: number, page: number, size: number, filters: any, sort: string, sortDirection: Order) => {
    return findDataPagination("receipts/" + id + "/athletes", page, size, filters, sort, sortDirection)
}

export const findReceiptDataPagination = (page: number, size: number, filters: any, sort: string, sortDirection: Order) => {
    return findDataPagination("receipts", page, size, filters, sort, sortDirection)
}

export const findAthleteDataPagination = (page: number, size: number, filters: any, sort: string, sortDirection: Order) => {
    return findDataPagination("registered_athletes", page, size, filters, sort, sortDirection)
}

export const findIncidenceDataPagination = (page: number, size: number, filters: any, sort: string, sortDirection: Order) => {
    return findDataPagination("incidences", page, size, filters, sort, sortDirection)
}

export const findHistoricDataPagination = (page: number, size: number, filters: any, sort: string, sortDirection: Order) => {
    return findDataPagination("unregistered_athletes", page, size, filters, sort, sortDirection)
}

export const findDuplicatedAthletesDataPagination = (id: number, name: string, firstSurname: string, dni: string, page=0, size=10, filters: any, sort: string, sortDirection: Order) => {

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
    return findDataPagination("athletes", page, size, filters, sort, sortDirection)
}

export const findGroupDataPagination = (page: number, size: number, filters: any, sort: string, sortDirection: Order) => {
    return findDataPagination("groups", page, size, filters, sort, sortDirection)
}

export const findSportSchoolDataPagination = (page: number, size: number, filters: any, sort: string, sortDirection: Order) => {
    return findDataPagination("sport_schools", page, size, filters, sort, sortDirection)
}

export const findFamilyDataPagination = (page: number, size: number, filters: any, sort: string, sortDirection: Order) => {
    return findDataPagination("families", page, size, filters, sort, sortDirection)
}

export const findScheduleDataPagination = (page: number, size: number, filters: any, sort: string, sortDirection: Order) => {
    return findDataPagination("schedules", page, size, filters, sort, sortDirection)
}

export const findTrainerDataPagination = (page: number, size: number, filters: any, sort: string, sortDirection: Order) => {
    return findDataPagination("trainers", page, size, filters, sort, sortDirection)
}

export const findUserDataPagination = (page: number, size: number, filters: any, sort: string, sortDirection: Order) => {
    return findDataPagination("users", page, size, filters, sort, sortDirection)
}

export const findAthleteSportdataPagination = (athleteId: number, page: number, size: number, filters: any, sort: string, sortDirection: Order) => {
    return findDataPagination("athletes/" + athleteId + "/sportdata", page, size, filters, sort, sortDirection)
}

export const findGroupAthletesDataPagination = (groupId: number, scheduleIds: number[] =[], page: number, size: number, filters: any, sort: string, sortDirection: Order) => {

    let endpoint = "groups/" + groupId + "/athletes"
    if (scheduleIds && scheduleIds.length > 0){
        endpoint = "groups/" + groupId + "/schedules/" + scheduleIds.join("_") + "/athletes"
    }
    return findDataPagination(endpoint, page, size, filters, sort, sortDirection)
}

const findDataPagination = (entity: string, page=0, size=10, filters: any, sort: string='id', sortDirection: Order='desc') => {

    let paramsSeparator = entity.includes("?") ? "&" : "?"
    let pageParams = paramsSeparator + "page=" + page
    let sizeParams = "&size=" + size
    let filtersParams = '';
    if (filters && Object.keys(filters).length > 0){
        filtersParams = "&filters=" + utils.getFilterParams(filters)
    }
    let sortParams = ''
    if (sort && sortDirection){
        sortParams = '&sort=' + sort + '&sortDirection=' + sortDirection.toUpperCase()    
    }
    let urlParams = pageParams + sizeParams + filtersParams + sortParams
    return getRequest("/" + entity + urlParams)
}
