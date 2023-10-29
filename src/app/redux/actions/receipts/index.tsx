import * as ACTION_TYPES from "../../constants/action_types";

import { addData, addReceiptAthletes, findAll, findById, findReceiptAthleteById, deleteReceiptAthletes, deleteReceipt, downloadExcel, saveReceiptAthlete, validateData, findReceiptAthleteObservations, downloadReturnReceiptRegisteredAthleteExcel, downloadReturnReceiptUnregisteredAthleteExcel } from "../../../services/ReceiptService"
import { findReceiptDataPagination, findReceiptIdAthleteDataPagination, findReturnReceiptRegisterAthleteDataPagination, findReturnReceiptUnregisterAthleteDataPagination } from "../../../services/TableService"

import { Order } from '../../../types/order'

export function getReceiptTable(page: number, size: number, filters: any, sort: string, sortDirection: Order) {
    return function (dispatch: any) {
        return findReceiptDataPagination(page, size, filters, sort, sortDirection).then(json => {
            dispatch({ type: ACTION_TYPES.LOAD_RECEIPT_TABLE, payload: json });
        });
    }
}

export function getReturnReceiptRegisteredAthleteTable(season: string, page: number, size: number, filters: any, sort: string, sortDirection: Order) {
    return function (dispatch: any) {
        return findReturnReceiptRegisterAthleteDataPagination(season, page, size, filters, sort, sortDirection).then(json => {
            dispatch({ type: ACTION_TYPES.LOAD_RETURNED_RECEIPT_REGISTERED_ATHLETE_TABLE, payload: json });
        });
    }
}

export function getReturnReceiptUnregisteredAthleteTable(season: string, page: number, size: number, filters: any, sort: string, sortDirection: Order) {
    return function (dispatch: any) {
        return findReturnReceiptUnregisterAthleteDataPagination(season, page, size, filters, sort, sortDirection).then(json => {
            dispatch({ type: ACTION_TYPES.LOAD_RETURNED_RECEIPT_UNREGISTERED_ATHLETE_TABLE, payload: json });
        });
    }
}

export function downloadReturnReceiptRegisteredAthlete(season: string, columns: any, filters:any) {
    return function (dispatch: any) {
        dispatch({ type: ACTION_TYPES.API_CALL})
        return downloadReturnReceiptRegisteredAthleteExcel(season, columns, filters).then(json => {
            dispatch({ type: ACTION_TYPES.DOWNLOAD_ATHLETES, payload: json });
        });
    }
}

export function downloadReturnReceiptUnregisteredAthlete(season: string, columns: any, filters:any) {
    return function (dispatch: any) {
        dispatch({ type: ACTION_TYPES.API_CALL})
        return downloadReturnReceiptUnregisteredAthleteExcel(season, columns, filters).then(json => {
            dispatch({ type: ACTION_TYPES.DOWNLOAD_ATHLETES, payload: json });
        });
    }
}

export function getAllReceipts() {
    return function (dispatch: any)  {
        return findAll().then(json => {
            dispatch({ type: ACTION_TYPES.LOAD_RECEIPTS, payload: json });
        });
    }
}

export function getReceiptAthleteObservations(id: number) {
    return function (dispatch: any) {
        return findReceiptAthleteObservations(id).then(json => {
            dispatch({ type: ACTION_TYPES.GET_RECEIPT_ATHLETE_OBSERVATIONS, payload: json });
        });
    }
}

export function getReceiptIdAthleteTable(id: number, page: number, size: number, filters: any, sort: string, sortDirection: Order) {
    return function (dispatch: any) {
        dispatch({ type: ACTION_TYPES.API_CALL})
        return findReceiptIdAthleteDataPagination(id, page, size, filters, sort, sortDirection).then(json => {
            dispatch({ type: ACTION_TYPES.LOAD_RECEIPT_ATHLETE_TABLE, payload: json });
        });
    }
}

export function getReceiptAthlete(id: number) {
    return function (dispatch: any) {
        return findReceiptAthleteById(id).then(json => {
            dispatch({ type: ACTION_TYPES.GET_RECEIPT_ATHLETE, payload: json });
        });
    }
}

export function getReceipt(id: number) {
    return function (dispatch: any) {
        return findById(id).then(json => {
            dispatch({ type: ACTION_TYPES.GET_RECEIPT, payload: json });
        });
    }
}

export function addReceipt(data: any) {
    return function (dispatch: any) {
        dispatch({ type: ACTION_TYPES.API_CALL})
        return addData(data).then(json => {
            dispatch({ type: ACTION_TYPES.ADD_RECEIPT, payload: json });
        });
    }
}

export function addReceiptAthlete(data: any) {
    return function (dispatch: any) {
        dispatch({ type: ACTION_TYPES.API_CALL})
        return saveReceiptAthlete(data).then(json => {
            if (!json.errorMessage) {
                json.successMessage = "Recibo actualizado!"
            }
            dispatch({ type: ACTION_TYPES.ADD_RECEIPT_ATHLETE, payload: json });
        });
    }
}

export function removeReceipt(id: number) {
    return function (dispatch: any)  {
        return deleteReceipt(id).then(json => {
            dispatch({ type: ACTION_TYPES.DELETE_RECEIPT, payload: json });
        });
    }
}

export function removeReceiptAthletes(id: number, athleteIds: number[]) {
    return function (dispatch: any)  {
        return deleteReceiptAthletes(id, athleteIds).then(json => {
            dispatch({ type: ACTION_TYPES.DELETE_RECEIPT_ATHLETES, payload: json });
        });
    }
}

export function saveReceiptAthletes(id: number, athleteIds: number[]) {
    return function (dispatch: any) {
        dispatch({ type: ACTION_TYPES.API_CALL})
        return addReceiptAthletes(id, athleteIds).then(json => {
            dispatch({ type: ACTION_TYPES.ADD_RECEIPT_ATHLETES, payload: json });
        });
    }
}
export function downloadReceiptAthletes(id: number) {
    return function (dispatch: any) {
        dispatch({ type: ACTION_TYPES.API_CALL})
        return downloadExcel(id).then(json => {
            dispatch({ type: ACTION_TYPES.DOWNLOAD_RECEIPT_ATHLETES, payload: json });
        });
    }
}

export function validateReceipt(id: number) {
    return function (dispatch: any) {
        return validateData(id).then(json => {
            if (!json.errorMessage) {
                json.successMessage = "Remesa validada!"
            }
            dispatch({ type: ACTION_TYPES.VALIDATE_RECEIPT, payload: json });
        });
    }
}