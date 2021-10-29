import utils from '../utils/TableUtils'
import { getRequest, postRequest, postExcelRequest } from "./ApiService"

export const addData = (body: any) => {
    return postRequest("/athletes", body)
}

export const findById = (id: number) => {
    return getRequest("/athletes/" + id)
}

export const findByPhone = (phoneList: string[]) => {
    return getRequest("/athletes/phone?phone_list=" + phoneList.join(','))
}

export const registerAthlete = (id: number, body: any) => {
    return postRequest("/athletes/" + id + "/register", body)
}

export const unregisterAthlete = (id: number, body: any) => {
    return postRequest("/athletes/" + id + "/unregister", body)
}

export const findBySurnames = (firstSurname: string, secondSurname: string) => {
    return getRequest("/athletes/surnames?first_surname=" + firstSurname + "&second_surname=" + secondSurname)
}

export const findAthleteFee = (body: any) => {
    return postRequest("/athletes/fee", body)
}

export const downloadExcel = (columns: any, filters: any, endpoint: string = "/athletes/excel") => {
    
    let filtersParams = '';
    if (filters && Object.keys(filters).length > 0){
        filtersParams = "?filters=" + utils.getFilterParams(filters)
    }
    
    return postExcelRequest(endpoint + filtersParams, columns, 'athletes.xlsx')
}

// Sportdata
export const addAthleteSportdata = (body: any) => {
    return postRequest("/sportdata", body)
}