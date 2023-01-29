import utils from '../utils/TableUtils'
import { getRequest, postRequest, postExcelRequest, deleteRequest } from "./ApiService"

export const findAll = () => {
    return getRequest("/sport_schools/all")
}

export const addData = (body: any) => {
    return postRequest("/sport_schools", body)
}

export const findById = (id: number) => {
    return getRequest("/sport_schools/" + id)
}

export const findSportSchoolGroups = (id: number) => {
    return getRequest("/sport_schools/" + id + "/groups")
}

export const findSportSchoolsGroups = (ids: number[]) => {
    return getRequest("/sport_schools/groups?ids=" + ids)
}

export const findSportSchoolTrainers = (id: number) => {
    return getRequest("/sport_schools/" + id + "/trainers")
}

export const findSportSchoolFee = (id: number) => {
    return getRequest("/sport_schools/" + id + "/fee")
}

export const findFeeTypesById = (id: number) => {
    return getRequest("/sport_schools/" + id + "/fee_types")
}

export const findCollectionsById = (id: number) => {
    return getRequest("/sport_schools/" + id + "/collections")
}

export const deleteSportSchool = (id: number) => {
    return deleteRequest("/sport_schools/" + id)
}

export const downloadExcel = (columns: any, filters: any, endpoint: string = "/sport_schools/excel") => {
    
    let filtersParams = '';
    if (filters && Object.keys(filters).length > 0){
        filtersParams = "?filters=" + utils.getFilterParams(filters)
    }
    
    return postExcelRequest(endpoint + filtersParams, columns, 'sport_schools.xlsx')
}