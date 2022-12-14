import { getRequest, postRequest, deleteRequest, postExcelRequest } from "./ApiService"

export const addData = (body: any) => {
    return postRequest("/receipts", body)
}

export const findAll = () => {
    return getRequest("/receipts/all")
}
export const saveData = (id: number, body: any) => {
    return postRequest("/receipts/" + id, body)
}

export const findById = (id: number) => {
    return getRequest("/receipts/" + id)
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