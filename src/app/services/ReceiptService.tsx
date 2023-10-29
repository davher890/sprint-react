import utils from '../utils/TableUtils'

import { getRequest, postRequest, deleteRequest, postExcelRequest } from "./ApiService"

export const addData = (body: any) => {
    return postRequest("/receipts", body)
}

export const findAll = () => {
    return getRequest("/receipts/all")
}
export const saveReceiptAthlete = (body: any) => {
    return postRequest("/receipts/athletes", body)
}

export const findById = (id: number) => {
    return getRequest("/receipts/" + id)
}

export const findReceiptAthleteById = (id: number) => {
    return getRequest("/receipts/athletes/" + id)
}

export const findReceiptAthleteObservations = (id: number) => {
    return getRequest("/receipts/athletes/" + id + "/observations")
}

export const validateData = (id: number) => {
    return getRequest("/receipts/" + id + "/validate")
}

export const deleteReceipt = (id: number) => {
    return deleteRequest("/receipts/" + id)
}

export const deleteReceiptAthletes = (id: number, athleteIds: number[]) => {
    return deleteRequest("/receipts/" + id + "/athletes?athlete_ids=" + athleteIds)
}

export const addReceiptAthletes = (id: number, athleteIds: number[]) => {
    return deleteRequest("/receipts/" + id + "/athletes/add?athlete_ids=" + athleteIds)
}

export const downloadExcel = (id: number) => {
    return postExcelRequest('/receipts/' + id + '/excel', {}, 'receipt.xlsx')
}

export const downloadReturnReceiptRegisteredAthleteExcel = (season: string, columns: any,filters:any) => {
    let endpoint = "/receipts/athletes/return/registered/excel?season=" + season
    let filtersParams = '';
    if (filters && Object.keys(filters).length > 0){
        filtersParams = "&filters=" + utils.getFilterParams(filters)
    }
    return postExcelRequest(endpoint + filtersParams, columns, 'return_receipts_registered_' + season + '.xlsx')
}

export const downloadReturnReceiptUnregisteredAthleteExcel = (season: string, columns: any,filters:any) => {
    let endpoint = "/receipts/athletes/return/unregistered/excel?season=" + season
    let filtersParams = '';
    if (filters && Object.keys(filters).length > 0){
        filtersParams = "&filters=" + utils.getFilterParams(filters)
    }
    return postExcelRequest(endpoint + filtersParams, columns, 'return_receipts_unregistered_' + season + '.xlsx')
}