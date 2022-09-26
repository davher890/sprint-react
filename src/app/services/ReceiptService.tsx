import { getRequest, postRequest, deleteRequest, postExcelRequest } from "./ApiService"

export const addData = (body: any) => {
    return postRequest("/receipts", body)
}

export const saveData = (id: number, body: any) => {
    return postRequest("/receipts/" + id, body)
}

export const findById = (id: number) => {
    return getRequest("/receipts/" + id)
}

export const deleteReceipt = (id: number) => {
    return deleteRequest("/receipts/" + id)
}

export const downloadExcel = (id: number) => {
    return postExcelRequest('/receipts/' + id + '/excel', {}, 'receipt.xlsx')
}