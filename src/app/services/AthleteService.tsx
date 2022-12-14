import utils from '../utils/TableUtils'
import { getRequest, postRequest, postExcelRequest, deleteRequest } from "./ApiService"

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

export const findAthleteObservations = (id: number) => {
    return getRequest("/athletes/" + id + "/observations")
}

export const findAthleteReceipts = (id: number) => {
    return getRequest("/athletes/" + id + "/receipts")
}

export const updateAthleteReceiptStatus = (id: number, receiptId: number, status: string) => {
    return getRequest("/athletes/" + id + "/receipts/" + receiptId + "/status?status=" + status)
}

export const findAthleteHistoric = (id: number) => {
    return getRequest("/athletes/" + id + "/historic")
}

export const findBySurnames = (firstSurname: string, secondSurname: string) => {
    return getRequest("/athletes/surnames?first_surname=" + firstSurname + "&second_surname=" + secondSurname)
}

export const findAthleteFee = (body: any) => {
    return postRequest("/athletes/fee", body)
}

export const deleteAthlete = (id: number) => {
    return deleteRequest("/athletes/" + id)
}

export const downloadExcel = (columns: any, filters: any, endpoint: string = "/athletes/excel") => {
    
    let filtersParams = '';
    if (filters && Object.keys(filters).length > 0){
        if (endpoint.includes("?")){
            filtersParams = "&"
        }
        else {
            filtersParams = "?"
        }
        filtersParams = filtersParams + "filters=" + utils.getFilterParams(filters)
    }
    return postExcelRequest(endpoint + filtersParams, columns, 'athletes.xlsx')
}