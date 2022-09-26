import * as ACTION_TYPES from "../../constants/action_types";

import { addData, findById, deleteReceipt, saveData, downloadExcel } from "../../../services/ReceiptService"
import { findReceiptAthleteDataPagination, findReceiptDataPagination, findReceiptIdAthleteDataPagination } from "../../../services/TableService"

import { Order } from '../../../types/order'

export function getReceiptTable(page: number, size: number, filters: any, sort: string, sortDirection: Order) {
    return function (dispatch: any) {
        return findReceiptDataPagination(page, size, filters, sort, sortDirection).then(json => {
            dispatch({ type: ACTION_TYPES.LOAD_RECEIPT_TABLE, payload: json });
        });
    }
}

export function getReceiptAthleteTable(collection: string, sportSchoolId: number, page: number, size: number, filters: any, sort: string, sortDirection: Order) {
    return function (dispatch: any) {
        dispatch({ type: ACTION_TYPES.API_CALL})
        return findReceiptAthleteDataPagination(collection, sportSchoolId, page, size, filters, sort, sortDirection).then(json => {
            dispatch({ type: ACTION_TYPES.LOAD_RECEIPT_ATHLETE_TABLE, payload: json });
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

export function saveReceipt(id: number, data: any) {
    return function (dispatch: any) {
        dispatch({ type: ACTION_TYPES.API_CALL})
        return saveData(id, data).then(json => {
            dispatch({ type: ACTION_TYPES.ADD_RECEIPT, payload: json });
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

export function downloadReceiptAthletes(id: number) {
    return function (dispatch: any) {
        dispatch({ type: ACTION_TYPES.API_CALL})
        return downloadExcel(id).then(json => {
            dispatch({ type: ACTION_TYPES.DOWNLOAD_RECEIPT_ATHLETES, payload: json });
        });
    }
}